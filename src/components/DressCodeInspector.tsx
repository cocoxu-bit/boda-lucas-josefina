"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type MoodType = "love" | "meh" | "veto";

interface OutfitExample {
  id: string;
  title: string;
  subtitle: string;
  score: string;
  verdict: string;
  mood: MoodType;
  imageUrl: string;
  lucasQuote: string;
  josefinaQuote: string;
  maximoQuote: string;
}

const OUTFITS: OutfitExample[] = [
  {
    id: "smart-sneakers",
    title: "Traje Informal con Zapatillas Blancas",
    subtitle: "Blazer relajado, camiseta básica de algodón o camisa abierta y calzado deportivo limpio.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/sample_casual_man.jpg",
    josefinaQuote: "¡Aprobado con nota!",
    lucasQuote: "El uniforme definitivo",
    maximoQuote: "¡Aba-dá! 👏",
  },
  {
    id: "midi-flow",
    title: "Vestido Midi Fluido o Estampado",
    subtitle: "Tejidos vaporosos, colores vivos o estampados alegres, combinados con cuñas, botines o bailarinas.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/dress_green.jpg",
    josefinaQuote: "¡Mi opción favorita!",
    lucasQuote: "Perfecto para Monforte",
    maximoQuote: "¡Agú tatá! 🎉",
  },
  {
    id: "tailoring-chic",
    title: "Traje de Chaqueta Sastre Femenino",
    subtitle: "Dos piezas en tonos alegres o neutros, con top lencero o camiseta y calzado cómodo.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/sample_fashion_look.jpg",
    josefinaQuote: "Elegancia sin corsés",
    lucasQuote: "Moderno y de diez",
    maximoQuote: "¡Da-dá! 👶",
  },
  {
    id: "linen-no-tie",
    title: "Traje Dos Piezas sin Corbata o Cuello Mao",
    subtitle: "Corte actual en azul, arena o verde, con camisa abierta o cuello mao sin ataduras.",
    score: "9 / 10",
    verdict: "Muy Top",
    mood: "love",
    imageUrl: "/images/linen_shirt.jpg",
    josefinaQuote: "Cercano y guapo",
    lucasQuote: "¡Cero corbatas!",
    maximoQuote: "¡Gugú baaa! ✨",
  },
  {
    id: "rock-chic",
    title: "Cazadora o Blazer Rock Chic con Botines",
    subtitle: "Pantalón de pinzas oscuro, prendas de punto fino o camiseta negra y calzado con personalidad.",
    score: "9 / 10",
    verdict: "Rollazo",
    mood: "love",
    imageUrl: "/images/sample_elegant_woman.jpg",
    josefinaQuote: "¡Puro rollazo!",
    lucasQuote: "¡Invito a copa!",
    maximoQuote: "¡Ooooh fiesta! 🎸",
  },
  {
    id: "stiletto-gala",
    title: "Vestido de Gala Largo con Tacones de Aguja",
    subtitle: "Vestidos de alfombra roja muy ceñidos con tacones vertiginosos de aguja.",
    score: "4 / 10",
    verdict: "Con reservas",
    mood: "meh",
    imageUrl: "/images/gala_dress.jpg",
    josefinaQuote: "Mete zapatillas...",
    lucasQuote: "Demasiado rígido",
    maximoQuote: "¡Mmmh duda... 🤔",
  },
  {
    id: "chaque-rigido",
    title: "Chaqué Tradicional de Tres Piezas con Chistera",
    subtitle: "Chaleco rígido, corbata de nudo ancho y protocolo estricto de etiqueta clásica.",
    score: "0 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/tuxedo.jpg",
    josefinaQuote: "¡Dejad el pingüino!",
    lucasQuote: "¡Por favor, no!",
    maximoQuote: "¡Gaaaa-bu! 🙅‍♂️",
  },
  {
    id: "sport-chandal",
    title: "Chándal o Ropa Deportiva",
    subtitle: "Prendas puramente de gimnasio o indumentaria de playa.",
    score: "-5 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/sample_yellow_chic.jpg",
    josefinaQuote: "Para el domingo",
    lucasQuote: "Tampoco tanto...",
    maximoQuote: "¡Pffft pedorreta! 💨",
  },
];

