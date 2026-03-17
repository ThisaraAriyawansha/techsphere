"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPost } from "../../../lib/firebase";

export default function BlogPostPage() {
  const { id }  = useParams();
  const router  = useRouter();
  const [post,     setPost]     = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isAdmin,  setIsAdmin]  = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem("techsphere_admin") === "true");
  }, []);

  useEffect(() => {
    if (!id) return;
    getPost(id)
      .then((data) => {
        if (!data) setNotFound(true);
        else setPost(data);
      })
      .catch(() => setNotFound(true))
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
      alert("Failed to delete post. Try again.");
      setDeleting(false);
    }
  }

  let displayDate = "—";
  if (post?.date) {
    try {
      displayDate = new Date(post.date).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });
    } catch {}
  }

  if (loading) return <LoadingState />;
  if (notFound) return <NotFoundState />;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "56px 24px 100px" }}>
      {/* Top bar: back link + admin delete */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 40,
      }}>
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: "#aaa", fontSize: 12, fontWeight: 500,
          textDecoration: "none",
          letterSpacing: "0.5px", textTransform: "uppercase",
          transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#010048"}
        onMouseLeave={e => e.currentTarget.style.color = "#aaa"}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Posts
        </a>

        {isAdmin && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              background: deleting ? "#f5f5f5" : "transparent",
              border: "1px solid #e0e0e0",
              color: deleting ? "#aaa" : "#c0392b",
              padding: "6px 16px", fontSize: 12,
              cursor: deleting ? "not-allowed" : "pointer",
              fontWeight: 600, fontFamily: "inherit",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}
          >
            {deleting ? "Deleting…" : "Delete Post"}
          </button>
        )}
      </div>

      {/* Article */}
      <article style={{
        background: "white",
        border: "1px solid #e8e8e8",
      }}>
        {/* Cover image */}
        {post.imageUrl && (
          <div style={{ height: 360, overflow: "hidden", background: "#f5f5f5" }}>
            <img
              src={post.imageUrl}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Header */}
        <div style={{
          padding: "40px 48px 32px",
          borderBottom: "1px solid #e8e8e8",
        }}>
          <span style={{
            fontSize: 11, color: "#aaa", fontWeight: 500,
            letterSpacing: "1px", textTransform: "uppercase",
            display: "block", marginBottom: 16,
          }}>{displayDate}</span>

          <h1 style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700, color: "#010048",
            lineHeight: 1.2, letterSpacing: "-0.5px",
          }}>
            {post.title}
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: "40px 48px" }}>
          <p style={{
            fontSize: 16, color: "#333",
            lineHeight: 1.9, whiteSpace: "pre-wrap",
            fontWeight: 300,
          }}>
            {post.description}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #e8e8e8",
          padding: "20px 48px",
          display: "flex", alignItems: "center", gap: 8,
          background: "#fafafa",
        }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ width: 24, height: 24, objectFit: "contain" }} />
          <span style={{ fontSize: 13, color: "#aaa", fontWeight: 500 }}>TechSphere</span>
        </div>
      </article>

      {/* Write another CTA */}
      <div style={{
        marginTop: 32,
        border: "1px solid #e8e8e8",
        padding: "28px 32px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <p style={{ color: "#010048", fontWeight: 600, fontSize: 15 }}>
            Have something to share?
          </p>
          <p style={{ color: "#aaa", fontSize: 13, marginTop: 4 }}>
            Publish your own post in seconds.
          </p>
        </div>
        <a href="/new" style={{
          padding: "10px 22px",
          background: "#010048",
          color: "white", fontWeight: 600, fontSize: 13,
          textDecoration: "none", letterSpacing: "0.3px",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          Write a Post →
        </a>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "56px 24px" }}>
      <div style={{ background: "white", border: "1px solid #e8e8e8" }}>
        <div style={{ background: "#f5f5f5", height: 200 }}/>
        <div style={{ padding: "40px 48px" }}>
          {[60, 90, 80, 100, 75].map((w, i) => (
            <div key={i} style={{
              height: i === 1 ? 18 : 13, width: `${w}%`,
              background: "linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
              marginBottom: 12,
            }}/>
          ))}
          <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        </div>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div style={{ textAlign: "center", padding: "100px 24px" }}>
      <p style={{ fontSize: 11, color: "#aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>
        404 — Not Found
      </p>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: "#010048", marginBottom: 12 }}>Post Not Found</h2>
      <p style={{ color: "#aaa", fontSize: 14, marginBottom: 32 }}>
        This post may have been removed or the link is incorrect.
      </p>
      <a href="/" style={{
        display: "inline-block", padding: "11px 28px",
        background: "#010048", color: "white",
        fontWeight: 600, fontSize: 13, textDecoration: "none",
        letterSpacing: "0.3px",
      }}>← Back to Home</a>
    </div>
  );
}
