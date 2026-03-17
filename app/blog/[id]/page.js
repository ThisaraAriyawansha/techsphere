"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPost, deletePost } from "../../../lib/firebase";

export default function BlogPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [notFound, setNotFound] = useState(false);

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
    setDeleting(true);
    try {
      await deletePost(id);
      router.push("/");
    } catch {
      setDeleting(false);
      setConfirm(false);
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
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 100px" }}>
      {/* Back */}
      <a href="/" style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        color: "#6b7280", fontSize: 14, fontWeight: 500,
        textDecoration: "none", marginBottom: 40,
        transition: "color 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.color = "#1d4ed8"}
      onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        All Posts
      </a>

      {/* Article card */}
      <article style={{
        background: "white",
        border: "1.5px solid #e8eaed",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
      }}>
        {/* Top banner */}
        <div style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 60%, #1a3a6b 100%)",
          padding: "48px 48px 40px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Decorative blobs */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,78,216,0.3) 0%, transparent 70%)",
          }}/>
          <div style={{
            position: "absolute", bottom: -30, left: -30,
            width: 150, height: 150, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)",
          }}/>

          {/* Date badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            marginBottom: 18,
            position: "relative",
          }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
              {displayDate}
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 750, color: "white",
            lineHeight: 1.15, letterSpacing: "-0.6px",
            maxWidth: 580, position: "relative",
          }}>
            {post.title}
          </h1>
        </div>

        {/* Cover image */}
        {post.imageUrl && (
          <div style={{ height: 340, overflow: "hidden" }}>
            <img
              src={post.imageUrl}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Content body */}
        <div style={{ padding: "44px 48px" }}>
          <p style={{
            fontSize: 17, color: "#374151",
            lineHeight: 1.85, whiteSpace: "pre-wrap",
          }}>
            {post.description}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #f0f2f5",
          padding: "20px 48px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
          background: "#fafafa",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #0d1f3c, #1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
                <path d="M12 3C12 3 8 8 8 12s4 9 4 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 3c0 0 4 5 4 9s-4 9-4 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3 12h18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>TechSphere</span>
          </div>

          {/* Delete button */}
          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "7px 14px", borderRadius: 8,
                border: "1px solid #fee2e2",
                background: "rgba(239,68,68,0.04)",
                color: "#dc2626", fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(239,68,68,0.10)";
                e.currentTarget.style.borderColor = "#fca5a5";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(239,68,68,0.04)";
                e.currentTarget.style.borderColor = "#fee2e2";
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Delete
            </button>
          ) : (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Are you sure?</span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: "6px 14px", borderRadius: 8,
                  background: "#dc2626", color: "white",
                  border: "none", fontSize: 13, fontWeight: 600,
                  cursor: deleting ? "not-allowed" : "pointer",
                  opacity: deleting ? 0.6 : 1,
                }}>
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setConfirm(false)}
                style={{
                  padding: "6px 14px", borderRadius: 8,
                  background: "#f5f5f7", color: "#374151",
                  border: "1px solid #e8eaed", fontSize: 13, fontWeight: 500,
                  cursor: "pointer",
                }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </article>

      {/* Write another */}
      <div style={{
        marginTop: 32, padding: "28px 32px",
        background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)",
        borderRadius: 20,
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <p style={{ color: "white", fontWeight: 650, fontSize: 16 }}>
            Have something to share?
          </p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>
            Publish your own post in seconds.
          </p>
        </div>
        <a href="/new" style={{
          padding: "10px 22px", borderRadius: 999,
          background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
          color: "white", fontWeight: 600, fontSize: 14,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(29,78,216,0.40)",
        }}>
          Write a Post →
        </a>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
      <div style={{
        background: "white", borderRadius: 24,
        border: "1.5px solid #e8eaed", overflow: "hidden",
      }}>
        <div style={{ background: "#f5f5f7", height: 200 }}/>
        <div style={{ padding: "44px 48px" }}>
          {[80, 60, 100, 90, 75].map((w, i) => (
            <div key={i} style={{
              height: 14, width: `${w}%`, borderRadius: 6,
              background: "linear-gradient(90deg, #f5f5f7 25%, #e8eaed 50%, #f5f5f7 75%)",
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
      <div style={{
        width: 80, height: 80, borderRadius: 22,
        background: "linear-gradient(135deg, #f0f2f5, #e8eaed)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px",
      }}>
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0a1628", marginBottom: 10 }}>Post Not Found</h2>
      <p style={{ color: "#9ca3af", fontSize: 15, marginBottom: 28 }}>
        This post may have been removed or the link is incorrect.
      </p>
      <a href="/" style={{
        display: "inline-block", padding: "11px 24px", borderRadius: 999,
        background: "linear-gradient(135deg, #0d1f3c, #1d4ed8)",
        color: "white", fontWeight: 600, fontSize: 14, textDecoration: "none",
      }}>← Back to Home</a>
    </div>
  );
}
