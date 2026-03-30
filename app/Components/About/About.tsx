"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Code2, Server, Database, GitBranch } from "lucide-react";
import "./About.css";
import { skills, stats } from "@/app/constants/constants";
import user from "@/user.json";
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

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.08);
  const { ref: skillsRef, inView: skillsInView } = useInView(0.1);

  return (
    <>
      <section id="about" className="about-section">
        <div className="about-inner" ref={sectionRef}>
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
            <div className={`bio-card anim-up d2 ${inView ? "visible" : ""}`}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="bio-avatar">SS</div>
                <div className="bio-name-wrap">
                  <p className="bio-name">{user.name}</p>
                  <p className="bio-role">{user.role}</p>
                </div>
              </div>
              <div className="bio-divider" />
              <p className="bio-text">
                Hey! I'm a <strong>B.Tech student</strong> , currently in my{" "}
                <strong>4th semester</strong>. I love building things that live
                on the internet — from fast, reliable backend systems to clean,
                thoughtful interfaces.
              </p>
              <p className="bio-text">
                I'm deeply interested in <strong>system design</strong>,
                distributed systems, and developer tooling. When I'm not writing
                code, I'm probably reading some blogs, tinkering with a side
                project, exploring new frameworks or chilling with some coffee.
              </p>
              <p className="bio-text">
                I'm actively looking for{" "}
                <strong>internships and collaborations</strong> where I can
                contribute meaningfully and grow.
              </p>
              <a href="#contact" className="bio-cta">
                Let's connect
                <ArrowUpRight style={{ width: 14, height: 14 }} />
              </a>
            </div>

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
                  {user.currentActivities.map((item) => (
                    <div key={item} className="currently-item">
                      <span className="currently-dot" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="skills-wrap" ref={skillsRef}>
            {skills.map((skill, i) => (
              <div
                key={skill.category}
                className={`skill-card anim-up d${i + 1} ${skillsInView ? "visible" : ""}`}
              >
                <div className="skill-icon">
                  <skill.icon style={{ width: 15, height: 15 }} />
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
