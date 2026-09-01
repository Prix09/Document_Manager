import json
import os
import numpy as np
import faiss


class VectorStore:
    def __init__(self):
        self.index_path = "db/faiss_index/index.bin"
        self.metadata_path = "db/faiss_index/metadata.json"

        os.makedirs("db/faiss_index", exist_ok=True)

        # Load or create FAISS index
        if os.path.exists(self.index_path):
            self.index = faiss.read_index(self.index_path)
        else:
            # 384 = embedding dimension for sentence-transformers MiniLM
            self.index = faiss.IndexFlatL2(384)

        # Load metadata
        if os.path.exists(self.metadata_path):
            try:
                with open(self.metadata_path, "r") as f:
                    self.metadata = json.load(f)

                if not isinstance(self.metadata, list):
                    self.metadata = []

            except json.JSONDecodeError:
                self.metadata = []
        else:
            self.metadata = []

    # --------------------------------------------------
    # Add vectors to FAISS
    # --------------------------------------------------
    def add_vectors(self, vectors, text_chunks, filename: str = "Unknown"):

        if len(vectors) != len(text_chunks):
            raise ValueError("Vectors and text_chunks must have same length")

        vectors = np.array(vectors).astype("float32")

        # Ensure shape = (N, 384)
        if vectors.ndim == 1:
            vectors = vectors.reshape(1, -1)

        # Add to FAISS
        self.index.add(vectors)

        # Store metadata as a dict with filename
        chunk_dicts = [{"filename": filename, "text": chunk} for chunk in text_chunks]
        self.metadata.extend(chunk_dicts)

        # Save metadata
        with open(self.metadata_path, "w") as f:
            json.dump(self.metadata, f, indent=2)

        # Save FAISS index
        faiss.write_index(self.index, self.index_path)

    # --------------------------------------------------
    # Search vectors
    # --------------------------------------------------
    def search(self, query_vector, top_k=5):

        if self.index.ntotal == 0:
            return []

        query_vector = np.array(query_vector).astype("float32")

        # Ensure shape = (1, 384)
        if query_vector.ndim == 1:
            query_vector = query_vector.reshape(1, -1)

        # Ensure top_k is valid
        top_k = min(top_k, self.index.ntotal)

        distances, indices = self.index.search(query_vector, top_k)

        results = []

        for idx in indices[0]:
            if 0 <= idx < len(self.metadata):
                item = self.metadata[idx]
                if isinstance(item, dict):
                    results.append(f"Document: {item.get('filename', 'Unknown')}\nContent: {item.get('text', '')}")
                else:
                    results.append(item)

        return results


# Singleton instance
vector_store = VectorStore()