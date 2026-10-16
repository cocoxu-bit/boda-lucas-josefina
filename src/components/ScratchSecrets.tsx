"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Sparkles, RefreshCw, Eye, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface SecretCard {
  id: string;
  number: string;
  tag: string;
  title: string;
  story: string;
  badge: string;
}

const SECRETS: SecretCard[] = [
  {
    id: "secret-veneno",
    number: "01",
    tag: "HISTORIA 01",
    title: "¿Por qué Veneno y no una masía clásica?",
    story: "Visitamos tres sitios tradicionales. En el último nos ofrecieron un menú de 4 horas con solomillo en plato caliente, cortador de jamón y un violín de fondo tocando baladas lentas. Nos miramos cómplices, dijimos al unísono: 'nosotros no somos esto', y nos fuimos directos a Veneno a celebrarlo con cócteles de autor. Esa misma tarde supimos que la boda sería aquí.",
    badge: "Elección 100% Nuestra",
  },
  {
    id: "secret-first-date",
    number: "02",
    tag: "HISTORIA 02",
    title: "La primera cita (Ruzafa, 20:00 H)",
    story: "Quedamos para 'una sola caña rápida porque mañana madrugamos'. Eran las 04:30 de la mañana, habíamos cerrado dos locales en Ruzafa, nos habíamos comido dos raciones de patatas bravas y ya estábamos debatiendo listas de reproducción de música indie con los camareros. Desde ese día no nos hemos separado.",
    badge: "Amor a Primera Caña",
  },
  {
    id: "secret-pact",
    number: "03",
    tag: "HISTORIA 03",
    title: "El Pacto de Honor del 6 de Febrero",
    story: "Queda terminantemente prohibido preguntar '¿a qué hora nos sentamos a comer?'. La respuesta oficial de los novios es: 'cuando te canses de bailar, y para eso hay zonas de sillones y sofás retro'. Hasta entonces, canapé gourmet en mano, cóctel frío y a celebrar sin corsés.",
    badge: "Regla de Oro",
  },
];

