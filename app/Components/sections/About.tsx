"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Code2, Server, Database, GitBranch } from "lucide-react";

function useInView(threshold = 0.12) {
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

const skills = [
  {
    category: "Languages",
    icon: Code2,
    items: ["TypeScript", "Python", "Go", "Java", "C++"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "FastAPI", "Express", "GraphQL", "REST"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma"],
  },
  {
    category: "DevOps & Tools",
    icon: GitBranch,
    items: ["Docker", "Git", "AWS", "Linux", "CI/CD"],
  },
];

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "2+", label: "Years Coding" },
  { value: "4th", label: "Semester" },
  { value: "∞", label: "Cups of Coffee" },
];

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.08);
  const { ref: skillsRef, inView: skillsInView } = useInView(0.1);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .about-section {
          position: relative;
          background: #030712;
          padding: 90px 24px 120px;
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.2), transparent);
        }

        .about-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(147,197,253,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147,197,253,0.03) 1px, transparent 1px);
          background-size: 90px 90px;
          pointer-events: none;
        }

        .about-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 55% 45% at 80% 30%, rgba(29,78,216,0.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .about-inner {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .about-heading-wrap {
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

        /* ── Main two-col ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-bottom: 28px;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; }
        }

        /* ── Bio card ── */
        .bio-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }
        .bio-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.2), transparent);
        }

        .bio-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          border: 1px solid rgba(147,197,253,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #fff;
          letter-spacing: -0.02em;
          flex-shrink: 0;
        }

        .bio-name-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .bio-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }
        .bio-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: #93c5fd;
          letter-spacing: 0.04em;
        }

        .bio-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .bio-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: #64748b;
          line-height: 1.8;
        }

        .bio-text strong {
          color: #94a3b8;
          font-weight: 500;
        }

        .bio-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #93c5fd;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: gap 0.25s ease, opacity 0.25s ease;
          margin-top: auto;
        }
        .bio-cta:hover { gap: 10px; opacity: 0.8; }

        /* ── Stats card ── */
        .stats-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          flex: 1;
        }

        .stat-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px 16px;
          background: rgba(255,255,255,0.02);
          text-align: center;
          transition: background 0.3s ease;
        }
        .stat-cell:hover {
          background: rgba(147,197,253,0.04);
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 0%, #93c5fd 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          color: #475569;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* currently section inside stats card */
        .currently-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .currently-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: #334155;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .currently-items {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .currently-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.825rem;
          font-weight: 300;
          color: #64748b;
        }
        .currently-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #93c5fd;
          flex-shrink: 0;
          opacity: 0.6;
        }

        /* ── Skills section ── */
        .skills-wrap {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .skills-wrap { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .skills-wrap { grid-template-columns: 1fr 1fr; }
        }

        .skill-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px 20px;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .skill-card:hover {
          border-color: rgba(147,197,253,0.2);
          background: rgba(147,197,253,0.03);
          transform: translateY(-3px);
        }

        .skill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 1px solid rgba(147,197,253,0.15);
          background: rgba(147,197,253,0.06);
          color: #93c5fd;
          margin-bottom: 14px;
        }

        .skill-category {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.825rem;
          color: #cbd5e1;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }

        .skill-items {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .skill-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          color: #475569;
          letter-spacing: 0.02em;
          transition: color 0.2s ease;
        }
        .skill-card:hover .skill-item { color: #64748b; }

        /* ── Animations ── */
        .anim-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .anim-up.visible { opacity: 1; transform: translateY(0); }
        .anim-up.d0 { transition-delay: 0s; }
        .anim-up.d1 { transition-delay: 0.08s; }
        .anim-up.d2 { transition-delay: 0.16s; }
        .anim-up.d3 { transition-delay: 0.24s; }
        .anim-up.d4 { transition-delay: 0.32s; }
        .anim-up.d5 { transition-delay: 0.40s; }
      `}</style>

      <section id="about" className="about-section">
        <div className="about-radial" />

        <div className="about-inner" ref={sectionRef}>
          {/* Heading */}
          <div className="about-heading-wrap">
            <div
              className={`section-eyebrow anim-up d0 ${inView ? "visible" : ""}`}
            >
              <span className="eyebrow-line" />
              About Me
              <span className="eyebrow-line" />
            </div>
            <h2
              className={`section-title anim-up d1 ${inView ? "visible" : ""}`}
            >
              The Person <span>Behind the Code</span>
            </h2>
            <p
              className={`section-subtitle anim-up d2 ${inView ? "visible" : ""}`}
            >
              A bit about who I am, what I enjoy building, and the tools I work
              with.
            </p>
          </div>

          {/* Bio + Stats */}
          <div className="about-grid">
            {/* Bio */}
            <div className={`bio-card anim-up d2 ${inView ? "visible" : ""}`}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="bio-avatar">SS</div>
                <div className="bio-name-wrap">
                  <p className="bio-name">Saksham Sharma</p>
                  <p className="bio-role">FullStack Developer</p>
                </div>
              </div>

              <div className="bio-divider" />

              <p className="bio-text">
                Hey! I'm a <strong>B.Tech student</strong> in Computer Science &
                Applied Mathematics, currently in my{" "}
                <strong>4th semester</strong>. I love building things that live
                on the internet — from fast, reliable backend systems to clean,
                thoughtful interfaces.
              </p>
              <p className="bio-text">
                I'm deeply interested in <strong>system design</strong>,
                distributed systems, and developer tooling. When I'm not writing
                code, I'm probably reading about it, tinkering with a side
                project, or exploring new frameworks.
              </p>
              <p className="bio-text">
                I'm actively looking for{" "}
                <strong>internships and collaborations</strong> where I can
                contribute meaningfully and grow alongside smart people.
              </p>

              <a href="#contact" className="bio-cta">
                Let's connect
                <ArrowUpRight style={{ width: 14, height: 14 }} />
              </a>
            </div>

            {/* Stats */}
            <div className={`stats-card anim-up d3 ${inView ? "visible" : ""}`}>
              <div className="stats-grid">
                {stats.map((s) => (
                  <div key={s.label} className="stat-cell">
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="currently-wrap">
                <p className="currently-label">Currently</p>
                <div className="currently-items">
                  {[
                    "Studying CS & Applied Mathematics",
                    "Building full-stack projects",
                    "Learning system design & DSA",
                    "Open to internship opportunities",
                  ].map((item) => (
                    <div key={item} className="currently-item">
                      <span className="currently-dot" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="skills-wrap" ref={skillsRef}>
            {skills.map((skill, i) => (
              <div
                key={skill.category}
                className={`skill-card anim-up d${i + 1} ${skillsInView ? "visible" : ""}`}
              >
                <div className="skill-icon">
                  <skill.icon style={{ width: 16, height: 16 }} />
                </div>
                <p className="skill-category">{skill.category}</p>
                <div className="skill-items">
                  {skill.items.map((item) => (
                    <span key={item} className="skill-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
