"use client";

import { useState, useEffect } from "react";
import { Menu, X, ExternalLink, Download } from "lucide-react";
import { navLinks, ResumeLink } from "@/app/constants/constants";
import "./Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <a href="#hero" className="nav-logo">
            Home
          </a>

          <div className="desktop-nav flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <a
              href={ResumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume"
            >
              <ExternalLink className="w-3 h-3" />
              Resume
            </a>
          </div>

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
