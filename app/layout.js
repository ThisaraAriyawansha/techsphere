import "./globals.css";
import Navbar from "./Navbar";

export const metadata = {
  title: "TechSphere — Open Tech Blog",
  description: "An open platform for tech insights. No login required. Share freely.",
  icons: { icon: "/logo/logo.png" },
  openGraph: {
    title: "TechSphere — Open Tech Blog",
    description: "An open platform for tech insights. No login required. Share freely.",
    images: [{ url: "/logo/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 64px - 160px)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #e8e8e8",
      background: "#03002e",
      color: "rgba(255,255,255,0.5)",
      padding: "48px 24px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 16, textAlign: "center",
      }}>
        <img src="/logo/logo.png" alt="TechSphere" style={{ width: 40, height: 40, objectFit: "contain" }} />
        <span style={{ color: "white", fontWeight: 600, fontSize: 16, letterSpacing: "0.5px" }}>
          TechSphere
        </span>
        <p style={{ fontSize: 13, maxWidth: 400, lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>
          An open platform for the curious mind. No login required.
          Write freely. Read freely. Share freely.
        </p>
        <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.15)" }} />
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          © {new Date().getFullYear()} TechSphere. Open for everyone.
        </p>
      </div>
    </footer>
  );
}
