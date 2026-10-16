"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, MessageCircle } from "lucide-react";

export const Header: React.FC = () => {
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSecretMode = () => {
    window.dispatchEvent(new CustomEvent("trigger-secret-party-mode"));
  };

  // Mobile Easter Egg: Triple-tap on monogram
  const handleMonogramTap = () => {
    tapCountRef.current += 1;
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);

    if (tapCountRef.current >= 3) {
      triggerSecretMode();
      tapCountRef.current = 0;
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 700);
    }
  };

  // Mobile Easter Egg: 2s Long Press on monogram
  const handlePointerDown = () => {
    longPressTimeoutRef.current = setTimeout(() => {
      triggerSecretMode();
    }, 2000);
  };

  const handlePointerUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  };

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
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8 select-none"
    >
      <div className="mx-auto max-w-5xl">
        <nav className="glass-panel rounded-full px-4 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300">
          {/* Monogram / Date with touch secret trigger (triple-tap or 2s hold) */}
          <button
            onClick={handleMonogramTap}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex items-center gap-2.5 text-left active:scale-95 transition-transform cursor-pointer"
            title="J & L • Valencia 2027"
          >
            <span className="font-serif-editorial text-xl italic tracking-wide text-[var(--fg-primary)] hover:text-[var(--accent-gold)] transition-colors">
              Josefina & Lucas
            </span>
            <span className="h-3 w-px bg-current opacity-20" />
            <span className="font-mono-swiss text-[11px] tracking-wider text-[var(--fg-muted)]">
              06.02.27 • Valencia
            </span>
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollToTimeline}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-swiss text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>El Plan</span>
            </button>

            {/* Dudas WhatsApp Trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp-modal"))}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-swiss text-[var(--fg-muted)] hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>¿Dudas?</span>
            </button>

            {/* RSVP Direct Jump */}
            <button
              onClick={scrollToRSVP}
              className="relative overflow-hidden rounded-full bg-[var(--fg-primary)] px-3.5 py-1.5 font-sans-ui text-xs font-medium text-[var(--bg-primary)] transition-all hover:bg-[var(--accent-gold)] hover:text-black active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
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
