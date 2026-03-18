"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.92)" : "#fff",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid #e2e2e7",
      transition: "background 0.2s",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        height: 58, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ width: 28, height: 28, objectFit: "contain" }} />
          <span style={{ fontSize: 16, fontWeight: 700, color: "#010048", letterSpacing: "-0.2px" }}>
            TechSphere
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink href="/">Explore</NavLink>
          <NavLink href="/topics">Topics</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/newsletter">Newsletter</NavLink>
          <div style={{ width: 1, height: 18, background: "#e2e2e7", margin: "0 10px" }} />
          <a href="/new" style={{
            padding: "7px 18px",
            background: "#010048",
            color: "#ffffff",
            fontSize: 13, fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.2px",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Write Post
          </a>
          <a href="/admin" title="Admin" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 34, height: 34, marginLeft: 6,
            border: "1px solid #e2e2e7",
            color: "#aeaeb2",
            textDecoration: "none",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#010048"; e.currentTarget.style.color = "#010048"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e2e7"; e.currentTarget.style.color = "#aeaeb2"; }}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
        </nav>

        {/* Mobile */}
        <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 8 }}>
          <a href="/new" style={{
            padding: "7px 14px",
            background: "#010048", color: "#fff",
            fontSize: 12, fontWeight: 600,
            textDecoration: "none",
          }}>Write</a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center", gap: 5,
              width: 36, height: 36,
              border: "1px solid #e2e2e7",
              background: menuOpen ? "#f5f5f7" : "none",
              cursor: "pointer", padding: 0,
              transition: "background 0.15s",
            }}>
            <span style={{ display: "block", width: 15, height: 1.5, background: "#1d1d1f", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 15, height: 1.5, background: "#1d1d1f", transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 15, height: 1.5, background: "#1d1d1f", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "#fff",
          borderTop: "1px solid #e2e2e7",
          padding: "8px 24px 16px",
        }}>
          {[
            { label: "Explore", href: "/" },
            { label: "Topics", href: "/topics" },
            { label: "About", href: "/about" },
            { label: "Newsletter", href: "/newsletter" },
            { label: "Admin", href: "/admin" },
          ].map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "13px 0",
              fontSize: 15, fontWeight: 500, color: "#1d1d1f",
              textDecoration: "none",
              borderBottom: "1px solid #f0f0f0",
            }}>
              {label}
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="#aeaeb2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} style={{
      padding: "6px 12px",
      fontSize: 13, fontWeight: 500,
      color: "#6e6e73",
      textDecoration: "none",
      transition: "color 0.15s, background 0.15s",
    }}
    onMouseEnter={e => { e.currentTarget.style.color = "#010048"; e.currentTarget.style.background = "#f5f5f7"; }}
    onMouseLeave={e => { e.currentTarget.style.color = "#6e6e73"; e.currentTarget.style.background = "transparent"; }}>
      {children}
    </a>
  );
}
