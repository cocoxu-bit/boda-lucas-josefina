"use client";

import React, { useRef } from "react";
import { Gamepad2, Heart, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMobileSecretTap = () => {
    tapCountRef.current += 1;
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);

    if (tapCountRef.current >= 3) {
      window.dispatchEvent(new CustomEvent("trigger-secret-party-mode"));
      tapCountRef.current = 0;
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 700);
    }
  };

  return (
    <footer className="w-full border-t border-[var(--card-border)] py-14 px-4 sm:px-6 text-center transition-colors">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Monogram with 3-tap secret mobile trigger */}
        <button
          onClick={handleMobileSecretTap}
          className="group inline-flex flex-col items-center cursor-pointer transition-transform active:scale-95"
          title="Josefina & Lucas"
        >
          <span className="font-serif-editorial text-4xl text-[var(--fg-primary)] italic tracking-wider group-hover:text-[var(--accent-gold)] transition-colors">
            Josefina & Lucas
          </span>
          <span className="font-mono-swiss text-[10px] uppercase tracking-[0.3em] text-[var(--fg-muted)] mt-1">
            06 • 02 • 2027 // VALENCIA
          </span>
        </button>

        <p className="font-sans-ui text-xs text-[var(--fg-muted)] font-light max-w-sm mx-auto">
          Palacios de Monforte (13:00) & Veneno. Cóctel largo, música sin fin y cero formalismos.
        </p>

        {/* WhatsApp Dudas Direct Contact */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://wa.me/34603494678?text=%C2%A1Hola%20Josefina!%20Tengo%20una%20duda%20sobre%20la%20boda%20del%206%20de%20febrero:"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.03] hover:border-emerald-500/50 hover:bg-emerald-500/10 font-mono-swiss text-[11px] text-[var(--fg-primary)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Josefina: <strong>+34 603 49 46 78</strong></span>
          </a>

          <a
            href="https://wa.me/34606513672?text=%C2%A1Hola%20Lucas!%20Tengo%20una%20duda%20sobre%20la%20boda%20del%206%20de%20febrero:"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.03] hover:border-emerald-500/50 hover:bg-emerald-500/10 font-mono-swiss text-[11px] text-[var(--fg-primary)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lucas: <strong>+34 606 51 36 72</strong></span>
          </a>
        </div>

        {/* Actions & Hints */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono-swiss text-[10px] text-[var(--fg-muted)]">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("replay-epic-intro"))}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--card-border)] hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
          >
            <span>✦ Revivir Entrada Épica</span>
          </button>

          <div className="flex items-center gap-1.5 opacity-60">
            <Gamepad2 className="w-3.5 h-3.5 animate-pulse text-[var(--accent-gold)]" />
            <span>Modo Secreto: sólo para quienes jugaron a la Game Boy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
