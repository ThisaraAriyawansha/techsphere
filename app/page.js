"use client";
import { useEffect, useState } from "react";
import { getPosts } from "../lib/firebase";

const TOPICS = [
  { label: "All", key: null },
  { label: "AI & ML", key: "ai" },
  { label: "Web Dev", key: "web" },
  { label: "Mobile", key: "mobile" },
  { label: "Cloud", key: "cloud" },
  { label: "Security", key: "security" },
  { label: "Open Source", key: "open source" },
  { label: "Data Science", key: "data" },
  { label: "DevOps", key: "devops" },
  { label: "Programming", key: "programming" },
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

  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section style={{ background: "#010048", padding: "80px 24px 72px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "2.5px",
            color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
            marginBottom: 18,
          }}>Open Platform · No Login Required</p>
          <h1 style={{
            fontSize: "clamp(34px, 5vw, 60px)",
            fontWeight: 700, color: "#ffffff",
            lineHeight: 1.08, letterSpacing: "-1.5px",
            marginBottom: 20,
          }}>
            Where Tech Ideas<br />Come to Life
          </h1>
          <p style={{
            fontSize: 16, color: "rgba(255,255,255,0.5)",
            maxWidth: 460, lineHeight: 1.75, fontWeight: 300,
            marginBottom: 36,
          }}>
            Read, write, and share tech insights with the world. No account. No barriers. Just pure knowledge.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/new" style={{
              padding: "12px 28px",
              background: "#ffffff", color: "#010048",
              fontSize: 13, fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Write a Post
            </a>
            <a href="#posts" style={{
              padding: "12px 28px",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.8)",
              fontSize: 13, fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}>
              Explore Posts
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e2e7" }}>
        <div className="stats-strip" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {[
            { label: "Articles Published", value: loading ? "—" : posts.length },
            { label: "Free to Read", value: "Always" },
            { label: "Login Required", value: "Never" },
            { label: "Community", value: "Open" },
          ].map(s => (
            <div key={s.label} className="stat-item">
              <div style={{ fontSize: 22, fontWeight: 700, color: "#010048", letterSpacing: "-0.5px" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#aeaeb2", fontWeight: 600, marginTop: 2, letterSpacing: "0.8px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Topic Filter ───────────────────────── */}
      <div style={{ background: "#f5f5f7", borderBottom: "1px solid #e2e2e7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="topics-scroll" style={{ display: "flex", gap: 0, alignItems: "center" }}>
            {TOPICS.map(({ label, key }) => (
              <button
                key={label}
                onClick={() => setTopic(key)}
                style={{
                  padding: "14px 18px",
                  background: "transparent",
                  color: activeTopic === key ? "#010048" : "#6e6e73",
                  borderBottom: activeTopic === key ? "2px solid #010048" : "2px solid transparent",
                  borderTop: "none", borderLeft: "none", borderRight: "none",
                  fontSize: 13, fontWeight: activeTopic === key ? 600 : 400,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "color 0.15s, border-color 0.15s",
                  whiteSpace: "nowrap",
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Posts ─────────────────────────────── */}
      <section id="posts" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Section header + search */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: 16, marginBottom: 28,
          paddingBottom: 16,
          borderBottom: "2px solid #010048",
        }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#010048", letterSpacing: "-0.3px" }}>
              {activeTopic
                ? TOPICS.find(t => t.key === activeTopic)?.label
                : search
                ? `Results for "${search}"`
                : "Latest Articles"}
            </h2>
            {!search && (
              <p style={{ fontSize: 12, color: "#aeaeb2", marginTop: 3 }}>
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {loading ? <LoadingGrid /> : filtered.length === 0 ? (
          <EmptyState search={search} onClear={() => { setSearch(""); setTopic(null); }} />
        ) : (
          /* Mosaic grid: first post is wide, rest are equal */
          <div>
            {filtered.length > 0 && !search && !activeTopic && (
              <div style={{ marginBottom: 1 }}>
                <FeaturedRow post={filtered[0]} />
              </div>
            )}
            <div className="posts-grid">
              {(search || activeTopic ? filtered : filtered.slice(1)).map(post => (
                <div key={post.id} className="post-card-wrap">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Newsletter CTA ─────────────────────── */}
      <section style={{ background: "#010048", padding: "72px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 16 }}>
            Stay Updated
          </p>
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700, color: "#fff",
            letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 14,
          }}>
            Never miss a great article
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32 }}>
            Join the TechSphere newsletter — weekly, curated, free.
          </p>
          <a href="/newsletter" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 32px",
            background: "#ffffff",
            color: "#010048",
            fontSize: 14, fontWeight: 700,
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Subscribe — It's Free
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Components ───────────────────────────────── */

function FeaturedRow({ post }) {
  const [hovered, setHovered] = useState(false);
  let displayDate = "—";
  try { displayDate = new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); } catch {}

  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`featured-card${post.imageUrl ? "" : " featured-card-single"}`}
      style={{ background: hovered ? "#fafafa" : "#fff" }}>
      {post.imageUrl && (
        <div style={{ overflow: "hidden", background: "#f5f5f7", minHeight: 280 }}>
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}/>
        </div>
      )}
      <div className="featured-card-content" style={{ padding: "36px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#fff", background: "#010048", padding: "3px 8px" }}>Featured</span>
          <span style={{ fontSize: 11, color: "#aeaeb2" }}>{displayDate}</span>
        </div>
        <h2 style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.22, letterSpacing: "-0.5px", marginBottom: 14 }}>
          {post.title}
        </h2>
        <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.7, marginBottom: 24, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {post.description}
        </p>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#010048", display: "flex", alignItems: "center", gap: 5 }}>
          Read Article
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.2s" }}>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aeaeb2", pointerEvents: "none" }}
        width="13" height="13" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "9px 14px 9px 34px",
          border: "1px solid #e2e2e7",
          background: "#fff",
          fontSize: 13, color: "#1d1d1f",
          width: 220, outline: "none",
          transition: "border-color 0.15s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#010048"}
        onBlur={e => e.currentTarget.style.borderColor = "#e2e2e7"}
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
        background: hovered ? "#fafafa" : "#fff",
        textDecoration: "none",
        transition: "background 0.15s",
        height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {post.imageUrl ? (
        <div style={{ height: 180, overflow: "hidden", background: "#f5f5f7" }}>
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}/>
        </div>
      ) : (
        <div style={{ height: 4, background: hovered ? "#010048" : "#e2e2e7", transition: "background 0.2s" }}/>
      )}

      <div style={{ padding: "22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: "#aeaeb2", fontWeight: 500 }}>{displayDate}</span>
          <span style={{ width: 2, height: 2, background: "#d2d2d7" }}/>
          <span style={{ fontSize: 11, color: "#aeaeb2" }}>{readTime} min read</span>
        </div>

        <h3 style={{
          fontSize: 16, fontWeight: 600,
          color: "#1d1d1f", lineHeight: 1.4,
          marginBottom: 10, flex: 1,
          letterSpacing: "-0.2px",
        }}>{post.title}</h3>

        <p style={{
          fontSize: 13, color: "#6e6e73",
          lineHeight: 1.65,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: 18,
        }}>{post.description}</p>

        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          color: hovered ? "#010048" : "#aeaeb2",
          fontSize: 12, fontWeight: 600,
          letterSpacing: "0.3px",
          transition: "color 0.15s",
        }}>
          Read article
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24"
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
        <div key={i} className="post-card-wrap" style={{ padding: 24 }}>
          <div style={{ height: 12, width: "40%", background: "linear-gradient(90deg,#f5f5f7 25%,#eaeaec 50%,#f5f5f7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 12 }}/>
          <div style={{ height: 18, width: "85%", background: "linear-gradient(90deg,#f5f5f7 25%,#eaeaec 50%,#f5f5f7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8 }}/>
          <div style={{ height: 13, width: "70%", background: "linear-gradient(90deg,#f5f5f7 25%,#eaeaec 50%,#f5f5f7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 6 }}/>
          <div style={{ height: 13, width: "60%", background: "linear-gradient(90deg,#f5f5f7 25%,#eaeaec 50%,#f5f5f7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }}/>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid #e2e2e7", background: "#fafafa" }}>
      <p style={{ fontSize: 13, color: "#aeaeb2", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
        {search ? `No results for "${search}"` : "No posts yet"}
      </p>
      <p style={{ color: "#aeaeb2", fontSize: 13, marginBottom: 24 }}>
        {search ? "Try a different keyword." : "Be the first to share a tech insight."}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {search && (
          <button onClick={onClear} style={{
            padding: "9px 20px", border: "1px solid #e2e2e7",
            background: "#fff", color: "#6e6e73",
            fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          }}>Clear Search</button>
        )}
        <a href="/new" style={{
          display: "inline-block", padding: "9px 20px",
          background: "#010048", color: "white",
          fontWeight: 600, fontSize: 13, textDecoration: "none",
        }}>Write a Post</a>
      </div>
    </div>
  );
}
