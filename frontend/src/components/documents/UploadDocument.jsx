import { useState, useEffect } from "react";
import axios from "../../api/axios";

function UploadDocument({ compact = false }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");

  const fetchDocuments = async () => {
    // Left empty if we don't need to refresh a local list, but we can trigger a global refresh if needed.
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setStatus("Please select at least one file first");
      return;
    }

    setStatus("Uploading...");
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await axios.post("/documents/", formData);
      setStatus(`Upload successful: ${res.data.message || "Done"}`);
      setFiles([]);
      document.getElementById("file-upload").value = "";
      fetchDocuments();
    } catch (err) {
      console.error("Upload error:", err);
      setStatus(`Upload failed: ${err.response?.data?.detail || err.message}`);
    }
  };

  return (
    <div>
      <div className={`border-2 border-dashed border-gray-400 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition ${compact ? 'p-4' : 'p-10'}`}>
        {!compact && (
          <p className="text-gray-500 mb-4">
            Drag & Drop Document Here
          </p>
        )}
        <div className={`flex ${compact ? 'flex-row justify-center items-center gap-4' : 'flex-col'} w-full`}>
          <input
            id="file-upload"
            type="file"
            multiple
            className={compact ? "block" : "mx-auto mb-4 block"}
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>
        {status && (
          <p className="mt-4 text-sm text-gray-600">
            {status}
          </p>
        )}
      </div>
    </div>


  );
}

export default UploadDocument;