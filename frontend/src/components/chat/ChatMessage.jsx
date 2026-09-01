export default function ChatMessage({ message }) {

  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-xl px-4 py-3 rounded-lg flex flex-col gap-2 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.files && message.files.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-1">
            {message.files.map((fname, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/20 px-2 py-1 rounded text-xs font-medium border border-white/30 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                <span>{fname}</span>
              </div>
            ))}
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.text}</div>
      </div>

    </div>
  );
}