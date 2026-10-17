"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { RefreshCw, Eye, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface SecretCard {
  id: string;
  number: string;
  title: string;
  story: string;
  imageUrl?: string;
  isEasterEgg?: boolean;
}

const SECRETS: SecretCard[] = [
  {
    id: "secret-veneno",
    number: "1ª anécdota",
    title: "¿Por qué Veneno?",
    story: "Visitamos tres sitios tradicionales con solomillo y violín de fondo. Dijimos: 'nosotros no somos esto', y nos fuimos a celebrarlo con cócteles a Veneno. Esa misma tarde supimos que la boda sería aquí.",
  },
  {
    id: "secret-first-date",
    number: "2ª anécdota",
    title: "La primera cita",
    story: "Quedamos para una caña rápida y terminamos a las 04:30 de la mañana debatiendo música indie con los camareros en Ruzafa. Desde ese día no nos hemos separado.",
  },
  {
    id: "secret-pact",
    number: "3ª anécdota",
    title: "El pacto de honor",
    story: "Prohibido preguntar '¿a qué hora nos sentamos?'. La respuesta es: cuando te canses de bailar. Canapé en mano, cóctel frío y a disfrutar.",
  },
];

const EASTER_EGG_SECRET: SecretCard = {
  id: "secret-maximo",
  number: "★ Máximo",
  title: "El verdadero jefe del evento",
  story: "Llegó para revolucionarlo todo. En Veneno no beberá cócteles, pero tiene barra libre de sonrisas y el mejor look de la fiesta.",
  imageUrl: "/images/maximo-secret.webp",
  isEasterEgg: true,
};

