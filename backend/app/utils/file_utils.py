import os
import shutil

UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_upload_file(upload_file, destination: str):
    with open(destination, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)


def allowed_file(filename: str) -> bool:
    return filename.lower().endswith(".pdf")


def get_file_path(filename: str) -> str:
    return os.path.join(UPLOAD_DIR, filename)


def delete_file(path: str):
    if os.path.exists(path):
        os.remove(path)
