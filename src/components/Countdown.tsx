"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const { playClick } = useSoundEffects();
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
    const title = encodeURIComponent("Boda Josefina & Lucas");
    const details = encodeURIComponent(
      "Ceremonia civil en Palacios de Monforte (13:00) y celebración tipo cóctel largo en Veneno (14:45). Vestimenta arreglada pero sin protocolo rígido."
    );
    const location = encodeURIComponent("Palacete de los Jardines de Monforte & Veneno, Valencia");
    const dates = "20270206T120000Z/20270206T230000Z";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const addToAppleCalendar = () => {
    playClick();
    // Directly opens the iCalendar event on iOS/macOS/Safari native Calendar app
    window.open("/api/calendar", "_blank");
  };

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  const units = [
    { label: "días", value: formatNumber(timeLeft.days) },
    { label: "horas", value: formatNumber(timeLeft.hours) },
    { label: "minutos", value: formatNumber(timeLeft.minutes) },
    { label: "segundos", value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Swiss grid digital clock container */}
      <div className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--clock-bg)] p-3.5 sm:p-4 backdrop-blur-xl shadow-xl transition-all duration-300">
        {/* 4-digit grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--card-border)] py-3 px-1 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            >
              <span className="font-mono-swiss text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg-primary)] tabular-nums">
                {unit.value}
              </span>
              <span className="font-mono-swiss text-[9px] tracking-wider text-[var(--fg-muted)] mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar integration buttons */}
        <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={addToGoogleCalendar}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-black/[0.03] dark:bg-white/5 hover:bg-black/[0.06] dark:hover:bg-white/10 border border-[var(--card-border)] text-xs font-mono-swiss text-[var(--fg-primary)] transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Google Calendar</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={addToAppleCalendar}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-black/[0.03] dark:bg-white/5 hover:bg-black/[0.06] dark:hover:bg-white/10 border border-[var(--card-border)] text-xs font-mono-swiss text-[var(--fg-primary)] transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Apple Calendar</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
