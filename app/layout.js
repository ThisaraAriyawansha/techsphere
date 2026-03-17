import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

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

