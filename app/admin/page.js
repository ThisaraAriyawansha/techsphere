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
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        background: "#ffffff",
        border: "1px solid #e8e8e8",
        padding: "40px 36px",
        boxSizing: "border-box",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ height: 44, objectFit: "contain", display: "block", margin: "0 auto" }} />
          <p style={{
            marginTop: 10, fontSize: 11, color: "#aaa",
            letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600,
          }}>
            Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Email */}
          <div>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 600,
              color: "#010048", marginBottom: 6, letterSpacing: "0.3px",
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
                border: "1px solid #e8e8e8",
                outline: "none",
                fontSize: 14,
                color: "#010048",
                boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "#010048"}
              onBlur={e => e.currentTarget.style.borderColor = "#e8e8e8"}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 600,
              color: "#010048", marginBottom: 6, letterSpacing: "0.3px",
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
                border: "1px solid #e8e8e8",
                outline: "none",
                fontSize: 14,
                color: "#010048",
                boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "#010048"}
              onBlur={e => e.currentTarget.style.borderColor = "#e8e8e8"}
            />
          </div>

          {error && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "10px 14px",
              background: "#fff5f5",
              border: "1px solid #fcd0d0",
              boxSizing: "border-box",
            }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="9" stroke="#c0392b" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="#c0392b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 13, color: "#c0392b", fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#888" : "#010048",
              color: "white",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.5px",
              fontFamily: "inherit",
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
            fontSize: 12, color: "#aaa", textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#010048"}
          onMouseLeave={e => e.currentTarget.style.color = "#aaa"}>
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