/* Retro Indie Pixel Art Avatar for Josefina */
const JosefinaAvatar: React.FC<{ mood: MoodType }> = ({ mood }) => {
  const avatarSrc =
    mood === "love"
      ? "/images/avatars/josefina-love.png"
      : mood === "veto"
      ? "/images/avatars/josefina-veto.png"
      : "/images/avatars/josefina-meh.png";

  return (
    <motion.div
      key={`josefina-${mood}`}
      initial={{ scale: 0.92, opacity: 0.85 }}
      animate={
        mood === "love"
          ? { scale: 1, y: [0, -3, 0] }
          : mood === "veto"
          ? { scale: 1, x: [-2, 2, -2, 2, 0] }
          : { scale: 1, rotate: [1, -1, 1] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-gradient-to-b from-[#2b211a] to-[#141210] border-2 border-[var(--accent-gold)]/50 shadow-lg overflow-hidden flex items-center justify-center group">
        <Image
          src={avatarSrc}
          alt="Josefina Pixel Avatar"
          fill
          sizes="64px"
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ imageRendering: "pixelated" }}
        />
        {mood === "love" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">❤️</span>
        )}
        {mood === "meh" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">❓</span>
        )}
        {mood === "veto" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">❌</span>
        )}
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1 tracking-wider">
        Josefina
      </span>
    </motion.div>
  );
};

/* Retro Indie Pixel Art Avatar for Lucas */
const LucasAvatar: React.FC<{ mood: MoodType }> = ({ mood }) => {
  const avatarSrc =
    mood === "love"
      ? "/images/avatars/lucas-love.png"
      : mood === "veto"
      ? "/images/avatars/lucas-veto.png"
      : "/images/avatars/lucas-meh.png";

  return (
    <motion.div
      key={`lucas-${mood}`}
      initial={{ scale: 0.92, opacity: 0.85 }}
      animate={
        mood === "love"
          ? { scale: 1, y: [0, -3, 0] }
          : mood === "veto"
          ? { scale: 1, x: [2, -2, 2, -2, 0] }
          : { scale: 1, rotate: [-1, 1, -1] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-gradient-to-b from-[#1a232b] to-[#101316] border-2 border-[var(--accent-gold)]/50 shadow-lg overflow-hidden flex items-center justify-center group">
        <Image
          src={avatarSrc}
          alt="Lucas Pixel Avatar"
          fill
          sizes="64px"
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ imageRendering: "pixelated" }}
        />
        {mood === "love" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">✨</span>
        )}
        {mood === "meh" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">💭</span>
        )}
        {mood === "veto" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">⚠️</span>
        )}
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1 tracking-wider">
        Lucas
      </span>
    </motion.div>
  );
};

