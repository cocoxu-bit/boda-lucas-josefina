"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Countdown } from "@/components/Countdown";
import { ArrowDown, ExternalLink } from "lucide-react";
import { getSmartMapUrl, openSmartMap } from "@/lib/maps";

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 320,
        damping: 28,
      },
    },
  };

  const scrollToTimeline = () => {
    const el = document.getElementById("timeline-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] pt-24 pb-14 px-4 sm:px-6 flex flex-col justify-between max-w-4xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] bg-[var(--accent-gold)]/[0.08] rounded-full blur-[100px] pointer-events-none transition-colors duration-500" 
        aria-hidden="true" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center space-y-7 pt-2"
      >
        {/* Main Editorial Headline */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="font-serif-editorial text-7xl sm:text-9xl tracking-tight leading-[0.9] text-[var(--fg-primary)] transition-colors duration-300">
            <span className="inline-block hover:scale-[1.01] transition-transform">Josefina</span>
            <span className="block sm:inline font-sans-ui font-light text-4xl sm:text-6xl text-[var(--accent-gold)] mx-3 italic">
              &
            </span>
            <span className="inline-block hover:scale-[1.01] transition-transform">Lucas</span>
          </h1>
          <p className="font-mono-swiss text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--fg-muted)] pt-1">
            06 • 02 • 2027 // VALENCIA
          </p>
        </motion.div>

        {/* TWO LARGE VENUE CARDS: Palacios de Monforte & Veneno */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mx-auto"
        >
          {/* Card 1: Palacios de Monforte */}
          <div className="theme-card rounded-3xl overflow-hidden p-4 sm:p-5 text-left transition-all duration-300 hover:shadow-2xl group flex flex-col justify-between">
            <div>
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-4 border border-[var(--card-border)] bg-black/5 dark:bg-white/5">
                <Image
                  src="/images/monforte-sketch.jpg"
                  alt="Ilustración de los Palacios de Monforte"
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono-swiss text-white uppercase tracking-widest border border-white/10">
                  Ceremonia • 13:00 H
                </div>
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                Palacios de Monforte
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] mt-1 font-light leading-relaxed">
                Ceremonia civil en el palacete neoclásico del siglo XIX y jardines históricos. Encuentro a las 12:45, firma y salida con confeti.
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-[var(--card-border)] flex items-center justify-between">
              <span className="font-mono-swiss text-[11px] text-[var(--accent-gold)]">
                C/ Monforte, 1 • Valencia
              </span>
              <a
                href={getSmartMapUrl("monforte")}
                onClick={(e) => {
                  e.preventDefault();
                  openSmartMap("monforte");
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono-swiss text-xs text-[var(--fg-primary)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Veneno */}
          <div className="theme-card rounded-3xl overflow-hidden p-4 sm:p-5 text-left transition-all duration-300 hover:shadow-2xl group flex flex-col justify-between">
            <div>
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-4 border border-[var(--card-border)] bg-black/5 dark:bg-white/5">
                <Image
                  src="/images/veneno-sketch.jpg"
                  alt="Ilustración de Veneno Concept Bar"
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono-swiss text-white uppercase tracking-widest border border-white/10">
                  Cóctel Largo • 14:45 H
                </div>
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                Veneno Concept
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] mt-1 font-light leading-relaxed">
                Nave industrial y brutalista en Ruzafa. Cóctel largo de pie, bebida sin fin, copas, zona de descanso con sofás y tardeo con música.
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-[var(--card-border)] flex items-center justify-between">
              <span className="font-mono-swiss text-[11px] text-[var(--accent-gold)]">
                Av. Peris y Valero, 124 • Ruzafa
              </span>
              <a
                href={getSmartMapUrl("veneno")}
                onClick={(e) => {
                  e.preventDefault();
                  openSmartMap("veneno");
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono-swiss text-xs text-[var(--fg-primary)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Live Electronic Countdown Clock with Direct Google & Apple Calendar integration */}
        <motion.div variants={itemVariants} className="w-full pt-1">
          <Countdown />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div variants={itemVariants} className="pt-2">
          <button
            onClick={scrollToTimeline}
            className="group flex flex-col items-center gap-1.5 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
          >
            <span className="font-mono-swiss text-[10px] uppercase tracking-widest">
              Ver el cronograma completo
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)] transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
