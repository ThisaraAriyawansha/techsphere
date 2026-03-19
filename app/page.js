"use client";
import { useEffect, useRef, useState } from "react";
import { getPosts } from "../lib/firebase";

const TOPICS = [
  { label: "All",          key: null },
  { label: "AI & ML",      key: "ai" },
  { label: "Web Dev",      key: "web" },
  { label: "Mobile",       key: "mobile" },
  { label: "Cloud",        key: "cloud" },
  { label: "Security",     key: "security" },
  { label: "Open Source",  key: "open source" },
  { label: "Data Science", key: "data" },
  { label: "DevOps",       key: "devops" },
  { label: "Programming",  key: "programming" },
];

const TOPIC_META = [
  { key: "ai",       label: "AI & Machine Learning", icon: "🤖", color: "#4F46E5", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80" },
  { key: "web",      label: "Web Development",       icon: "🌐", color: "#0891B2", image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&q=80" },
  { key: "cloud",    label: "Cloud & DevOps",        icon: "☁️", color: "#0D9488", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80" },
  { key: "security", label: "Cybersecurity",         icon: "🔒", color: "#2563EB", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80" },
];

export default function HomePage() {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const activeTopic             = null;

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    const matchT = !activeTopic || p.title?.toLowerCase().includes(activeTopic) || p.description?.toLowerCase().includes(activeTopic);
    return matchQ && matchT;
  });

  const isFiltered = search || activeTopic;

  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ── Hero ─────────────────────────────────── */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #E8E8ED", overflow: "hidden" }}>

        {/* Two-column content */}
        <div className="hero-two-col">

          {/* ── LEFT: Text ── */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginBottom: 28, padding: "5px 14px",
              background: "#F5F5F7",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#010048", display: "inline-block", flexShrink: 0 }}/>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#010048" }}>
                Open Tech Publication
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800, color: "#1D1D1F",
              lineHeight: 1.05, letterSpacing: "-2px",
              marginBottom: 20,
            }}>
              Where Tech<br/>Minds Meet
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15, color: "#6E6E73",
              lineHeight: 1.8, maxWidth: 420, marginBottom: 36, fontWeight: 400,
            }}>
              Discover tutorials, insights, and breakthroughs from developers and engineers worldwide. No login. Always free.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="#posts" style={{
                padding: "13px 28px", background: "#010048", color: "#fff",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Explore Articles
              </a>
              <a href="/new" style={{
                padding: "13px 28px",
                border: "1.5px solid #010048", color: "#010048",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#010048"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#010048"; }}>
                Write a Post
              </a>
            </div>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", paddingTop: 24, borderTop: "1px solid #E8E8ED" }}>
              {[
                { value: loading ? "—" : posts.length, label: "Articles" },
                { value: "Free",  label: "Always" },
                { value: "Open",  label: "Community" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.5px" }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Robot illustration ── */}
          <div className="hero-illus-wrap" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>

            {/* Glow under robot */}
            <div className="hero-bot-glow" style={{
              position: "absolute", bottom: "8%", left: "50%",
              width: 180, height: 24, background: "rgba(1,0,72,0.07)",
              filter: "blur(18px)", borderRadius: "50%", transform: "translateX(-50%)",
            }}/>

            {/* Robot SVG */}
            <svg className="hero-robot" width="300" height="360" viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="148" y="18" width="4" height="42" rx="2" fill="#E8E8ED"/>
              <circle cx="150" cy="13" r="9" fill="#010048" opacity="0.1"/>
              <circle className="hero-ant-pulse" cx="150" cy="13" r="6" fill="#010048"/>
              <circle cx="150" cy="13" r="3" fill="#fff"/>
              <rect x="85" y="58" width="130" height="108" rx="18" fill="#F5F5F7" stroke="#E8E8ED" strokeWidth="1.5"/>
              <rect x="89" y="62" width="55" height="16" rx="8" fill="#fff" opacity="0.7"/>
              <rect x="103" y="86" width="38" height="30" rx="7" fill="#010048"/>
              <circle cx="122" cy="101" r="11" fill="#6E6E73"/>
              <circle cx="122" cy="101" r="5.5" fill="#fff" opacity="0.95"/>
              <circle cx="125" cy="98"  r="2.2" fill="#fff"/>
              <rect x="159" y="86" width="38" height="30" rx="7" fill="#010048"/>
              <circle cx="178" cy="101" r="11" fill="#6E6E73"/>
              <circle cx="178" cy="101" r="5.5" fill="#fff" opacity="0.95"/>
              <circle cx="181" cy="98"  r="2.2" fill="#fff"/>
              <rect x="120" y="138" width="60" height="10" rx="5" fill="#E8E8ED"/>
              <rect x="127" y="141" width="22" height="4" rx="2" fill="#010048" opacity="0.45"/>
              <rect x="153" y="141" width="20" height="4" rx="2" fill="#A1A1A6" opacity="0.4"/>
              <rect x="135" y="166" width="30" height="18" rx="4" fill="#E8E8ED"/>
              <rect x="70" y="182" width="160" height="128" rx="18" fill="#F5F5F7" stroke="#E8E8ED" strokeWidth="1.5"/>
              <rect x="96" y="200" width="108" height="84" rx="7" fill="#010048" stroke="#010048" strokeWidth="1"/>
              <rect x="104" y="212" width="38" height="3" rx="1.5" fill="#A1A1A6" opacity="0.9"/>
              <rect x="104" y="220" width="68" height="3" rx="1.5" fill="rgba(255,255,255,0.22)"/>
              <rect x="104" y="228" width="52" height="3" rx="1.5" fill="rgba(255,255,255,0.14)"/>
              <rect x="104" y="236" width="62" height="3" rx="1.5" fill="#A1A1A6" opacity="0.45"/>
              <rect x="104" y="244" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.11)"/>
              <rect x="104" y="252" width="72" height="3" rx="1.5" fill="rgba(255,255,255,0.16)"/>
              <rect x="104" y="260" width="32" height="3" rx="1.5" fill="#A1A1A6" opacity="0.55"/>
              <rect x="104" y="268" width="56" height="3" rx="1.5" fill="rgba(255,255,255,0.09)"/>
              <circle cx="87"  cy="216" r="3" fill="#010048" opacity="0.3"/>
              <circle cx="87"  cy="234" r="3" fill="#010048" opacity="0.18"/>
              <circle cx="213" cy="216" r="3" fill="#010048" opacity="0.3"/>
              <circle cx="213" cy="234" r="3" fill="#010048" opacity="0.18"/>
              <rect x="18"  y="190" width="52" height="26" rx="13" fill="#F5F5F7" stroke="#E8E8ED" strokeWidth="1.5"/>
              <circle cx="34" cy="203" r="6" fill="#010048" opacity="0.15"/>
              <rect x="230" y="190" width="52" height="26" rx="13" fill="#F5F5F7" stroke="#E8E8ED" strokeWidth="1.5"/>
              <circle cx="266" cy="203" r="6" fill="#010048" opacity="0.15"/>
              <rect x="100" y="306" width="36" height="42" rx="10" fill="#F5F5F7" stroke="#E8E8ED" strokeWidth="1.5"/>
              <rect x="94"  y="340" width="48" height="12" rx="6"  fill="#E8E8ED" stroke="#E8E8ED" strokeWidth="1"/>
              <rect x="164" y="306" width="36" height="42" rx="10" fill="#F5F5F7" stroke="#E8E8ED" strokeWidth="1.5"/>
              <rect x="158" y="340" width="48" height="12" rx="6"  fill="#E8E8ED" stroke="#E8E8ED" strokeWidth="1"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── Trending Topic Cards ─────────────────── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 0 20px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>
              Trending Topics
            </span>
            <a href="/topics" style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "#6E6E73", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#010048"}
              onMouseLeave={e => e.currentTarget.style.color = "#6E6E73"}>
              All Topics →
            </a>
          </div>
          <div className="trending-grid" style={{ marginBottom: 32 }}>
            {TOPIC_META.map(topic => (
              <button
                key={topic.key}
                onClick={() => { window.location.href = `/blog?category=${topic.key}`; }}
                style={{
                  position: "relative", overflow: "hidden",
                  height: 140, border: "none", cursor: "pointer",
                  textAlign: "left", padding: 0,
                  background: "#010048",
                  outline: "none",
                }}
              >
                <img src={topic.image} alt={topic.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}/>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${topic.color}BB 0%, rgba(1,0,72,0.7) 100%)` }}/>
                <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{topic.icon}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
                    {topic.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topic filter tabs ─────────────────────── */}
      <TopicsBar topics={TOPICS} activeTopic={activeTopic} />

      {/* ── Main content ──────────────────────────── */}
      <section id="posts" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Section header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
          paddingBottom: 16,
          borderBottom: "1px solid #E8E8ED",
          marginBottom: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>
              {activeTopic ? TOPICS.find(t => t.key === activeTopic)?.label : search ? `Results for "${search}"` : "Latest Articles"}
            </span>
            {!search && (
              <span style={{ fontSize: 13, color: "#A1A1A6", fontFamily: "var(--font-sans)" }}>
                {filtered.length} {filtered.length !== 1 ? "articles" : "article"}
              </span>
            )}
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {loading ? <LoadingGrid /> : filtered.length === 0 ? (
          <EmptyState search={search} onClear={() => { setSearch(""); }} />
        ) : (
          <div>
            {filtered.length > 0 && !isFiltered && (
              <div style={{ marginBottom: 24, marginTop: 24 }}>
                <FeaturedRow post={filtered[0]} secondaryPosts={filtered.slice(1, 4)} />
              </div>
            )}
            <div className="posts-grid">
              {(isFiltered ? filtered : filtered.slice(1)).map(post => (
                <div key={post.id} className="post-card-wrap">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Explore Topics Strip ─────────────────── */}
      <section style={{ background: "#F5F5F7", borderTop: "1px solid #E8E8ED", borderBottom: "1px solid #E8E8ED", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>
              Explore Topics
            </span>
            <a href="/topics" style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "#6E6E73", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#010048"}
              onMouseLeave={e => e.currentTarget.style.color = "#6E6E73"}>
              View All →
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { label: "AI & Machine Learning", icon: "🤖", href: "/blog?category=ai" },
              { label: "Web Development",        icon: "🌐", href: "/blog?category=web" },
              { label: "Cloud & DevOps",         icon: "☁️", href: "/blog?category=cloud" },
              { label: "Cybersecurity",          icon: "🔐", href: "/blog?category=security" },
              { label: "Mobile Development",     icon: "📱", href: "/blog?category=mobile" },
              { label: "Data Science",           icon: "📊", href: "/blog?category=data" },
              { label: "Open Source",            icon: "🔓", href: "/blog?category=opensource" },
              { label: "Programming",            icon: "💻", href: "/blog?category=programming" },
              { label: "UI & UX Design",         icon: "🎨", href: "/blog?category=ux" },
              { label: "Tech & Startups",        icon: "🚀", href: "/blog?category=startup" },
            ].map(tag => (
              <a key={tag.label} href={tag.href} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 16px",
                background: "#fff",
                border: "1px solid #E8E8ED",
                fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500,
                color: "#1D1D1F", textDecoration: "none",
                transition: "border-color 0.15s, background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#010048"; e.currentTarget.style.background = "#010048"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8ED"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#1D1D1F"; }}>
                <span>{tag.icon}</span> {tag.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why TechSphere ───────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Why TechSphere
            </span>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, color: "#1D1D1F", marginTop: 12, letterSpacing: "-0.5px" }}>
              A Platform Built for the Community
            </h2>
          </div>
          <div className="why-grid">
            {[
              { icon: "✍️", title: "Write Freely",    desc: "No account required. Share your knowledge, tutorials, and insights in minutes." },
              { icon: "📖", title: "Read Everything", desc: "Thousands of articles across AI, web dev, cloud, security, and more — always free." },
              { icon: "🌍", title: "Open Community",  desc: "A global platform where developers, engineers, and enthusiasts connect and learn." },
            ].map(item => (
              <div key={item.title} style={{
                background: "#fff",
                border: "1px solid #E8E8ED",
                padding: "32px 28px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 36, marginBottom: 18 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "#1D1D1F", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6E6E73", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ─────────────────────────── */}
      <section style={{ background: "#F5F5F7", borderTop: "1px solid #E8E8ED", padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px", color: "#A1A1A6", textTransform: "uppercase", marginBottom: 16 }}>
            Stay Updated
          </p>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 16 }}>
            Never miss a great article
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#6E6E73", lineHeight: 1.7, marginBottom: 32 }}>
            Join the TechSphere newsletter — weekly, curated, free.
          </p>
          <a href="/newsletter" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 32px", background: "#010048", color: "#ffffff",
            fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Subscribe — It&apos;s Free
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Components ───────────────────────────────── */

function FeaturedRow({ post, secondaryPosts }) {
  const [hovered, setHovered] = useState(false);
  let displayDate = "—";
  try { displayDate = new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); } catch {}

  return (
    <div className={secondaryPosts.length ? "featured-row-grid" : ""} style={{ background: "#fff" }}>
      <a href={`/blog/${post.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block", textDecoration: "none",
          borderRight: secondaryPosts.length ? "1px solid #E8E8ED" : "none",
          position: "relative", overflow: "hidden",
        }}>
        {post.imageUrl ? (
          <div style={{ height: 340, overflow: "hidden", background: "#F5F5F7" }}>
            <img src={post.imageUrl} alt={post.title} style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}/>
          </div>
        ) : (
          <div style={{ height: 200, background: "linear-gradient(135deg, #010048 0%, #3730a3 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 72, color: "rgba(255,255,255,0.06)", fontWeight: 900 }}>TS</span>
          </div>
        )}
        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "#010048", background: "#F5F5F7", padding: "3px 10px", border: "1px solid #E8E8ED" }}>
              Editor&apos;s Pick
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{displayDate}</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(20px, 2.8vw, 28px)",
            fontWeight: 700, color: "#1D1D1F",
            lineHeight: 1.2, letterSpacing: "-0.3px", marginBottom: 12,
            textDecoration: hovered ? "underline" : "none",
            textDecorationColor: "#1D1D1F",
          }}>
            {post.title}
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6E6E73", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.description}
          </p>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5, marginTop: 16,
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "#010048",
          }}>
            Continue Reading
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.2s" }}>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </a>

      {secondaryPosts.length > 0 && (
        <div className="featured-row-secondary" style={{ display: "flex", flexDirection: "column" }}>
          {secondaryPosts.map((sp, i) => (
            <SecondaryStory key={sp.id} post={sp} isLast={i === secondaryPosts.length - 1} />
          ))}
          {/* Fill remaining space */}
          <div style={{
            flex: 1, background: "#F5F5F7",
            padding: "20px", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "flex-start", gap: 10,
            borderTop: "1px solid #E8E8ED",
          }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6" }}>
              Open Publishing
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "#1D1D1F", lineHeight: 1.4 }}>
              Have an insight to share?
            </p>
            <a href="/new" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 16px",
              background: "#010048", color: "#fff",
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Write a Post →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function SecondaryStory({ post, isLast }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }); } catch {}

  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: 14, alignItems: "flex-start",
        padding: "16px 20px",
        borderBottom: isLast ? "none" : "1px solid #E8E8ED",
        textDecoration: "none",
        background: hov ? "#F5F5F7" : "#fff",
        transition: "background 0.15s", flex: 1,
      }}>
      {post.imageUrl ? (
        <div style={{ width: 60, height: 60, flexShrink: 0, overflow: "hidden", background: "#F5F5F7" }}>
          <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
      ) : (
        <div style={{ width: 60, height: 60, flexShrink: 0, background: "linear-gradient(135deg, #010048, #3730a3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>T</span>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
          color: hov ? "#010048" : "#1D1D1F",
          lineHeight: 1.4, marginBottom: 5,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          transition: "color 0.15s",
        }}>{post.title}</p>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#A1A1A6" }}>{date}</span>
      </div>
    </a>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#A1A1A6", pointerEvents: "none" }}
        width="13" height="13" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="text" placeholder="Search articles..."
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          padding: "9px 14px 9px 32px",
          border: "1px solid #D2D2D7", background: "#fff",
          fontFamily: "var(--font-sans)", fontSize: 13, color: "#1D1D1F",
          width: 210, outline: "none", transition: "border-color 0.15s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#010048"}
        onBlur={e => e.currentTarget.style.borderColor = "#D2D2D7"}
      />
    </div>
  );
}

