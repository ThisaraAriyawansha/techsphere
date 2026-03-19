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
          background: "linear-gradient(110deg, rgba(1,0,87,0.97) 0%, rgba(1,0,87,0.82) 55%, rgba(1,0,87,0.55) 100%)",
        }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "88px 24px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#fff" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              Stay Updated
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 4.5vw, 52px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.8px", marginBottom: 18,
          }}>
            The TechSphere Newsletter
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300, maxWidth: 460 }}>
            The best tech articles, curated and delivered to your inbox every week. Free, always.
          </p>
        </div>
      </section>

      {/* ── Main form area ─────────────────────── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 72px" }}>

        {/* Section header */}
        <div style={{ borderTop: "3px solid #010057", borderBottom: "1px solid #DDE0F5", padding: "10px 0", marginBottom: 32 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#010057" }}>
            Newsletter Subscription
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          border: "1px solid #DDE0F5",
          borderTop: "3px solid #010057",
        }} className="newsletter-grid">

          {/* Form panel */}
          <div style={{ background: "#fff", padding: "40px", borderRight: "1px solid #DDE0F5" }}>
            {submitted ? (
              <div>
                <div style={{ width: 36, height: 3, background: "#010057", marginBottom: 16 }}/>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#010057", textTransform: "uppercase", marginBottom: 14 }}>
                  Confirmed
                </p>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, color: "#010057", letterSpacing: "-0.3px", marginBottom: 12 }}>
                  You&apos;re subscribed!
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#55557A", lineHeight: 1.7, marginBottom: 28 }}>
                  Thanks for joining. Your first newsletter is coming soon. Check your inbox and mark us as safe.
                </p>
                <a href="/" className="h-opacity" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "11px 24px",
                  background: "#010057", color: "#fff",
                  fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                  textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
                }}>
                  Explore Articles →
                </a>
              </div>
            ) : (
              <>
                <div style={{ width: 36, height: 3, background: "#010057", marginBottom: 16 }}/>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#010057", textTransform: "uppercase", marginBottom: 14 }}>
                  Subscribe Free
                </p>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, color: "#010057", letterSpacing: "-0.3px", marginBottom: 10 }}>
                  Join the newsletter
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#55557A", marginBottom: 28, lineHeight: 1.6 }}>
                  No spam. Unsubscribe anytime. Great tech content once a week.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10, fontWeight: 700, color: "#010057",
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
                        border: error ? "1px solid #DC2626" : "1px solid #DDE0F5",
                        fontFamily: "var(--font-sans)",
                        fontSize: 14, color: "#010057",
                        outline: "none", background: "#fff",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "#010057"}
                      onBlur={e => e.currentTarget.style.borderColor = error ? "#DC2626" : "#DDE0F5"}
                    />
                    {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#DC2626", marginTop: 6, fontWeight: 500 }}>{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={loading ? "" : "h-opacity"}
                    style={{
                      padding: "12px 24px",
                      background: loading ? "#8888A8" : "#010057",
                      color: "#fff",
                      fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      letterSpacing: "1px", textTransform: "uppercase",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }}/>
                        Subscribing…
                      </>
                    ) : "Subscribe — It's Free"}
                  </button>
                </form>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#8888A8", marginTop: 14, lineHeight: 1.6 }}>
                  By subscribing you agree to our{" "}
                  <a href="/privacy" style={{ color: "#55557A", textDecoration: "underline" }}>Privacy Policy</a>.
                </p>
              </>
            )}
          </div>

          {/* Benefits panel */}
          <div style={{ background: "#F0F0FA", padding: "40px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ display: "inline-block", width: 16, height: 2, background: "#010057" }}/>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#010057" }}>
                What You&apos;ll Get
              </p>
            </div>
            <div style={{ width: 24, height: 2, background: "#010057", marginBottom: 24 }}/>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { title: "Weekly Digest",    desc: "The top articles of the week, hand-picked and summarized.",              icon: "📬" },
                { title: "Trending Topics",  desc: "What the tech community is talking about — stay in the loop.",           icon: "🔥" },
                { title: "Tutorials & Tips", desc: "Practical content from real developers and engineers.",                   icon: "📚" },
                { title: "Always Free",      desc: "The TechSphere newsletter is and always will be completely free.",        icon: "🎁" },
              ].map(({ title, desc, icon }, i) => (
                <div key={title} style={{
                  padding: "18px 0",
                  borderBottom: i < 3 ? "1px solid #DDE0F5" : "none",
                  display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "#010057", fontSize: 15, marginBottom: 4 }}>{title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#55557A", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Social proof image section ─────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80"
          alt="Reading tech news"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(1,0,87,0.88)" }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.08)" }}>
            {[
              { value: "Weekly", label: "Frequency", sub: "Every Tuesday morning" },
              { value: "Free",   label: "Cost",      sub: "No credit card, ever" },
              { value: "0 Spam", label: "Policy",    sub: "Unsubscribe any time" },
            ].map(item => (
              <div key={item.label} style={{ padding: "40px 28px", textAlign: "center", background: "rgba(1,0,87,0.5)" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{item.value}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
