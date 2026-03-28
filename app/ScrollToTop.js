"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 300);
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scroll-to-top"
      style={{
        position: "fixed",
        right: 16,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    >
      {/* Rotated label */}
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#010057",
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
        opacity: 0.55,
      }}>
        Scroll to top
      </span>

      {/* Progress track + indicator */}
      <div style={{
        width: 2,
        height: 60,
        background: "#DDE0F5",
        position: "relative",
        overflow: "hidden",
        borderRadius: 1,
      }}>
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${progress}%`,
          background: "#010057",
          transition: "height 0.1s linear",
          borderRadius: 1,
        }}/>
      </div>
    </button>
  );
}
