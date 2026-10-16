"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Music2, 
  Utensils, 
  Ticket, 
  HeartHandshake, 
  Share2, 
  Download,
  Copy,
  Check
} from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

interface RSVPFormData {
  name: string;
  phone: string;
  attendance: "yes" | "no" | "";
  companion: string;
  dietary: string[];
  otherDietary: string;
  guestRole: string;
  songTitle: string;
  songArtist: string;
  message: string;
}

const DIETARY_OPTIONS = [
  "Como de todo (cero restricciones)",
  "Vegetariano / Vegano",
  "Celíaco / Sin Gluten",
  "Intolerante a la Lactosa",
  "Alérgico al Marisco",
  "Alérgico a Frutos Secos",
];

const GUEST_ROLES = [
  {
    id: "coctel",
    emoji: "🍸",
    title: "Estratega del Cóctel",
    desc: "Primero en catar cada ronda en Veneno",
  },
  {
    id: "pista",
    emoji: "🕺",
    title: "Rey / Reina de la Pista",
    desc: "Inaugurará el tardeo con pasos legendarios",
  },
  {
    id: "canapes",
    emoji: "🥐",
    title: "Crítico de Canapés",
    desc: "Evaluador riguroso de cada bocado gourmet",
  },
  {
    id: "lloron",
    emoji: "🥹",
    title: "Llorón/a en la Ceremonia",
    desc: "Kleenex en mano en los jardines de Monforte",
  },
  {
    id: "conductor",
    emoji: "🚗",
    title: "Conductor/a Designado",
    desc: "Héroe sobrio y guardián de las llaves",
  },
  {
    id: "paparazzi",
    emoji: "📸",
    title: "Paparazzi Indiscreto",
    desc: "Cazador de los mejores momentos y fotos",
  },
];

