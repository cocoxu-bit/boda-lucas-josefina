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
    lucasQuote: "El uniforme definitivo. Vas arreglado, no pasas calor y con las zapatillas aguantas las horas de cóctel y fiesta en Veneno sin enterarte de los pies.",
    josefinaQuote: "Me parece el look con más rollo. Cero estirado, muy fotogénico para Monforte y perfecto para bailar toda la tarde.",
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
    josefinaQuote: "Comodísimo y precioso. Libertad total de movimiento para pillar los aperitivos al vuelo, tomar copas y no tener que preocuparte de nada.",
  },
  {
    id: "tailoring-chic",
    title: "Traje de Chaqueta Sastre Contemporáneo",
    subtitle: "Dos piezas en tonos alegres o neutros, con top lencero o camiseta y calzado cómodo.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/sample_fashion_look.jpg",
    lucasQuote: "Aprobado al cien por cien. Elegante, contemporáneo y acorde con el espíritu de una boda sin etiquetas rancias.",
    josefinaQuote: "Una de mis opciones favoritas. Da un estilo brutal, tiene muchísima personalidad y vas cómoda de principio a fin.",
  },
  {
    id: "linen-no-tie",
    title: "Traje Dos Piezas sin Corbata",
    subtitle: "Corte actual en azul, arena o verde, con camisa abierta o cuello mao sin ataduras.",
    score: "9 / 10",
    verdict: "Muy Top",
    mood: "love",
    imageUrl: "/images/linen_shirt.jpg",
    lucasQuote: "La corbata sobra por completo en nuestra boda. Con un traje moderno desabrochado vas impecable y disfrutas mil veces más.",
    josefinaQuote: "Muy guapos y elegantes sin parecer que vais a una junta de accionistas en pleno lunes.",
  },
  {
    id: "rock-chic",
    title: "Cazadora o Blazer Rock Chic con Botines",
    subtitle: "Pantalón de pinzas oscuro, prendas de punto fino o camiseta negra y calzado con personalidad.",
    score: "9 / 10",
    verdict: "Rollazo",
    mood: "love",
    imageUrl: "/images/sample_elegant_woman.jpg",
    lucasQuote: "En Veneno encaja como un guante. Es alternativo, tiene personalidad y para el tardeo con música es perfecto.",
    josefinaQuote: "Si tienes ese estilo, llévalo sin dudar. Queremos que cada uno venga siendo 100% fiel a sí mismo.",
  },
  {
    id: "stiletto-gala",
    title: "Vestido de Gala Largo con Tacón Fino",
    subtitle: "Vestidos de alfombra roja muy ceñidos con tacones vertiginosos de aguja.",
    score: "4 / 10",
    verdict: "Con reservas",
    mood: "meh",
    imageUrl: "/images/gala_dress.jpg",
    lucasQuote: "Demasiado ceremonial para un formato dinámico de pie. Te vas a cansar antes de que empiece la música.",
    josefinaQuote: "Para las fotos de Monforte estarás espectacular, pero a las cuatro de la tarde en el cóctel vas a desear descalzarte. Si lo traes, ¡trae calzado plano de repuesto!",
  },
  {
    id: "chaque-rigido",
    title: "Chaqué Tradicional de Tres Piezas",
    subtitle: "Chaleco rígido, corbata de nudo ancho y protocolo estricto de etiqueta clásica.",
    score: "0 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/tuxedo.jpg",
    lucasQuote: "Por favor, no. Es una boda civil entre amigos y nos vamos directos a un bar a beber cócteles, no a la abadía de Westminster. Vas a pasar calor y no vas a poder moverte.",
    josefinaQuote: "Desentona completamente con la cercanía, la luz y el rollo fresco que buscamos.",
  },
  {
    id: "sport-chandal",
    title: "Chándal o Ropa Deportiva",
    subtitle: "Prendas puramente de gimnasio o entrenamiento.",
    score: "-5 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/sample_yellow_chic.jpg",
    lucasQuote: "A ver, tampoco nos pasemos de alternativos. Es nuestra boda, no un partido en la pista del barrio.",
    josefinaQuote: "Venid guapos y arreglados a vuestro propio estilo. El chándal lo guardamos para el domingo de descanso.",
  },
];

