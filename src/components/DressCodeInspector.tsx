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
    lucasQuote: "Para mí es el uniforme definitivo. Vas arreglado, no pasas calor y con las zapatillas aguantas 8 horas de pie en Veneno sin enterarte de los pies.",
    josefinaQuote: "¡Totalmente! Me encanta el rollazo que da. Se ve arreglado pero moderno y cero estirado. ¡Aprobado con nota!",
    maximoQuote: "¡Aba-dá! *[aplaude con las dos manitas entusiasmado y estira los brazos para que le cojan]*",
  },
  {
    id: "midi-flow",
    title: "Vestido Midi Fluido o Estampado",
    subtitle: "Tejidos vaporosos, colores vivos o estampados alegres, combinados con cuñas, botines o bailarinas.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/dress_green.jpg",
    lucasQuote: "Encaja a la perfección con la luz de febrero en los jardines de Monforte y el ambiente desenfadado de Veneno.",
    josefinaQuote: "Mi opción favorita. Comodísimo, fresco y con libertad total de movimiento para pillar el cóctel al vuelo y bailar toda la tarde.",
    maximoQuote: "¡Agú tatá! *[se ríe a carcajadas mirando los colores y señala con el dedito]*",
  },
  {
    id: "tailoring-chic",
    title: "Traje de Chaqueta Sastre Femenino",
    subtitle: "Dos piezas en tonos alegres o neutros, con top lencero o camiseta y calzado cómodo.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/sample_fashion_look.jpg",
    lucasQuote: "Aprobado al cien por cien. Elegante, contemporáneo y acorde con el espíritu de una boda sin etiquetas rancias.",
    josefinaQuote: "Un dos piezas fluido con zapatillas o zapato cómodo tiene una personalidad increíble. Pura elegancia sin corsés.",
    maximoQuote: "¡Da-dá! *[da palmaditas en la mesa y sonríe mostrando dos dientes]*",
  },
  {
    id: "linen-no-tie",
    title: "Traje Dos Piezas sin Corbata o Cuello Mao",
    subtitle: "Corte actual en azul, arena o verde, con camisa abierta o cuello mao sin ataduras.",
    score: "9 / 10",
    verdict: "Muy Top",
    mood: "love",
    imageUrl: "/images/linen_shirt.jpg",
    lucasQuote: "La corbata queda vetada en nuestra boda. Con un traje moderno desabrochado vas impecable y disfrutas mil veces más.",
    josefinaQuote: "Mucho más guapos y cercanos así que pareciendo que vais a una junta de accionistas en pleno lunes.",
    maximoQuote: "¡Gugú baaa! *[agarra la tela suave con los puñitos y asiente satisfecho]*",
  },
  {
    id: "rock-chic",
    title: "Cazadora o Blazer Rock Chic con Botines",
    subtitle: "Pantalón de pinzas oscuro, prendas de punto fino o camiseta negra y calzado con personalidad.",
    score: "9 / 10",
    verdict: "Rollazo",
    mood: "love",
    imageUrl: "/images/sample_elegant_woman.jpg",
    lucasQuote: "Si alguien viene así a Veneno, le invito a la primera copa. Rollo indie club total.",
    josefinaQuote: "¡Me flipa! Queremos que cada uno venga a su rollo siendo 100% fiel a su estilo.",
    maximoQuote: "¡Ooooh... brrr! *[mueve los piececitos al ritmo y suelta un gritito de fiesta]*",
  },
  {
    id: "stiletto-gala",
    title: "Vestido de Gala Largo con Tacones de Aguja",
    subtitle: "Vestidos de alfombra roja muy ceñidos con tacones vertiginosos de aguja.",
    score: "4 / 10",
    verdict: "Con reservas",
    mood: "meh",
    imageUrl: "/images/gala_dress.jpg",
    lucasQuote: "Demasiado encorsetado para un cóctel de pie. Te vas a cansar antes de que empiece la música.",
    josefinaQuote: "Irás divina los primeros 20 minutos de fotos en Monforte. En Veneno a las 16:00 estarás pidiendo tiritas a gritos. ¡Mete zapatillas en el bolso sí o sí!",
    maximoQuote: "¡Mmmh? *[ladea la cabeza masticando la esquina de su babero con cara de duda]*",
  },
  {
    id: "chaque-rigido",
    title: "Chaqué Tradicional de Tres Piezas con Chistera",
    subtitle: "Chaleco rígido, corbata de nudo ancho y protocolo estricto de etiqueta clásica.",
    score: "0 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/tuxedo.jpg",
    lucasQuote: "¡Por favor, no! Esto es una boda civil y nos vamos directos a un bar a beber copas, no a la abadía de Westminster. Vas a pasar un calor infernal.",
    josefinaQuote: "Desentona totalmente con el concepto. Buscamos cercanía y naturalidad, ¡dejad el pingüino en el armario!",
    maximoQuote: "¡Gaaaa-bu! *[tira el sonajero al suelo y hace pucheros de agobio con el sombrero]*",
  },
  {
    id: "sport-chandal",
    title: "Chándal o Ropa Deportiva",
    subtitle: "Prendas puramente de gimnasio o indumentaria de playa.",
    score: "-5 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/sample_yellow_chic.jpg",
    lucasQuote: "A ver, tampoco nos pasemos de alternativos. Es nuestra boda, no un partido en la pista del barrio.",
    josefinaQuote: "Venid guapos y arreglados a vuestro propio estilo. El chándal lo guardamos para el domingo de descanso.",
    maximoQuote: "¡Pffft-baaah! *[hace una pedorreta con la lengua fuera y se gira indignado]*",
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
          ? { scale: 1, y: [0, -4, 0] }
          : mood === "veto"
          ? { scale: 1, x: [-3, 3, -3, 3, 0] }
          : { scale: 1, rotate: [1, -1, 1] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-b from-[#2b211a] to-[#141210] border-2 border-[var(--accent-gold)]/50 shadow-xl overflow-hidden flex items-center justify-center group">
        <Image
          src={avatarSrc}
          alt="Josefina Pixel Avatar"
          fill
          sizes="80px"
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ imageRendering: "pixelated" }}
        />
        {/* Pixel mood badge icon */}
        {mood === "love" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">❤️</span>
        )}
        {mood === "meh" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">❓</span>
        )}
        {mood === "veto" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">❌</span>
        )}
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1.5 tracking-wider">
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
          ? { scale: 1, y: [0, -4, 0] }
          : mood === "veto"
          ? { scale: 1, x: [-3, 3, -3, 3, 0] }
          : { scale: 1, rotate: [-1, 1, -1] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-b from-[#2b211a] to-[#141210] border-2 border-[var(--accent-gold)]/50 shadow-xl overflow-hidden flex items-center justify-center group">
        <Image
          src={avatarSrc}
          alt="Lucas Pixel Avatar"
          fill
          sizes="80px"
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ imageRendering: "pixelated" }}
        />
        {/* Pixel mood badge icon */}
        {mood === "love" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">✨</span>
        )}
        {mood === "meh" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">🤔</span>
        )}
        {mood === "veto" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">🚫</span>
        )}
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1.5 tracking-wider">
        Lucas
      </span>
    </motion.div>
  );
};

