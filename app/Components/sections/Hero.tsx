"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.opacity})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(147,197,253,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 0.8; transform: translateY(6px); }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(147,197,253,0); }
          50%       { box-shadow: 0 0 20px 2px rgba(147,197,253,0.15); }
        }

        .anim-1 { animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.10s both; }
        .anim-2 { animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .anim-3 { animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.40s both; }
        .anim-4 { animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .anim-5 { animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.70s both; }
        .anim-6 { animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.85s both; }
        .anim-7 { animation: fadeIn 1s ease 1s both; }

        .gradient-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #e0f2fe 70%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          transition: all 0.3s ease;
          animation: borderGlow 3s ease-in-out infinite;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(37,99,235,0.4); }

        .btn-secondary {
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .btn-secondary:hover {
          border-color: rgba(147,197,253,0.4);
          background: rgba(147,197,253,0.08);
          transform: translateY(-2px);
        }

        .social-link {
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .social-link:hover {
          border-color: rgba(147,197,253,0.4);
          background: rgba(147,197,253,0.1);
          transform: translateY(-3px);
          color: #93c5fd;
        }

        .tag-pill { transition: all 0.3s ease; }
        .tag-pill:hover {
          background: rgba(147,197,253,0.12);
          border-color: rgba(147,197,253,0.3);
          color: #93c5fd;
        }

        .scroll-dot { animation: scrollPulse 2s ease-in-out infinite; }

        .divider-line {
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.3), transparent);
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
        }

        .radial-glow {
          background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(37,99,235,0.12) 0%, transparent 70%);
        }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center bg-[#030712] overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Backgrounds */}
        <div className="absolute inset-0 bg-linear-to-b from-gray-950 via-black to-gray-950" />
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        {/* Rules */}
        <div className="absolute top-0 left-0 right-0 h-px divider-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px divider-line" />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(147,197,253,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(147,197,253,0.04) 1px, transparent 1px)`,
            backgroundSize: "90px 90px",
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-blue-400/20 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-blue-400/20 pointer-events-none" />

        {/* ── Content — padded top so it never touches the navbar ── */}
        <div
          className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center"
          style={{
            paddingTop: 68,
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 60,
          }}
        >
          {/* Badge */}
          <div className="anim-1 inline-flex items-center gap-2 mb-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block animate-pulse" />
              Available for Opportunities · 2026
            </span>
          </div>

          {/* Name */}
          <h1 className="gradient-name text-5xl md:text-7xl lg:text-8xl mb-5 tracking-tight leading-none anim-2">
            Saksham
            <br />
            Sharma
          </h1>

          {/* Role */}
          <div className="anim-3 flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-blue-400/40" />
            <p
              className="text-lg md:text-xl text-slate-300 font-light tracking-wider uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              FullStack Developer
            </p>
            <div className="h-px w-10 bg-blue-400/40" />
          </div>

          {/* Pills */}
          <div className="anim-4 flex flex-wrap items-center justify-center gap-2 mb-12">
            {["B.Tech · CSAM", "MERN", "Next.js"].map((tag) => (
              <span
                key={tag}
                className="tag-pill px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="anim-5 flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="#projects"
              className="btn-primary relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-medium tracking-wide"
            >
              <span className="relative z-10">View Projects</span>
            </a>
            <a
              href="#contact"
              className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-slate-300 text-sm font-medium tracking-wide bg-white/5"
            >
              Get in Touch
            </a>
          </div>

          {/* Socials */}
          <div className="anim-6 flex items-center justify-center gap-3 mb-20">
            <a
              href="https://github.com/codetillsleep"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/saksham1864"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:saksham1864@gmail.com"
              className="social-link w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="anim-7 flex flex-col items-center gap-3 text-slate-600">
            <span className="text-[10px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="w-px h-10 relative overflow-hidden bg-slate-800 rounded-full">
              <div className="scroll-dot absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-400/60 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
