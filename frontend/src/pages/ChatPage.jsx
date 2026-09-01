import ChatWindow from "../components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
      <ChatWindow />
    </div>
  );
}