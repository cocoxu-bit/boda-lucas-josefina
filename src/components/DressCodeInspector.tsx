"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, XCircle, Heart } from "lucide-react";

type MoodType = "love" | "meh" | "veto";

interface OutfitExample {
  id: string;
  category: "Para Ellos & Ellas" | "Para Ellas" | "Para Ellos" | "Prohibido";
  title: string;
  score: string;
  scoreNum: number;
  mood: MoodType;
  quote: string;
  babyReaction: string;
  badges: string[];
  emoji: string;
}

const OUTFITS: OutfitExample[] = [
  {
    id: "smart-sneakers",
    category: "Para Ellos & Ellas",
    title: "Traje Informal + Sneakers Limpias",
    score: "10 / 10",
    scoreNum: 10,
    mood: "love",
    quote: "¡Sí a todo! Traje moderno sin corbata o blazer con camiseta básica de algodón. Y las zapatillas son el secreto para aguantar 8 horas de pie en Veneno.",
    babyReaction: "👶 El peque aplaude: ¡Cómodos para cogerle en brazos!",
    badges: ["100% Aprobado", "Cómodo para bailar", "Estilo indie chic"],
    emoji: "👔👟",
  },
  {
    id: "midi-jumpsuit",
    category: "Para Ellas",
    title: "Vestido Midi / Mono Contemporáneo",
    score: "10 / 10",
    scoreNum: 10,
    mood: "love",
    quote: "Elegante, fresco y con libertad total de movimiento para pillar el cóctel al vuelo. Tacón sensato, botín o bailarinas. ¡Matrícula de honor!",
    babyReaction: "👶 El peque sonríe: ¡Colorido y sin peligro de tirones!",
    badges: ["Rollazo absoluto", "Cero peligro de caída", "Fotogénico"],
    emoji: "👗✨",
  },
  {
    id: "stiletto-long",
    category: "Para Ellas",
    title: "Vestido de Alfombra Roja + Tacón de 15cm",
    score: "4 / 10",
    scoreNum: 4,
    mood: "meh",
    quote: "Irás espectacular los primeros 25 minutos de fotos en Monforte. En Veneno a las 16:00 estarás pidiendo tiritas a gritos. Si te lo pones, mete unas zapatillas en el bolso.",
    babyReaction: "👶 El peque duda: ¡Cuidado con el equilibrio!",
    badges: ["Riesgo de ampolla: 99%", "Obligatorio calzado de repuesto"],
    emoji: "👠😣",
  },
  {
    id: "chaque-rigido",
    category: "Para Ellos",
    title: "Chaqué Clásico con Chistera y Chaleco Rígido",
    score: "0 / 10",
    scoreNum: 0,
    mood: "veto",
    quote: "¡Por favor, no! Esto es una boda civil y vamos directos a Veneno, no a una gala en Buckingham. Vas a pasar un calor infernal y no vas a poder bailar Daft Punk.",
    babyReaction: "👶 El peque llora de susto con la chistera.",
    badges: ["Veto total", "Demasiado encorsetado", "No pega nada"],
    emoji: "🎩❌",
  },
  {
    id: "playa-chanclas",
    category: "Prohibido",
    title: "Bermudas de Playa, Camiseta de Tirantes y Chanclas",
    score: "-5 / 10",
    scoreNum: -5,
    mood: "veto",
    quote: "A ver, tampoco te pases de alternativo, pillín. Es nuestra boda civil, no el chiringuito de la Malvarrosa. Ven guapo y arreglado.",
    babyReaction: "👶 El peque saca tarjeta roja directa.",
    badges: ["Tarjeta roja directa", "Respeta el evento"],
    emoji: "🩳🩴",
  },
];

