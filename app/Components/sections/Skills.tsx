"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Server,
  Database,
  GitBranch,
  Globe,
  Terminal,
  Layers,
  Cpu,
} from "lucide-react";

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

const skillGroups = [
  {
    category: "Languages",
    icon: Code2,
    color: "rgba(147,197,253,0.9)",
    glow: "rgba(59,130,246,0.15)",
    skills: [
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 80 },
      { name: "Go", level: 60 },
      { name: "Java", level: 70 },
      { name: "C++", level: 65 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "rgba(167,243,208,0.9)",
    glow: "rgba(52,211,153,0.12)",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "FastAPI", level: 75 },
      { name: "Express", level: 82 },
      { name: "GraphQL", level: 65 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    color: "rgba(253,186,116,0.9)",
    glow: "rgba(251,146,60,0.12)",
    skills: [
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 70 },
      { name: "MySQL", level: 72 },
      { name: "Prisma", level: 75 },
    ],
  },
  {
    category: "DevOps",
    icon: Terminal,
    color: "rgba(216,180,254,0.9)",
    glow: "rgba(168,85,247,0.12)",
    skills: [
      { name: "Docker", level: 72 },
      { name: "Git", level: 90 },
      { name: "Linux", level: 75 },
      { name: "AWS", level: 55 },
      { name: "CI/CD", level: 60 },
    ],
  },
  {
    category: "Frontend",
    icon: Globe,
    color: "rgba(147,197,253,0.9)",
    glow: "rgba(59,130,246,0.15)",
    skills: [
      { name: "React", level: 80 },
      { name: "Next.js", level: 78 },
      { name: "Tailwind", level: 85 },
      { name: "HTML/CSS", level: 88 },
      { name: "Framer", level: 55 },
    ],
  },
  {
    category: "CS Fundamentals",
    icon: Cpu,
    color: "rgba(167,243,208,0.9)",
    glow: "rgba(52,211,153,0.12)",
    skills: [
      { name: "DSA", level: 75 },
      { name: "System Design", level: 65 },
      { name: "OOP", level: 85 },
      { name: "OS Concepts", level: 70 },
      { name: "Applied Maths", level: 80 },
    ],
  },
];

const tools = [
  "VS Code",
  "Postman",
  "Figma",
  "GitHub",
  "Notion",
  "Vercel",
  "Railway",
  "TablePlus",
  "Insomnia",
  "Warp",
  "iTerm2",
  "Obsidian",
  "Linear",
  "Slack",
  "Discord",
];

function SkillBar({
  name,
  level,
  color,
  delay,
  visible,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  visible: boolean;
}) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color.replace("0.9", "0.5")}, ${color})`,
            transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            boxShadow: visible
              ? `0 0 10px ${color.replace("0.9", "0.4")}`
              : "none",
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({
  group,
  index,
  visible,
}: {
  group: (typeof skillGroups)[0];
  index: number;
  visible: boolean;
}) {
  const Icon = group.icon;
  return (
    <div
      className="skill-card"
      style={
        {
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(36px)",
          transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
          "--card-glow": group.glow,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="skill-card-header">
        <div
          className="skill-card-icon"
          style={{
            color: group.color,
            borderColor: group.color.replace("0.9", "0.2"),
            background: group.glow,
          }}
        >
          <Icon style={{ width: 15, height: 15 }} />
        </div>
        <span className="skill-card-category">{group.category}</span>
      </div>

      {/* Bars */}
      <div className="skill-bars">
        {group.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={group.color}
            delay={index * 80 + i * 80}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref: headingRef, inView: headingInView } = useInView(0.2);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.05);
  const { ref: toolsRef, inView: toolsInView } = useInView(0.1);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .skills-section {
          position: relative;
          background: #030712;
          padding: 90px 24px 120px;
          overflow: hidden;
        }
        .skills-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.2), transparent);
        }
        .skills-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(147,197,253,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147,197,253,0.03) 1px, transparent 1px);
          background-size: 90px 90px;
          pointer-events: none;
        }

        .skills-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 40% at 20% 60%, rgba(29,78,216,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .skills-inner {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .skills-heading-wrap {
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
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: #64748b;
          max-width: 460px;
          line-height: 1.7;
        }

        /* ── Cards grid ── */
        .skill-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 900px) {
          .skill-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .skill-cards-grid { grid-template-columns: 1fr; }
        }

        /* ── Skill card ── */
        .skill-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition: border-color 0.35s ease, background 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, var(--card-glow, rgba(59,130,246,0.1)) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .skill-card:hover {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.035);
          transform: translateY(-4px);
        }
        .skill-card:hover::before { opacity: 1; }

        .skill-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .skill-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid;
          flex-shrink: 0;
        }

        .skill-card-category {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          color: #cbd5e1;
          letter-spacing: -0.01em;
        }

        /* ── Skill bars ── */
        .skill-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skill-bar-row {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .skill-bar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .skill-bar-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.775rem;
          font-weight: 400;
          color: #64748b;
          letter-spacing: 0.01em;
        }

        .skill-bar-pct {
          font-family: 'Syne', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .skill-bar-track {
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: 999px;
        }

        /* ── Tools strip ── */
        .tools-section {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 28px 32px;
          margin-top: 4px;
        }

        .tools-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: #334155;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 18px;
          text-align: center;
        }

        .tools-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .tool-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.775rem;
          font-weight: 400;
          color: #475569;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
          opacity: 0;
          transform: translateY(10px);
        }
        .tool-pill.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .tool-pill:hover {
          color: #93c5fd;
          border-color: rgba(147,197,253,0.25);
          background: rgba(147,197,253,0.06);
        }

        /* ── Heading anim ── */
        .h-anim {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .h-anim.visible { opacity: 1; transform: translateY(0); }
        .h-anim.d0 { transition-delay: 0s; }
        .h-anim.d1 { transition-delay: 0.1s; }
        .h-anim.d2 { transition-delay: 0.2s; }
      `}</style>

      <section id="skills" className="skills-section">
        <div className="skills-radial" />

        <div className="skills-inner">
          {/* Heading */}
          <div className="skills-heading-wrap" ref={headingRef}>
            <div
              className={`section-eyebrow h-anim d0 ${headingInView ? "visible" : ""}`}
            >
              <span className="eyebrow-line" />
              Tech Stack
              <span className="eyebrow-line" />
            </div>
            <h2
              className={`section-title h-anim d1 ${headingInView ? "visible" : ""}`}
            >
              Tools I <span>Work With</span>
            </h2>
            <p
              className={`section-subtitle h-anim d2 ${headingInView ? "visible" : ""}`}
            >
              A breakdown of the technologies and skills I use to build fast,
              reliable, and maintainable software.
            </p>
          </div>

          {/* Skill cards */}
          <div className="skill-cards-grid" ref={cardsRef}>
            {skillGroups.map((group, i) => (
              <SkillCard
                key={group.category}
                group={group}
                index={i}
                visible={cardsInView}
              />
            ))}
          </div>

          {/* Tools strip */}
          <div className="tools-section" ref={toolsRef}>
            <p className="tools-label">Tools & Environment</p>
            <div className="tools-wrap">
              {tools.map((tool, i) => (
                <span
                  key={tool}
                  className={`tool-pill ${toolsInView ? "visible" : ""}`}
                  style={{
                    transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s ease ${i * 40}ms, color 0.25s ease, border-color 0.25s ease, background 0.25s ease`,
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
