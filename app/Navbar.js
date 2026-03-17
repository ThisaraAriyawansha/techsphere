"use client";
import { useState } from "react";

export default function Navbar() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#ffffff",
      borderBottom: "1px solid #e8e8e8",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo/logo.png" alt="TechSphere" style={{ width: 32, height: 32, objectFit: "contain" }} />
          <span style={{
            fontSize: 17, fontWeight: 700,
            color: "#010048", letterSpacing: "0.2px",
          }}>TechSphere</span>
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <NavLink href="/">Explore</NavLink>
          <a href="/new" style={{
            padding: "8px 18px",
            background: "#010048",
            color: "#ffffff",
            fontSize: 13, fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.3px",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Write Post
          </a>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} style={{
      padding: "8px 14px",
      fontSize: 13, fontWeight: 500,
      color: "#555555",
      textDecoration: "none",
      transition: "color 0.15s",
    }}
    onMouseEnter={e => e.currentTarget.style.color = "#010048"}
    onMouseLeave={e => e.currentTarget.style.color = "#555555"}>
      {children}
    </a>
  );
}
