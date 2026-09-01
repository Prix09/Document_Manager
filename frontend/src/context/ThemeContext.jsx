import { createContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div
        className={
          darkMode
            ? "dark bg-gray-900 text-white min-h-screen"
            : "bg-white min-h-screen"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;