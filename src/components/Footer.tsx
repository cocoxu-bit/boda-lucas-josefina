"use client";

import React, { useRef } from "react";
import { Sparkles, Heart } from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

export const Footer: React.FC = () => {
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { playSoftPop } = useSoundEffects();

  const handleMobileSecretTap = () => {
    playSoftPop();
    tapCountRef.current += 1;
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);

    if (tapCountRef.current >= 3) {
      window.dispatchEvent(new CustomEvent("trigger-secret-party-mode"));
      tapCountRef.current = 0;
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 900);
    }
  };

  return (
    <footer className="w-full border-t border-white/10 bg-zinc-950/80 py-12 px-4 sm:px-6 text-center">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Monogram with 3-tap secret mobile trigger */}
        <button
          onClick={handleMobileSecretTap}
          className="group inline-flex flex-col items-center cursor-pointer transition-transform active:scale-95"
          title="Toca 3 veces para una sorpresa"
        >
          <span className="font-serif-editorial text-4xl text-white italic tracking-wider group-hover:text-[#dfb15b] transition-colors">
            Lucas & Josefina
          </span>
          <span className="font-mono-swiss text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-1">
            06 • 02 • 2027 // VALENCIA
          </span>
        </button>

        <p className="font-sans-ui text-xs text-zinc-400 font-light max-w-sm mx-auto">
          Palacios de Monforte (13:00) & Veneno. Cóctel largo, música sin fin y cero formalismos.
        </p>

        <div className="pt-4 flex items-center justify-center gap-1.5 font-mono-swiss text-[10px] text-zinc-600">
          <span>Diseño editorial bespoke</span>
          <span>•</span>
          <span className="hover:text-zinc-400 transition-colors cursor-default">
            Konami Code ↑ ↑ ↓ ↓ ← → ← → B A
          </span>
        </div>
      </div>
    </footer>
  );
};
