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
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{
        background: "#010048",
        padding: "90px 24px 80px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "3px",
            color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
            marginBottom: 20,
          }}>
            Open Platform · No Login Required
          </p>
          <h1 style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            marginBottom: 20,
          }}>
            Where Tech Ideas<br />Come to Life
          </h1>
          <p style={{
            fontSize: 16, color: "rgba(255,255,255,0.5)",
            maxWidth: 460, lineHeight: 1.7, fontWeight: 300,
            marginBottom: 36,
          }}>
            Read, write, and share tech insights with the world.
            No account. No barriers. Pure knowledge.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/new" style={{
              padding: "12px 28px",
              background: "#ffffff",
              color: "#010048",
              fontSize: 13, fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.3px",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Write a Post
            </a>
            <a href="#posts" style={{
              padding: "12px 28px",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.75)",
              fontSize: 13, fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
            }}>
              Explore Posts
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────── */}
      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid #e8e8e8",
        padding: "18px 24px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", gap: 48, justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {[
            { label: "Total Posts", value: posts.length },
            { label: "Free to Read", value: "Always" },
            { label: "Login Required", value: "Never" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#010048" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500, marginTop: 2, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Post List ─────────────────────────────────────── */}
      <section id="posts" style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "60px 24px",
      }}>
        {/* Header + search */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: 16, marginBottom: 40,
          borderBottom: "2px solid #010048",
          paddingBottom: 16,
        }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#010048", letterSpacing: "-0.3px" }}>
              Latest Posts
            </h2>
            <p style={{ color: "#aaa", fontSize: 13, marginTop: 4 }}>
              {posts.length} article{posts.length !== 1 ? "s" : ""} published
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {loading ? (
          <LoadingGrid />
        ) : filtered.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
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

/* ── Components ───────────────────────────────────────────────── */

function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <svg style={{
        position: "absolute", left: 12, top: "50%",
        transform: "translateY(-50%)",
        color: "#aaa", pointerEvents: "none",
      }} width="14" height="14" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        placeholder="Search posts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "9px 14px 9px 34px",
          border: "1px solid #e8e8e8",
          background: "#fff",
          fontSize: 13, color: "#010048",
          width: 220, outline: "none",
          transition: "border-color 0.15s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#010048"}
        onBlur={e => e.currentTarget.style.borderColor = "#e8e8e8"}
      />
    </div>
  );
}

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false);

  let displayDate = "—";
  try {
    displayDate = new Date(post.date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch {}

  return (
    <a
      href={`/blog/${post.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: hovered ? "#f9f9fb" : "#ffffff",
        border: "1px solid #e8e8e8",
        textDecoration: "none",
        transition: "background 0.15s",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover image */}
      {post.imageUrl ? (
        <div style={{ height: 200, overflow: "hidden", background: "#f5f5f5" }}>
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
        </div>
      ) : (
        <div style={{
          height: 4,
          background: hovered ? "#010048" : "#e8e8e8",
          transition: "background 0.2s",
        }}/>
      )}

      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Date */}
        <span style={{
          fontSize: 11, color: "#aaa", fontWeight: 500,
          letterSpacing: "0.5px", textTransform: "uppercase",
          marginBottom: 10,
        }}>{displayDate}</span>

        {/* Title */}
        <h3 style={{
          fontSize: 16, fontWeight: 600,
          color: "#010048", lineHeight: 1.4,
          marginBottom: 10, flex: 1,
        }}>{post.title}</h3>

        {/* Description */}
        <p style={{
          fontSize: 13, color: "#777",
          lineHeight: 1.65,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: 20,
        }}>{post.description}</p>

        {/* Read more */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          color: hovered ? "#010048" : "#aaa",
          fontSize: 12, fontWeight: 600,
          letterSpacing: "0.5px", textTransform: "uppercase",
          transition: "color 0.15s",
        }}>
          Read article
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s" }}>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
}

function LoadingGrid() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 20,
    }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{
          background: "#fff", padding: 24,
          border: "1px solid #e8e8e8",
        }}>
          {[50, 90, 70, 80, 40].map((w, j) => (
            <div key={j} style={{
              height: j === 1 ? 16 : 12,
              width: `${w}%`,
              background: "linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
              marginBottom: 10,
            }}/>
          ))}
          <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid #e8e8e8" }}>
      <p style={{ fontSize: 13, color: "#aaa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>
        {search ? `No results for "${search}"` : "No posts yet"}
      </p>
      <p style={{ color: "#bbb", fontSize: 13, marginBottom: 24 }}>
        {search ? "Try a different search term." : "Be the first to share a tech insight."}
      </p>
      {!search && (
        <a href="/new" style={{
          display: "inline-block", padding: "10px 24px",
          background: "#010048", color: "white",
          fontWeight: 600, fontSize: 13, textDecoration: "none",
          letterSpacing: "0.3px",
        }}>Write First Post</a>
      )}
    </div>
  );
}
