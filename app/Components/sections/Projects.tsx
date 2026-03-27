"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "Danta",
    featured: true,
    description:
      "A high-performance backend system built for scale. Handles millions of requests with sub-100ms latency using intelligent caching, queue-based processing, and microservice architecture. Designed to grow horizontally with zero-downtime deployments.",
    tags: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/yourusername/project-one",
    live: "https://project-one.vercel.app",
    image: "/projects/project-one.png",
  },
  {
    id: "02",
    title: "10gpa",
    featured: false,
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["Python", "Kafka", "FastAPI", "WebSockets"],
    github: "https://github.com/yourusername/project-two",
    live: "https://project-two.vercel.app",
    image: "/projects/2.png",
  },
  {
    id: "03",
    title: "Nexus",
    featured: false,
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["Python", "Kafka", "FastAPI", "WebSockets"],
    github: "https://github.com/yourusername/project-three",
    live: "https://project-three.vercel.app",
    image: "/projects/3.png",
  },
];

function useInView(threshold = 0.1) {
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

/* ─── Every project uses this horizontal card, flip=true mirrors it ─── */
function ProjectCard({
  project,
  index,
  flip,
}: {
  project: (typeof projects)[0];
  index: number;
  flip: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`featured-card${flip ? " featured-card--flip" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s,
                     transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      {/* Image side */}
      <div className="featured-image-wrap">
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
        <div
          className={`featured-image-overlay${flip ? " featured-image-overlay--flip" : ""}`}
        />
        <span className="project-number">{project.id}</span>

        {/* Featured pill only on first card */}
        {project.featured && (
          <span className="featured-pill">
            <span className="featured-dot" />
            Featured
          </span>
        )}
      </div>

      {/* Content side */}
      <div className="featured-body">
        <div className="card-top" style={{ marginBottom: 14 }}>
          <h3 className="featured-title">{project.title}</h3>
          <div className="card-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-icon-link"
              aria-label="GitHub"
            >
              <Github style={{ width: 13, height: 13 }} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon-link"
                aria-label="Live"
              >
                <ArrowUpRight style={{ width: 13, height: 13 }} />
              </a>
            )}
          </div>
        </div>

        <p className="featured-desc">{project.description}</p>

        <div className="tag-row" style={{ marginTop: "auto" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`card-glow featured-glow${flip ? " featured-glow--flip" : ""}`}
        style={{ opacity: hovered ? 1 : 0 }}
      />
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
          padding: 90px 24px 140px;
          overflow: hidden;
          background: var(--th-bg);
        }
        .projects-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--th-divider);
        }
        .projects-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, var(--th-grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--th-grid-color) 1px, transparent 1px);
          background-size: var(--th-grid-size) var(--th-grid-size);
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
          margin-bottom: 68px;
        }
        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: var(--th-dot-color);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .eyebrow-line {
          width: 26px; height: 1px;
          background: var(--th-rule-color);
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.25rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 14px;
        }
        .section-title span {
          background: linear-gradient(135deg, var(--th-name-grad-start) 0%, var(--th-name-grad-mid) 50%, var(--th-name-grad-end) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--th-role-text);
          opacity: 0.5;
          max-width: 440px;
          line-height: 1.75;
        }

        /* ── Layout: single column, full-width cards ── */
        .projects-layout {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ── Featured / horizontal card ── */
        .featured-card {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 320px;
          cursor: default;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--th-tag-border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.4s ease, background 0.4s ease,
                      transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        /* Flip: swap column order so image goes right, text goes left */
        .featured-card--flip {
          direction: rtl;
        }
        .featured-card--flip > * {
          direction: ltr;
        }

        .featured-card:hover {
          border-color: var(--th-tag-hover-border);
          background: rgba(255,255,255,0.03);
          transform: translateY(-5px);
        }

        @media (max-width: 768px) {
          .featured-card,
          .featured-card--flip {
            grid-template-columns: 1fr;
            direction: ltr;
          }
          .featured-card--flip > * { direction: ltr; }
        }

        /* ── Image panel ── */
        .featured-image-wrap {
          position: relative;
          overflow: hidden;
          background: #010f08;
          min-height: 280px;
        }
        .card-image {
          object-fit: cover;
          object-position: top;
        }

        /* Normal: fade right into content */
        .featured-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(2,10,7,0) 40%,
            rgba(2,10,7,0.88) 100%
          );
        }
        /* Flipped: fade left into content */
        .featured-image-overlay--flip {
          background: linear-gradient(
            to left,
            rgba(2,10,7,0) 40%,
            rgba(2,10,7,0.88) 100%
          );
        }

        @media (max-width: 768px) {
          .featured-image-wrap { min-height: 220px; }
          .featured-image-overlay,
          .featured-image-overlay--flip {
            background: linear-gradient(to bottom, rgba(2,10,7,0) 40%, rgba(2,10,7,0.88) 100%);
          }
        }

        /* ── Content panel ── */
        .featured-body {
          padding: 32px 30px 30px;
          display: flex;
          
          flex-direction: column;
          justify-content: center;
        }
        .featured-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.45rem;
          color: #e8fdf2;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }
        .featured-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: var(--th-role-text);
          opacity: 0.5;
          line-height: 1.8;
          margin-bottom: 22px;
          flex: 1;
        }

        /* ── Featured pill ── */
        .featured-pill {
          position: absolute;
          top: 14px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: var(--th-badge-text);
            : var(--th-badge-bg);
          backdrop-filter: blur(8px);
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid var(--th-badge-border);
          letter-spacing: 0.08em;
          z-index: 2;
        }
        .featured-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--th-dot-color);
          box-shadow: 0 0 6px var(--th-dot-glow);
          animation: featuredPulse 2s ease-in-out infinite;
        }
        @keyframes featuredPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }

        /* ── Shared elements ── */
        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }
        .card-links {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .card-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid var(--th-social-border);
          background: var(--th-social-bg);
          color: var(--th-social-text);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .card-icon-link:hover {
          border-color: var(--th-social-hover-border);
          background: var(--th-social-hover-bg);
          color: var(--th-social-hover-text);
          transform: translateY(-1px);
        }
        .project-number {
          position: absolute;
          top: 13px; left: 14px;
          z-index: 2;
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--th-badge-text);
          letter-spacing: 0.1em;
          background: rgba(2,10,7,0.65);
          backdrop-filter: blur(8px);
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid var(--th-badge-border);
          opacity: 0.75;
        }
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: auto;
        }
        .project-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: var(--th-tag-text);
          padding: 2px 9px;
          border-radius: 999px;
          border: 1px solid var(--th-tag-border);
          background: var(--th-tag-bg);
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
        }
        .featured-card:hover .project-tag {
          border-color: var(--th-tag-hover-border);
          color: var(--th-tag-hover-text);
        }

        /* ── Hover glow ── */
        .card-glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .featured-glow {
          background: radial-gradient(ellipse 50% 80% at 0% 50%, var(--th-btn-primary-glow) 0%, transparent 70%);
        }
        .featured-glow--flip {
          background: radial-gradient(ellipse 50% 80% at 100% 50%, var(--th-btn-primary-glow) 0%, transparent 70%);
        }

        /* ── CTA ── */
        .projects-cta {
          display: flex;
          justify-content: center;
          margin-top: 56px;
        }
        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--th-btn-secondary-text);
          text-decoration: none;
          padding: 11px 26px;
          border-radius: 999px;
          border: 1px solid var(--th-btn-secondary-border);
          background: transparent;
          letter-spacing: 0.03em;
          transition: all 0.3s ease;
        }
        .cta-link:hover {
          background: var(--th-btn-secondary-hover-bg);
          border-color: var(--th-btn-secondary-hover-border);
          color: var(--th-badge-text);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px var(--th-btn-primary-glow);
        }

        /* ── Heading animations ── */
        .heading-anim {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .heading-anim.visible { opacity: 1; transform: translateY(0); }
        .heading-anim.d1 { transition-delay: 0s; }
        .heading-anim.d2 { transition-delay: 0.1s; }
        .heading-anim.d3 { transition-delay: 0.2s; }
      `}</style>

      <section id="projects" className="projects-section">
        <div className="projects-inner">
          {/* ── Heading ── */}
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

          {/* ── Cards — all horizontal, alternating sides ── */}
          <div className="projects-layout">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                flip={index % 2 !== 0} /* 0=normal, 1=flip, 2=normal … */
              />
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="projects-cta">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              <Github style={{ width: 14, height: 14 }} />
              View all on GitHub
              <ArrowUpRight style={{ width: 13, height: 13 }} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
