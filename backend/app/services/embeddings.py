from sentence_transformers import SentenceTransformer
import numpy as np
from app.config import EMBED_MODEL

model = SentenceTransformer(EMBED_MODEL)

def embed_text(text_list: list) -> np.ndarray:
    return model.encode(text_list, convert_to_numpy=True)
