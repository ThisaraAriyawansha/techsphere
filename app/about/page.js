export const metadata = {
  title: "About — TechSphere",
  description: "Learn about TechSphere, an open platform for the tech community.",
};

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
          background: "linear-gradient(110deg, rgba(1,0,87,0.95) 0%, rgba(1,0,87,0.80) 55%, rgba(1,0,87,0.50) 100%)",
        }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "96px 24px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#fff" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
              Our Story
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px, 5vw, 58px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 20,
          }}>
            Built for the<br/>tech community
          </h1>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17, color: "rgba(255,255,255,0.65)",
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
              <span style={{ display: "inline-block", width: 20, height: 3, background: "#010057" }}/>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#010057", textTransform: "uppercase" }}>
                Our Mission
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700, color: "#010057",
              letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 20,
            }}>
              Democratize tech knowledge, one post at a time
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#55557A", lineHeight: 1.8, marginBottom: 14 }}>
              We believe great ideas shouldn&apos;t be locked behind paywalls or accounts. TechSphere was created so that developers, designers, and tech enthusiasts can share their insights freely.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#55557A", lineHeight: 1.8, marginBottom: 28 }}>
              Whether you&apos;re sharing a breakthrough, a tutorial, or your thoughts on the latest trends — this is your platform.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="/new" className="h-opacity" style={{
                padding: "11px 24px", background: "#010057", color: "#fff",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
                textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
              }}>
                Start Writing
              </a>
              <a href="/" className="h-border-dark" style={{
                padding: "11px 24px", border: "1px solid #DDE0F5", color: "#55557A",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
                textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
              }}>
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
              background: "linear-gradient(0deg, rgba(1,0,87,0.85) 0%, transparent 100%)",
              padding: "32px 24px 20px",
            }}>
              <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "#fff", fontSize: 16 }}>
                &ldquo;Great ideas belong to everyone.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats section with background ─────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
          alt="Tech community event"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(1,0,87,0.91)" }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 12 }}>
              <span style={{ display: "inline-block", width: 20, height: 2, background: "rgba(255,255,255,0.4)" }}/>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                Platform Impact
              </span>
              <span style={{ display: "inline-block", width: 20, height: 2, background: "rgba(255,255,255,0.4)" }}/>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>
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
              <div key={stat.label} style={{ background: "rgba(1,0,87,0.7)", padding: "36px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 8 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────── */}
      <section style={{ background: "#FFFFFF", borderTop: "3px solid #010057", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ display: "inline-block", width: 20, height: 3, background: "#010057" }}/>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#010057", textTransform: "uppercase" }}>
                What We Stand For
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#010057", letterSpacing: "-0.5px" }}>
              Core values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 0, border: "1px solid #DDE0F5" }}>
            {[
              { title: "Open Access",      desc: "All content is freely accessible to everyone, always. No exceptions.",              icon: "🔓" },
              { title: "Simplicity",       desc: "We keep the experience clean and fast. Focus on content, not complexity.",           icon: "✨" },
              { title: "Community First",  desc: "TechSphere exists for its readers and writers — the community shapes it.",           icon: "🌍" },
              { title: "Privacy Respect",  desc: "We don't track you unnecessarily. Your data is yours.",                              icon: "🔒" },
            ].map(({ title, desc, icon }, i) => (
              <div key={title} style={{
                background: i % 2 === 0 ? "#FFFFFF" : "#F0F0FA",
                padding: "32px 28px",
                borderRight: i % 2 === 0 ? "1px solid #DDE0F5" : "none",
                borderBottom: i < 2 ? "1px solid #DDE0F5" : "none",
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
                <div style={{ width: 24, height: 3, background: "#010057", marginBottom: 14 }}/>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: "#010057", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#55557A", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works with image ────────────── */}
      <section style={{ background: "#F0F0FA", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="how-it-works-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ display: "inline-block", width: 20, height: 3, background: "#010057" }}/>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#010057", textTransform: "uppercase" }}>
                  Simple by Design
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#010057", letterSpacing: "-0.5px", marginBottom: 32 }}>
                How TechSphere works
              </h2>
              <div style={{ border: "1px solid #DDE0F5", background: "#fff", borderTop: "3px solid #010057" }}>
                {[
                  { step: "01", title: "You write", desc: "Click \"Write Post\", fill in your title and content, optionally add a cover image. No sign-up needed." },
                  { step: "02", title: "It publishes instantly", desc: "Your post goes live the moment you submit. Immediately accessible to anyone on the internet." },
                  { step: "03", title: "The community reads", desc: "Readers discover your post through the homepage, search, or topic browsing." },
                ].map(({ step, title, desc }, i) => (
                  <div key={step} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 28px", borderBottom: i < 2 ? "1px solid #EEEEF8" : "none" }}>
                    <span style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 12, fontWeight: 700, color: "#fff",
                      background: "#010057",
                      padding: "3px 10px", flexShrink: 0,
                    }}>{step}</span>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 700, color: "#010057", marginBottom: 6 }}>{title}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#55557A", lineHeight: 1.7 }}>{desc}</p>
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
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80"
          alt="Open newspaper"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(1,0,87,0.90)" }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(24px, 3.5vw, 40px)",
            fontWeight: 700, color: "#fff",
            letterSpacing: "-0.5px", marginBottom: 16,
          }}>
            Ready to share your knowledge?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of tech minds sharing what they know. No account, no barriers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/new" className="h-opacity" style={{
              padding: "13px 28px", background: "#fff", color: "#010057",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
              textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
            }}>
              Write Your First Post
            </a>
            <a href="/" className="h-inv-btn" style={{
              padding: "13px 28px",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.75)",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
              textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
            }}>
              Explore Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