export const ScratchSecrets: React.FC = () => {
  const [selectedSecretIdx, setSelectedSecretIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const currentSecret = SECRETS[selectedSecretIdx];

  // Draw the refined luxury gold foil scratch card
  const initScratchCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Reset composite operation to draw the foil
    ctx.globalCompositeOperation = "source-over";

    // 1. Rich Metallic Champagne Gold Gradient (45° diagonal sheen)
    const goldGradient = ctx.createLinearGradient(0, 0, width, height);
    goldGradient.addColorStop(0, "#c28835");
    goldGradient.addColorStop(0.25, "#e5bc68");
    goldGradient.addColorStop(0.5, "#f7e3af");
    goldGradient.addColorStop(0.75, "#dfb15b");
    goldGradient.addColorStop(1, "#b37626");
    ctx.fillStyle = goldGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle brushed metallic texture (fine silky grain, no harsh barcode stripes)
    ctx.fillStyle = "rgba(255, 255, 255, 0.045)";
    for (let x = 0; x < width; x += 2) {
      if (x % 3 === 0) {
        ctx.fillRect(x, 0, 1, height);
      }
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    for (let y = 0; y < height; y += 3) {
      if (y % 4 === 0) {
        ctx.fillRect(0, y, width, 1);
      }
    }

    // 3. Delicate Inset Gold & White Double Frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = "rgba(90, 55, 10, 0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Corner decorative accents
    const markLen = 10;
    ctx.strokeStyle = "rgba(70, 40, 5, 0.4)";
    ctx.lineWidth = 1.5;
    // Top-Left
    ctx.beginPath();
    ctx.moveTo(8, 8 + markLen);
    ctx.lineTo(8, 8);
    ctx.lineTo(8 + markLen, 8);
    ctx.stroke();
    // Top-Right
    ctx.beginPath();
    ctx.moveTo(width - 8 - markLen, 8);
    ctx.lineTo(width - 8, 8);
    ctx.lineTo(width - 8, 8 + markLen);
    ctx.stroke();
    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(8, height - 8 - markLen);
    ctx.lineTo(8, height - 8);
    ctx.lineTo(8 + markLen, height - 8);
    ctx.stroke();
    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(width - 8 - markLen, height - 8);
    ctx.lineTo(width - 8, height - 8);
    ctx.lineTo(width - 8, height - 8 - markLen);
    ctx.stroke();

    // 4. Center Gold Foil Monogram Emblem
    const centerX = width / 2;
    const centerY = height / 2;

    // Outer subtle gold seal circle
    ctx.beginPath();
    ctx.arc(centerX, centerY - 14, 26, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    ctx.fill();
    ctx.strokeStyle = "rgba(70, 40, 5, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner embossed monogram
    ctx.fillStyle = "#3d2708";
    ctx.font = `italic 600 18px "Instrument Serif", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("J & L", centerX, centerY - 13);

    // 5. Elegant Embossed Letterpress Typography on Gold Foil
    ctx.fillStyle = "#352206";
    ctx.font = `600 10.5px monospace`;
    ctx.fillText("TARJETA RASCA • EDICIÓN LIMITADA", centerX, centerY + 24);

    ctx.fillStyle = "#4a320c";
    ctx.font = `italic 14px "Instrument Serif", Georgia, serif`;
    ctx.fillText("Rasca con el dedo para desvelar la historia", centerX, centerY + 42);

    ctx.fillStyle = "rgba(70, 45, 10, 0.65)";
    ctx.font = `500 9.5px monospace`;
    ctx.fillText("06 • 02 • 2027", centerX, centerY + 58);

    setIsRevealed(false);
    setScratchProgress(0);
  }, []);

  useEffect(() => {
    initScratchCanvas();
  }, [selectedSecretIdx, initScratchCanvas]);

  useEffect(() => {
    const handleResize = () => {
      initScratchCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initScratchCanvas]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparentCount = 0;

    // Sample pixels for smooth 60fps performance
    const step = 20;
    let samples = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      samples++;
      if (data[i] === 0) {
        transparentCount++;
      }
    }

    const percentage = Math.round((transparentCount / samples) * 100);
    setScratchProgress(percentage);

    if (percentage > 45 && !isRevealed) {
      triggerReveal();
    }
  };

  const triggerReveal = () => {
    setIsRevealed(true);
    setScratchProgress(100);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    // High-end champagne gold confetti celebration
    confetti({
      particleCount: 30,
      spread: 65,
      origin: { y: 0.65 },
      colors: ["#dfb15b", "#ffffff", "#c28835", "#e8c37d"],
    });
  };

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const pt = getCanvasCoords(e);
    lastPointRef.current = pt;
    scratch(pt.x, pt.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const pt = getCanvasCoords(e);
    scratch(pt.x, pt.y, lastPointRef.current);
    lastPointRef.current = pt;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const scratch = (x: number, y: number, lastPt: { x: number; y: number } | null = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";

    if (lastPt) {
      ctx.beginPath();
      ctx.moveTo(lastPt.x, lastPt.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.lineWidth = 48;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleSelectSecret = (idx: number) => {
    if (idx === selectedSecretIdx) return;
    setSelectedSecretIdx(idx);
  };

  const handleNextSecret = () => {
    setSelectedSecretIdx((prev) => (prev + 1) % SECRETS.length);
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 select-none">
      {/* Editorial Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--accent-gold)]/25 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] font-mono text-[11px] uppercase tracking-[0.22em]">
          <Sparkles className="w-3 h-3" />
          <span>Rasca & Descubre</span>
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--fg-primary)] italic tracking-tight">
          Tres Anécdotas
        </h2>

        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto leading-relaxed">
          Rasca la tarjeta dorada con el dedo o ratón para descubrir lo que no diremos en la ceremonia.
        </p>
      </div>

      {/* Main Scratch Card Box */}
      <div className="theme-card rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-all border border-[var(--card-border)] bg-[var(--card-bg)]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-gold)]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Píldoras selectoras para las 3 historias */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-4">
          <div className="flex items-center gap-2">
            {SECRETS.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => handleSelectSecret(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  selectedSecretIdx === idx
                    ? "bg-[var(--accent-gold)] text-black font-semibold shadow-sm"
                    : "bg-white/[0.04] text-[var(--fg-muted)] hover:text-white border border-white/5"
                }`}
              >
                <span>{sec.tag}</span>
              </button>
            ))}
          </div>

          <span className="hidden sm:inline-block font-mono text-[11px] text-[var(--accent-gold)] tracking-wider uppercase font-semibold">
            {currentSecret.badge}
          </span>
        </div>

        {/* Scratch Area: Luxury Gold Card */}
        <div className="relative w-full min-h-[250px] sm:min-h-[240px] rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[#0d0d12] shadow-inner">
          {/* UNDERNEATH LAYER: The Revealed Story */}
          <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between text-left select-none bg-gradient-to-b from-[#141419] to-[#0c0c10]">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--accent-gold)] pb-2 border-b border-white/10">
                <span className="tracking-wider uppercase font-semibold">
                  {currentSecret.tag} // {currentSecret.badge}
                </span>
                <span className="text-zinc-500">06.02.2027 • VALENCIA</span>
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-tight mt-3">
                {currentSecret.title}
              </h3>

              <p className="font-sans-ui text-xs sm:text-[14px] text-zinc-300 font-light leading-relaxed mt-2.5">
                {currentSecret.story}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[var(--accent-gold)]">
              <span>Josefina & Lucas</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Anécdota desvelada</span>
              </span>
            </div>
          </div>

          {/* OVERLAY LAYER: Metallic Gold Scratch Foil */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-700 ${
              isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Bottom Status & Controls */}
        <div className="flex items-center justify-between pt-4 mt-1 border-t border-[var(--card-border)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
            <span className="font-mono text-xs text-zinc-400">
              {isRevealed ? (
                <span className="text-[var(--accent-gold)] font-semibold">
                  ✓ Desvelada al 100%
                </span>
              ) : (
                <span>Rascado: <strong className="text-white">{scratchProgress}%</strong></span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isRevealed && (
              <button
                onClick={triggerReveal}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Desvelar sin rascar"
              >
                <Eye className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Desvelar</span>
              </button>
            )}

            <button
              onClick={handleNextSecret}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)] text-black hover:bg-[#e8c37d] active:scale-95 text-xs font-mono font-semibold transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-black" />
              <span>Siguiente</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
