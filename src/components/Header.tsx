"use client";

import React from "react";
import { motion } from "framer-motion";
import { VolumeX, Sparkles } from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

export const Header: React.FC = () => {
  const { isAmbientPlaying, toggleAmbient, playClick } = useSoundEffects();

  const handleSoundToggle = () => {
    playClick();
    toggleAmbient();
  };

  const scrollToRSVP = () => {
    playClick();
    const el = document.getElementById("rsvp-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <nav className="glass-panel rounded-full px-4 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300">
          {/* Monogram / Date */}
          <div className="flex items-center gap-2.5">
            <span className="font-serif-editorial text-xl italic tracking-wide text-[var(--fg-primary)]">
              L & J
            </span>
            <span className="h-3 w-px bg-current opacity-20" />
            <span className="font-mono-swiss text-[11px] uppercase tracking-widest text-[var(--fg-muted)]">
              06.02.27 • VLC
            </span>
          </div>

          {/* Right actions: Sound toggle & RSVP button */}
          <div className="flex items-center gap-2">
            {/* Ambient Sound Toggle Button */}
            <button
              onClick={handleSoundToggle}
              aria-label={isAmbientPlaying ? "Pausar música ambiental" : "Reproducir música ambiental"}
              className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-all hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
            >
              {isAmbientPlaying ? (
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-[var(--accent-gold)] animate-pulse" />
                  <span className="w-0.5 h-2 bg-[var(--accent-gold)] animate-pulse [animation-delay:150ms]" />
                  <span className="w-0.5 h-3.5 bg-[var(--accent-gold)] animate-pulse [animation-delay:300ms]" />
                  <span className="w-0.5 h-1.5 bg-[var(--accent-gold)] animate-pulse [animation-delay:450ms]" />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)] transition-colors" />
              )}
              <span className="hidden sm:inline font-mono-swiss text-[10px] tracking-wider uppercase text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)]">
                {isAmbientPlaying ? "Sound ON" : "Sound"}
              </span>
            </button>

            {/* RSVP Direct Jump */}
            <button
              onClick={scrollToRSVP}
              className="relative overflow-hidden rounded-full bg-[var(--fg-primary)] px-3.5 py-1.5 font-sans-ui text-xs font-medium text-[var(--bg-primary)] transition-all hover:bg-[var(--accent-gold)] hover:text-white dark:hover:text-black active:scale-95 flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3 h-3" />
              <span>Confirmar</span>
            </button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};
