"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ExternalLink, Sparkles, Phone } from "lucide-react";

export const WhatsAppHelpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-whatsapp-modal", handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-whatsapp-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openWhatsApp = (phone: string, name: string) => {
    const cleanNumber = phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `¡Hola ${name}! Tengo una duda sobre la boda del 6 de febrero en Valencia:`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* FLOATING ACTION DOCK (BOTTOM RIGHT) - DUAL DIRECT BUTTONS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center p-1.5 gap-1.5 rounded-full bg-[#18181B]/95 border border-[var(--accent-gold)]/40 shadow-2xl backdrop-blur-md text-white"
        role="region"
        aria-label="Contacto directo por WhatsApp con Josefina o Lucas"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 font-mono-swiss text-[11px] font-semibold text-zinc-300 hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
          title="Ver teléfonos y detalles de contacto"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline text-zinc-200">¿Dudas?</span>
        </button>

        {/* Button Josefina */}
        <button
          onClick={() => openWhatsApp("34603494678", "Josefina")}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono-swiss text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Abrir WhatsApp de Josefina (+34 603 49 46 78)"
          aria-label="Abrir WhatsApp de Josefina"
        >
          <span>Josefina</span>
        </button>

        {/* Button Lucas */}
        <button
          onClick={() => openWhatsApp("34606513672", "Lucas")}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono-swiss text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Abrir WhatsApp de Lucas (+34 606 51 36 72)"
          aria-label="Abrir WhatsApp de Lucas"
        >
          <span>Lucas</span>
        </button>
      </motion.div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg theme-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-[var(--card-border)] bg-[var(--bg-primary)] z-10 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-swiss uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contacto Directo WhatsApp</span>
                </div>

                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[var(--fg-primary)] italic">
                  ¿Tienes alguna duda?
                </h3>

                <p className="font-sans-ui text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed font-light">
                  Pregúntanos lo que necesites sobre el plan, transporte, alojamiento, niños o estilismo. Escríbenos a cualquiera de los dos y te respondemos al momento:
                </p>
              </div>

              {/* Two Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* JOSEFINA */}
                <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.03] space-y-3 flex flex-col justify-between hover:border-[var(--accent-gold)]/50 transition-all">
                  <div className="space-y-1 text-left">
                    <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-[var(--fg-muted)] block">
                      La Novia
                    </span>
                    <h4 className="font-serif-editorial text-2xl text-[var(--fg-primary)] italic">
                      Josefina
                    </h4>
                    <p className="font-mono-swiss text-xs text-[var(--accent-gold)] font-medium">
                      +34 603 49 46 78
                    </p>
                  </div>

                  <button
                    onClick={() => openWhatsApp("34603494678", "Josefina")}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono-swiss text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Josefina</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>
                </div>

                {/* LUCAS */}
                <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-black/[0.02] dark:bg-white/[0.03] space-y-3 flex flex-col justify-between hover:border-[var(--accent-gold)]/50 transition-all">
                  <div className="space-y-1 text-left">
                    <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-[var(--fg-muted)] block">
                      El Novio
                    </span>
                    <h4 className="font-serif-editorial text-2xl text-[var(--fg-primary)] italic">
                      Lucas
                    </h4>
                    <p className="font-mono-swiss text-xs text-[var(--accent-gold)] font-medium">
                      +34 606 51 36 72
                    </p>
                  </div>

                  <button
                    onClick={() => openWhatsApp("34606513672", "Lucas")}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono-swiss text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Lucas</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>
                </div>
              </div>

              {/* Footnote */}
              <p className="font-mono-swiss text-[11px] text-[var(--fg-muted)] text-center pt-2 border-t border-[var(--card-border)]">
                También puedes llamarnos por teléfono si es algo urgente. ¡Estamos para lo que haga falta!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
