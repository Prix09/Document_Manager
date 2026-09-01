import { useState } from "react";
import axios from "../api/axios";

export default function useUpload() {

  const [uploading, setUploading] = useState(false);

  const uploadDocument = async (file) => {

    const formData = new FormData();
    formData.append("file", file);

    try {

      setUploading(true);

      await axios.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return "Upload successful";

    } catch {
      return "Upload failed";
    } finally {
      setUploading(false);
    }

  };

  return { uploadDocument, uploading };
}