export const ScratchSecrets: React.FC = () => {
  const [selectedSecretIdx, setSelectedSecretIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [zoomPhoto, setZoomPhoto] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const allSecrets = showEasterEgg ? [...SECRETS, EASTER_EGG_SECRET] : SECRETS;
  const currentSecret = allSecrets[selectedSecretIdx] || allSecrets[0];

  // Draw the refined luxury gold/sage foil scratch card
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
    if (currentSecret.isEasterEgg) {
      goldGradient.addColorStop(0, "#4a573d");
      goldGradient.addColorStop(0.3, "#7f966b");
      goldGradient.addColorStop(0.5, "#d4af37"); // subtle golden touch for Easter Egg
      goldGradient.addColorStop(0.7, "#88a075");
      goldGradient.addColorStop(1, "#3c4a37");
    } else {
      goldGradient.addColorStop(0, "#485942");
      goldGradient.addColorStop(0.25, "#667a5e");
      goldGradient.addColorStop(0.5, "#a7ba9e");
      goldGradient.addColorStop(0.75, "#7c8f73");
      goldGradient.addColorStop(1, "#3c4a37");
    }
    ctx.fillStyle = goldGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle brushed metallic texture
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
    ctx.strokeStyle = currentSecret.isEasterEgg ? "rgba(255, 215, 0, 0.55)" : "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = "rgba(35, 50, 25, 0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Corner decorative accents
    const markLen = 10;
    ctx.strokeStyle = "rgba(35, 50, 25, 0.4)";
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

    // 4. Center Monogram / Easter Egg Emblem
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY - 8, 28, 0, Math.PI * 2);
    ctx.fillStyle = currentSecret.isEasterEgg ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 255, 255, 0.22)";
    ctx.fill();
    ctx.strokeStyle = currentSecret.isEasterEgg ? "rgba(255, 215, 0, 0.6)" : "rgba(35, 50, 25, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner embossed text
    ctx.fillStyle = "#1e2b19";
    ctx.font = `italic 600 18px "Instrument Serif", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentSecret.isEasterEgg ? "J • L • M" : "J & L", centerX, centerY - 7);

    // Minimal instruction
    ctx.fillStyle = "#273b20";
    ctx.font = `italic 14px "Instrument Serif", Georgia, serif`;
    ctx.fillText(
      currentSecret.isEasterEgg ? "Rasca para ver al VIP 👶" : "Rasca para descubrir",
      centerX,
      centerY + 28
    );

    setIsRevealed(false);
    setScratchProgress(0);
  }, [currentSecret]);

  useEffect(() => {
    initScratchCanvas();
  }, [selectedSecretIdx, showEasterEgg, initScratchCanvas]);

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
    // Confetti celebration
    confetti({
      particleCount: currentSecret.isEasterEgg ? 50 : 30,
      spread: 70,
      origin: { y: 0.65 },
      colors: currentSecret.isEasterEgg
        ? ["#ffd700", "#7c8f73", "#ffffff", "#fce786"]
        : ["#7c8f73", "#ffffff", "#a7ba9e", "#95a88c"],
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
    // If not unlocked yet and on 3rd anecdote, unlock the Easter Egg!
    if (!showEasterEgg && selectedSecretIdx === SECRETS.length - 1) {
      setShowEasterEgg(true);
      setSelectedSecretIdx(SECRETS.length);
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffd700", "#7c8f73", "#ffffff"],
      });
      return;
    }
    const total = showEasterEgg ? SECRETS.length + 1 : SECRETS.length;
    setSelectedSecretIdx((prev) => (prev + 1) % total);
  };

  // Easter Egg trigger by tapping the header 3 times
  const handleTitleTap = () => {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 3) {
      setShowEasterEgg(true);
      setSelectedSecretIdx(SECRETS.length);
      setTapCount(0);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffd700", "#7c8f73", "#ffffff"],
      });
    }
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto py-10 px-4 sm:px-6 select-none">
      {/* Clean Minimal Header (with subtle secret tap trigger) */}
      <div className="text-center mb-6">
        <button
          onClick={handleTitleTap}
          className="group inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
          title="Toca para descubrir un secreto"
        >
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--fg-primary)] italic tracking-tight group-hover:opacity-90 transition-opacity">
            Anécdotas
          </h2>
          {showEasterEgg && (
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          )}
        </button>
      </div>

      {/* Main Scratch Card Box */}
      <div
        className={`theme-card rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-all border ${
          currentSecret.isEasterEgg
            ? "border-amber-400/40 shadow-[0_0_25px_rgba(255,215,0,0.15)]"
            : "border-[var(--card-border)] bg-[var(--card-bg)]"
        }`}
      >
        {/* Píldoras selectoras (1ª, 2ª, 3ª y Máximo si desbloqueado) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-3 mb-3 border-b border-[var(--card-border)]">
          {allSecrets.map((sec, idx) => {
            const isSelected = selectedSecretIdx === idx;
            const isSpecial = sec.isEasterEgg;

            return (
              <button
                key={sec.id}
                onClick={() => handleSelectSecret(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans-ui transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? isSpecial
                      ? "bg-amber-300 text-zinc-900 font-bold shadow-md"
                      : "bg-white text-black font-semibold shadow-sm"
                    : isSpecial
                    ? "bg-amber-400/20 text-amber-200 border border-amber-300/40 hover:bg-amber-400/30"
                    : "bg-white/10 text-white/80 hover:text-white hover:bg-white/15"
                }`}
              >
                <span>{sec.number}</span>
                {isSpecial && <span className="text-[10px]">👶</span>}
              </button>
            );
          })}
        </div>

        {/* Scratch Area */}
        <div
          className={`relative w-full rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[#121c12] shadow-inner transition-all duration-300 ${
            currentSecret.isEasterEgg
              ? "min-h-[250px] sm:min-h-[220px]"
              : "min-h-[180px] sm:min-h-[190px]"
          }`}
        >
          {/* UNDERNEATH LAYER: The Revealed Story */}
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center text-center select-none bg-gradient-to-b from-[#1a2619] to-[#121c12]">
            {currentSecret.imageUrl ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto w-full">
                {/* Photo of baby Máximo (cleanly cropped, without closet or white blanket) */}
                <div
                  onClick={() => setZoomPhoto(true)}
                  className="relative w-36 h-24 sm:w-44 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-xl shrink-0 cursor-pointer group"
                  title="Toca para ampliar foto"
                >
                  <Image
                    src={currentSecret.imageUrl}
                    alt="Máximo"
                    fill
                    sizes="(max-width: 640px) 150px, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono-swiss text-amber-200 border border-white/20">
                    Ampliar 🔍
                  </div>
                </div>

                {/* Details */}
                <div className="text-center sm:text-left space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono-swiss uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30">
                    Easter Egg • Máximo 👶
                  </span>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white italic leading-tight">
                    {currentSecret.title}
                  </h3>
                  <p className="font-sans-ui text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                    {currentSecret.story}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white italic leading-tight">
                  {currentSecret.title}
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-white/90 font-light leading-relaxed mt-2.5 max-w-lg mx-auto">
                  {currentSecret.story}
                </p>
              </>
            )}
          </div>

          {/* OVERLAY LAYER: Metallic Gold/Sage Scratch Foil */}
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
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-[var(--card-border)]">
          <span className="font-mono-swiss text-[11px] text-white/60">
            {currentSecret.isEasterEgg ? "★ Secreto Máximo" : currentSecret.number}
          </span>

          <div className="flex items-center gap-2">
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
      </div>

      {/* Lightbox / Zoom Modal for Máximo Photo */}
      <AnimatePresence>
        {zoomPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomPhoto(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-3xl overflow-hidden bg-[#1c261a] border border-amber-300/40 shadow-2xl p-4 sm:p-5 text-center space-y-3 cursor-default"
            >
              <button
                onClick={() => setZoomPhoto(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-white/20">
                <Image
                  src="/images/maximo-secret.webp"
                  alt="Máximo"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif-editorial text-2xl sm:text-3xl text-white italic">
                  Máximo
                </h4>
                <p className="font-sans-ui text-xs sm:text-sm text-amber-200/90 font-light">
                  El verdadero jefe del evento • ¡Listo para la boda! 👶✨
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
