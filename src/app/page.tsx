import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PhysicsGallery } from "@/components/PhysicsGallery";
import { Timeline } from "@/components/Timeline";
import { DressCodeInspector } from "@/components/DressCodeInspector";
import { RSVPWizard } from "@/components/RSVPWizard";
import { EasterEgg } from "@/components/EasterEgg";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] selection:bg-[var(--accent-gold)] selection:text-black transition-colors duration-500">
      {/* Top Glassmorphic Navigation */}
      <Header />

      {/* Hero Section with Kinetic Typography & Live Countdown */}
      <Hero />

      {/* Interactive 2D Matter.js Photo Gallery */}
      <PhysicsGallery />

      {/* Playful Chronogram with Venue Photos (Monforte & Veneno) */}
      <Timeline />

      {/* Interactive Dress Code Inspector with Animated Lucas & Josefina Avatars */}
      <DressCodeInspector />

      {/* Gamified Multi-Step RSVP Form & Digital Pass Generator */}
      <RSVPWizard />

      {/* Retro Konami Code & Mobile Secret Easter Egg */}
      <EasterEgg />

      {/* Minimalist Editorial Footer */}
      <Footer />
    </main>
  );
}
