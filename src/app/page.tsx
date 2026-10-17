"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ScratchSecrets } from "@/components/ScratchSecrets";
import { Timeline } from "@/components/Timeline";
import { StoryCarousel } from "@/components/StoryCarousel";
import { DressCodeInspector } from "@/components/DressCodeInspector";
import { RSVPWizard } from "@/components/RSVPWizard";
import { EasterEgg } from "@/components/EasterEgg";
import { EpicIntro } from "@/components/EpicIntro";
import { WhatsAppHelpModal } from "@/components/WhatsAppHelpModal";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const handleReplayIntro = () => {
      setHasEntered(false);
      setShowIntro(true);
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("replay-epic-intro", handleReplayIntro);
    return () => window.removeEventListener("replay-epic-intro", handleReplayIntro);
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    // Guarantee the page is and remains at the very top
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 400);
      setTimeout(() => window.scrollTo(0, 0), 1200);
    }
  };

  return (
    <>
      {/* Epic Cinematic Entrance Experience */}
      {showIntro && <EpicIntro onEnter={handleEnter} />}

      <motion.main
        animate={{
          scale: hasEntered ? 1 : 0.98,
          filter: hasEntered ? "blur(0px)" : "blur(4px)",
          opacity: hasEntered ? 1 : 0.7,
        }}
        transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
        className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] selection:bg-[var(--accent-gold)] selection:text-black transition-colors duration-500"
      >
        {/* Hero Section with Kinetic Typography & Live Countdown */}
        <Hero />

        {/* Playful Chronogram with Venue Photos (Monforte & Veneno) */}
        <Timeline />

        {/* Story Carousel: Nuestro camino hasta la boda... */}
        <StoryCarousel />

        {/* Interactive Dress Code Inspector with Animated Josefina & Lucas Avatars */}
        <DressCodeInspector />

        {/* Scratch Card Minigame: Secret Backstories & Anecdotes */}
        <ScratchSecrets />

        {/* Gamified Multi-Step RSVP Form & Festival VIP Pass Generator */}
        <RSVPWizard />

        {/* Retro Konami Code & Mobile Secret Easter Egg */}
        <EasterEgg />

        {/* Global WhatsApp Help & Direct Contact Floating Modal */}
        <WhatsAppHelpModal />
      </motion.main>
    </>
  );
}
