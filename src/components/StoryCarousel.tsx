"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Maximize2,
  X,
  Heart,
} from "lucide-react";

interface StoryMoment {
  id: string;
  chapter: string;
  tag: string;
  location: string;
  title: string;
  caption: string;
  image: string;
}

const STORY_MOMENTS: StoryMoment[] = [
  {
    id: "festivales",
    chapter: "01",
    tag: "Música & Verano",
    location: "Festivales bajo el sol",
    title: "Donde la música nos unió",
    caption:
      "Conciertos interminables, risas entre la multitud y besos improvisados. Desde el primer acorde supimos que nuestro ritmo iba acompasado.",
    image: "/images/story/01-festivales.webp",
  },
  {
    id: "valencia",
    chapter: "02",
    tag: "Tardes Doradas",
    location: "Valencia",
    title: "Risas cómplices en casa",
    caption:
      "Tardes luminosas en la Ciudad de las Artes y las Ciencias. Esas miradas y carcajadas espontáneas que hacen que cualquier día ordinario sea una fiesta.",
    image: "/images/story/02-valencia.webp",
  },
  {
    id: "montana",
    chapter: "03",
    tag: "Naturaleza",
    location: "Pirineos",
    title: "Escapadas a la cumbre",
    caption:
      "Respirando aire puro entre picos y nubes. Descubrimos que caminar juntos no solo nos lleva alto, sino que hace el camino aún más bonito.",
    image: "/images/story/03-montana.webp",
  },
  {
    id: "japon",
    chapter: "04",
    tag: "Grandes Viajes",
    location: "Nara, Japón",
    title: "Descubriendo el mundo de la mano",
    caption:
      "Frente al majestuoso templo Todai-ji. Cruzar medio planeta juntos para maravillarnos con templos milenarios, nuevas culturas y recuerdos imborrables.",
    image: "/images/story/04-japon.webp",
  },
  {
    id: "capadocia",
    chapter: "05",
    tag: "Amanecer Mágico",
    location: "Capadocia, Turquía",
    title: "Tocando el cielo en globo",
    caption:
      "Amanecer flotando entre cientos de globos aerostáticos sobre valles de ensueño. Una mañana mágica que guardamos grabada para siempre.",
    image: "/images/story/05-capadocia.webp",
  },
  {
    id: "baile",
    chapter: "06",
    tag: "Noches Únicas",
    location: "Pistas de baile",
    title: "Bailes lentos que paran el reloj",
    caption:
      "Bajo luces violetas y rodeados de fiesta. No importa cuánta gente haya alrededor, cuando bailamos juntos el mundo desaparece.",
    image: "/images/story/06-baile.webp",
  },
  {
    id: "gala",
    chapter: "07",
    tag: "Elegancia & Ilusión",
    location: "Noche de gala",
    title: "Celebrando cada etapa",
    caption:
      "Elegantes, felices y con la emoción más grande latiendo en nuestro interior. Cada celebración nos confirmaba lo afortunados que somos.",
    image: "/images/story/07-gala.webp",
  },
  {
    id: "pedida",
    chapter: "08",
    tag: "El Gran Momento",
    location: "La pedida de mano",
    title: "¡El momento del 'Sí'!",
    caption:
      "Sorpresa absoluta, lágrimas de alegría y un anillo que selló la promesa más bonita. El día en que este gran viaje hacia la boda se hizo oficial.",
    image: "/images/story/08-pedida.webp",
  },
  {
    id: "maximo",
    chapter: "09",
    tag: "El Mayor Regalo",
    location: "Bienvenido a nuestras vidas",
    title: "La llegada de Máximo",
    caption:
      "El instante en que nuestro mundo se transformó por completo. Máximo llegó para multiplicar nuestro amor por infinito y llenar cada día de luz.",
    image: "/images/story/09-maximo-llegada.webp",
  },
  {
    id: "familia",
    chapter: "10",
    tag: "Nuestra Familia",
    location: "Valencia al atardecer",
    title: "Listos para dar el 'Sí, quiero'",
    caption:
      "Los tres juntos, sonriendo con el corazón lleno. Listos para celebrar nuestro amor rodeados de las personas que más queremos en el mundo.",
    image: "/images/story/10-familia.webp",
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

    // Approximate active index based on scroll position
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 340;
    const current = Math.min(
      STORY_MOMENTS.length - 1,
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
          prev !== null ? (prev + 1) % STORY_MOMENTS.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + STORY_MOMENTS.length) % STORY_MOMENTS.length
            : STORY_MOMENTS.length - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      id="nuestro-camino"
      className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle ambient botanical glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-900/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
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
          Nuestro camino hasta la boda...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base md:text-lg text-[var(--fg-secondary)] max-w-2xl mx-auto font-light leading-relaxed"
        >
          Cada viaje, cada risa interminable, cada noche de baile y el mayor
          milagro de nuestras vidas nos han traído hasta aquí. Y lo mejor empieza
          ahora.
        </motion.p>

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

          <span className="font-serif text-sm md:text-base text-[var(--accent-gold)] tracking-widest px-3 py-1 rounded-full bg-[rgba(20,28,18,0.5)] border border-white/10">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(STORY_MOMENTS.length).padStart(2, "0")}
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

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 md:gap-7 overflow-x-auto pb-8 pt-2 px-2 scroll-smooth snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {STORY_MOMENTS.map((moment, idx) => {
          const isActive = activeIndex === idx;

          return (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.4) }}
              onClick={() => setLightboxIndex(idx)}
              className="flex-shrink-0 snap-center group relative w-[280px] sm:w-[320px] md:w-[360px] h-[460px] md:h-[520px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer bg-[rgba(22,30,20,0.6)] border border-white/10 hover:border-[var(--accent-gold)]/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="(max-width: 768px) 320px, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 2}
                />
              </div>

              {/* Gradient Scrims for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,18,10,0.96)] via-[rgba(12,18,10,0.45)] to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

              {/* Top Chapter Pill & Expand Icon */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-[rgba(16,24,14,0.7)] backdrop-blur-md border border-white/15 text-[11px] font-mono text-[var(--accent-gold)] uppercase tracking-wider font-semibold">
                  Cap. {moment.chapter}
                </span>

                <div className="w-8 h-8 rounded-full bg-[rgba(16,24,14,0.7)] backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-[var(--accent-gold)] group-hover:scale-110 transition-all duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 text-left flex flex-col justify-end">
                {/* Location Pill */}
                <div className="flex items-center gap-1.5 text-xs text-[var(--accent-gold)] mb-2 font-medium tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] flex-shrink-0" />
                  <span className="truncate">{moment.location}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-white font-normal leading-snug mb-2 group-hover:text-[var(--accent-gold)] transition-colors duration-300">
                  {moment.title}
                </h3>

                {/* Caption snippet */}
                <p className="text-xs md:text-sm text-white/80 line-clamp-2 font-light leading-relaxed mb-3">
                  {moment.caption}
                </p>

                {/* Expand prompt */}
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/60 group-hover:text-[var(--accent-gold)] font-medium transition-colors">
                  <span>Ver foto y recuerdo</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Dots Indicator */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {STORY_MOMENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir al capítulo ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? "w-7 h-2 bg-[var(--accent-gold)]"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row bg-[rgba(24,34,22,0.96)] border border-[var(--accent-gold)]/40 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Cerrar vista completa"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo View Container */}
              <div className="relative w-full md:w-3/5 h-[45vh] md:h-auto min-h-[300px] md:min-h-[520px] bg-black/40 flex items-center justify-center overflow-hidden">
                <Image
                  src={STORY_MOMENTS[lightboxIndex].image}
                  alt={STORY_MOMENTS[lightboxIndex].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain p-2 md:p-4"
                  priority
                />

                {/* Lightbox Nav Arrows over image for mobile/desktop */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + STORY_MOMENTS.length) %
                        STORY_MOMENTS.length
                    );
                  }}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex + 1) % STORY_MOMENTS.length
                    );
                  }}
                  aria-label="Foto siguiente"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Story Details Sidebar */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[520px]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[rgba(16,24,14,0.8)] border border-[var(--accent-gold)]/40 text-[11px] font-mono text-[var(--accent-gold)] uppercase tracking-wider font-semibold">
                      Capítulo {STORY_MOMENTS[lightboxIndex].chapter} de{" "}
                      {String(STORY_MOMENTS.length).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-white/50">•</span>
                    <span className="text-xs text-[var(--accent-gold)] font-medium">
                      {STORY_MOMENTS[lightboxIndex].tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-white/70 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span>{STORY_MOMENTS[lightboxIndex].location}</span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-snug mb-4">
                    {STORY_MOMENTS[lightboxIndex].title}
                  </h3>

                  <p className="text-sm md:text-base text-white/85 font-light leading-relaxed">
                    {STORY_MOMENTS[lightboxIndex].caption}
                  </p>
                </div>

                {/* Bottom navigation pill */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <span>Usa las flechas del teclado ← →</span>
                  <span className="text-[var(--accent-gold)] font-medium">
                    {lightboxIndex + 1} / {STORY_MOMENTS.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
