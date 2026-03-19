"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#010057", borderTop: "4px solid rgba(255,255,255,0.5)" }}>

      {/* Main grid */}
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <a href="/" style={{ display: "inline-block", textDecoration: "none", marginBottom: 16 }}>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: 24, fontWeight: 900,
              color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1,
            }}>TechSphere</div>
            <div style={{
              fontFamily: "var(--font-sans)",
              fontSize: 9, color: "rgba(255,255,255,0.35)",
              letterSpacing: "2.5px", textTransform: "uppercase", marginTop: 4,
            }}>Technology & Innovation</div>
          </a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 240, marginBottom: 20, fontFamily: "var(--font-sans)" }}>
            A free, open platform for the tech community to share ideas, tutorials, and insights. No login required.
          </p>
          <a href="/newsletter" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "9px 18px",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "rgba(255,255,255,0.75)",
            fontSize: 11, fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "1px", textTransform: "uppercase",
            fontFamily: "var(--font-sans)",
            transition: "background 0.15s, color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}>
            Get Newsletter
          </a>
        </div>

        {/* Platform */}
        <div>
          <h4 style={{
            fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: 18,
            fontFamily: "var(--font-sans)",
            borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 10,
          }}>Platform</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Explore Posts", href: "/" },
              { label: "Browse Topics", href: "/topics" },
              { label: "Blog", href: "/blog" },
              { label: "Write a Post", href: "/new" },
              { label: "Newsletter", href: "/newsletter" },
            ].map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{
            fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: 18,
            fontFamily: "var(--font-sans)",
            borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 10,
          }}>Company</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "About TechSphere", href: "/about" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div>
          <h4 style={{
            fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: 18,
            fontFamily: "var(--font-sans)",
            borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 10,
          }}>Sections</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "AI & Machine Learning", href: "/topics" },
              { label: "Web Development", href: "/topics" },
              { label: "Cloud & DevOps", href: "/topics" },
              { label: "Cybersecurity", href: "/topics" },
              { label: "Open Source", href: "/topics" },
            ].map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "18px 24px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", letterSpacing: "0.3px" }}>
            © {year} TechSphere — Open for everyone, always free.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{
                fontSize: 11, color: "rgba(255,255,255,0.25)",
                textDecoration: "none", fontFamily: "var(--font-sans)",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <a href={href} style={{
      fontSize: 13, color: "rgba(255,255,255,0.45)",
      textDecoration: "none", fontWeight: 400,
      fontFamily: "var(--font-sans)",
      transition: "color 0.15s", lineHeight: 1.4,
    }}
    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
      {children}
    </a>
  );
}
