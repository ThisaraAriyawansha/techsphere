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
  const [confirm,  setConfirm]  = useState(null);

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
    <div style={{ minHeight: "100vh", background: "#F0F0FA" }}>

      {/* Header */}
      <div style={{
        background: "#010057",
        borderBottom: "3px solid #010057",
        padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            color: "white", fontWeight: 700, fontSize: 18,
            letterSpacing: "-0.2px",
          }}>TechSphere</span>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: 9, color: "rgba(255,255,255,0.35)",
            letterSpacing: "2px", textTransform: "uppercase",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            paddingLeft: 12,
          }}>Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(255,255,255,0.45)", fontSize: 11, textDecoration: "none",
            letterSpacing: "0.5px",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
            ← View Site
          </a>
          <button onClick={handleLogout} style={{
            background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.55)", padding: "5px 14px",
            fontFamily: "var(--font-sans)", fontSize: 10, cursor: "pointer",
            letterSpacing: "1px", textTransform: "uppercase", fontWeight: 700,
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 16px" }}>

        {/* Stats */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            background: "white", border: "1px solid #DDE0F5",
            borderTop: "3px solid #010057",
            padding: "20px 28px", display: "inline-block", minWidth: 160,
          }}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 9, color: "#999", letterSpacing: "1.5px",
              textTransform: "uppercase", marginBottom: 8, fontWeight: 700,
            }}>
              Total Posts
            </p>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: 36, fontWeight: 700, color: "#010057",
              letterSpacing: "-1px",
            }}>{posts.length}</p>
          </div>
        </div>

        {/* Posts Table */}
        <div style={{ background: "white", border: "1px solid #DDE0F5", borderTop: "3px solid #010057" }}>
          <div style={{
            padding: "14px 24px",
            borderBottom: "1px solid #EEEEF8",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 10,
          }}>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: 17, fontWeight: 700, color: "#010057",
            }}>All Posts</h2>
            <a href="/new" style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10, color: "white", background: "#010057",
              padding: "7px 16px", textDecoration: "none", fontWeight: 700,
              whiteSpace: "nowrap", letterSpacing: "1px", textTransform: "uppercase",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              + New Post
            </a>
          </div>

          {loading ? (
            <div style={{ padding: "48px 24px", textAlign: "center", fontFamily: "var(--font-sans)", color: "#999", fontSize: 14 }}>
              Loading posts…
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center", fontFamily: "var(--font-sans)", color: "#999", fontSize: 14 }}>
              No posts found.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                <thead>
                  <tr style={{ background: "#F0F0FA" }}>
                    {["Title", "Date", "Actions"].map(h => (
                      <th key={h} style={{
                        textAlign: "left", padding: "10px 24px",
                        fontFamily: "var(--font-sans)",
                        fontSize: 9, fontWeight: 700, color: "#999",
                        letterSpacing: "1.5px", textTransform: "uppercase",
                        borderBottom: "1px solid #DDE0F5",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr key={post.id} style={{ borderBottom: i < posts.length - 1 ? "1px solid #EEEEF8" : "none" }}>
                      <td style={{ padding: "14px 24px" }}>
                        <a
                          href={`/blog/${post.id}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 14, color: "#010057", fontWeight: 600,
                            textDecoration: "none", display: "block",
                            maxWidth: 340, overflow: "hidden",
                            textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#010057"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "#010057"; }}
                        >
                          {post.title}
                        </a>
                      </td>
                      <td style={{ padding: "14px 24px", fontFamily: "var(--font-sans)", fontSize: 12, color: "#999", whiteSpace: "nowrap" }}>
                        {post.date || "—"}
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <button
                          onClick={() => setConfirm(post)}
                          disabled={deleting === post.id}
                          style={{
                            background: deleting === post.id ? "#f5f5f5" : "transparent",
                            border: "1px solid #DDE0F5",
                            color: deleting === post.id ? "#999" : "#010057",
                            padding: "4px 14px",
                            fontFamily: "var(--font-sans)", fontSize: 10,
                            cursor: deleting === post.id ? "not-allowed" : "pointer",
                            fontWeight: 700, letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={e => { if (deleting !== post.id) { e.currentTarget.style.background = "#F0F0FA"; e.currentTarget.style.borderColor = "#010057"; } }}
                          onMouseLeave={e => { if (deleting !== post.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#DDE0F5"; } }}
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

      {/* Confirm Modal */}
      {confirm && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, padding: 24,
        }}
        onClick={() => setConfirm(null)}>
          <div style={{
            background: "#fff",
            border: "1px solid #DDE0F5",
            borderTop: "3px solid #010057",
            padding: "28px 28px 24px",
            maxWidth: 380, width: "100%",
          }}
          onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
              <div style={{
                flexShrink: 0, width: 36, height: 36,
                background: "#fff5f5", border: "1px solid #fcd0d0",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#010057" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: "#010057", marginBottom: 6 }}>
                  Delete post?
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#55557A", lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 600, color: "#010057" }}>&quot;{confirm.title}&quot;</span> will be permanently removed.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={() => setConfirm(null)} style={{
                padding: "8px 18px",
                fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                border: "1px solid #DDE0F5", background: "#fff",
                color: "#55557A", cursor: "pointer",
                letterSpacing: "0.5px", textTransform: "uppercase",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#999"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#DDE0F5"}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={{
                padding: "8px 18px",
                fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                border: "none", background: "#010057",
                color: "#fff", cursor: "pointer",
                letterSpacing: "0.5px", textTransform: "uppercase",
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
          background: "#010057", color: "white",
          padding: "12px 24px",
          fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600,
          letterSpacing: "0.5px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          zIndex: 9999, whiteSpace: "nowrap",
          borderTop: "2px solid #010057",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
