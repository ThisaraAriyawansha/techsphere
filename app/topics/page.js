export const metadata = {
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
      <section style={{ position: "relative", overflow: "hidden", minHeight: 400 }}>
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80"
          alt="Technology topics"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg, rgba(1,0,87,0.96) 0%, rgba(1,0,87,0.80) 60%, rgba(1,0,87,0.55) 100%)",
        }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "88px 24px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#fff" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              Browse by Topic
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 4.5vw, 52px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.8px", marginBottom: 18,
          }}>
            Find what interests you
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300, maxWidth: 480 }}>
            Explore {TOPICS.length} technology topics and discover articles from the TechSphere community.
          </p>
        </div>
      </section>

      {/* ── Section header ─────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ borderTop: "3px solid #010057", borderBottom: "1px solid #DDE0F5", padding: "10px 0", marginBottom: 0, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#010057" }}>
            All Sections
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#8888A8" }}>{TOPICS.length} topics</span>
        </div>
      </div>

      {/* ── Topics Grid with images ────────────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 72px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 0,
          border: "1px solid #DDE0F5",
          borderRight: "none",
          borderBottom: "none",
        }}>
          {TOPICS.map(topic => (
            <a
              key={topic.id}
              href={`/?search=${encodeURIComponent(topic.title.split(" ")[0])}`}
              id={topic.id}
              className="h-bg"
              style={{
                display: "block",
                textDecoration: "none",
                background: "#fff",
                borderRight: "1px solid #DDE0F5",
                borderBottom: "1px solid #DDE0F5",
                overflow: "hidden",
              }}
            >
              {/* Topic image thumbnail */}
              <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
                <img
                  src={topic.image}
                  alt={topic.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 30%, rgba(1,0,87,0.75) 100%)",
                }}/>
                <div style={{ position: "absolute", bottom: 10, left: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{topic.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "18px 20px 20px" }}>
                <h3 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16, fontWeight: 700,
                  color: "#010057", letterSpacing: "-0.2px",
                  lineHeight: 1.3, marginBottom: 8,
                }}>{topic.title}</h3>

                <div style={{ width: 20, height: 2, background: "#010057", marginBottom: 10 }}/>

                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12, color: "#55557A",
                  lineHeight: 1.6, marginBottom: 12,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>{topic.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {topic.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                      padding: "2px 8px",
                      border: "1px solid #DDE0F5",
                      background: "#F0F0FA",
                      fontFamily: "var(--font-sans)",
                      fontSize: 9, fontWeight: 600,
                      color: "#55557A",
                      letterSpacing: "0.3px",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA Banner with image ──────────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80"
          alt="Team collaborating"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(1,0,87,0.88)" }}/>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 12 }}>
            <span style={{ display: "inline-block", width: 16, height: 2, background: "rgba(255,255,255,0.4)" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              Don&apos;t see your topic?
            </span>
            <span style={{ display: "inline-block", width: 16, height: 2, background: "rgba(255,255,255,0.4)" }}/>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.3px", marginBottom: 14 }}>
            TechSphere is open for any tech topic
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.7 }}>
            Write about what you know. No gatekeeping, no barriers.
          </p>
          <a href="/new" className="h-opacity" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px",
            background: "#fff", color: "#010057",
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
            textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
          }}>
            Write About It →
          </a>
        </div>
      </section>
    </div>
  );
}
