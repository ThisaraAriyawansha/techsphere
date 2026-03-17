"use client";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #e8e8e8",
      background: "#ffffff",
      padding: "32px 24px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ width: 28, height: 28, objectFit: "contain" }} />
          <span style={{ color: "#010048", fontWeight: 600, fontSize: 14, letterSpacing: "0.3px" }}>
            TechSphere
          </span>
        </div>

        {/* Copy */}
        <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
          © {new Date().getFullYear()} TechSphere · Open for everyone.
        </p>

        {/* Links */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Write", href: "/new" },
            { label: "Posts", href: "/#posts" },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontSize: 12, color: "#aaa", textDecoration: "none",
              fontWeight: 500, letterSpacing: "0.3px",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#010048"}
            onMouseLeave={e => e.currentTarget.style.color = "#aaa"}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
