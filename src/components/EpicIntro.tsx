"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface EpicIntroProps {
  onEnter?: () => void;
}

export const EpicIntro: React.FC<EpicIntroProps> = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isWarping, setIsWarping] = useState(false);

  // Pre-generate random particle positions for stable SSR/Hydration
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    // Generate 28 ambient golden stardust specks
    const generated = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3,
    }));
    setParticles(generated);

    // Keyboard trigger: Enter or Space
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        triggerEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerEnter = () => {
    if (isWarping) return;
    setIsWarping(true);

    if (onEnter) {
      onEnter();
    }

    // Allow the 1.1s warp curtain animation to complete before unmounting
    setTimeout(() => {
      setIsVisible(false);
    }, 1100);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none">
      {/* 1. TOP SHUTTER PANEL */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isWarping ? "-100%" : 0 }}
        transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#09090b] border-b border-[#D4AF37]/20 shadow-2xl z-20"
      >
        {/* Subtle grid pattern texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" 
        />
      </motion.div>

      {/* 2. BOTTOM SHUTTER PANEL */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isWarping ? "100%" : 0 }}
        transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#09090b] border-t border-[#D4AF37]/20 shadow-2xl z-20"
      >
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" 
        />
      </motion.div>

      {/* 3. GOLDEN WARP SHOCKWAVE FLASH (Triggers during zoom) */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.85, 0], scale: [0.8, 2.4, 4] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 bg-radial from-[#D4AF37]/40 via-[#F3E5AB]/20 to-transparent pointer-events-none z-40"
          />
        )}
      </AnimatePresence>

      {/* 4. FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: isWarping ? 0 : [0.2, 0.8, 0.2],
              y: isWarping ? -100 : [-20, 20, -20],
              x: isWarping ? 0 : [-10, 10, -10],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className="rounded-full bg-[#D4AF37] blur-[0.5px] shadow-[0_0_8px_#D4AF37]"
          />
        ))}
      </div>

      {/* 5. TOP RIGHT SKIP BUTTON */}
      <motion.button
        onClick={triggerEnter}
        initial={{ opacity: 0 }}
        animate={{ opacity: isWarping ? 0 : 0.6 }}
        whileHover={{ opacity: 1 }}
        className="absolute top-6 right-6 z-30 font-mono-swiss text-[11px] uppercase tracking-widest text-white/70 hover:text-[#D4AF37] transition-all cursor-pointer px-3 py-1.5 rounded-full border border-white/10 hover:border-[#D4AF37]/40 backdrop-blur-sm"
      >
        Saltar intro →
      </motion.button>

      {/* 6. CENTRAL CEREMONIAL STAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={
          isWarping
            ? {
                scale: 6,
                opacity: 0,
                filter: "blur(16px)",
                transition: { duration: 0.85, ease: [0.7, 0, 0.3, 1] },
              }
            : {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: "easeOut" },
              }
        }
        className="relative z-30 flex flex-col items-center text-center px-4 max-w-xl mx-auto"
      >
        {/* Orbiting Celestial Ring */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-8">
          {/* Pulsing Central Glow */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#D4AF37]/15 blur-[70px] pointer-events-none" />

          {/* Outer Rotating Compass/Astrolabe Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-[#D4AF37]/25 flex items-center justify-center"
          >
            {/* Compass Marks */}
            <div className="absolute top-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_6px_#D4AF37]" />
            <div className="absolute bottom-0 w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
            <div className="absolute left-0 w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
            <div className="absolute right-0 w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
          </motion.div>

          {/* Inner Counter-Rotating Delicate Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-dashed border-[#D4AF37]/35"
          />

          {/* The Monogram: L & J */}
          <div className="absolute flex flex-col items-center">
            <h1 className="font-serif-editorial text-7xl sm:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#E8C872] to-[#B08930] drop-shadow-[0_4px_24px_rgba(212,175,55,0.4)]">
              L <span className="text-[#D4AF37] text-5xl sm:text-6xl font-light italic">&</span> J
            </h1>
          </div>
        </div>

        {/* Micro-Copy Header */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.05] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span className="font-mono-swiss text-[11px] uppercase tracking-[0.25em] text-[#E8C872]">
              Valencia • 06 . 02 . 2027
            </span>
          </div>

          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-white/95 italic font-light tracking-wide pt-1">
            Lucas & Josefina
          </h2>

          <p className="font-sans-ui text-xs sm:text-sm text-white/60 tracking-wider font-light max-w-sm mx-auto">
            Estáis invitados a celebrar una boda única en Monforte y Veneno.
          </p>
        </div>

        {/* The Epic Interactive Enter Button */}
        <motion.button
          onClick={triggerEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black font-mono-swiss text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.8)] transition-all cursor-pointer overflow-hidden"
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Pulsing ring indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
          </span>

          <span className="relative">Adentrarse</span>

          <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform relative" />
        </motion.button>

        {/* Minimal keyboard hint for desktop */}
        <span className="font-mono-swiss text-[10px] text-white/35 mt-3 tracking-widest uppercase hidden sm:block">
          Pulsa [Enter] o haz click para abrir
        </span>
      </motion.div>
    </div>
  );
};
