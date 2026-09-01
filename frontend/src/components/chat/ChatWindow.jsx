import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { askQuestionStream } from "../../api/chat.api";

export default function ChatWindow() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);
  const handleSend = async (question, attachedFiles = []) => {
    const userMessage = { role: "user", text: question, files: attachedFiles };
    const initialAssistantMessage = { role: "assistant", text: "" };

    setMessages(prev => [...prev, userMessage, initialAssistantMessage]);

    try {
      const stream = await askQuestionStream(question);
      
      for await (const chunk of stream) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            text: newMessages[lastIndex].text + chunk
          };
          return newMessages;
        });
      }

    } catch {
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          text: newMessages[lastIndex].text + "\n[Server connection error.]"
        };
        return newMessages;
      });
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex justify-end p-2 bg-gray-50 border-b">
        <button 
          onClick={handleClearChat}
          className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
        >
          Clear Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <ChatHistory messages={messages} />
      </div>

      <div className="border-t bg-white p-4">
        <ChatInput onSend={handleSend} />
      </div>

    </div>
  );
}