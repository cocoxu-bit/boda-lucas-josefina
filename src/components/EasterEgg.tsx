"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Volume2, Flame, Disc, Radio } from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const EasterEgg: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const { playSuccess, playClick } = useSoundEffects();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[konamiProgress.length].toLowerCase();

      if (key === expectedKey) {
        const nextProgress = [...konamiProgress, key];
        if (nextProgress.length === KONAMI_CODE.length) {
          // Trigger Easter Egg!
          setIsOpen(true);
          playSuccess();
          setKonamiProgress([]);
        } else {
          setKonamiProgress(nextProgress);
        }
      } else {
        setKonamiProgress([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress, playSuccess]);

  // Mobile secret trigger listener
  useEffect(() => {
    const handleSecretMobileEvent = () => {
      setIsOpen(true);
      playSuccess();
    };

    window.addEventListener("trigger-secret-party-mode", handleSecretMobileEvent);
    return () => window.removeEventListener("trigger-secret-party-mode", handleSecretMobileEvent);
  }, [playSuccess]);

  const closeParty = () => {
    playClick();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl overflow-y-auto"
        >
          {/* Animated retro disco lights background */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#dfb15b] rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-zinc-950 p-6 sm:p-8 text-center shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeParty}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Retro Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-[10px] font-mono-swiss text-purple-300 uppercase tracking-widest mb-3">
              <Radio className="w-3.5 h-3.5 animate-spin" />
              <span>EASTER EGG // VENENO AFTER-HOURS MODE</span>
            </div>

            <h3 className="font-serif-editorial text-4xl sm:text-5xl text-white italic tracking-wide">
              ¡Has desbloqueado el Modo Fiesta!
            </h3>

            <p className="font-sans-ui text-xs sm:text-sm text-zinc-300 mt-2 font-light">
              Acabas de introducir el código secreto de la boda. La pista de baile en Veneno promete ser legendaria.
            </p>

            {/* Secret Polaroids Strip */}
            <div className="grid grid-cols-2 gap-3 my-6 text-left">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-[#dfb15b] font-mono-swiss text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Regla #1 de Veneno</span>
                </div>
                <p className="font-sans-ui text-[11px] text-zinc-300">
                  Prohibido quedarse sentado durante los temas de indie/disco.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-400 font-mono-swiss text-xs font-semibold">
                  <Disc className="w-3.5 h-3.5" />
                  <span>DJ Set Secreto</span>
                </div>
                <p className="font-sans-ui text-[11px] text-zinc-300">
                  A partir de las 18:30 los novios tomarán la cabina.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 to-amber-900/30 border border-white/10">
              <div className="font-mono-swiss text-[11px] text-zinc-300">
                ¡Código Konami superado con honores! Tienes barra libre asegurada de buena onda.
              </div>
            </div>

            <button
              onClick={closeParty}
              className="mt-6 w-full py-3.5 rounded-full bg-white text-black font-sans-ui text-sm font-semibold hover:bg-[#dfb15b] transition-all cursor-pointer shadow-lg"
            >
              Volver a la invitación
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
