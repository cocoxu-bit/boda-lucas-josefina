"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar } from "lucide-react";

export const Header: React.FC = () => {
  const scrollToRSVP = () => {
    const el = document.getElementById("rsvp-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTimeline = () => {
    const el = document.getElementById("timeline-section");
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
              Lucas & Josefina
            </span>
            <span className="h-3 w-px bg-current opacity-20" />
            <span className="font-mono-swiss text-[11px] uppercase tracking-widest text-[var(--fg-muted)]">
              06.02.27 • VLC
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollToTimeline}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-swiss text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>El Plan</span>
            </button>

            {/* RSVP Direct Jump */}
            <button
              onClick={scrollToRSVP}
              className="relative overflow-hidden rounded-full bg-[var(--fg-primary)] px-3.5 py-1.5 font-sans-ui text-xs font-medium text-[var(--bg-primary)] transition-all hover:bg-[var(--accent-gold)] hover:text-black active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Confirmar Asistencia</span>
            </button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};
