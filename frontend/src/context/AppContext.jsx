import { createContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [documents, setDocuments] = useState([]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        documents,
        setDocuments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;