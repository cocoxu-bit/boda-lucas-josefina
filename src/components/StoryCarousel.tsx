"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Heart,
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

export function StoryCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Update scroll navigation buttons state
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 340;
    const current = Math.min(
      STORY_PHOTOS.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(current);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollTo = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 340;
    const offset = direction === "left" ? -cardWidth * 1.2 : cardWidth * 1.2;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 340;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  // Keyboard controls for lightbox
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
      className="relative py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle ambient botanical glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-900/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header section: Only Title & Navigation Controls */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(28,38,26,0.65)] border border-[var(--accent-gold)]/30 backdrop-blur-md text-[var(--accent-gold)] text-xs md:text-sm font-medium tracking-wide uppercase shadow-sm mb-4"
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
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--fg-primary)] tracking-tight font-normal leading-[1.15]"
        >
          Nuestro camino hacia la boda...
        </motion.h2>

        {/* Navigation Buttons & Counter */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("left")}
            disabled={!canScrollLeft}
            aria-label="Foto anterior"
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
              canScrollLeft
                ? "bg-[rgba(28,38,26,0.7)] hover:bg-[rgba(28,38,26,0.95)] border-[var(--accent-gold)]/40 text-[var(--fg-primary)] hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                : "bg-white/5 border-white/10 text-white/20 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-serif text-sm md:text-base text-[var(--accent-gold)] tracking-widest px-3.5 py-1 rounded-full bg-[rgba(20,28,18,0.5)] border border-white/10">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(STORY_PHOTOS.length).padStart(2, "0")}
          </span>

          <button
            onClick={() => scrollTo("right")}
            disabled={!canScrollRight}
            aria-label="Foto siguiente"
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
              canScrollRight
                ? "bg-[rgba(28,38,26,0.7)] hover:bg-[rgba(28,38,26,0.95)] border-[var(--accent-gold)]/40 text-[var(--fg-primary)] hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                : "bg-white/5 border-white/10 text-white/20 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track: Pure Clean Photos */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 md:gap-7 overflow-x-auto pb-8 pt-2 px-2 scroll-smooth snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {STORY_PHOTOS.map((item, idx) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.07, 0.35) }}
              onClick={() => setLightboxIndex(idx)}
              className="flex-shrink-0 snap-center group relative w-[280px] sm:w-[320px] md:w-[360px] h-[420px] sm:h-[460px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer bg-[rgba(22,30,20,0.6)] border border-white/10 hover:border-[var(--accent-gold)]/70 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Image filling the entire card */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 320px, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 2}
                />
              </div>

              {/* Subtle hover vignette effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Progress Dots Indicator */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {STORY_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir a la foto ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? "w-7 h-2 bg-[var(--accent-gold)]"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
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
