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
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "#f5f5f5", padding: "24px",
    }}>
      <div style={{
        width: "100%", maxWidth: 400,
        background: "white", border: "1px solid #e8e8e8",
        padding: "40px 36px",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ height: 40, objectFit: "contain" }} />
          <p style={{ marginTop: 8, fontSize: 11, color: "#aaa", letterSpacing: "2px", textTransform: "uppercase" }}>
            Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#03002e", marginBottom: 6, letterSpacing: "0.3px" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@gmail.com"
              style={{
                width: "100%", padding: "10px 12px",
                border: "1px solid #e8e8e8", outline: "none",
                fontSize: 14, color: "#03002e",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#03002e", marginBottom: 6, letterSpacing: "0.3px" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%", padding: "10px 12px",
                border: "1px solid #e8e8e8", outline: "none",
                fontSize: 14, color: "#03002e",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 16, fontWeight: 500 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "11px",
              background: loading ? "#888" : "#03002e",
              color: "white", fontWeight: 600,
              fontSize: 13, border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.5px",
              fontFamily: "inherit",
              transition: "opacity 0.15s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a href="/" style={{ fontSize: 12, color: "#aaa", textDecoration: "none" }}>
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
