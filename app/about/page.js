"use client";

export default function AboutPage() {
  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ── Hero with image overlay ────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 460 }}>
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80"
          alt="Tech workspace"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg, rgba(1,0,72,0.92) 0%, rgba(1,0,72,0.75) 55%, rgba(1,0,72,0.45) 100%)",
        }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "96px 24px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "rgba(255,255,255,0.5)" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
              Our Story
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(22px, 3.5vw, 40px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 20,
          }}>
            Built for the<br/>tech community
          </h1>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17, color: "rgba(255,255,255,0.7)",
            lineHeight: 1.8, fontWeight: 300, maxWidth: 500,
          }}>
            TechSphere is a free, open publishing platform where anyone can read and write about technology — no account, no barriers, just knowledge.
          </p>
        </div>
      </section>

      {/* ── Mission with image ─────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div className="about-two-col">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Our Mission
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              fontWeight: 700, color: "#1D1D1F",
              letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 20,
            }}>
              Democratize tech knowledge, one post at a time
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#6E6E73", lineHeight: 1.8, marginBottom: 14 }}>
              We believe great ideas shouldn&apos;t be locked behind paywalls or accounts. TechSphere was created so that developers, designers, and tech enthusiasts can share their insights freely.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#6E6E73", lineHeight: 1.8, marginBottom: 28 }}>
              Whether you&apos;re sharing a breakthrough, a tutorial, or your thoughts on the latest trends — this is your platform.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="/new" style={{
                padding: "11px 24px", background: "#010048", color: "#fff",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Start Writing
              </a>
              <a href="/" style={{
                padding: "11px 24px", border: "1.5px solid #010048", color: "#010048",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#010048"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#010048"; }}>
                Read Articles
              </a>
            </div>
          </div>

          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden", height: 380 }}>
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80"
              alt="Developer coding"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(0deg, rgba(1,0,72,0.82) 0%, transparent 100%)",
              padding: "32px 24px 20px",
            }}>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, color: "#fff", fontSize: 16 }}>
                &ldquo;Great ideas belong to everyone.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats section ─────────────────────── */}
      <section style={{ background: "#F5F5F7", borderTop: "1px solid #E8E8ED", borderBottom: "1px solid #E8E8ED", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "#A1A1A6" }}>
                Platform Impact
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.5px" }}>
              A growing community of tech minds
            </h2>
          </div>
          <div className="about-stats-grid">
            {[
              { value: "∞", label: "Articles Published" },
              { value: "Free", label: "Always & Forever" },
              { value: "0", label: "Login Required" },
              { value: "Open", label: "Community Platform" },
            ].map(stat => (
              <div key={stat.label} style={{ background: "#fff", border: "1px solid #E8E8ED", padding: "36px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 26, fontWeight: 800, color: "#010048", letterSpacing: "-1px", marginBottom: 8 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#6E6E73" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
              What We Stand For
            </span>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.5px" }}>
              Core values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { title: "Open Access",      desc: "All content is freely accessible to everyone, always. No exceptions.",              icon: "🔓" },
              { title: "Simplicity",       desc: "We keep the experience clean and fast. Focus on content, not complexity.",           icon: "✨" },
              { title: "Community First",  desc: "TechSphere exists for its readers and writers — the community shapes it.",           icon: "🌍" },
              { title: "Privacy Respect",  desc: "We don't track you unnecessarily. Your data is yours.",                              icon: "🔒" },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{
                background: "#FFFFFF",
                border: "1px solid #E8E8ED",
                padding: "32px 28px",
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "#1D1D1F", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works with image ────────────── */}
      <section style={{ background: "#F5F5F7", padding: "72px 24px", borderTop: "1px solid #E8E8ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="how-it-works-grid">
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Simple by Design
              </span>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.5px", marginBottom: 32 }}>
                How TechSphere works
              </h2>
              <div style={{ border: "1px solid #E8E8ED", background: "#fff", overflow: "hidden" }}>
                {[
                  { step: "01", title: "You write", desc: "Click \"Write Post\", fill in your title and content, optionally add a cover image. No sign-up needed." },
                  { step: "02", title: "It publishes instantly", desc: "Your post goes live the moment you submit. Immediately accessible to anyone on the internet." },
                  { step: "03", title: "The community reads", desc: "Readers discover your post through the homepage, search, or topic browsing." },
                ].map(({ step, title, desc }, i) => (
                  <div key={step} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 28px", borderBottom: i < 2 ? "1px solid #E8E8ED" : "none" }}>
                    <span style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12, fontWeight: 700, color: "#fff",
                      background: "#010048",
                      padding: "4px 10px", flexShrink: 0,
                    }}>{step}</span>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "#1D1D1F", marginBottom: 6 }}>{title}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Stacked images */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ height: 220, overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=80"
                  alt="Writing on laptop"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ height: 150, overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80"
                    alt="Code"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ height: 150, overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
                    alt="Team"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────── */}
      <section style={{ background: "#010048", padding: "80px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(18px, 2.5vw, 30px)",
            fontWeight: 700, color: "#fff",
            letterSpacing: "-0.5px", marginBottom: 16,
          }}>
            Ready to share your knowledge?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of tech minds sharing what they know. No account, no barriers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/new" style={{
              padding: "13px 28px", background: "#fff", color: "#010048",
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Write Your First Post
            </a>
            <a href="/" style={{
              padding: "13px 28px",
              border: "1.5px solid rgba(255,255,255,0.4)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
              textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>
              Explore Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
