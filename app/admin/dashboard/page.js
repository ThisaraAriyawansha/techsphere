"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts } from "../../../lib/firebase";

export default function AdminDashboard() {
  const router  = useRouter();
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // post id being deleted
  const [toast, setToast]     = useState("");

  // Guard: must be admin
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

  async function handleDelete(post) {
    if (!confirm(`Delete "${post.title}"?\n\nThis will permanently remove the post from the platform.`)) return;

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
        background: "#03002e", padding: "0 32px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 60,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ height: 28, objectFit: "contain" }} />
          <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ color: "#aaa", fontSize: 13, textDecoration: "none" }}>← View Site</a>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent", border: "1px solid #555",
              color: "#ccc", padding: "6px 14px",
              fontSize: 12, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* Stats */}
        <div style={{
          display: "flex", gap: 16, marginBottom: 32,
        }}>
          <div style={{
            background: "white", border: "1px solid #e8e8e8",
            padding: "20px 24px", flex: 1,
          }}>
            <p style={{ fontSize: 11, color: "#aaa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>
              Total Posts
            </p>
            <p style={{ fontSize: 32, fontWeight: 700, color: "#03002e" }}>{posts.length}</p>
          </div>
        </div>

        {/* Posts Table */}
        <div style={{ background: "white", border: "1px solid #e8e8e8" }}>
          <div style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e8e8e8",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#03002e" }}>All Posts</h2>
            <a href="/new" style={{
              fontSize: 12, color: "white", background: "#03002e",
              padding: "6px 14px", textDecoration: "none", fontWeight: 600,
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  {["Title", "Date", "Actions"].map(h => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 24px",
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
                    <td style={{ padding: "14px 24px" }}>
                      <a
                        href={`/blog/${post.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 14, color: "#03002e", fontWeight: 500,
                          textDecoration: "none", display: "block",
                          maxWidth: 440, overflow: "hidden",
                          textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                        onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                      >
                        {post.title}
                      </a>
                    </td>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: "#888", whiteSpace: "nowrap" }}>
                      {post.date || "—"}
                    </td>
                    <td style={{ padding: "14px 24px" }}>
                      <button
                        onClick={() => handleDelete(post)}
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
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%",
          transform: "translateX(-50%)",
          background: "#03002e", color: "white",
          padding: "12px 24px", fontSize: 13, fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          zIndex: 9999,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
