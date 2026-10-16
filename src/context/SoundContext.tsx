"use client";

import React, { createContext, useContext, useState } from "react";

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
  isMuted: true,
  toggleMute: () => {},
  playClick: () => {},
  playSoftPop: () => {},
  playSelect: () => {},
  playSuccess: () => {},
  playCardFlip: () => {},
  isAmbientPlaying: false,
  toggleAmbient: () => {},
});

// Sound muted completely by default per user request
export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);

  const noop = () => {};

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute: () => setIsMuted((p) => !p),
        playClick: noop,
        playSoftPop: noop,
        playSelect: noop,
        playSuccess: noop,
        playCardFlip: noop,
        isAmbientPlaying: false,
        toggleAmbient: noop,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundEffects = () => useContext(SoundContext);
