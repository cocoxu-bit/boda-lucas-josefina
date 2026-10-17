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
  color: string;
}

const INGREDIENTS: IngredientInfo[] = [
  {
    id: "grapes",
    name: "Uvas",
    region: "Valdepeñas",
    color: "#a855f7",
  },
  {
    id: "meat",
    name: "Carne",
    region: "Argentina",
    color: "#ef4444",
  },
  {
    id: "orange",
    name: "Naranja",
    region: "Valencia",
    color: "#f97316",
  },
];

/* Custom Vector Illustrated Ingredients (No generic emojis) */
const GrapesIllustration: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M24 5 C24 9, 25 11, 27 13" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M26 8 C30 6, 36 7, 38 11 C34 13, 29 12, 26 10 Z" fill="#15803d" stroke="#14532d" strokeWidth="1" />
    <circle cx="19" cy="18" r="5" fill="#9333ea" stroke="#581c87" strokeWidth="1" />
    <circle cx="17.5" cy="16.5" r="1.5" fill="#f3e8ff" opacity="0.9" />
    <circle cx="28" cy="18" r="5" fill="#a855f7" stroke="#581c87" strokeWidth="1" />
    <circle cx="26.5" cy="16.5" r="1.5" fill="#f3e8ff" opacity="0.9" />
    <circle cx="14" cy="25" r="5" fill="#7e22ce" stroke="#4c1d95" strokeWidth="1" />
    <circle cx="12.5" cy="23.5" r="1.5" fill="#e9d5ff" opacity="0.8" />
    <circle cx="23.5" cy="24" r="5" fill="#9333ea" stroke="#581c87" strokeWidth="1" />
    <circle cx="22" cy="22.5" r="1.5" fill="#f3e8ff" opacity="0.9" />
    <circle cx="33" cy="25" r="5" fill="#7e22ce" stroke="#4c1d95" strokeWidth="1" />
    <circle cx="31.5" cy="23.5" r="1.5" fill="#e9d5ff" opacity="0.8" />
    <circle cx="19" cy="32" r="4.5" fill="#6b21a8" stroke="#3b0764" strokeWidth="1" />
    <circle cx="17.5" cy="31" r="1.2" fill="#e9d5ff" opacity="0.8" />
    <circle cx="28" cy="32" r="4.5" fill="#7e22ce" stroke="#4c1d95" strokeWidth="1" />
    <circle cx="26.5" cy="31" r="1.2" fill="#f3e8ff" opacity="0.8" />
    <circle cx="23.5" cy="39" r="4" fill="#581c87" stroke="#2e1065" strokeWidth="1" />
    <circle cx="22.5" cy="38" r="1" fill="#f3e8ff" opacity="0.8" />
  </svg>
);

const MeatIllustration: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 21 C10 13, 21 10, 33 12 C41 13, 42 22, 38 31 C34 38, 25 40, 16 38 C9 36, 10 28, 10 21 Z"
      fill="#b91c1c"
      stroke="#7f1d1d"
      strokeWidth="2"
    />
    <path
      d="M13 22 C13 16, 22 13, 31 15 C37 16, 38 23, 35 29 C32 35, 24 37, 17 35 C12 33, 13 27, 13 22 Z"
      fill="#dc2626"
    />
    <path d="M16 19 Q21 23, 27 19 T34 23" stroke="#fecaca" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
    <path d="M18 27 Q24 26, 29 30" stroke="#fecaca" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    <path d="M21 33 Q26 31, 31 34" stroke="#fecaca" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
    <path
      d="M31 12 C36 13, 41 17, 40 24 C37 23, 33 18, 31 12 Z"
      fill="#f8fafc"
      stroke="#cbd5e1"
      strokeWidth="1"
    />
  </svg>
);

