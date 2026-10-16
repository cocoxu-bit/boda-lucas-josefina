"use client";

import React from "react";
import { motion } from "framer-motion";
import { Countdown } from "@/components/Countdown";
import { ArrowDown } from "lucide-react";

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
    <section className="relative min-h-[88vh] pt-24 pb-14 px-4 sm:px-6 flex flex-col justify-between max-w-4xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] bg-[var(--accent-gold)]/[0.08] rounded-full blur-[100px] pointer-events-none transition-colors duration-500" 
        aria-hidden="true" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center space-y-6 pt-2"
      >
        {/* Main Editorial Headline */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="font-serif-editorial text-7xl sm:text-9xl tracking-tight leading-[0.9] text-[var(--fg-primary)] transition-colors duration-300">
            <span className="inline-block hover:scale-[1.01] transition-transform">Lucas</span>
            <span className="block sm:inline font-sans-ui font-light text-4xl sm:text-6xl text-[var(--accent-gold)] mx-3 italic">
              &
            </span>
            <span className="inline-block hover:scale-[1.01] transition-transform">Josefina</span>
          </h1>
          <p className="font-mono-swiss text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--fg-muted)] pt-1">
            06 • 02 • 2027 // VALENCIA
          </p>
        </motion.div>

        {/* Clean, Non-Duplicated Manifesto */}
        <motion.div
          variants={itemVariants}
          className="theme-card max-w-lg mx-auto text-center px-5 py-4 rounded-2xl shadow-sm transition-all"
        >
          <p className="font-sans-ui text-sm sm:text-base text-[var(--fg-primary)] leading-relaxed font-light">
            Nos casamos a las 13:00 en <strong>Palacios de Monforte</strong> y lo celebramos en <strong>Veneno</strong> con un <strong>cóctel largo de pie</strong>, copas y música.
          </p>
          <p className="font-sans-ui text-xs text-[var(--fg-muted)] mt-2">
            Habrá asientos para quien lo necesite o quiera descansar. Ven arreglado pero a tu rollo.
          </p>
        </motion.div>

        {/* Live Electronic Countdown Clock */}
        <motion.div variants={itemVariants} className="w-full pt-2">
          <Countdown />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div variants={itemVariants} className="pt-4">
          <button
            onClick={scrollToTimeline}
            className="group flex flex-col items-center gap-1.5 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
          >
            <span className="font-mono-swiss text-[10px] uppercase tracking-widest">
              Ver el día
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
