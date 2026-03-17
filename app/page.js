"use client";
import { useEffect, useState } from "react";
import { getPosts } from "../lib/firebase";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 50%, #1a3a6b 100%)",
        padding: "100px 24px 90px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ambient blobs */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 999,
            background: "rgba(29,78,216,0.20)",
            border: "1px solid rgba(96,165,250,0.30)",
            marginBottom: 28,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#60a5fa",
              boxShadow: "0 0 8px #60a5fa",
              display: "inline-block",
            }}/>
            <span style={{ color: "#93c5fd", fontSize: 13, fontWeight: 500 }}>
              Open Platform · No Login Required
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(40px, 6vw, 68px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
            marginBottom: 20,
          }}>
            Where Tech Ideas
            <br />
            <span style={{
              background: "linear-gradient(90deg, #60a5fa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Come to Life</span>
          </h1>

          <p style={{
            fontSize: 19, color: "rgba(255,255,255,0.60)",
            maxWidth: 500, margin: "0 auto 40px",
            lineHeight: 1.65, fontWeight: 300,
          }}>
            Read, write, and share tech insights with the world.
            No account. No barriers. Pure knowledge.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/new" style={{
              padding: "13px 28px", borderRadius: 999,
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              color: "white", fontSize: 15, fontWeight: 600,
              boxShadow: "0 4px 24px rgba(29,78,216,0.45)",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(29,78,216,0.55)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(29,78,216,0.45)";
            }}>
              Write a Post
            </a>
            <a href="#posts" style={{
              padding: "13px 28px", borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "white", fontSize: 15, fontWeight: 500,
              textDecoration: "none",
            }}>
              Explore Posts ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────── */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #e8eaed",
        padding: "18px 24px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", gap: 40, justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {[
            { label: "Total Posts", value: posts.length },
            { label: "Free to Read", value: "Always" },
            { label: "Login Required", value: "Never" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#0a1628" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Post List ────────────────────────────────── */}
      <section id="posts" style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "64px 24px",
      }}>
        {/* Section header + search */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: 16, marginBottom: 40,
        }}>
          <div>
            <h2 style={{
              fontSize: 28, fontWeight: 700,
              color: "#0a1628", letterSpacing: "-0.5px",
            }}>Latest Posts</h2>
            <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>
              {posts.length} article{posts.length !== 1 ? "s" : ""} published
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Posts grid */}
        {loading ? (
          <LoadingGrid />
        ) : filtered.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}>
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ── Components ─────────────────────────────────────────────── */

function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <svg style={{
        position: "absolute", left: 12, top: "50%",
        transform: "translateY(-50%)",
        color: "#9ca3af", pointerEvents: "none",
      }} width="16" height="16" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        placeholder="Search posts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "9px 16px 9px 38px",
          borderRadius: 999,
          border: "1.5px solid #e8eaed",
          background: "white",
          fontSize: 14, color: "#0a1628",
          width: 220,
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = "#1d4ed8";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(29,78,216,0.12)";
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = "#e8eaed";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function PostCard({ post, index }) {
  const [hovered, setHovered] = useState(false);

  // Format date
  let displayDate = post.date || "—";
  try {
    displayDate = new Date(post.date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch {}

  return (
    <a
      href={`/blog/${post.id}`}
      style={{
        display: "block",
        background: hovered
          ? "white"
          : "white",
        border: hovered
          ? "1.5px solid rgba(29,78,216,0.30)"
          : "1.5px solid #e8eaed",
        borderRadius: 18,
        padding: "28px 28px 24px",
        textDecoration: "none",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 60px rgba(10,22,40,0.13), 0 4px 16px rgba(29,78,216,0.10)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        animationDelay: `${index * 0.06}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div style={{
        height: 3, borderRadius: 2,
        background: hovered
          ? "linear-gradient(90deg, #1d4ed8, #60a5fa)"
          : "linear-gradient(90deg, #e8eaed, #e8eaed)",
        marginBottom: 20,
        transition: "background 0.3s ease",
      }}/>

      {/* Date */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 10px", borderRadius: 999,
        background: hovered ? "rgba(29,78,216,0.08)" : "#f5f5f7",
        marginBottom: 12,
        transition: "background 0.25s",
      }}>
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="3" stroke="#9ca3af" strokeWidth="2"/>
          <path d="M16 2v4M8 2v4M3 10h18" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{displayDate}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 18, fontWeight: 650,
        color: "#0a1628", lineHeight: 1.35,
        letterSpacing: "-0.3px", marginBottom: 10,
      }}>{post.title}</h3>

      {/* Description */}
      <p style={{
        fontSize: 14, color: "#6b7280",
        lineHeight: 1.65,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        marginBottom: 20,
      }}>{post.description}</p>

      {/* Read more */}
      <div style={{
        display: "flex", alignItems: "center", gap: 4,
        color: hovered ? "#1d4ed8" : "#9ca3af",
        fontSize: 13, fontWeight: 600,
        transition: "color 0.2s",
      }}>
        Read article
        <svg
          width="14" height="14" fill="none" viewBox="0 0 24 24"
          style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.2s" }}
        >
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </a>
  );
}

function LoadingGrid() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 24,
    }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{
          background: "white", borderRadius: 18,
          padding: 28, border: "1.5px solid #e8eaed",
        }}>
          {[60, 140, 16, 80, 80, 50].map((w, j) => (
            <div key={j} style={{
              height: j === 0 ? 3 : j === 2 ? 20 : 14,
              width: `${w}%`, borderRadius: 6,
              background: "linear-gradient(90deg, #f5f5f7 25%, #e8eaed 50%, #f5f5f7 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
              marginBottom: j < 5 ? 12 : 0,
            }}/>
          ))}
          <style>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search }) {
  return (
    <div style={{
      textAlign: "center", padding: "80px 24px",
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        background: "linear-gradient(135deg, #f0f2f5, #e8eaed)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 20px",
      }}>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path d="M9 12h6M9 16h4M6 3h8l4 4v14a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"
            stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 650, color: "#0a1628", marginBottom: 8 }}>
        {search ? `No results for "${search}"` : "No posts yet"}
      </h3>
      <p style={{ color: "#9ca3af", fontSize: 15, marginBottom: 24 }}>
        {search ? "Try a different search term." : "Be the first to share a tech insight."}
      </p>
      {!search && (
        <a href="/new" style={{
          display: "inline-block", padding: "11px 24px", borderRadius: 999,
          background: "linear-gradient(135deg, #0d1f3c, #1d4ed8)",
          color: "white", fontWeight: 600, fontSize: 14,
          textDecoration: "none",
        }}>Write First Post</a>
      )}
    </div>
  );
}