function TopicsBar({ topics, activeTopic }) {
  const scrollRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  function onMouseDown(e) {
    const el = scrollRef.current;
    drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false };
    el.style.cursor = "grabbing";
  }
  function onMouseMove(e) {
    if (!drag.current.active) return;
    e.preventDefault();
    const el = scrollRef.current;
    const dx = e.pageX - el.offsetLeft - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  }
  function onMouseUp() {
    drag.current.active = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  }

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8ED" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div
          ref={scrollRef}
          className="topics-scroll"
          style={{ display: "flex", cursor: "grab", userSelect: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
        >
          {topics.map(({ label, key }) => (
            <button
              key={label}
              onClick={() => { if (!drag.current.moved) { if (key === null) window.location.href = "/blog"; else window.location.href = `/blog?category=${key}`; } }}
              style={{
                padding: "12px 15px",
                background: "transparent",
                color: activeTopic === key ? "#010048" : "#6E6E73",
                borderBottom: activeTopic === key ? "2px solid #010048" : "2px solid transparent",
                borderTop: "none", borderLeft: "none", borderRight: "none",
                fontFamily: "var(--font-sans)",
                fontSize: 12, fontWeight: 500,
                cursor: "inherit",
                transition: "color 0.15s, border-color 0.15s",
                whiteSpace: "nowrap",
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false);
  let displayDate = "—";
  try { displayDate = new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch {}
  const readTime = post.description ? Math.max(1, Math.ceil(post.description.split(" ").length / 200)) : 1;

  return (
    <a href={`/blog/${post.id}`}
      style={{
        display: "flex", flexDirection: "column",
        background: "#fff",
        textDecoration: "none", height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {post.imageUrl ? (
        <div style={{ height: 180, overflow: "hidden", background: "#F5F5F7" }}>
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)",
          }}/>
        </div>
      ) : (
        <div style={{ height: 4, background: hovered ? "#010048" : "#E8E8ED", transition: "background 0.2s" }}/>
      )}
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{displayDate}</span>
          <span style={{ width: 2, height: 2, background: "#D2D2D7", borderRadius: "50%", flexShrink: 0 }}/>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{readTime} min read</span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600,
          color: hovered ? "#010048" : "#1D1D1F",
          lineHeight: 1.35, marginBottom: 10, flex: 1,
          transition: "color 0.15s",
        }}>{post.title}</h3>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 13, color: "#6E6E73", lineHeight: 1.65,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          marginBottom: 16,
        }}>{post.description}</p>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
          color: hovered ? "#010048" : "#A1A1A6",
          transition: "color 0.15s",
        }}>
          Read Article
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24"
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s" }}>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
}

