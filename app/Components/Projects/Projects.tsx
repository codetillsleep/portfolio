"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { projects } from "@/app/constants/constants";
import "./Projects.css";

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
      <div className="featured-image-wrap">
        <div className="mockup-container">
          <BrowserMockup
            src={project.image}
            alt={project.title}
            hovered={hovered}
            liveUrl={project.live}
          />
        </div>
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
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon-link"
                aria-label="GitHub"
              >
                <Github style={{ width: 13, height: 13 }} />
              </a>
            )}

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
    </div>
  );
}

export default function Projects() {
  const { ref: headingRef, inView: headingInView } = useInView(0.2);

  return (
    <>
      <section id="projects" className="projects-section">
        <div className="projects-inner">
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
