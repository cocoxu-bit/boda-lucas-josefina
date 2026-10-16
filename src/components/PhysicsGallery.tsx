"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { RefreshCw, Sparkles, Hand } from "lucide-react";
import { useSoundEffects } from "@/context/SoundContext";

interface PolaroidItem {
  id: string;
  caption: string;
  sub: string;
  color: string;
  imgUrl: string;
  rotation: number;
}

const POLAROIDS_DATA: PolaroidItem[] = [
  {
    id: "p1",
    caption: "Palacios de Monforte",
    sub: "Ceremonia • 13:00 H",
    color: "#18181b",
    imgUrl: "https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=600&q=80", // Valencia botanical / neoclassical garden
    rotation: -0.08,
  },
  {
    id: "p2",
    caption: "Veneno Bar",
    sub: "Cóctel Largo • Música",
    color: "#18181b",
    imgUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80", // Cocktails & atmospheric glassware
    rotation: 0.12,
  },
  {
    id: "p3",
    caption: "Lucas & Josefina",
    sub: "06 • 02 • 2027",
    color: "#18181b",
    imgUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", // Intimate modern couple portrait
    rotation: -0.04,
  },
  {
    id: "p4",
    caption: "Sin Protocolos",
    sub: "Dress Code: Arreglado Casual",
    color: "#18181b",
    imgUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", // Celebratory champagne / glassware
    rotation: 0.09,
  },
  {
    id: "p5",
    caption: "Valencia Ciudad",
    sub: "Luz de Febrero",
    color: "#18181b",
    imgUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=600&q=80", // Valencia architecture
    rotation: -0.11,
  },
];

