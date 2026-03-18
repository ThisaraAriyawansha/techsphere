export const metadata = {
  title: "About — TechSphere",
  description: "Learn about TechSphere, an open platform for the tech community.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#f5f5f7" }}>

      {/* Hero */}
      <section style={{ background: "#010048", padding: "80px 24px 72px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 18 }}>
            Our Story
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 20 }}>
            Built for the<br />tech community
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, fontWeight: 300, maxWidth: 480 }}>
            TechSphere is a free, open publishing platform where anyone can read and write about technology — no account, no barriers, just knowledge.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 24px" }}>
        <div className="about-two-col">
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#010048", textTransform: "uppercase", marginBottom: 14 }}>Our Mission</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 20 }}>
              Democratize tech knowledge, one post at a time
            </h2>
            <p style={{ fontSize: 15, color: "#6e6e73", lineHeight: 1.8, marginBottom: 14 }}>
              We believe great ideas shouldn't be locked behind paywalls or accounts. TechSphere was created so that developers, designers, and tech enthusiasts can share their insights freely.
            </p>
            <p style={{ fontSize: 15, color: "#6e6e73", lineHeight: 1.8 }}>
              Whether you're sharing a breakthrough, a tutorial, or your thoughts on the latest trends — this is your platform.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e2e7" }}>
            {[
              { title: "Write Freely", desc: "No account required. Open the editor, write your post, share it with the world." },
              { title: "Read Everything", desc: "Full access to all articles, always. No login walls, no paywalls, ever." },
              { title: "Global Community", desc: "Your insights reach developers and tech enthusiasts worldwide." },
            ].map(({ title, desc }, i) => (
              <div key={title} style={{ padding: "24px 28px", borderBottom: i < 2 ? "1px solid #e2e2e7" : "none" }}>
                <p style={{ fontWeight: 700, color: "#1d1d1f", fontSize: 14, marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#fff", borderTop: "1px solid #e2e2e7", borderBottom: "1px solid #e2e2e7", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#010048", textTransform: "uppercase", marginBottom: 14 }}>What We Stand For</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.8px" }}>Core values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 1, background: "#e2e2e7", border: "1px solid #e2e2e7" }}>
            {[
              { title: "Open Access", desc: "All content is freely accessible to everyone, always. No exceptions." },
              { title: "Simplicity", desc: "We keep the experience clean and fast. Focus on content, not complexity." },
              { title: "Community First", desc: "TechSphere exists for its readers and writers — the community shapes it." },
              { title: "Privacy Respect", desc: "We don't track you unnecessarily. Your data is yours." },
            ].map(({ title, desc }) => (
              <div key={title} style={{ background: "#fff", padding: "28px 24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1d1d1f", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#010048", textTransform: "uppercase", marginBottom: 14 }}>Simple by Design</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.8px" }}>How TechSphere works</h2>
        </div>
        <div style={{ border: "1px solid #e2e2e7", background: "#fff" }}>
          {[
            { step: "01", title: "You write", desc: "Click \"Write Post\", fill in your title and content, optionally add a cover image. That's it — no sign-up needed." },
            { step: "02", title: "It publishes instantly", desc: "Your post goes live the moment you submit. Immediately accessible to anyone on the internet." },
            { step: "03", title: "The community reads", desc: "Readers discover your post through the homepage, search, or topic browsing." },
          ].map(({ step, title, desc }, i) => (
            <div key={step} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "28px 32px", borderBottom: i < 2 ? "1px solid #e2e2e7" : "none" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#010048", background: "rgba(1,0,72,0.06)", padding: "3px 10px", flexShrink: 0 }}>{step}</span>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1d1d1f", marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#010048", padding: "72px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.8px", marginBottom: 16 }}>
            Ready to share your knowledge?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of tech minds sharing what they know. No account, no barriers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/new" className="h-opacity" style={{
              padding: "13px 28px", background: "#fff", color: "#010048",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
            }}>Write Your First Post</a>
            <a href="/" className="h-border-white" style={{
              padding: "13px 28px",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 14,
              textDecoration: "none", transition: "border-color 0.15s",
            }}>Explore Articles</a>
          </div>
        </div>
      </section>
    </div>
  );
}
