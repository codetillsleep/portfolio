"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Send,
  MapPin,
  Twitter,
} from "lucide-react";

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

const socials = [
  {
    label: "GitHub",
    handle: "@codetillsleep",
    href: "https://github.com/codetillsleep",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "Saksham Sharma",
    href: "https://linkedin.com/in/saksham1864",
    icon: Linkedin,
  },
  {
    label: "Email",
    handle: "saksham1864@email.com",
    href: "mailto:saksham1864@email.com",
    icon: Mail,
  },
  {
    label: "Twitter",
    handle: "@codetillsleep",
    href: "https://twitter.com/codetillsleep",
    icon: Twitter,
  },
];

export default function Contact() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSent(true);
    } catch (err: any) {
      setError(err.message ?? "Failed to send. Try emailing directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Section ── */
        .contact-section {
          position: relative;
          background: var(--th-bg);
          padding: 90px 24px 120px;
          overflow: hidden;
        }
        .contact-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--th-divider);
        }
        .contact-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, var(--th-grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--th-grid-color) 1px, transparent 1px);
          background-size: var(--th-grid-size) var(--th-grid-size);
          pointer-events: none;
        }
        .contact-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 100%, var(--th-orb-a) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-inner {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .contact-heading-wrap {
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
        .eyebrow-line { width: 26px; height: 1px; background: var(--th-rule-color); }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 3.75rem);
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
          color: rgba(167, 243, 208, 0.35);
          max-width: 460px;
          line-height: 1.75;
        }

        /* ── Grid ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }

        /* ── Left col ── */
        .contact-left { display: flex; flex-direction: column; gap: 10px; }
        .contact-info-card {
          background: rgba(52, 211, 153, 0.025);
          border: 1px solid rgba(52, 211, 153, 0.09);
          border-radius: 16px;
          padding: 24px;
        }
        .info-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: rgba(52, 211, 153, 0.3);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .info-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #e8fdf2;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .info-value svg { color: var(--th-badge-text); flex-shrink: 0; }

        /* socials */
        .social-list { display: flex; flex-direction: column; gap: 7px; }
        .social-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          border-radius: 12px;
          border: 1px solid var(--th-social-border);
          background: var(--th-social-bg);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .social-row:hover {
          border-color: var(--th-social-hover-border);
          background: var(--th-social-hover-bg);
          transform: translateX(4px);
        }
        .social-left { display: flex; align-items: center; gap: 11px; }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid var(--th-social-border);
          background: var(--th-social-bg);
          color: var(--th-social-text);
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .social-row:hover .social-icon {
          border-color: var(--th-social-hover-border);
          background: var(--th-social-hover-bg);
          color: var(--th-social-hover-text);
        }
        .social-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(167, 243, 208, 0.7);
          letter-spacing: -0.01em;
        }
        .social-handle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          color: rgba(52, 211, 153, 0.3);
        }
        .social-arrow {
          color: rgba(52, 211, 153, 0.2);
          transition: all 0.25s ease;
        }
        .social-row:hover .social-arrow {
          color: var(--th-badge-text);
          transform: translate(2px, -2px);
        }

        /* ── Form card ── */
        .contact-form-card {
          background: rgba(52, 211, 153, 0.025);
          border: 1px solid rgba(52, 211, 153, 0.09);
          border-radius: 20px;
          padding: 34px;
          position: relative;
          overflow: hidden;
        }
        .contact-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(52,211,153,0.25), transparent);
        }
        .form-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #e8fdf2;
          letter-spacing: -0.02em;
          margin-bottom: 5px;
        }
        .form-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          color: rgba(167, 243, 208, 0.3);
          margin-bottom: 26px;
          line-height: 1.5;
        }
        .form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .form-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: rgba(52, 211, 153, 0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .form-input,
        .form-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          color: #e8fdf2;
          background: rgba(52, 211, 153, 0.03);
          border: 1px solid rgba(52, 211, 153, 0.1);
          border-radius: 10px;
          padding: 11px 15px;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .form-input::placeholder,
        .form-textarea::placeholder { color: rgba(52, 211, 153, 0.2); }
        .form-input:focus,
        .form-textarea:focus {
          border-color: rgba(52, 211, 153, 0.35);
          background: rgba(52, 211, 153, 0.05);
        }
        .form-textarea { resize: none; height: 118px; line-height: 1.65; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        @media (max-width: 540px) { .form-row { grid-template-columns: 1fr; } }

        .form-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 24px;
          border-radius: 999px;
          border: none;
          background: var(--th-btn-primary-bg);
          color: #d1fae5;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-top: 8px;
        }
        .form-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--th-btn-primary-bg2);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .form-submit:hover:not(:disabled)::before { opacity: 1; }
        .form-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px var(--th-btn-primary-shadow);
        }
        .form-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .form-submit span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        /* sent state */
        .sent-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 0 20px;
          gap: 12px;
        }
        .sent-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(52, 211, 153, 0.1);
          border: 1px solid rgba(52, 211, 153, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: #34d399;
          margin-bottom: 4px;
        }
        .sent-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #e8fdf2;
          letter-spacing: -0.02em;
        }
        .sent-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: rgba(167, 243, 208, 0.38);
          line-height: 1.6;
          max-width: 280px;
        }

        /* ── Animations ── */
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
        .col-anim {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .col-anim.visible { opacity: 1; transform: translateY(0); }
        .col-anim.left  { transition-delay: 0.1s; }
        .col-anim.right { transition-delay: 0.22s; }
      `}</style>

      <section id="contact" className="contact-section">
        {/* <div className="contact-radial" /> */}
        <div className="contact-inner" ref={sectionRef}>
          {/* Heading */}
          <div className="contact-heading-wrap">
            <div
              className={`section-eyebrow heading-anim d1 ${inView ? "visible" : ""}`}
            >
              <span className="eyebrow-line" />
              Get In Touch
              <span className="eyebrow-line" />
            </div>
            <h2
              className={`section-title heading-anim d2 ${inView ? "visible" : ""}`}
            >
              Let's <span>Work Together</span>
            </h2>
            <p
              className={`section-subtitle heading-anim d3 ${inView ? "visible" : ""}`}
            >
              Open to internships, collaborations, and interesting projects.
              Drop me a message — I usually reply within 24 hours.
            </p>
          </div>

          {/* Two-col */}
          <div className="contact-grid">
            {/* Left */}
            <div
              className={`contact-left col-anim left ${inView ? "visible" : ""}`}
            >
              <div className="contact-info-card">
                <p className="info-label">Based in</p>
                <p className="info-value">
                  <MapPin style={{ width: 14, height: 14 }} />
                  India · Open to Remote
                </p>
              </div>
              <div className="social-list">
                {socials.map(({ label, handle, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    className="social-row"
                  >
                    <div className="social-left">
                      <div className="social-icon">
                        <Icon style={{ width: 13, height: 13 }} />
                      </div>
                      <div>
                        <p className="social-label">{label}</p>
                        <p className="social-handle">{handle}</p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="social-arrow"
                      style={{ width: 14, height: 14 }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className={`col-anim right ${inView ? "visible" : ""}`}>
              <div className="contact-form-card">
                {sent ? (
                  <div className="sent-state">
                    <div className="sent-icon">✓</div>
                    <p className="sent-title">Message sent!</p>
                    <p className="sent-sub">
                      Thanks for reaching out. I'll get back to you as soon as
                      possible.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="form-title">Send a message</p>
                    <p className="form-subtitle">
                      Fill out the form and I'll get back to you shortly.
                    </p>
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Your name"
                            required
                            value={formState.name}
                            onChange={(e) =>
                              setFormState((s) => ({
                                ...s,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-input"
                            placeholder="your@email.com"
                            required
                            value={formState.email}
                            onChange={(e) =>
                              setFormState((s) => ({
                                ...s,
                                email: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-textarea"
                          placeholder="Tell me about your project, opportunity, or just say hi..."
                          required
                          value={formState.message}
                          onChange={(e) =>
                            setFormState((s) => ({
                              ...s,
                              message: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="form-submit"
                        disabled={sending}
                      >
                        <span>
                          {sending ? (
                            <>
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  animation: "spin 0.8s linear infinite",
                                }}
                              >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send style={{ width: 14, height: 14 }} />
                              Send Message
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
