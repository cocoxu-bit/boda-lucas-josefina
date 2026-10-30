"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Maximize2,
  X,
  Pause,
  Play,
} from "lucide-react";

interface StoryPhoto {
  id: string;
  image: string;
  alt: string;
}

const STORY_PHOTOS: StoryPhoto[] = [
  {
    id: "festivales",
    image: "/images/story/01-festivales.webp",
    alt: "Momento festivales",
  },
  {
    id: "valencia",
    image: "/images/story/02-valencia.webp",
    alt: "Valencia, Ciudad de las Artes y las Ciencias",
  },
  {
    id: "montana",
    image: "/images/story/03-montana.webp",
    alt: "Escapada en la montaña",
  },
  {
    id: "japon",
    image: "/images/story/04-japon.webp",
    alt: "Viaje a Japón, Nara",
  },
  {
    id: "capadocia",
    image: "/images/story/05-capadocia.webp",
    alt: "Amanecer en globo en Capadocia",
  },
  {
    id: "baile",
    image: "/images/story/06-baile.webp",
    alt: "Noche de baile y fiesta",
  },
  {
    id: "gala",
    image: "/images/story/07-gala.webp",
    alt: "Noche de gala",
  },
  {
    id: "pedida",
    image: "/images/story/08-pedida.webp",
    alt: "La pedida de mano",
  },
  {
    id: "maximo",
    image: "/images/story/09-maximo-llegada.webp",
    alt: "La llegada de Máximo",
  },
];

const SLIDE_DURATION = 4200; // 4.2 seconds per photo

export function StoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % STORY_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + STORY_PHOTOS.length) % STORY_PHOTOS.length
    );
  }, []);

  // Autoplay slideshow timer
  useEffect(() => {
    if (!isPlaying || lightboxIndex !== null) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, lightboxIndex, nextSlide, currentIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % STORY_PHOTOS.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + STORY_PHOTOS.length) % STORY_PHOTOS.length
            : STORY_PHOTOS.length - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      id="nuestro-camino"
      className="relative py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(28,38,26,0.65)] border border-[var(--accent-gold)]/30 backdrop-blur-md text-[var(--accent-gold)] text-xs sm:text-sm font-medium tracking-wide uppercase shadow-sm mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)] animate-pulse" />
          <span>Nuestra Historia</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--fg-primary)] tracking-tight font-normal leading-[1.15]"
        >
          Nuestro camino hacia la boda...
        </motion.h2>
      </div>

      {/* Single Dynamic Slideshow Card */}
      <div className="relative max-w-sm sm:max-w-md mx-auto">
        {/* Main Card Container */}
        <div
          className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#151c14] border border-white/20 shadow-2xl shadow-black/60 group"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Photos Layer with Fade Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={STORY_PHOTOS[currentIndex].id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setLightboxIndex(currentIndex)}
            >
              <Image
                src={STORY_PHOTOS[currentIndex].image}
                alt={STORY_PHOTOS[currentIndex].alt}
                fill
                sizes="(max-width: 640px) 92vw, 450px"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Story-Style Segmented Progress Bars */}
          <div className="absolute top-0 inset-x-0 z-20 p-3 sm:p-4 bg-gradient-to-b from-black/70 via-black/30 to-transparent flex items-center gap-1.5">
            {STORY_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className="h-1 flex-1 rounded-full bg-white/25 overflow-hidden cursor-pointer"
              >
                {idx < currentIndex && (
                  <div className="h-full w-full bg-[var(--accent-gold)]" />
                )}
                {idx === currentIndex && (
                  <motion.div
                    key={`progress-${currentIndex}-${isPlaying}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPlaying ? "100%" : "50%" }}
                    transition={{
                      duration: isPlaying ? SLIDE_DURATION / 1000 : 0,
                      ease: "linear",
                    }}
                    className="h-full bg-[var(--accent-gold)]"
                  />
                )}
                {idx > currentIndex && <div className="h-full w-0" />}
              </div>
            ))}
          </div>

          {/* Touch navigation zones (Left 35% goes prev, Right 35% goes next) */}
          <div
            className="absolute inset-y-12 left-0 w-[30%] z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Foto anterior"
          />
          <div
            className="absolute inset-y-12 right-0 w-[30%] z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Foto siguiente"
          />

          {/* Floating Floating Nav Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Card Overlay: Counter, Play/Pause & Expand */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
            {/* Counter pill */}
            <span className="font-mono-swiss text-xs text-[var(--accent-gold)] px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(STORY_PHOTOS.length).padStart(2, "0")}
            </span>

            {/* Controls on the right */}
            <div className="flex items-center gap-2">
              {/* Play / Pause Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying((prev) => !prev);
                }}
                aria-label={isPlaying ? "Pausar presentación" : "Reanudar presentación"}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                title={isPlaying ? "Pausar" : "Reanudar"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>

              {/* Expand Lightbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(currentIndex);
                }}
                aria-label="Ver a pantalla completa"
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                title="Ampliar foto"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtitle / Tip below card */}
        <p className="text-center font-sans-ui text-xs text-white/60 mt-3 font-light">
          Toca los laterales para cambiar o haz clic para ver a pantalla completa
        </p>
      </div>

      {/* Full-Screen Pure Photo Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-xl"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] max-h-[850px] flex items-center justify-center bg-black/60 border border-[var(--accent-gold)]/40 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Cerrar vista completa"
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Counter Pill */}
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-[var(--accent-gold)]">
                {lightboxIndex + 1} / {STORY_PHOTOS.length}
              </div>

              {/* Photo View Container */}
              <div className="relative w-full h-full p-4 sm:p-8 flex items-center justify-center overflow-hidden">
                <Image
                  src={STORY_PHOTOS[lightboxIndex].image}
                  alt={STORY_PHOTOS[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />

                {/* Lightbox Nav Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + STORY_PHOTOS.length) %
                        STORY_PHOTOS.length
                    );
                  }}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 shadow-lg cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex + 1) % STORY_PHOTOS.length
                    );
                  }}
                  aria-label="Foto siguiente"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 shadow-lg cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
