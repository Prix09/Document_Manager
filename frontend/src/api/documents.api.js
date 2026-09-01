import api from "./axios";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Document Upload Error:", error);
    throw error;
  }
};