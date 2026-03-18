export const metadata = {
  title: "Privacy Policy — TechSphere",
  description: "TechSphere privacy policy — how we handle your data.",
};

const lastUpdated = "March 18, 2026";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `When you publish a post on TechSphere, we store the content you submit — including the title, body text, date, and any cover image you upload. We do not require an email address, username, or password to create a post.\n\nIf you contact us via email, we may retain your email address and the content of your message to respond to your inquiry.\n\nOur platform uses Firebase (Google) for database services and ImgBB for image hosting. These services may log standard server information such as IP addresses and request timestamps as part of their normal operations.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `The information you submit when creating a post is used solely to display that post on TechSphere. We do not use your content to train AI models, target advertisements, or share it with third parties beyond the hosting services required to operate the platform.\n\nWe do not use your information for marketing purposes unless you have explicitly subscribed to our newsletter.`,
  },
  {
    title: "3. Cookies & Tracking",
    content: `TechSphere uses minimal tracking. We may use sessionStorage (a browser-based mechanism) for admin functionality — this is not a cookie and is cleared when you close your browser.\n\nWe do not use advertising cookies, cross-site tracking, or third-party analytics that profile individual users.`,
  },
  {
    title: "4. Data Storage & Security",
    content: `All post data is stored in Firebase Firestore, hosted on Google's infrastructure with industry-standard security measures. Images are hosted on ImgBB's servers.\n\nWhile we take reasonable precautions, no internet transmission is 100% secure. Please do not submit sensitive personal information in your posts.`,
  },
  {
    title: "5. Content You Post",
    content: `Posts you submit to TechSphere are publicly visible to anyone on the internet. Do not submit personal information, private data, or any content you do not wish to be public.\n\nTechSphere reserves the right to remove content that violates our Terms of Service, is harmful, or is otherwise inappropriate.`,
  },
  {
    title: "6. Third-Party Services",
    content: `We use the following third-party services to operate TechSphere:\n\n• Firebase (Google): Database storage for posts\n• ImgBB: Image hosting for post cover photos\n• Google Fonts: Typography (Poppins font family)\n\nEach of these services has its own privacy policy. We encourage you to review them independently.`,
  },
  {
    title: "7. Newsletter",
    content: `If you subscribe to the TechSphere newsletter, we collect your email address for the sole purpose of sending you our newsletter. You can unsubscribe at any time via the link in any newsletter email.\n\nWe do not share your email address with any third parties.`,
  },
  {
    title: "8. Your Rights",
    content: `You have the right to request deletion of a post you have published. If you have subscribed to our newsletter, you may unsubscribe at any time.\n\nDepending on your jurisdiction, you may have additional rights under applicable privacy laws (such as GDPR or CCPA).`,
  },
  {
    title: "9. Children's Privacy",
    content: `TechSphere is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has submitted personal information to our platform, please contact us.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of TechSphere after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    content: `If you have questions about this Privacy Policy or how your information is handled, please reach out through the TechSphere platform or the contact information on our About page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ background: "#f5f5f7", minHeight: "calc(100vh - 58px)" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 100px" }}>

        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#010048", textTransform: "uppercase", marginBottom: 14 }}>Legal</p>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.8px", marginBottom: 10 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 13, color: "#aeaeb2" }}>Last updated: {lastUpdated}</p>
        </div>

        <div style={{ background: "rgba(1,0,72,0.04)", border: "1px solid rgba(1,0,72,0.12)", padding: "20px 24px", marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75 }}>
            <strong>TL;DR:</strong> TechSphere is a minimal open platform. We don't require you to create an account. We don't sell your data. We use Firebase for storing posts and don't collect personal information beyond what's necessary.
          </p>
        </div>

        <div style={{ border: "1px solid #e2e2e7", background: "#e2e2e7", display: "flex", flexDirection: "column", gap: 1 }}>
          {SECTIONS.map(({ title, content }) => (
            <div key={title} style={{ background: "#fff", padding: "26px 28px" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1d1d1f", marginBottom: 12 }}>{title}</h2>
              {content.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 10, whiteSpace: "pre-line" }}>{para}</p>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: "20px 24px", background: "#fff", border: "1px solid #e2e2e7", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 13, color: "#6e6e73" }}>
            Questions? Visit our{" "}
            <a href="/about" className="h-dark" style={{ fontWeight: 600 }}>About page</a>.
          </p>
          <a href="/terms" className="h-dark" style={{ fontSize: 13, fontWeight: 600 }}>Terms of Service →</a>
        </div>
      </div>
    </div>
  );
}
