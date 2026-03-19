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
    <div style={{ background: "#FFFFFF", minHeight: "calc(100vh - 58px)" }}>

      {/* ── Hero with image overlay ────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 400 }}>
        <img
          src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1400&q=80"
          alt="Reading newsletter"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg, rgba(1,0,72,0.96) 0%, rgba(1,0,72,0.78) 55%, rgba(1,0,72,0.50) 100%)",
        }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "88px 24px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "rgba(255,255,255,0.5)" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
              Stay Updated
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.8px", marginBottom: 18,
          }}>
            The TechSphere Newsletter
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontWeight: 300, maxWidth: 460 }}>
            The best tech articles, curated and delivered to your inbox every week. Free, always.
          </p>
        </div>
      </section>

      {/* ── Main form area ─────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 72px" }}>

        {/* Section header */}
        <div style={{ borderBottom: "1px solid #E8E8ED", paddingBottom: 16, marginBottom: 32 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>
            Newsletter Subscription
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          border: "1px solid #E8E8ED",
          overflow: "hidden",
        }} className="newsletter-grid">

          {/* Form panel */}
          <div style={{ background: "#fff", padding: "40px", borderRight: "1px solid #E8E8ED" }}>
            {submitted ? (
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                  Confirmed
                </p>
                <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.3px", marginBottom: 12 }}>
                  You&apos;re subscribed!
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6E6E73", lineHeight: 1.7, marginBottom: 28 }}>
                  Thanks for joining. Your first newsletter is coming soon. Check your inbox and mark us as safe.
                </p>
                <a href="/" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "11px 24px",
                  background: "#010048", color: "#fff",
                  fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  Explore Articles →
                </a>
              </div>
            ) : (
              <>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                  Subscribe Free
                </p>
                <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.3px", marginBottom: 10 }}>
                  Join the newsletter
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6E6E73", marginBottom: 28, lineHeight: 1.6 }}>
                  No spam. Unsubscribe anytime. Great tech content once a week.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 11, fontWeight: 600, color: "#6E6E73",
                      marginBottom: 7, letterSpacing: "0.5px", textTransform: "uppercase",
                    }}>
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
                        border: error ? "1px solid #DC2626" : "1px solid #D2D2D7",
                        fontFamily: "var(--font-sans)",
                        fontSize: 14, color: "#1D1D1F",
                        outline: "none", background: "#fff",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "#010048"}
                      onBlur={e => e.currentTarget.style.borderColor = error ? "#DC2626" : "#D2D2D7"}
                    />
                    {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#DC2626", marginTop: 6, fontWeight: 500 }}>{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "12px 24px",
                      background: loading ? "#A1A1A6" : "#010048",
                      color: "#fff",
                      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }}/>
                        Subscribing…
                      </>
                    ) : "Subscribe — It's Free"}
                  </button>
                </form>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6", marginTop: 14, lineHeight: 1.6 }}>
                  By subscribing you agree to our{" "}
                  <a href="/privacy" style={{ color: "#6E6E73", textDecoration: "underline" }}>Privacy Policy</a>.
                </p>
              </>
            )}
          </div>

          {/* Benefits panel */}
          <div style={{ background: "#F5F5F7", padding: "40px 36px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#A1A1A6", marginBottom: 24 }}>
              What You&apos;ll Get
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { title: "Weekly Digest",    desc: "The top articles of the week, hand-picked and summarized.",              icon: "📬" },
                { title: "Trending Topics",  desc: "What the tech community is talking about — stay in the loop.",           icon: "🔥" },
                { title: "Tutorials & Tips", desc: "Practical content from real developers and engineers.",                   icon: "📚" },
                { title: "Always Free",      desc: "The TechSphere newsletter is and always will be completely free.",        icon: "🎁" },
              ].map(({ title, desc, icon }, i) => (
                <div key={title} style={{
                  padding: "18px 0",
                  borderBottom: i < 3 ? "1px solid #E8E8ED" : "none",
                  display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, color: "#1D1D1F", fontSize: 14, marginBottom: 4 }}>{title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Social proof section ─────────────────── */}
      <section style={{ background: "#F5F5F7", borderTop: "1px solid #E8E8ED", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="proof-grid">
            {[
              { value: "Weekly", label: "Frequency", sub: "Every Tuesday morning" },
              { value: "Free",   label: "Cost",      sub: "No credit card, ever" },
              { value: "0 Spam", label: "Policy",    sub: "Unsubscribe any time" },
            ].map(item => (
              <div key={item.label} style={{
                padding: "40px 28px", textAlign: "center",
                background: "#fff", border: "1px solid #E8E8ED",
              }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 700, color: "#010048", marginBottom: 8 }}>{item.value}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "#A1A1A6", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
