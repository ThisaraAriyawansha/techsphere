"use client";
import { useEffect, useState } from "react";
import { getPosts } from "../../lib/firebase";

const CATEGORIES = [
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

const SORT_OPTIONS = [
  { label: "Newest First",  key: "newest" },
  { label: "Oldest First",  key: "oldest" },
];

export default function BlogPage() {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState(null);
  const [sort, setSort]         = useState("newest");
  const [view, setView]         = useState("grid"); // "grid" | "list"

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = posts
    .filter(p => {
      const q = search.toLowerCase();
      const matchQ = !q || p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      const matchC = !category || p.title?.toLowerCase().includes(category) || p.description?.toLowerCase().includes(category);
      return matchQ && matchC;
    })
    .sort((a, b) => {
      if (sort === "oldest") return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>

      {/* ── Page Header ──────────────────────────── */}
      <div style={{ background: "#010057", padding: "48px 24px 40px", borderBottom: "4px solid #010057" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ display: "inline-block", width: 20, height: 2, background: "#010057" }}/>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              TechSphere
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 900, color: "#FFFFFF",
            lineHeight: 1.1, letterSpacing: "-0.8px",
            marginBottom: 12,
          }}>
            All Articles
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, maxWidth: 500 }}>
            {loading ? "Loading articles…" : `${posts.length} articles from the tech community — free to read, always.`}
          </p>
        </div>
      </div>

      {/* ── Filters bar ──────────────────────────── */}
      <div style={{ background: "#F0F0FA", borderBottom: "1px solid #DDE0F5", position: "sticky", top: 66, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>

            {/* Category tabs */}
            <div className="topics-scroll" style={{ display: "flex", flex: 1 }}>
              {CATEGORIES.map(({ label, key }) => (
                <button
                  key={label}
                  onClick={() => setCategory(key)}
                  style={{
                    padding: "12px 14px",
                    background: "transparent",
                    color: category === key ? "#010057" : "#55557A",
                    borderBottom: category === key ? "2px solid #010057" : "2px solid transparent",
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

            {/* Right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 2 }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#8888A8", pointerEvents: "none" }}
                  width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    padding: "8px 12px 8px 28px",
                    border: "1px solid #DDE0F5",
                    background: "#fff",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12, color: "#010057",
                    width: 170, outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#010057"}
                  onBlur={e => e.currentTarget.style.borderColor = "#DDE0F5"}
                />
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #DDE0F5",
                  background: "#fff",
                  fontFamily: "var(--font-sans)",
                  fontSize: 11, color: "#010057",
                  cursor: "pointer", outline: "none",
                }}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>

              {/* View toggle */}
              <div style={{ display: "flex", border: "1px solid #DDE0F5", overflow: "hidden" }}>
                {[
                  { v: "grid", icon: "⊞" },
                  { v: "list", icon: "☰" },
                ].map(({ v, icon }) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      width: 34, height: 34, border: "none",
                      background: view === v ? "#010057" : "#fff",
                      color: view === v ? "#fff" : "#55557A",
                      cursor: "pointer", fontSize: 14,
                      transition: "background 0.15s, color 0.15s",
                    }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Result count */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingBottom: 10, marginBottom: 0,
          borderTop: "3px solid #010057",
          borderBottom: "1px solid #DDE0F5",
          paddingTop: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#010057" }}>
              {category ? CATEGORIES.find(c => c.key === category)?.label : search ? `Search: "${search}"` : "All Articles"}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#8888A8" }}>
              {loading ? "loading…" : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`}
            </span>
          </div>
          {(search || category) && (
            <button onClick={() => { setSearch(""); setCategory(null); }} style={{
              background: "none", border: "1px solid #DDE0F5", padding: "5px 12px",
              fontFamily: "var(--font-sans)", fontSize: 11, color: "#55557A",
              cursor: "pointer", letterSpacing: "0.5px",
            }}>
              Clear filters ×
            </button>
          )}
        </div>

        {loading ? (
          <LoadingState view={view} />
        ) : filtered.length === 0 ? (
          <EmptyState onClear={() => { setSearch(""); setCategory(null); }} />
        ) : view === "grid" ? (
          <div className="blog-list-grid">
            {filtered.map(post => (
              <div key={post.id} className="post-card-wrap">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ borderLeft: "1px solid #DDE0F5" }}>
            {filtered.map(post => (
              <BlogListItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Blog grid card ───────────────────────────── */
function BlogCard({ post }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch {}
  const readTime = post.description ? Math.max(1, Math.ceil(post.description.split(" ").length / 200)) : 1;

  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column",
        background: hov ? "#F0F0FA" : "#fff",
        textDecoration: "none",
        transition: "background 0.15s",
        height: "100%",
      }}>
      {post.imageUrl ? (
        <div style={{ height: 190, overflow: "hidden", background: "#F0F0FA" }}>
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}/>
        </div>
      ) : (
        <div style={{
          height: 190,
          background: `linear-gradient(135deg, #010057 0%, ${["#0A0099","#1500CC","#2200DD","#0066CC"][post.id?.charCodeAt?.(0) % 4 ?? 0]} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 64, color: "rgba(255,255,255,0.06)", fontWeight: 900, position: "absolute" }}>TS</span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "rgba(255,255,255,0.18)", fontWeight: 700, position: "relative", zIndex: 1 }}>
            {post.title?.charAt(0) || "T"}
          </span>
        </div>
      )}
      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8" }}>{date}</span>
          <span style={{ width: 2, height: 2, background: "#DDE0F5", borderRadius: "50%" }}/>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8" }}>{readTime} min</span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 16, fontWeight: 700,
          color: hov ? "#010057" : "#010057",
          lineHeight: 1.35, marginBottom: 10, flex: 1,
          transition: "color 0.15s",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{post.title}</h3>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13, color: "#55557A", lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          marginBottom: 14,
        }}>{post.description}</p>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
          color: hov ? "#010057" : "#8888A8",
          letterSpacing: "1px", textTransform: "uppercase",
          transition: "color 0.15s",
        }}>
          Read →
        </span>
      </div>
    </a>
  );
}

/* ── Blog list item ───────────────────────────── */
function BlogListItem({ post }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); } catch {}
  const readTime = post.description ? Math.max(1, Math.ceil(post.description.split(" ").length / 200)) : 1;

  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: 20, alignItems: "flex-start",
        padding: "24px 24px",
        borderRight: "1px solid #DDE0F5",
        borderBottom: "1px solid #DDE0F5",
        textDecoration: "none",
        background: hov ? "#F0F0FA" : "#fff",
        transition: "background 0.15s",
      }}>
      {/* Image */}
      <div style={{ width: 120, height: 90, flexShrink: 0, overflow: "hidden", background: "#F0F0FA" }}>
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.3s",
          }}/>
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #010057, #0A0099)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "rgba(255,255,255,0.18)", fontWeight: 700 }}>
              {post.title?.charAt(0) || "T"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8", letterSpacing: "0.5px" }}>{date}</span>
          <span style={{ width: 2, height: 2, background: "#DDE0F5", borderRadius: "50%", flexShrink: 0 }}/>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8" }}>{readTime} min read</span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 18, fontWeight: 700,
          color: hov ? "#010057" : "#010057",
          lineHeight: 1.3, marginBottom: 8,
          transition: "color 0.15s",
        }}>{post.title}</h3>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13, color: "#55557A", lineHeight: 1.65,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{post.description}</p>
      </div>

      {/* Arrow */}
      <div style={{
        flexShrink: 0, color: hov ? "#010057" : "#DDE0F5",
        transition: "color 0.15s, transform 0.2s",
        transform: hov ? "translateX(4px)" : "none",
        alignSelf: "center",
      }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </a>
  );
}

