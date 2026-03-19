"use client";
import { useEffect, useRef, useState } from "react";
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
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setCategory(cat);
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
      <div style={{ background: "#F5F5F7", padding: "48px 24px 40px", borderBottom: "1px solid #E8E8ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#A1A1A6", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              TechSphere
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 700, color: "#1D1D1F",
            lineHeight: 1.1, letterSpacing: "-0.8px",
            marginBottom: 12,
          }}>
            All Articles
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#6E6E73", lineHeight: 1.6, maxWidth: 500 }}>
            {loading ? "Loading articles…" : `${posts.length} articles from the tech community — free to read, always.`}
          </p>
        </div>
      </div>

      {/* ── Filters bar ──────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8E8ED", position: "sticky", top: 60, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

            {/* Category tabs with scroll arrows */}
            <BlogCategoryTabs categories={CATEGORIES} category={category} setCategory={setCategory} />

            {/* Right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 2 }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#A1A1A6", pointerEvents: "none" }}
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
                    border: "1px solid #D2D2D7",
                    background: "#fff",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12, color: "#1D1D1F",
                    width: 170, outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#010048"}
                  onBlur={e => e.currentTarget.style.borderColor = "#D2D2D7"}
                />
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #D2D2D7",
                  background: "#fff",
                  fontFamily: "var(--font-sans)",
                  fontSize: 12, color: "#1D1D1F",
                  cursor: "pointer", outline: "none",
                }}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>

              {/* View toggle */}
              <div style={{ display: "flex", border: "1px solid #D2D2D7", overflow: "hidden" }}>
                {[
                  { v: "grid", icon: "⊞" },
                  { v: "list", icon: "☰" },
                ].map(({ v, icon }) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      width: 34, height: 34, border: "none",
                      background: view === v ? "#010048" : "#fff",
                      color: view === v ? "#fff" : "#6E6E73",
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
          paddingBottom: 16, marginBottom: 0,
          borderBottom: "1px solid #E8E8ED",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>
              {category ? CATEGORIES.find(c => c.key === category)?.label : search ? `Search: "${search}"` : "All Articles"}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#A1A1A6" }}>
              {loading ? "loading…" : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`}
            </span>
          </div>
          {(search || category) && (
            <button onClick={() => { setSearch(""); setCategory(null); }} style={{
              background: "none", border: "1px solid #D2D2D7", padding: "5px 12px",
              fontFamily: "var(--font-sans)", fontSize: 12, color: "#6E6E73",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
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
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
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
function BlogCategoryTabs({ categories, category, setCategory }) {
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
    <div
      ref={scrollRef}
      className="topics-scroll"
      style={{ display: "flex", flex: 1, minWidth: 0, cursor: "grab", userSelect: "none" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      {categories.map(({ label, key }) => (
        <button
          key={label}
          onClick={() => { if (!drag.current.moved) setCategory(key); }}
          style={{
            padding: "12px 14px",
            background: "transparent",
            color: category === key ? "#010048" : "#6E6E73",
            borderBottom: category === key ? "2px solid #010048" : "2px solid transparent",
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
  );
}

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
        background: "#fff",
        textDecoration: "none",
        height: "100%",
      }}>
      {post.imageUrl ? (
        <div style={{ height: 190, overflow: "hidden", background: "#F5F5F7" }}>
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}/>
        </div>
      ) : (
        <div style={{
          height: 190,
          background: `linear-gradient(135deg, #010048 0%, ${["#3730a3","#1e40af","#1d4ed8","#2563eb"][post.id?.charCodeAt?.(0) % 4 ?? 0]} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 64, color: "rgba(255,255,255,0.06)", fontWeight: 900, position: "absolute" }}>TS</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 32, color: "rgba(255,255,255,0.25)", fontWeight: 700, position: "relative", zIndex: 1 }}>
            {post.title?.charAt(0) || "T"}
          </span>
        </div>
      )}
      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{date}</span>
          <span style={{ width: 2, height: 2, background: "#D2D2D7", borderRadius: "50%" }}/>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{readTime} min</span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15, fontWeight: 600,
          color: hov ? "#010048" : "#1D1D1F",
          lineHeight: 1.35, marginBottom: 10, flex: 1,
          transition: "color 0.15s",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{post.title}</h3>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13, color: "#6E6E73", lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          marginBottom: 14,
        }}>{post.description}</p>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
          color: hov ? "#010048" : "#A1A1A6",
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
        padding: "20px 24px",
        border: "1px solid #E8E8ED",
        textDecoration: "none",
        background: hov ? "#F5F5F7" : "#fff",
        transition: "background 0.15s",
      }}>
      {/* Image */}
      <div style={{ width: 120, height: 90, flexShrink: 0, overflow: "hidden", background: "#F5F5F7" }}>
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.3s",
          }}/>
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #010048, #3730a3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 24, color: "rgba(255,255,255,0.25)", fontWeight: 700 }}>
              {post.title?.charAt(0) || "T"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{date}</span>
          <span style={{ width: 2, height: 2, background: "#D2D2D7", borderRadius: "50%", flexShrink: 0 }}/>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6" }}>{readTime} min read</span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-sans)",
          fontSize: 17, fontWeight: 600,
          color: hov ? "#010048" : "#1D1D1F",
          lineHeight: 1.3, marginBottom: 8,
          transition: "color 0.15s",
        }}>{post.title}</h3>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13, color: "#6E6E73", lineHeight: 1.65,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{post.description}</p>
      </div>

      {/* Arrow */}
      <div style={{
        flexShrink: 0, color: hov ? "#010048" : "#D2D2D7",
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
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ display: "flex", gap: 20, padding: "20px 24px", border: "1px solid #E8E8ED" }}>
            <div style={{ width: 120, height: 90, background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ height: 10, width: "20%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 12, borderRadius: 4 }}/>
              <div style={{ height: 20, width: "70%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8, borderRadius: 4 }}/>
              <div style={{ height: 13, width: "85%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4 }}/>
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
          <div style={{ height: 190, background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 16 }}/>
          <div style={{ height: 12, width: "30%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 10, borderRadius: 4 }}/>
          <div style={{ height: 18, width: "85%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 8, borderRadius: 4 }}/>
          <div style={{ height: 13, width: "65%", background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4 }}/>
        </div>
      ))}
    </div>
  );
}

/* ── Empty state ──────────────────────────────── */
function EmptyState({ onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid #E8E8ED", background: "#fff", marginTop: 24 }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#A1A1A6", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
        No results
      </p>
      <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#1D1D1F", marginBottom: 10 }}>
        Nothing found
      </h3>
      <p style={{ fontFamily: "var(--font-sans)", color: "#A1A1A6", fontSize: 14, marginBottom: 28 }}>
        Try a different keyword or category.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={onClear} style={{
          padding: "10px 22px", border: "1px solid #D2D2D7",
          background: "#fff", color: "#6E6E73",
          fontFamily: "var(--font-sans)", fontWeight: 600,
          fontSize: 13, cursor: "pointer",
        }}>Clear Filters</button>
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
