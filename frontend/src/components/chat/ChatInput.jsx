import { useState, useRef } from "react";
import axios from "../../api/axios";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setIsUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      await axios.post("/documents/", formData);
      setSelectedFiles(prev => [...prev, ...files.map(f => f.name)]);
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.detail || "Failed to upload file(s).");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (!text.trim()) return;
    
    // Clear chips when sending to keep UI clean
    const filesToPass = [...selectedFiles];
    setSelectedFiles([]);
    setText("");
    
    onSend(text, filesToPass);
  };

  return (
    <div className="flex flex-col">
      {/* File chips container */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 px-2">
          {selectedFiles.map((fname, i) => (
            <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm text-sm text-gray-700">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
              <span className="font-medium">{fname}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 items-center bg-gray-50 p-2 rounded-full border shadow-inner">
        <input 
          type="file" 
          multiple 
          hidden 
          accept=".pdf,.txt,.docx"
          ref={fileInputRef}
          onChange={handleFileChange} 
        />
        
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Upload Document"
          className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-800 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </button>

        <input
          type="text"
          placeholder={isUploading ? "Uploading..." : "Ask anything..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isUploading}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-transparent px-2 py-2 focus:outline-none focus:ring-0 text-gray-800"
        />

        <button
          onClick={handleSend}
          disabled={isUploading || !text.trim()}
          className={`p-2 rounded-full transition flex items-center justify-center ${text.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-300 text-gray-100'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </div>
  );
}