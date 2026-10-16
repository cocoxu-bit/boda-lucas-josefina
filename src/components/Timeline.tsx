"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";

interface TimelineStop {
  time: string;
  stepNumber: string;
  title: string;
  location: string;
  description: string;
  mapUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const STOPS: TimelineStop[] = [
  {
    time: "12:45",
    stepNumber: "01",
    title: "Llegada & Encuentro",
    location: "Palacete de los Jardines de Monforte",
    description: "Recepción de invitados entre cipreses y estatuas neoclásicas en uno de los jardines históricos más bonitos de Valencia.",
    mapUrl: "https://maps.google.com/?q=Jardines+de+Monforte+Valencia",
    imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Palacios de Monforte",
  },
  {
    time: "13:00",
    stepNumber: "02",
    title: "La Ceremonia Civil",
    location: "Palacios de Monforte",
    description: "Firma civil, votos breves, música y salida con lluvia de confeti.",
    mapUrl: "https://maps.google.com/?q=Jardines+de+Monforte+Valencia",
  },
  {
    time: "14:15",
    stepNumber: "03",
    title: "Camino hacia Veneno",
    location: "Centro de Valencia",
    description: "Paseo a pie o taxi rápido de 8 minutos por el centro de la ciudad. Sin traslados largos ni esperas.",
  },
  {
    time: "14:45",
    stepNumber: "04",
    title: "Apertura del Cóctel Largo",
    location: "Veneno Bar & Club",
    description: "Comida gourmet continua servida por camareros, bebida y cócteles de autor desde el primer minuto. Todo dinámico y de pie.",
    mapUrl: "https://maps.google.com/?q=Veneno+Valencia",
    imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Veneno Bar Valencia",
  },
  {
    time: "17:30",
    stepNumber: "05",
    title: "Tardeo, DJ & Baile",
    location: "Veneno",
    description: "Luces bajas, buena música (indie, disco, funk) y fiesta continua.",
    mapUrl: "https://maps.google.com/?q=Veneno+Valencia",
  },
];

export const Timeline: React.FC = () => {
  return (
    <section id="timeline-section" className="relative w-full max-w-2xl mx-auto py-12 px-4 sm:px-6">
      {/* Clean Header */}
      <div className="text-center space-y-1 mb-10">
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          El Plan del Día
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)]">
          Sábado 6 de febrero de 2027
        </p>
      </div>

      {/* Clean Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--accent-gold)]/40 space-y-6 my-4">
        {STOPS.map((stop, index) => (
          <motion.div
            key={stop.stepNumber}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="relative group"
          >
            {/* Station Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)] flex items-center justify-center shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
            </div>

            {/* Story Card */}
            <div className="theme-card rounded-2xl p-4 sm:p-5 transition-all shadow-md space-y-3">
              {/* Optional Venue Photo directly integrated inside the timeline stop */}
              {stop.imageUrl && (
                <div className="relative h-44 w-full rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src={stop.imageUrl}
                    alt={stop.imageAlt || stop.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 text-white font-mono-swiss text-[11px] font-medium">
                    {stop.location}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-swiss text-sm sm:text-base font-bold text-[var(--accent-gold)]">
                    {stop.time} H
                  </span>
                  <span className="h-3 w-px bg-current opacity-20" />
                  <span className="font-sans-ui text-xs text-[var(--fg-muted)] font-medium">
                    {stop.location}
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
                    <span>Mapa</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                )}
              </div>

              <h3 className="font-serif-editorial text-2xl text-[var(--fg-primary)] italic">
                {stop.title}
              </h3>

              <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/80 font-light leading-relaxed">
                {stop.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
