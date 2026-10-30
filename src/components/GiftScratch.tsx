"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Copy, Check, RefreshCw, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// 📝 Datos bancarios y de regalo (puedes cambiarlos por los vuestros definitivos):
export const GIFT_INFO = {
  iban: "ES00 0000 0000 0000 0000 0000",
  holders: "Josefina & Lucas",
  concept: "Boda Josefina & Lucas + Tu Nombre",
};

export const GiftScratch: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize luxury gold & eucalyptus scratch canvas
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

    // 1. Rich Metallic Satin Eucalyptus & Gold Foil Gradient (diagonal sheen)
    const foilGrad = ctx.createLinearGradient(0, 0, width, height);
    foilGrad.addColorStop(0, "#3c4a37");
    foilGrad.addColorStop(0.25, "#667a5e");
    foilGrad.addColorStop(0.5, "#d4af37"); // Golden highlight for the gift card
    foilGrad.addColorStop(0.75, "#7c8f73");
    foilGrad.addColorStop(1, "#3c4a37");

    ctx.fillStyle = foilGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle brushed metallic texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    for (let x = 0; x < width; x += 2) {
      if (x % 3 === 0) {
        ctx.fillRect(x, 0, 1, height);
      }
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.035)";
    for (let y = 0; y < height; y += 3) {
      if (y % 4 === 0) {
        ctx.fillRect(0, y, width, 1);
      }
    }

    // 3. Delicate Inset Gold Double Frame
    ctx.strokeStyle = "rgba(255, 215, 0, 0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Corner decorative accents
    const markLen = 10;
    ctx.strokeStyle = "rgba(255, 215, 0, 0.7)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(8, 8 + markLen);
    ctx.lineTo(8, 8);
    ctx.lineTo(8 + markLen, 8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 8 - markLen, 8);
    ctx.lineTo(width - 8, 8);
    ctx.lineTo(width - 8, 8 + markLen);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(8, height - 8 - markLen);
    ctx.lineTo(8, height - 8);
    ctx.lineTo(8 + markLen, height - 8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 8 - markLen, height - 8);
    ctx.lineTo(width - 8, height - 8);
    ctx.lineTo(width - 8, height - 8 - markLen);
    ctx.stroke();

    // 4. Center Monogram & Touch Instructions
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY - 10, 30, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 215, 0, 0.22)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 215, 0, 0.65)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner embossed text
    ctx.fillStyle = "#1e2b19";
    ctx.font = `italic 600 20px "Instrument Serif", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("J & L", centerX, centerY - 9);

    // Instruction caption
    ctx.fillStyle = "#1f3019";
    ctx.font = `italic 600 16px "Instrument Serif", Georgia, serif`;
    ctx.fillText("Rasca con el dedo o ratón 🪙", centerX, centerY + 35);

    setIsRevealed(false);
    setScratchProgress(0);
  }, []);

  useEffect(() => {
    initScratchCanvas();
  }, [initScratchCanvas]);

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

    if (percentage > 35 && !isRevealed) {
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
    // Festive celebration confetti
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.68 },
      colors: ["#ffd700", "#7c8f73", "#ffffff", "#e0e7da", "#c9b037"],
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
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    if (lastPt) {
      ctx.moveTo(lastPt.x, lastPt.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, 22, 0, Math.PI * 2);
    }
    ctx.stroke();

    checkScratchPercentage();
  };

  const handleCopyIban = () => {
    const cleanIban = GIFT_INFO.iban.replace(/\s+/g, "");
    navigator.clipboard.writeText(cleanIban).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    });
  };

  return (
    <section id="regalo-section" className="relative w-full max-w-2xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="font-mono-swiss text-[11px] uppercase tracking-widest text-[var(--accent-gold)] px-3 py-1 rounded-full bg-black/20 border border-[var(--card-border)] inline-block">
          Un detalle
        </span>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--fg-primary)] italic transition-colors">
          El mejor regalo es que vengáis
        </h2>

        <p className="font-sans-ui text-sm sm:text-base text-[var(--fg-muted)] max-w-lg mx-auto font-light leading-relaxed">
          «Lo decimos en serio: lo que más nos hace ilusión es veros dándolo todo en la pista de Veneno y brindar juntos. Pero si aun así queréis hacernos un detalle para ayudarnos a arrancar esta nueva etapa... rasca la tarjeta 👇»
        </p>
      </div>

      {/* Main Interactive Scratch Card Box */}
      <div className="theme-card relative rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300 border border-[var(--card-border)] bg-black/30 backdrop-blur-md">
        {/* Card Canvas & Revealed Content Wrapper */}
        <div className="relative w-full min-h-[260px] sm:min-h-[270px] rounded-2xl overflow-hidden bg-[#182317] border border-white/15 flex flex-col items-center justify-center p-5 select-none shadow-inner">
          {/* UNDERNEATH LAYER: The Revealed Gift Details */}
          <div className="w-full flex flex-col items-center justify-center text-center space-y-4 py-2">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-gold)]/15 border border-[var(--accent-gold)]/30 flex items-center justify-center text-[var(--accent-gold)]">
              <Heart className="w-5 h-5 fill-[var(--accent-gold)]/30" />
            </div>

            <div className="space-y-1">
              <span className="font-mono-swiss text-[11px] uppercase text-white/60 tracking-wider">
                Titulares de la cuenta
              </span>
              <p className="font-serif-editorial text-2xl text-white italic">
                {GIFT_INFO.holders}
              </p>
            </div>

            {/* Formatted IBAN Box */}
            <div className="w-full max-w-md bg-black/40 border border-white/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md space-y-2">
              <span className="font-mono-swiss text-[10px] uppercase text-white/50 tracking-widest block">
                Número de Cuenta (IBAN)
              </span>
              <p className="font-mono-swiss text-base sm:text-lg text-emerald-300 font-semibold tracking-wider select-all">
                {GIFT_INFO.iban}
              </p>
            </div>

            {/* Quick Actions: Copy IBAN Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                onClick={handleCopyIban}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono-swiss text-xs font-semibold transition-all cursor-pointer shadow-lg active:scale-95 ${
                  hasCopied
                    ? "bg-emerald-500 text-white shadow-emerald-500/25"
                    : "bg-white text-zinc-900 hover:bg-white/90"
                }`}
              >
                {hasCopied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>¡IBAN copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-900" />
                    <span>Copiar IBAN</span>
                  </>
                )}
              </button>

              <div className="text-left font-sans-ui text-xs text-white/70">
                <span className="text-white/40 block text-[10px] font-mono-swiss uppercase">
                  Concepto sugerido
                </span>
                <span className="italic">{GIFT_INFO.concept}</span>
              </div>
            </div>
          </div>

          {/* TOP LAYER: Interactive Scratch Foil Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none transition-opacity duration-500 ${
              isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Card Footer Controls */}
        {(scratchProgress > 0 || isRevealed) && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-swiss text-[var(--fg-muted)]">
            {/* Scratch Progress Pill */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" />
              <span>
                {isRevealed
                  ? "¡Tarjeta descubierta! 🎉"
                  : `Rascado: ${scratchProgress}%`}
              </span>
            </div>

            {/* Re-cover Action Button */}
            {isRevealed && (
              <button
                onClick={initScratchCanvas}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/90 border border-white/20 transition-all cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Volver a cubrir</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
