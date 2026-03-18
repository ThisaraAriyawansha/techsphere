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
    <div style={{ background: "#FAF8F5" }}>

      {/* ── Edition strip ──────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #D4CFC8" }}>
        <div className="stats-strip" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {[
            { label: "Articles Published", value: loading ? "—" : posts.length },
            { label: "Free to Read", value: "Always" },
            { label: "Login Required", value: "Never" },
            { label: "Community", value: "Open" },
          ].map(s => (
            <div key={s.label} className="stat-item">
              <div style={{
                fontFamily: "var(--font-serif)",
                fontSize: 24, fontWeight: 700,
                color: "#1A1A1A", letterSpacing: "-0.5px",
              }}>{s.value}</div>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: 9, color: "#999",
                fontWeight: 700, marginTop: 3,
                letterSpacing: "1.5px", textTransform: "uppercase",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Topic filter / section tabs ─────────── */}
      <div style={{ background: "#FAF8F5", borderBottom: "1px solid #D4CFC8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="topics-scroll" style={{ display: "flex", gap: 0, alignItems: "center" }}>
            {TOPICS.map(({ label, key }) => (
              <button
                key={label}
                onClick={() => setTopic(key)}
                style={{
                  padding: "12px 16px",
                  background: "transparent",
                  color: activeTopic === key ? "#1A1A1A" : "#888",
                  borderBottom: activeTopic === key ? "2px solid #C41E3A" : "2px solid transparent",
                  borderTop: "none", borderLeft: "none", borderRight: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
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

      {/* ── Main content ──────────────────────── */}
      <section id="posts" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Section header */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: 16, marginBottom: 0,
          paddingBottom: 10,
          borderTop: "3px solid #1A1A1A",
          borderBottom: "1px solid #D4CFC8",
          paddingTop: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
              color: "#C41E3A",
            }}>
              {activeTopic
                ? TOPICS.find(t => t.key === activeTopic)?.label
                : search
                ? `Results for "${search}"`
                : "Latest Articles"}
            </span>
            {!search && (
              <span style={{ fontSize: 11, color: "#999", fontFamily: "var(--font-sans)" }}>
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
            {/* Featured front-page story */}
            {filtered.length > 0 && !search && !activeTopic && (
              <div style={{ borderBottom: "1px solid #D4CFC8", marginBottom: 0 }}>
                <FeaturedRow post={filtered[0]} secondaryPosts={filtered.slice(1, 4)} />
              </div>
            )}
            {/* Article grid */}
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
      <section style={{
        background: "#fff",
        borderTop: "3px solid #1A1A1A",
        borderBottom: "1px solid #D4CFC8",
        padding: "56px 24px",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10, fontWeight: 700, letterSpacing: "2.5px",
            color: "#C41E3A", textTransform: "uppercase", marginBottom: 14,
          }}>
            Stay Updated
          </p>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700, color: "#1A1A1A",
            letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 14,
          }}>
            Never miss a great article
          </h2>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 28,
          }}>
            Join the TechSphere newsletter — weekly, curated, free.
          </p>
          <a href="/newsletter" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 32px",
            background: "#1A1A1A",
            color: "#ffffff",
            fontFamily: "var(--font-sans)",
            fontSize: 12, fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "1px",
            textTransform: "uppercase",
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
    <div style={{ display: "grid", gridTemplateColumns: secondaryPosts.length ? "1fr 320px" : "1fr", background: "#fff" }}>
      {/* Main featured story */}
      <a href={`/blog/${post.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          textDecoration: "none",
          borderRight: secondaryPosts.length ? "1px solid #D4CFC8" : "none",
          position: "relative", overflow: "hidden",
        }}>
        {post.imageUrl ? (
          <div style={{ height: 340, overflow: "hidden", background: "#EAE7E0" }}>
            <img src={post.imageUrl} alt={post.title} style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}/>
          </div>
        ) : (
          <div style={{
            height: 200,
            background: "linear-gradient(135deg, #1A1A1A 0%, #3a3a3a 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 72, color: "rgba(255,255,255,0.05)", fontWeight: 900 }}>TS</span>
          </div>
        )}
        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: 9, fontWeight: 700, letterSpacing: "1.5px",
              textTransform: "uppercase", color: "#fff",
              background: "#C41E3A", padding: "3px 8px",
            }}>Editor's Pick</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#999" }}>{displayDate}</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(22px, 2.8vw, 32px)",
            fontWeight: 700, color: "#1A1A1A",
            lineHeight: 1.2, letterSpacing: "-0.3px", marginBottom: 12,
            textDecoration: hovered ? "underline" : "none",
            textDecorationColor: "#C41E3A",
          }}>
            {post.title}
          </h2>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14, color: "#666", lineHeight: 1.7,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.description}
          </p>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            marginTop: 16,
            fontFamily: "var(--font-sans)",
            fontSize: 11, fontWeight: 700, color: "#C41E3A",
            letterSpacing: "1px", textTransform: "uppercase",
          }}>
            Continue Reading
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.2s" }}>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </a>

      {/* Secondary stories */}
      {secondaryPosts.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
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
        borderBottom: isLast ? "none" : "1px solid #EAE7E0",
        textDecoration: "none",
        background: hov ? "#FAF8F5" : "#fff",
        transition: "background 0.15s",
        flex: 1,
      }}>
      {post.imageUrl && (
        <div style={{ width: 60, height: 60, flexShrink: 0, overflow: "hidden", background: "#EAE7E0" }}>
          <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "var(--font-serif)",
          fontSize: 13, fontWeight: 700,
          color: hov ? "#C41E3A" : "#1A1A1A",
          lineHeight: 1.4, marginBottom: 5,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          transition: "color 0.15s",
        }}>{post.title}</p>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#999", letterSpacing: "0.5px" }}>{date}</span>
      </div>
    </a>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#999", pointerEvents: "none" }}
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
          padding: "9px 14px 9px 32px",
          border: "1px solid #D4CFC8",
          background: "#fff",
          fontFamily: "var(--font-sans)",
          fontSize: 12, color: "#1A1A1A",
          width: 210, outline: "none",
          transition: "border-color 0.15s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
        onBlur={e => e.currentTarget.style.borderColor = "#D4CFC8"}
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
        background: hovered ? "#FAF8F5" : "#fff",
        textDecoration: "none",
        transition: "background 0.15s",
        height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {post.imageUrl ? (
        <div style={{ height: 180, overflow: "hidden", background: "#EAE7E0" }}>
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}/>
        </div>
      ) : (
        <div style={{
          height: 6,
          background: hovered ? "#C41E3A" : "#D4CFC8",
          transition: "background 0.2s",
        }}/>
      )}

      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#999", letterSpacing: "0.5px" }}>{displayDate}</span>
          <span style={{ width: 2, height: 2, background: "#D4CFC8", borderRadius: "50%", flexShrink: 0 }}/>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#999" }}>{readTime} min read</span>
        </div>

        <h3 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 17, fontWeight: 700,
          color: hovered ? "#C41E3A" : "#1A1A1A",
          lineHeight: 1.35, marginBottom: 10, flex: 1,
          transition: "color 0.15s",
        }}>{post.title}</h3>

        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13, color: "#666",
          lineHeight: 1.65,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: 16,
        }}>{post.description}</p>

        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          fontFamily: "var(--font-sans)",
          fontSize: 10, fontWeight: 700, color: "#999",
          letterSpacing: "1px", textTransform: "uppercase",
          transition: "color 0.15s",
          color: hovered ? "#C41E3A" : "#999",
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
          <div style={{ height: 10, width: "35%", background: "linear-gradient(90deg,#F5F3EF 25%,#EAE7E0 50%,#F5F3EF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 14 }}/>
          <div style={{ height: 20, width: "88%", background: "linear-gradient(90deg,#F5F3EF 25%,#EAE7E0 50%,#F5F3EF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8 }}/>
          <div style={{ height: 13, width: "72%", background: "linear-gradient(90deg,#F5F3EF 25%,#EAE7E0 50%,#F5F3EF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 6 }}/>
          <div style={{ height: 13, width: "60%", background: "linear-gradient(90deg,#F5F3EF 25%,#EAE7E0 50%,#F5F3EF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }}/>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div style={{
      textAlign: "center", padding: "80px 24px",
      border: "1px solid #D4CFC8", background: "#fff",
      marginTop: 0,
    }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 12 }}>
        {search ? `No results for "${search}"` : "No posts yet"}
      </p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "#1A1A1A", marginBottom: 10 }}>
        {search ? "Nothing found" : "Be the first to publish"}
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", color: "#999", fontSize: 14, marginBottom: 28 }}>
        {search ? "Try a different keyword." : "Share your first tech insight with the world."}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {search && (
          <button onClick={onClear} style={{
            padding: "10px 22px", border: "1px solid #D4CFC8",
            background: "#fff", color: "#666",
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: 12, cursor: "pointer",
            letterSpacing: "0.8px", textTransform: "uppercase",
          }}>Clear Search</button>
        )}
        <a href="/new" style={{
          display: "inline-block", padding: "10px 22px",
          background: "#1A1A1A", color: "white",
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: 12, textDecoration: "none",
          letterSpacing: "0.8px", textTransform: "uppercase",
        }}>Write a Post</a>
      </div>
    </div>
  );
}
