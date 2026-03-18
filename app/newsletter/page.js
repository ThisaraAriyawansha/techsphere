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
    <div style={{ background: "#FAF8F5", minHeight: "calc(100vh - 58px)" }}>

      {/* Hero */}
      <section style={{
        background: "#1A1A1A",
        padding: "72px 24px 64px",
        borderBottom: "4px solid #C41E3A",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-serif)", fontSize: "clamp(80px, 14vw, 160px)",
          fontWeight: 900, color: "rgba(255,255,255,0.03)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>SUBSCRIBE</div>

        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", color: "#C41E3A", textTransform: "uppercase", marginBottom: 18 }}>
            Stay Updated
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 4.5vw, 50px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.8px", marginBottom: 18,
          }}>
            The TechSphere Newsletter
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontWeight: 300, maxWidth: 460 }}>
            The best tech articles, curated and delivered to your inbox every week. Free, always.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 72px" }}>

        {/* Section header */}
        <div style={{ borderTop: "3px solid #1A1A1A", borderBottom: "1px solid #D4CFC8", padding: "10px 0", marginBottom: 28 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C41E3A" }}>
            Newsletter Subscription
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          border: "1px solid #D4CFC8",
          borderTop: "3px solid #1A1A1A",
        }} className="newsletter-grid">

          {/* Form */}
          <div style={{ background: "#fff", padding: "40px 40px", borderRight: "1px solid #D4CFC8" }}>
            {submitted ? (
              <div>
                <div style={{ width: 36, height: 3, background: "#C41E3A", marginBottom: 16 }}/>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#C41E3A", textTransform: "uppercase", marginBottom: 14 }}>
                  Confirmed
                </p>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.3px", marginBottom: 12 }}>
                  You&apos;re subscribed!
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 28 }}>
                  Thanks for joining. Your first newsletter is coming soon. Check your inbox and mark us as safe.
                </p>
                <a href="/" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "11px 24px",
                  background: "#1A1A1A", color: "#fff",
                  fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                  textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  Explore Articles →
                </a>
              </div>
            ) : (
              <>
                <div style={{ width: 36, height: 3, background: "#C41E3A", marginBottom: 16 }}/>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#C41E3A", textTransform: "uppercase", marginBottom: 14 }}>
                  Subscribe Free
                </p>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.3px", marginBottom: 10 }}>
                  Join the newsletter
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#666", marginBottom: 28, lineHeight: 1.6 }}>
                  No spam. Unsubscribe anytime. Great tech content once a week.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10, fontWeight: 700, color: "#1A1A1A",
                      marginBottom: 7, letterSpacing: "1px", textTransform: "uppercase",
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
                        border: error ? "1px solid #C41E3A" : "1px solid #D4CFC8",
                        fontFamily: "var(--font-sans)",
                        fontSize: 14, color: "#1A1A1A",
                        outline: "none", background: "#fff",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
                      onBlur={e => e.currentTarget.style.borderColor = error ? "#C41E3A" : "#D4CFC8"}
                    />
                    {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#C41E3A", marginTop: 6, fontWeight: 500 }}>{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "12px 24px",
                      background: loading ? "#888" : "#1A1A1A",
                      color: "#fff",
                      fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      letterSpacing: "1px", textTransform: "uppercase",
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

                <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#999", marginTop: 14, lineHeight: 1.6 }}>
                  By subscribing you agree to our{" "}
                  <a href="/privacy" style={{ color: "#666", textDecoration: "underline" }}>Privacy Policy</a>.
                </p>
              </>
            )}
          </div>

          {/* What to expect */}
          <div style={{ background: "#FAF8F5", padding: "40px 36px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C41E3A", marginBottom: 6 }}>
              What You&apos;ll Get
            </p>
            <div style={{ width: 24, height: 2, background: "#C41E3A", marginBottom: 20 }}/>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { title: "Weekly Digest", desc: "The top articles of the week, hand-picked and summarized." },
                { title: "Trending Topics", desc: "What the tech community is talking about — stay in the loop." },
                { title: "Tutorials & Tips", desc: "Practical content from real developers and engineers." },
                { title: "Always Free", desc: "The TechSphere newsletter is and always will be completely free." },
              ].map(({ title, desc }, i) => (
                <div key={title} style={{
                  padding: "20px 0",
                  borderBottom: i < 3 ? "1px solid #D4CFC8" : "none",
                }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "#1A1A1A", fontSize: 15, marginBottom: 5 }}>{title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#666", lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
