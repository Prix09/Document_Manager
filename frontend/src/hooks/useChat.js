import { useState } from "react";
import axios from "../api/axios";

export default function useChat() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question) => {

    const userMessage = {
      role: "user",
      text: question
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      setLoading(true);

      const res = await axios.post("/chat/", {
        question: question
      });

      const aiMessage = {
        role: "assistant",
        text: res.data.answer
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error("Chat API Error:", error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Server error." }
      ]);

    } finally {
      setLoading(false);
    }

  };

  return { messages, sendMessage, loading };
}