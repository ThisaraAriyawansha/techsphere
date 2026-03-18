"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPost, getPosts } from "../../../lib/firebase";

const TOPIC_TAGS = ["AI & ML", "Web Dev", "Mobile", "Cloud", "Security", "DevOps", "Open Source", "Data Science", "Programming"];

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
    <div style={{ background: "#FAF8F5" }}>

      {/* ── Breadcrumb bar ─────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #D4CFC8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-sans)",
            color: "#888", fontSize: 11, fontWeight: 700,
            textDecoration: "none", letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#C41E3A"}
          onMouseLeave={e => e.currentTarget.style.color = "#888"}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Articles
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#999", letterSpacing: "0.3px" }}>{readTime} min read</span>
            {isAdmin && (
              <button onClick={handleDelete} disabled={deleting} style={{
                background: "transparent",
                border: "1px solid #fca5a5",
                color: deleting ? "#999" : "#C41E3A",
                padding: "4px 14px", fontSize: 11,
                cursor: deleting ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans)", fontWeight: 700,
                display: "inline-flex", alignItems: "center", gap: 5,
                letterSpacing: "0.5px",
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
            <div style={{ height: 420, overflow: "hidden", background: "#D4CFC8" }}>
              <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
          )}

          {/* Article */}
          <article style={{ background: "#fff", border: "1px solid #D4CFC8", borderTop: "3px solid #1A1A1A" }}>

            {/* Article header */}
            <div style={{ padding: "36px 44px 28px", borderBottom: "1px solid #EAE7E0" }}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10, color: "#999", fontWeight: 700,
                letterSpacing: "1.5px", textTransform: "uppercase",
                marginBottom: 16,
              }}>
                <span style={{ color: "#C41E3A" }}>TechSphere</span>
                {" · "}{displayDate}{" · "}{readTime} min read
              </p>

              <h1 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 700, color: "#1A1A1A",
                lineHeight: 1.18, letterSpacing: "-0.3px",
              }}>
                {post.title}
              </h1>
            </div>

            {/* Decorative rule */}
            <div style={{ height: 1, background: "#EAE7E0", margin: "0 44px" }}/>

            {/* Article body */}
            <div className="article-body" style={{ padding: "32px 44px 44px" }}>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17, color: "#2a2a2a",
                lineHeight: 2.0, whiteSpace: "pre-wrap",
                fontWeight: 400,
              }}>
                {post.description}
              </p>
            </div>

            {/* Article footer */}
            <div style={{
              borderTop: "1px solid #EAE7E0",
              padding: "16px 44px",
              display: "flex", alignItems: "center", gap: 10,
              background: "#FAF8F5",
            }}>
              <div style={{
                width: 28, height: 28,
                background: "#1A1A1A",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <img src="/logo/logo.png" alt="TechSphere" style={{ width: 16, height: 16, objectFit: "contain" }} />
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "#1A1A1A", display: "block", letterSpacing: "0.5px" }}>TechSphere</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#999" }}>Open Tech Publication</span>
              </div>
            </div>
          </article>

          {/* Write CTA */}
          <div style={{
            marginTop: 2,
            background: "#1A1A1A",
            borderTop: "4px solid #C41E3A",
            padding: "32px 44px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-serif)", color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
                Have something to share?
              </p>
              <p style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
                Publish your own post in seconds — no account needed.
              </p>
            </div>
            <a href="/new" style={{
              padding: "11px 24px",
              background: "#C41E3A", color: "#ffffff",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
              textDecoration: "none",
              letterSpacing: "1px", textTransform: "uppercase",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Write a Post →
            </a>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="blog-sidebar" style={{ position: "sticky", top: 80 }}>

          {/* Search */}
          <div style={{ background: "#fff", border: "1px solid #D4CFC8", borderTop: "3px solid #1A1A1A", padding: "18px 20px", marginBottom: 2 }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#1A1A1A", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Search
            </h3>
            <form onSubmit={handleSearch} className="sidebar-search-form">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="sidebar-search-input"
                onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
                onBlur={e => e.currentTarget.style.borderColor = "#D4CFC8"}
              />
              <button type="submit" className="sidebar-search-btn">Go</button>
            </form>
          </div>

          {/* Recent Posts */}
          {recent.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid #D4CFC8", borderTop: "none", padding: "18px 20px", marginBottom: 2 }}>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#1A1A1A", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #EAE7E0" }}>
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
                fontSize: 10, fontWeight: 700, color: "#C41E3A",
                textDecoration: "none", letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                View all articles →
              </a>
            </div>
          )}

          {/* Browse Topics */}
          <div style={{ background: "#fff", border: "1px solid #D4CFC8", borderTop: "none", padding: "18px 20px", marginBottom: 2 }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#1A1A1A", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #EAE7E0" }}>
              Sections
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TOPIC_TAGS.map(tag => (
                <a key={tag} href={`/?search=${encodeURIComponent(tag.split(" ")[0])}`} style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  border: "1px solid #D4CFC8",
                  background: "#FAF8F5",
                  fontFamily: "var(--font-sans)",
                  fontSize: 10, fontWeight: 700,
                  color: "#666",
                  textDecoration: "none",
                  letterSpacing: "0.5px",
                  transition: "border-color 0.15s, color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C41E3A"; e.currentTarget.style.color = "#C41E3A"; e.currentTarget.style.background = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#D4CFC8"; e.currentTarget.style.color = "#666"; e.currentTarget.style.background = "#FAF8F5"; }}>
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ background: "#1A1A1A", borderTop: "3px solid #C41E3A", padding: "20px" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Get the Newsletter</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 14 }}>Weekly tech articles, curated and free.</p>
            <a href="/newsletter" style={{
              display: "block", textAlign: "center",
              padding: "9px 16px",
              background: "#C41E3A", color: "#fff",
              fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "1px", textTransform: "uppercase",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
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
        borderBottom: isLast ? "none" : "1px solid #EAE7E0",
        textDecoration: "none",
      }}>
      <p style={{
        fontFamily: "var(--font-serif)",
        fontSize: 13, fontWeight: 600,
        color: hov ? "#C41E3A" : "#1A1A1A",
        lineHeight: 1.4, marginBottom: 4,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        transition: "color 0.15s",
      }}>{post.title}</p>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#999" }}>{date}</span>
    </a>
  );
}

function LoadingState() {
  return (
    <div style={{ background: "#FAF8F5" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "white", border: "1px solid #D4CFC8", borderTop: "3px solid #1A1A1A" }}>
          <div style={{ background: "linear-gradient(90deg,#F5F3EF 25%,#EAE7E0 50%,#F5F3EF 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", height: 280 }}/>
          <div style={{ padding: "40px 44px" }}>
            {[60,90,80,100,75,65].map((w, i) => (
              <div key={i} style={{
                height: i===1 ? 24 : 13, width: `${w}%`,
                background: "linear-gradient(90deg,#F5F3EF 25%,#EAE7E0 50%,#F5F3EF 75%)",
                backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 16,
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
    <div style={{ textAlign: "center", padding: "120px 24px", background: "#FAF8F5", minHeight: "100vh" }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#C41E3A", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 16 }}>
        404 — Not Found
      </p>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, color: "#1A1A1A", marginBottom: 12, letterSpacing: "-0.3px" }}>
        Post Not Found
      </h2>
      <p style={{ fontFamily: "var(--font-sans)", color: "#666", fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
        This post may have been removed or the link is incorrect.
      </p>
      <a href="/" style={{
        display: "inline-block", padding: "12px 28px",
        background: "#1A1A1A", color: "white",
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
        textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
      }}>← Back to Home</a>
    </div>
  );
}