const OrangeIllustration: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="24" cy="26" r="16" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
    <circle cx="21" cy="23" r="13" fill="#fb923c" opacity="0.7" />
    <circle cx="18" cy="22" r="0.9" fill="#9a3412" opacity="0.4" />
    <circle cx="27" cy="24" r="0.9" fill="#9a3412" opacity="0.4" />
    <circle cx="22" cy="30" r="0.9" fill="#9a3412" opacity="0.4" />
    <circle cx="29" cy="29" r="0.9" fill="#9a3412" opacity="0.4" />
    <path d="M15 19 A12 12 0 0 1 24 13" stroke="#ffedd5" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    <path d="M24 11 C24 8, 25 6, 26 5" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M25 8 C29 5, 36 6, 38 10 C34 11, 28 11, 25 8 Z"
      fill="#16a34a"
      stroke="#14532d"
      strokeWidth="1"
    />
  </svg>
);

const IngredientIcon: React.FC<{ id: IngredientId; className?: string }> = ({ id, className = "w-10 h-10" }) => {
  if (id === "grapes") return <GrapesIllustration className={className} />;
  if (id === "meat") return <MeatIllustration className={className} />;
  return <OrangeIllustration className={className} />;
};

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

    setTimeout(() => {
      setIsWarping(true);
      if (onEnter) onEnter();

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
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0d130e] border-b border-[#8fae78]/25 shadow-2xl z-20"
      >
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#8fae78_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>

      {/* 2. BOTTOM SHUTTER PANEL */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isWarping ? "100%" : 0 }}
        transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0d130e] border-t border-[#8fae78]/25 shadow-2xl z-20"
      >
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#8fae78_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>

      {/* 3. RADIAL BACKSTAGE SPOTLIGHT */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,_rgba(143,174,120,0.16)_0%,_transparent_65%)] pointer-events-none" />

      {/* 4. MAIN MINIGAME STAGE */}
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
        <div className="space-y-2 mb-5 sm:mb-6">
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-white italic tracking-tight leading-tight">
            Bienvenido a la boda de Josefina y Lucas
          </h2>

          <p className="font-sans-ui text-xs sm:text-sm text-white/80 max-w-sm sm:max-w-md mx-auto font-light leading-relaxed">
            Arrastra los ingredientes a la licuadora para entrar
          </p>
        </div>

        {/* REALISTIC BLENDER APPLIANCE */}
        <div className="relative w-full flex flex-col items-center mb-5">
          <motion.div
            animate={
              isBlending
                ? {
                    x: [-2.5, 2.5, -2.5, 2.5, 0],
                    y: [-1, 1.5, -1.5, 1, 0],
                    rotate: [-0.8, 0.8, -0.8, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.08,
              repeat: isBlending ? Infinity : 0,
            }}
            className="relative flex flex-col items-center"
          >
            {/* Ambient golden/olive glow behind jar */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[45px] pointer-events-none transition-all duration-700 ${
                isBlending
                  ? "w-72 h-72 bg-[#8fae78]/50"
                  : isHoveringBlender
                  ? "w-64 h-64 bg-[#8fae78]/30"
                  : isReadyToBlend
                  ? "w-56 h-56 bg-[#8fae78]/20"
                  : "w-40 h-40 bg-white/5"
              }`}
            />

            {/* BLENDER TOP LID WITH CENTER FILLER CAP */}
            <div className="relative z-20 flex flex-col items-center">
              {/* Removable center plug / feeder cap */}
              <div className="w-9 h-3.5 rounded-t-md bg-zinc-700 border border-zinc-500 shadow-sm" />
              {/* Main rubber lid */}
              <div className="w-44 sm:w-50 h-3.5 rounded-t-lg bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-600 shadow-md flex items-center justify-between px-3">
                <div className="w-2 h-1 bg-zinc-600 rounded-full" />
                <div className="w-2 h-1 bg-zinc-600 rounded-full" />
              </div>
            </div>

            {/* BLENDER GLASS PITCHER (JUG) WITH HANDLE & MEASURING TICKS */}
            <div className="relative flex items-center">
              {/* Transparent Glass Jug Body (Tapered shape) */}
              <div
                ref={blenderRef}
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)",
                }}
                className={`relative w-44 h-52 sm:w-50 sm:h-56 border-2 transition-all duration-300 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col justify-end p-3 ${
                  isHoveringBlender
                    ? "border-[#8fae78] bg-white/[0.14] shadow-[0_0_40px_rgba(143,174,120,0.45)]"
                    : isReadyToBlend
                    ? "border-[#8fae78]/60 bg-gradient-to-b from-white/12 via-white/[0.05] to-white/12"
                    : "border-white/25 bg-gradient-to-b from-white/10 via-white/[0.04] to-white/10"
                }`}
              >
                {/* Spout on top-left lip */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-white/20 transform -skew-x-12" />

                {/* Curved Glass Reflection Highlight */}
                <div className="absolute top-0 left-4 w-4 h-full bg-gradient-to-r from-white/25 to-transparent transform -skew-x-6 pointer-events-none" />

                {/* Glass Measurement Ticks */}
                <div className="absolute right-4 top-4 bottom-14 flex flex-col justify-between items-end opacity-45 font-mono-swiss text-[8px] text-white pointer-events-none">
                  <span className="text-[7.5px] text-[#8fae78] font-semibold">max 1.5l</span>
                  <span>— 1.0l</span>
                  <span>— 0.5l</span>
                  <span>— 250ml</span>
                </div>

                {/* Drop hint when hovering over blender */}
                <AnimatePresence>
                  {isHoveringBlender && !isBlending && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-x-4 top-4 py-1 rounded-xl bg-[#8fae78]/25 border border-[#8fae78]/60 text-center font-mono-swiss text-[10px] text-[#dce7d6] z-20"
                    >
                      ¡suelta dentro!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* VORTEX ANIMATION WHEN BLENDING */}
                {isBlending && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#8fae78]/85 via-[#dce7d6]/65 to-transparent flex items-center justify-center overflow-hidden z-20"
                  >
                    <motion.div
                      animate={{ rotate: 1440 }}
                      transition={{ duration: 1.2, ease: "linear" }}
                      className="w-40 h-40 rounded-full border-4 border-dashed border-white/60 flex items-center justify-center opacity-85"
                    >
                      <div className="w-20 h-20 rounded-full border-2 border-white/50" />
                    </motion.div>
                  </motion.div>
                )}

                {/* INGREDIENTS INSIDE THE GLASS JUG */}
                <div className="relative z-10 flex items-end justify-center gap-2 pb-3 min-h-[90px]">
                  {/* Grapes */}
                  {added.grapes && (
                    <motion.div
                      initial={{ y: -120, opacity: 0, scale: 0.3 }}
                      animate={
                        isBlending
                          ? { scale: [1, 0], opacity: [1, 0], rotate: [0, 360] }
                          : { y: 0, opacity: 1, scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="flex flex-col items-center select-none"
                    >
                      <IngredientIcon id="grapes" className="w-11 h-11 drop-shadow-lg" />
                    </motion.div>
                  )}

                  {/* Meat */}
                  {added.meat && (
                    <motion.div
                      initial={{ y: -120, opacity: 0, scale: 0.3 }}
                      animate={
                        isBlending
                          ? { scale: [1, 0], opacity: [1, 0], rotate: [0, -360] }
                          : { y: 0, opacity: 1, scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="flex flex-col items-center select-none"
                    >
                      <IngredientIcon id="meat" className="w-11 h-11 drop-shadow-lg" />
                    </motion.div>
                  )}

                  {/* Orange */}
                  {added.orange && (
                    <motion.div
                      initial={{ y: -120, opacity: 0, scale: 0.3 }}
                      animate={
                        isBlending
                          ? { scale: [1, 0], opacity: [1, 0], rotate: [0, 360] }
                          : { y: 0, opacity: 1, scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 350, damping: 18 }}
                      className="flex flex-col items-center select-none"
                    >
                      <IngredientIcon id="orange" className="w-11 h-11 drop-shadow-lg" />
                    </motion.div>
                  )}
                </div>

                {/* 4-POINT STEEL ROTATING BLADES AT BOTTOM */}
                <div className="relative z-10 w-full flex items-center justify-center pt-1 border-t border-white/20">
                  <motion.div
                    animate={isBlending ? { rotate: 2160 } : {}}
                    transition={{ duration: 1.2, ease: "linear" }}
                    className="relative w-7 h-7 flex items-center justify-center"
                  >
                    {/* Horizontal blade */}
                    <div className="absolute w-7 h-1.5 bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-400 rounded-sm shadow-sm" />
                    {/* Vertical blade */}
                    <div className="absolute w-1.5 h-7 bg-gradient-to-b from-zinc-400 via-zinc-100 to-zinc-400 rounded-sm shadow-sm" />
                    {/* Center nut */}
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-400 z-10" />
                  </motion.div>
                </div>
              </div>

              {/* ERGONOMIC GLASS HANDLE ON THE RIGHT */}
              <div
                className="w-5 sm:w-6 h-32 rounded-r-2xl border-4 border-l-0 border-white/35 bg-white/[0.04] shadow-md pointer-events-none"
                style={{ marginLeft: "-2px" }}
              />
            </div>

            {/* BLENDER MOTOR BASE WITH ANALOG DIAL */}
            <div className="relative w-38 sm:w-44 h-15 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-b-2xl border-t-2 border-[#8fae78]/40 shadow-2xl flex items-center justify-between px-4">
              <span className="font-serif-editorial text-xs text-[#8fae78] italic">
                j & l
              </span>

              {/* Analog Speed Dial */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={isBlending ? { rotate: 90 } : {}}
                  className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-600 flex items-center justify-center shadow-inner cursor-pointer"
                >
                  <div className="w-1 h-3.5 bg-[#8fae78] rounded-full" />
                </motion.div>
                <span className="font-mono-swiss text-[7px] text-zinc-400 mt-0.5">
                  0 • 1 • 2 • pulse
                </span>
              </div>

              <span className="font-mono-swiss text-[8px] text-zinc-400">
                2027
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3 DRAGGABLE INGREDIENT TILES (ILLUSTRATED, NO EMOJIS) */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-md mb-5">
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
                    className="w-full p-2.5 sm:p-3.5 rounded-2xl border border-[#8fae78]/25 bg-[#141d15] hover:border-[#8fae78]/60 shadow-xl cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 transition-colors touch-none select-none group"
                    title={`Arrastra ${item.name} a la licuadora`}
                  >
                    <div className="transform group-hover:scale-110 transition-transform">
                      <IngredientIcon id={item.id} className="w-10 h-10 sm:w-11 sm:h-11" />
                    </div>
                    <span className="font-mono-swiss text-xs font-semibold text-white leading-tight mt-1">
                      {item.name}
                    </span>
                  </motion.div>
                ) : (
                  <div className="w-full p-2.5 sm:p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] opacity-40 flex flex-col items-center gap-1 select-none cursor-default">
                    <div className="grayscale opacity-50">
                      <IngredientIcon id={item.id} className="w-10 h-10 sm:w-11 sm:h-11" />
                    </div>
                    <span className="font-mono-swiss text-xs text-white/40 leading-tight mt-1">
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MAIN CTA BUTTON: BLEND & ENTER (NO UPPERCASE) */}
        <div className="w-full max-w-sm">
          <motion.button
            onClick={handleStartBlend}
            disabled={!isReadyToBlend || isBlending || isWarping}
            whileHover={isReadyToBlend ? { scale: 1.03 } : {}}
            whileTap={isReadyToBlend ? { scale: 0.97 } : {}}
            className={`w-full relative flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-6 rounded-full font-mono-swiss text-xs sm:text-sm font-semibold transition-all overflow-hidden ${
              isReadyToBlend
                ? "bg-gradient-to-r from-[#6e875a] via-[#bad1a5] to-[#6e875a] text-black shadow-[0_0_30px_rgba(143,174,120,0.6)] hover:shadow-[0_0_45px_rgba(143,174,120,0.85)] cursor-pointer"
                : "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed opacity-60"
            }`}
          >
            {isBlending ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-black" />
                <span>batiendo la mezcla...</span>
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
                    ? "remover y entrar"
                    : `arrastra los 3 ingredientes (${totalAdded}/3)`}
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
