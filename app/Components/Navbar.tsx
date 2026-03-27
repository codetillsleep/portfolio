"use client";

import { useState, useEffect } from "react";
import { Menu, X, ExternalLink, Download } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <style>{`
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--th-name-grad-start) 0%, var(--th-name-grad-mid) 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          transition: opacity 0.25s ease;
        }
        .nav-logo:hover { opacity: 0.75; }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(167, 243, 208, 0.6);
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--th-dot-color);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--th-role-text); }
        .nav-link:hover::after { width: 100%; }

        .nav-resume {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 16px;
          border-radius: 9999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--th-btn-secondary-text);
          border: 1px solid var(--th-btn-secondary-border);
          background: rgba(52, 211, 153, 0.05);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .nav-resume:hover {
          background: var(--th-btn-secondary-hover-bg);
          border-color: var(--th-btn-secondary-hover-border);
          color: var(--th-badge-text);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px var(--th-btn-primary-glow);
        }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 9999px;
          border: 1px solid var(--th-social-border);
          background: var(--th-social-bg);
          color: rgba(167, 243, 208, 0.4);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .mobile-menu-btn:hover {
          border-color: var(--th-social-hover-border);
          background: var(--th-social-hover-bg);
          color: var(--th-social-hover-text);
        }

        .mobile-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: rgba(52, 211, 153, 0.25);
          letter-spacing: -0.02em;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .mobile-nav-link:hover { color: var(--th-role-text); }

        .mobile-menu {
          animation: mobileMenuIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (max-width: 767px) {
          .mobile-menu-btn  { display: flex; }
          .desktop-nav      { display: none !important; }
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-[999] select-none transition-all duration-500 ${
          isScrolled
            ? "bg-[#010705]/90 backdrop-blur-xl border-b border-[rgba(52,211,153,0.07)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          style={{ height: 64 }}
        >
          {/* Logo */}
          <a href="#hero" className="nav-logo">
            Home
          </a>

          {/* Desktop nav */}
          <div className="desktop-nav flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <a
              href="https://www.google.com/" // replace with your resume link
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume"
            >
              <ExternalLink className="w-3 h-3" />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile fullscreen menu */}
        {isMobileMenuOpen && (
          <div
            className="mobile-menu fixed inset-0 backdrop-blur-2xl flex flex-col px-8 pb-10"
            style={{
              top: 64,
              zIndex: 998,
              background: "rgba(2, 10, 7, 0.97)",
            }}
          >
            <div className="flex flex-col gap-8 flex-1 pt-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div
              className="pt-8"
              style={{ borderTop: "1px solid rgba(52, 211, 153, 0.08)" }}
            >
              <a
                href="/resume.pdf"
                download
                onClick={() => setIsMobileMenuOpen(false)}
                className="nav-resume w-full justify-center"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