export const PhysicsGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const bodiesRef = useRef<{ body: Matter.Body; item: PolaroidItem }[]>([]);
  const imagesMapRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [hasInteracted, setHasInteracted] = useState(false);
  const { playClick, playSoftPop } = useSoundEffects();

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth || 360;
    const height = 480;

    canvas.width = width;
    canvas.height = height;

    // Preload polaroid images
    POLAROIDS_DATA.forEach((item) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.imgUrl;
      imagesMapRef.current.set(item.id, img);
    });

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const Events = Matter.Events;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.85, scale: 0.001 },
    });
    engineRef.current = engine;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Static Boundaries (walls & floor)
    const wallOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { visible: false },
      friction: 0.3,
      restitution: 0.4,
    };

    const wallThickness = 60;
    const floor = Bodies.rectangle(width / 2, height + wallThickness / 2 - 4, width * 2, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2 - 100, width * 2, wallThickness, wallOptions);

    Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // Polaroid Card Bodies Dimensions
    const cardWidth = Math.min(138, width * 0.38);
    const cardHeight = cardWidth * 1.34;

    const newBodiesList: { body: Matter.Body; item: PolaroidItem }[] = [];

    POLAROIDS_DATA.forEach((item, idx) => {
      // Stagger initial drop positions
      const posX = (width / (POLAROIDS_DATA.length + 1)) * (idx + 1) + (Math.random() * 20 - 10);
      const posY = -60 - idx * 70;

      const body = Bodies.rectangle(posX, posY, cardWidth, cardHeight, {
        chamfer: { radius: 6 },
        restitution: 0.45,
        friction: 0.2,
        frictionAir: 0.018,
        angle: item.rotation,
        render: { visible: false }, // Custom drawn in afterRender
      });

      newBodiesList.push({ body, item });
      Composite.add(engine.world, body);
    });

    bodiesRef.current = newBodiesList;

    // Mouse & Touch Control
    const mouse = Mouse.create(canvas);
    // Adjust mouse pixel ratio for crisp coordinates
    mouse.pixelRatio = window.devicePixelRatio || 1;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Trigger soft audio feedback on drag interaction
    Events.on(mouseConstraint, "startdrag", () => {
      setHasInteracted(true);
      playSoftPop();
    });

    // Custom Canvas Render for Editorial Polaroid Styling
    Events.on(render, "afterRender", () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      bodiesRef.current.forEach(({ body, item }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Drop Shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 8;

        // Polaroid Frame (Ivory / Warm White paper texture)
        const bw = cardWidth;
        const bh = cardHeight;
        const radius = 6;

        ctx.fillStyle = "#faf8f5";
        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, radius);
        ctx.fill();

        // Reset shadow for inner elements
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Outer border
        ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Photo cutout inside polaroid
        const pad = bw * 0.07;
        const photoW = bw - pad * 2;
        const photoH = photoW * 0.95;
        const photoX = -bw / 2 + pad;
        const photoY = -bh / 2 + pad;

        const img = imagesMapRef.current.get(item.id);
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(photoX, photoY, photoW, photoH, 3);
          ctx.clip();
          ctx.drawImage(img, photoX, photoY, photoW, photoH);
          ctx.restore();
        } else {
          // Placeholder gradient while loading
          ctx.fillStyle = "#27272a";
          ctx.beginPath();
          ctx.roundRect(photoX, photoY, photoW, photoH, 3);
          ctx.fill();
        }

        // Inner photo subtle vignette/border
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(photoX, photoY, photoW, photoH);

        // Editorial Typography Caption on bottom frame
        const textY = photoY + photoH + 16;
        ctx.fillStyle = "#18181b";
        ctx.font = `600 ${Math.max(9, Math.round(bw * 0.072))}px "Plus Jakarta Sans", sans-serif`;
        ctx.textAlign = "left";
        ctx.fillText(item.caption, photoX, textY);

        ctx.fillStyle = "#71717a";
        ctx.font = `400 ${Math.max(7.5, Math.round(bw * 0.055))}px monospace`;
        ctx.fillText(item.sub, photoX, textY + 12);

        // Decorative Washi Tape on top edge
        ctx.fillStyle = "rgba(223, 177, 91, 0.4)"; // translucent gold tape
        ctx.fillRect(-18, -bh / 2 - 4, 36, 10);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.strokeRect(-18, -bh / 2 - 4, 36, 10);

        ctx.restore();
      });
    });

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current || !renderRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      canvas.width = newWidth;
      render.options.width = newWidth;
      Matter.Body.setPosition(floor, { x: newWidth / 2, y: height + wallThickness / 2 - 4 });
      Matter.Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: height / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [playSoftPop]);

  // Fling/Shake effect: impulse on all cards
  const shakePolaroids = () => {
    playClick();
    if (!bodiesRef.current) return;
    bodiesRef.current.forEach(({ body }) => {
      const forceX = (Math.random() - 0.5) * 0.04;
      const forceY = -0.05 - Math.random() * 0.05;
      Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
    });
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
        <div>
          <div className="flex items-center gap-1.5 font-mono-swiss text-[11px] uppercase tracking-widest text-[#dfb15b] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FÍSICAS 2D INTERACTIVAS</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white italic">
            El Moodboard de la Boda
          </h2>
          <p className="font-sans-ui text-xs text-zinc-400 mt-1 max-w-md">
            Toca, arrastra y lanza las polaroids. Jardines neoclásicos, la noche en Veneno y la atmósfera de nuestro día.
          </p>
        </div>

        {/* Shake & Hint controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!hasInteracted && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono-swiss text-zinc-400 animate-pulse">
              <Hand className="w-3 h-3 text-[#dfb15b]" />
              <span>Arrastra con el dedo</span>
            </div>
          )}
          <button
            onClick={shakePolaroids}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs font-mono-swiss text-zinc-300 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-[#dfb15b]" />
            <span>Agitar polaroids</span>
          </button>
        </div>
      </div>

      {/* Physics Canvas Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[480px] rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 overflow-hidden shadow-2xl backdrop-blur-md"
      >
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        />
        
        {/* Mobile touch hint overlay */}
        <div className="absolute bottom-3 left-4 pointer-events-none font-mono-swiss text-[9px] uppercase tracking-widest text-zinc-600">
          MATTER.JS RIGID BODY PHYSICS // 60 FPS
        </div>

        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />
      </div>
    </section>
  );
};
