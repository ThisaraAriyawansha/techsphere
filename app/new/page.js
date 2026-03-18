"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, uploadImage } from "../../lib/firebase";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", date: today(), imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Content is required";
    if (!form.date) e.date = "Date is required";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, setUploadProgress);
      }
      const id = await createPost({ ...form, imageUrl });
      router.push(`/blog/${id}`);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
      setUploadProgress(null);
    }
  }

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const next = { ...e }; delete next[key]; return next; });
    if (key === "description") setCharCount(val.length);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh" }}>

      <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Back */}
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-sans)",
          color: "#999", fontSize: 11, fontWeight: 700,
          textDecoration: "none", marginBottom: 32,
          letterSpacing: "1px", textTransform: "uppercase",
          transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#C41E3A"}
        onMouseLeave={e => e.currentTarget.style.color = "#999"}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Articles
        </a>

        {/* Header */}
        <div style={{
          marginBottom: 32,
          borderTop: "3px solid #1A1A1A",
          borderBottom: "1px solid #D4CFC8",
          padding: "16px 0 14px",
        }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10, fontWeight: 700, letterSpacing: "2.5px",
            color: "#C41E3A", textTransform: "uppercase", marginBottom: 10,
          }}>
            Open Publishing · No Account Needed
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: 34, fontWeight: 700,
            color: "#1A1A1A", letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}>
            Share Your Insight
          </h1>
        </div>

        {/* Form card */}
        <div style={{
          background: "#fff",
          border: "1px solid #D4CFC8",
          borderTop: "3px solid #1A1A1A",
          padding: "36px",
        }}>
          <Field label="Post Title" error={errors.title} hint="Give your post a clear, compelling title">
            <input
              type="text"
              placeholder="e.g. Why TypeScript Changed Everything"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              style={inputStyle(!!errors.title)}
              onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
              onBlur={e => e.currentTarget.style.borderColor = errors.title ? "#C41E3A" : "#D4CFC8"}
            />
          </Field>

          <Field label="Date" error={errors.date} hint="When was this written?">
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              style={inputStyle(!!errors.date)}
              onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
              onBlur={e => e.currentTarget.style.borderColor = errors.date ? "#C41E3A" : "#D4CFC8"}
            />
          </Field>

          <Field label="Cover Image" hint="Optional — browse a photo from your device">
            <label style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px",
              border: "1px dashed #D4CFC8",
              background: "#FAF8F5",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#1A1A1A"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#D4CFC8"}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                  stroke="#C41E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: imageFile ? "#1A1A1A" : "#999", fontWeight: 500 }}>
                {imageFile ? imageFile.name : "Click to browse image"}
              </span>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </label>
            {imagePreview && (
              <div style={{
                marginTop: 10, overflow: "hidden",
                border: "1px solid #D4CFC8", height: 160, position: "relative",
              }}>
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {uploadProgress !== null && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#EAE7E0" }}>
                    <div style={{
                      height: "100%", background: "#C41E3A",
                      width: `${uploadProgress}%`, transition: "width 0.3s",
                    }}/>
                  </div>
                )}
              </div>
            )}
          </Field>

          <Field
            label="Content"
            error={errors.description}
            hint="Write your full post content here"
            extra={<span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#999" }}>{charCount} chars</span>}
          >
            <textarea
              placeholder="Share your tech insight, experience, or opinion..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={9}
              style={{
                ...inputStyle(!!errors.description),
                resize: "vertical",
                fontFamily: "var(--font-serif)",
                lineHeight: 1.8, minHeight: 200,
                fontSize: 15,
              }}
              onFocus={e => e.currentTarget.style.borderColor = "#1A1A1A"}
              onBlur={e => e.currentTarget.style.borderColor = errors.description ? "#C41E3A" : "#D4CFC8"}
            />
          </Field>

          {errors.submit && (
            <div style={{
              padding: "12px 16px",
              border: "1px solid #fca5a5",
              background: "#fff5f5",
              fontFamily: "var(--font-sans)",
              color: "#C41E3A", fontSize: 13, marginBottom: 24,
            }}>
              {errors.submit}
            </div>
          )}

          {/* Divider */}
          <div style={{ borderTop: "1px solid #EAE7E0", marginBottom: 20 }}/>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#888" : "#1A1A1A",
              color: "white",
              fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "1.5px", textTransform: "uppercase",
              transition: "opacity 0.15s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? <><Spinner /> Publishing...</> : "Publish Post"}
          </button>

          <p style={{ fontFamily: "var(--font-sans)", textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 14, letterSpacing: "0.3px" }}>
            By publishing, you agree to share this content openly on TechSphere.
          </p>
        </div>
      </div>
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: "100%", padding: "11px 13px",
    border: `1px solid ${hasError ? "#C41E3A" : "#D4CFC8"}`,
    background: "#fff",
    fontFamily: "var(--font-sans)",
    fontSize: 14, color: "#1A1A1A",
    outline: "none",
    transition: "border-color 0.15s",
  };
}

function Field({ label, error, hint, extra, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <label style={{
          fontFamily: "var(--font-sans)",
          fontSize: 10, fontWeight: 700, color: "#1A1A1A",
          letterSpacing: "1px", textTransform: "uppercase",
        }}>
          {label}
        </label>
        {extra}
      </div>
      {children}
      {error ? (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#C41E3A", marginTop: 5 }}>⚠ {error}</p>
      ) : hint ? (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#bbb", marginTop: 5 }}>{hint}</p>
      ) : null}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{
      width: 14, height: 14,
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "white",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
