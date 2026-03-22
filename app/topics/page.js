"use client";

const metadata = {
  title: "Topics — TechSphere",
  description: "Browse tech articles by topic — AI, Web Development, Mobile, Cloud, Security, and more.",
};

const TOPICS = [
  { id: "ai",          title: "AI & Machine Learning",  desc: "Artificial intelligence, neural networks, LLMs, and machine learning breakthroughs.",        tags: ["ChatGPT", "Neural Networks", "LLMs", "Computer Vision"],  icon: "🤖", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80" },
  { id: "web",         title: "Web Development",         desc: "Frontend frameworks, backend APIs, and everything about building for the modern web.",        tags: ["React", "Next.js", "Node.js", "CSS"],                      icon: "🌐", image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&q=80" },
  { id: "mobile",      title: "Mobile Development",      desc: "Native and cross-platform mobile development for iOS and Android.",                            tags: ["React Native", "Flutter", "iOS", "Swift"],                icon: "📱", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  { id: "cloud",       title: "Cloud & DevOps",          desc: "Infrastructure, CI/CD pipelines, containerization, and cloud-native architectures.",           tags: ["AWS", "Docker", "Kubernetes", "Terraform"],               icon: "☁️", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80" },
  { id: "security",    title: "Cybersecurity",           desc: "Protecting systems, applications, and data in an increasingly connected world.",               tags: ["Zero Trust", "Auth", "Encryption", "OWASP"],              icon: "🔐", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80" },
  { id: "opensource",  title: "Open Source",             desc: "The open source ecosystem, contributing to projects, and building in public.",                 tags: ["GitHub", "Contributing", "OSS", "Community"],             icon: "🔓", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80" },
  { id: "data",        title: "Data Science",            desc: "Data analysis, visualization, statistical modeling, and insights from large datasets.",        tags: ["Python", "Pandas", "SQL", "Statistics"],                  icon: "📊", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  { id: "devops",      title: "DevOps",                  desc: "Automation, monitoring, and modern deployment practices bridging development and operations.",  tags: ["CI/CD", "Monitoring", "Ansible", "GitOps"],               icon: "⚙️", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" },
  { id: "programming", title: "Programming",             desc: "Languages, algorithms, design patterns, and the craft of writing great code.",                  tags: ["Python", "Rust", "Go", "Algorithms"],                     icon: "💻", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
  { id: "ux",          title: "UI & UX Design",          desc: "User experience, interface design, accessibility, and the intersection of design and engineering.", tags: ["Figma", "Accessibility", "Design Systems"],            icon: "🎨", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
  { id: "startup",     title: "Tech & Startups",         desc: "Building products, startup culture, founder stories, and navigating the tech industry.",       tags: ["SaaS", "Product", "Fundraising", "Growth"],              icon: "🚀", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80" },
  { id: "hardware",    title: "Hardware & IoT",          desc: "Embedded systems, IoT devices, microcontrollers, and the physical side of technology.",        tags: ["Raspberry Pi", "Arduino", "IoT", "Embedded"],            icon: "🔧", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
];

export default function TopicsPage() {
  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ── Hero with image overlay ────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 380 }}>
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80"
          alt="Technology topics"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg, rgba(1,0,72,0.96) 0%, rgba(1,0,72,0.78) 60%, rgba(1,0,72,0.52) 100%)",
        }}/>
        {/* Newspaper top rule */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "80px 24px 68px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 3, background: "rgba(255,255,255,0.5)" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Browse by Topic
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 4vw, 48px)",
            fontWeight: 900, color: "#fff",
            lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 18,
          }}>
            Find what<br/><em style={{ fontStyle: "italic" }}>interests you</em>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontWeight: 300, maxWidth: 480 }}>
            Explore {TOPICS.length} technology topics and discover articles from the TechSphere community.
          </p>
        </div>
      </section>

      {/* ── Section header ─────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ borderTop: "3px solid #010048", paddingTop: 10 }}>
          <div style={{ height: 1, background: "#D2D2D7", marginBottom: 16 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase" }}>
              All Sections
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{TOPICS.length} topics</span>
          </div>
        </div>
      </div>

      {/* ── Topics Grid with images ────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {TOPICS.map(topic => (
            <a
              key={topic.id}
              href={`/blog?category=${encodeURIComponent(topic.id)}`}
              id={topic.id}
              style={{
                display: "block",
                textDecoration: "none",
                background: "#fff",
                border: "1px solid #E8E8ED",
                borderTop: "3px solid #010048",
                overflow: "hidden",
                transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(1,0,72,0.13)";
                e.currentTarget.style.borderColor = "#010048";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#E8E8ED";
              }}
            >
              {/* Topic image thumbnail */}
              <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
                <img
                  src={topic.image}
                  alt={topic.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.72 }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 30%, rgba(1,0,72,0.68) 100%)",
                }}/>
                <div style={{ position: "absolute", bottom: 10, left: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{topic.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "18px 20px 20px" }}>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16, fontWeight: 700,
                  color: "#1D1D1F", letterSpacing: "-0.2px",
                  lineHeight: 1.25, marginBottom: 8,
                }}>{topic.title}</h3>

                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13, color: "#6E6E73",
                  lineHeight: 1.65, marginBottom: 14,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>{topic.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {topic.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                      padding: "3px 10px",
                      border: "1px solid #E8E8ED",
                      background: "#F5F5F7",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10, fontWeight: 600,
                      color: "#6E6E73", letterSpacing: "0.3px",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────── */}
      <section style={{ background: "#010048", padding: "72px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 14 }}>
            <span style={{ display: "inline-block", width: 20, height: 2, background: "rgba(255,255,255,0.35)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Don&apos;t see your topic?
            </span>
            <span style={{ display: "inline-block", width: 20, height: 2, background: "rgba(255,255,255,0.35)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: 16, lineHeight: 1.1 }}>
            TechSphere is open for any tech topic
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 32, lineHeight: 1.75 }}>
            Write about what you know. No gatekeeping, no barriers.
          </p>
          <a href="/new" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 32px",
            background: "#fff", color: "#010048",
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
            textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
            transition: "opacity 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Write About It →
          </a>
        </div>
      </section>
    </div>
  );
}
