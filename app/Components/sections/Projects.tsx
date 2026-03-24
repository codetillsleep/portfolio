"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "noname",
    description:
      "A high-performance backend system built for scale. Handles millions of requests with sub-100ms latency using intelligent caching, queue-based processing, and microservice architecture.",
    tags: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/yourusername/project-one",
    live: "https://project-one.vercel.app",
    image: "/projects/project-one.png", // place your image in /public/projects/
  },
  {
    id: "02",
    title: "10gpa.in",
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["Python", "Kafka", "FastAPI", "WebSockets"],
    github: "https://github.com/yourusername/project-two",
    live: "https://project-two.vercel.app",
    image: "/projects/2.png",
  },
  {
    id: "03",
    title: "10gpa.in",
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["Python", "Kafka", "FastAPI", "WebSockets"],
    github: "https://github.com/yourusername/project-two",
    live: "https://project-two.vercel.app",
    image: "/projects/2.png",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
    >
      {/* ── Image preview ── */}
      <div className="card-image-wrap">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="card-image"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* overlay so image doesn't overpower */}
        <div className="card-image-overlay" />

        {/* number badge on image */}
        <span className="project-number">{project.id}</span>
      </div>

      {/* ── Card body ── */}
      <div className="card-body">
        {/* title + links row */}
        <div className="card-top">
          <h3 className="project-title">{project.title}</h3>
          <div className="card-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-icon-link"
              aria-label="GitHub"
            >
              <Github style={{ width: 14, height: 14 }} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon-link"
                aria-label="Live"
              >
                <ArrowUpRight style={{ width: 14, height: 14 }} />
              </a>
            )}
          </div>
        </div>

        {/* description */}
        <p className="project-desc">{project.description}</p>

        {/* tags */}
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* hover glow */}
      <div className="card-glow" style={{ opacity: hovered ? 1 : 0 }} />
    </div>
  );
}

export default function Projects() {
  const { ref: headingRef, inView: headingInView } = useInView(0.2);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .projects-section {
          position: relative;
          background: #030712;
          padding: 90px 24px 140px;
          overflow: hidden;
        }

        .projects-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.2), transparent);
        }

        .projects-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(147,197,253,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147,197,253,0.03) 1px, transparent 1px);
          background-size: 90px 90px;
          pointer-events: none;
        }

        .projects-inner {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .projects-heading-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 72px;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: #93c5fd;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .eyebrow-line {
          width: 28px;
          height: 1px;
          background: rgba(147,197,253,0.4);
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 3.75rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 16px;
        }
        .section-title span {
          background: linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #e0f2fe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: #64748b;
          max-width: 480px;
          line-height: 1.7;
          letter-spacing: 0.01em;
        }

        /* ── Grid ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .project-card {
          position: relative;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: border-color 0.4s ease, background 0.4s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
        }
        .project-card:hover {
          border-color: rgba(147,197,253,0.2);
          background: rgba(147,197,253,0.025);
          transform: translateY(-6px);
        }

        /* ── Image ── */
        .card-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0a0f1e;
          /* bottom corners stay square, top corners match card */
          border-radius: 0;
        }

        .card-image {
          object-fit: cover;
          object-position: top;
        }

        /* dark gradient over image bottom so body blends in */
        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(3,7,18,0) 40%,
            rgba(3,7,18,0.7) 100%
          );
        }

        /* project number — top-left over image */
        .project-number {
          position: absolute;
          top: 14px;
          left: 16px;
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(147,197,253,0.6);
          letter-spacing: 0.12em;
          background: rgba(3,7,18,0.6);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(147,197,253,0.15);
        }

        /* live badge — top-right over image */
        .live-badge {
          position: absolute;
          top: 14px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: #86efac;
          background: rgba(3,7,18,0.6);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(134,239,172,0.2);
          text-decoration: none;
          letter-spacing: 0.06em;
          transition: all 0.25s ease;
        }
        .live-badge:hover {
          background: rgba(134,239,172,0.1);
          border-color: rgba(134,239,172,0.4);
        }
        .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px rgba(74,222,128,0.8);
          animation: livePulse 2s ease-in-out infinite;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── Card body ── */
        .card-body {
          padding: 24px 28px 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        .project-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        .card-links {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
        }

        .card-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #475569;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .card-icon-link:hover {
          border-color: rgba(147,197,253,0.4);
          background: rgba(147,197,253,0.1);
          color: #93c5fd;
          transform: translateY(-2px);
        }

        .project-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: #64748b;
          line-height: 1.75;
          margin-bottom: 20px;
          flex: 1;
        }

        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        .project-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: #475569;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
        }
        .project-card:hover .project-tag {
          border-color: rgba(147,197,253,0.15);
          color: #64748b;
        }

        /* ── Hover glow ── */
        .card-glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%);
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        /* ── CTA ── */
        .projects-cta {
          display: flex;
          justify-content: center;
          margin-top: 60px;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: #93c5fd;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 999px;
          border: 1px solid rgba(147,197,253,0.22);
          background: rgba(147,197,253,0.06);
          letter-spacing: 0.03em;
          transition: all 0.3s ease;
        }
        .cta-link:hover {
          background: rgba(147,197,253,0.14);
          border-color: rgba(147,197,253,0.45);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(37,99,235,0.2);
        }

        /* ── Heading animations ── */
        .heading-anim {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .heading-anim.visible { opacity: 1; transform: translateY(0); }
        .heading-anim.d1 { transition-delay: 0s; }
        .heading-anim.d2 { transition-delay: 0.1s; }
        .heading-anim.d3 { transition-delay: 0.2s; }
      `}</style>

      <section id="projects" className="projects-section">
        <div className="projects-inner">
          {/* Heading */}
          <div className="projects-heading-wrap" ref={headingRef}>
            <div
              className={`section-eyebrow heading-anim d1 ${headingInView ? "visible" : ""}`}
            >
              <span className="eyebrow-line" />
              Selected Work
              <span className="eyebrow-line" />
            </div>
            <h2
              className={`section-title heading-anim d2 ${headingInView ? "visible" : ""}`}
            >
              Things I've <span>Built</span>
            </h2>
            <p
              className={`section-subtitle heading-anim d3 ${headingInView ? "visible" : ""}`}
            >
              A collection of projects spanning backend systems, developer
              tools, and full-stack applications.
            </p>
          </div>

          {/* Cards */}
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="projects-cta">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              <Github style={{ width: 15, height: 15 }} />
              View all on GitHub
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
