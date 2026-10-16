"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  MapPin, 
  Clock, 
  ChevronDown, 
  ExternalLink, 
  Armchair, 
  Navigation,
  Sparkles,
  Camera,
  GlassWater,
  Music,
  Heart
} from "lucide-react";

interface TimelineStop {
  time: string;
  stepNumber: string;
  title: string;
  location: string;
  emoji: string;
  description: string;
  humorTip: string;
  mapUrl?: string;
  image?: {
    url: string;
    caption: string;
  };
}

const STOPS: TimelineStop[] = [
  {
    time: "12:45",
    stepNumber: "01",
    title: "El Checkpoint de Monforte",
    location: "Palacete de los Jardines de Monforte",
    emoji: "🏛️",
    description: "Llegada escalonada y primeros abrazos entre cipreses, fuentes y estatuas neoclásicas en uno de los rincones más mágicos de Valencia.",
    humorTip: "Tip: Respira hondo y busca sombra si hace solecito de febrero.",
    mapUrl: "https://maps.google.com/?q=Jardines+de+Monforte+Valencia",
    image: {
      url: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=80",
      caption: "Palacete y Jardines de Monforte — Un oasis neoclásico en Valencia",
    },
  },
  {
    time: "13:00",
    stepNumber: "02",
    title: "El 'Sí, Quiero' (Sin rodeos)",
    location: "Palacios de Monforte",
    emoji: "💍",
    description: "Ceremonia civil íntima, votos de verdad, alguna lagrimilla (se admiten apuestas de quién llora antes) y salida triunfal.",
    humorTip: "Kleenex en mano para los más sensibles.",
    mapUrl: "https://maps.google.com/?q=Jardines+de+Monforte+Valencia",
  },
  {
    time: "14:15",
    stepNumber: "03",
    title: "La Ruta del Vermut (Monforte ➔ Veneno)",
    location: "Centro de Valencia",
    emoji: "🚶‍♂️🍻",
    description: "Transición urbana ágil. Un agradable paseo a pie o 7 minutos en taxi / Uber por el centro. Sin autobuses interminables ni esperas.",
    humorTip: "Se permite parada técnica en bar intermedio para una cerveza de transición.",
  },
  {
    time: "14:45",
    stepNumber: "04",
    title: "Asalto a Veneno: Cóctel Largo",
    location: "Veneno Bar & Club",
    emoji: "🍸🍴",
    description: "Aquí empieza la fiesta grande. Comida continua (fría y caliente gourmet), cócteles de autor y copas desde el minuto uno. Todo dinámico y de pie.",
    humorTip: "Cero protocolo de mesas numeradas. Come y bebe a tu ritmo.",
    mapUrl: "https://maps.google.com/?q=Veneno+Valencia",
    image: {
      url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=80",
      caption: "Veneno — Iluminación íntima, barra libre de cócteles y ambientazo",
    },
  },
  {
    time: "17:30",
    stepNumber: "05",
    title: "Tardeo, DJ & Zapatillas en Llamas",
    location: "Veneno Club",
    emoji: "🪩⚡",
    description: "Luces bajas, selección musical impecable (indie, funk, disco y clásicos) y baile sin fin hasta que el cuerpo aguante.",
    humorTip: "Aviso: Lucas y Josefina tomarán el control de la cabina.",
    mapUrl: "https://maps.google.com/?q=Veneno+Valencia",
  },
];

