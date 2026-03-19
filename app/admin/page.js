"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL    = "admin@gmail.com";
const ADMIN_PASSWORD = "12345678";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem("techsphere_admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "#FAF8F5",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        background: "#ffffff",
        border: "1px solid #D4CFC8",
        borderTop: "3px solid #1A1A1A",
        padding: "40px 36px",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22, fontWeight: 900, color: "#1A1A1A",
            letterSpacing: "-0.3px", marginBottom: 4,
          }}>TechSphere</div>
          <div style={{ width: 24, height: 2, background: "#010057", margin: "0 auto 10px" }}/>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10, color: "#999",
            letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700,
          }}>
            Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Email */}
          <div>
            <label style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontSize: 10, fontWeight: 700,
              color: "#1A1A1A", marginBottom: 7,
              letterSpacing: "1px", textTransform: "uppercase",
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@gmail.com"
              style={{
                display: "block",
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D4CFC8",
                outline: "none",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "#1A1A1A",
                background: "#fff",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
              onBlur={e => e.currentTarget.style.borderColor = "#D4CFC8"}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontSize: 10, fontWeight: 700,
              color: "#1A1A1A", marginBottom: 7,
              letterSpacing: "1px", textTransform: "uppercase",
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                display: "block",
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D4CFC8",
                outline: "none",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "#1A1A1A",
                background: "#fff",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
              onBlur={e => e.currentTarget.style.borderColor = "#D4CFC8"}
            />
          </div>

          {error && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "10px 14px",
              background: "#fff5f5",
              border: "1px solid #fcd0d0",
            }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="9" stroke="#010057" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="#010057" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#010057", fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#888" : "#1A1A1A",
              color: "white",
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: 11,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "1.5px", textTransform: "uppercase",
              marginTop: 8,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a href="/" style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11, color: "#999", textDecoration: "none",
            letterSpacing: "0.5px",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"}
          onMouseLeave={e => e.currentTarget.style.color = "#999"}>
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
