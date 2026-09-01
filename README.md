# Document Manager

A fast, offline Retrieval Augmented Generation (RAG) system built with **FastAPI**, **React**, and **Ollama**.

## Architecture Overview

- **Frontend:** React (Vite) + TailwindCSS
- **Backend:** Python (FastAPI) 
- **AI Engine:** Ollama (`qwen2:0.5b`)
- **Vector DB & Embeddings:** FAISS + `sentence-transformers/all-MiniLM-L6-v2`
- **Pipeline:** Documents are chunked, embedded, and queried in-memory. The top 3 chunks are fed to the local LLM for rapid, context-aware answers.

## Assumptions Made

- **Hardware:** Optimized for standard consumer hardware. Uses `qwen2:0.5b` with strict context limits to guarantee sub-2-second responses.
- **Single-Tenant:** The in-memory vector database pools all uploaded documents for the active session.
- **Dependencies:** Requires Ollama running locally on port `11434`.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python 3.9+
- Ollama (run: `ollama pull qwen2:0.5b`)

### 1. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows (use `source venv/bin/activate` for Mac/Linux)
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

- **App:** `http://localhost:5173`
- **Docs:** `http://localhost:8000/docs`
