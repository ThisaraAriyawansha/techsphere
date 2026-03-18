"use client";
import { useState } from "react";

export default function NewsletterPage() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div style={{ background: "#f5f5f7", minHeight: "calc(100vh - 58px)" }}>

      {/* Hero */}
      <section style={{ background: "#010048", padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 18 }}>
            Stay Updated
          </p>
          <h1 style={{ fontSize: "clamp(30px, 4.5vw, 50px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.2px", marginBottom: 18 }}>
            The TechSphere Newsletter
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, fontWeight: 300, maxWidth: 460 }}>
            The best tech articles, curated and delivered to your inbox every week. Free, always.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 72px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          border: "1px solid #e2e2e7",
          background: "#e2e2e7",
        }} className="newsletter-grid">

          {/* Form */}
          <div style={{ background: "#fff", padding: "40px 40px" }}>
            {submitted ? (
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#010048", textTransform: "uppercase", marginBottom: 14 }}>Confirmed</p>
                <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.5px", marginBottom: 12 }}>
                  You're subscribed!
                </h2>
                <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.7, marginBottom: 28 }}>
                  Thanks for joining. Your first newsletter is coming soon. Check your inbox and mark us as safe.
                </p>
                <a href="/" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "11px 24px",
                  background: "#010048", color: "#fff",
                  fontSize: 13, fontWeight: 600, textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  Explore Articles →
                </a>
              </div>
            ) : (
              <>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#010048", textTransform: "uppercase", marginBottom: 14 }}>Subscribe Free</p>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.4px", marginBottom: 10 }}>
                  Join the newsletter
                </h2>
                <p style={{ fontSize: 14, color: "#6e6e73", marginBottom: 28, lineHeight: 1.6 }}>
                  No spam. Unsubscribe anytime. Great tech content once a week.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#1d1d1f", marginBottom: 7, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      required
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        border: error ? "1px solid #dc2626" : "1px solid #e2e2e7",
                        fontSize: 14, color: "#1d1d1f",
                        outline: "none", background: "#fff",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "#010048"}
                      onBlur={e => e.currentTarget.style.borderColor = error ? "#dc2626" : "#e2e2e7"}
                    />
                    {error && <p style={{ fontSize: 12, color: "#dc2626", marginTop: 6, fontWeight: 500 }}>{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "12px 24px",
                      background: loading ? "#6e6e73" : "#010048",
                      color: "#fff",
                      fontWeight: 700, fontSize: 14,
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      fontFamily: "inherit",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }}/>
                        Subscribing…
                      </>
                    ) : "Subscribe — It's Free"}
                  </button>
                </form>

                <p style={{ fontSize: 11, color: "#aeaeb2", marginTop: 14, lineHeight: 1.6 }}>
                  By subscribing you agree to our{" "}
                  <a href="/privacy" style={{ color: "#6e6e73", textDecoration: "underline" }}>Privacy Policy</a>.
                </p>
              </>
            )}
          </div>

          {/* What to expect */}
          <div style={{ background: "#f5f5f7", padding: "40px 36px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#010048", marginBottom: 20 }}>What You'll Get</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { title: "Weekly Digest", desc: "The top articles of the week, hand-picked and summarized." },
                { title: "Trending Topics", desc: "What the tech community is talking about — stay in the loop." },
                { title: "Tutorials & Tips", desc: "Practical content from real developers and engineers." },
                { title: "Always Free", desc: "The TechSphere newsletter is and always will be completely free." },
              ].map(({ title, desc }, i) => (
                <div key={title} style={{
                  padding: "20px 0",
                  borderBottom: i < 3 ? "1px solid #e2e2e7" : "none",
                }}>
                  <p style={{ fontWeight: 700, color: "#1d1d1f", fontSize: 14, marginBottom: 5 }}>{title}</p>
                  <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .newsletter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
