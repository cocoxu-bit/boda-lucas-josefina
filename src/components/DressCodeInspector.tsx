"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type MoodType = "love" | "meh" | "veto";

interface OutfitExample {
  id: string;
  category: "Para Ellos & Ellas" | "Para Ellas" | "Para Ellos" | "Prohibido";
  title: string;
  score: string;
  scoreNum: number;
  mood: MoodType;
  quote: string;
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
    quote: "¡Sí a todo! Traje moderno sin corbata, o americana con camiseta lisa de algodón bueno. Y las zapatillas cuidadas son el verdadero secreto para aguantar 8 horas en Veneno.",
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
    quote: "Elegante, fresco y con libertad total de movimiento para pillar el cóctel al vuelo. Tacón sensato, botín o bailarinas elegantes. ¡Matrícula de honor!",
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
    quote: "Irás espectacular los primeros 25 minutos en Monforte. En Veneno a las 16:00 estarás pidiendo tiritas y una silla a gritos. Si te empeñas en llevarlo, mete calzado plano en el bolso.",
    badges: ["Riesgo de ampolla: 99%", "Obligatorio calzado de repuesto"],
    emoji: "👠😣",
  },
  {
    id: "chaque-rigido",
    category: "Para Ellos",
    title: "Chaqué Clásico con Chistera y Tirantes Rígidos",
    score: "0 / 10",
    scoreNum: 0,
    mood: "veto",
    quote: "¡Por favor, no! Esto es una boda civil y vamos directos a Veneno, no a una gala en Buckingham. Vas a pasar un calor infernal y no vas a poder bailar Daft Punk.",
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
    quote: "A ver, tampoco te pases de alternativo, pillín. Es una boda civil con mucho amor, no el chiringuito de la Malvarrosa. Ven arreglado y guapo.",
    badges: ["Tarjeta roja directa", "Respeta el evento"],
    emoji: "🩳🩴",
  },
];

