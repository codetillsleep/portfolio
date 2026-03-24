"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Send,
  MapPin,
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
    handle: "@yourusername",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "Saksham Sharma",
    href: "https://linkedin.com/in/yourprofile",
    icon: Linkedin,
  },
  {
    label: "Email",
    handle: "your@email.com",
    href: "mailto:your@email.com",
    icon: Mail,
  },
  {
    label: "Twitter",
    handle: "Saksham Sharma",
    href: "https://linkedin.com/in/yourprofile",
    icon: Linkedin,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Replace with your actual form submission logic (e.g. Resend, EmailJS, Formspree)
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <style>{`
        /* ── Section ── */
        .contact-section {
          position: relative;
          background: #030712;
          padding: 90px 24px 120px;
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.2), transparent);
        }

        .contact-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(147,197,253,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147,197,253,0.03) 1px, transparent 1px);
          background-size: 90px 90px;
          pointer-events: none;
        }

        /* radial glow center */
        .contact-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(29,78,216,0.09) 0%, transparent 70%);
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
          max-width: 460px;
          line-height: 1.7;
        }

        /* ── Two-col layout ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        /* ── Left col ── */
        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-info-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px;
        }

        .info-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: #475569;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .info-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #e2e8f0;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-value svg {
          color: #93c5fd;
          flex-shrink: 0;
        }

        /* social links */
        .social-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .social-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .social-row:hover {
          border-color: rgba(147,197,253,0.25);
          background: rgba(147,197,253,0.05);
          transform: translateX(4px);
        }

        .social-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #475569;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .social-row:hover .social-icon {
          border-color: rgba(147,197,253,0.3);
          background: rgba(147,197,253,0.08);
          color: #93c5fd;
        }

        .social-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #cbd5e1;
          letter-spacing: -0.01em;
        }
        .social-handle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          color: #475569;
          letter-spacing: 0.01em;
        }

        .social-arrow {
          color: #334155;
          transition: all 0.25s ease;
        }
        .social-row:hover .social-arrow {
          color: #93c5fd;
          transform: translate(2px, -2px);
        }

        /* ── Right col: Form ── */
        .contact-form-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }

        /* subtle top glow on form card */
        .contact-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147,197,253,0.3), transparent);
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          color: #475569;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .form-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: #64748b;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .form-input,
        .form-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          color: #e2e8f0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #334155;
        }
        .form-input:focus,
        .form-textarea:focus {
          border-color: rgba(147,197,253,0.35);
          background: rgba(147,197,253,0.04);
        }

        .form-textarea {
          resize: none;
          height: 120px;
          line-height: 1.6;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr; }
        }

        .form-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px 24px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: #fff;
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
          background: linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .form-submit:hover:not(:disabled)::before { opacity: 1; }
        .form-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(37,99,235,0.4);
        }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
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
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 4px;
        }
        .sent-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }
        .sent-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: #64748b;
          line-height: 1.6;
          max-width: 280px;
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

        .col-anim {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .col-anim.visible { opacity: 1; transform: translateY(0); }
        .col-anim.left  { transition-delay: 0.1s; }
        .col-anim.right { transition-delay: 0.22s; }
      `}</style>

      <section id="contact" className="contact-section">
        <div className="contact-radial" />

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

          {/* Two-col grid */}
          <div className="contact-grid">
            {/* Left — info + socials */}
            <div
              className={`contact-left col-anim left ${inView ? "visible" : ""}`}
            >
              {/* Location card */}
              <div className="contact-info-card">
                <p className="info-label">Based in</p>
                <p className="info-value">
                  <MapPin style={{ width: 15, height: 15 }} />
                  India · Open to Remote
                </p>
              </div>

              {/* Socials */}
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
                        <Icon style={{ width: 14, height: 14 }} />
                      </div>
                      <div>
                        <p className="social-label">{label}</p>
                        <p className="social-handle">{handle}</p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="social-arrow"
                      style={{ width: 15, height: 15 }}
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

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </section>
    </>
  );
}