/* ── Loading skeleton ─────────────────────────── */
function LoadingState({ view }) {
  if (view === "list") {
    return (
      <div style={{ borderLeft: "1px solid #DDE0F5" }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ display: "flex", gap: 20, padding: "24px", borderRight: "1px solid #DDE0F5", borderBottom: "1px solid #DDE0F5" }}>
            <div style={{ width: 120, height: 90, background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ height: 10, width: "20%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 12 }}/>
              <div style={{ height: 20, width: "70%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8 }}/>
              <div style={{ height: 13, width: "85%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }}/>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="blog-list-grid">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="post-card-wrap" style={{ padding: 20 }}>
          <div style={{ height: 190, background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 16 }}/>
          <div style={{ height: 12, width: "30%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 10 }}/>
          <div style={{ height: 18, width: "85%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8 }}/>
          <div style={{ height: 13, width: "65%", background: "linear-gradient(90deg,#F0F0FA 25%,#DDE0F5 50%,#F0F0FA 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }}/>
        </div>
      ))}
    </div>
  );
}

/* ── Empty state ──────────────────────────────── */
function EmptyState({ onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid #DDE0F5", background: "#fff" }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#8888A8", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 12 }}>
        No results
      </p>
      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "#010057", marginBottom: 10 }}>
        Nothing found
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", color: "#8888A8", fontSize: 14, marginBottom: 28 }}>
        Try a different keyword or category.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={onClear} style={{
          padding: "10px 22px", border: "1px solid #DDE0F5",
          background: "#fff", color: "#55557A",
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: 12, cursor: "pointer",
          letterSpacing: "0.8px", textTransform: "uppercase",
        }}>Clear Filters</button>
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
