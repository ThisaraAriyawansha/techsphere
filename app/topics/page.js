export const metadata = {
  title: "Topics — TechSphere",
  description: "Browse tech articles by topic — AI, Web Development, Mobile, Cloud, Security, and more.",
};

const TOPICS = [
  { id: "ai",         title: "AI & Machine Learning",  desc: "Artificial intelligence, neural networks, LLMs, and machine learning breakthroughs.", tags: ["ChatGPT", "Neural Networks", "LLMs", "Computer Vision", "NLP"],          icon: "🤖" },
  { id: "web",        title: "Web Development",         desc: "Frontend frameworks, backend APIs, and everything about building for the modern web.", tags: ["React", "Next.js", "Node.js", "CSS", "TypeScript"],                       icon: "🌐" },
  { id: "mobile",     title: "Mobile Development",      desc: "Native and cross-platform mobile development for iOS and Android.",                  tags: ["React Native", "Flutter", "iOS", "Android", "Swift"],                     icon: "📱" },
  { id: "cloud",      title: "Cloud & DevOps",          desc: "Infrastructure, CI/CD pipelines, containerization, and cloud-native architectures.", tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],                      icon: "☁️" },
  { id: "security",   title: "Cybersecurity",           desc: "Protecting systems, applications, and data in an increasingly connected world.",     tags: ["Penetration Testing", "Zero Trust", "Auth", "Encryption", "OWASP"],       icon: "🔐" },
  { id: "opensource", title: "Open Source",             desc: "The open source ecosystem, contributing to projects, and building in public.",       tags: ["GitHub", "Contributing", "OSS Licenses", "Community"],                    icon: "🔓" },
  { id: "data",       title: "Data Science",            desc: "Data analysis, visualization, statistical modeling, and insights from large datasets.", tags: ["Python", "Pandas", "SQL", "Visualization", "Statistics"],               icon: "📊" },
  { id: "devops",     title: "DevOps",                  desc: "Automation, monitoring, and modern deployment practices bridging dev and ops.",      tags: ["CI/CD", "Monitoring", "Ansible", "GitOps", "SRE"],                        icon: "⚙️" },
  { id: "programming",title: "Programming",             desc: "Languages, algorithms, design patterns, and the craft of writing great code.",       tags: ["Python", "Rust", "Go", "Java", "Algorithms"],                             icon: "💻" },
  { id: "ux",         title: "UI & UX Design",          desc: "User experience, interface design, accessibility, and the intersection of design and engineering.", tags: ["Figma", "Accessibility", "Design Systems", "UX Research"],     icon: "🎨" },
  { id: "startup",    title: "Tech & Startups",         desc: "Building products, startup culture, founder stories, and navigating the tech industry.", tags: ["SaaS", "Product", "Fundraising", "Growth"],                           icon: "🚀" },
  { id: "hardware",   title: "Hardware & IoT",          desc: "Embedded systems, IoT devices, microcontrollers, and the physical side of technology.", tags: ["Raspberry Pi", "Arduino", "IoT", "Embedded"],                         icon: "🔧" },
];

export default function TopicsPage() {
  return (
    <div style={{ background: "#FAF8F5" }}>

      {/* Hero */}
      <section style={{
        background: "#1A1A1A",
        padding: "72px 24px 64px",
        borderBottom: "4px solid #C41E3A",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-serif)", fontSize: "clamp(100px, 16vw, 180px)",
          fontWeight: 900, color: "rgba(255,255,255,0.03)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>TOPICS</div>

        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", color: "#C41E3A", textTransform: "uppercase", marginBottom: 18 }}>
            Browse by Topic
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 4.5vw, 50px)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.8px", marginBottom: 18,
          }}>
            Find what interests you
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontWeight: 300 }}>
            Explore {TOPICS.length} technology topics and discover articles from the TechSphere community.
          </p>
        </div>
      </section>

      {/* Section header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ borderTop: "3px solid #1A1A1A", borderBottom: "1px solid #D4CFC8", padding: "10px 0", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C41E3A" }}>
            All Sections
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#999" }}>{TOPICS.length} topics</span>
        </div>
      </div>

      {/* Topics Grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 72px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: 0,
          border: "1px solid #D4CFC8",
          borderRight: "none",
          borderBottom: "none",
        }}>
          {TOPICS.map(topic => (
            <a
              key={topic.id}
              href={`/?search=${encodeURIComponent(topic.title.split(" ")[0])}`}
              id={topic.id}
              className="topic-card"
            >
              {/* Icon + title */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{topic.icon}</span>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 17, fontWeight: 700,
                    color: "#1A1A1A", letterSpacing: "-0.2px",
                    lineHeight: 1.3, marginBottom: 0,
                  }}>{topic.title}</h3>
                </div>
              </div>

              {/* Red accent */}
              <div style={{ width: 24, height: 2, background: "#C41E3A", marginBottom: 12 }}/>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13, color: "#666",
                lineHeight: 1.65, marginBottom: 16,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{topic.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {topic.tags.slice(0, 4).map(tag => (
                  <span key={tag} style={{
                    padding: "3px 9px",
                    border: "1px solid #D4CFC8",
                    background: "#FAF8F5",
                    fontFamily: "var(--font-sans)",
                    fontSize: 10, fontWeight: 600,
                    color: "#666",
                    letterSpacing: "0.3px",
                  }}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", borderTop: "3px solid #1A1A1A", borderBottom: "1px solid #D4CFC8", padding: "64px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C41E3A", marginBottom: 12 }}>
            Don&apos;t see your topic?
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.3px", marginBottom: 12 }}>
            TechSphere is open for any tech topic
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#666", marginBottom: 28, lineHeight: 1.7 }}>
            Write about what you know. No gatekeeping, no barriers.
          </p>
          <a href="/new" className="h-opacity" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px",
            background: "#1A1A1A", color: "#fff",
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
