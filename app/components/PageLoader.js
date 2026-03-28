"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Lottie from "lottie-react";
import gamingAnimation from "../../public/img/Circle Venn.json";

export default function PageLoader() {
  // Start fully visible — covers the page immediately on first render
  const [phase, setPhase] = useState("visible"); // "visible" | "out" | "done"
  const pathname = usePathname();
  const timerRef = useRef([]);

  function clearTimers() {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }

  function runLoader() {
    clearTimers();
    setPhase("visible");
    timerRef.current.push(setTimeout(() => setPhase("out"),  1800));
    timerRef.current.push(setTimeout(() => setPhase("done"), 2300));
  }

  // Initial load
  useEffect(() => {
    runLoader();
    return clearTimers;
  }, []);

  // Route changes
  useEffect(() => {
    runLoader();
  }, [pathname]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.5s ease" : "none",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      <div style={{ width: 180, height: 180 }}>
        <Lottie
          animationData={gamingAnimation}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        fontWeight: 600,
        color: "#C8C8D0",
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginTop: 8,
      }}>
        Loading<LoadingDots />
      </p>
    </div>
  );
}

function LoadingDots() {
  const [dots, setDots] = useState("...");
  useEffect(() => {
    const id = setInterval(() => {
      setDots(d => d.length >= 3 ? "." : d + ".");
    }, 380);
    return () => clearInterval(id);
  }, []);
  return <span style={{ display: "inline-block", width: 20 }}>{dots}</span>;
}
