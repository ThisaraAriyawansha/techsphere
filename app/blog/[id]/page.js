"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPost, getPosts } from "../../../lib/firebase";

const TOPIC_TAGS = ["AI & ML", "Web Dev", "Mobile", "Cloud", "Security", "DevOps", "Open Source", "Data Science", "Programming"];
const TAG_KEYS = { "AI & ML": "ai", "Web Dev": "web", "Mobile": "mobile", "Cloud": "cloud", "Security": "security", "DevOps": "devops", "Open Source": "open source", "Data Science": "data", "Programming": "programming" };

export default function BlogPostPage() {
  const { id }   = useParams();
  const router   = useRouter();
  const [post,      setPost]      = useState(null);
  const [recent,    setRecent]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [notFound,  setNotFound]  = useState(false);
  const [isAdmin,   setIsAdmin]   = useState(false);
  const [deleting,  setDeleting]  = useState(false);
  const [search,    setSearch]    = useState("");

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem("techsphere_admin") === "true");
  }, []);

  useEffect(() => {
    if (!id) return;
    Promise.all([getPost(id), getPosts()]).then(([data, all]) => {
      if (!data) { setNotFound(true); return; }
      setPost(data);
      setRecent(all.filter(p => p.id !== id).slice(0, 5));
    }).catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!confirm(`Delete "${post.title}"?\n\nThis cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push("/");
    } catch {
      alert("Failed to delete. Try again.");
      setDeleting(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) window.location.href = `/?search=${encodeURIComponent(search.trim())}`;
  }

  let displayDate = "—";
  if (post?.date) {
    try { displayDate = new Date(post.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }); } catch {}
  }
  const readTime = post?.description ? Math.max(1, Math.ceil(post.description.split(" ").length / 200)) : 1;

  if (loading) return <LoadingState />;
  if (notFound) return <NotFoundState />;

  return (
    <div style={{ background: "#F5F5F7" }}>

      {/* ── Breadcrumb bar ─────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8E8ED" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-sans)",
            color: "#A1A1A6", fontSize: 12, fontWeight: 500,
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#010048"}
          onMouseLeave={e => e.currentTarget.style.color = "#A1A1A6"}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Articles
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#A1A1A6", letterSpacing: "0.3px" }}>{readTime} min read</span>
            {isAdmin && (
              <button onClick={handleDelete} disabled={deleting} style={{
                background: "transparent",
                border: "1px solid #FECACA",
                color: deleting ? "#A1A1A6" : "#DC2626",
                padding: "4px 14px", fontSize: 12,
                cursor: deleting ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans)", fontWeight: 600,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                {deleting ? "Deleting…" : "Delete Post"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Layout ────────────────────────────── */}
      <div className="blog-layout">

        {/* Main Article */}
        <main>
          {/* Cover image */}
          {post.imageUrl && (
            <div style={{ overflow: "hidden", background: "#E8E8ED", marginBottom: 0 }}>
              <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}/>
            </div>
          )}

          {/* Article */}
          <article style={{ background: "#fff", border: "1px solid #E8E8ED", overflow: "hidden" }}>

            {/* Newspaper top accent rule */}
            <div style={{ height: 4, background: "#010048" }} />
            <div style={{ height: 1, background: "#D2D2D7" }} />

            {/* Article header */}
            <div style={{ padding: "32px 44px 28px", borderBottom: "1px solid #E8E8ED" }}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10, color: "#010048", fontWeight: 700,
                marginBottom: 18, letterSpacing: "2px", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>TechSphere</span>
                <span style={{ color: "#D2D2D7" }}>—</span>
                <span style={{ color: "#A1A1A6", fontWeight: 500 }}>{displayDate}</span>
                <span style={{ color: "#D2D2D7" }}>—</span>
                <span style={{ color: "#A1A1A6", fontWeight: 500 }}>{readTime} min read</span>
              </p>

              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3.2vw, 36px)",
                fontWeight: 800, color: "#1D1D1F",
                lineHeight: 1.15, letterSpacing: "-0.5px",
              }}>
                {post.title}
              </h1>
            </div>

            {/* Article body */}
            <div className="article-body" style={{ padding: "32px 44px 44px" }}>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17, color: "#1D1D1F",
                lineHeight: 1.95, whiteSpace: "pre-wrap",
                fontWeight: 400,
              }}>
                {post.description}
              </p>
            </div>

            {/* Article footer / author */}
            <div style={{
              borderTop: "1px solid #E8E8ED",
              padding: "16px 44px",
              display: "flex", alignItems: "center", gap: 12,
              background: "#F5F5F7",
            }}>
              <div style={{
                width: 36, height: 36,
                background: "#010048",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <img src="/logo/logo.png" alt="TechSphere" style={{ width: 20, height: 20, objectFit: "contain" }} />
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#1D1D1F", display: "block" }}>TechSphere</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#A1A1A6", letterSpacing: "0.3px" }}>Open Tech Publication</span>
              </div>
            </div>
          </article>

          {/* Write CTA */}
          <div style={{
            marginTop: 16,
            background: "#fff",
            border: "1px solid #E8E8ED",
            borderTop: "3px solid #010048",
            padding: "28px 36px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-display)", color: "#1D1D1F", fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
                Have something to share?
              </p>
              <p style={{ fontFamily: "var(--font-sans)", color: "#6E6E73", fontSize: 13 }}>
                Publish your own post in seconds — no account needed.
              </p>
            </div>
            <a href="/new" style={{
              padding: "11px 24px",
              background: "#010048", color: "#fff",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
              textDecoration: "none", whiteSpace: "nowrap",
              letterSpacing: "0.8px", textTransform: "uppercase",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Write a Post →
            </a>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="blog-sidebar" style={{ position: "sticky", top: 84 }}>

          {/* Search */}
          <div style={{ background: "#fff", border: "1px solid #E8E8ED", borderTop: "3px solid #010048", padding: "18px 20px", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>
              Search
            </h3>
            <form onSubmit={handleSearch} className="sidebar-search-form">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="sidebar-search-input"
                onFocus={e => e.currentTarget.style.borderColor = "#010048"}
                onBlur={e => e.currentTarget.style.borderColor = "#E8E8ED"}
              />
              <button type="submit" className="sidebar-search-btn">Go</button>
            </form>
          </div>

          {/* Recent Posts */}
          {recent.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid #E8E8ED", borderTop: "3px solid #010048", padding: "18px 20px", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #E8E8ED" }}>
                More Articles
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {recent.map((rp, i) => (
                  <RecentPostItem key={rp.id} post={rp} isLast={i === recent.length - 1} />
                ))}
              </div>
              <a href="/" style={{
                display: "block", marginTop: 14,
                fontFamily: "var(--font-sans)",
                fontSize: 11, fontWeight: 700, color: "#010048",
                textDecoration: "none", letterSpacing: "0.5px", textTransform: "uppercase",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                View all articles →
              </a>
            </div>
          )}

          {/* Browse Topics */}
          <div style={{ background: "#fff", border: "1px solid #E8E8ED", borderTop: "3px solid #010048", padding: "18px 20px", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #E8E8ED" }}>
              Sections
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TOPIC_TAGS.map(tag => (
                <a key={tag} href={`/blog?category=${encodeURIComponent(TAG_KEYS[tag])}`} style={{
                  display: "inline-block",
                  padding: "5px 12px",
                  border: "1px solid #E8E8ED",
                  background: "#F5F5F7",
                  fontFamily: "var(--font-sans)",
                  fontSize: 11, fontWeight: 600,
                  color: "#6E6E73",
                  textDecoration: "none",
                  transition: "border-color 0.15s, color 0.15s, background 0.15s",
                  letterSpacing: "0.2px",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#010048"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "#010048"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8ED"; e.currentTarget.style.color = "#6E6E73"; e.currentTarget.style.background = "#F5F5F7"; }}>
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ background: "#010048", border: "1px solid #010048", padding: "24px 20px" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>Get the Newsletter</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 16 }}>Weekly tech articles, curated and free.</p>
            <a href="/newsletter" style={{
              display: "block", textAlign: "center",
              padding: "10px 16px",
              background: "#fff", color: "#010048",
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Subscribe Free →
            </a>
          </div>

        </aside>
      </div>
    </div>
  );
}

function RecentPostItem({ post, isLast }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }); } catch {}

  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        padding: "11px 0",
        borderBottom: isLast ? "none" : "1px solid #E8E8ED",
        textDecoration: "none",
      }}>
      <p style={{
        fontFamily: "var(--font-display)",
        fontSize: 13, fontWeight: 700,
        color: hov ? "#010048" : "#1D1D1F",
        lineHeight: 1.35, marginBottom: 4,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        transition: "color 0.15s",
      }}>{post.title}</p>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#A1A1A6" }}>{date}</span>
    </a>
  );
}

function LoadingState() {
  return (
    <div style={{ background: "#F5F5F7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "white", border: "1px solid #E8E8ED", overflow: "hidden" }}>
          <div style={{ height: 4, background: "#010048" }} />
          <div style={{ background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", height: 280 }}/>
          <div style={{ padding: "40px 44px" }}>
            {[60,90,80,100,75,65].map((w, i) => (
              <div key={i} style={{
                height: i===1 ? 24 : 13, width: `${w}%`,
                background: "linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)",
                backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 16, borderRadius: 4,
              }}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div style={{ textAlign: "center", padding: "120px 24px", background: "#F5F5F7", minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ borderTop: "3px solid #010048", paddingTop: 12, marginBottom: 24 }}>
          <div style={{ height: 1, background: "#D2D2D7" }} />
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#010048", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>
          404 — Not Found
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900, color: "#1D1D1F", marginBottom: 14, letterSpacing: "-0.5px" }}>
          Post Not Found
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", color: "#6E6E73", fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>
          This post may have been removed or the link is incorrect.
        </p>
        <a href="/" style={{
          display: "inline-block", padding: "12px 28px",
          background: "#010048", color: "white",
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12,
          textDecoration: "none", letterSpacing: "0.8px", textTransform: "uppercase",
        }}>← Back to Home</a>
      </div>
    </div>
  );
}
