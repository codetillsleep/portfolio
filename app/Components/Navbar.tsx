"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download, ExternalLink } from "lucide-react";

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
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #94a3b8;
          letter-spacing: 0.03em;
          transition: color 0.3s ease;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #93c5fd;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #ffffff; }
        .nav-link:hover::after { width: 100%; }

        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.125rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #93c5fd 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: opacity 0.3s ease;
          text-decoration: none;
        }
        .nav-logo:hover { opacity: 0.8; }

        .nav-resume {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 9999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: #93c5fd;
          border: 1px solid rgba(147, 197, 253, 0.25);
          background: rgba(147, 197, 253, 0.06);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .nav-resume:hover {
          background: rgba(147, 197, 253, 0.14);
          border-color: rgba(147, 197, 253, 0.5);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.25);
        }

        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: #94a3b8;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .mobile-menu-btn:hover {
          border-color: rgba(147, 197, 253, 0.4);
          background: rgba(147, 197, 253, 0.08);
          color: #93c5fd;
        }

        .mobile-menu {
          animation: mobileMenuIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .mobile-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #475569;
          letter-spacing: -0.02em;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .mobile-nav-link:hover { color: #ffffff; }

        /* Hide mobile toggle on desktop, hide desktop links on mobile */
        .mobile-menu-btn { display: none; }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex; }
          .desktop-nav     { display: none; }
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          isScrolled
            ? "bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          style={{ height: 68 }}
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
              href="https://www.google.com/" // rememberto put your resume link
              target="_blank"
              className="nav-resume"
            >
              <ExternalLink className="w-3.5 h-3.5" />
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
            className="mobile-menu fixed inset-0 bg-[#030712]/98 backdrop-blur-2xl flex flex-col px-8 pb-10"
            style={{ top: 68, zIndex: 998 }}
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
            <div className="border-t border-white/[0.06] pt-8">
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
