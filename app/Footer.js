"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#F5F5F7", borderTop: "1px solid #E8E8ED" }}>

      {/* ── Newspaper masthead top rule ── */}
      <div style={{ height: 4, background: "#010048" }} />
      <div style={{ height: 1, background: "#D2D2D7" }} />

      {/* Main grid */}
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <a href="/" style={{ display: "inline-block", textDecoration: "none", marginBottom: 14 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 24, fontWeight: 800,
              color: "#010048", letterSpacing: "-0.5px", lineHeight: 1,
            }}>TechSphere</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 8, color: "#A1A1A6", letterSpacing: "2px", textTransform: "uppercase", marginTop: 4 }}>
              Tech & Innovation
            </div>
          </a>
          <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.75, maxWidth: 240, marginBottom: 20, fontFamily: "var(--font-sans)" }}>
            A free, open platform for the tech community to share ideas, tutorials, and insights. No login required.
          </p>
          <a href="/newsletter" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "9px 20px",
            background: "#010048",
            color: "#ffffff",
            fontSize: 11, fontWeight: 700,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            transition: "opacity 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Get Newsletter
          </a>
        </div>

        {/* Platform */}
        <div>
          <div style={{ borderTop: "2px solid #010048", paddingTop: 10, marginBottom: 16 }}>
            <div style={{ height: 1, background: "#D2D2D7", marginTop: 3, marginBottom: 12 }} />
            <h4 style={{
              fontSize: 10, fontWeight: 700, color: "#010048",
              letterSpacing: "1.5px", textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
            }}>Platform</h4>
          </div>
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
          <div style={{ borderTop: "2px solid #010048", paddingTop: 10, marginBottom: 16 }}>
            <div style={{ height: 1, background: "#D2D2D7", marginTop: 3, marginBottom: 12 }} />
            <h4 style={{
              fontSize: 10, fontWeight: 700, color: "#010048",
              letterSpacing: "1.5px", textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
            }}>Company</h4>
          </div>
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
          <div style={{ borderTop: "2px solid #010048", paddingTop: 10, marginBottom: 16 }}>
            <div style={{ height: 1, background: "#D2D2D7", marginTop: 3, marginBottom: 12 }} />
            <h4 style={{
              fontSize: 10, fontWeight: 700, color: "#010048",
              letterSpacing: "1.5px", textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
            }}>Sections</h4>
          </div>
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
      <div style={{ borderTop: "1px solid #E8E8ED", padding: "16px 24px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 11, color: "#A1A1A6", fontFamily: "var(--font-sans)", letterSpacing: "0.3px" }}>
            © {year} TechSphere — Open for everyone, always free.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{
                fontSize: 11, color: "#A1A1A6",
                textDecoration: "none", fontFamily: "var(--font-sans)",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#010048"}
              onMouseLeave={e => e.currentTarget.style.color = "#A1A1A6"}>
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
      fontSize: 13, color: "#6E6E73",
      textDecoration: "none", fontWeight: 400,
      fontFamily: "var(--font-sans)",
      transition: "color 0.15s, padding-left 0.15s", lineHeight: 1.4,
    }}
    onMouseEnter={e => { e.currentTarget.style.color = "#010048"; e.currentTarget.style.paddingLeft = "4px"; }}
    onMouseLeave={e => { e.currentTarget.style.color = "#6E6E73"; e.currentTarget.style.paddingLeft = "0"; }}>
      {children}
    </a>
  );
}
