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
    Promise.all([
      getPost(id),
      getPosts(),
    ]).then(([data, all]) => {
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
    <div style={{ background: "#f5f5f7" }}>

      {/* Full-width top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e2e7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#6e6e73", fontSize: 12, fontWeight: 500,
            textDecoration: "none", letterSpacing: "0.3px",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#010048"}
          onMouseLeave={e => e.currentTarget.style.color = "#6e6e73"}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Posts
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "#aeaeb2" }}>{readTime} min read</span>
            {isAdmin && (
              <button onClick={handleDelete} disabled={deleting} style={{
                background: "transparent",
                border: "1px solid #fca5a5",
                color: deleting ? "#aeaeb2" : "#dc2626",
                padding: "5px 14px", fontSize: 12,
                cursor: deleting ? "not-allowed" : "pointer",
                fontWeight: 600, fontFamily: "inherit",
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                {deleting ? "Deleting…" : "Delete Post"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 75/25 layout — responsive via .blog-layout in globals.css */}
      <div className="blog-layout">

        {/* ── Main Article ───────────────────── */}
        <main>
          {/* Cover image */}
          {post.imageUrl && (
            <div style={{ height: 420, overflow: "hidden", background: "#e2e2e7" }}>
              <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
          )}

          {/* Article */}
          <article style={{ background: "#fff", border: "1px solid #e2e2e7" }}>
            {/* Meta */}
            <div style={{ padding: "36px 44px 28px", borderBottom: "1px solid #e2e2e7" }}>
              <p style={{
                fontSize: 11, color: "#aeaeb2", fontWeight: 500,
                letterSpacing: "0.8px", textTransform: "uppercase",
                marginBottom: 18,
              }}>{displayDate} · {readTime} min read</p>

              <h1 style={{
                fontSize: "clamp(22px, 3vw, 34px)",
                fontWeight: 700, color: "#1d1d1f",
                lineHeight: 1.2, letterSpacing: "-0.5px",
              }}>
                {post.title}
              </h1>
            </div>

            {/* Body */}
            <div style={{ padding: "36px 44px 40px" }}>
              <p style={{
                fontSize: 17, color: "#374151",
                lineHeight: 2, whiteSpace: "pre-wrap",
                fontWeight: 300,
              }}>
                {post.description}
              </p>
            </div>

            {/* Article footer */}
            <div style={{
              borderTop: "1px solid #e2e2e7",
              padding: "16px 44px",
              display: "flex", alignItems: "center", gap: 10,
              background: "#fafafa",
            }}>
              <img src="/logo/logo.png" alt="TechSphere" style={{ width: 20, height: 20, objectFit: "contain" }} />
              <span style={{ fontSize: 12, color: "#aeaeb2", fontWeight: 500 }}>Published on TechSphere</span>
            </div>
          </article>

          {/* Write CTA */}
          <div style={{
            marginTop: 2,
            background: "#010048",
            padding: "32px 44px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                Have something to share?
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                Publish your own post in seconds — no account needed.
              </p>
            </div>
            <a href="/new" style={{
              padding: "11px 24px",
              background: "#ffffff", color: "#010048",
              fontWeight: 700, fontSize: 13,
              textDecoration: "none",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Write a Post →
            </a>
          </div>
        </main>

        {/* ── Sidebar (25%) ─────────────────── */}
        <aside className="blog-sidebar" style={{ position: "sticky", top: 72 }}>

          {/* Search */}
          <div style={{ background: "#fff", border: "1px solid #e2e2e7", padding: "20px", marginBottom: 2 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#1d1d1f", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14 }}>
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
                onBlur={e => e.currentTarget.style.borderColor = "#e2e2e7"}
              />
              <button type="submit" className="sidebar-search-btn">Go</button>
            </form>
          </div>

          {/* Recent Posts */}
          {recent.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid #e2e2e7", borderTop: "none", padding: "20px", marginBottom: 2 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: "#1d1d1f", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 16 }}>
                Recent Posts
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {recent.map((rp, i) => (
                  <RecentPostItem key={rp.id} post={rp} isLast={i === recent.length - 1} />
                ))}
              </div>
              <a href="/" style={{
                display: "block", marginTop: 14,
                fontSize: 12, fontWeight: 600, color: "#010048",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                View all articles →
              </a>
            </div>
          )}

          {/* Browse Topics */}
          <div style={{ background: "#fff", border: "1px solid #e2e2e7", borderTop: "none", padding: "20px", marginBottom: 2 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#1d1d1f", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14 }}>
              Browse Topics
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TOPIC_TAGS.map(tag => (
                <a key={tag} href={`/?search=${encodeURIComponent(tag.split(" ")[0])}`} style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  border: "1px solid #e2e2e7",
                  background: "#f5f5f7",
                  fontSize: 11, fontWeight: 500,
                  color: "#6e6e73",
                  textDecoration: "none",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#010048"; e.currentTarget.style.color = "#010048"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e2e7"; e.currentTarget.style.color = "#6e6e73"; }}>
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ background: "#010048", border: "1px solid #010048", borderTop: "none", padding: "20px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Get the Newsletter</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 14 }}>Weekly tech articles, curated and free.</p>
            <a href="/newsletter" style={{
              display: "block", textAlign: "center",
              padding: "9px 16px",
              background: "#fff", color: "#010048",
              fontSize: 12, fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
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
        padding: "12px 0",
        borderBottom: isLast ? "none" : "1px solid #f0f0f0",
        textDecoration: "none",
      }}>
      <p style={{
        fontSize: 13, fontWeight: 500,
        color: hov ? "#010048" : "#1d1d1f",
        lineHeight: 1.4, marginBottom: 4,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        transition: "color 0.15s",
      }}>{post.title}</p>
      <span style={{ fontSize: 11, color: "#aeaeb2" }}>{date}</span>
    </a>
  );
}

function LoadingState() {
  return (
    <div style={{ background: "#f5f5f7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "white", border: "1px solid #e2e2e7" }}>
          <div style={{ background: "linear-gradient(90deg,#f5f5f7 25%,#eaeaec 50%,#f5f5f7 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", height: 280 }}/>
          <div style={{ padding: "40px 44px" }}>
            {[60,90,80,100,75,65].map((w, i) => (
              <div key={i} style={{
                height: i===1 ? 20 : 13, width: `${w}%`,
                background: "linear-gradient(90deg,#f5f5f7 25%,#eaeaec 50%,#f5f5f7 75%)",
                backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: 14,
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
    <div style={{ textAlign: "center", padding: "120px 24px", background: "#f5f5f7", minHeight: "100vh" }}>
      <p style={{ fontSize: 11, color: "#aeaeb2", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>404 — Not Found</p>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1d1d1f", marginBottom: 10, letterSpacing: "-0.4px" }}>Post Not Found</h2>
      <p style={{ color: "#6e6e73", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>
        This post may have been removed or the link is incorrect.
      </p>
      <a href="/" style={{
        display: "inline-block", padding: "12px 28px",
        background: "#010048", color: "white",
        fontWeight: 600, fontSize: 13, textDecoration: "none",
      }}>← Back to Home</a>
    </div>
  );
}
