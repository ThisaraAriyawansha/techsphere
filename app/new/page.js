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
    <div style={{ background: "#F0F0FA", minHeight: "100vh" }}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Back */}
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-sans)",
          color: "#8888A8", fontSize: 11, fontWeight: 700,
          textDecoration: "none", marginBottom: 32,
          letterSpacing: "1px", textTransform: "uppercase",
          transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#010057"}
        onMouseLeave={e => e.currentTarget.style.color = "#8888A8"}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Articles
        </a>

        {/* Header */}
        <div style={{
          marginBottom: 32,
          borderTop: "3px solid #010057",
          borderBottom: "1px solid #DDE0F5",
          padding: "16px 0 14px",
        }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10, fontWeight: 700, letterSpacing: "2.5px",
            color: "#010057", textTransform: "uppercase", marginBottom: 10,
          }}>
            Open Publishing · No Account Needed
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: 34, fontWeight: 700,
            color: "#010057", letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}>
            Share Your Insight
          </h1>
        </div>

        {/* Form card */}
        <div style={{
          background: "#fff",
          border: "1px solid #DDE0F5",
          borderTop: "3px solid #010057",
          padding: "36px",
        }}>
          <Field label="Post Title" error={errors.title} hint="Give your post a clear, compelling title">
            <input
              type="text"
              placeholder="e.g. Why TypeScript Changed Everything"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              style={inputStyle(!!errors.title)}
              onFocus={e => e.currentTarget.style.borderColor = "#010057"}
              onBlur={e => e.currentTarget.style.borderColor = errors.title ? "#DC2626" : "#DDE0F5"}
            />
          </Field>

          <Field label="Date" error={errors.date} hint="When was this written?">
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              style={inputStyle(!!errors.date)}
              onFocus={e => e.currentTarget.style.borderColor = "#010057"}
              onBlur={e => e.currentTarget.style.borderColor = errors.date ? "#DC2626" : "#DDE0F5"}
            />
          </Field>

          <Field label="Cover Image" hint="Optional — browse a photo from your device">
            <label style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px",
              border: "1px dashed #DDE0F5",
              background: "#F0F0FA",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#010057"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#DDE0F5"}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                  stroke="#010057" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: imageFile ? "#010057" : "#8888A8", fontWeight: 500 }}>
                {imageFile ? imageFile.name : "Click to browse image"}
              </span>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </label>
            {imagePreview && (
              <div style={{ marginTop: 10, overflow: "hidden", border: "1px solid #DDE0F5", height: 160, position: "relative" }}>
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {uploadProgress !== null && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#EEEEF8" }}>
                    <div style={{ height: "100%", background: "#010057", width: `${uploadProgress}%`, transition: "width 0.3s" }}/>
                  </div>
                )}
              </div>
            )}
          </Field>

          <Field
            label="Content"
            error={errors.description}
            hint="Write your full post content here"
            extra={<span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#8888A8" }}>{charCount} chars</span>}
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
              onFocus={e => e.currentTarget.style.borderColor = "#010057"}
              onBlur={e => e.currentTarget.style.borderColor = errors.description ? "#DC2626" : "#DDE0F5"}
            />
          </Field>

          {errors.submit && (
            <div style={{
              padding: "12px 16px",
              border: "1px solid #FECACA",
              background: "#FEF2F2",
              fontFamily: "var(--font-sans)",
              color: "#DC2626", fontSize: 13, marginBottom: 24,
            }}>
              {errors.submit}
            </div>
          )}

          <div style={{ borderTop: "1px solid #EEEEF8", marginBottom: 20 }}/>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#8888A8" : "#010057",
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

          <p style={{ fontFamily: "var(--font-sans)", textAlign: "center", fontSize: 11, color: "#8888A8", marginTop: 14, letterSpacing: "0.3px" }}>
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
    border: `1px solid ${hasError ? "#DC2626" : "#DDE0F5"}`,
    background: "#fff",
    fontFamily: "var(--font-sans)",
    fontSize: 14, color: "#010057",
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
          fontSize: 10, fontWeight: 700, color: "#010057",
          letterSpacing: "1px", textTransform: "uppercase",
        }}>
          {label}
        </label>
        {extra}
      </div>
      {children}
      {error ? (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#DC2626", marginTop: 5 }}>⚠ {error}</p>
      ) : hint ? (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#8888A8", marginTop: 5 }}>{hint}</p>
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
    }}/>
  );
}
