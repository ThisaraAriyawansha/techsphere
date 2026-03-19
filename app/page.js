"use client";
import { useEffect, useState } from "react";
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
  const [activeTopic, setTopic] = useState(null);

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
      <section style={{ background: "#010057" }}>

        {/* Top edition bar */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "11px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Technology & Innovation
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "1px" }}>
              Open · Free · Community
            </span>
          </div>
        </div>

        {/* Main centered content */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 72px", textAlign: "center" }}>

          {/* Category pill */}
          <div style={{
            display: "inline-block", marginBottom: 32,
            padding: "5px 18px",
            border: "1px solid rgba(255,255,255,0.12)",
            fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
            letterSpacing: "3px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
          }}>
            Open Tech Publication
          </div>

          {/* Brand headline */}
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 900, color: "#FFFFFF",
            lineHeight: 0.95, letterSpacing: "-3px",
            marginBottom: 20,
          }}>
            TechSphere
          </h1>

          {/* Thin divider */}
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.18)", margin: "0 auto 24px" }}/>

          {/* Subtitle */}
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15, color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8, maxWidth: 460, margin: "0 auto 40px",
            fontWeight: 300,
          }}>
            Discover tutorials, insights, and breakthroughs from developers and engineers worldwide. No login. Always free.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#posts"
              style={{
                padding: "12px 32px", background: "#fff", color: "#010057",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
                textDecoration: "none", letterSpacing: "1.5px", textTransform: "uppercase",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Explore Articles
            </a>
            <a href="/new"
              style={{
                padding: "12px 32px",
                border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
                textDecoration: "none", letterSpacing: "1.5px", textTransform: "uppercase",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
              Write a Post
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="hero-stats-inline">
          {[
            { value: loading ? "—" : posts.length, label: "Articles Published" },
            { value: "Always",  label: "Free to Read" },
            { value: "Never",   label: "Login Required" },
            { value: "Open",    label: "Community" },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "22px 16px", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.5px" }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 3 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Topic Cards ─────────────────── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #DDE0F5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 20, height: 3, background: "#010057" }}/>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#010057" }}>
                Trending Topics
              </span>
            </div>
            <a href="/topics" style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "#010057", textDecoration: "none", letterSpacing: "0.5px", transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              All Topics →
            </a>
          </div>
          <div className="trending-grid" style={{ marginBottom: 0 }}>
            {TOPIC_META.map(topic => (
              <button
                key={topic.key}
                onClick={() => setTopic(topic.key === activeTopic ? null : topic.key)}
                style={{
                  position: "relative", overflow: "hidden",
                  height: 140, border: "none", cursor: "pointer",
                  textAlign: "left", padding: 0,
                  background: "#010057",
                  outline: activeTopic === topic.key ? `3px solid #fff` : "none",
                  outlineOffset: -3,
                }}
              >
                <img src={topic.image} alt={topic.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}/>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${topic.color}CC 0%, #01005799 100%)` }}/>
                <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{topic.icon}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
                    {topic.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topic filter tabs ─────────────────────── */}
      <div style={{ background: "#F0F0FA", borderBottom: "1px solid #DDE0F5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="topics-scroll" style={{ display: "flex" }}>
            {TOPICS.map(({ label, key }) => (
              <button
                key={label}
                onClick={() => setTopic(key)}
                style={{
                  padding: "11px 15px",
                  background: "transparent",
                  color: activeTopic === key ? "#010057" : "#55557A",
                  borderBottom: activeTopic === key ? "2px solid #010057" : "2px solid transparent",
                  borderTop: "none", borderLeft: "none", borderRight: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "1.2px", textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "color 0.15s, border-color 0.15s",
                  whiteSpace: "nowrap",
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────── */}
      <section id="posts" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Section header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
          paddingTop: 10, paddingBottom: 10,
          borderTop: "3px solid #010057", borderBottom: "1px solid #DDE0F5",
          marginBottom: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#010057" }}>
              {activeTopic ? TOPICS.find(t => t.key === activeTopic)?.label : search ? `Results for "${search}"` : "Latest Articles"}
            </span>
            {!search && (
              <span style={{ fontSize: 11, color: "#8888A8", fontFamily: "var(--font-sans)" }}>
                {filtered.length} {filtered.length !== 1 ? "articles" : "article"}
              </span>
            )}
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {loading ? <LoadingGrid /> : filtered.length === 0 ? (
          <EmptyState search={search} onClear={() => { setSearch(""); setTopic(null); }} />
        ) : (
          <div>
            {filtered.length > 0 && !isFiltered && (
              <div style={{ borderBottom: "1px solid #DDE0F5" }}>
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

      {/* ── Why TechSphere ───────────────────────── */}
      <section style={{ background: "#010057", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Why TechSphere
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: "#fff", marginTop: 10, letterSpacing: "-0.3px" }}>
              A Platform Built for the Community
            </h2>
          </div>
          <div className="why-grid">
            {[
              { icon: "✍️", title: "Write Freely",    desc: "No account required. Share your knowledge, tutorials, and insights in minutes." },
              { icon: "📖", title: "Read Everything", desc: "Thousands of articles across AI, web dev, cloud, security, and more — always free." },
              { icon: "🌍", title: "Open Community",  desc: "A global platform where developers, engineers, and enthusiasts connect and learn." },
            ].map(item => (
              <div key={item.title} style={{ background: "#010057", padding: "36px 28px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured image banner ────────────────── */}
      <section style={{ position: "relative", height: 320, overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80"
          alt="Technology"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(1,0,87,0.93) 0%, rgba(1,0,87,0.6) 60%, transparent 100%)",
          display: "flex", alignItems: "center", padding: "0 24px",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Community Powered
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 20, maxWidth: 500 }}>
              Share Your Knowledge with the World
            </h2>
            <a href="/new" className="h-opacity" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", background: "#fff", color: "#010057",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
              textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
            }}>
              Write Your Story →
            </a>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ─────────────────────────── */}
      <section style={{ background: "#F0F0FA", borderTop: "3px solid #010057", padding: "56px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", color: "#010057", textTransform: "uppercase", marginBottom: 14 }}>
            Stay Updated
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 700, color: "#010057", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 14 }}>
            Never miss a great article
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#55557A", lineHeight: 1.7, marginBottom: 28 }}>
            Join the TechSphere newsletter — weekly, curated, free.
          </p>
          <a href="/newsletter" className="h-opacity" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 32px", background: "#010057", color: "#ffffff",
            fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
            textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
          }}>
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
          borderRight: secondaryPosts.length ? "1px solid #DDE0F5" : "none",
          position: "relative", overflow: "hidden",
        }}>
        {post.imageUrl ? (
          <div style={{ height: 340, overflow: "hidden", background: "#F0F0FA" }}>
            <img src={post.imageUrl} alt={post.title} style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}/>
          </div>
        ) : (
          <div style={{ height: 200, background: "linear-gradient(135deg, #010057 0%, #0A0099 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 72, color: "rgba(255,255,255,0.06)", fontWeight: 900 }}>TS</span>
          </div>
        )}
        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#fff", background: "#010057", padding: "3px 8px" }}>
              Editor&apos;s Pick
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#8888A8" }}>{displayDate}</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(20px, 2.8vw, 30px)",
            fontWeight: 700, color: "#010057",
            lineHeight: 1.2, letterSpacing: "-0.3px", marginBottom: 12,
            textDecoration: hovered ? "underline" : "none",
            textDecorationColor: "#010057",
          }}>
            {post.title}
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#55557A", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.description}
          </p>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5, marginTop: 16,
            fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "#010057",
            letterSpacing: "1px", textTransform: "uppercase",
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
        borderBottom: isLast ? "none" : "1px solid #EEEEF8",
        textDecoration: "none",
        background: hov ? "#F0F0FA" : "#fff",
        transition: "background 0.15s", flex: 1,
      }}>
      {post.imageUrl ? (
        <div style={{ width: 60, height: 60, flexShrink: 0, overflow: "hidden", background: "#F0F0FA" }}>
          <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
      ) : (
        <div style={{ width: 60, height: 60, flexShrink: 0, background: "linear-gradient(135deg, #010057, #0A0099)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "rgba(255,255,255,0.2)", fontWeight: 900 }}>T</span>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "var(--font-serif)", fontSize: 13, fontWeight: 700,
          color: hov ? "#0A0099" : "#010057",
          lineHeight: 1.4, marginBottom: 5,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          transition: "color 0.15s",
        }}>{post.title}</p>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8", letterSpacing: "0.5px" }}>{date}</span>
      </div>
    </a>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#8888A8", pointerEvents: "none" }}
        width="13" height="13" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="text" placeholder="Search articles..."
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          padding: "9px 14px 9px 32px",
          border: "1px solid #DDE0F5", background: "#fff",
          fontFamily: "var(--font-sans)", fontSize: 12, color: "#010057",
          width: 210, outline: "none", transition: "border-color 0.15s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#010057"}
        onBlur={e => e.currentTarget.style.borderColor = "#DDE0F5"}
      />
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
        background: hovered ? "#F0F0FA" : "#fff",
        textDecoration: "none", transition: "background 0.15s", height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {post.imageUrl ? (
        <div style={{ height: 180, overflow: "hidden", background: "#F0F0FA" }}>
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)",
          }}/>
        </div>
      ) : (
        <div style={{ height: 4, background: hovered ? "#010057" : "#DDE0F5", transition: "background 0.2s" }}/>
      )}
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8" }}>{displayDate}</span>
          <span style={{ width: 2, height: 2, background: "#DDE0F5", borderRadius: "50%", flexShrink: 0 }}/>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8" }}>{readTime} min read</span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 700,
          color: hovered ? "#0A0099" : "#010057",
          lineHeight: 1.35, marginBottom: 10, flex: 1,
          transition: "color 0.15s",
        }}>{post.title}</h3>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 13, color: "#55557A", lineHeight: 1.65,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          marginBottom: 16,
        }}>{post.description}</p>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
          letterSpacing: "1px", textTransform: "uppercase",
          color: hovered ? "#010057" : "#8888A8",
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
    <div className="posts-grid">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="post-card-wrap" style={{ padding: 22 }}>
          <div style={{ height: 10, width: "35%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 14 }}/>
          <div style={{ height: 20, width: "88%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8 }}/>
          <div style={{ height: 13, width: "72%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 6 }}/>
          <div style={{ height: 13, width: "60%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }}/>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid #DDE0F5", background: "#fff" }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 12 }}>
        {search ? `No results for "${search}"` : "No posts yet"}
      </p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "#010057", marginBottom: 10 }}>
        {search ? "Nothing found" : "Be the first to publish"}
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", color: "#8888A8", fontSize: 14, marginBottom: 28 }}>
        {search ? "Try a different keyword." : "Share your first tech insight with the world."}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {search && (
          <button onClick={onClear} style={{
            padding: "10px 22px", border: "1px solid #DDE0F5",
            background: "#fff", color: "#55557A",
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: 12, cursor: "pointer",
            letterSpacing: "0.8px", textTransform: "uppercase",
          }}>Clear Search</button>
        )}
        <a href="/new" style={{
          display: "inline-block", padding: "10px 22px",
          background: "#010057", color: "white",
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: 12, textDecoration: "none",
          letterSpacing: "0.8px", textTransform: "uppercase",
        }}>Write a Post</a>
      </div>
    </div>
  );
}
