"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThemeSnapshot(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored || "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event("storage"));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