// High-fidelity Custom Illustrated Avatars matching Lucas, Josefina & their baby
const FamilyAvatars: React.FC<{ mood: MoodType }> = ({ mood }) => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8 py-3">
      {/* LUCAS AVATAR (Brown short hair, round gold glasses, neat moustache & beard, white t-shirt) */}
      <motion.div
        animate={
          mood === "veto"
            ? { x: [-3, 3, -3, 3, 0] }
            : mood === "love"
            ? { y: [0, -4, 0] }
            : {}
        }
        transition={{ repeat: Infinity, duration: mood === "veto" ? 0.3 : 2 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--card-border)] bg-[#f7ede2] dark:bg-[#1a1715] flex items-center justify-center overflow-hidden shadow-lg">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            {/* White T-shirt Neck */}
            <path d="M 40 102 L 40 120 L 80 120 L 80 102 Z" fill="#ececee" />
            <path d="M 38 106 Q 60 118 82 106" stroke="#ffffff" strokeWidth="8" fill="none" />
            <path d="M 38 106 Q 60 118 82 106" stroke="#d4d4d8" strokeWidth="1.5" fill="none" />

            {/* Neck */}
            <path d="M 46 82 L 46 104 Q 60 108 74 104 L 74 82 Z" fill="#f5d0b5" />

            {/* Ears */}
            <circle cx="29" cy="62" r="7.5" fill="#f5d0b5" />
            <circle cx="91" cy="62" r="7.5" fill="#f5d0b5" />

            {/* Head Shape */}
            <path d="M 32 46 C 32 26, 88 26, 88 46 C 88 74, 76 93, 60 93 C 44 93, 32 74, 32 46 Z" fill="#f7d5bd" />

            {/* Lucas's Dark Brown Hair (Short sides, natural top volume) */}
            <path d="M 28 44 C 26 22, 94 20, 92 44 C 91 30, 80 20, 60 20 C 40 20, 29 30, 28 44 Z" fill="#241b16" />
            <path d="M 32 36 Q 48 24 64 25 Q 78 26 88 35 Q 70 28 48 30 Z" fill="#32241d" />

            {/* Beard & Stubble along jawline & chin */}
            <path d="M 34 62 Q 60 96 86 62 Q 80 88 60 91 Q 40 88 34 62 Z" fill="#241b16" opacity="0.3" />
            {/* Dark neat moustache */}
            <path d="M 46 73 Q 60 70 74 73 Q 68 78 60 77 Q 52 78 46 73 Z" fill="#241b16" />

            {/* Eyebrows */}
            <path d="M 37 46 Q 46 43 54 46" stroke="#241b16" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 66 46 Q 74 43 83 46" stroke="#241b16" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Lucas's Gold Wireframe Round Glasses (Signature Look) */}
            <circle cx="45" cy="56" r="11" stroke="#c59b27" strokeWidth="2" fill="rgba(255,255,255,0.18)" />
            <circle cx="75" cy="56" r="11" stroke="#c59b27" strokeWidth="2" fill="rgba(255,255,255,0.18)" />
            <path d="M 56 55 Q 60 52 64 55" stroke="#c59b27" strokeWidth="1.8" fill="none" />
            <line x1="34" y1="55" x2="29" y2="58" stroke="#c59b27" strokeWidth="1.5" />
            <line x1="86" y1="55" x2="91" y2="58" stroke="#c59b27" strokeWidth="1.5" />

            {/* Eyes according to mood */}
            {mood === "love" && (
              <>
                <path d="M 40 56 Q 45 50 50 56" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 70 56 Q 75 50 80 56" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <ellipse cx="38" cy="64" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
                <ellipse cx="82" cy="64" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
              </>
            )}
            {mood === "meh" && (
              <>
                <circle cx="47" cy="56" r="2.5" fill="#1c1917" />
                <circle cx="77" cy="56" r="2.5" fill="#1c1917" />
              </>
            )}
            {mood === "veto" && (
              <>
                <line x1="41" y1="52" x2="49" y2="60" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="49" y1="52" x2="41" y2="60" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="71" y1="52" x2="79" y2="60" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="79" y1="52" x2="71" y2="60" stroke="#dc2626" strokeWidth="2.5" />
              </>
            )}

            {/* Nose */}
            <path d="M 60 55 Q 63 65 59 66" stroke="#d49b78" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Mouth */}
            {mood === "love" && (
              <path d="M 52 80 Q 60 88 68 80" stroke="#1c1917" strokeWidth="2.5" fill="#e11d48" />
            )}
            {mood === "meh" && (
              <line x1="53" y1="81" x2="67" y2="81" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
            )}
            {mood === "veto" && (
              <path d="M 52 84 Q 60 76 68 84" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
          </svg>

          {/* Floating Mood Badge */}
          <span className="absolute -bottom-1 -right-1 text-lg">
            {mood === "love" ? "😍" : mood === "meh" ? "😐" : "😱"}
          </span>
        </div>
        <span className="font-mono-swiss text-xs font-semibold text-[var(--fg-primary)] mt-1.5">
          Lucas
        </span>
      </motion.div>

      {/* THE BABY CAMEO (In their arms) */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={mood === "love" ? { rotate: [0, -8, 8, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[var(--accent-gold)] bg-[#fbebe3] dark:bg-[#231e1c] flex items-center justify-center shadow-md overflow-hidden"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Cute Baby Blue Vichy Gingham Bib/Romper */}
            <path d="M 28 80 L 28 100 L 72 100 L 72 80 Z" fill="#93c5fd" />
            {/* Baby Head */}
            <circle cx="50" cy="50" r="30" fill="#fde4d4" />
            {/* Gentle baby hair fuzz */}
            <path d="M 45 22 Q 50 18 55 22" stroke="#8a532d" strokeWidth="2" fill="none" />
            {/* Rosy baby cheeks */}
            <circle cx="34" cy="56" r="6" fill="#f43f5e" opacity="0.35" />
            <circle cx="66" cy="56" r="6" fill="#f43f5e" opacity="0.35" />
            {/* Eyes */}
            {mood === "love" && (
              <>
                <circle cx="40" cy="48" r="4.5" fill="#1c1917" />
                <circle cx="41.5" cy="46.5" r="1.5" fill="#ffffff" />
                <circle cx="60" cy="48" r="4.5" fill="#1c1917" />
                <circle cx="61.5" cy="46.5" r="1.5" fill="#ffffff" />
                <path d="M 44 62 Q 50 70 56 62" stroke="#1c1917" strokeWidth="2.5" fill="#f43f5e" />
              </>
            )}
            {mood === "meh" && (
              <>
                <path d="M 37 49 L 45 49" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
                <path d="M 55 49 L 63 49" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="62" r="3" fill="#1c1917" />
              </>
            )}
            {mood === "veto" && (
              <>
                <path d="M 36 50 Q 41 44 46 50" stroke="#dc2626" strokeWidth="2.5" fill="none" />
                <path d="M 54 50 Q 59 44 64 50" stroke="#dc2626" strokeWidth="2.5" fill="none" />
                <ellipse cx="50" cy="64" rx="5" ry="7" fill="#dc2626" />
              </>
            )}
          </svg>
          <span className="absolute -bottom-1 -right-1 text-xs">
            {mood === "love" ? "🍼" : mood === "meh" ? "💤" : "😭"}
          </span>
        </motion.div>
        <span className="font-mono-swiss text-[10px] text-[var(--accent-gold)] font-medium mt-1">
          El Peque
        </span>
      </div>

      {/* JOSEFINA AVATAR (Long wavy chestnut hair, warm smile, radiant eyes, white ruffle dress) */}
      <motion.div
        animate={
          mood === "veto"
            ? { x: [3, -3, 3, -3, 0] }
            : mood === "love"
            ? { y: [0, -4, 0] }
            : {}
        }
        transition={{ repeat: Infinity, duration: mood === "veto" ? 0.3 : 2, delay: 0.15 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--card-border)] bg-[#f7ede2] dark:bg-[#1a1715] flex items-center justify-center overflow-hidden shadow-lg">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            {/* Long Wavy Chestnut Hair Back Layer */}
            <path d="M 18 48 C 14 78, 16 115, 34 120 L 86 120 C 104 115, 106 78, 102 48 C 100 18, 20 18, 18 48 Z" fill="#4d2b17" />

            {/* White Dress Ruffle Neck */}
            <path d="M 42 102 L 42 120 L 78 120 L 78 102 Z" fill="#ffffff" />
            <path d="M 38 106 Q 60 114 82 106" stroke="#ffffff" strokeWidth="9" fill="none" />
            <path d="M 38 106 Q 60 114 82 106" stroke="#e4e4e7" strokeWidth="1.5" fill="none" />

            {/* Neck */}
            <path d="M 47 80 L 47 102 Q 60 106 73 102 L 73 80 Z" fill="#f8d6cc" />

            {/* Head Shape */}
            <path d="M 34 46 C 34 26, 86 26, 86 46 C 86 72, 76 91, 60 91 C 44 91, 34 72, 34 46 Z" fill="#fae0d6" />

            {/* Natural Wavy Hair Strands Falling Over Front */}
            <path d="M 24 38 Q 45 22 72 26 Q 96 32 94 56 Q 88 40 76 34 Q 50 30 32 44 Z" fill="#683d22" />
            <path d="M 18 52 Q 28 85 36 108 Q 28 82 24 58 Z" fill="#58321a" />
            <path d="M 102 52 Q 92 85 84 108 Q 92 82 96 58 Z" fill="#58321a" />

            {/* Eyebrows */}
            <path d="M 39 46 Q 47 42 55 46" stroke="#4d2b17" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 65 46 Q 73 42 81 46" stroke="#4d2b17" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Josefina's Expressive Warm Eyes */}
            {mood === "love" && (
              <>
                <path d="M 40 54 Q 47 48 54 54" stroke="#1c1917" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 66 54 Q 73 48 80 54" stroke="#1c1917" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                {/* Eyelashes */}
                <line x1="53" y1="50" x2="56" y2="47" stroke="#1c1917" strokeWidth="1.5" />
                <line x1="79" y1="50" x2="82" y2="47" stroke="#1c1917" strokeWidth="1.5" />
                {/* Blushing cheeks */}
                <ellipse cx="38" cy="64" rx="5" ry="3" fill="#f43f5e" opacity="0.38" />
                <ellipse cx="82" cy="64" rx="5" ry="3" fill="#f43f5e" opacity="0.38" />
              </>
            )}
            {mood === "meh" && (
              <>
                <circle cx="47" cy="54" r="3" fill="#1c1917" />
                <circle cx="73" cy="54" r="3" fill="#1c1917" />
                {/* Sweat drop */}
                <path d="M 85 45 Q 88 51 84 53 Q 82 51 85 45 Z" fill="#38bdf8" />
              </>
            )}
            {mood === "veto" && (
              <>
                <line x1="42" y1="50" x2="52" y2="58" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="52" y1="50" x2="42" y2="58" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="68" y1="50" x2="78" y2="58" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="78" y1="50" x2="68" y2="58" stroke="#dc2626" strokeWidth="2.5" />
              </>
            )}

            {/* Nose */}
            <path d="M 60 52 Q 62 63 58 64" stroke="#e0a996" strokeWidth="1.6" strokeLinecap="round" fill="none" />

            {/* Josefina's Radiant Smile with teeth showing */}
            {mood === "love" && (
              <>
                <path d="M 48 72 Q 60 84 72 72 Q 60 86 48 72 Z" fill="#ffffff" stroke="#1c1917" strokeWidth="1.5" />
                <path d="M 46 72 Q 60 87 74 72" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            )}
            {mood === "meh" && (
              <path d="M 50 74 Q 60 70 70 74" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
            {mood === "veto" && (
              <ellipse cx="60" cy="74" rx="6" ry="7" fill="#1c1917" />
            )}
          </svg>

          {/* Floating Mood Badge */}
          <span className="absolute -bottom-1 -right-1 text-lg">
            {mood === "love" ? "🥰" : mood === "meh" ? "😬" : "🙅‍♀️"}
          </span>
        </div>
        <span className="font-mono-swiss text-xs font-semibold text-[var(--fg-primary)] mt-1.5">
          Josefina
        </span>
      </motion.div>
    </div>
  );
};

export const DressCodeInspector: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentOutfit = OUTFITS[currentIndex];

  const nextOutfit = () => {
    setCurrentIndex((prev) => (prev + 1) % OUTFITS.length);
  };

  const prevOutfit = () => {
    setCurrentIndex((prev) => (prev - 1 + OUTFITS.length) % OUTFITS.length);
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto py-10 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center space-y-1 mb-5">
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          Dress Code
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Arreglado pero cómodo. Pasa los ejemplos para ver qué nos parece:
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="theme-card rounded-3xl p-5 sm:p-6 shadow-xl overflow-hidden transition-all">
        {/* Animated Recreations Header */}
        <div className="border-b border-[var(--card-border)] pb-2 mb-3">
          <FamilyAvatars mood={currentOutfit.mood} />
        </div>

        {/* Outfit Card Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOutfit.id}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-3"
          >
            {/* Header info */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono-swiss text-[11px] uppercase tracking-wider text-[var(--fg-muted)]">
                {currentOutfit.category}
              </span>

              {/* Score Indicator */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono-swiss font-bold ${
                  currentOutfit.mood === "love"
                    ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                    : currentOutfit.mood === "meh"
                    ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                    : "bg-red-500/15 text-red-500 border border-red-500/30"
                }`}
              >
                {currentOutfit.mood === "love" && <CheckCircle2 className="w-3.5 h-3.5" />}
                {currentOutfit.mood === "meh" && <AlertTriangle className="w-3.5 h-3.5" />}
                {currentOutfit.mood === "veto" && <XCircle className="w-3.5 h-3.5" />}
                <span>{currentOutfit.score}</span>
              </div>
            </div>

            {/* Title & Emoji */}
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl">{currentOutfit.emoji}</span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-tight">
                {currentOutfit.title}
              </h3>
            </div>

            {/* The Quote from Lucas & Josefina */}
            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--card-border)] space-y-2">
              <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                &ldquo;{currentOutfit.quote}&rdquo;
              </p>

              <div className="pt-2 border-t border-[var(--card-border)] font-mono-swiss text-[11px] text-[var(--accent-gold)]">
                {currentOutfit.babyReaction}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Footer */}
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-[var(--card-border)]">
          <button
            onClick={prevOutfit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-mono-swiss text-[var(--fg-primary)] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {OUTFITS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 bg-[var(--accent-gold)]"
                    : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                }`}
                aria-label={`Ver estilo ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextOutfit}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--fg-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-gold)] hover:text-black text-xs font-mono-swiss font-medium transition-all cursor-pointer shadow-sm"
          >
            <span>Siguiente Look</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
