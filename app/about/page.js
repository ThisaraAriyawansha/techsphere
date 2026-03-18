export const metadata = {
  title: "About — TechSphere",
  description: "Learn about TechSphere, an open platform for the tech community.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#FAF8F5" }}>

      {/* Hero */}
      <section style={{
        background: "#1A1A1A",
        padding: "80px 24px 72px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "4px solid #C41E3A",
      }}>
        {/* Background decorative text */}
        <div style={{
          position: "absolute", right: -20, top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(120px, 18vw, 220px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}>ABOUT</div>

        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10, fontWeight: 700, letterSpacing: "2.5px",
            color: "#C41E3A", textTransform: "uppercase", marginBottom: 18,
          }}>Our Story</p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 20,
          }}>
            Built for the<br />tech community
          </h1>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16, color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8, fontWeight: 300, maxWidth: 480,
          }}>
            TechSphere is a free, open publishing platform where anyone can read and write about technology — no account, no barriers, just knowledge.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 24px" }}>
        <div className="about-two-col">
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#C41E3A", textTransform: "uppercase", marginBottom: 14 }}>
              Our Mission
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700, color: "#1A1A1A",
              letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 20,
            }}>
              Democratize tech knowledge, one post at a time
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 14 }}>
              We believe great ideas shouldn&apos;t be locked behind paywalls or accounts. TechSphere was created so that developers, designers, and tech enthusiasts can share their insights freely.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#666", lineHeight: 1.8 }}>
              Whether you&apos;re sharing a breakthrough, a tutorial, or your thoughts on the latest trends — this is your platform.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #D4CFC8", borderTop: "3px solid #1A1A1A" }}>
            {[
              { title: "Write Freely", desc: "No account required. Open the editor, write your post, share it with the world." },
              { title: "Read Everything", desc: "Full access to all articles, always. No login walls, no paywalls, ever." },
              { title: "Global Community", desc: "Your insights reach developers and tech enthusiasts worldwide." },
            ].map(({ title, desc }, i) => (
              <div key={title} style={{ padding: "24px 28px", borderBottom: i < 2 ? "1px solid #EAE7E0" : "none" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "#1A1A1A", fontSize: 16, marginBottom: 8 }}>{title}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#666", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#fff", borderTop: "3px solid #1A1A1A", borderBottom: "1px solid #D4CFC8", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#C41E3A", textTransform: "uppercase", marginBottom: 12 }}>
              What We Stand For
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.5px" }}>
              Core values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 0, border: "1px solid #D4CFC8" }}>
            {[
              { title: "Open Access", desc: "All content is freely accessible to everyone, always. No exceptions." },
              { title: "Simplicity", desc: "We keep the experience clean and fast. Focus on content, not complexity." },
              { title: "Community First", desc: "TechSphere exists for its readers and writers — the community shapes it." },
              { title: "Privacy Respect", desc: "We don't track you unnecessarily. Your data is yours." },
            ].map(({ title, desc }, i) => (
              <div key={title} style={{
                background: "#FAF8F5",
                padding: "28px 24px",
                borderRight: i % 2 === 0 ? "1px solid #D4CFC8" : "none",
                borderBottom: i < 2 ? "1px solid #D4CFC8" : "none",
              }}>
                <div style={{ width: 28, height: 3, background: "#C41E3A", marginBottom: 14 }}/>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: "#1A1A1A", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#666", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "#C41E3A", textTransform: "uppercase", marginBottom: 12 }}>
            Simple by Design
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.5px" }}>
            How TechSphere works
          </h2>
        </div>
        <div style={{ border: "1px solid #D4CFC8", background: "#fff", borderTop: "3px solid #1A1A1A" }}>
          {[
            { step: "01", title: "You write", desc: "Click \"Write Post\", fill in your title and content, optionally add a cover image. That's it — no sign-up needed." },
            { step: "02", title: "It publishes instantly", desc: "Your post goes live the moment you submit. Immediately accessible to anyone on the internet." },
            { step: "03", title: "The community reads", desc: "Readers discover your post through the homepage, search, or topic browsing." },
          ].map(({ step, title, desc }, i) => (
            <div key={step} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "28px 32px", borderBottom: i < 2 ? "1px solid #EAE7E0" : "none" }}>
              <span style={{
                fontFamily: "var(--font-serif)",
                fontSize: 13, fontWeight: 700, color: "#C41E3A",
                background: "rgba(196,30,58,0.06)",
                padding: "3px 12px", flexShrink: 0,
                border: "1px solid rgba(196,30,58,0.15)",
              }}>{step}</span>
              <div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#666", lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A1A1A", borderTop: "4px solid #C41E3A", padding: "72px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(24px, 3.5vw, 38px)",
            fontWeight: 700, color: "#fff",
            letterSpacing: "-0.5px", marginBottom: 16,
          }}>
            Ready to share your knowledge?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of tech minds sharing what they know. No account, no barriers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/new" className="h-opacity" style={{
              padding: "13px 28px", background: "#C41E3A", color: "#fff",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
              textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
            }}>
              Write Your First Post
            </a>
            <a href="/" className="h-inv-btn" style={{
              padding: "13px 28px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 11,
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