function LoadingGrid() {
  return (
    <div className="posts-grid" style={{ marginTop: 24 }}>
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="post-card-wrap" style={{ padding: 22 }}>
          <div style={{ height: 10, width: "35%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 14, borderRadius: 4 }}/>
          <div style={{ height: 20, width: "88%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8, borderRadius: 4 }}/>
          <div style={{ height: 13, width: "72%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 6, borderRadius: 4 }}/>
          <div style={{ height: 13, width: "60%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4 }}/>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid #E8E8ED", background: "#fff", marginTop: 24 }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
        {search ? `No results for "${search}"` : "No posts yet"}
      </p>
      <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#1D1D1F", marginBottom: 10 }}>
        {search ? "Nothing found" : "Be the first to publish"}
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", color: "#A1A1A6", fontSize: 14, marginBottom: 28 }}>
        {search ? "Try a different keyword." : "Share your first tech insight with the world."}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {search && (
          <button onClick={onClear} style={{
            padding: "10px 22px", border: "1px solid #D2D2D7",
            background: "#fff", color: "#6E6E73",
            fontFamily: "var(--font-sans)", fontWeight: 600,
            fontSize: 13, cursor: "pointer",
          }}>Clear Search</button>
        )}
        <a href="/new" style={{
          display: "inline-block", padding: "10px 22px",
          background: "#010048", color: "white",
          fontFamily: "var(--font-sans)", fontWeight: 600,
          fontSize: 13, textDecoration: "none",
        }}>Write a Post</a>
      </div>
    </div>
  );
}