export const Timeline: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<string | null>("monforte");

  return (
    <section id="timeline-section" className="relative w-full max-w-3xl mx-auto py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-mono-swiss uppercase tracking-widest text-[var(--accent-gold)]">
          <Clock className="w-3.5 h-3.5" />
          <span>ROADMAP // EL PLAN DEL DÍA</span>
        </div>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          La Hoja de Ruta Festera
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Sábado 6 de febrero de 2027. De la solemnidad botánica en Monforte al tardeo desenfadado en Veneno.
        </p>
      </div>

      {/* Venues Visual Spotlight Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {/* Monforte Card */}
        <div className="theme-card rounded-2xl overflow-hidden group shadow-lg">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80"
              alt="Palacios de Monforte Valencia"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono-swiss text-white">
                13:00 H • CEREMONIA CIVIL
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h4 className="font-serif-editorial text-2xl italic leading-none">
                Palacios de Monforte
              </h4>
              <p className="font-mono-swiss text-[10px] text-zinc-300 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#dfb15b]" />
                Jardines neoclásicos de Valencia
              </p>
            </div>
          </div>
          <div className="p-3.5 text-xs text-[var(--fg-muted)] font-light leading-relaxed">
            Jardines históricos protegidos con laberintos, estatuas de mármol y un palacete civil donde nos daremos el sí.
          </div>
        </div>

        {/* Veneno Card */}
        <div className="theme-card rounded-2xl overflow-hidden group shadow-lg">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
              alt="Veneno Bar Valencia"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono-swiss text-white">
                14:45 H • CÓCTEL LARGO & CLUB
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h4 className="font-serif-editorial text-2xl italic leading-none">
                Veneno
              </h4>
              <p className="font-mono-swiss text-[10px] text-zinc-300 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#dfb15b]" />
                Valencia Centro
              </p>
            </div>
          </div>
          <div className="p-3.5 text-xs text-[var(--fg-muted)] font-light leading-relaxed">
            Espacio alternativo con rollo club/coctelería. Cero manteles de boda tradicional: comida gourmet continua y tardeo épico.
          </div>
        </div>
      </div>

      {/* Storyboard Metro Map Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--accent-gold)]/40 space-y-8 my-8">
        {STOPS.map((stop, index) => (
          <motion.div
            key={stop.stepNumber}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="relative group"
          >
            {/* Custom Station Pin */}
            <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-5 h-5 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)] flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
              <span className="font-mono-swiss text-[9px] font-bold text-[var(--accent-gold)]">
                {stop.stepNumber}
              </span>
            </div>

            {/* Story Card */}
            <div className="theme-card rounded-2xl p-4 sm:p-5 transition-all hover:border-[var(--card-border-hover)] shadow-lg space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{stop.emoji}</span>
                  <span className="font-mono-swiss text-sm sm:text-base font-bold text-[var(--accent-gold)]">
                    {stop.time} H
                  </span>
                </div>

                {stop.mapUrl && (
                  <a
                    href={stop.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono-swiss text-[11px] text-[var(--fg-muted)] hover:text-[var(--accent-gold)] transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-[var(--accent-gold)]" />
                    <span>Ver ubicación</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                )}
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                {stop.title}
              </h3>

              <div className="font-sans-ui text-xs text-[var(--fg-muted)] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                <span>{stop.location}</span>
              </div>

              <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/85 font-light leading-relaxed pt-1">
                {stop.description}
              </p>

              {/* Humor Tip pill */}
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-xl text-[11px] font-mono-swiss bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--card-border)] text-[var(--accent-gold)]">
                  💡 {stop.humorTip}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Clarification on Seats (Reassurance for guests) */}
      <div className="mt-12 theme-card rounded-2xl p-5 border-l-4 border-l-[var(--accent-gold)] shadow-md">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl glass-pill text-[var(--accent-gold)] mt-0.5">
            <Armchair className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-sans-ui text-sm sm:text-base font-semibold text-[var(--fg-primary)]">
              Recordatorio importante: Cóctel de pie con zonas de asiento
            </h4>
            <p className="font-sans-ui text-xs text-[var(--fg-muted)] leading-relaxed">
              No habrá asignación de mesas formal de banquete clásico de 4 horas. Habrá barra continua y pase de comida abundante, pero <strong className="text-[var(--fg-primary)] font-medium">garantizamos sillones y bancos reservados para nuestros mayores</strong> y para que cualquiera pueda reposar cuando le apetezca.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
