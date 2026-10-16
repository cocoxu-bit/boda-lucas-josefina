"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PhysicsGallery } from "@/components/PhysicsGallery";
import { ScratchSecrets } from "@/components/ScratchSecrets";
import { Timeline } from "@/components/Timeline";
import { DressCodeInspector } from "@/components/DressCodeInspector";
import { RSVPWizard } from "@/components/RSVPWizard";
import { EasterEgg } from "@/components/EasterEgg";
import { Footer } from "@/components/Footer";
import { EpicIntro } from "@/components/EpicIntro";
import { WhatsAppHelpModal } from "@/components/WhatsAppHelpModal";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const handleReplayIntro = () => {
      setHasEntered(false);
      setShowIntro(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("replay-epic-intro", handleReplayIntro);
    return () => window.removeEventListener("replay-epic-intro", handleReplayIntro);
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
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
        {/* Top Glassmorphic Navigation */}
        <Header />

        {/* Hero Section with Kinetic Typography & Live Countdown */}
        <Hero />

        {/* Interactive 2D Matter.js Photo Gallery with Reset Button */}
        <PhysicsGallery />

        {/* Scratch Card Minigame: Secret Backstories & Anecdotes */}
        <ScratchSecrets />

        {/* Playful Chronogram with Venue Photos (Monforte & Veneno) */}
        <Timeline />

        {/* Interactive Dress Code Inspector with Animated Lucas & Josefina Avatars */}
        <DressCodeInspector />

        {/* Gamified Multi-Step RSVP Form & Festival VIP Pass Generator */}
        <RSVPWizard />

        {/* Retro Konami Code & Mobile Secret Easter Egg */}
        <EasterEgg />

        {/* Minimalist Editorial Footer with Cryptic Hint & Replay Button */}
        <Footer />

        {/* Global WhatsApp Help & Direct Contact Floating Modal */}
        <WhatsAppHelpModal />
      </motion.main>
    </>
  );
}
