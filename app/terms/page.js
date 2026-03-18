export const metadata = {
  title: "Terms of Service — TechSphere",
  description: "TechSphere terms of service — the rules for using our platform.",
};

const lastUpdated = "March 18, 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using TechSphere (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.\n\nWe reserve the right to modify these terms at any time. Your continued use of the Platform after changes are posted constitutes acceptance of the updated terms.`,
  },
  {
    title: "2. Use of the Platform",
    content: `TechSphere provides a free, open publishing platform for technology-related content. You may use the Platform to read and publish articles without creating an account.\n\nYou agree not to use the Platform to:\n• Post illegal, harmful, or abusive content\n• Spam or post repetitive, low-quality content\n• Impersonate others or misrepresent your identity\n• Violate intellectual property rights of others\n• Attempt to gain unauthorized access to any part of the Platform`,
  },
  {
    title: "3. Content You Post",
    content: `By posting content on TechSphere, you represent that:\n• You own or have the right to share the content\n• The content does not violate any applicable laws\n• The content does not infringe on any third-party rights\n\nYou retain ownership of your content. By posting, you grant TechSphere a worldwide, non-exclusive, royalty-free license to display and distribute your content on the Platform.\n\nAll posts are publicly visible. Do not post private or sensitive information.`,
  },
  {
    title: "4. Content We Remove",
    content: `TechSphere reserves the right to remove content at any time, without notice, for any reason, including but not limited to:\n• Content that violates these Terms\n• Spam or misleading content\n• Content that is illegal or harmful\n• Content that violates third-party rights\n\nWe are not obligated to review all content before it is posted.`,
  },
  {
    title: "5. Intellectual Property",
    content: `The TechSphere name, logo, and platform design are the intellectual property of TechSphere. You may not use them without prior written permission.\n\nContent posted by users belongs to its respective authors. TechSphere does not claim ownership of user-submitted content beyond the license described in Section 3.`,
  },
  {
    title: "6. Disclaimer of Warranties",
    content: `TechSphere is provided "as is" without warranties of any kind, express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free of harmful components.\n\nThe content on TechSphere is user-generated and we do not verify its accuracy. TechSphere is not responsible for any errors or omissions in user content.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the fullest extent permitted by law, TechSphere and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.\n\nOur total liability to you for any claims shall not exceed the amount you have paid us in the past twelve months.`,
  },
  {
    title: "8. Governing Law",
    content: `These Terms shall be governed by the laws of the jurisdiction in which TechSphere operates, without regard to its conflict of law provisions.\n\nAny disputes arising from these Terms shall be resolved through good-faith negotiation first, followed by binding arbitration if necessary.`,
  },
  {
    title: "9. Contact",
    content: `If you have questions about these Terms of Service, please contact us through the TechSphere platform or visit our About page for contact information.`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "#f5f5f7", minHeight: "calc(100vh - 58px)" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 100px" }}>

        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#010048", textTransform: "uppercase", marginBottom: 14 }}>Legal</p>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.8px", marginBottom: 10 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 13, color: "#aeaeb2" }}>Last updated: {lastUpdated}</p>
        </div>

        <div style={{ background: "rgba(1,0,72,0.04)", border: "1px solid rgba(1,0,72,0.12)", padding: "20px 24px", marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75 }}>
            <strong>TL;DR:</strong> TechSphere is an open, free platform for sharing tech knowledge. Use it responsibly. Don't post illegal content, spam, or harmful content. Your posts are public. We can remove content that violates these terms.
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
          <a href="/privacy" className="h-dark" style={{ fontSize: 13, fontWeight: 600 }}>Privacy Policy →</a>
        </div>
      </div>
    </div>
  );
}
