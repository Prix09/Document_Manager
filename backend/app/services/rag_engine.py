import requests
import os
from app.services.embeddings import embed_text
from app.services.vector_store import vector_store


def rag_answer(query: str) -> str:
    query_vector = embed_text([query])[0]

    # Retrieve chunks (balanced top_k=3 to fit within 1024 context window for max speed)
    retrieved_chunks = vector_store.search(query_vector, top_k=3)

    if not retrieved_chunks:
        yield "No relevant information found. Please upload documents first."
        return

    # Utilize large context windows, but DO NOT truncate the chunks!
    context = "\n\n".join(chunk for chunk in retrieved_chunks)

    # Prompt specific for business insights as requested
    prompt = f"""Provide detailed business insights utilizing ONLY the context.
Context: {context}
Question: {query}
Answer:"""

    try:
        response = requests.post(
            "http://127.0.0.1:11434/v1/chat/completions",
            json={
                "model": "qwen2:0.5b",
                "messages": [
                    {"role": "system", "content": "You are a helpful and precise enterprise assistant. Answer the user's question directly using ONLY the provided context. Keep your answer under 2 sentences."},
                    {"role": "user", "content": prompt}
                ],
                "stream": True,
                "temperature": 0.0,
                "max_tokens": 50, # Severely restrict output length to speed up total time
                "options": {
                    "num_ctx": 1024, # Smaller context window
                    "num_thread": 8,
                    "num_predict": 50 # Ollama-specific max generation tokens
                }
            },
            stream=True,
            timeout=120
        )

        if response.status_code != 200:
            yield f"Ollama API error: {response.text}"
            return

        # Parse Server-Sent Events from Ollama
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                if decoded_line.startswith("data: ") and decoded_line != "data: [DONE]":
                    import json
                    try:
                        chunk_str = decoded_line[6:] # strip "data: " prefix
                        chunk = json.loads(chunk_str)
                        if "choices" in chunk and len(chunk["choices"]) > 0:
                            delta = chunk["choices"][0].get("delta", {})
                            if "content" in delta:
                                yield delta["content"]
                    except:
                        pass
        
    except requests.exceptions.ConnectionError:
        yield "Error: Unable to connect to Local Ollama. Is it running?"
    except Exception as e:
        yield f"Unexpected error: {str(e)}"