"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { RefreshCw, Eye } from "lucide-react";
import confetti from "canvas-confetti";

interface SecretCard {
  id: string;
  number: string;
  title: string;
  story: string;
}

const SECRETS: SecretCard[] = [
  {
    id: "secret-veneno",
    number: "01",
    title: "¿Por qué Veneno?",
    story: "Visitamos tres sitios tradicionales con solomillo y violín de fondo. Dijimos: 'nosotros no somos esto', y nos fuimos a celebrarlo con cócteles a Veneno. Esa misma tarde supimos que la boda sería aquí.",
  },
  {
    id: "secret-first-date",
    number: "02",
    title: "La primera cita",
    story: "Quedamos para una caña rápida y terminamos a las 04:30 de la mañana debatiendo música indie con los camareros en Ruzafa. Desde ese día no nos hemos separado.",
  },
  {
    id: "secret-pact",
    number: "03",
    title: "El pacto de honor",
    story: "Prohibido preguntar '¿a qué hora nos sentamos?'. La respuesta es: cuando te canses de bailar. Canapé en mano, cóctel frío y a disfrutar.",
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

    // 1. Rich Metallic Satin Eucalyptus & Sage Foil Gradient (45° diagonal sheen)
    const goldGradient = ctx.createLinearGradient(0, 0, width, height);
    goldGradient.addColorStop(0, "#485942");
    goldGradient.addColorStop(0.25, "#667a5e");
    goldGradient.addColorStop(0.5, "#a7ba9e");
    goldGradient.addColorStop(0.75, "#7c8f73");
    goldGradient.addColorStop(1, "#3c4a37");
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

    // 3. Delicate Inset Olive & White Double Frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = "rgba(35, 50, 25, 0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Corner decorative accents
    const markLen = 10;
    ctx.strokeStyle = "rgba(35, 50, 25, 0.4)";
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

    // 4. Center Olive Foil Monogram Emblem
    const centerX = width / 2;
    const centerY = height / 2;

    // Outer subtle olive seal circle
    ctx.beginPath();
    ctx.arc(centerX, centerY - 8, 26, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
    ctx.fill();
    ctx.strokeStyle = "rgba(35, 50, 25, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner embossed monogram
    ctx.fillStyle = "#1e2b19";
    ctx.font = `italic 600 20px "Instrument Serif", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("J & L", centerX, centerY - 7);

    // Minimal instruction
    ctx.fillStyle = "#273b20";
    ctx.font = `italic 14px "Instrument Serif", Georgia, serif`;
    ctx.fillText("Rasca para descubrir", centerX, centerY + 26);

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
    // High-end eucalyptus & sage confetti celebration
    confetti({
      particleCount: 30,
      spread: 65,
      origin: { y: 0.65 },
      colors: ["#7c8f73", "#ffffff", "#a7ba9e", "#95a88c"],
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
    <section className="relative w-full max-w-2xl mx-auto py-10 px-4 sm:px-6 select-none">
      {/* Clean Minimal Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--fg-primary)] italic tracking-tight">
          Anécdotas
        </h2>
      </div>

      {/* Main Scratch Card Box */}
      <div className="theme-card rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-all border border-[var(--card-border)] bg-[var(--card-bg)]">
        {/* Píldoras selectoras limpias (01, 02, 03) */}
        <div className="flex items-center justify-center gap-2 pb-3 mb-3 border-b border-[var(--card-border)]">
          {SECRETS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => handleSelectSecret(idx)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                selectedSecretIdx === idx
                  ? "bg-white text-black font-bold shadow-sm"
                  : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
              }`}
            >
              <span>{sec.number}</span>
            </button>
          ))}
        </div>

        {/* Scratch Area */}
        <div className="relative w-full min-h-[180px] sm:min-h-[190px] rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[#121c12] shadow-inner">
          {/* UNDERNEATH LAYER: The Revealed Story */}
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-center text-center select-none bg-gradient-to-b from-[#1a2619] to-[#121c12]">
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white italic leading-tight">
              {currentSecret.title}
            </h3>

            <p className="font-sans-ui text-xs sm:text-sm text-white/90 font-light leading-relaxed mt-2.5 max-w-lg mx-auto">
              {currentSecret.story}
            </p>
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

        {/* Bottom Controls */}
        <div className="flex items-center justify-end gap-2 pt-3 mt-1 border-t border-[var(--card-border)]">
          {!isRevealed && (
            <button
              onClick={triggerReveal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title="Desvelar sin rascar"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Desvelar</span>
            </button>
          )}

          <button
            onClick={handleNextSecret}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-white/90 active:scale-95 text-xs font-mono font-semibold transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-black" />
            <span>Siguiente</span>
          </button>
        </div>
      </div>
    </section>
  );
};
