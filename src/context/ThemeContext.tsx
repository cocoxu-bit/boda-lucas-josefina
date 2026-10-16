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
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clean up any legacy localStorage setting and enforce dark mode
      localStorage.removeItem("wedding-theme-mode");
      const root = document.documentElement;
      root.classList.remove("theme-warm");
      root.classList.add("dark");

      // Clean up ?theme= param from URL if present
      const params = new URLSearchParams(window.location.search);
      if (params.has("theme")) {
        const url = new URL(window.location.href);
        url.searchParams.delete("theme");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", setTheme: () => {}, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
