"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    setDateStr(new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.96)" : "#FFFFFF",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "background 0.2s, box-shadow 0.2s",
      boxShadow: scrolled ? "0 2px 12px rgba(1,0,72,0.08)" : "none",
    }}>

      {/* ── Top dateline strip ── */}
      <div style={{ background: "#010048", padding: "6px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.8px", fontFamily: "var(--font-sans)", fontWeight: 500 }}>{dateStr}</span>
          <span className="nav-dateline-center" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600 }}>Open Tech Publication</span>
          <a href="/newsletter" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", textDecoration: "none", fontFamily: "var(--font-sans)", fontWeight: 500, transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            Subscribe to Newsletter →
          </a>
        </div>
      </div>

      {/* ── Masthead rule: thick + thin ── */}
      <div style={{ height: 4, background: "#010048" }} />
      <div style={{ height: 1, background: "#D2D2D7" }} />

      {/* ── Main masthead bar ── */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #E8E8ED",
      }}>

        {/* Wordmark */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo/logo.png" alt="TechSphere" style={{ width: 30, height: 30, objectFit: "contain" }} />
            <div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 22, fontWeight: 800,
                color: "#010048", letterSpacing: "-0.5px",
                lineHeight: 1,
              }}>TechSphere</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 8, color: "#A1A1A6", letterSpacing: "2px", textTransform: "uppercase", marginTop: 1 }}>
                Tech & Innovation
              </div>
            </div>
          </div>
        </a>

        {/* Desktop nav tabs */}
        <NavTabs />

        {/* Desktop actions */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="/new" style={{
            padding: "8px 18px",
            background: "#010048",
            color: "#ffffff",
            fontSize: 12, fontWeight: 700,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            transition: "opacity 0.15s, transform 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Write Post
          </a>
          <a href="/admin" title="Admin" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 34, height: 34,
            border: "1px solid #E8E8ED",
            color: "#A1A1A6",
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#010048"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#010048"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#A1A1A6"; e.currentTarget.style.borderColor = "#E8E8ED"; }}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 8 }}>
          <a href="/new" style={{
            padding: "7px 16px",
            background: "#010048", color: "#fff",
            fontSize: 11, fontWeight: 700,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}>Write</a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center", gap: 5,
              width: 36, height: 36,
              border: "1px solid #E8E8ED",
              background: menuOpen ? "#010048" : "none",
              cursor: "pointer", padding: 0,
              transition: "background 0.15s, border-color 0.15s",
            }}>
            <span style={{ display: "block", width: 15, height: 1.5, background: menuOpen ? "#fff" : "#010048", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 15, height: 1.5, background: menuOpen ? "#fff" : "#010048", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: 15, height: 1.5, background: menuOpen ? "#fff" : "#010048", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "#FFFFFF",
          borderTop: "3px solid #010048",
          padding: "4px 24px 16px",
        }}>
          {[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Topics", href: "/topics" },
            { label: "About", href: "/about" },
            { label: "Newsletter", href: "/newsletter" },
            { label: "Admin", href: "/admin" },
          ].map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0",
              fontFamily: "var(--font-sans)",
              fontSize: 14, fontWeight: 600,
              color: "#1D1D1F",
              textDecoration: "none",
              borderBottom: "1px solid #E8E8ED",
              letterSpacing: "0.3px",
            }}>
              {label}
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="#A1A1A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function NavTabs() {
  const pathname = usePathname();
  const tabs = [
    { label: "Home",       href: "/" },
    { label: "Blog",       href: "/blog" },
    { label: "Topics",     href: "/topics" },
    { label: "About",      href: "/about" },
    { label: "Newsletter", href: "/newsletter" },
  ];

  return (
    <nav className="desktop-nav" style={{ display: "flex", gap: 0, alignItems: "center" }}>
      {tabs.map(({ label, href }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <a key={label} href={href} style={{
            padding: "22px 14px",
            fontFamily: "var(--font-sans)",
            fontSize: 12, fontWeight: isActive ? 700 : 500,
            color: isActive ? "#010048" : "#6E6E73",
            textDecoration: "none",
            background: "transparent",
            transition: "color 0.15s",
            display: "inline-block",
            position: "relative",
            letterSpacing: "0.3px",
            borderBottom: isActive ? "3px solid #010048" : "3px solid transparent",
          }}
          onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#1D1D1F"; }}
          onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#6E6E73"; }}>
            {label}
          </a>
        );
      })}
    </nav>
  );
}