/* Retro Indie Pixel Art Avatar for Máximo */
const MaximoAvatar: React.FC<{ mood: MoodType }> = ({ mood }) => {
  const avatarSrc =
    mood === "love"
      ? "/images/avatars/maximo-love.png"
      : mood === "veto"
      ? "/images/avatars/maximo-veto.png"
      : "/images/avatars/maximo-meh.png";

  return (
    <motion.div
      key={`maximo-${mood}`}
      initial={{ scale: 0.92, opacity: 0.85 }}
      animate={
        mood === "love"
          ? { scale: [1, 1.05, 1], rotate: [-2, 2, -2] }
          : mood === "veto"
          ? { scale: [1, 0.96, 1], y: [0, 2, 0] }
          : { scale: 1, rotate: [2, -2, 2] }
      }
      transition={{ duration: mood === "love" ? 1.6 : 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-gradient-to-b from-[#1b263b] to-[#0d131f] border-2 border-sky-400/50 shadow-lg overflow-hidden flex items-center justify-center group">
        <Image
          src={avatarSrc}
          alt="Máximo Pixel Avatar"
          fill
          sizes="64px"
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ imageRendering: "pixelated" }}
        />
        {mood === "love" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">🎉</span>
        )}
        {mood === "meh" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">🍼</span>
        )}
        {mood === "veto" && (
          <span className="absolute top-0.5 right-0.5 text-[10px] leading-none drop-shadow">💨</span>
        )}
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-sky-400 mt-1 tracking-wider">
        Máximo
      </span>
    </motion.div>
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
    <section className="relative w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center space-y-1 mb-6">
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          Dress Code
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Arreglado pero a tu rollo. Desliza para ver el veredicto en directo de los tres:
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="theme-card rounded-3xl p-4 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOutfit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* Top Bar: Look Counter & Verdict Badge */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--card-border)]">
              <span className="font-mono-swiss text-[11px] tracking-wider text-[var(--fg-muted)]">
                Look {currentIndex + 1} de {OUTFITS.length}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-swiss text-xs font-semibold border ${
                  currentOutfit.mood === "love"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : currentOutfit.mood === "meh"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {currentOutfit.mood === "love" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {currentOutfit.mood === "meh" && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                {currentOutfit.mood === "veto" && <XCircle className="w-3.5 h-3.5 text-red-400" />}
                <span>{currentOutfit.score} • {currentOutfit.verdict}</span>
              </span>
            </div>

            {/* Top Grid: Real Photo & Info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Left Column: Real Outfit Photo */}
              <div className="sm:col-span-5 relative h-52 sm:h-64 w-full rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-md group bg-black/5 dark:bg-white/5">
                <Image
                  src={currentOutfit.imageUrl}
                  alt={currentOutfit.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Right Column: Title and Subtitle */}
              <div className="sm:col-span-7 space-y-2 text-left">
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-snug">
                  {currentOutfit.title}
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed font-light">
                  {currentOutfit.subtitle}
                </p>
              </div>
            </div>

            {/* 3 AVATARS IN A SINGLE LINE ON MOBILE (NO SCROLL) */}
            <div className="pt-3 border-t border-[var(--card-border)]">
              <span className="font-mono-swiss text-[10px] tracking-wider text-[var(--fg-muted)] block text-center sm:text-left mb-2.5">
                El veredicto en directo
              </span>

              {/* 3 Columns: Josefina, Lucas, Máximo side-by-side */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 items-start">
                {/* 1. Josefina */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <JosefinaAvatar mood={currentOutfit.mood} />
                  <div className="w-full mt-2 px-1.5 py-1.5 rounded-xl bg-white/[0.04] border border-[var(--card-border)] shadow-sm min-h-[42px] flex items-center justify-center">
                    <p className="font-sans-ui text-[11px] sm:text-xs text-[var(--fg-primary)] font-medium leading-tight italic">
                      &ldquo;{currentOutfit.josefinaQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* 2. Lucas */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.06 }}
                  className="flex flex-col items-center text-center"
                >
                  <LucasAvatar mood={currentOutfit.mood} />
                  <div className="w-full mt-2 px-1.5 py-1.5 rounded-xl bg-white/[0.04] border border-[var(--card-border)] shadow-sm min-h-[42px] flex items-center justify-center">
                    <p className="font-sans-ui text-[11px] sm:text-xs text-[var(--fg-primary)] font-medium leading-tight italic">
                      &ldquo;{currentOutfit.lucasQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* 3. Máximo */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <MaximoAvatar mood={currentOutfit.mood} />
                  <div className="w-full mt-2 px-1.5 py-1.5 rounded-xl bg-white/[0.04] border border-sky-400/30 shadow-sm min-h-[42px] flex items-center justify-center">
                    <p className="font-sans-ui text-[11px] sm:text-xs text-sky-300 font-medium leading-tight italic">
                      &ldquo;{currentOutfit.maximoQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--card-border)]">
          <button
            onClick={prevOutfit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-mono-swiss text-[var(--fg-primary)] transition-all cursor-pointer active:scale-95"
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
                    ? "w-5 bg-[var(--accent-gold)]"
                    : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                }`}
                aria-label={`Ver estilo ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextOutfit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--fg-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-gold)] hover:text-black text-xs font-mono-swiss font-medium transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
