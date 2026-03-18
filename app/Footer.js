"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#f5f5f7", borderTop: "1px solid #e2e2e7" }}>

      {/* Main grid — responsive via globals.css .footer-grid */}
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", marginBottom: 14 }}>
            <img src="/logo/logo.png" alt="TechSphere" style={{ width: 26, height: 26, objectFit: "contain" }} />
            <span style={{ color: "#010048", fontWeight: 700, fontSize: 14 }}>TechSphere</span>
          </a>
          <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
            A free, open platform for the tech community to share ideas, tutorials, and insights. No login required.
          </p>
          <a href="/newsletter" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 16px",
            background: "#010048",
            color: "#fff",
            fontSize: 12, fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.3px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Get Newsletter
          </a>
        </div>

        {/* Platform */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: "#1d1d1f", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 16 }}>
            Platform
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Explore Posts", href: "/" },
              { label: "Browse Topics", href: "/topics" },
              { label: "Write a Post", href: "/new" },
              { label: "Newsletter", href: "/newsletter" },
            ].map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: "#1d1d1f", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 16 }}>
            Company
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
          <h4 style={{ fontSize: 11, fontWeight: 700, color: "#1d1d1f", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 16 }}>
            Topics
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
      <div style={{ borderTop: "1px solid #e2e2e7", padding: "18px 24px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 12, color: "#aeaeb2" }}>
            © {year} TechSphere — Open for everyone, always free.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <FooterLink key={label} href={href} small>{label}</FooterLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, small }) {
  return (
    <a href={href} style={{
      fontSize: small ? 12 : 13,
      color: "#6e6e73",
      textDecoration: "none",
      fontWeight: 400,
      transition: "color 0.15s",
      lineHeight: 1.4,
    }}
    onMouseEnter={e => e.currentTarget.style.color = "#010048"}
    onMouseLeave={e => e.currentTarget.style.color = "#6e6e73"}>
      {children}
    </a>
  );
}
