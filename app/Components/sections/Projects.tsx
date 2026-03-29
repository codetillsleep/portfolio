"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "10gpa",
    featured: false,
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["Typescript", "Express", "MongoDB", "Redis"],
    github: "https://github.com/codetillsleep/notesapp2.0",
    live: "https://10gpa.in",
    image: "/projects/project-one.png",
  },
  {
    id: "02",
    title: "Nexus",
    featured: false,
    description:
      "Real-time data pipeline that ingests, transforms, and visualizes streaming events. Built with event-driven architecture and WebSocket connections for live dashboards.",
    tags: ["JavaScript", "Express", "MongoDB", "WebSockets"],
    github: "https://github.com/yourusername/project-three",

    image: "/projects/image.png",
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

function BrowserMockup({
  src,
  alt,
  hovered,
  liveUrl,
}: {
  src: string;
  alt: string;
  hovered: boolean;
  liveUrl?: string;
}) {
  const displayUrl = liveUrl
    ? liveUrl.replace(/^https?:\/\//, "")
    : `${alt.toLowerCase()}.app`;

  return (
    <div className="browser-mockup">
      {/* Browser chrome bar */}
      <div className="browser-bar">
        <div className="browser-dots">
          <span className="browser-dot dot-red" />
          <span className="browser-dot dot-yellow" />
          <span className="browser-dot dot-green" />
        </div>
        <div className="browser-address">
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: 0.35, flexShrink: 0 }}
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
          <span className="browser-url">{displayUrl}</span>
        </div>
        <div className="browser-actions">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: 0.2 }}
          >
            <path
              d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Screenshot — width/height let the image set its own natural ratio */}
      <div className="browser-viewport">
        <Image
          src={src}
          alt={alt}
          width={1280}
          height={800}
          sizes="(max-width: 768px) 100vw, 55vw"
          className="browser-screenshot"
          style={{
            transform: hovered
              ? "scale(1.025) translateY(-8px)"
              : "scale(1) translateY(0)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* <div className="browser-scanlines" /> */}
      </div>
    </div>
  );
}

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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s,
                     transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      }}
    >
      {/* Image / Browser Mockup side */}
      <div className="featured-image-wrap">
        <div className="mockup-container">
          <BrowserMockup
            src={project.image}
            alt={project.title}
            hovered={hovered}
            liveUrl={project.live}
          />
        </div>
        <span className="project-number">{project.id}</span>
      </div>

      {/* Content side */}
      <div className="featured-body">
        <div className="card-accent-line" />

        <div className="card-top">
          <div>
            <p className="card-eyebrow">Project {project.id}</p>
            <h3 className="featured-title">{project.title}</h3>
          </div>
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
                className="card-icon-link card-icon-link--live"
                aria-label="Live"
              >
                <ArrowUpRight style={{ width: 13, height: 13 }} />
              </a>
            )}
          </div>
        </div>

        <p className="featured-desc">{project.description}</p>

        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="view-project-btn"
          >
            View Project <ArrowUpRight style={{ width: 12, height: 12 }} />
          </a>
        )}
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

        /* ── Layout ── */
        .projects-layout {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        /* ── Featured / horizontal card ── */
        .featured-card {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          min-height: 340px;
          cursor: default;
          background: rgba(255,255,255,0.018);
          border: 1px solid var(--th-tag-border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.4s ease, background 0.4s ease,
                      transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s ease;
        }
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
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }

        @media (max-width: 768px) {
          .featured-card,
          .featured-card--flip {
            grid-template-columns: 1fr;
            direction: ltr;
          }
        }

        /* ── Image / Mockup panel ── */
        .featured-image-wrap {
          position: relative;
          overflow: hidden;
          background: #060f0a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 16px 0 20px;
        }
        .featured-card--flip .featured-image-wrap {
          padding: 20px 20px 0 16px;
        }
        .mockup-container {
          width: 100%;
          align-self: flex-end; /* mockup sits at bottom, chrome at top */
        }
        .browser-mockup {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.5),
            0 8px 32px rgba(0,0,0,0.5),
            0 2px 8px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.06);
          background: #111;
        }

        /* Browser chrome bar */
        .browser-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 10px;
          background: #1a1a1a;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          min-height: 28px;
        }
        .browser-dots {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .browser-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
        }
        .dot-red    { background: #ff5f57; }
        .dot-yellow { background: #febc2e; }
        .dot-green  { background: #28c840; }

        .browser-address {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 5px;
          padding: 2px 8px;
          max-width: 260px;
          margin: 0 auto;
        }
        .browser-lock {
          font-size: 0.5rem;
          color: rgba(255,255,255,0.25);
          transform: scaleX(-1);
          display: inline-block;
        }
        .browser-url {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          font-size: 0.6rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .browser-actions {
          flex-shrink: 0;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.2);
        }
        .browser-reload {
          display: inline-block;
          width: 16px;
          text-align: center;
        }

        /* Browser viewport (screenshot area) */
        .browser-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #0a0f0c;
          line-height: 0; /* remove inline-block gap under img */
        }
        .browser-screenshot {
          width: 100% !important;
          height: auto !important;
          display: block;
          object-fit: cover;
          object-position: top center;
        }
        .browser-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Project number badge */
        .project-number {
          position: absolute;
          top: 12px; left: 12px;
          z-index: 2;
          font-family: 'Syne', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--th-badge-text);
          letter-spacing: 0.1em;
          background: rgba(2,10,7,0.75);
          backdrop-filter: blur(8px);
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid var(--th-badge-border);
          opacity: 0.75;
        }

        /* ── Content panel ── */
        .featured-body {
          padding: 32px 30px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          border-left: 1px solid rgba(255,255,255,0.04);
        }
        .featured-card--flip .featured-body {
          border-left: none;
          border-right: 1px solid rgba(255,255,255,0.04);
        }

        .card-accent-line {
          width: 28px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--th-name-grad-start), var(--th-name-grad-end));
          margin-bottom: 16px;
          opacity: 0.7;
        }

        .card-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          color: var(--th-dot-color);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 4px;
          opacity: 0.7;
        }

        .featured-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.55rem;
          color: #e8fdf2;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 0;
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 16px;
        }
        .card-links {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          margin-top: 4px;
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
        .card-icon-link--live:hover {
          box-shadow: 0 4px 14px var(--th-btn-primary-glow);
        }

        .featured-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: var(--th-role-text);
          opacity: 0.5;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 20px;
        }
        .project-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          font-weight: 500;
          color: var(--th-tag-text);
          padding: 3px 10px;
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

        /* View project CTA */
        .view-project-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--th-dot-color);
          text-decoration: none;
          letter-spacing: 0.04em;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.2s ease;
          width: fit-content;
        }
        .featured-card:hover .view-project-btn {
          opacity: 1;
          transform: translateX(0);
        }
        .view-project-btn:hover {
          color: #e8fdf2;
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
          background: radial-gradient(ellipse 55% 80% at 0% 50%, var(--th-btn-primary-glow) 0%, transparent 70%);
        }
        .featured-glow--flip {
          background: radial-gradient(ellipse 55% 80% at 100% 50%, var(--th-btn-primary-glow) 0%, transparent 70%);
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

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .featured-card,
          .featured-card--flip {
            grid-template-columns: 1fr;
            direction: ltr;
          }
          .featured-card--flip > * { direction: ltr; }
          .featured-image-wrap,
          .featured-card--flip .featured-image-wrap {
            padding: 16px;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.04);
          }
          .featured-body,
          .featured-card--flip .featured-body {
            border-left: none;
            border-right: none;
          }
          .view-project-btn {
            opacity: 1;
            transform: translateX(0);
          }
        }
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

          {/* ── Cards ── */}
          <div className="projects-layout">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                flip={index % 2 !== 0}
              />
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="projects-cta">
            <a
              href="https://github.com/codetillsleep"
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
