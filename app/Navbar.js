"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#ffffff",
      borderBottom: "1px solid #e8e8e8",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ width: 32, height: 32, objectFit: "contain" }} />
          <span style={{ fontSize: 17, fontWeight: 700, color: "#010048", letterSpacing: "0.2px" }}>
            TechSphere
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <NavLink href="/">Explore</NavLink>
          <a href="/new" style={{
            padding: "8px 18px",
            background: "#010048", color: "#ffffff",
            fontSize: 13, fontWeight: 600,
            textDecoration: "none", letterSpacing: "0.3px",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Write Post
          </a>
          <a href="/admin" title="Admin Login" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, marginLeft: 4,
            border: "1px solid #e8e8e8", color: "#999",
            textDecoration: "none",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#010048"; e.currentTarget.style.color = "#010048"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#999"; }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>
        </nav>

        {/* Mobile: right-side icons */}
        <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 8 }}>
          <a href="/admin" title="Admin Login" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36,
            border: "1px solid #e8e8e8", color: "#999",
            textDecoration: "none",
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center", gap: 5,
              width: 36, height: 36,
              border: "1px solid #e8e8e8", background: "none",
              cursor: "pointer", padding: 0,
            }}>
            <span style={{ display: "block", width: 16, height: 1.5, background: menuOpen ? "#010048" : "#555", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: menuOpen ? "#010048" : "#555", transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: menuOpen ? "#010048" : "#555", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          background: "#fff",
          borderTop: "1px solid #e8e8e8",
          padding: "12px 24px 20px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <a href="/" onClick={() => setMenuOpen(false)} style={{
            padding: "12px 0",
            fontSize: 14, fontWeight: 500, color: "#555",
            textDecoration: "none",
            borderBottom: "1px solid #f0f0f0",
          }}>Explore</a>
          <a href="/new" onClick={() => setMenuOpen(false)} style={{
            padding: "12px 0",
            fontSize: 14, fontWeight: 500, color: "#555",
            textDecoration: "none",
            borderBottom: "1px solid #f0f0f0",
          }}>Write Post</a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-nav  { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} style={{
      padding: "8px 14px",
      fontSize: 13, fontWeight: 500,
      color: "#555555", textDecoration: "none",
      transition: "color 0.15s",
    }}
    onMouseEnter={e => e.currentTarget.style.color = "#010048"}
    onMouseLeave={e => e.currentTarget.style.color = "#555555"}>
      {children}
    </a>
  );
}
