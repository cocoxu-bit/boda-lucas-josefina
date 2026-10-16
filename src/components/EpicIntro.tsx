"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCw, Check } from "lucide-react";

interface EpicIntroProps {
  onEnter?: () => void;
}

type IngredientId = "grapes" | "meat" | "orange";

interface IngredientInfo {
  id: IngredientId;
  name: string;
  subtitle: string;
  emoji: string;
  color: string;
}

const INGREDIENTS: IngredientInfo[] = [
  {
    id: "grapes",
    name: "Racimo de Uvas",
    subtitle: "El vino y la fiesta",
    emoji: "🍇",
    color: "#A855F7",
  },
  {
    id: "meat",
    name: "Buena Carne",
    subtitle: "Devoción carnívora",
    emoji: "🥩",
    color: "#EF4444",
  },
  {
    id: "orange",
    name: "Naranja de Valencia",
    subtitle: "Nuestra tierra y frescura",
    emoji: "🍊",
    color: "#F97316",
  },
];

export const EpicIntro: React.FC<EpicIntroProps> = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [added, setAdded] = useState<Record<IngredientId, boolean>>({
    grapes: false,
    meat: false,
    orange: false,
  });
  const [isBlending, setIsBlending] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  // Background ambient particles
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 4 + 3,
    }));
    setParticles(generated);
  }, []);

  const totalAdded = Object.values(added).filter(Boolean).length;
  const isReadyToBlend = totalAdded === 3;

  const handleAddIngredient = (id: IngredientId) => {
    if (isBlending || isWarping) return;
    setAdded((prev) => ({ ...prev, [id]: true }));
  };

  const handleAddAll = () => {
    if (isBlending || isWarping) return;
    setAdded({ grapes: true, meat: true, orange: true });
  };

  const handleStartBlend = () => {
    if (!isReadyToBlend || isBlending || isWarping) return;

    setIsBlending(true);

    // After 1.2s of aggressive vortex blending, trigger the epic portal warp
    setTimeout(() => {
      setIsWarping(true);
      if (onEnter) onEnter();

      // Complete curtain transition
      setTimeout(() => {
        setIsVisible(false);
      }, 1100);
    }, 1200);
  };

  const handleSkip = () => {
    setIsWarping(true);
    if (onEnter) onEnter();
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
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
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>

      {/* 2. BOTTOM SHUTTER PANEL */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isWarping ? "100%" : 0 }}
        transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#09090b] border-t border-[#D4AF37]/20 shadow-2xl z-20"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>

      {/* 3. WARP SHOCKWAVE FLASH */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 2.5, 5] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 bg-radial from-[#D4AF37]/50 via-[#F3E5AB]/25 to-transparent pointer-events-none z-40"
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
              opacity: isWarping ? 0 : [0.2, 0.7, 0.2],
              y: isWarping ? -100 : [-15, 15, -15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className="rounded-full bg-[#D4AF37] blur-[0.5px]"
          />
        ))}
      </div>

      {/* 5. TOP RIGHT SKIP BUTTON */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-30 font-mono-swiss text-[11px] uppercase tracking-widest text-white/60 hover:text-[#D4AF37] transition-all cursor-pointer px-3 py-1.5 rounded-full border border-white/10 hover:border-[#D4AF37]/40 backdrop-blur-sm"
      >
        Saltar intro →
      </button>

      {/* 6. MAIN MINIGAME STAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={
          isWarping
            ? {
                scale: 5,
                opacity: 0,
                filter: "blur(18px)",
                transition: { duration: 0.85, ease: [0.7, 0, 0.3, 1] },
              }
            : {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: "easeOut" },
              }
        }
        className="relative z-30 flex flex-col items-center text-center px-4 max-w-xl mx-auto w-full"
      >
        {/* Title Header */}
        <div className="space-y-1 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-mono-swiss text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#E8C872]">
              El Cóctel de Nuestra Boda
            </span>
          </div>

          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-white italic">
            Mezcla lo que nos representa
          </h2>

          <p className="font-sans-ui text-xs text-white/65 max-w-xs sm:max-w-sm mx-auto font-light leading-relaxed">
            Echa a la batidora los 3 ingredientes imprescindibles para entrar a la celebración:
          </p>
        </div>

        {/* INTERACTIVE STAGE: BLENDER IN CENTER & INGREDIENTS */}
        <div className="relative w-full flex flex-col items-center mb-6">
          {/* THE BLENDER (BATIDORA DE AUTOR) */}
          <motion.div
            animate={
              isBlending
                ? {
                    x: [-3, 3, -3, 3, 0],
                    y: [-1, 2, -2, 1, 0],
                    rotate: [-1, 1, -1, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.08,
              repeat: isBlending ? Infinity : 0,
            }}
            className="relative flex flex-col items-center"
          >
            {/* Ambient golden glow behind jar */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[45px] pointer-events-none transition-all duration-700 ${
                isBlending
                  ? "w-72 h-72 bg-[#D4AF37]/45"
                  : isReadyToBlend
                  ? "w-56 h-56 bg-[#D4AF37]/20"
                  : "w-40 h-40 bg-white/5"
              }`}
            />

            {/* Blender Jar (Glass Vessel) */}
            <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-t-3xl rounded-b-xl border-2 border-white/20 bg-gradient-to-b from-white/10 via-white/[0.04] to-white/10 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col justify-end p-2.5">
              {/* Glass reflection streak */}
              <div className="absolute top-0 left-3 w-3 h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 pointer-events-none" />

              {/* Volume tick markings */}
              <div className="absolute right-2.5 top-6 bottom-12 flex flex-col justify-between items-end opacity-40 font-mono-swiss text-[8px] text-white pointer-events-none">
                <span>MAX</span>
                <span>— 750ml</span>
                <span>— 500ml</span>
                <span>— 250ml</span>
                <span className="text-[7px] text-[#D4AF37]">VENENO</span>
              </div>

              {/* VORTEX ANIMATION WHEN BLENDING */}
              {isBlending && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/80 via-[#F3E5AB]/60 to-transparent flex items-center justify-center overflow-hidden"
                >
                  {/* Swirling liquid cyclone */}
                  <motion.div
                    animate={{ rotate: 1080 }}
                    transition={{ duration: 1.2, ease: "linear" }}
                    className="w-40 h-40 rounded-full border-4 border-dashed border-white/60 flex items-center justify-center opacity-80"
                  >
                    <div className="w-24 h-24 rounded-full border-2 border-white/40" />
                  </motion.div>
                </motion.div>
              )}

              {/* INGREDIENTS INSIDE THE BLENDER */}
              <div className="relative z-10 flex items-end justify-center gap-2 pb-2 min-h-[90px]">
                {/* 1. Grapes inside */}
                {added.grapes && (
                  <motion.div
                    initial={{ y: -120, opacity: 0, scale: 0.4 }}
                    animate={
                      isBlending
                        ? { scale: [1, 0], opacity: [1, 0], rotate: [0, 360] }
                        : { y: 0, opacity: 1, scale: 1 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 22,
                    }}
                    className="text-3xl sm:text-4xl filter drop-shadow-md select-none"
                    title="Uvas dentro"
                  >
                    🍇
                  </motion.div>
                )}

                {/* 2. Meat inside */}
                {added.meat && (
                  <motion.div
                    initial={{ y: -120, opacity: 0, scale: 0.4 }}
                    animate={
                      isBlending
                        ? { scale: [1, 0], opacity: [1, 0], rotate: [0, -360] }
                        : { y: 0, opacity: 1, scale: 1 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 20,
                    }}
                    className="text-3xl sm:text-4xl filter drop-shadow-md select-none"
                    title="Carne dentro"
                  >
                    🥩
                  </motion.div>
                )}

                {/* 3. Orange inside */}
                {added.orange && (
                  <motion.div
                    initial={{ y: -120, opacity: 0, scale: 0.4 }}
                    animate={
                      isBlending
                        ? { scale: [1, 0], opacity: [1, 0], rotate: [0, 360] }
                        : { y: 0, opacity: 1, scale: 1 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 18,
                    }}
                    className="text-3xl sm:text-4xl filter drop-shadow-md select-none"
                    title="Naranja dentro"
                  >
                    🍊
                  </motion.div>
                )}

                {/* Empty State Prompt */}
                {totalAdded === 0 && (
                  <span className="font-mono-swiss text-[10px] text-white/40 uppercase tracking-wider pb-3 animate-pulse">
                    Vacía (Toca abajo)
                  </span>
                )}
              </div>

              {/* Rotary Blades at bottom */}
              <div className="relative z-10 w-full flex items-center justify-center pt-1 border-t border-white/20">
                <motion.div
                  animate={isBlending ? { rotate: 1440 } : {}}
                  transition={{ duration: 1.2, ease: "linear" }}
                  className="w-6 h-1.5 bg-zinc-300 rounded-full flex items-center justify-center relative shadow-sm"
                >
                  <div className="w-1.5 h-3 bg-zinc-400 rounded-sm" />
                </motion.div>
              </div>
            </div>

            {/* Blender Motor Base (Stainless Steel & Dial) */}
            <div className="relative w-40 sm:w-48 h-14 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 rounded-b-2xl border-t-2 border-zinc-500 shadow-xl flex items-center justify-between px-5">
              <span className="font-serif-editorial text-sm text-[#D4AF37] italic font-semibold">
                J & L
              </span>

              {/* Rotary Control Dial */}
              <motion.div
                animate={isBlending ? { rotate: 90 } : {}}
                className="w-7 h-7 rounded-full bg-zinc-950 border border-zinc-600 flex items-center justify-center shadow-inner"
              >
                <div className="w-1 h-3 bg-[#D4AF37] rounded-full" />
              </motion.div>

              <span className="font-mono-swiss text-[9px] text-zinc-400 tracking-widest">
                2027
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3 INGREDIENTS SELECTOR TABS */}
        <div className="space-y-3 w-full max-w-md mb-6">
          <div className="grid grid-cols-3 gap-2.5">
            {INGREDIENTS.map((item) => {
              const isAdded = added[item.id];

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleAddIngredient(item.id)}
                  disabled={isAdded || isBlending || isWarping}
                  whileHover={!isAdded ? { scale: 1.04, y: -2 } : {}}
                  whileTap={!isAdded ? { scale: 0.96 } : {}}
                  className={`relative p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                    isAdded
                      ? "bg-white/[0.02] border-white/10 opacity-40 cursor-default"
                      : "bg-[#18181b]/90 border-white/15 hover:border-[#D4AF37]/60 hover:bg-[#202024] shadow-md"
                  }`}
                >
                  {/* Status Indicator check */}
                  {isAdded && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}

                  <span className="text-3xl filter drop-shadow-sm transform hover:scale-110 transition-transform">
                    {item.emoji}
                  </span>

                  <div>
                    <span className="font-mono-swiss text-xs font-semibold text-white block leading-tight">
                      {item.name}
                    </span>
                    <span className="font-sans-ui text-[10px] text-white/50 block font-light">
                      {item.subtitle}
                    </span>
                  </div>

                  <span
                    className={`mt-1 font-mono-swiss text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isAdded
                        ? "text-emerald-400 bg-emerald-950/40"
                        : "text-[#D4AF37] bg-[#D4AF37]/10"
                    }`}
                  >
                    {isAdded ? "Añadido ✓" : "+ Echar"}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Quick "Echar todo de golpe" option if none or partial */}
          {!isReadyToBlend && (
            <button
              onClick={handleAddAll}
              disabled={isBlending}
              className="font-mono-swiss text-[11px] text-[#D4AF37]/80 hover:text-[#D4AF37] underline decoration-dotted transition-colors cursor-pointer"
            >
              o pulsa aquí para echar los 3 a la vez
            </button>
          )}
        </div>

        {/* MAIN CTA BUTTON: BLEND & ENTER */}
        <div className="w-full max-w-sm">
          <motion.button
            onClick={handleStartBlend}
            disabled={!isReadyToBlend || isBlending || isWarping}
            whileHover={isReadyToBlend ? { scale: 1.04 } : {}}
            whileTap={isReadyToBlend ? { scale: 0.96 } : {}}
            className={`w-full relative flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 rounded-full font-mono-swiss text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-all overflow-hidden ${
              isReadyToBlend
                ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:shadow-[0_0_55px_rgba(212,175,55,0.9)] cursor-pointer"
                : "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed opacity-60"
            }`}
          >
            {/* Shimmer on active button */}
            {isReadyToBlend && !isBlending && (
              <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            )}

            {isBlending ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-black" />
                <span>Batiendo la mezcla...</span>
              </>
            ) : (
              <>
                <RotateCw
                  className={`w-4 h-4 ${
                    isReadyToBlend ? "text-black animate-spin" : "text-zinc-500"
                  }`}
                  style={{ animationDuration: "3s" }}
                />
                <span>
                  {isReadyToBlend
                    ? "¡Remover y Entrar!"
                    : `Echa los ingredientes (${totalAdded}/3)`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
