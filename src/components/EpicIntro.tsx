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

/* Semi-Realistic Volumetric Ingredients (Editorial 3D sheen, no cartoon strokes) */
const GrapesIllustration: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="grape_front" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#d8b4fe" />
        <stop offset="25%" stopColor="#a855f7" />
        <stop offset="70%" stopColor="#6b21a8" />
        <stop offset="100%" stopColor="#3b0764" />
      </radialGradient>
      <radialGradient id="grape_mid" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="30%" stopColor="#9333ea" />
        <stop offset="75%" stopColor="#581c87" />
        <stop offset="100%" stopColor="#2e1065" />
      </radialGradient>
      <radialGradient id="grape_back" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="40%" stopColor="#6b21a8" />
        <stop offset="85%" stopColor="#3b0764" />
        <stop offset="100%" stopColor="#1e0538" />
      </radialGradient>
      <linearGradient id="grape_stem" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      <linearGradient id="grape_leaf_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="60%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
    </defs>

    {/* Botanical leaf with subtle vein */}
    <path
      d="M26 9 C31 5, 39 7, 41 12 C36 14, 29 13, 26 9 Z"
      fill="url(#grape_leaf_grad)"
    />
    <path d="M27 9.5 Q33 10, 39 12" stroke="#86efac" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

    {/* Natural wooden stalk */}
    <path
      d="M24 6 C24 10, 25 12, 26 14"
      stroke="url(#grape_stem)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Back layer grapes (depth & occlusion) */}
    <circle cx="16" cy="20" r="4.8" fill="url(#grape_back)" />
    <circle cx="31" cy="20" r="4.8" fill="url(#grape_back)" />
    <circle cx="13" cy="27" r="4.6" fill="url(#grape_back)" />
    <circle cx="34" cy="27" r="4.6" fill="url(#grape_back)" />
    <circle cx="17" cy="34" r="4.2" fill="url(#grape_back)" />
    <circle cx="30" cy="34" r="4.2" fill="url(#grape_back)" />

    {/* Mid layer grapes */}
    <circle cx="21" cy="18" r="5.2" fill="url(#grape_mid)" />
    <circle cx="27" cy="18" r="5.2" fill="url(#grape_mid)" />
    <circle cx="18" cy="26" r="5.2" fill="url(#grape_mid)" />
    <circle cx="29" cy="26" r="5.2" fill="url(#grape_mid)" />
    <circle cx="20" cy="33" r="4.6" fill="url(#grape_mid)" />
    <circle cx="27" cy="33" r="4.6" fill="url(#grape_mid)" />
    <circle cx="23.5" cy="40" r="4" fill="url(#grape_mid)" />

    {/* Foreground central grapes with realistic soft specular light */}
    <circle cx="23.5" cy="24" r="5.6" fill="url(#grape_front)" />
    <ellipse cx="22" cy="22.5" rx="1.6" ry="1" fill="#ffffff" opacity="0.65" transform="rotate(-25 22 22.5)" />
    <ellipse cx="17" cy="24.5" rx="1.3" ry="0.8" fill="#ffffff" opacity="0.55" transform="rotate(-25 17 24.5)" />
    <ellipse cx="28" cy="24.5" rx="1.3" ry="0.8" fill="#ffffff" opacity="0.55" transform="rotate(-25 28 24.5)" />
    <circle cx="23.5" cy="32" r="5.1" fill="url(#grape_front)" />
    <ellipse cx="22.5" cy="30.5" rx="1.4" ry="0.8" fill="#ffffff" opacity="0.6" transform="rotate(-25 22.5 30.5)" />
  </svg>
);

