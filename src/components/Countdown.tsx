"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Download, Check } from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const { playClick, playSoftPop } = useSoundEffects();
  const [copiedCal, setCopiedCal] = useState(false);
  const targetDate = new Date("2027-02-06T13:00:00+01:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const addToGoogleCalendar = () => {
    playClick();
    const title = encodeURIComponent("Boda Lucas & Josefina");
    const details = encodeURIComponent(
      "Ceremonia civil en Palacios de Monforte (13:00) y celebración tipo cóctel largo sin corsé en Veneno. Vestimenta arreglada pero sin protocolo rígido."
    );
    const location = encodeURIComponent("Jardines de Monforte & Veneno, Valencia");
    const dates = "20270206T120000Z/20270206T230000Z";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const downloadICS = () => {
    playSoftPop();
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lucas y Josefina//Boda Valencia//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "SUMMARY:Boda Lucas & Josefina",
      "DESCRIPTION:Ceremonia civil en Jardines de Monforte (13:00) y cóctel largo en Veneno.",
      "LOCATION:Jardines de Monforte & Veneno, Valencia",
      "DTSTART:20270206T120000Z",
      "DTEND:20270206T230000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "boda-lucas-josefina.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedCal(true);
    setTimeout(() => setCopiedCal(false), 2500);
  };

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  const units = [
    { label: "DÍAS", value: formatNumber(timeLeft.days), index: "01" },
    { label: "HORAS", value: formatNumber(timeLeft.hours), index: "02" },
    { label: "MINUTOS", value: formatNumber(timeLeft.minutes), index: "03" },
    { label: "SEGUNDOS", value: formatNumber(timeLeft.seconds), index: "04" },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Swiss grid digital clock container */}
      <div className="relative rounded-2xl border border-white/10 bg-zinc-950/80 p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb15b] animate-ping" />
            <span className="font-mono-swiss text-[10px] uppercase tracking-widest text-zinc-400">
              CUENTA ATRÁS EN VIVO // T-MINUS
            </span>
          </div>
          <span className="font-mono-swiss text-[10px] text-zinc-500">
            06.FEB.2027 13:00 CET
          </span>
        </div>

        {/* 4-digit grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 py-3 px-1 transition-colors hover:bg-white/[0.06]"
            >
              <div className="font-mono-swiss text-[9px] text-zinc-500 mb-1">
                {unit.index}
              </div>
              <span className="font-mono-swiss text-2xl sm:text-3xl font-semibold tracking-tight text-white tabular-nums">
                {unit.value}
              </span>
              <span className="font-mono-swiss text-[9px] uppercase tracking-wider text-zinc-400 mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar integration buttons */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={addToGoogleCalendar}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-swiss text-zinc-300 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#dfb15b]" />
            <span>Google Calendar</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={downloadICS}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-swiss text-zinc-300 transition-colors"
          >
            {copiedCal ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Descargado</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span>Apple / iCal (.ics)</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
