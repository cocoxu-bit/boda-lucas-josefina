"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ExternalLink, 
  Shirt, 
  Armchair, 
  Navigation,
  Music,
  Wine
} from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  description: string;
  tag: string;
  mapUrl?: string;
}

const EVENTS: TimelineEvent[] = [
  {
    time: "12:45",
    title: "Llegada & Encuentro",
    location: "Palacete de los Jardines de Monforte",
    description: "Recepción de invitados en uno de los rincones neoclásicos más bonitos de Valencia. Respira los jardines antes del enlace.",
    tag: "Puntualidad",
    mapUrl: "https://maps.google.com/?q=Jardines+de+Monforte+Valencia",
  },
  {
    time: "13:00",
    title: "La Ceremonia Civil",
    location: "Palacios de Monforte",
    description: "Firma civil, votos breves y directos, música en directo y salida con lluvia de confeti.",
    tag: "El Sí Quiero",
    mapUrl: "https://maps.google.com/?q=Jardines+de+Monforte+Valencia",
  },
  {
    time: "14:15",
    title: "Paseo hacia Veneno",
    location: "Valencia Centro",
    description: "Tiempo libre para una cerveza rápida de camino, paseo o taxi corto hacia Veneno. Sin prisas ni autobuses eternos.",
    tag: "Transición",
  },
  {
    time: "14:45",
    title: "Apertura del Cóctel Largo",
    location: "Veneno Bar & Club",
    description: "Comienza la fiesta: comida continua (salada y dulce gourmet), cócteles de autor y copas desde el minuto uno. Todo de pie, dinámico y fluido.",
    tag: "Comida & Cócteles",
    mapUrl: "https://maps.google.com/?q=Veneno+Valencia",
  },
  {
    time: "17:30",
    title: "Tardeo, DJ & Pista Libre",
    location: "Veneno",
    description: "Luces bajas, buena selección musical (indie, funk, disco y clásicos) y baile hasta que el cuerpo aguante.",
    tag: "Party Time",
    mapUrl: "https://maps.google.com/?q=Veneno+Valencia",
  },
];

interface InfoDrawer {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  content: string;
  bulletPoints: string[];
}

const DETAILS_DRAWERS: InfoDrawer[] = [
  {
    id: "dress-code",
    title: "Dress Code: Arreglado pero a tu rollo",
    subtitle: "Elegancia contemporánea sin etiqueta rígida",
    icon: Shirt,
    content: "Queremos que todo el mundo se vea genial y especial en las fotos, pero sin disfraces ni rigideces innecesarias.",
    bulletPoints: [
      "Sí: Trajes contemporáneos, camisas bonitas, vestidos midi/cortos, monos de diseño.",
      "Zapatillas elegantes y calzado cómodo: 100% recomendados (vas a bailar muchas horas).",
      "No obligatorio: Ni corbatas ni pajaritas ni tocados imposibles.",
    ],
  },
  {
    id: "format",
    title: "El Formato: Cóctel Largo & Asientos",
    subtitle: "Cero mesas numeradas, cero esperas de 4 horas",
    icon: Armchair,
    content: "La boda está pensada como una gran celebración social de pie, con comida continua servida por camareros y estaciones gastronómicas.",
    bulletPoints: [
      "Comerás mucho y muy rico: No te preocupes por quedarte con hambre, el pase es continuo y abundante.",
      "Asientos garantizados: Habrá bancos, taburetes y zonas lounge reservadas para personas mayores o quien necesite sentarse a reposar.",
      "Libertad total de movimiento para charlar con quien quieras.",
    ],
  },
  {
    id: "locations",
    title: "Cómo Moverse (Monforte ➔ Veneno)",
    subtitle: "Logística urbana ágil en Valencia",
    icon: Navigation,
    content: "Ambos espacios están ubicados en la ciudad. El trayecto se puede hacer en taxi/Uber (unos 8-10 minutos) o con un agradable paseo.",
    bulletPoints: [
      "Jardines de Monforte: Carrer de Montfort, s/n (fácil acceso en taxi o metro Facultats).",
      "Veneno: En el corazón del ocio valenciano. Os facilitaremos la ubicación exacta y paradas de taxi cercanas.",
    ],
  },
];

export const Timeline: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<string | null>("dress-code");
  const { playClick, playSelect } = useSoundEffects();

  const toggleDrawer = (id: string) => {
    playSelect();
    setOpenDrawer((prev) => (prev === id ? null : id));
  };

  return (
    <section id="timeline-section" className="relative w-full max-w-3xl mx-auto py-16 px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-swiss text-[#dfb15b] uppercase tracking-widest">
          <Clock className="w-3.5 h-3.5" />
          <span>CRONOGRAMA & LOGÍSTICA</span>
        </div>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-white italic">
          El Plan del Día
        </h2>
        <p className="font-sans-ui text-sm text-zinc-400 max-w-md mx-auto">
          Sábado 6 de febrero de 2027. Los hitos clave para que no te pierdas nada.
        </p>
      </div>

      {/* Tracing Beam Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10 my-8">
        {/* Glow tracer effect */}
        <div 
          className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#dfb15b] via-white/40 to-transparent" 
          aria-hidden="true" 
        />

        {EVENTS.map((event, index) => (
          <motion.div
            key={event.time}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative group"
          >
            {/* Timeline node dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-[#dfb15b] flex items-center justify-center transition-transform group-hover:scale-125">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Event Card */}
            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 sm:p-5 backdrop-blur-md transition-all hover:border-white/20 hover:bg-zinc-900/60 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-swiss text-sm sm:text-base font-bold text-[#dfb15b]">
                    {event.time}
                  </span>
                  <span className="font-mono-swiss text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {event.tag}
                  </span>
                </div>

                {event.mapUrl && (
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    className="flex items-center gap-1 font-mono-swiss text-[11px] text-zinc-400 hover:text-[#dfb15b] transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-[#dfb15b]" />
                    <span>Ver mapa</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                )}
              </div>

              <h3 className="font-serif-editorial text-2xl text-white italic tracking-wide">
                {event.title}
              </h3>
              
              <div className="font-sans-ui text-xs font-medium text-zinc-400 mt-0.5 mb-2 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-zinc-500" />
                <span>{event.location}</span>
              </div>

              <p className="font-sans-ui text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accordion / Logistics Clarity Drawers */}
      <div className="mt-16 space-y-4">
        <div className="text-center mb-6">
          <span className="font-mono-swiss text-[11px] uppercase tracking-widest text-zinc-400">
            DETALLES IMPORTANTES // ZERO FALSAS EXPECTATIVAS
          </span>
        </div>

        {DETAILS_DRAWERS.map((drawer) => {
          const isOpen = openDrawer === drawer.id;
          const Icon = drawer.icon;

          return (
            <div
              key={drawer.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? "border-[#dfb15b]/40 bg-zinc-900/80 shadow-xl shadow-black/50" 
                  : "border-white/10 bg-zinc-950/50 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleDrawer(drawer.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${isOpen ? "bg-[#dfb15b]/10 text-[#dfb15b]" : "bg-white/5 text-zinc-400"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans-ui text-sm sm:text-base font-medium text-white">
                      {drawer.title}
                    </h4>
                    <p className="font-sans-ui text-xs text-zinc-400">
                      {drawer.subtitle}
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-zinc-400"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 space-y-3 border-t border-white/5">
                      <p className="font-light leading-relaxed">{drawer.content}</p>
                      <ul className="space-y-2 pt-1">
                        {drawer.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 font-mono-swiss text-[11px] sm:text-xs text-zinc-300">
                            <span className="text-[#dfb15b] mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
