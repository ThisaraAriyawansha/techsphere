"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dateStr, setDateStr]   = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    setDateStr(new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#FFFFFF",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      transition: "background 0.2s, box-shadow 0.2s",
      borderBottom: "1px solid #DDE0F5",
      boxShadow: scrolled ? "0 2px 16px rgba(1,0,87,0.08)" : "none",
    }}>

      {/* ── Top dateline strip ────────────────── */}
      <div style={{ background: "#010057", padding: "5px 24px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.8px", fontFamily: "var(--font-sans)" }}>
            {dateStr}
          </span>
          <span className="nav-dateline-center" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
            Open Tech Publication
          </span>
          <a href="/newsletter" className="h-border-white" style={{
            fontSize: 10, color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.5px", textDecoration: "none",
            fontFamily: "var(--font-sans)",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}>
            Subscribe to Newsletter →
          </a>
        </div>
      </div>

      {/* ── Masthead ──────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px 0" }}>

        {/* Logo row */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 12,
          borderBottom: "3px solid #010057",
        }}>

          {/* Wordmark */}
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/logo/logo.png" alt="TechSphere" style={{ width: 30, height: 30, objectFit: "contain" }} />
              <div>
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(22px, 3vw, 30px)",
                  fontWeight: 900,
                  color: "#010057",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                }}>TechSphere</div>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  color: "#8888A8",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}>Technology & Innovation</div>
              </div>
            </div>
          </a>

          {/* Desktop actions */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/new" className="h-opacity" style={{
              padding: "8px 20px",
              background: "#010057",
              color: "#ffffff",
              fontSize: 12, fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
            }}>
              Write Post
            </a>
            <a href="/admin" title="Admin" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 34, height: 34,
              border: "1px solid #DDE0F5",
              color: "#8888A8",
              textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#010057"; e.currentTarget.style.color = "#010057"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#DDE0F5"; e.currentTarget.style.color = "#8888A8"; }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 8 }}>
            <a href="/new" style={{
              padding: "7px 14px",
              background: "#010057", color: "#fff",
              fontSize: 11, fontWeight: 700,
              textDecoration: "none",
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
                border: "1px solid #DDE0F5",
                background: menuOpen ? "#F0F0FA" : "none",
                cursor: "pointer", padding: 0,
                transition: "background 0.15s",
              }}>
              <span style={{ display: "block", width: 15, height: 1.5, background: "#010057", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "#010057", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "#010057", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Section nav tabs */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 0, alignItems: "center" }}>
          {[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Topics", href: "/topics" },
            { label: "About", href: "/about" },
            { label: "Newsletter", href: "/newsletter" },
          ].map(({ label, href }) => (
            <SectionTab key={label} href={href}>{label}</SectionTab>
          ))}
        </nav>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "#FFFFFF",
          borderTop: "1px solid #DDE0F5",
          padding: "8px 24px 16px",
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
              padding: "13px 0",
              fontFamily: "var(--font-sans)",
              fontSize: 14, fontWeight: 600,
              color: "#010057",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              borderBottom: "1px solid #EEEEF8",
            }}>
              {label}
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="#8888A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionTab({ href, children }) {
  return (
    <a href={href} style={{
      padding: "10px 14px",
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      fontWeight: 700,
      color: "#55557A",
      textDecoration: "none",
      letterSpacing: "1.2px",
      textTransform: "uppercase",
      borderBottom: "2px solid transparent",
      transition: "color 0.15s, border-color 0.15s",
      display: "inline-block",
    }}
    onMouseEnter={e => { e.currentTarget.style.color = "#010057"; e.currentTarget.style.borderBottomColor = "#010057"; }}
    onMouseLeave={e => { e.currentTarget.style.color = "#55557A"; e.currentTarget.style.borderBottomColor = "transparent"; }}>
      {children}
    </a>
  );
}
