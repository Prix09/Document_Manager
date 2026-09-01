import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Embedding model used for vector generation
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# FAISS vector store paths
FAISS_INDEX_DIR = "db/faiss_index/index.bin"
FAISS_METADATA = "db/faiss_index/metadata.json"

# Ollama configuration
OLLAMA_API_URL = "http://host.docker.internal:11434/api/generate"
OLLAMA_MODEL = "phi3:mini"   # change to "mistral" if your system RAM allows