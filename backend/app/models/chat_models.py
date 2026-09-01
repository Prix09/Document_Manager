from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str  # Only this field must exist

class ChatResponse(BaseModel):
    answer: str
