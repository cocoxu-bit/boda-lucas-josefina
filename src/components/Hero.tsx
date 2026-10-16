"use client";

import React from "react";
import { motion } from "framer-motion";
import { Countdown } from "@/components/Countdown";
import { ArrowDown, MapPin, Sparkles, Wine, Clock } from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

export const Hero: React.FC = () => {
  const { playClick } = useSoundEffects();

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
    hidden: { y: 28, opacity: 0 },
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
    playClick();
    const el = document.getElementById("timeline-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] pt-24 pb-16 px-4 sm:px-6 flex flex-col justify-between max-w-4xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] bg-[#dfb15b]/[0.07] rounded-full blur-[100px] pointer-events-none" 
        aria-hidden="true" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center space-y-6 pt-4"
      >
        {/* Top Editorial Index Tag */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <span className="glass-pill px-3 py-1 rounded-full font-mono-swiss text-[11px] text-zinc-300 tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb15b]" />
            EDICIÓN 06 • FEBRERO • 2027
          </span>
        </motion.div>

        {/* Names Headline with Kinetic Typography */}
        <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
          <h1 className="font-serif-editorial text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.92] text-white">
            <span className="inline-block hover:scale-[1.02] transition-transform duration-300">Lucas</span>
            <span className="block sm:inline font-sans-ui font-light text-3xl sm:text-5xl md:text-6xl text-[#dfb15b] mx-2 italic">
              &
            </span>
            <span className="inline-block hover:scale-[1.02] transition-transform duration-300">Josefina</span>
          </h1>
          <p className="font-mono-swiss text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-400 pt-2">
            VALENCIA // JARDINES DE MONFORTE & VENENO
          </p>
        </motion.div>

        {/* Expectation Pill Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-md"
        >
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-swiss text-zinc-300">
            <Clock className="w-3 h-3 text-[#dfb15b]" />
            13:00 H Monforte
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-swiss text-zinc-300">
            <Wine className="w-3 h-3 text-[#dfb15b]" />
            Cóctel Largo en Veneno
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-swiss text-zinc-300">
            <Sparkles className="w-3 h-3 text-[#dfb15b]" />
            Sin banquete formal
          </span>
        </motion.div>

        {/* The Manifest / Clarification Box (Crucial to set expectations) */}
        <motion.div
          variants={itemVariants}
          className="relative max-w-xl text-center px-4 py-3 sm:py-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm"
        >
          <p className="font-sans-ui text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            Queremos que la disfrutéis tanto como nosotros. Nos casamos por lo civil a la 13:00 en{" "}
            <span className="text-white font-medium">Palacios de Monforte</span> y después nos vamos directos a{" "}
            <span className="text-white font-medium">Veneno</span>. Será una fiesta con un{" "}
            <strong className="text-[#dfb15b] font-normal">cóctel largo de pie</strong>, bebida continua y buena música.
          </p>
          <p className="font-sans-ui text-xs sm:text-xs text-zinc-400 mt-2 italic">
            *Habrá zonas con asientos para nuestros mayores y para quien necesite descansar las piernas cuando lo pida el cuerpo.
          </p>
        </motion.div>

        {/* Live Electronic Countdown Clock */}
        <motion.div variants={itemVariants} className="w-full pt-4">
          <Countdown />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div variants={itemVariants} className="pt-6">
          <button
            onClick={scrollToTimeline}
            className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <span className="font-mono-swiss text-[10px] uppercase tracking-widest">
              Explorar evento & fotos
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
