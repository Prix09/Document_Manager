import ChatMessage from "./ChatMessage";

export default function ChatHistory({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
}