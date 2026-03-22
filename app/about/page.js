"use client";

export default function AboutPage() {
  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ── Hero with image overlay ────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 440 }}>
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80"
          alt="Tech workspace"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg, rgba(1,0,72,0.94) 0%, rgba(1,0,72,0.78) 55%, rgba(1,0,72,0.46) 100%)",
        }}/>
        {/* Newspaper top rule */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "88px 24px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 3, background: "rgba(255,255,255,0.5)" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Our Story
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 900, color: "#fff",
            lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 22,
          }}>
            Built for the<br/><em style={{ fontStyle: "italic" }}>tech community</em>
          </h1>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17, color: "rgba(255,255,255,0.7)",
            lineHeight: 1.85, fontWeight: 300, maxWidth: 500,
          }}>
            TechSphere is a free, open publishing platform where anyone can read and write about technology — no account, no barriers, just knowledge.
          </p>
        </div>
      </section>

      {/* ── Mission with image ─────────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px" }}>
        <div className="about-two-col">
          <div>
            {/* Newspaper section header */}
            <div style={{ borderTop: "3px solid #010048", paddingTop: 10, marginBottom: 22 }}>
              <div style={{ height: 1, background: "#D2D2D7", marginBottom: 18 }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase" }}>
                Our Mission
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 3vw, 34px)",
              fontWeight: 800, color: "#1D1D1F",
              letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: 22,
            }}>
              Democratize tech knowledge, one post at a time
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#6E6E73", lineHeight: 1.85, marginBottom: 14 }}>
              We believe great ideas shouldn&apos;t be locked behind paywalls or accounts. TechSphere was created so that developers, designers, and tech enthusiasts can share their insights freely.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#6E6E73", lineHeight: 1.85, marginBottom: 30 }}>
              Whether you&apos;re sharing a breakthrough, a tutorial, or your thoughts on the latest trends — this is your platform.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="/new" style={{
                padding: "11px 24px", background: "#010048", color: "#fff",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
                textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
                transition: "opacity 0.15s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Start Writing
              </a>
              <a href="/" style={{
                padding: "11px 24px", border: "2px solid #010048", color: "#010048",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
                textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
                transition: "background 0.15s, color 0.15s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#010048"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#010048"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Read Articles
              </a>
            </div>
          </div>

          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden", height: 380 }}>
            {/* Newspaper top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#010048", zIndex: 2 }} />
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80"
              alt="Developer coding"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(0deg, rgba(1,0,72,0.85) 0%, transparent 100%)",
              padding: "32px 24px 20px",
            }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: 17, fontStyle: "italic" }}>
                &ldquo;Great ideas belong to everyone.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats section ─────────────────────── */}
      <section style={{ background: "#F5F5F7", borderTop: "1px solid #E8E8ED", borderBottom: "1px solid #E8E8ED", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ borderTop: "3px solid #010048", paddingTop: 10, marginBottom: 40 }}>
            <div style={{ height: 1, background: "#D2D2D7", marginBottom: 24 }} />
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
                Platform Impact
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800, color: "#1D1D1F", letterSpacing: "-0.5px" }}>
                A growing community of tech minds
              </h2>
            </div>
          </div>
          <div className="about-stats-grid">
            {[
              { value: "∞", label: "Articles Published" },
              { value: "Free", label: "Always & Forever" },
              { value: "0", label: "Login Required" },
              { value: "Open", label: "Community Platform" },
            ].map(stat => (
              <div key={stat.label} style={{
                background: "#fff", border: "1px solid #E8E8ED",
                borderTop: "3px solid #010048",
                padding: "36px 20px", textAlign: "center",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(1,0,72,0.10)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 900, color: "#010048", letterSpacing: "-1px", marginBottom: 10 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#6E6E73", letterSpacing: "0.5px", textTransform: "uppercase" }}>
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
          {/* Section header */}
          <div style={{ borderTop: "3px solid #010048", paddingTop: 10, marginBottom: 36 }}>
            <div style={{ height: 1, background: "#D2D2D7", marginBottom: 20 }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
              What We Stand For
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#1D1D1F", letterSpacing: "-0.5px" }}>
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
                borderTop: "3px solid #010048",
                padding: "32px 28px",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(1,0,72,0.10)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#1D1D1F", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73", lineHeight: 1.7 }}>{desc}</p>
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
              {/* Section header */}
              <div style={{ borderTop: "3px solid #010048", paddingTop: 10, marginBottom: 28 }}>
                <div style={{ height: 1, background: "#D2D2D7", marginBottom: 18 }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                  Simple by Design
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#1D1D1F", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
                  How TechSphere works
                </h2>
              </div>
              <div style={{ border: "1px solid #E8E8ED", background: "#fff", overflow: "hidden" }}>
                {[
                  { step: "01", title: "You write", desc: "Click \"Write Post\", fill in your title and content, optionally add a cover image. No sign-up needed." },
                  { step: "02", title: "It publishes instantly", desc: "Your post goes live the moment you submit. Immediately accessible to anyone on the internet." },
                  { step: "03", title: "The community reads", desc: "Readers discover your post through the homepage, search, or topic browsing." },
                ].map(({ step, title, desc }, i) => (
                  <div key={step} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 28px", borderBottom: i < 2 ? "1px solid #E8E8ED" : "none" }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13, fontWeight: 900, color: "#fff",
                      background: "#010048",
                      padding: "5px 10px", flexShrink: 0,
                      letterSpacing: "0.5px",
                    }}>{step}</span>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#1D1D1F", marginBottom: 6 }}>{title}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73", lineHeight: 1.75 }}>{desc}</p>
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
      <section style={{ background: "#010048", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 900, color: "#fff",
            letterSpacing: "-0.5px", lineHeight: 1.05, marginBottom: 18,
          }}>
            Ready to share your knowledge?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 36, lineHeight: 1.8 }}>
            Join thousands of tech minds sharing what they know. No account, no barriers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/new" style={{
              padding: "13px 28px", background: "#fff", color: "#010048",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
              textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Write Your First Post
            </a>
            <a href="/" style={{
              padding: "13px 28px",
              border: "2px solid rgba(255,255,255,0.4)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
              textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
              transition: "border-color 0.15s, color 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Explore Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
