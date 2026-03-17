"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts } from "../../../lib/firebase";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toast,    setToast]    = useState("");
  const [confirm,  setConfirm]  = useState(null); // post to confirm delete

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("techsphere_admin") !== "true") {
        router.replace("/admin");
      }
    }
  }, [router]);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("techsphere_admin");
    router.push("/admin");
  }

  async function confirmDelete() {
    const post = confirm;
    setConfirm(null);
    setDeleting(post.id);
    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPosts(prev => prev.filter(p => p.id !== post.id));
      showToast("Post deleted successfully.");
    } catch {
      showToast("Failed to delete post. Try again.");
    } finally {
      setDeleting(null);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>

      {/* Header */}
      <div style={{
        background: "#010048", padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 60,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ height: 26, objectFit: "contain" }} />
          <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            ← View Site
          </a>
          <button onClick={handleLogout} style={{
            background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)", padding: "6px 14px",
            fontSize: 12, cursor: "pointer", fontFamily: "inherit",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>

        {/* Stats */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            background: "white", border: "1px solid #e8e8e8",
            padding: "20px 24px", display: "inline-block", minWidth: 140,
          }}>
            <p style={{ fontSize: 11, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
              Total Posts
            </p>
            <p style={{ fontSize: 32, fontWeight: 700, color: "#010048" }}>{posts.length}</p>
          </div>
        </div>

        {/* Posts Table */}
        <div style={{ background: "white", border: "1px solid #e8e8e8" }}>
          <div style={{
            padding: "14px 20px",
            borderBottom: "1px solid #e8e8e8",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 10,
          }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#010048" }}>All Posts</h2>
            <a href="/new" style={{
              fontSize: 12, color: "white", background: "#010048",
              padding: "7px 16px", textDecoration: "none", fontWeight: 600,
              whiteSpace: "nowrap",
            }}>
              + New Post
            </a>
          </div>

          {loading ? (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#aaa", fontSize: 14 }}>
              Loading posts…
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#aaa", fontSize: 14 }}>
              No posts found.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                <thead>
                  <tr style={{ background: "#fafafa" }}>
                    {["Title", "Date", "Actions"].map(h => (
                      <th key={h} style={{
                        textAlign: "left", padding: "10px 20px",
                        fontSize: 11, fontWeight: 600, color: "#aaa",
                        letterSpacing: "0.8px", textTransform: "uppercase",
                        borderBottom: "1px solid #e8e8e8",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr key={post.id} style={{ borderBottom: i < posts.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <a
                          href={`/blog/${post.id}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: 14, color: "#010048", fontWeight: 500,
                            textDecoration: "none", display: "block",
                            maxWidth: 340, overflow: "hidden",
                            textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                        >
                          {post.title}
                        </a>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#888", whiteSpace: "nowrap" }}>
                        {post.date || "—"}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <button
                          onClick={() => setConfirm(post)}
                          disabled={deleting === post.id}
                          style={{
                            background: deleting === post.id ? "#f5f5f5" : "transparent",
                            border: "1px solid #e0e0e0",
                            color: deleting === post.id ? "#aaa" : "#c0392b",
                            padding: "5px 14px", fontSize: 12,
                            cursor: deleting === post.id ? "not-allowed" : "pointer",
                            fontWeight: 600, fontFamily: "inherit",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={e => { if (deleting !== post.id) e.currentTarget.style.background = "#fff0f0"; }}
                          onMouseLeave={e => { if (deleting !== post.id) e.currentTarget.style.background = "transparent"; }}
                        >
                          {deleting === post.id ? "Deleting…" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Custom Confirm Modal ── */}
      {confirm && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, padding: 24,
        }}
        onClick={() => setConfirm(null)}>
          <div style={{
            background: "#fff",
            border: "1px solid #e8e8e8",
            padding: "28px 28px 24px",
            maxWidth: 380, width: "100%",
            boxSizing: "border-box",
          }}
          onClick={e => e.stopPropagation()}>
            {/* Icon + title */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
              <div style={{
                flexShrink: 0, width: 36, height: 36,
                background: "#fff5f5", border: "1px solid #fcd0d0",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#010048", marginBottom: 4 }}>
                  Delete post?
                </p>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 500, color: "#010048" }}>&quot;{confirm.title}&quot;</span> will be permanently removed from the platform.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={() => setConfirm(null)} style={{
                padding: "8px 18px", fontSize: 13, fontWeight: 500,
                border: "1px solid #e8e8e8", background: "#fff",
                color: "#555", cursor: "pointer", fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#aaa"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={{
                padding: "8px 18px", fontSize: 13, fontWeight: 600,
                border: "none", background: "#c0392b",
                color: "#fff", cursor: "pointer", fontFamily: "inherit",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%",
          transform: "translateX(-50%)",
          background: "#010048", color: "white",
          padding: "12px 24px", fontSize: 13, fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          zIndex: 9999, whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