/* Retro Indie Pixel Art Avatar for baby Máximo */
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
          ? { scale: 1, y: [0, -5, 0], rotate: [0, -3, 3, 0] }
          : mood === "veto"
          ? { scale: 1, x: [-3, 3, -3, 3, 0] }
          : { scale: 1, rotate: [-4, 4, -4] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.22 }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-b from-[#2b211a] to-[#141210] border-2 border-[var(--accent-gold)]/60 shadow-xl overflow-hidden flex items-center justify-center group">
        <Image
          src={avatarSrc}
          alt="Máximo Pixel Avatar"
          fill
          sizes="80px"
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ imageRendering: "pixelated" }}
        />
        {/* Pixel mood badge icon */}
        {mood === "love" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">🎉</span>
        )}
        {mood === "meh" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">🍼</span>
        )}
        {mood === "veto" && (
          <span className="absolute top-1 right-1 text-[11px] leading-none drop-shadow">💨</span>
        )}
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1.5 tracking-wider">
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
      <div className="text-center space-y-1 mb-8">
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          Dress Code
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Arreglado pero a tu rollo. Pasa los ejemplos reales para escuchar lo que opinan los novios y el peque:
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="theme-card rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOutfit.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Top Bar: Look Counter & Verdict Badge (Cleanly outside the photo) */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--card-border)]">
              <span className="font-mono-swiss text-[11px] uppercase tracking-widest text-[var(--fg-muted)]">
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

            {/* Top Grid: Real Photo (Pristine, no overlay cutting it) & Info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Left Column: Real Outfit Photo */}
              <div className="sm:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-md group bg-black/5 dark:bg-white/5">
                <Image
                  src={currentOutfit.imageUrl}
                  alt={currentOutfit.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Right Column: Title and Subtitle */}
              <div className="sm:col-span-7 space-y-2.5 text-left">
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-snug">
                  {currentOutfit.title}
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed font-light">
                  {currentOutfit.subtitle}
                </p>
              </div>
            </div>

            {/* LIVE CONVERSATION BETWEEN AVATARS */}
            <div className="pt-4 border-t border-[var(--card-border)] space-y-3">
              <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-[var(--fg-muted)] block text-left">
                Conversación en directo
              </span>

              {/* Conversation Box */}
              <div className="space-y-3">
                {/* 1. Josefina's Speech Bubble (Speaks first left -> right) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <JosefinaAvatar mood={currentOutfit.mood} />

                  <div className="relative flex-1 p-3.5 sm:p-4 rounded-2xl rounded-tl-sm bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--card-border)] text-left shadow-sm">
                    {/* Speech bubble pointer */}
                    <div className="absolute -left-1.5 top-4 w-3 h-3 bg-black/[0.03] dark:bg-[#1a1a1e] border-l border-t border-[var(--card-border)] rotate-[-45deg]" />
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.josefinaQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* 2. Lucas's Speech Bubble (Replies right -> left) */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="flex items-start gap-3 sm:gap-4 flex-row-reverse"
                >
                  <LucasAvatar mood={currentOutfit.mood} />

                  <div className="relative flex-1 p-3.5 sm:p-4 rounded-2xl rounded-tr-sm bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--card-border)] text-left shadow-sm">
                    {/* Speech bubble pointer */}
                    <div className="absolute -right-1.5 top-4 w-3 h-3 bg-black/[0.03] dark:bg-[#1a1a1e] border-r border-t border-[var(--card-border)] rotate-[45deg]" />
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.lucasQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* 3. Máximo's Speech Bubble (Baby joins in!) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.22 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <MaximoAvatar mood={currentOutfit.mood} />

                  <div className="relative flex-1 p-3.5 sm:p-4 rounded-2xl rounded-tl-sm bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--accent-gold)]/30 text-left shadow-sm">
                    {/* Speech bubble pointer */}
                    <div className="absolute -left-1.5 top-4 w-3 h-3 bg-black/[0.03] dark:bg-[#1a1a1e] border-l border-t border-[var(--accent-gold)]/30 rotate-[-45deg]" />
                    <span className="font-mono-swiss text-[10px] text-[var(--accent-gold)] font-semibold uppercase tracking-wider block mb-1">
                      El veredicto de Máximo:
                    </span>
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.maximoQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Footer */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-[var(--card-border)]">
          <button
            onClick={prevOutfit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-mono-swiss text-[var(--fg-primary)] transition-all cursor-pointer active:scale-95"
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--fg-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-gold)] hover:text-black text-xs font-mono-swiss font-medium transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span>Siguiente Look</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
