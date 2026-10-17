"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  LayoutGrid,
  Columns3,
  Sparkles,
} from "lucide-react";

export type CategoryType = "todos" | "ellas" | "ellos";

export interface LookItem {
  id: string;
  title: string;
  subtitle: string;
  category: "ellas" | "ellos";
  imageUrl: string;
}

const LOOKS: LookItem[] = [
  // 1. Vestido drapeado con capa (Ellas - referencia usuaria)
  {
    id: "vestido-drapeado-teja",
    title: "Vestido drapeado con capa",
    subtitle: "Tono teja, cuello asimétrico y caída fluida",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228730311.webp",
  },
  // 2. Blazer camel & pantalón carbón (Ellos - foto usuaria)
  {
    id: "blazer-camel-lana",
    title: "Blazer camel & pantalón carbón",
    subtitle: "Camisa abierta sin corbata y botines",
    category: "ellos",
    imageUrl: "/images/dresscode/men_camel_blazer.webp",
  },
  // 3. Mono halter satinado (Ellas - referencia usuaria)
  {
    id: "mono-halter-petroleo",
    title: "Mono halter satinado",
    subtitle: "Azul petróleo fluido con escote halter",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228726490.webp",
  },
  // 4. Blazer verde oliva & chinos beige (Ellos - look generado)
  {
    id: "blazer-oliva-chinos",
    title: "Blazer verde oliva & chinos beige",
    subtitle: "Sastrería relajada en tonos tierra y mocasines",
    category: "ellos",
    imageUrl: "/images/dresscode/men_olive_blazer.webp",
  },
  // 5. Mono fluido mostaza (Ellas - referencia usuaria)
  {
    id: "mono-fluido-mostaza",
    title: "Mono fluido mostaza",
    subtitle: "Corte amplio con mangas kimono",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228734075.webp",
  },
  // 6. Blazer tabaco & pantalón crudo (Ellos - look generado)
  {
    id: "blazer-tabaco-crudo",
    title: "Blazer tabaco & pantalón crudo",
    subtitle: "Tejido lino-lana texturado con camisa de lino",
    category: "ellos",
    imageUrl: "/images/dresscode/men_tobacco_blazer.webp",
  },
  // 7. Vestido pañuelo boho paisley (Ellas - referencia usuaria)
  {
    id: "vestido-panuelo-boho",
    title: "Vestido pañuelo boho",
    subtitle: "Estampado paisley con detalle al cuello",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228717654.webp",
  },
  // 8. Blazer navy desestructurado (Ellos - look generado)
  {
    id: "blazer-navy-desestructurado",
    title: "Blazer navy desestructurado",
    subtitle: "Camisa blanca abierta y pantalón sastre",
    category: "ellos",
    imageUrl: "/images/dresscode/men_navy_blazer.webp",
  },
  // 9. Dos piezas negro con capa (Ellas - referencia usuaria)
  {
    id: "dos-piezas-negro",
    title: "Dos piezas negro con capa",
    subtitle: "Top bandeau, falda y sobrecapa asimétrica",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228737768.webp",
  },
  // 10. Palabra de honor chocolate (Ellas - referencia usuaria)
  {
    id: "palabra-honor-chocolate",
    title: "Palabra de honor chocolate",
    subtitle: "Corte midi con pliegue de gasa fluido",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228752805.webp",
  },
  // 11. Chaqueta terciopelo ciruela (Ellas - referencia usuaria)
  {
    id: "chaqueta-terciopelo-ciruela",
    title: "Chaqueta terciopelo ciruela",
    subtitle: "Combinada con vestido fluido en malva",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228770094.webp",
  },
  // 12. Top corsé & falda vaporosa (Ellas - referencia usuaria)
  {
    id: "corse-azul-marino",
    title: "Top corsé & falda vaporosa",
    subtitle: "Azul marino con volumen y movimiento",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228766277.webp",
  },
  // 13. Túnica bicolor & palazzo (Ellas - referencia usuaria)
  {
    id: "tunica-petroleo-palazzo",
    title: "Túnica bicolor & palazzo",
    subtitle: "Azul petróleo y fucsia sobre pantalón fluido",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228777623.webp",
  },
  // 14. Top halter & falda satinada (Ellas - referencia usuaria)
  {
    id: "top-halter-falda-seda",
    title: "Top halter & falda satinada",
    subtitle: "Combinación bicolor teja y crema",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228800277.webp",
  },
  // 15. Túnica burdeos & pantalón blanco (Ellas - referencia usuaria)
  {
    id: "tunica-burdeos-blanco",
    title: "Túnica burdeos & pantalón blanco",
    subtitle: "Líneas rectas depuradas y contraste nítido",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228795601.webp",
  },
  // 16. Top asimétrico & pantalón ancho (Ellas - referencia usuaria)
  {
    id: "top-asimetrico-palazzo",
    title: "Top asimétrico & pantalón ancho",
    subtitle: "Tonos tierra, hombro al descubierto y caída",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228781585.webp",
  },
  // 17. Vestido lencero verde oliva (Ellas - referencia usuaria)
  {
    id: "vestido-lencero-oliva",
    title: "Vestido lencero verde oliva",
    subtitle: "Satinado con sobreprenda transparente",
    category: "ellas",
    imageUrl: "/images/dresscode/media_1792228805529.webp",
  },
];

