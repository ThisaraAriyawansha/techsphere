"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "../../lib/firebase";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", date: today() });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    else if (form.title.trim().length < 5) e.title = "Title must be at least 5 characters";
    if (!form.description.trim()) e.description = "Description is required";
    else if (form.description.trim().length < 20) e.description = "Description must be at least 20 characters";
    if (!form.date) e.date = "Date is required";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const id = await createPost(form);
      router.push(`/blog/${id}`);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const next = { ...e }; delete next[key]; return next; });
    if (key === "description") setCharCount(val.length);
  }

  return (
    <div style={{
      maxWidth: 720, margin: "0 auto",
      padding: "56px 24px 80px",
    }}>
      {/* Back link */}
      <a href="/" style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        color: "#6b7280", fontSize: 14, fontWeight: 500,
        textDecoration: "none", marginBottom: 36,
        transition: "color 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.color = "#1d4ed8"}
      onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to TechSphere
      </a>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "4px 12px", borderRadius: 999,
          background: "rgba(29,78,216,0.08)",
          border: "1px solid rgba(29,78,216,0.18)",
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 600 }}>
            ✦ Open Publishing · No Account Needed
          </span>
        </div>
        <h1 style={{
          fontSize: 36, fontWeight: 750,
          color: "#0a1628", letterSpacing: "-0.8px",
          lineHeight: 1.1, marginBottom: 10,
        }}>
          Share Your Insight
        </h1>
        <p style={{ color: "#6b7280", fontSize: 16 }}>
          Your post will be live instantly for everyone to read.
        </p>
      </div>

      {/* Form card */}
      <div style={{
        background: "white",
        border: "1.5px solid #e8eaed",
        borderRadius: 24,
        padding: "40px 40px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        {/* Title */}
        <Field
          label="Post Title"
          error={errors.title}
          hint="Give your post a clear, compelling title"
        >
          <input
            type="text"
            placeholder="e.g. Why TypeScript Changed Everything"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            style={inputStyle(!!errors.title)}
          />
        </Field>

        {/* Date */}
        <Field
          label="Date"
          error={errors.date}
          hint="When was this written?"
        >
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            style={inputStyle(!!errors.date)}
          />
        </Field>

        {/* Description */}
        <Field
          label="Description"
          error={errors.description}
          hint="Write your full post content here"
          extra={
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              {charCount} chars
            </span>
          }
        >
          <textarea
            placeholder="Share your tech insight, experience, or opinion..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={8}
            style={{
              ...inputStyle(!!errors.description),
              resize: "vertical",
              lineHeight: 1.7,
              minHeight: 180,
            }}
          />
        </Field>

        {/* Submit error */}
        {errors.submit && (
          <div style={{
            padding: "12px 16px", borderRadius: 10,
            background: "rgba(239,68,68,0.07)",
            border: "1px solid rgba(239,68,68,0.20)",
            color: "#dc2626", fontSize: 14, marginBottom: 24,
          }}>
            {errors.submit}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", padding: "14px",
            borderRadius: 12,
            background: loading
              ? "#9ca3af"
              : "linear-gradient(135deg, #0d1f3c 0%, #1d4ed8 100%)",
            color: "white", fontSize: 16, fontWeight: 650,
            border: "none", cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 4px 20px rgba(29,78,216,0.35)",
            transition: "all 0.2s ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={e => {
            if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {loading ? (
            <>
              <Spinner />
              Publishing...
            </>
          ) : (
            <>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Publish Post
            </>
          )}
        </button>

        <p style={{
          textAlign: "center", fontSize: 12,
          color: "#9ca3af", marginTop: 16,
        }}>
          By publishing, you agree to share this content openly on TechSphere.
        </p>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

function inputStyle(hasError) {
  return {
    width: "100%", padding: "12px 14px",
    borderRadius: 10,
    border: `1.5px solid ${hasError ? "#ef4444" : "#e8eaed"}`,
    background: hasError ? "rgba(239,68,68,0.02)" : "#fafafa",
    fontSize: 15, color: "#0a1628",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  };
}

function Field({ label, error, hint, extra, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 6,
      }}>
        <label style={{
          fontSize: 13, fontWeight: 650,
          color: "#374151", letterSpacing: "0.1px",
        }}>{label}</label>
        {extra}
      </div>
      {children}
      {error ? (
        <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5, display: "flex", gap: 4 }}>
          <span>⚠</span> {error}
        </p>
      ) : hint ? (
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 5 }}>{hint}</p>
      ) : null}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{
      width: 16, height: 16, borderRadius: "50%",
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "white",
      animation: "spin 0.7s linear infinite",
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
