"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-primary)",
        color: "var(--text-secondary)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      id="theme-toggle"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