export const DressCodeInspector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("todos");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredLooks = LOOKS.filter((look) => {
    if (selectedCategory === "todos") return true;
    return look.category === selectedCategory;
  });

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = Math.min(scrollContainerRef.current.clientWidth * 0.75, 450);
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) =>
          prev !== null ? (prev - 1 + filteredLooks.length) % filteredLooks.length : null
        );
      } else if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) =>
          prev !== null ? (prev + 1) % filteredLooks.length : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, filteredLooks.length]);

  return (
    <section className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-swiss tracking-wider text-white/90 bg-white/10 border border-white/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          Guía de Estilo & Lookbook
        </span>

        <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[var(--fg-primary)] italic tracking-tight">
          Dress Code
        </h2>

        <p className="font-sans-ui text-sm sm:text-base text-white/90 max-w-xl mx-auto font-light leading-relaxed">
          Arreglado pero a tu rollo. Colores vivos, tejidos fluidos, sastrería relajada y calzado para darlo todo en la pista.
        </p>

        {/* Clean key highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 text-xs font-mono-swiss text-white/80">
          <span className="px-3 py-1 rounded-full bg-black/20 border border-white/15">
            ✕ Sin corbata obligatoria
          </span>
          <span className="px-3 py-1 rounded-full bg-black/20 border border-white/15">
            ✓ Monos, vestidos y 2 piezas
          </span>
          <span className="px-3 py-1 rounded-full bg-black/20 border border-white/15">
            ✓ Calzado cómodo para bailar
          </span>
        </div>
      </div>

      {/* Filter Tabs & Layout Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-2 border-b border-white/15">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/30 border border-white/20 backdrop-blur-md">
          <button
            onClick={() => {
              setSelectedCategory("todos");
              if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono-swiss font-medium transition-all cursor-pointer ${
              selectedCategory === "todos"
                ? "bg-white text-zinc-900 shadow-md font-semibold"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Todos ({LOOKS.length})
          </button>
          <button
            onClick={() => {
              setSelectedCategory("ellas");
              if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono-swiss font-medium transition-all cursor-pointer ${
              selectedCategory === "ellas"
                ? "bg-white text-zinc-900 shadow-md font-semibold"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Ellas ({LOOKS.filter((l) => l.category === "ellas").length})
          </button>
          <button
            onClick={() => {
              setSelectedCategory("ellos");
              if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono-swiss font-medium transition-all cursor-pointer ${
              selectedCategory === "ellos"
                ? "bg-white text-zinc-900 shadow-md font-semibold"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Ellos ({LOOKS.filter((l) => l.category === "ellos").length})
          </button>
        </div>

        {/* View mode toggle & carousel controls */}
        <div className="flex items-center gap-2">
          {viewMode === "carousel" && (
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => scroll("left")}
                aria-label="Deslizar a la izquierda"
                className="w-8 h-8 rounded-full border border-white/20 bg-black/25 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Deslizar a la derecha"
                className="w-8 h-8 rounded-full border border-white/20 bg-black/25 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center p-1 rounded-xl bg-black/30 border border-white/20">
            <button
              onClick={() => setViewMode("carousel")}
              title="Vista carrusel"
              className={`p-1.5 rounded-lg text-xs font-mono-swiss transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "carousel"
                  ? "bg-white text-zinc-900 font-semibold shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deslizar</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Vista cuadrícula"
              className={`p-1.5 rounded-lg text-xs font-mono-swiss transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-white text-zinc-900 font-semibold shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cuadrícula</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Card Display: Carousel or Grid */}
      {viewMode === "carousel" ? (
        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-1 select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredLooks.map((look, idx) => (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className="shrink-0 snap-start w-[72vw] sm:w-[270px] md:w-[290px] lg:w-[305px] group cursor-pointer"
                onClick={() => setActiveModalIndex(idx)}
              >
                <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-black/40 shadow-xl group-hover:border-white/50 group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={look.imageUrl}
                    alt={look.title}
                    fill
                    sizes="(max-width: 640px) 75vw, 320px"
                    className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority={idx < 4}
                  />

                  {/* Top Badge: Ellas / Ellos */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-swiss font-medium tracking-wider uppercase bg-black/60 text-white/90 border border-white/20 backdrop-blur-md">
                      {look.category === "ellas" ? "Ellas" : "Ellos"}
                    </span>
                  </div>

                  {/* Bottom Vignette & Captions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5 text-left transition-opacity duration-300">
                    <div className="flex items-end justify-between gap-2">
                      <div className="space-y-0.5">
                        <h3 className="font-serif-editorial text-lg sm:text-xl text-white italic leading-snug drop-shadow-sm">
                          {look.title}
                        </h3>
                        <p className="font-sans-ui text-xs text-white/80 line-clamp-1 font-light drop-shadow">
                          {look.subtitle}
                        </p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Mobile/Desktop edge controls */}
          <button
            onClick={() => scroll("left")}
            aria-label="Deslizar anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/30 backdrop-blur-md hidden md:flex items-center justify-center shadow-2xl transition-all cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Deslizar siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/30 backdrop-blur-md hidden md:flex items-center justify-center shadow-2xl transition-all cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* Grid Display */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {filteredLooks.map((look, idx) => (
            <div
              key={look.id}
              onClick={() => setActiveModalIndex(idx)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/20 bg-black/40 shadow-lg group-hover:border-white/50 group-hover:shadow-2xl transition-all duration-300">
                <Image
                  src={look.imageUrl}
                  alt={look.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono-swiss uppercase bg-black/60 text-white/90 border border-white/20 backdrop-blur-md">
                    {look.category === "ellas" ? "Ellas" : "Ellos"}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4 text-left">
                  <h3 className="font-serif-editorial text-base sm:text-lg text-white italic leading-snug drop-shadow-sm">
                    {look.title}
                  </h3>
                  <p className="font-sans-ui text-[11px] text-white/80 line-clamp-1 font-light drop-shadow">
                    {look.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Helpful & Warm Footer Note with Lucas & Josefina avatars */}
      <div className="mt-10 p-5 rounded-2xl bg-black/25 border border-white/15 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="relative w-10 h-10 rounded-full border-2 border-white/40 overflow-hidden bg-black/40">
              <Image
                src="/images/avatars/josefina-love.png"
                alt="Josefina"
                fill
                sizes="40px"
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <div className="relative w-10 h-10 rounded-full border-2 border-white/40 overflow-hidden bg-black/40">
              <Image
                src="/images/avatars/lucas-love.png"
                alt="Lucas"
                fill
                sizes="40px"
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
          <div>
            <p className="font-sans-ui text-xs sm:text-sm text-white font-medium">
              ¿Dudas sobre qué ponerte?
            </p>
            <p className="font-sans-ui text-xs text-white/80 font-light">
              Lo más importante es que vengas cómodo/a y a disfrutar a tope con nosotros.
            </p>
          </div>
        </div>

        <span className="font-mono-swiss text-xs text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/20 shrink-0">
          Toca cualquier foto para ampliarla
        </span>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {activeModalIndex !== null && filteredLooks[activeModalIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveModalIndex(null)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full max-h-[92vh] flex flex-col rounded-3xl overflow-hidden bg-[#1c261a] border border-white/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalIndex(null)}
                aria-label="Cerrar vista completa"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Prev / Next Buttons in Modal */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalIndex(
                    (activeModalIndex - 1 + filteredLooks.length) % filteredLooks.length
                  );
                }}
                aria-label="Look anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalIndex((activeModalIndex + 1) % filteredLooks.length);
                }}
                aria-label="Look siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-black/40 overflow-hidden">
                <Image
                  src={filteredLooks[activeModalIndex].imageUrl}
                  alt={filteredLooks[activeModalIndex].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-contain sm:object-cover"
                />
              </div>

              {/* Modal Details */}
              <div className="p-4 sm:p-5 bg-[#172015] border-t border-white/20 text-left flex items-center justify-between gap-3">
                <div>
                  <span className="font-mono-swiss text-[10px] uppercase text-white/70 tracking-wider">
                    Look {activeModalIndex + 1} de {filteredLooks.length} •{" "}
                    {filteredLooks[activeModalIndex].category === "ellas" ? "Ellas" : "Ellos"}
                  </span>
                  <h4 className="font-serif-editorial text-xl sm:text-2xl text-white italic">
                    {filteredLooks[activeModalIndex].title}
                  </h4>
                  <p className="font-sans-ui text-xs sm:text-sm text-white/80 font-light mt-0.5">
                    {filteredLooks[activeModalIndex].subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
