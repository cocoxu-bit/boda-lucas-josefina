"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, KeyRound, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface SecretCard {
  id: string;
  tag: string;
  title: string;
  snippet: string;
  story: string;
  badge: string;
}

const SECRETS: SecretCard[] = [
  {
    id: "secret-veneno",
    tag: "CONFIDENCIAL // 01",
    title: "¿Por qué Veneno y no una masía clásica?",
    snippet: "La anécdota real de cómo descartamos las bodas de protocolo...",
    story: "Visitamos tres sitios tradicionales. En el último nos ofrecieron un menú de 4 horas con solomillo, cortador de jamón y un violín de fondo. Nos miramos cómplices, dijimos 'nosotros no somos esto', y nos fuimos directos a Veneno a celebrarlo con cócteles de autor. Esa misma tarde supimos que la boda sería aquí.",
    badge: "Elección 100% Nuestra",
  },
  {
    id: "secret-first-date",
    tag: "CONFIDENCIAL // 02",
    title: "La primera cita (Ruzafa, 20:00 H)",
    snippet: "Iba a ser una cerveza rápida después del trabajo...",
    story: "Quedamos para 'una sola caña rápida porque mañana madrugamos'. Eran las 04:30 de la mañana, habíamos cerrado dos locales en Ruzafa, nos habíamos comido dos raciones de patatas bravas y ya estábamos debatiendo listas de reproducción de música indie. Desde ese día no nos hemos separado.",
    badge: "Amor a Primera Caña",
  },
  {
    id: "secret-pact",
    tag: "CONFIDENCIAL // 03",
    title: "El Pacto de Honor del 6 de Febrero",
    snippet: "La regla inquebrantable para todos los invitados...",
    story: "Queda terminantemente prohibido preguntar '¿a qué hora nos sentamos a comer?'. La respuesta oficial de los novios es: 'Cuando te canses de bailar, y para eso hay zonas de sillones'. Hasta entonces, canapé gourmet en mano, cóctel frío y a celebrar sin corsés.",
    badge: "Regla de Oro",
  },
];

export const ScratchSecrets: React.FC = () => {
  const [selectedSecretIdx, setSelectedSecretIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  const currentSecret = SECRETS[selectedSecretIdx];

  const initScratchCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Reset composite operation to draw the foil
    ctx.globalCompositeOperation = "source-over";

    // Create luxurious metallic gold / bronze gradient foil
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#c28835");
    gradient.addColorStop(0.35, "#dfb15b");
    gradient.addColorStop(0.7, "#a86824");
    gradient.addColorStop(1, "#c28835");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle brushed metallic grain
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    for (let i = 0; i < width; i += 4) {
      ctx.fillRect(i, 0, 2, height);
    }

    // Border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Prompt instructions inside foil
    ctx.fillStyle = "#18181b";
    ctx.font = `600 ${Math.max(12, Math.round(width * 0.038))}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ RASCA CON EL DEDO AQUÍ ✨", width / 2, height / 2 - 10);

    ctx.fillStyle = "#3f3f46";
    ctx.font = `500 ${Math.max(10, Math.round(width * 0.028))}px monospace`;
    ctx.fillText("DESCUBRE UN SECRETO INÉDITO", width / 2, height / 2 + 14);

    setIsRevealed(false);
    setScratchProgress(0);
  }, []);

  useEffect(() => {
    initScratchCanvas();
  }, [selectedSecretIdx, initScratchCanvas]);

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
    const totalPixels = data.length / 4;

    // Sample every 16th pixel for 60fps performance
    const step = 16;
    let samples = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      samples++;
      if (data[i] === 0) {
        transparentCount++;
      }
    }

    const percentage = Math.round((transparentCount / samples) * 100);
    setScratchProgress(percentage);

    if (percentage > 48 && !isRevealed) {
      setIsRevealed(true);
      // Clean clear
      ctx.clearRect(0, 0, width, height);
      // Soft confetti burst
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#dfb15b", "#c28835", "#ffffff"],
      });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    scratch(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  const nextSecret = () => {
    setSelectedSecretIdx((prev) => (prev + 1) % SECRETS.length);
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto py-12 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-mono-swiss uppercase tracking-widest text-[var(--accent-gold)]">
          <KeyRound className="w-3.5 h-3.5" />
          <span>MINIJUEGO INTERACTIVO // RASCAR Y GANAR</span>
        </div>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[var(--fg-primary)] italic">
          Secretos Inéditos de los Novios
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] max-w-md mx-auto">
          Rasca la tarjeta dorada con tu dedo o cursor para desvelar anécdotas reales que no contaremos en la ceremonia.
        </p>
      </div>

      {/* Main Scratch Card Box */}
      <div className="theme-card rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-all duration-300">
        {/* Selector pills for 3 secret cards */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {SECRETS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSecretIdx(idx)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono-swiss uppercase transition-all cursor-pointer ${
                selectedSecretIdx === idx
                  ? "bg-[var(--accent-gold)] text-black font-semibold shadow-sm"
                  : "glass-pill text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
              }`}
            >
              Tarjeta 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Scratch Area Container */}
        <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--chip-bg)] shadow-inner">
          {/* UNDERNEATH LAYER: The Revealed Story */}
          <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between text-left select-none">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--card-border)]">
                <span className="font-mono-swiss text-[10px] uppercase text-[var(--accent-gold)] tracking-widest font-semibold">
                  {currentSecret.tag}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono-swiss bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {currentSecret.badge}
                </span>
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[var(--fg-primary)] italic leading-tight">
                {currentSecret.title}
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-primary)]/85 font-light leading-relaxed mt-2.5">
                {currentSecret.story}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
              <span className="font-mono-swiss text-[9px] text-[var(--fg-muted)] uppercase tracking-widest">
                Lucas & Josefina // 06.02.2027
              </span>
              <span className="font-mono-swiss text-[10px] text-[var(--accent-gold)] font-medium">
                ✓ Secreto Desvelado
              </span>
            </div>
          </div>

          {/* OVERLAY LAYER: Scratch Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-500 ${
              isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 mt-2">
          <div className="font-mono-swiss text-[10px] text-[var(--fg-muted)]">
            {isRevealed ? "¡Tarjeta descubierta al 100%!" : `Rascado: ${scratchProgress}% (rasca más del 50%)`}
          </div>

          <button
            onClick={nextSecret}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill hover:opacity-80 active:scale-95 text-xs font-mono-swiss text-[var(--fg-primary)] transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-[var(--accent-gold)]" />
            <span>Siguiente Secreto</span>
          </button>
        </div>
      </div>
    </section>
  );
};
