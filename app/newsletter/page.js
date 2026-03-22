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
      <section style={{ position: "relative", overflow: "hidden", minHeight: 380 }}>
        <img
          src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1400&q=80"
          alt="Reading newsletter"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg, rgba(1,0,72,0.97) 0%, rgba(1,0,72,0.80) 55%, rgba(1,0,72,0.52) 100%)",
        }}/>
        {/* Newspaper top rule */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "80px 24px 68px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 3, background: "rgba(255,255,255,0.5)" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Stay Updated
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 4vw, 48px)",
            fontWeight: 900, color: "#fff",
            lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 18,
          }}>
            The TechSphere<br/><em style={{ fontStyle: "italic" }}>Newsletter</em>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.85, fontWeight: 300, maxWidth: 460 }}>
            The best tech articles, curated and delivered to your inbox every week. Free, always.
          </p>
        </div>
      </section>

      {/* ── Main form area ─────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 72px" }}>

        {/* Section header */}
        <div style={{ borderTop: "3px solid #010048", paddingTop: 10, marginBottom: 32 }}>
          <div style={{ height: 1, background: "#D2D2D7", marginBottom: 14 }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase" }}>
            Newsletter Subscription
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          border: "1px solid #E8E8ED",
          borderTop: "3px solid #010048",
          overflow: "hidden",
        }} className="newsletter-grid">

          {/* Form panel */}
          <div style={{ background: "#fff", padding: "40px", borderRight: "1px solid #E8E8ED" }}>
            {submitted ? (
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>
                  Confirmed
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "#1D1D1F", letterSpacing: "-0.3px", marginBottom: 14 }}>
                  You&apos;re subscribed!
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6E6E73", lineHeight: 1.75, marginBottom: 28 }}>
                  Thanks for joining. Your first newsletter is coming soon. Check your inbox and mark us as safe.
                </p>
                <a href="/" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "11px 24px",
                  background: "#010048", color: "#fff",
                  fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
                  textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
                  transition: "opacity 0.15s, transform 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Explore Articles →
                </a>
              </div>
            ) : (
              <>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>
                  Subscribe Free
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "#1D1D1F", letterSpacing: "-0.3px", marginBottom: 12 }}>
                  Join the newsletter
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6E6E73", marginBottom: 28, lineHeight: 1.7 }}>
                  No spam. Unsubscribe anytime. Great tech content once a week.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10, fontWeight: 700, color: "#6E6E73",
                      marginBottom: 8, letterSpacing: "1.5px", textTransform: "uppercase",
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
                      padding: "13px 24px",
                      background: loading ? "#A1A1A6" : "#010048",
                      color: "#fff",
                      fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
                      border: "none", letterSpacing: "0.8px", textTransform: "uppercase",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "opacity 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
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
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#010048", marginBottom: 24 }}>
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
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#1D1D1F", fontSize: 14, marginBottom: 4 }}>{title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73", lineHeight: 1.65 }}>{desc}</p>
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
                borderTop: "3px solid #010048",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(1,0,72,0.10)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 900, color: "#010048", marginBottom: 10, letterSpacing: "-1px" }}>{item.value}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