export const RSVPWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { playClick, playSoftPop, playSelect, playSuccess, playCardFlip } = useSoundEffects();

  const [form, setForm] = useState<RSVPFormData>({
    name: "",
    phone: "",
    attendance: "",
    companion: "",
    dietary: ["Como de todo (cero restricciones)"],
    otherDietary: "",
    guestRole: "Estratega del Cóctel",
    songTitle: "",
    songArtist: "",
    message: "",
  });

  const nextStep = () => {
    playCardFlip();
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    playClick();
    setStep((prev) => prev - 1);
  };

  const toggleDietary = (item: string) => {
    playSoftPop();
    if (item === "Como de todo (cero restricciones)") {
      setForm((prev) => ({ ...prev, dietary: [item] }));
      return;
    }

    setForm((prev) => {
      const filtered = prev.dietary.filter((d) => d !== "Como de todo (cero restricciones)");
      if (filtered.includes(item)) {
        const next = filtered.filter((d) => d !== item);
        return {
          ...prev,
          dietary: next.length > 0 ? next : ["Como de todo (cero restricciones)"],
        };
      } else {
        return { ...prev, dietary: [...filtered, item] };
      }
    });
  };

  const handleRoleSelect = (roleTitle: string) => {
    playSelect();
    setForm((prev) => ({ ...prev, guestRole: roleTitle }));
  };

  const triggerConfetti = () => {
    // Elegant gold and white dual confetti cannons
    const end = Date.now() + 1500;
    const colors = ["#dfb15b", "#ffffff", "#e8c37d", "#18181b"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playClick();

    // Emulate smooth network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      playSuccess();
      triggerConfetti();
    }, 700);
  };

  const sharePass = () => {
    playClick();
    const text = `¡Confirmado! Voy a la boda de Lucas & Josefina el 06.02.2027 en Valencia con el rol honorario de "${form.guestRole}".`;
    if (navigator.share) {
      navigator.share({
        title: "Pase Oficial • Boda Lucas & Josefina",
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="rsvp-section" className="relative w-full max-w-2xl mx-auto py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-swiss text-[#dfb15b] uppercase tracking-widest">
          <Ticket className="w-3.5 h-3.5" />
          <span>CONFIRMACIÓN DE ASISTENCIA</span>
        </div>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-white italic">
          RSVP & Pase de Invitado
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Confirma tu asistencia antes del 15 de diciembre para que en Monforte y Veneno esté todo a punto.
        </p>
      </div>

      {/* Step Tracker Indicator */}
      {!isCompleted && (
        <div className="flex items-center justify-between mb-6 px-3">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-swiss text-xs transition-all ${
                  step === s
                    ? "bg-[#dfb15b] text-black font-bold ring-4 ring-[#dfb15b]/20"
                    : step > s
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-zinc-500 border border-white/10"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 4 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${
                    step > s ? "bg-[#dfb15b]" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Form Box */}
      <div className="relative rounded-3xl border border-white/10 bg-zinc-950/80 p-5 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {/* COMPLETED PASS VIEW */}
          {isCompleted ? (
            <motion.div
              key="completed"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="space-y-6 text-center py-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center mx-auto text-[#dfb15b]">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <span className="font-mono-swiss text-[11px] text-[#dfb15b] uppercase tracking-widest">
                  CONFIRMACIÓN REGISTRADA CON ÉXITO
                </span>
                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-white italic mt-1">
                  ¡Nos vemos en Valencia!
                </h3>
              </div>

              {/* Digital Guest Pass Card */}
              <div className="relative mx-auto max-w-sm rounded-2xl border border-white/20 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 text-left shadow-2xl overflow-hidden">
                {/* Golden top accent strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#dfb15b] via-amber-200 to-[#dfb15b]" />
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono-swiss text-[9px] uppercase tracking-widest text-zinc-400">
                      PASE OFICIAL // ENTRADA VIP
                    </span>
                    <h4 className="font-serif-editorial text-2xl text-white italic">
                      Lucas & Josefina
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-swiss text-[11px] text-[#dfb15b] font-bold">
                      06.02.2027
                    </span>
                    <div className="font-mono-swiss text-[9px] text-zinc-500">13:00 H</div>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  <div>
                    <span className="font-mono-swiss text-[9px] uppercase text-zinc-500">Invitado:</span>
                    <p className="font-sans-ui text-base font-semibold text-white tracking-wide">
                      {form.name || "Invitado Especial"}
                    </p>
                    {form.companion && (
                      <p className="font-sans-ui text-xs text-zinc-400">+ {form.companion}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                    <div>
                      <span className="font-mono-swiss text-[9px] uppercase text-zinc-500">Rol Honorario:</span>
                      <p className="font-mono-swiss text-xs text-[#dfb15b] font-medium">
                        {form.guestRole}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono-swiss text-[9px] uppercase text-zinc-500">Itinerario:</span>
                      <p className="font-mono-swiss text-xs text-zinc-300">
                        Monforte ➔ Veneno
                      </p>
                    </div>
                  </div>

                  {form.songTitle && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="font-mono-swiss text-[9px] uppercase text-zinc-500">Tema Solicitado:</span>
                      <p className="font-mono-swiss text-xs text-zinc-300 truncate">
                        ♫ {form.songTitle} {form.songArtist ? `- ${form.songArtist}` : ""}
                      </p>
                    </div>
                  )}
                </div>

                {/* Swiss barcode simulation */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1 h-6">
                    {[1, 3, 2, 4, 1, 3, 5, 2, 1, 4, 2, 3, 1, 4].map((w, idx) => (
                      <span
                        key={idx}
                        className="h-full bg-zinc-400"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono-swiss text-[9px] text-zinc-500 tracking-widest">
                    VLC-2027-OK
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={sharePass}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#dfb15b] text-black font-sans-ui text-xs font-semibold hover:bg-[#e8c37d] transition-all flex items-center justify-center gap-2"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copiado al portapapeles" : "Compartir pase"}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* STEP 1: Name & Attendance */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="border-b border-white/10 pb-3">
                    <span className="font-mono-swiss text-[10px] uppercase text-[#dfb15b]">
                      PASO 01 // DATOS BÁSICOS
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white italic">
                      ¿Nos acompañas el 6 de febrero?
                    </h3>
                  </div>

                  {/* Attendance choice */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        playSelect();
                        setForm((prev) => ({ ...prev, attendance: "yes" }));
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        form.attendance === "yes"
                          ? "border-[#dfb15b] bg-[#dfb15b]/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      <CheckCircle2 className={`w-5 h-5 mb-2 ${form.attendance === "yes" ? "text-[#dfb15b]" : "text-zinc-500"}`} />
                      <div className="font-sans-ui text-sm font-semibold text-white">¡Allí estaré!</div>
                      <div className="font-sans-ui text-[11px] text-zinc-400 mt-0.5">Listo para celebrar</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setForm((prev) => ({ ...prev, attendance: "no" }));
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        form.attendance === "no"
                          ? "border-red-500/60 bg-red-500/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      <XCircle className={`w-5 h-5 mb-2 ${form.attendance === "no" ? "text-red-400" : "text-zinc-500"}`} />
                      <div className="font-sans-ui text-sm font-semibold text-white">No podré ir</div>
                      <div className="font-sans-ui text-[11px] text-zinc-400 mt-0.5">Brindaré a la distancia</div>
                    </button>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block font-mono-swiss text-[11px] uppercase tracking-wider text-zinc-300">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ej. Lucas García o Josefina Gómez"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-[#dfb15b] focus:outline-none focus:ring-1 focus:ring-[#dfb15b]"
                    />
                  </div>

                  {/* Companion field (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block font-mono-swiss text-[11px] uppercase tracking-wider text-zinc-300">
                      Acompañante (+1) (opcional)
                    </label>
                    <input
                      type="text"
                      value={form.companion}
                      onChange={(e) => setForm({ ...form, companion: e.target.value })}
                      placeholder="Nombre de tu acompañante si aplica"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-[#dfb15b] focus:outline-none"
                    />
                  </div>

                  {/* Step 1 Actions */}
                  <div className="pt-3">
                    <button
                      type="button"
                      disabled={!form.name || !form.attendance}
                      onClick={() => {
                        if (form.attendance === "no") {
                          // Directly submit if not attending
                          handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                        } else {
                          nextStep();
                        }
                      }}
                      className="w-full py-3.5 rounded-xl bg-white text-black font-sans-ui text-sm font-semibold hover:bg-[#dfb15b] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                    >
                      <span>{form.attendance === "no" ? "Enviar respuesta" : "Siguiente paso"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Dietary requirements */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="border-b border-white/10 pb-3">
                    <span className="font-mono-swiss text-[10px] uppercase text-[#dfb15b]">
                      PASO 02 // ALÉRGENOS & DIETA
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white italic">
                      ¿Tienes alguna intolerancia o preferencia?
                    </h3>
                    <p className="font-sans-ui text-xs text-zinc-400 mt-1">
                      El cóctel largo contará con múltiples pases adaptados para que todo el mundo coma increíble.
                    </p>
                  </div>

                  {/* Interactive Chip Selectors */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {DIETARY_OPTIONS.map((option) => {
                      const isSelected = form.dietary.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleDietary(option)}
                          className={`px-3 py-2 rounded-xl text-xs font-mono-swiss transition-all text-left flex items-center gap-2 ${
                            isSelected
                              ? "bg-[#dfb15b] text-black font-medium shadow-md shadow-[#dfb15b]/20"
                              : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          <Utensils className="w-3 h-3 opacity-70" />
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Specific other text */}
                  <div className="space-y-1.5 pt-2">
                    <label className="block font-mono-swiss text-[11px] uppercase tracking-wider text-zinc-300">
                      Otras alergias o detalles específicos:
                    </label>
                    <input
                      type="text"
                      value={form.otherDietary}
                      onChange={(e) => setForm({ ...form, otherDietary: e.target.value })}
                      placeholder="Ej. Alergia severa al sésamo o melocotón..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#dfb15b] focus:outline-none"
                    />
                  </div>

                  {/* Step 2 Actions */}
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 font-sans-ui text-sm flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 py-3.5 rounded-xl bg-white text-black font-sans-ui text-sm font-semibold hover:bg-[#dfb15b] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Elegir rol honorario</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Guest Role Selector (Gamified Flagship Feature) */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="border-b border-white/10 pb-3">
                    <span className="font-mono-swiss text-[10px] uppercase text-[#dfb15b]">
                      PASO 03 // ELIGE TU ROL DE INVITADO
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white italic">
                      ¿Cuál será tu misión oficial en la boda?
                    </h3>
                    <p className="font-sans-ui text-xs text-zinc-400 mt-1">
                      Aparecerá impreso en tu pase digital de acceso a Veneno.
                    </p>
                  </div>

                  {/* 6 Gamified Role Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {GUEST_ROLES.map((role) => {
                      const isSelected = form.guestRole === role.title;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleRoleSelect(role.title)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#dfb15b] bg-[#dfb15b]/10 ring-1 ring-[#dfb15b]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{role.emoji}</span>
                            <span className="font-sans-ui text-xs sm:text-sm font-medium text-white">
                              {role.title}
                            </span>
                          </div>
                          <p className="font-sans-ui text-[11px] text-zinc-400 mt-1 pl-7">
                            {role.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Step 3 Actions */}
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 font-sans-ui text-sm flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 py-3.5 rounded-xl bg-white text-black font-sans-ui text-sm font-semibold hover:bg-[#dfb15b] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Siguiente: Música & Nota</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Song Recommendation & Notes */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="border-b border-white/10 pb-3">
                    <span className="font-mono-swiss text-[10px] uppercase text-[#dfb15b]">
                      PASO 04 // MÚSICA & MENSAJE
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white italic">
                      El temazo que no puede faltar en Veneno
                    </h3>
                  </div>

                  {/* Music recommendation fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono-swiss text-[10px] uppercase text-zinc-400">
                        Canción
                      </label>
                      <input
                        type="text"
                        value={form.songTitle}
                        onChange={(e) => setForm({ ...form, songTitle: e.target.value })}
                        placeholder="Ej. One More Time"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#dfb15b] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono-swiss text-[10px] uppercase text-zinc-400">
                        Artista
                      </label>
                      <input
                        type="text"
                        value={form.songArtist}
                        onChange={(e) => setForm({ ...form, songArtist: e.target.value })}
                        placeholder="Ej. Daft Punk"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#dfb15b] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Instant Vinyl Preview badge */}
                  {form.songTitle && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10"
                    >
                      <div className="w-7 h-7 rounded-full bg-zinc-800 border border-[#dfb15b]/40 flex items-center justify-center animate-spin [animation-duration:4s]">
                        <Music2 className="w-3.5 h-3.5 text-[#dfb15b]" />
                      </div>
                      <div className="font-mono-swiss text-xs text-zinc-300 truncate">
                        <span className="text-white font-medium">{form.songTitle}</span>{" "}
                        {form.songArtist && <span className="text-zinc-500">• {form.songArtist}</span>}
                      </div>
                    </motion.div>
                  )}

                  {/* Message for couple */}
                  <div className="space-y-1">
                    <label className="block font-mono-swiss text-[10px] uppercase text-zinc-400">
                      Unas palabras para Lucas & Josefina (opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Déjales un mensaje o amenaza cariñosa para el 6 de febrero..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#dfb15b] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit Final Action */}
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 font-sans-ui text-sm flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 rounded-xl bg-[#dfb15b] text-black font-sans-ui text-sm font-semibold hover:bg-[#e8c37d] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#dfb15b]/20"
                    >
                      {isSubmitting ? (
                        <span>Generando tu pase...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-black" />
                          <span>Finalizar y Obtener Pase</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
