"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "#ffffff",
      borderBottom: "1px solid #E8E8ED",
      boxShadow: scrolled ? "0 1px 16px rgba(1,0,72,0.06)" : "none",
      transition: "box-shadow 0.25s ease",
    }}>

      {/* ── Main nav bar ── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 32px", height: 68,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Wordmark */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/logo/logo.png"
              alt="TechSphere"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
            <div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 20, fontWeight: 800,
                color: "#010048", letterSpacing: "-0.5px", lineHeight: 1,
              }}>TechSphere</div>
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: 8,
                color: "rgba(1,0,72,0.4)", letterSpacing: "2px",
                textTransform: "uppercase", marginTop: 2,
              }}>Tech &amp; Innovation</div>
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
                color: isActive ? "#010048" : "rgba(1,0,72,0.5)",
                textDecoration: "none",
                transition: "color 0.15s",
                display: "inline-block",
                borderBottom: isActive ? "2px solid #010048" : "2px solid transparent",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#010048"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "rgba(1,0,72,0.5)"; }}>
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
            border: "1px solid rgba(1,0,72,0.15)",
            borderRadius: "50%",
            color: "rgba(1,0,72,0.5)",
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(1,0,72,0.06)";
            e.currentTarget.style.color = "#010048";
            e.currentTarget.style.borderColor = "rgba(1,0,72,0.35)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(1,0,72,0.5)";
            e.currentTarget.style.borderColor = "rgba(1,0,72,0.15)";
          }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="/new" style={{
            padding: "8px 18px",
            background: "#010048", color: "#ffffff",
            fontSize: 12, fontWeight: 700,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.3px",
            borderRadius: 6,
            transition: "opacity 0.15s, transform 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Write Post
          </a>
        </div>

        {/* Mobile controls */}
        <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <a href="/new" style={{
            padding: "7px 14px",
            background: "#010048", color: "#ffffff",
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
              border: "1px solid rgba(1,0,72,0.2)",
              background: "transparent",
              cursor: "pointer", padding: 0, borderRadius: 4,
            }}>
            <span style={{ display: "block", width: 16, height: 1.5, background: "#010048", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#010048", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#010048", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden", background: "#ffffff", borderTop: "1px solid #E8E8ED" }}
          >
            <div style={{ padding: "8px 24px 20px" }}>
              {[
                { label: "Home",       href: "/" },
                { label: "Blog",       href: "/blog" },
                { label: "Topics",     href: "/topics" },
                { label: "About",      href: "/about" },
                { label: "Newsletter", href: "/newsletter" },
                { label: "Admin",      href: "/admin" },
              ].map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.22 }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px 0",
                    fontFamily: "var(--font-sans)",
                    fontSize: 14, fontWeight: 600,
                    color: "#010048",
                    textDecoration: "none",
                    borderBottom: "1px solid #E8E8ED",
                  }}
                >
                  {label}
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" stroke="rgba(1,0,72,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
