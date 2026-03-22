"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDateStr(now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
      setTimeStr(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: transparent ? "transparent" : "rgba(1,0,72,0.92)",
      backdropFilter: !transparent ? "blur(20px)" : "none",
      WebkitBackdropFilter: !transparent ? "blur(20px)" : "none",
      transition: "background 0.3s ease",
    }}>

      {/* ── Top dateline strip ── */}
      <div className="nav-dateline" style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "5px 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
            {dateStr}
            {timeStr && (
              <span style={{ marginLeft: 10, color: "rgba(255,255,255,0.35)", fontVariantNumeric: "tabular-nums" }}>
                {timeStr}
              </span>
            )}
          </span>
          <span className="nav-dateline-center" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
            Open Tech Publication
          </span>
          <a href="/newsletter" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", textDecoration: "none", fontFamily: "var(--font-sans)", fontWeight: 500, transition: "color 0.15s", whiteSpace: "nowrap" }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            Subscribe to Newsletter →
          </a>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 32px", height: 68,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        borderBottom: transparent ? "none" : "1px solid rgba(255,255,255,0.06)",
      }}>

        {/* Wordmark */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/logo/logo.png"
              alt="TechSphere"
              style={{ width: 28, height: 28, objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            <div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 20, fontWeight: 800,
                color: "#ffffff", letterSpacing: "-0.5px", lineHeight: 1,
              }}>TechSphere</div>
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: 8,
                color: "rgba(255,255,255,0.45)", letterSpacing: "2px",
                textTransform: "uppercase", marginTop: 2,
              }}>Tech & Innovation</div>
            </div>
          </div>
        </a>

        {/* Desktop nav links */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {[
            { label: "Home",       href: "/" },
            { label: "Blog",       href: "/blog" },
            { label: "Topics",     href: "/topics" },
            { label: "About",      href: "/about" },
            { label: "Newsletter", href: "/newsletter" },
          ].map(({ label, href }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <a key={label} href={href} style={{
                padding: "22px 15px",
                fontFamily: "var(--font-sans)",
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "color 0.15s",
                display: "inline-block",
                borderBottom: isActive ? "2px solid rgba(255,255,255,0.75)" : "2px solid transparent",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                {label}
              </a>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="/admin" title="Admin" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 34, height: 34,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="/new" style={{
            padding: "8px 18px",
            background: "#ffffff", color: "#010048",
            fontSize: 12, fontWeight: 700,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.3px",
            borderRadius: 6,
            transition: "opacity 0.15s, transform 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Write Post
          </a>
        </div>

        {/* Mobile controls */}
        <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <a href="/new" style={{
            padding: "7px 14px",
            background: "#ffffff", color: "#010048",
            fontSize: 11, fontWeight: 700,
            textDecoration: "none", borderRadius: 4,
            fontFamily: "var(--font-sans)",
          }}>Write</a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center", gap: 5,
              width: 36, height: 36,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent",
              cursor: "pointer", padding: 0, borderRadius: 4,
            }}>
            <span style={{ display: "block", width: 16, height: 1.5, background: "#fff", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#fff", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#fff", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "rgba(1,0,72,0.98)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "8px 24px 20px",
        }}>
          {[
            { label: "Home",       href: "/" },
            { label: "Blog",       href: "/blog" },
            { label: "Topics",     href: "/topics" },
            { label: "About",      href: "/about" },
            { label: "Newsletter", href: "/newsletter" },
            { label: "Admin",      href: "/admin" },
          ].map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0",
              fontFamily: "var(--font-sans)",
              fontSize: 14, fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>
              {label}
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
