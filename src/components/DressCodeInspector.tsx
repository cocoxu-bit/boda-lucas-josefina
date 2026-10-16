"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type MoodType = "love" | "meh" | "veto";

interface OutfitExample {
  id: string;
  title: string;
  subtitle: string;
  score: string;
  verdict: string;
  mood: MoodType;
  imageUrl: string;
  lucasQuote: string;
  josefinaQuote: string;
  maximoQuote: string;
}

const OUTFITS: OutfitExample[] = [
  {
    id: "smart-sneakers",
    title: "Traje Informal con Zapatillas Blancas",
    subtitle: "Blazer relajado, camiseta básica de algodón o camisa abierta y calzado deportivo limpio.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/sample_casual_man.jpg",
    lucasQuote: "Para mí es el uniforme definitivo. Vas arreglado, no pasas calor y con las zapatillas aguantas 8 horas de pie en Veneno sin enterarte de los pies.",
    josefinaQuote: "¡Totalmente! Me encanta el rollazo que da. Se ve arreglado pero moderno y cero estirado. ¡Aprobado con nota!",
    maximoQuote: "¡Aba-dá! *[aplaude con las dos manitas entusiasmado y estira los brazos para que le cojan]*",
  },
  {
    id: "midi-flow",
    title: "Vestido Midi Fluido o Estampado",
    subtitle: "Tejidos vaporosos, colores vivos o estampados alegres, combinados con cuñas, botines o bailarinas.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/dress_green.jpg",
    lucasQuote: "Encaja a la perfección con la luz de febrero en los jardines de Monforte y el ambiente desenfadado de Veneno.",
    josefinaQuote: "Mi opción favorita. Comodísimo, fresco y con libertad total de movimiento para pillar el cóctel al vuelo y bailar toda la tarde.",
    maximoQuote: "¡Agú tatá! *[se ríe a carcajadas mirando los colores y señala con el dedito]*",
  },
  {
    id: "tailoring-chic",
    title: "Traje de Chaqueta Sastre Femenino",
    subtitle: "Dos piezas en tonos alegres o neutros, con top lencero o camiseta y calzado cómodo.",
    score: "10 / 10",
    verdict: "Ideal",
    mood: "love",
    imageUrl: "/images/sample_fashion_look.jpg",
    lucasQuote: "Aprobado al cien por cien. Elegante, contemporáneo y acorde con el espíritu de una boda sin etiquetas rancias.",
    josefinaQuote: "Un dos piezas fluido con zapatillas o zapato cómodo tiene una personalidad increíble. Pura elegancia sin corsés.",
    maximoQuote: "¡Da-dá! *[da palmaditas en la mesa y sonríe mostrando dos dientes]*",
  },
  {
    id: "linen-no-tie",
    title: "Traje Dos Piezas sin Corbata o Cuello Mao",
    subtitle: "Corte actual en azul, arena o verde, con camisa abierta o cuello mao sin ataduras.",
    score: "9 / 10",
    verdict: "Muy Top",
    mood: "love",
    imageUrl: "/images/linen_shirt.jpg",
    lucasQuote: "La corbata queda vetada en nuestra boda. Con un traje moderno desabrochado vas impecable y disfrutas mil veces más.",
    josefinaQuote: "Mucho más guapos y cercanos así que pareciendo que vais a una junta de accionistas en pleno lunes.",
    maximoQuote: "¡Gugú baaa! *[agarra la tela suave con los puñitos y asiente satisfecho]*",
  },
  {
    id: "rock-chic",
    title: "Cazadora o Blazer Rock Chic con Botines",
    subtitle: "Pantalón de pinzas oscuro, prendas de punto fino o camiseta negra y calzado con personalidad.",
    score: "9 / 10",
    verdict: "Rollazo",
    mood: "love",
    imageUrl: "/images/sample_elegant_woman.jpg",
    lucasQuote: "Si alguien viene así a Veneno, le invito a la primera copa. Rollo indie club total.",
    josefinaQuote: "¡Me flipa! Queremos que cada uno venga a su rollo siendo 100% fiel a su estilo.",
    maximoQuote: "¡Ooooh... brrr! *[mueve los piececitos al ritmo y suelta un gritito de fiesta]*",
  },
  {
    id: "stiletto-gala",
    title: "Vestido de Gala Largo con Tacones de Aguja",
    subtitle: "Vestidos de alfombra roja muy ceñidos con tacones vertiginosos de aguja.",
    score: "4 / 10",
    verdict: "Con reservas",
    mood: "meh",
    imageUrl: "/images/gala_dress.jpg",
    lucasQuote: "Demasiado encorsetado para un cóctel de pie. Te vas a cansar antes de que empiece la música.",
    josefinaQuote: "Irás divina los primeros 20 minutos de fotos en Monforte. En Veneno a las 16:00 estarás pidiendo tiritas a gritos. ¡Mete zapatillas en el bolso sí o sí!",
    maximoQuote: "¡Mmmh? *[ladea la cabeza masticando la esquina de su babero con cara de duda]*",
  },
  {
    id: "chaque-rigido",
    title: "Chaqué Tradicional de Tres Piezas con Chistera",
    subtitle: "Chaleco rígido, corbata de nudo ancho y protocolo estricto de etiqueta clásica.",
    score: "0 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/tuxedo.jpg",
    lucasQuote: "¡Por favor, no! Esto es una boda civil y nos vamos directos a un bar a beber copas, no a la abadía de Westminster. Vas a pasar un calor infernal.",
    josefinaQuote: "Desentona totalmente con el concepto. Buscamos cercanía y naturalidad, ¡dejad el pingüino en el armario!",
    maximoQuote: "¡Gaaaa-bu! *[tira el sonajero al suelo y hace pucheros de agobio con el sombrero]*",
  },
  {
    id: "sport-chandal",
    title: "Chándal o Ropa Deportiva",
    subtitle: "Prendas puramente de gimnasio o indumentaria de playa.",
    score: "-5 / 10",
    verdict: "Veto",
    mood: "veto",
    imageUrl: "/images/sample_yellow_chic.jpg",
    lucasQuote: "A ver, tampoco nos pasemos de alternativos. Es nuestra boda, no un partido en la pista del barrio.",
    josefinaQuote: "Venid guapos y arreglados a vuestro propio estilo. El chándal lo guardamos para el domingo de descanso.",
    maximoQuote: "¡Pffft-baaah! *[hace una pedorreta con la lengua fuera y se gira indignado]*",
  },
];

