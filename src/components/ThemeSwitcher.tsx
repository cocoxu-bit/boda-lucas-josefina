"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useSoundEffects } from "@/context/SoundContext";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { playSoftPop } = useSoundEffects();

  const handleSelect = (mode: "dark" | "warm") => {
    if (mode === theme) return;
    playSoftPop();
    setTheme(mode);
  };

  return (
    <aside 
      aria-label="Selector de tema visual"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5"
    >
      <div className="glass-panel rounded-full p-1 flex items-center gap-1 shadow-2xl border transition-all duration-300">
        {/* Dark Cinematic Option */}
        <button
          onClick={() => handleSelect("dark")}
          className={`relative px-3 py-1.5 rounded-full text-xs font-mono-swiss flex items-center gap-1.5 transition-all duration-300 ${
            theme === "dark"
              ? "bg-[#dfb15b] text-black font-semibold shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="text-[11px] uppercase tracking-wider">Cinematic</span>
        </button>

        {/* Warm Editorial Option */}
        <button
          onClick={() => handleSelect("warm")}
          className={`relative px-3 py-1.5 rounded-full text-xs font-mono-swiss flex items-center gap-1.5 transition-all duration-300 ${
            theme === "warm"
              ? "bg-[#c28835] text-white font-semibold shadow-md"
              : "text-zinc-400 hover:text-stone-900"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="text-[11px] uppercase tracking-wider">Marfil Cálido</span>
        </button>
      </div>
    </aside>
  );
};
