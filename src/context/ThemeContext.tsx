"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "warm";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    // Check URL param first (e.g. ?theme=warm)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get("theme");
      if (urlTheme === "warm" || urlTheme === "dark") {
        setThemeState(urlTheme);
        applyThemeClass(urlTheme);
        return;
      }

      // Check localStorage
      const savedTheme = localStorage.getItem("wedding-theme-mode") as ThemeMode | null;
      if (savedTheme === "warm" || savedTheme === "dark") {
        setThemeState(savedTheme);
        applyThemeClass(savedTheme);
      } else {
        applyThemeClass("dark");
      }
    }
  }, []);

  const applyThemeClass = (newTheme: ThemeMode) => {
    const root = document.documentElement;
    if (newTheme === "warm") {
      root.classList.remove("dark");
      root.classList.add("theme-warm");
    } else {
      root.classList.remove("theme-warm");
      root.classList.add("dark");
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    applyThemeClass(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("wedding-theme-mode", newTheme);
      // Update URL query param smoothly without reloading
      const url = new URL(window.location.href);
      url.searchParams.set("theme", newTheme);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "warm" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