/* Illustrated Avatar for Lucas */
const LucasAvatar: React.FC<{ mood: MoodType }> = ({ mood }) => {
  return (
    <motion.div
      animate={
        mood === "love"
          ? { y: [0, -5, 0] }
          : mood === "veto"
          ? { x: [-4, 4, -4, 4, 0] }
          : { rotate: [-2, 2, -2] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-500/10 to-transparent p-1 border border-[var(--card-border)] flex items-center justify-center shadow-md">
        <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-sm">
          <defs>
            <linearGradient id="lucasSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8D5BE" />
              <stop offset="100%" stopColor="#E5B99F" />
            </linearGradient>
            <linearGradient id="lucasHair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#36251E" />
              <stop offset="100%" stopColor="#221712" />
            </linearGradient>
          </defs>

          {/* Neck & T-shirt */}
          <path d="M48 92 L48 106 L72 106 L72 92 Z" fill="#E5B99F" />
          <path d="M30 114 C30 102 44 98 60 98 C76 98 90 102 90 114 Z" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1" />
          <path d="M48 98 C54 102 66 102 72 98" fill="none" stroke="#D4D4D8" strokeWidth="1" />

          {/* Ears */}
          <circle cx="34" cy="62" r="7" fill="#F8D5BE" />
          <circle cx="86" cy="62" r="7" fill="#F8D5BE" />

          {/* Head / Face */}
          <rect x="36" y="32" width="48" height="62" rx="24" fill="url(#lucasSkin)" />

          {/* Beard & Stubble around jawline & chin */}
          <path
            d="M36 60 C36 82 46 94 60 94 C74 94 84 82 84 60 C84 76 72 88 60 88 C48 88 36 76 36 60 Z"
            fill="#2C1E18"
            opacity="0.38"
          />

          {/* Mustache */}
          <path
            d="M48 74 C52 72 58 72 60 74 C62 72 68 72 72 74 C70 77 64 77 60 76 C56 77 50 77 48 74 Z"
            fill="#2C1E18"
          />

          {/* Hair - Short dark brown textured with fringe */}
          <path
            d="M34 46 C32 30 42 16 60 16 C78 16 88 30 86 46 C84 40 82 34 78 30 C72 32 64 28 54 30 C44 32 38 38 34 46 Z"
            fill="url(#lucasHair)"
          />
          <path d="M42 26 C48 24 54 27 58 29 C52 28 46 28 42 26 Z" fill="#4A342B" />

          {/* Eyebrows (Dynamic with mood) */}
          {mood === "love" && (
            <>
              <path d="M44 46 Q50 43 56 46" stroke="#221712" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M64 46 Q70 43 76 46" stroke="#221712" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}
          {mood === "meh" && (
            <>
              <path d="M44 47 L56 47" stroke="#221712" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M64 44 Q70 41 76 45" stroke="#221712" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}
          {mood === "veto" && (
            <>
              <path d="M44 48 L56 44" stroke="#221712" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M64 44 L76 48" stroke="#221712" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Eyes behind glasses */}
          {mood === "love" && (
            <>
              <circle cx="50" cy="54" r="3" fill="#221712" />
              <circle cx="49" cy="53" r="1" fill="#FFFFFF" />
              <circle cx="70" cy="54" r="3" fill="#221712" />
              <circle cx="69" cy="53" r="1" fill="#FFFFFF" />
            </>
          )}
          {mood === "meh" && (
            <>
              <circle cx="52" cy="54" r="2.8" fill="#221712" />
              <circle cx="72" cy="54" r="2.8" fill="#221712" />
            </>
          )}
          {mood === "veto" && (
            <>
              <circle cx="50" cy="54" r="4" fill="#221712" />
              <circle cx="48.5" cy="52.5" r="1.5" fill="#FFFFFF" />
              <circle cx="70" cy="54" r="4" fill="#221712" />
              <circle cx="68.5" cy="52.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Gold Wireframe Round Glasses (Signature!) */}
          <circle cx="50" cy="54" r="9.5" fill="rgba(255,255,255,0.18)" stroke="#D4AF37" strokeWidth="1.8" />
          <circle cx="70" cy="54" r="9.5" fill="rgba(255,255,255,0.18)" stroke="#D4AF37" strokeWidth="1.8" />
          <path d="M59.5 53 Q60 51 60.5 53" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
          <path d="M40.5 53 L34 51" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M79.5 53 L86 51" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M44 49 Q48 47 52 50" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Nose */}
          <path d="M59 58 L58 65 Q60 67 62 65" stroke="#D09E83" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Mouth (Dynamic with mood) */}
          {mood === "love" && (
            <path d="M52 80 Q60 86 68 80" stroke="#221712" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}
          {mood === "meh" && (
            <path d="M54 82 Q60 80 66 83" stroke="#221712" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}
          {mood === "veto" && (
            <ellipse cx="60" cy="82" rx="4" ry="5" fill="#221712" />
          )}
        </svg>
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1 tracking-wider">
        Lucas
      </span>
    </motion.div>
  );
};

/* Illustrated Avatar for Josefina */
const JosefinaAvatar: React.FC<{ mood: MoodType }> = ({ mood }) => {
  return (
    <motion.div
      animate={
        mood === "love"
          ? { y: [0, -5, 0] }
          : mood === "veto"
          ? { x: [-4, 4, -4, 4, 0] }
          : { rotate: [2, -2, 2] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-500/10 to-transparent p-1 border border-[var(--card-border)] flex items-center justify-center shadow-md">
        <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-sm">
          <defs>
            <linearGradient id="joseSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEE4D6" />
              <stop offset="100%" stopColor="#F5CAB3" />
            </linearGradient>
            <linearGradient id="joseHair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6C4128" />
              <stop offset="100%" stopColor="#4A2A17" />
            </linearGradient>
            <linearGradient id="joseHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9C623E" />
              <stop offset="100%" stopColor="#6C4128" />
            </linearGradient>
          </defs>

          {/* Back Hair Volume (cascading on shoulders) */}
          <path
            d="M26 50 C22 75 24 100 34 112 C36 100 38 88 40 76 M94 50 C98 75 96 100 86 112 C84 100 82 88 80 76"
            stroke="url(#joseHair)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          {/* Neck & Dress */}
          <path d="M50 88 L50 106 L70 106 L70 88 Z" fill="#F5CAB3" />
          <path d="M36 114 C36 102 46 98 60 98 C74 98 84 102 84 114 Z" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1" />
          <path d="M44 98 L42 114 M76 98 L78 114" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />

          {/* Ears & Earrings */}
          <circle cx="36" cy="62" r="5.5" fill="#FEE4D6" />
          <circle cx="84" cy="62" r="5.5" fill="#FEE4D6" />
          <circle cx="36" cy="65" r="1.5" fill="#D4AF37" />
          <circle cx="84" cy="65" r="1.5" fill="#D4AF37" />

          {/* Face */}
          <rect x="38" y="34" width="44" height="56" rx="22" fill="url(#joseSkin)" />

          {/* Rosy Cheeks */}
          <circle cx="45" cy="66" r="5" fill="#F8A798" opacity="0.45" />
          <circle cx="75" cy="66" r="5" fill="#F8A798" opacity="0.45" />

          {/* Front Hair Waves & Parting */}
          <path
            d="M32 46 C32 26 44 14 60 14 C76 14 88 26 88 46 C84 32 74 24 62 26 C48 24 38 32 32 46 Z"
            fill="url(#joseHair)"
          />
          <path
            d="M36 38 C32 50 30 68 34 84 C36 86 38 82 38 78 C34 66 36 52 40 42 Z"
            fill="url(#joseHighlight)"
          />
          <path
            d="M84 38 C88 50 90 68 86 84 C84 86 82 82 82 78 C86 66 84 52 80 42 Z"
            fill="url(#joseHighlight)"
          />

          {/* Eyebrows (Dynamic) */}
          {mood === "love" && (
            <>
              <path d="M44 46 Q50 42 56 46" stroke="#4A2A17" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M64 46 Q70 42 76 46" stroke="#4A2A17" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </>
          )}
          {mood === "meh" && (
            <>
              <path d="M44 47 L56 47" stroke="#4A2A17" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M64 43 Q70 40 76 45" stroke="#4A2A17" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </>
          )}
          {mood === "veto" && (
            <>
              <path d="M44 44 L56 47" stroke="#4A2A17" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M64 47 L76 44" stroke="#4A2A17" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Eyes (Warm hazel-brown) */}
          {mood === "love" && (
            <>
              <path d="M44 54 Q50 49 56 54" stroke="#361F10" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M43 52 L41 50 M57 52 L59 50" stroke="#361F10" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M64 54 Q70 49 76 54" stroke="#361F10" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M63 52 L61 50 M77 52 L79 50" stroke="#361F10" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="50" cy="56" r="1.5" fill="#D4AF37" />
              <circle cx="70" cy="56" r="1.5" fill="#D4AF37" />
            </>
          )}
          {mood === "meh" && (
            <>
              <path d="M44 54 L56 54 M44 52 L42 50" stroke="#361F10" strokeWidth="2" strokeLinecap="round" />
              <circle cx="70" cy="53" r="3.2" fill="#5A351C" />
              <circle cx="69" cy="52" r="1" fill="#FFFFFF" />
            </>
          )}
          {mood === "veto" && (
            <>
              <circle cx="50" cy="53" r="4" fill="#5A351C" />
              <circle cx="48.5" cy="51.5" r="1.5" fill="#FFFFFF" />
              <circle cx="70" cy="53" r="4" fill="#5A351C" />
              <circle cx="68.5" cy="51.5" r="1.5" fill="#FFFFFF" />
              <path d="M43 50 L41 48 M77 50 L79 48" stroke="#361F10" strokeWidth="1.2" />
            </>
          )}

          {/* Delicate Nose */}
          <path d="M59 56 L58 63 Q60 65 62 63" stroke="#DDA891" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Signature Radiant Smile */}
          {mood === "love" && (
            <g>
              <path d="M48 71 Q60 85 72 71 Z" fill="#D85C68" />
              <path d="M50 71 Q60 76 70 71 Z" fill="#FFFFFF" />
              <path d="M47 71 Q60 73 73 71" stroke="#BA4752" strokeWidth="1.5" fill="none" />
            </g>
          )}
          {mood === "meh" && (
            <path d="M52 74 Q60 72 68 76" stroke="#BA4752" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          )}
          {mood === "veto" && (
            <path d="M52 77 Q60 71 68 77" stroke="#BA4752" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          )}
        </svg>
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1 tracking-wider">
        Josefina
      </span>
    </motion.div>
  );
};

/* Illustrated Avatar for baby Máximo */
const MaximoAvatar: React.FC<{ mood: MoodType }> = ({ mood }) => {
  return (
    <motion.div
      animate={
        mood === "love"
          ? { y: [0, -6, 0], rotate: [0, -4, 4, 0] }
          : mood === "veto"
          ? { x: [-3, 3, -3, 3, 0] }
          : { rotate: [-5, 5, -5] }
      }
      transition={{ duration: mood === "veto" ? 0.35 : 2, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
      className="relative flex flex-col items-center shrink-0"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-500/10 to-transparent p-1 border border-[var(--card-border)] flex items-center justify-center shadow-md">
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-sm">
          <defs>
            <linearGradient id="maxSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEE9DC" />
              <stop offset="100%" stopColor="#F8D3BE" />
            </linearGradient>
            <linearGradient id="maxBib" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>
          </defs>

          {/* Baby Bib / Romper */}
          <path d="M28 78 L24 100 L76 100 L72 78 Z" fill="url(#maxBib)" />
          <path d="M40 76 Q50 82 60 76" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="88" r="2.5" fill="#FFFFFF" opacity="0.9" />

          {/* Baby Ears */}
          <circle cx="23" cy="52" r="6" fill="#FEE9DC" />
          <circle cx="23" cy="52" r="3.5" fill="#F8D3BE" />
          <circle cx="77" cy="52" r="6" fill="#FEE9DC" />
          <circle cx="77" cy="52" r="3.5" fill="#F8D3BE" />

          {/* Chubby Baby Head */}
          <ellipse cx="50" cy="50" rx="27" ry="26" fill="url(#maxSkin)" />

          {/* Baby Hair Tuft / Swirl */}
          <path
            d="M47 25 C45 18 52 14 55 18 C57 21 54 25 50 25"
            stroke="#6C4128"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Rosy Baby Cheeks */}
          <circle cx="34" cy="58" r="5.5" fill="#F43F5E" opacity="0.35" />
          <circle cx="66" cy="58" r="5.5" fill="#F43F5E" opacity="0.35" />

          {/* Eyebrows */}
          {mood === "love" && (
            <>
              <path d="M36 43 Q41 39 46 42" stroke="#6C4128" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M54 42 Q59 39 64 43" stroke="#6C4128" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </>
          )}
          {mood === "meh" && (
            <>
              <path d="M36 43 L46 43" stroke="#6C4128" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <path d="M54 41 Q59 38 64 43" stroke="#6C4128" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </>
          )}
          {mood === "veto" && (
            <>
              <path d="M36 41 L46 44" stroke="#6C4128" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M54 44 L64 41" stroke="#6C4128" strokeWidth="2" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Eyes */}
          {mood === "love" && (
            <>
              <circle cx="41" cy="49" r="4.2" fill="#221712" />
              <circle cx="39.5" cy="47.5" r="1.6" fill="#FFFFFF" />
              <circle cx="42.5" cy="50.5" r="0.8" fill="#FFFFFF" />
              <circle cx="59" cy="49" r="4.2" fill="#221712" />
              <circle cx="57.5" cy="47.5" r="1.6" fill="#FFFFFF" />
              <circle cx="60.5" cy="50.5" r="0.8" fill="#FFFFFF" />
            </>
          )}
          {mood === "meh" && (
            <>
              <circle cx="43" cy="49" r="3.8" fill="#221712" />
              <circle cx="42" cy="47.5" r="1.2" fill="#FFFFFF" />
              <circle cx="61" cy="49" r="3.8" fill="#221712" />
              <circle cx="60" cy="47.5" r="1.2" fill="#FFFFFF" />
            </>
          )}
          {mood === "veto" && (
            <>
              <path d="M37 49 Q41 53 45 49" stroke="#221712" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M55 49 Q59 53 63 49" stroke="#221712" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <ellipse cx="66" cy="55" rx="1.5" ry="2.2" fill="#38BDF8" />
            </>
          )}

          {/* Tiny Baby Button Nose */}
          <path d="M49 53 Q50 55 51 53" stroke="#E5B99F" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Mouth */}
          {mood === "love" && (
            <g>
              <path d="M42 61 Q50 72 58 61 Z" fill="#D85C68" />
              <rect x="47" y="65.5" width="2.5" height="2" rx="0.5" fill="#FFFFFF" />
              <rect x="50.5" y="65.5" width="2.5" height="2" rx="0.5" fill="#FFFFFF" />
              <path d="M41 61 Q50 63 59 61" stroke="#BA4752" strokeWidth="1.5" fill="none" />
            </g>
          )}
          {mood === "meh" && (
            <circle cx="50" cy="63" r="3" fill="#D85C68" stroke="#BA4752" strokeWidth="1.2" />
          )}
          {mood === "veto" && (
            <path d="M43 65 Q50 59 57 65" stroke="#BA4752" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          )}
        </svg>
      </div>
      <span className="font-mono-swiss text-[11px] font-semibold text-[var(--accent-gold)] mt-1 tracking-wider">
        Máximo
      </span>
    </motion.div>
  );
};

export const DressCodeInspector: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentOutfit = OUTFITS[currentIndex];

  const nextOutfit = () => {
    setCurrentIndex((prev) => (prev + 1) % OUTFITS.length);
  };

  const prevOutfit = () => {
    setCurrentIndex((prev) => (prev - 1 + OUTFITS.length) % OUTFITS.length);
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center space-y-1 mb-8">
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          Dress Code
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Arreglado pero a tu rollo. Pasa los ejemplos reales para escuchar lo que opinan los novios y el peque:
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="theme-card rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOutfit.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Top Bar: Look Counter & Verdict Badge (Cleanly outside the photo) */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--card-border)]">
              <span className="font-mono-swiss text-[11px] uppercase tracking-widest text-[var(--fg-muted)]">
                Look {currentIndex + 1} de {OUTFITS.length}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-swiss text-xs font-semibold border ${
                  currentOutfit.mood === "love"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : currentOutfit.mood === "meh"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {currentOutfit.mood === "love" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {currentOutfit.mood === "meh" && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                {currentOutfit.mood === "veto" && <XCircle className="w-3.5 h-3.5 text-red-400" />}
                <span>{currentOutfit.score} • {currentOutfit.verdict}</span>
              </span>
            </div>

            {/* Top Grid: Real Photo (Pristine, no overlay cutting it) & Info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Left Column: Real Outfit Photo */}
              <div className="sm:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-md group bg-black/5 dark:bg-white/5">
                <Image
                  src={currentOutfit.imageUrl}
                  alt={currentOutfit.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Right Column: Title and Subtitle */}
              <div className="sm:col-span-7 space-y-2.5 text-left">
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-snug">
                  {currentOutfit.title}
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed font-light">
                  {currentOutfit.subtitle}
                </p>
              </div>
            </div>

            {/* LIVE CONVERSATION BETWEEN AVATARS */}
            <div className="pt-4 border-t border-[var(--card-border)] space-y-3">
              <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-[var(--fg-muted)] block text-left">
                Conversación en directo
              </span>

              {/* Conversation Box */}
              <div className="space-y-3">
                {/* 1. Lucas's Speech Bubble (Turns left -> right) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <LucasAvatar mood={currentOutfit.mood} />

                  <div className="relative flex-1 p-3.5 sm:p-4 rounded-2xl rounded-tl-sm bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--card-border)] text-left shadow-sm">
                    {/* Speech bubble pointer */}
                    <div className="absolute -left-1.5 top-4 w-3 h-3 bg-black/[0.03] dark:bg-[#1a1a1e] border-l border-t border-[var(--card-border)] rotate-[-45deg]" />
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.lucasQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* 2. Josefina's Speech Bubble (Replies right -> left) */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="flex items-start gap-3 sm:gap-4 flex-row-reverse"
                >
                  <JosefinaAvatar mood={currentOutfit.mood} />

                  <div className="relative flex-1 p-3.5 sm:p-4 rounded-2xl rounded-tr-sm bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--card-border)] text-left shadow-sm">
                    {/* Speech bubble pointer */}
                    <div className="absolute -right-1.5 top-4 w-3 h-3 bg-black/[0.03] dark:bg-[#1a1a1e] border-r border-t border-[var(--card-border)] rotate-[45deg]" />
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.josefinaQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* 3. Máximo's Speech Bubble (Baby joins in!) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.22 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <MaximoAvatar mood={currentOutfit.mood} />

                  <div className="relative flex-1 p-3.5 sm:p-4 rounded-2xl rounded-tl-sm bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--accent-gold)]/30 text-left shadow-sm">
                    {/* Speech bubble pointer */}
                    <div className="absolute -left-1.5 top-4 w-3 h-3 bg-black/[0.03] dark:bg-[#1a1a1e] border-l border-t border-[var(--accent-gold)]/30 rotate-[-45deg]" />
                    <span className="font-mono-swiss text-[10px] text-[var(--accent-gold)] font-semibold uppercase tracking-wider block mb-1">
                      El veredicto de Máximo:
                    </span>
                    <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/90 font-light leading-relaxed italic">
                      &ldquo;{currentOutfit.maximoQuote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Footer */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-[var(--card-border)]">
          <button
            onClick={prevOutfit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-mono-swiss text-[var(--fg-primary)] transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {OUTFITS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 bg-[var(--accent-gold)]"
                    : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                }`}
                aria-label={`Ver estilo ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextOutfit}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--fg-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-gold)] hover:text-black text-xs font-mono-swiss font-medium transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span>Siguiente Look</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
