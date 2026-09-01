export function validateQuestion(question) {

  if (!question) {
    return "Question cannot be empty";
  }

  if (question.length < 3) {
    return "Question too short";
  }

  return null;
}


export function validateFile(file) {

  if (!file) return "No file selected";

  const allowed = ["pdf", "txt", "docx"];

  const ext = file.name.split(".").pop().toLowerCase();

  if (!allowed.includes(ext)) {
    return "Invalid file type";
  }

  return null;

}