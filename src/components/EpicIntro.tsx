"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Sparkles, ArrowRight, RotateCw } from "lucide-react";

interface EpicIntroProps {
  onEnter?: () => void;
}

type IngredientId = "grapes" | "meat" | "orange";

interface IngredientInfo {
  id: IngredientId;
  name: string;
  region: string;
  emoji: string;
  color: string;
}

const INGREDIENTS: IngredientInfo[] = [
  {
    id: "grapes",
    name: "Uvas",
    region: "Valdepeñas",
    emoji: "🍇",
    color: "#A855F7",
  },
  {
    id: "meat",
    name: "Carne",
    region: "Argentina",
    emoji: "🥩",
    color: "#EF4444",
  },
  {
    id: "orange",
    name: "Naranja",
    region: "Valencia",
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
  const [isHoveringBlender, setIsHoveringBlender] = useState(false);

  const blenderRef = useRef<HTMLDivElement>(null);

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
    setIsHoveringBlender(false);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!blenderRef.current) return;
    const rect = blenderRef.current.getBoundingClientRect();
    const isNear =
      info.point.x >= rect.left - 40 &&
      info.point.x <= rect.right + 40 &&
      info.point.y >= rect.top - 60 &&
      info.point.y <= rect.bottom + 40;
    setIsHoveringBlender(isNear);
  };

  const handleDragEnd = (id: IngredientId, _: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsHoveringBlender(false);
    if (isBlending || isWarping) return;

    if (!blenderRef.current) {
      if (info.offset.y < -60) {
        handleAddIngredient(id);
      }
      return;
    }

    const rect = blenderRef.current.getBoundingClientRect();
    const dropX = info.point.x;
    const dropY = info.point.y;

    // Generous drop zone around the blender jar
    const isInside =
      dropX >= rect.left - 50 &&
      dropX <= rect.right + 50 &&
      dropY >= rect.top - 70 &&
      dropY <= rect.bottom + 50;

    if (isInside || info.offset.y < -70) {
      handleAddIngredient(id);
    }
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

      {/* 5. MAIN MINIGAME STAGE */}
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
        {/* Title Header with clean explanation text */}
        <div className="space-y-2 mb-6 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-mono-swiss text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#E8C872]">
              La Mezcla de Nuestra Boda
            </span>
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white italic">
            Lo que nos representa
          </h2>

          <p className="font-sans-ui text-xs sm:text-sm text-white/75 max-w-sm sm:max-w-md mx-auto font-light leading-relaxed">
            Arrastra los tres ingredientes a la licuadora para preparar la mezcla: uvas de <strong className="text-white font-medium">Valdepeñas</strong>, carne de <strong className="text-white font-medium">Argentina</strong> y naranja de <strong className="text-white font-medium">Valencia</strong>.
          </p>
        </div>

        {/* INTERACTIVE STAGE: BLENDER (BATIDORA DE AUTOR) */}
        <div className="relative w-full flex flex-col items-center mb-6">
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
                  ? "w-72 h-72 bg-[#D4AF37]/50"
                  : isHoveringBlender
                  ? "w-64 h-64 bg-[#D4AF37]/30"
                  : isReadyToBlend
                  ? "w-56 h-56 bg-[#D4AF37]/20"
                  : "w-40 h-40 bg-white/5"
              }`}
            />

            {/* Blender Jar (Glass Vessel & Drop Area) */}
            <div
              ref={blenderRef}
              className={`relative w-40 h-52 sm:w-48 sm:h-56 rounded-t-3xl rounded-b-xl border-2 transition-all duration-300 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col justify-end p-2.5 ${
                isHoveringBlender
                  ? "border-[#D4AF37] bg-white/[0.12] shadow-[0_0_40px_rgba(212,175,55,0.4)] scale-102"
                  : isReadyToBlend
                  ? "border-[#D4AF37]/60 bg-gradient-to-b from-white/10 via-white/[0.04] to-white/10"
                  : "border-white/20 bg-gradient-to-b from-white/10 via-white/[0.04] to-white/10"
              }`}
            >
              {/* Glass reflection streak */}
              <div className="absolute top-0 left-3 w-3 h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 pointer-events-none" />

              {/* Volume tick markings */}
              <div className="absolute right-2.5 top-5 bottom-12 flex flex-col justify-between items-end opacity-40 font-mono-swiss text-[8px] text-white pointer-events-none">
                <span>MAX</span>
                <span>— 750ml</span>
                <span>— 500ml</span>
                <span>— 250ml</span>
                <span className="text-[7px] text-[#D4AF37]">VENENO</span>
              </div>

              {/* Drop hint when dragging over */}
              <AnimatePresence>
                {isHoveringBlender && !isBlending && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-3 top-3 py-1 rounded-xl bg-[#D4AF37]/25 border border-[#D4AF37]/60 text-center font-mono-swiss text-[10px] text-[#F3E5AB] uppercase tracking-wider z-20"
                  >
                    ¡Suelta dentro!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* VORTEX ANIMATION WHEN BLENDING */}
              {isBlending && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/80 via-[#F3E5AB]/60 to-transparent flex items-center justify-center overflow-hidden z-20"
                >
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
                {/* 1. Grapes (Valdepeñas) */}
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
                    className="flex flex-col items-center select-none"
                    title="Uvas de Valdepeñas"
                  >
                    <span className="text-3xl sm:text-4xl filter drop-shadow-md">🍇</span>
                    <span className="font-mono-swiss text-[8px] text-[#A855F7] font-semibold mt-0.5">
                      Valdepeñas
                    </span>
                  </motion.div>
                )}

                {/* 2. Meat (Argentina) */}
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
                    className="flex flex-col items-center select-none"
                    title="Carne de Argentina"
                  >
                    <span className="text-3xl sm:text-4xl filter drop-shadow-md">🥩</span>
                    <span className="font-mono-swiss text-[8px] text-[#EF4444] font-semibold mt-0.5">
                      Argentina
                    </span>
                  </motion.div>
                )}

                {/* 3. Orange (Valencia) */}
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
                    className="flex flex-col items-center select-none"
                    title="Naranja de Valencia"
                  >
                    <span className="text-3xl sm:text-4xl filter drop-shadow-md">🍊</span>
                    <span className="font-mono-swiss text-[8px] text-[#F97316] font-semibold mt-0.5">
                      Valencia
                    </span>
                  </motion.div>
                )}

                {/* Empty State Prompt */}
                {totalAdded === 0 && !isHoveringBlender && (
                  <span className="font-mono-swiss text-[10px] text-white/40 uppercase tracking-wider pb-3 animate-pulse">
                    Arrastra aquí dentro
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

        {/* 3 DRAGGABLE INGREDIENT TILES */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-6">
          {INGREDIENTS.map((item) => {
            const isAdded = added[item.id];

            return (
              <div key={item.id} className="relative flex flex-col items-center">
                {!isAdded ? (
                  <motion.div
                    drag
                    dragSnapToOrigin={true}
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 1.25, zIndex: 60 }}
                    onDrag={handleDrag}
                    onDragEnd={(e, info) => handleDragEnd(item.id, e, info)}
                    onClick={() => handleAddIngredient(item.id)}
                    className="w-full p-3 sm:p-4 rounded-2xl border-2 border-white/20 bg-[#18181b]/95 hover:border-[#D4AF37]/60 shadow-xl cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 transition-colors touch-none select-none group"
                    title={`Arrastra ${item.name} (${item.region}) a la licuadora`}
                  >
                    <span className="text-3xl sm:text-4xl filter drop-shadow transform group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </span>
                    <span className="font-mono-swiss text-xs font-semibold text-white leading-tight">
                      {item.name}
                    </span>
                    <span className="font-mono-swiss text-[10px] text-[#D4AF37] font-medium tracking-wide">
                      {item.region}
                    </span>
                  </motion.div>
                ) : (
                  <div className="w-full p-3 sm:p-4 rounded-2xl border border-white/10 bg-white/[0.02] opacity-40 flex flex-col items-center gap-1 select-none cursor-default">
                    <span className="text-3xl sm:text-4xl grayscale opacity-50">
                      {item.emoji}
                    </span>
                    <span className="font-mono-swiss text-xs text-white/50 leading-tight">
                      {item.name}
                    </span>
                    <span className="font-mono-swiss text-[10px] text-emerald-400 font-medium">
                      ✓ En la licuadora
                    </span>
                  </div>
                )}
              </div>
            );
          })}
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
                    : `Arrastra los 3 (${totalAdded}/3)`}
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
