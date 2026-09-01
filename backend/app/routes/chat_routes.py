from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.models.chat_models import ChatRequest
from app.services.rag_engine import rag_answer

# Router WITHOUT prefix (prefix is added in main.py)
router = APIRouter(tags=["Chat"])

@router.post("/")   # MUST start with "/"
def chat_with_rag(request: ChatRequest):
    # Pass the generator stream directly to the client
    return StreamingResponse(rag_answer(request.question), media_type="text/plain")
