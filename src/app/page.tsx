import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PhysicsGallery } from "@/components/PhysicsGallery";
import { Timeline } from "@/components/Timeline";
import { RSVPWizard } from "@/components/RSVPWizard";
import { EasterEgg } from "@/components/EasterEgg";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-[#f4f4f6] selection:bg-[#dfb15b] selection:text-black">
      {/* Top Glassmorphic Navigation */}
      <Header />

      {/* Hero Section with Kinetic Typography & Live Countdown */}
      <Hero />

      {/* Interactive 2D Matter.js Photo Gallery */}
      <PhysicsGallery />

      {/* Logistics & Chronogram with Tracing Beam & Detail Cards */}
      <Timeline />

      {/* Gamified Multi-Step RSVP Form & Digital Pass Generator */}
      <RSVPWizard />

      {/* Retro Konami Code & Mobile Secret Easter Egg */}
      <EasterEgg />

      {/* Minimalist Editorial Footer */}
      <Footer />
    </main>
  );
}
