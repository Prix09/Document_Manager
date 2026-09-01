import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("/documents/list");
      if (res.data && res.data.documents) {
        setDocuments(res.data.documents);
      }
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto min-h-[50vh]">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Uploaded Files</h3>
      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc, idx) => (
            <li key={idx} className="flex items-center space-x-4 text-gray-700 bg-gray-50 p-4 rounded-lg shadow-sm border hover:bg-gray-100 transition">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-lg">{doc}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}