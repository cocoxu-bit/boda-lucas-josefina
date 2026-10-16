"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playSoftPop: () => void;
  playSelect: () => void;
  playSuccess: () => void;
  playCardFlip: () => void;
  isAmbientPlaying: boolean;
  toggleAmbient: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playClick: () => {},
  playSoftPop: () => {},
  playSelect: () => {},
  playSuccess: () => {},
  playCardFlip: () => {},
  isAmbientPlaying: false,
  toggleAmbient: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscsRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Initialize AudioContext on first user interaction
  const getAudioContext = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Tactile subtle mechanical click (Rauno/Apple inspired)
  const playClick = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.025);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.028);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Soft round bubble pop for pill/tag toggle
  const playSoftPop = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // silently ignore
    }
  };

  // Tactile selection feedback (slightly deeper)
  const playSelect = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.065);
    } catch {
      // silently ignore
    }
  };

  // Card flip / step transition sound
  const playCardFlip = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.085);
    } catch {
      // silently ignore
    }
  };

  // Harmonious celebratory chime for RSVP completion
  const playSuccess = () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.08;
        const duration = 0.4;
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {
      // silently ignore
    }
  };

  // Generative Warm Ambient Drone Loop
  const startAmbient = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ambientOscsRef.current) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(216, ctx.currentTime); // A3 / 432Hz harmonic base
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(324, ctx.currentTime); // E4 fifth harmonic

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 2.5); // very gentle fade in

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      ambientOscsRef.current = { osc1, osc2, gain };
      setIsAmbientPlaying(true);
    } catch {
      // silently ignore
    }
  };

  const stopAmbient = () => {
    if (!ambientOscsRef.current || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const { osc1, osc2, gain } = ambientOscsRef.current;
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          osc1.stop();
          osc2.stop();
          osc1.disconnect();
          osc2.disconnect();
          gain.disconnect();
        } catch {
          // already stopped
        }
        ambientOscsRef.current = null;
        setIsAmbientPlaying(false);
      }, 1300);
    } catch {
      ambientOscsRef.current = null;
      setIsAmbientPlaying(false);
    }
  };

  const toggleAmbient = () => {
    if (isAmbientPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  };

  const toggleMute = () => {
    if (!isMuted && isAmbientPlaying) {
      stopAmbient();
    }
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick,
        playSoftPop,
        playSelect,
        playSuccess,
        playCardFlip,
        isAmbientPlaying,
        toggleAmbient,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundEffects = () => useContext(SoundContext);
