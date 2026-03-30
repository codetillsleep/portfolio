"use client";
import { socials } from "@/app/constants/constants";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, MapPin } from "lucide-react";
import "./Contact.css";
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
