"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Eye, Check, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

interface SecretCard {
  id: string;
  number: string;
  badge: string;
  title: string;
  story: string;
  tagline: string;
}

const SECRETS: SecretCard[] = [
  {
    id: "secret-veneno",
    number: "01",
    badge: "LA ELECCIÓN REAL",
    title: "Por qué mandamos a paseo el violín y la masía clásica",
    story: "Visitamos tres sitios tradicionales de boda. En el último nos ofrecieron un menú de cuatro horas con solomillo en plato caliente, cortador de jamón reglamentario y un violín de fondo tocando baladas lentas. Nos miramos cómplices, dijimos al unísono: 'nosotros no somos esto', y nos fuimos directos a Veneno a celebrarlo con cócteles de autor. Esa misma tarde supimos que la boda solo podía ser aquí.",
    tagline: "100% Cero convencionalismos • Cócteles, tardeo y música real",
  },
  {
    id: "secret-first-date",
    number: "02",
    badge: "AMOR A PRIMERA CAÑA",
    title: "La cita de 'una cerveza rápida porque mañana madrugo'",
    story: "Quedamos para tomar una sola caña rápida después de trabajar. Terminamos a las 04:30 de la mañana habiendo cerrado dos bares en Ruzafa, devorado dos raciones de patatas bravas y discutiendo acaloradamente con los camareros sobre listas de reproducción de música indie. Desde esa misma noche supimos que esto era para siempre.",
    tagline: "Ruzafa • 20:00 H a 04:30 H • Sin planes y sin frenos",
  },
  {
    id: "secret-pact",
    number: "03",
    badge: "EL PACTO SAGRADO",
    title: "La regla de oro: prohibido preguntar a qué hora se come",
    story: "Queda terminantemente prohibido preguntar durante el evento '¿a qué hora nos sentamos a la mesa?'. La respuesta oficial de los novios es: 'cuando te canses de bailar, y para eso hemos puesto sillones y sofás retro'. Canapé de autor en mano, copa fría, charla entre amigos y a celebrar sin corsés.",
    tagline: "Protocolo Veneno • Cóctel continuo • Libertad absoluta",
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

  // Draw the high-end Speakeasy Backstage Note foil
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

    // 1. Deep Graphite Textured Background (Backstage Velvet & Carbon paper)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#131318");
    bgGradient.addColorStop(0.5, "#181822");
    bgGradient.addColorStop(1, "#101014");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Micro-grain noise overlay on foil
    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    for (let x = 0; x < width; x += 3) {
      for (let y = 0; y < height; y += 3) {
        if ((x + y) % 5 === 0) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
    }

    // 2. High-fashion Fine Gold Inset Border
    ctx.strokeStyle = "rgba(223, 177, 91, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Corner brackets (editorial confidential dossier styling)
    const bracketSize = 12;
    ctx.strokeStyle = "#dfb15b";
    ctx.lineWidth = 2;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(10, 10 + bracketSize);
    ctx.lineTo(10, 10);
    ctx.lineTo(10 + bracketSize, 10);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(width - 10 - bracketSize, 10);
    ctx.lineTo(width - 10, 10);
    ctx.lineTo(width - 10, 10 + bracketSize);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(10, height - 10 - bracketSize);
    ctx.lineTo(10, height - 10);
    ctx.lineTo(10 + bracketSize, height - 10);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(width - 10 - bracketSize, height - 10);
    ctx.lineTo(width - 10, height - 10);
    ctx.lineTo(width - 10, height - 10 - bracketSize);
    ctx.stroke();

    // 3. Header Stamp on Foil
    ctx.fillStyle = "rgba(223, 177, 91, 0.85)";
    ctx.font = `600 10px monospace`;
    ctx.textAlign = "left";
    ctx.fillText("VENENO BAR // ARCHIVO PRIVADO", 22, 28);

    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText(`REF. 06-02-27 • NOTA ${currentSecret.number}`, width - 22, 28);

    // 4. Center Monogram & Wax Seal Motif
    const centerY = height / 2;
    const centerX = width / 2;

    // Outer subtle gold seal ring
    ctx.beginPath();
    ctx.arc(centerX, centerY - 14, 28, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(223, 177, 91, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY - 14, 24, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(223, 177, 91, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Monogram inside seal
    ctx.fillStyle = "#dfb15b";
    ctx.font = `italic 20px "Instrument Serif", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("J & L", centerX, centerY - 13);

    // 5. Sealed Document Prompt Typography
    ctx.fillStyle = "#f4f4f6";
    ctx.font = `italic 17px "Instrument Serif", Georgia, serif`;
    ctx.fillText("Nota Confidencial de Camerino", centerX, centerY + 28);

    // Subtle gold pill prompt
    ctx.fillStyle = "rgba(223, 177, 91, 0.85)";
    ctx.font = `600 10px monospace`;
    ctx.fillText("DESLIZA CON EL DEDO PARA DESPRECINTAR", centerX, centerY + 50);

    setIsRevealed(false);
    setScratchProgress(0);
  }, [currentSecret.number]);

  useEffect(() => {
    initScratchCanvas();
  }, [selectedSecretIdx, initScratchCanvas]);

  // Recalculate scratch canvas on window resize
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

    if (percentage > 40 && !isRevealed) {
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
      particleCount: 35,
      spread: 70,
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
      ctx.lineWidth = 52;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
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
    <section className="relative w-full max-w-3xl mx-auto py-16 px-4 sm:px-6 select-none">
      {/* Editorial Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] font-mono text-[11px] uppercase tracking-[0.22em]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Veneno Bar • Archivo Privado</span>
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[var(--fg-primary)] italic tracking-tight">
          Lo que no diremos en el altar
        </h2>

        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto leading-relaxed">
          Tres confidencias reales entre Ruzafa y Veneno. Desprecinta cada nota rascando con el dedo para descubrir la historia.
        </p>
      </div>

      {/* Main Backstage Dossier Container */}
      <div className="relative rounded-3xl border border-[var(--card-border)] bg-gradient-to-b from-[#131318] to-[#0c0c0f] p-5 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Subtle decorative gold glow background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-gold)]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Tab Selector: Speakeasy Memo Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-[var(--card-border)] mb-5">
          <div className="flex items-center gap-2">
            {SECRETS.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => handleSelectSecret(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  selectedSecretIdx === idx
                    ? "bg-[var(--accent-gold)] text-black font-semibold shadow-md shadow-[var(--accent-gold)]/20"
                    : "bg-white/[0.04] text-[var(--fg-muted)] hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                <span>Nota #{sec.number}</span>
                {idx === selectedSecretIdx && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline-block font-mono text-[11px] text-[var(--accent-gold)] tracking-widest uppercase">
            {currentSecret.badge}
          </span>
        </div>

        {/* Scratch Area: Speakeasy Sealed Memo */}
        <div className="relative w-full min-h-[300px] sm:min-h-[290px] rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[#0d0d12] shadow-inner">
          {/* UNDERNEATH LAYER: The Revealed Speakeasy Note */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-left select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#181824] via-[#101015] to-[#0a0a0d]">
            {/* Top Memo Header */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--accent-gold)] pb-3 border-b border-white/10">
                <span className="tracking-widest uppercase font-semibold">
                  CONFIDENCIA #{currentSecret.number} • {currentSecret.badge}
                </span>
                <span className="text-zinc-500 font-mono">06.02.2027 • VALENCIA</span>
              </div>

              {/* Note Title & Story */}
              <div className="mt-4 relative">
                {/* Huge elegant watermarked quotation mark */}
                <span className="absolute -top-5 -left-3 font-serif-editorial text-7xl text-[var(--accent-gold)]/10 select-none pointer-events-none">
                  “
                </span>

                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-tight relative z-10">
                  {currentSecret.title}
                </h3>

                <p className="font-sans-ui text-sm sm:text-[15px] text-zinc-300 font-light leading-relaxed mt-3.5 relative z-10">
                  {currentSecret.story}
                </p>
              </div>
            </div>

            {/* Note Memo Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-zinc-400 text-[11px] italic">
                {currentSecret.tagline}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--accent-gold)] font-medium text-[11px]">
                <Check className="w-3.5 h-3.5" />
                <span>Autenticado por Josefina & Lucas</span>
              </span>
            </div>
          </div>

          {/* OVERLAY LAYER: Speakeasy Scratch Foil Canvas */}
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
                  ✓ Nota desprecintada y leída
                </span>
              ) : (
                <span>Desprecintado: <strong className="text-white">{scratchProgress}%</strong></span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isRevealed && (
              <button
                onClick={triggerReveal}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Abrir sin rascar"
              >
                <Eye className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Abrir nota</span>
              </button>
            )}

            <button
              onClick={handleNextSecret}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent-gold)] text-black hover:bg-[#e8c37d] active:scale-95 text-xs font-mono font-semibold transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Siguiente nota</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
