"use client";

import React, { useState, useRef } from "react";
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
  Share2, 
  Check,
  Download,
  Calendar,
  Sparkle
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
  const [direction, setDirection] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);

  const { theme } = useTheme();

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
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const toggleDietary = (item: string) => {
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
    setForm((prev) => ({ ...prev, guestRole: roleTitle }));
  };

  const triggerConfetti = () => {
    const end = Date.now() + 1400;
    const colors = theme === "warm" 
      ? ["#c28835", "#b45309", "#faf8f5", "#1c1917"] 
      : ["#dfb15b", "#ffffff", "#e8c37d", "#18181b"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
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

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      triggerConfetti();
    }, 600);
  };

  // Generate high-resolution Concert/Festival VIP Pass PNG
  const downloadTicketAsImage = () => {
    setIsDownloadingImage(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1600;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dark festival background
      ctx.fillStyle = "#0c0c0e";
      ctx.fillRect(0, 0, 1200, 1600);

      // Card boundary
      ctx.fillStyle = "#16161a";
      ctx.roundRect(80, 80, 1040, 1440, 36);
      ctx.fill();

      ctx.strokeStyle = "rgba(223, 177, 91, 0.4)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Top golden festival holographic bar
      const grad = ctx.createLinearGradient(80, 80, 1120, 180);
      grad.addColorStop(0, "#c28835");
      grad.addColorStop(0.5, "#dfb15b");
      grad.addColorStop(1, "#c28835");
      ctx.fillStyle = grad;
      ctx.fillRect(80, 80, 1040, 24);

      // Festival Title
      ctx.fillStyle = "#dfb15b";
      ctx.font = "bold 28px monospace";
      ctx.fillText("FESTIVAL ACCESS PASS // ALL AREAS", 140, 170);

      ctx.fillStyle = "#ffffff";
      ctx.font = 'italic 86px "Instrument Serif", Georgia, serif';
      ctx.fillText("Lucas & Josefina", 140, 270);

      ctx.fillStyle = "#a1a1aa";
      ctx.font = "28px monospace";
      ctx.fillText("VALENCIA • 06 DE FEBRERO DE 2027", 140, 325);

      // Route
      ctx.fillStyle = "#27272a";
      ctx.roundRect(140, 370, 920, 120, 18);
      ctx.fill();

      ctx.fillStyle = "#dfb15b";
      ctx.font = "bold 26px monospace";
      ctx.fillText("ITINERARIO OFICIAL:", 170, 420);
      ctx.fillStyle = "#f4f4f5";
      ctx.font = "26px sans-serif";
      ctx.fillText("13:00 H Monforte (Ceremonia) ➔ 14:45 H Veneno (Cóctel Largo)", 170, 460);

      // Guest Details Section
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "24px monospace";
      ctx.fillText("TITULAR DEL PASE:", 140, 560);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 52px sans-serif";
      ctx.fillText(form.name || "Invitado Especial", 140, 630);

      if (form.companion) {
        ctx.fillStyle = "#a1a1aa";
        ctx.font = "28px sans-serif";
        ctx.fillText(`+ Acompañante: ${form.companion}`, 140, 680);
      }

      // Role Box
      ctx.fillStyle = "rgba(223, 177, 91, 0.12)";
      ctx.strokeStyle = "rgba(223, 177, 91, 0.4)";
      ctx.lineWidth = 2;
      ctx.roundRect(140, 730, 920, 150, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#dfb15b";
      ctx.font = "24px monospace";
      ctx.fillText("ROL HONORARIO ASIGNADO:", 170, 780);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px sans-serif";
      ctx.fillText(form.guestRole, 170, 840);

      // Song
      if (form.songTitle) {
        ctx.fillStyle = "#a1a1aa";
        ctx.font = "24px monospace";
        ctx.fillText("HIMNO DE LA NOCHE:", 140, 950);
        ctx.fillStyle = "#f4f4f5";
        ctx.font = "italic 32px sans-serif";
        ctx.fillText(`♫ ${form.songTitle} ${form.songArtist ? `- ${form.songArtist}` : ""}`, 140, 1000);
      }

      // Barcode simulation
      ctx.fillStyle = "#ffffff";
      const startX = 140;
      const barY = 1200;
      const bars = [4, 8, 3, 12, 6, 14, 4, 8, 12, 6, 14, 8, 4, 16, 6, 8, 12, 4, 8, 16, 8, 4, 12, 8, 4, 14, 8];
      let currX = startX;
      bars.forEach((w) => {
        ctx.fillRect(currX, barY, w, 110);
        currX += w + 8;
      });

      ctx.fillStyle = "#71717a";
      ctx.font = "24px monospace";
      ctx.fillText("VLC-2027-OK-MONFORTE-VENENO // NO PROTOCOLS", 140, 1360);

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `pase-boda-${(form.name || "invitado").toLowerCase().replace(/\s+/g, "-")}.png`;
      a.click();
    } catch {
      // fallback
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const addToGoogleCalendar = () => {
    const title = encodeURIComponent("Boda Lucas & Josefina");
    const details = encodeURIComponent(
      `Pase de invitado para ${form.name || "Invitado"} (${form.guestRole}). Ceremonia civil en Palacios de Monforte (13:00) y cóctel largo en Veneno.`
    );
    const location = encodeURIComponent("Jardines de Monforte & Veneno, Valencia");
    const dates = "20270206T120000Z/20270206T230000Z";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sharePass = () => {
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

  // Directional step variants
  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section id="rsvp-section" className="relative w-full max-w-2xl mx-auto py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic transition-colors">
          Confirmación de asistencia
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Por favor, confírmanos antes del 15 de diciembre para tener todo listo.
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
                    ? "bg-[var(--accent-gold)] text-black font-bold ring-4 ring-[var(--accent-gold)]/20"
                    : step > s
                    ? "bg-black/20 dark:bg-white/20 text-[var(--fg-primary)]"
                    : "bg-black/5 dark:bg-white/5 text-[var(--fg-muted)] border border-[var(--card-border)]"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 4 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${
                    step > s ? "bg-[var(--accent-gold)]" : "bg-black/10 dark:bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Form Box */}
      <div className="theme-card relative rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden transition-all duration-300">
        <AnimatePresence mode="wait" custom={direction}>
          {/* COMPLETED: Festival / Concert VIP Access Pass */}
          {isCompleted ? (
            <motion.div
              key="completed"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="space-y-6 text-center py-2"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 flex items-center justify-center mx-auto text-[var(--accent-gold)]">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <span className="font-mono-swiss text-[11px] text-[var(--accent-gold)] uppercase tracking-widest font-semibold">
                  CONFIRMACIÓN REGISTRADA
                </span>
                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--fg-primary)] italic mt-1">
                  ¡Nos vemos en Valencia!
                </h3>
              </div>

              {/* FESTIVAL / CONCERT TICKET PASS */}
              <div className="relative mx-auto max-w-md rounded-2xl border border-[var(--card-border)] bg-gradient-to-b from-[#18181b] to-[#101013] text-white p-6 text-left shadow-2xl overflow-hidden">
                {/* Semicircular Ticket Notches on edges */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--bg-primary)] border-r border-[var(--card-border)]" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--bg-primary)] border-l border-[var(--card-border)]" />

                {/* Holographic metallic header strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--accent-gold)] via-amber-300 to-[var(--accent-gold)]" />

                {/* Top header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div>
                    <span className="font-mono-swiss text-[9px] uppercase tracking-widest text-[#dfb15b] font-semibold">
                      PASE OFICIAL DE ACCESO
                    </span>
                    <h4 className="font-serif-editorial text-2xl text-white italic">
                      Lucas & Josefina
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-swiss text-[11px] text-[#dfb15b] font-bold">
                      06.02.2027
                    </span>
                    <div className="font-mono-swiss text-[9px] text-zinc-400">13:00 H</div>
                  </div>
                </div>

                {/* Main Guest Pass Content */}
                <div className="py-2 space-y-3">
                  <div>
                    <span className="font-mono-swiss text-[9px] uppercase text-zinc-400">Titular del Pase:</span>
                    <p className="font-sans-ui text-base font-semibold text-white tracking-wide">
                      {form.name || "Invitado Especial"}
                    </p>
                    {form.companion && (
                      <p className="font-sans-ui text-xs text-zinc-400">+ {form.companion}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <div>
                      <span className="font-mono-swiss text-[9px] uppercase text-zinc-400">Rol Honorario:</span>
                      <p className="font-mono-swiss text-xs text-[#dfb15b] font-semibold">
                        {form.guestRole}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono-swiss text-[9px] uppercase text-zinc-400">Acceso:</span>
                      <p className="font-mono-swiss text-xs text-zinc-300">
                        Monforte ➔ Veneno
                      </p>
                    </div>
                  </div>

                  {form.songTitle && (
                    <div className="pt-2 border-t border-white/10">
                      <span className="font-mono-swiss text-[9px] uppercase text-zinc-400">Petición Musical:</span>
                      <p className="font-mono-swiss text-xs text-zinc-300 truncate">
                        ♫ {form.songTitle} {form.songArtist ? `- ${form.songArtist}` : ""}
                      </p>
                    </div>
                  )}
                </div>

                {/* Swiss concert barcode & perforation line */}
                <div className="pt-3 border-t border-dashed border-white/20 flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 h-6">
                    {[1, 3, 2, 4, 1, 3, 5, 2, 1, 4, 2, 3, 1, 4, 2, 3].map((w, idx) => (
                      <span
                        key={idx}
                        className="h-full bg-zinc-400"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono-swiss text-[9px] text-zinc-400 tracking-widest font-mono">
                    VLC-2027-VIP-PASS
                  </span>
                </div>
              </div>

              {/* Action buttons on completed ticket */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                <button
                  onClick={downloadTicketAsImage}
                  disabled={isDownloadingImage}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[var(--accent-gold)] text-black font-sans-ui text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloadingImage ? "Guardando..." : "Descargar Pase (PNG)"}</span>
                </button>

                <button
                  onClick={addToGoogleCalendar}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full glass-pill hover:opacity-90 text-xs font-mono-swiss flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Guardar en Calendario</span>
                </button>

                <button
                  onClick={sharePass}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full glass-pill hover:opacity-90 text-xs font-mono-swiss flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copiado" : "Compartir"}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* STEP 1: Name & Attendance */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <div className="border-b border-[var(--card-border)] pb-3">
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                      ¿Nos acompañas el 6 de febrero?
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, attendance: "yes" }));
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        form.attendance === "yes"
                          ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 text-[var(--fg-primary)]"
                          : "border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.02] text-[var(--fg-muted)] hover:border-[var(--card-border-hover)]"
                      }`}
                    >
                      <CheckCircle2 className={`w-5 h-5 mb-2 ${form.attendance === "yes" ? "text-[var(--accent-gold)]" : "text-[var(--fg-muted)]"}`} />
                      <div className="font-sans-ui text-sm font-semibold text-[var(--fg-primary)]">¡Allí estaré!</div>
                      <div className="font-sans-ui text-[11px] text-[var(--fg-muted)] mt-0.5">Listo para celebrar</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, attendance: "no" }));
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        form.attendance === "no"
                          ? "border-red-500/60 bg-red-500/10 text-[var(--fg-primary)]"
                          : "border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.02] text-[var(--fg-muted)] hover:border-[var(--card-border-hover)]"
                      }`}
                    >
                      <XCircle className={`w-5 h-5 mb-2 ${form.attendance === "no" ? "text-red-400" : "text-[var(--fg-muted)]"}`} />
                      <div className="font-sans-ui text-sm font-semibold text-[var(--fg-primary)]">No podré ir</div>
                      <div className="font-sans-ui text-[11px] text-[var(--fg-muted)] mt-0.5">Brindaré a la distancia</div>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono-swiss text-[11px] uppercase tracking-wider text-[var(--fg-primary)]">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ej. Lucas García o Josefina Gómez"
                      className="w-full rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:border-[var(--accent-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono-swiss text-[11px] uppercase tracking-wider text-[var(--fg-primary)]">
                      Acompañante (+1) (opcional)
                    </label>
                    <input
                      type="text"
                      value={form.companion}
                      onChange={(e) => setForm({ ...form, companion: e.target.value })}
                      placeholder="Nombre de tu acompañante si aplica"
                      className="w-full rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      disabled={!form.name || !form.attendance}
                      onClick={() => {
                        if (form.attendance === "no") {
                          handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                        } else {
                          nextStep();
                        }
                      }}
                      className="w-full py-3.5 rounded-xl bg-[var(--fg-primary)] text-[var(--bg-primary)] font-sans-ui text-sm font-semibold hover:bg-[var(--accent-gold)] hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <div className="border-b border-[var(--card-border)] pb-3">
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                      ¿Tienes alguna intolerancia o preferencia?
                    </h3>
                    <p className="font-sans-ui text-xs text-[var(--fg-muted)] mt-1">
                      El cóctel contará con opciones adaptadas para que disfrutes al máximo.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {DIETARY_OPTIONS.map((option) => {
                      const isSelected = form.dietary.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleDietary(option)}
                          className={`px-3 py-2 rounded-xl text-xs font-mono-swiss transition-all text-left flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? "bg-[var(--accent-gold)] text-black font-semibold shadow-md"
                              : "glass-pill hover:opacity-80"
                          }`}
                        >
                          <Utensils className="w-3 h-3 opacity-70" />
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="block font-mono-swiss text-[11px] uppercase tracking-wider text-[var(--fg-primary)]">
                      Otras alergias o detalles específicos:
                    </label>
                    <input
                      type="text"
                      value={form.otherDietary}
                      onChange={(e) => setForm({ ...form, otherDietary: e.target.value })}
                      placeholder="Ej. Alergia al sésamo o marisco..."
                      className="w-full rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/5 px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 rounded-xl border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--fg-primary)] font-sans-ui text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 py-3.5 rounded-xl bg-[var(--fg-primary)] text-[var(--bg-primary)] font-sans-ui text-sm font-semibold hover:bg-[var(--accent-gold)] hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Elegir rol honorario</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Guest Role Selector */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <div className="border-b border-[var(--card-border)] pb-3">
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                      Elige tu rol honorario
                    </h3>
                    <p className="font-sans-ui text-xs text-[var(--fg-muted)] mt-1">
                      Aparecerá en tu pase digital personalizado.
                    </p>
                  </div>

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
                              ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/15 ring-1 ring-[var(--accent-gold)]"
                              : "border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.02] hover:border-[var(--card-border-hover)]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{role.emoji}</span>
                            <span className="font-sans-ui text-xs sm:text-sm font-medium text-[var(--fg-primary)]">
                              {role.title}
                            </span>
                          </div>
                          <p className="font-sans-ui text-[11px] text-[var(--fg-muted)] mt-1 pl-7">
                            {role.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 rounded-xl border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--fg-primary)] font-sans-ui text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 py-3.5 rounded-xl bg-[var(--fg-primary)] text-[var(--bg-primary)] font-sans-ui text-sm font-semibold hover:bg-[var(--accent-gold)] hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <div className="border-b border-[var(--card-border)] pb-3">
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic">
                      El temazo que no puede faltar
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono-swiss text-[10px] uppercase text-[var(--fg-muted)]">
                        Canción
                      </label>
                      <input
                        type="text"
                        value={form.songTitle}
                        onChange={(e) => setForm({ ...form, songTitle: e.target.value })}
                        placeholder="Ej. One More Time"
                        className="w-full rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/5 px-3 py-2.5 text-xs text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono-swiss text-[10px] uppercase text-[var(--fg-muted)]">
                        Artista
                      </label>
                      <input
                        type="text"
                        value={form.songArtist}
                        onChange={(e) => setForm({ ...form, songArtist: e.target.value })}
                        placeholder="Ej. Daft Punk"
                        className="w-full rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/5 px-3 py-2.5 text-xs text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {form.songTitle && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.04]"
                    >
                      <div className="w-7 h-7 rounded-full bg-[var(--accent-gold)]/20 border border-[var(--accent-gold)] flex items-center justify-center animate-spin [animation-duration:4s]">
                        <Music2 className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      </div>
                      <div className="font-mono-swiss text-xs text-[var(--fg-primary)] truncate">
                        <span className="font-medium">{form.songTitle}</span>{" "}
                        {form.songArtist && <span className="text-[var(--fg-muted)]">• {form.songArtist}</span>}
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-1">
                    <label className="block font-mono-swiss text-[10px] uppercase text-[var(--fg-muted)]">
                      Unas palabras para Lucas & Josefina (opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Déjales un mensaje o amenaza cariñosa para el 6 de febrero..."
                      className="w-full rounded-xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/5 px-3 py-2.5 text-xs text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:border-[var(--accent-gold)] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 rounded-xl border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--fg-primary)] font-sans-ui text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Atrás</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 rounded-xl bg-[var(--accent-gold)] text-black font-sans-ui text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
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
