"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import user from "@/user.json";
import "./Hero.css";
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
      const orbA = sectionRef.current
        ? getComputedStyle(sectionRef.current)
            .getPropertyValue("--th-orb-a")
            .trim()
        : "rgba(147,197,253,0.15)";

      const base = orbA.replace(/,[^,)]+\)$/, ",");

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${base}${p.opacity})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${base}${0.06 * (1 - dist / 120)})`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="relative min-h-screen select-none flex items-center justify-center overflow-hidden"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          backgroundColor: "var(--th-bg)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--th-bg)", zIndex: 1 }}
        />

        <div
          className="absolute inset-0 noise-overlay pointer-events-none"
          style={{ opacity: "var(--th-noise-opacity)", zIndex: 2 }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-px divider-line"
          style={{ zIndex: 3 }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px divider-line"
          style={{ zIndex: 3 }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, var(--th-grid-color) 1px, transparent 1px),linear-gradient(to bottom, var(--th-grid-color) 1px, transparent 1px)`,
            backgroundSize: `var(--th-grid-size) var(--th-grid-size)`,
            zIndex: 3,
          }}
        />

        <div
          className="absolute top-8 left-8 w-12 h-12 border-l border-t pointer-events-none"
          style={{ borderColor: "var(--th-corner)", zIndex: 4 }}
        />
        <div
          className="absolute bottom-8 right-8 w-12 h-12 border-r border-b pointer-events-none"
          style={{ borderColor: "var(--th-corner)", zIndex: 4 }}
        />

        <div
          className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center"
          style={{
            paddingTop: 68,
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 60,
          }}
        >
          <div className="anim-1 inline-flex items-center gap-2 mb-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
              style={{
                fontFamily: "'DM Sans',sans-serif",
                background: "transparent",
                border: "1px solid #D4D4D4",
                color: "white",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                style={{
                  background: "var(--th-dot-color)",
                  boxShadow: "0 0 8px 2px var(--th-dot-glow)",
                }}
              />
              Available for Opportunities · 2026
            </span>
          </div>

          <h1 className="gradient-name text-5xl md:text-7xl lg:text-8xl mb-5 tracking-tight leading-none anim-2">
            Saksham
            <br />
            Sharma
          </h1>

          <div className="anim-3 flex items-center justify-center gap-3 mb-6">
            <div
              className="h-px w-10"
              style={{ background: "var(--th-rule-color)" }}
            />
            <p
              className="text-lg md:text-xl font-light tracking-wider uppercase"
              style={{
                fontFamily: "'DM Sans',sans-serif",
                color: "white",
              }}
            >
              {user.role}
            </p>
            <div
              className="h-px w-10"
              style={{ background: "var(--th-rule-color)" }}
            />
          </div>

          <div className="anim-4 flex flex-wrap items-center justify-center gap-2 mb-12">
            {["B.Tech · CSAM", "MERN", "Next.js"].map((tag) => (
              <span
                key={tag}
                className="tag-pill px-3 py-1 rounded-full border text-xs tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="anim-5 flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="#projects"
              className="btn-primary relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-medium tracking-wide"
            >
              <span className="relative z-10">View Projects</span>
            </a>
            <a
              href="#contact"
              className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide bg-white/5"
            >
              Get in Touch
            </a>
          </div>

          <div className="anim-6 flex items-center justify-center gap-3 mb-20">
            <a
              href="https://github.com/codetillsleep"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/saksham1864"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:saksham1864@gmail.com"
              className="social-link w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="anim-7 flex flex-col items-center gap-3">
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--th-scroll-text)" }}
            >
              Scroll
            </span>
            <div
              className="w-px h-10 relative overflow-hidden rounded-full"
              style={{ background: "var(--th-scroll-track)" }}
            >
              <div
                className="scroll-dot absolute top-0 left-0 w-full h-1/2 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, var(--th-scroll-runner-from), transparent)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
