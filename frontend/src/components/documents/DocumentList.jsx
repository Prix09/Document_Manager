import { useState } from "react";
import axios from "../../api/axios";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Upload successful");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md">
      <h2 className="text-lg font-semibold mb-3">Upload Document</h2>

      <input
        type="file"
        className="mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}

export default UploadDocument;