export const DressCodeInspector: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentOutfit = OUTFITS[currentIndex];

  const nextOutfit = () => {
    setCurrentIndex((prev) => (prev + 1) % OUTFITS.length);
  };

  const prevOutfit = () => {
    setCurrentIndex((prev) => (prev - 1 + OUTFITS.length) % OUTFITS.length);
  };

  const getBorderColor = (mood: MoodType) => {
    if (mood === "love") return "border-emerald-500/70 ring-2 ring-emerald-500/20";
    if (mood === "meh") return "border-amber-500/70 ring-2 ring-amber-500/20";
    return "border-red-500/70 ring-2 ring-red-500/20";
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center space-y-1 mb-8">
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          Dress Code
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Arreglado pero a tu rollo. Pasa los ejemplos reales para conocer la opinión sincera de los novios:
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="theme-card rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOutfit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Top Grid: Real Photo & Info */}
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
                
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md font-mono-swiss text-[10px] text-white/90 uppercase tracking-widest border border-white/10">
                    {currentIndex + 1} / {OUTFITS.length}
                  </span>
                  
                  <span
                    className={`px-2.5 py-1 rounded-full font-mono-swiss text-[11px] font-bold border backdrop-blur-md shadow-sm ${
                      currentOutfit.mood === "love"
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                        : currentOutfit.mood === "meh"
                        ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                        : "bg-red-950/80 text-red-300 border-red-500/40"
                    }`}
                  >
                    {currentOutfit.score} • {currentOutfit.verdict}
                  </span>
                </div>
              </div>

              {/* Right Column: Title, Subtitle and Verdict */}
              <div className="sm:col-span-7 space-y-3.5 text-left">
                <div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-snug">
                    {currentOutfit.title}
                  </h3>
                  <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] mt-1.5 leading-relaxed font-light">
                    {currentOutfit.subtitle}
                  </p>
                </div>

                {/* Verdict Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.03] text-xs font-mono-swiss text-[var(--fg-primary)]">
                  {currentOutfit.mood === "love" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {currentOutfit.mood === "meh" && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  {currentOutfit.mood === "veto" && <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span className="font-medium">Veredicto: {currentOutfit.verdict}</span>
                </div>
              </div>
            </div>

            {/* Bottom Grid: Dual Speech Bubbles (Lucas & Josefina - Mitad y Mitad) */}
            <div className="pt-4 border-t border-[var(--card-border)] space-y-2">
              <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-[var(--fg-muted)] block mb-1">
                Comentarios de los novios
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Lucas Speech Bubble (Mitad 1) */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--card-border)] transition-all">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all shadow-sm ${getBorderColor(currentOutfit.mood)}`}>
                      <Image
                        src="/images/avatar-lucas.png"
                        alt="Lucas"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-mono-swiss text-[10px] font-semibold text-[var(--accent-gold)] mt-1">
                      Lucas
                    </span>
                  </div>

                  <div className="relative flex-1 text-left pt-0.5">
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.lucasQuote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Josefina Speech Bubble (Mitad 2) */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--card-border)] transition-all">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all shadow-sm ${getBorderColor(currentOutfit.mood)}`}>
                      <Image
                        src="/images/avatar-josefina.png"
                        alt="Josefina"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-mono-swiss text-[10px] font-semibold text-[var(--accent-gold)] mt-1">
                      Josefina
                    </span>
                  </div>

                  <div className="relative flex-1 text-left pt-0.5">
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.josefinaQuote}&rdquo;
                    </p>
                  </div>
                </div>
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