const MeatIllustration: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* 3D Meat Cut Side (Thickness) */}
      <linearGradient id="meat_side_grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7f1d1d" />
        <stop offset="100%" stopColor="#450a0a" />
      </linearGradient>

      {/* Fresh Prime Beef Top Surface */}
      <radialGradient id="meat_top_grad" cx="42%" cy="38%" r="65%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="35%" stopColor="#dc2626" />
        <stop offset="75%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>

      {/* Outer Fat Cap */}
      <linearGradient id="fat_outer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff1f2" />
        <stop offset="60%" stopColor="#fecdd3" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>

      {/* Marrow Bone */}
      <radialGradient id="marrow_bone" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </radialGradient>
    </defs>

    {/* 3D Extruded Bottom Edge (Thickness shadow) */}
    <path
      d="M10 24 C10 16, 21 13, 34 15 C42 16, 44 24, 40 33 C36 41, 26 43, 16 41 C9 39, 10 31, 10 24 Z"
      fill="url(#meat_side_grad)"
    />

    {/* Outer Fat Ribbon (Borde de grasa natural) */}
    <path
      d="M9 22 C9 14, 20 11, 33 13 C41 14, 43 22, 39 31 C35 39, 25 41, 15 39 C8 37, 9 29, 9 22 Z"
      fill="url(#fat_outer)"
      opacity="0.95"
    />

    {/* Main Steak Cut Flesh */}
    <path
      d="M11 22 C11 15, 21 13, 32 15 C39 16, 40 23, 37 30 C33 37, 24 39, 16 37 C11 35, 11 28, 11 22 Z"
      fill="url(#meat_top_grad)"
    />

    {/* Organic Marbling Veins (Veteado realista de grasa) */}
    <path
      d="M15 19 Q20 23, 26 19 T33 22"
      stroke="#fee2e2"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M17 26 Q23 25, 29 28"
      stroke="#fecaca"
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M19 32 Q25 30, 31 33"
      stroke="#fee2e2"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.75"
    />
    <path
      d="M24 16 Q27 21, 26 26"
      stroke="#fff1f2"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* Small Center-Side Bone (Hueso chuletón) */}
    <ellipse cx="32" cy="19" rx="4.5" ry="3.8" fill="url(#marrow_bone)" />
    <ellipse cx="32" cy="19" rx="2.2" ry="1.8" fill="#78350f" opacity="0.85" />

    {/* Fresh meat surface sheen reflection */}
    <path
      d="M14 21 Q19 16, 26 16"
      stroke="#ffffff"
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

const OrangeIllustration: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* 3D Volumetric Citrus Sphere */}
      <radialGradient id="orange_volume" cx="34%" cy="30%" r="68%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="18%" stopColor="#fdba74" />
        <stop offset="45%" stopColor="#fb923c" />
        <stop offset="75%" stopColor="#ea580c" />
        <stop offset="92%" stopColor="#c2410c" />
        <stop offset="100%" stopColor="#7c2d12" />
      </radialGradient>

      {/* Fresh Green Leaf */}
      <linearGradient id="citrus_leaf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="50%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#052e16" />
      </linearGradient>

      {/* Soft Ambient Ground Shadow */}
      <radialGradient id="ambient_shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ambient base shadow */}
    <ellipse cx="24" cy="43" rx="14" ry="3" fill="url(#ambient_shadow)" />

    {/* Main Orange 3D Sphere */}
    <circle cx="24" cy="27" r="16" fill="url(#orange_volume)" />

    {/* Subtle Citrus Skin Pores / Dimples Texture */}
    <circle cx="18" cy="22" r="0.8" fill="#c2410c" opacity="0.3" />
    <circle cx="28" cy="23" r="0.8" fill="#c2410c" opacity="0.3" />
    <circle cx="22" cy="31" r="0.8" fill="#c2410c" opacity="0.3" />
    <circle cx="30" cy="30" r="0.8" fill="#c2410c" opacity="0.3" />
    <circle cx="16" cy="29" r="0.8" fill="#c2410c" opacity="0.3" />
    <circle cx="25" cy="36" r="0.8" fill="#7c2d12" opacity="0.3" />

    {/* Specular Sunlit Crescent Glint */}
    <path
      d="M16 20 C18 15, 23 13, 27 13"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.65"
    />

    {/* Natural Botanical Stem */}
    <path
      d="M24 12 C24 8, 25 6, 27 4.5"
      stroke="#78350f"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Star-shaped Calyx (Corona de la naranja) */}
    <path
      d="M24 11.5 L22 13 L23 11 L21.5 9.5 L23.5 10 L24 8 L24.5 10 L26.5 9.5 L25 11 L26 13 Z"
      fill="#15803d"
    />

    {/* Fresh Green Citrus Leaf */}
    <path
      d="M25 8.5 C29 4.5, 38 6, 40 10.5 C35 12, 28 11.5, 25 8.5 Z"
      fill="url(#citrus_leaf)"
    />
    <path
      d="M26 8.5 Q32 9, 38 10.5"
      stroke="#86efac"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.6"
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

            {/* MINIMALIST BLENDER MOTOR BASE (NO TEXT, NO NUMBERS) */}
            <div className="relative w-38 sm:w-44 h-14 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 rounded-b-2xl border-t-2 border-[#8fae78]/40 shadow-2xl flex items-center justify-center">
              {/* Minimalist Dial with Olive Glow Indicator */}
              <motion.div
                animate={isBlending ? { rotate: 90 } : {}}
                className="relative w-8 h-8 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-600 shadow-inner flex items-center justify-center cursor-pointer"
              >
                <div className="w-1 h-3 rounded-full bg-[#8fae78] shadow-[0_0_8px_rgba(143,174,120,0.85)]" />
              </motion.div>
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
