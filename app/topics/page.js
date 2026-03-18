export const metadata = {
  title: "Topics — TechSphere",
  description: "Browse tech articles by topic — AI, Web Development, Mobile, Cloud, Security, and more.",
};

const TOPICS = [
  { id: "ai",         title: "AI & Machine Learning",  desc: "Artificial intelligence, neural networks, LLMs, and machine learning breakthroughs.", tags: ["ChatGPT", "Neural Networks", "LLMs", "Computer Vision", "NLP"] },
  { id: "web",        title: "Web Development",         desc: "Frontend frameworks, backend APIs, and everything about building for the modern web.", tags: ["React", "Next.js", "Node.js", "CSS", "TypeScript"] },
  { id: "mobile",     title: "Mobile Development",      desc: "Native and cross-platform mobile development for iOS and Android.", tags: ["React Native", "Flutter", "iOS", "Android", "Swift"] },
  { id: "cloud",      title: "Cloud & DevOps",          desc: "Infrastructure, CI/CD pipelines, containerization, and cloud-native architectures.", tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"] },
  { id: "security",   title: "Cybersecurity",           desc: "Protecting systems, applications, and data in an increasingly connected world.", tags: ["Penetration Testing", "Zero Trust", "Auth", "Encryption", "OWASP"] },
  { id: "opensource", title: "Open Source",             desc: "The open source ecosystem, contributing to projects, and building in public.", tags: ["GitHub", "Contributing", "OSS Licenses", "Community"] },
  { id: "data",       title: "Data Science",            desc: "Data analysis, visualization, statistical modeling, and insights from large datasets.", tags: ["Python", "Pandas", "SQL", "Visualization", "Statistics"] },
  { id: "devops",     title: "DevOps",                  desc: "Automation, monitoring, and modern deployment practices bridging dev and ops.", tags: ["CI/CD", "Monitoring", "Ansible", "GitOps", "SRE"] },
  { id: "programming",title: "Programming",             desc: "Languages, algorithms, design patterns, and the craft of writing great code.", tags: ["Python", "Rust", "Go", "Java", "Algorithms"] },
  { id: "ux",         title: "UI & UX Design",          desc: "User experience, interface design, accessibility, and the intersection of design and engineering.", tags: ["Figma", "Accessibility", "Design Systems", "UX Research"] },
  { id: "startup",    title: "Tech & Startups",         desc: "Building products, startup culture, founder stories, and navigating the tech industry.", tags: ["SaaS", "Product", "Fundraising", "Growth"] },
  { id: "hardware",   title: "Hardware & IoT",          desc: "Embedded systems, IoT devices, microcontrollers, and the physical side of technology.", tags: ["Raspberry Pi", "Arduino", "IoT", "Embedded"] },
];

export default function TopicsPage() {
  return (
    <div style={{ background: "#f5f5f7" }}>

      {/* Hero */}
      <section style={{ background: "#010048", padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 18 }}>
            Browse by Topic
          </p>
          <h1 style={{ fontSize: "clamp(30px, 4.5vw, 50px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.2px", marginBottom: 18 }}>
            Find what interests you
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, fontWeight: 300 }}>
            Explore {TOPICS.length} technology topics and discover articles from the TechSphere community.
          </p>
        </div>
      </section>

      {/* Topics Grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 72px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: 1,
          background: "#e2e2e7",
          border: "1px solid #e2e2e7",
        }}>
          {TOPICS.map(topic => (
            <a
              key={topic.id}
              href={`/?search=${encodeURIComponent(topic.title.split(" ")[0])}`}
              id={topic.id}
              className="topic-card"
            >
              <h3 style={{
                fontSize: 16, fontWeight: 700,
                color: "#1d1d1f", letterSpacing: "-0.3px",
                marginBottom: 10, lineHeight: 1.3,
              }}>{topic.title}</h3>

              <p style={{
                fontSize: 13, color: "#6e6e73",
                lineHeight: 1.65, marginBottom: 18,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{topic.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {topic.tags.slice(0, 4).map(tag => (
                  <span key={tag} style={{
                    padding: "3px 9px",
                    border: "1px solid #e2e2e7",
                    background: "#f5f5f7",
                    fontSize: 11, fontWeight: 500,
                    color: "#6e6e73",
                  }}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", borderTop: "1px solid #e2e2e7", padding: "64px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.5px", marginBottom: 12 }}>
            Don't see your topic?
          </h2>
          <p style={{ fontSize: 15, color: "#6e6e73", marginBottom: 28, lineHeight: 1.7 }}>
            TechSphere is open for any tech topic. Write about what you know.
          </p>
          <a href="/new" className="h-opacity" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px",
            background: "#010048", color: "#fff",
            fontWeight: 600, fontSize: 13,
            textDecoration: "none",
          }}>
            Write About It →
          </a>
        </div>
      </section>
    </div>
  );
}
