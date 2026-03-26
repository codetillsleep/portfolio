"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
      // Extract base rgb from the rgba value so we can inject our own opacity
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        /* ──────────── Keyframes ──────────── */
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scrollPulse {
          0%,100% { opacity:.3; transform:translateY(0);   }
          50%      { opacity:.8; transform:translateY(6px); }
        }
        @keyframes borderGlow {
          0%,100% { box-shadow:0 0 0  0   var(--th-btn-primary-glow); }
          50%      { box-shadow:0 0 20px 2px var(--th-btn-primary-glow); }
        }
        @keyframes pickerIn {
          from { opacity:0; transform:translateY(8px) scale(.96); }
          to   { opacity:1; transform:translateY(0)   scale(1);   }
        }

        .anim-1 { animation:fadeSlideUp .8s cubic-bezier(.16,1,.3,1) .10s both; }
        .anim-2 { animation:fadeSlideUp .8s cubic-bezier(.16,1,.3,1) .25s both; }
        .anim-3 { animation:fadeSlideUp .8s cubic-bezier(.16,1,.3,1) .40s both; }
        .anim-4 { animation:fadeSlideUp .8s cubic-bezier(.16,1,.3,1) .55s both; }
        .anim-5 { animation:fadeSlideUp .8s cubic-bezier(.16,1,.3,1) .70s both; }
        .anim-6 { animation:fadeSlideUp .8s cubic-bezier(.16,1,.3,1) .85s both; }
        .anim-7 { animation:fadeIn 1s ease 1s both; }

        /* ── Colour token transitions ── */
        #hero, #hero * { transition-property: background-color, border-color, color, box-shadow, opacity; transition-duration: .45s; transition-timing-function: ease; }
        /* keep animations working */
        .gradient-name { transition: none !important; }

        /* ──────────── Name gradient ──────────── */
        .gradient-name {
          font-family:'Syne',sans-serif; font-weight:800;
          background: linear-gradient(
            135deg,
            var(--th-name-grad-start) 0%,
            var(--th-name-grad-mid)   40%,
            var(--th-name-grad-end)   70%,
            var(--th-name-grad-start) 100%
          );
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer 5s linear infinite;
        }

        /* ──────────── Buttons ──────────── */
        .btn-primary {
          position:relative; overflow:hidden;
          background: var(--th-btn-primary-bg);
          transition: transform .3s ease, box-shadow .3s ease !important;
          animation: borderGlow 3s ease-in-out infinite;
        }
        .btn-primary::before {
          content:''; position:absolute; inset:0;
          background: var(--th-btn-primary-bg2);
          opacity:0; transition:opacity .3s ease;
        }
        .btn-primary:hover::before { opacity:1; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px var(--th-btn-primary-shadow); }

        .btn-secondary {
          transition: transform .3s ease, border-color .3s ease, background .3s ease !important;
          border:1px solid var(--th-btn-secondary-border);
          color: var(--th-btn-secondary-text);
        }
        .btn-secondary:hover {
          border-color: var(--th-btn-secondary-hover-border);
          background:   var(--th-btn-secondary-hover-bg);
          transform:translateY(-2px);
        }

        /* ──────────── Socials ──────────── */
        .social-link {
          transition: transform .3s ease, border-color .3s ease, background .3s ease, color .3s ease !important;
          border:1px solid var(--th-social-border);
          background: var(--th-social-bg);
          color: var(--th-social-text);
        }
        .social-link:hover {
          border-color: var(--th-social-hover-border);
          background:   var(--th-social-hover-bg);
          color:        var(--th-social-hover-text);
          transform:translateY(-3px);
        }

        /* ──────────── Tags ──────────── */
        .tag-pill {
          transition: border-color .3s, background .3s, color .3s !important;
          background:   var(--th-tag-bg);
          border-color: var(--th-tag-border);
          color:        var(--th-tag-text);
        }
        .tag-pill:hover {
          background:   var(--th-tag-hover-bg);
          border-color: var(--th-tag-hover-border);
          color:        var(--th-tag-hover-text);
        }

        .scroll-dot { animation:scrollPulse 2s ease-in-out infinite; }

        .divider-line {
          background: var(--th-divider);
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
        }

        /* ═══════════════════════════════════════
           THEME SWITCHER
        ═══════════════════════════════════════ */
        .ts-wrap {
          position:fixed; bottom:28px; right:28px; z-index:9999;
          display:flex; flex-direction:column; align-items:flex-end; gap:10px;
          font-family:'DM Sans',sans-serif;
        }

        .ts-panel {
          display:flex; flex-direction:column; gap:3px;
          background: rgba(8,8,10,0.88);
          backdrop-filter: blur(28px) saturate(1.6);
          -webkit-backdrop-filter: blur(28px) saturate(1.6);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:18px; padding:10px;
          min-width:158px;
          max-height: 420px;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.04);
          animation: pickerIn .22s cubic-bezier(.16,1,.3,1) both;
        }
        .ts-panel::-webkit-scrollbar { display: none; }

        .ts-heading {
          font-size:9px; font-weight:500; letter-spacing:.18em;
          text-transform:uppercase; color:rgba(255,255,255,0.22);
          padding:4px 10px 6px;
        }

        .ts-option {
          display:flex; align-items:center; gap:9px;
          padding:7px 10px; border-radius:10px;
          cursor:pointer; border:none; background:transparent;
          width:100%; text-align:left;
          transition: background .18s ease !important;
        }
        .ts-option:hover   { background:rgba(255,255,255,0.06); }
        .ts-option.active  { background:rgba(255,255,255,0.10); }

        .ts-swatch {
          width:11px; height:11px; border-radius:50%; flex-shrink:0;
        }
        .ts-name {
          font-size:11.5px; font-weight:400; letter-spacing:.05em;
          color:rgba(255,255,255,0.55); text-transform:uppercase;
          transition: color .18s ease !important;
        }
        .ts-option.active .ts-name { color:rgba(255,255,255,0.92); font-weight:500; }

        .ts-btn {
          width:42px; height:42px; border-radius:50%;
          border:1px solid rgba(255,255,255,0.11);
          background:rgba(8,8,10,0.82);
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          transition:border-color .25s, transform .25s !important;
          box-shadow:0 8px 24px rgba(0,0,0,0.55);
        }
        .ts-btn:hover { border-color:rgba(255,255,255,0.22); transform:scale(1.07); }

        .ts-dot {
          width:17px; height:17px; border-radius:50%;
          transition: background .4s ease, box-shadow .4s ease !important;
        }
      `}</style>

      {/* ═══════ HERO SECTION ═══════ */}
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

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--th-bg-gradient)", zIndex: 1 }}
        />

        {/* Noise */}
        <div
          className="absolute inset-0 noise-overlay pointer-events-none"
          style={{ opacity: "var(--th-noise-opacity)", zIndex: 2 }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 30%, var(--th-orb-b) 0%, transparent 70%)`,
            zIndex: 2,
          }}
        />

        {/* Dividers */}
        <div
          className="absolute top-0 left-0 right-0 h-px divider-line"
          style={{ zIndex: 3 }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px divider-line"
          style={{ zIndex: 3 }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, var(--th-grid-color) 1px, transparent 1px),linear-gradient(to bottom, var(--th-grid-color) 1px, transparent 1px)`,
            backgroundSize: `var(--th-grid-size) var(--th-grid-size)`,
            zIndex: 3,
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-8 left-8 w-12 h-12 border-l border-t pointer-events-none"
          style={{ borderColor: "var(--th-corner)", zIndex: 4 }}
        />
        <div
          className="absolute bottom-8 right-8 w-12 h-12 border-r border-b pointer-events-none"
          style={{ borderColor: "var(--th-corner)", zIndex: 4 }}
        />

        {/* ── Content ── */}
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

          {/* Name */}
          <h1 className="gradient-name text-5xl md:text-7xl lg:text-8xl mb-5 tracking-tight leading-none anim-2">
            SAKSHAM
            <br />
            SHARMA
          </h1>

          {/* Role */}
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
              FullStack Developer
            </p>
            <div
              className="h-px w-10"
              style={{ background: "var(--th-rule-color)" }}
            />
          </div>

          {/* Pills */}
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

          {/* CTAs */}
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

          {/* Socials */}
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

          {/* Scroll */}
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
