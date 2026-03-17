"use client";

export default function Navbar() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(245,245,247,0.82)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #0d1f3c 0%, #1d4ed8 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
              <path d="M12 3C12 3 8 8 8 12s4 9 4 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 3c0 0 4 5 4 9s-4 9-4 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 12h18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            fontSize: 18, fontWeight: 700,
            background: "linear-gradient(135deg, #0a1628 0%, #1d4ed8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", letterSpacing: "-0.3px",
          }}>TechSphere</span>
        </a>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <NavLink href="/">Explore</NavLink>
          <NavLink href="/new" highlight>+ Write Post</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children, highlight }) {
  return (
    <a href={href} style={{
      padding: "7px 16px",
      borderRadius: 999,
      fontSize: 14, fontWeight: 500,
      textDecoration: "none",
      transition: "all 0.2s ease",
      ...(highlight ? {
        background: "linear-gradient(135deg, #0d1f3c 0%, #1d4ed8 100%)",
        color: "#fff",
        boxShadow: "0 2px 12px rgba(29,78,216,0.30)",
      } : {
        color: "#374151",
      }),
    }}
    onMouseEnter={e => {
      if (!highlight) e.currentTarget.style.background = "rgba(29,78,216,0.08)";
    }}
    onMouseLeave={e => {
      if (!highlight) e.currentTarget.style.background = "transparent";
    }}>
      {children}
    </a>
  );
}
