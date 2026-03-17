import "./globals.css";
import Navbar from "./Navbar";

export const metadata = {
  title: "TechSphere — Open Tech Blog",
  description: "An open platform for tech insights. No login required. Share freely.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 64px - 180px)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: "#0a1628",
      color: "rgba(255,255,255,0.5)",
      padding: "48px 24px",
      marginTop: 80,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 16, textAlign: "center",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg, #1a3a6b 0%, #1d4ed8 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
              <path d="M12 3C12 3 8 8 8 12s4 9 4 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 3c0 0 4 5 4 9s-4 9-4 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 12h18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ color: "white", fontWeight: 600, fontSize: 16 }}>TechSphere</span>
        </div>
        <p style={{ fontSize: 13, maxWidth: 400, lineHeight: 1.7 }}>
          An open platform for the curious mind. No login required.
          Write freely. Read freely. Share freely.
        </p>
        <div style={{
          width: 48, height: 1,
          background: "rgba(255,255,255,0.15)",
        }}/>
        <p style={{ fontSize: 12 }}>
          © {new Date().getFullYear()} TechSphere. Open for everyone.
        </p>
      </div>
    </footer>
  );
}