// Stylized Animated Avatars for Lucas & Josefina
const CoupleAvatars: React.FC<{ mood: MoodType }> = ({ mood }) => {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10 py-4">
      {/* LUCAS AVATAR */}
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
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[var(--card-border)] bg-[var(--chip-bg)] flex items-center justify-center overflow-hidden shadow-inner">
          <svg viewBox="0 0 100 100" className="w-full h-full p-1">
            {/* Hair */}
            <path d="M 28 36 C 28 18, 72 18, 72 36 C 68 28, 38 28, 28 36 Z" fill="#2d2824" />
            {/* Head */}
            <circle cx="50" cy="50" r="28" fill="#f6d3b3" />
            {/* Glasses */}
            <circle cx="41" cy="48" r="7" stroke="#1c1917" strokeWidth="2.5" fill="none" />
            <circle cx="59" cy="48" r="7" stroke="#1c1917" strokeWidth="2.5" fill="none" />
            <line x1="48" y1="48" x2="52" y2="48" stroke="#1c1917" strokeWidth="2.5" />
            
            {/* Eyes based on mood */}
            {mood === "love" && (
              <>
                <path d="M 38 48 Q 41 44 44 48" stroke="#1c1917" strokeWidth="2" fill="none" />
                <path d="M 56 48 Q 59 44 62 48" stroke="#1c1917" strokeWidth="2" fill="none" />
              </>
            )}
            {mood === "meh" && (
              <>
                <circle cx="43" cy="48" r="2" fill="#1c1917" />
                <circle cx="61" cy="48" r="2" fill="#1c1917" />
              </>
            )}
            {mood === "veto" && (
              <>
                <line x1="38" y1="45" x2="44" y2="51" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="44" y1="45" x2="38" y2="51" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="56" y1="45" x2="62" y2="51" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="62" y1="45" x2="56" y2="51" stroke="#dc2626" strokeWidth="2.5" />
              </>
            )}

            {/* Stubble / Beard */}
            <path d="M 36 60 Q 50 72 64 60" stroke="#785942" strokeWidth="3" strokeDasharray="2,2" fill="none" />

            {/* Mouth */}
            {mood === "love" && (
              <path d="M 42 61 Q 50 70 58 61" stroke="#1c1917" strokeWidth="2.5" fill="#e11d48" />
            )}
            {mood === "meh" && (
              <line x1="43" y1="62" x2="57" y2="62" stroke="#1c1917" strokeWidth="2.5" />
            )}
            {mood === "veto" && (
              <path d="M 42 66 Q 50 56 58 66" stroke="#1c1917" strokeWidth="2.5" fill="none" />
            )}
          </svg>

          {/* Floating Emoji Reaction badge */}
          <span className="absolute -bottom-1 -right-1 text-base">
            {mood === "love" ? "😍" : mood === "meh" ? "😐" : "😱"}
          </span>
        </div>
        <span className="font-mono-swiss text-[11px] font-medium text-[var(--fg-primary)] mt-1.5">
          Lucas
        </span>
      </motion.div>

      {/* VS / & Badge */}
      <div className="font-serif-editorial text-2xl text-[var(--accent-gold)] italic">
        &
      </div>

      {/* JOSEFINA AVATAR */}
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
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[var(--card-border)] bg-[var(--chip-bg)] flex items-center justify-center overflow-hidden shadow-inner">
          <svg viewBox="0 0 100 100" className="w-full h-full p-1">
            {/* Long styled hair */}
            <path d="M 24 35 C 24 16, 76 16, 76 35 C 76 60, 68 76, 68 76 C 60 48, 40 48, 32 76 C 32 76, 24 60, 24 35 Z" fill="#3b2b20" />
            {/* Head */}
            <circle cx="50" cy="50" r="26" fill="#fbe0cb" />
            {/* Bangs / Front hair */}
            <path d="M 28 36 Q 50 30 72 38 Q 62 26 50 26 Q 38 26 28 36 Z" fill="#3b2b20" />
            
            {/* Earrings */}
            <circle cx="28" cy="56" r="3" fill="#dfb15b" />
            <circle cx="72" cy="56" r="3" fill="#dfb15b" />

            {/* Eyes based on mood */}
            {mood === "love" && (
              <>
                <path d="M 37 46 Q 42 41 47 46" stroke="#1c1917" strokeWidth="2.5" fill="none" />
                <path d="M 53 46 Q 58 41 63 46" stroke="#1c1917" strokeWidth="2.5" fill="none" />
                {/* Blushing cheeks */}
                <ellipse cx="36" cy="54" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4" />
                <ellipse cx="64" cy="54" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4" />
              </>
            )}
            {mood === "meh" && (
              <>
                <circle cx="42" cy="46" r="2.2" fill="#1c1917" />
                <circle cx="58" cy="46" r="2.2" fill="#1c1917" />
                {/* Sweat drop */}
                <path d="M 70 40 Q 72 45 68 47 Q 66 45 70 40 Z" fill="#38bdf8" />
              </>
            )}
            {mood === "veto" && (
              <>
                <line x1="37" y1="43" x2="47" y2="49" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="47" y1="43" x2="37" y2="49" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="53" y1="43" x2="63" y2="49" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="63" y1="43" x2="53" y2="49" stroke="#dc2626" strokeWidth="2.5" />
              </>
            )}

            {/* Mouth */}
            {mood === "love" && (
              <path d="M 42 59 Q 50 69 58 59" stroke="#1c1917" strokeWidth="2.2" fill="#e11d48" />
            )}
            {mood === "meh" && (
              <path d="M 43 61 Q 50 58 57 61" stroke="#1c1917" strokeWidth="2.2" fill="none" />
            )}
            {mood === "veto" && (
              <ellipse cx="50" cy="62" rx="4.5" ry="6" fill="#1c1917" />
            )}
          </svg>

          {/* Floating Emoji Reaction badge */}
          <span className="absolute -bottom-1 -right-1 text-base">
            {mood === "love" ? "🥰" : mood === "meh" ? "😬" : "🙅‍♀️"}
          </span>
        </div>
        <span className="font-mono-swiss text-[11px] font-medium text-[var(--fg-primary)] mt-1.5">
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
    <section className="relative w-full max-w-2xl mx-auto py-12 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-mono-swiss uppercase tracking-widest text-[var(--accent-gold)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROBADOR INTERACTIVO // DRESS CODE</span>
        </div>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          El Veredicto de los Novios
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Pasa los distintos estilos para ver la reacción en directo de Lucas y Josefina. Cero protocolo estirado, 100% comodidad para disfrutar.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="theme-card rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300">
        {/* Animated Recreations Header */}
        <div className="border-b border-[var(--card-border)] pb-2 mb-4">
          <div className="text-center font-mono-swiss text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">
            REACCIÓN EN TIEMPO REAL
          </div>
          <CoupleAvatars mood={currentOutfit.mood} />
        </div>

        {/* Outfit Card Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOutfit.id}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-swiss text-[11px] uppercase tracking-wider text-[var(--fg-muted)] glass-pill px-2.5 py-0.5 rounded-full">
                {currentOutfit.category}
              </span>

              {/* Score Indicator */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-swiss font-bold ${
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
                <span>PUNTUACIÓN: {currentOutfit.score}</span>
              </div>
            </div>

            {/* Title & Emoji */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-3xl sm:text-4xl">{currentOutfit.emoji}</span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                {currentOutfit.title}
              </h3>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              {currentOutfit.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono-swiss bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--card-border)] text-[var(--fg-primary)]/80"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* The Quote from Lucas & Josefina */}
            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--card-border)] relative">
              <span className="font-mono-swiss text-[9px] uppercase tracking-widest text-[var(--accent-gold)] block mb-1">
                COMENTARIO DE LOS NOVIOS:
              </span>
              <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                &ldquo;{currentOutfit.quote}&rdquo;
              </p>
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
