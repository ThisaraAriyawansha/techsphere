"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getPosts } from "../lib/firebase";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./components/ScrollReveal";
import Tilt3D from "./components/Tilt3D";
import CountUp from "./components/CountUp";

/* ── Data ──────────────────────────────────── */
const TOPICS = [
  { label: "All",          key: null },
  { label: "AI & ML",      key: "ai" },
  { label: "Web Dev",      key: "web" },
  { label: "Mobile",       key: "mobile" },
  { label: "Cloud",        key: "cloud" },
  { label: "Security",     key: "security" },
  { label: "Open Source",  key: "open source" },
  { label: "Data Science", key: "data" },
  { label: "DevOps",       key: "devops" },
  { label: "Programming",  key: "programming" },
];

const CATEGORIES = [
  { key: "ai",          label: "AI & Machine Learning", icon: "🤖", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80" },
  { key: "web",         label: "Web Development",       icon: "🌐", image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80" },
  { key: "cloud",       label: "Cloud & DevOps",        icon: "☁️", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80" },
  { key: "security",    label: "Cybersecurity",         icon: "🔐", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80" },
  { key: "mobile",      label: "Mobile Dev",            icon: "📱", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" },
  { key: "data",        label: "Data Science",          icon: "📊", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
  { key: "programming", label: "Programming",           icon: "💻", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80" },
  { key: "ux",          label: "UI & UX Design",        icon: "🎨", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80" },
];

const FEATURES = [
  { icon: "📚", title: "Read anything, instantly.", desc: "Thousands of articles spanning AI, cloud, security, web dev, and more. No paywalls, no subscriptions. Just open knowledge.", cta: "Browse Articles", href: "/blog" },
  { icon: "✍️", title: "Write without an account.", desc: "Share your expertise, tutorials, and insights with the global tech community. Zero friction from idea to published post.", cta: "Start Writing", href: "/new" },
  { icon: "🌐", title: "Explore every corner of tech.", desc: "12 curated topic areas from AI to hardware. Dive deep into your specialty or discover something completely new.", cta: "See All Topics", href: "/topics" },
];

/* ── Page ──────────────────────────────────── */
export default function HomePage() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [activeTab, setActiveTab] = useState(null);
  const heroRef   = useRef(null);
  const { scrollY } = useScroll();
  const heroY     = useTransform(scrollY, [0, 500], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.07]);

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
      && (!activeTab || p.title?.toLowerCase().includes(activeTab) || p.description?.toLowerCase().includes(activeTab));
  });

  return (
    <div style={{ background: "#fff", color: "#1D1D1F" }}>

      {/* ══ 1. HERO ════════════════════════════════ */}
      <div style={{ padding: "0 16px", background: "#fff" }}>
        <section ref={heroRef} style={{
          position: "relative", overflow: "hidden", borderRadius: 20,
          height: "82vh", minHeight: 480, maxHeight: 900,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(0,0,0,0.08)",
        }}>
          <motion.img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=85"
            alt="" aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "110%", top: "-5%", objectFit: "cover", y: heroY, scale: heroScale }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(1,0,72,0.72) 0%, rgba(0,0,20,0.5) 60%, rgba(1,0,60,0.62) 100%)" }} />
          {/* Subtle particles */}
          {[
            { w:5, h:5, t:"22%", l:"10%", d:"0s"   },
            { w:3, h:3, t:"68%", l:"7%",  d:"1.5s"  },
            { w:6, h:6, t:"32%", r:"9%",  d:"0.6s"  },
            { w:4, h:4, t:"72%", r:"14%", d:"2.2s"  },
            { w:5, h:5, t:"48%", r:"28%", d:"1.1s"  },
          ].map((p, i) => (
            <div key={i} className={`particle particle-${(i%3)+1}`} style={{ width:p.w, height:p.h, background:"rgba(255,255,255,0.45)", top:p.t, left:p.l, right:p.r, borderRadius:"50%", position:"absolute", animationDelay:p.d }} />
          ))}
          {/* Thin rings */}
          <div style={{ position:"absolute", width:400, height:400, border:"1px solid rgba(255,255,255,0.07)", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"heroOrbit1 28s linear infinite" }} />
          <div style={{ position:"absolute", width:620, height:620, border:"1px solid rgba(255,255,255,0.04)", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"heroOrbit2 42s linear infinite" }} />

          <div style={{ position:"relative", textAlign:"center", padding:"0 24px", maxWidth:720 }}>
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.2 }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:100, padding:"6px 16px", backdropFilter:"blur(10px)", fontFamily:"var(--font-sans)", fontSize:12, fontWeight:500, color:"rgba(255,255,255,0.9)", letterSpacing:"0.3px", marginBottom:24, WebkitBackdropFilter:"blur(10px)" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#34D399", display:"inline-block" }}/>
                Open Tech Publication · Always Free
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.38, ease:[0.16,1,0.3,1] }}
              style={{ fontFamily:"var(--font-display)", fontSize:"clamp(42px,6.5vw,82px)", fontWeight:800, color:"#fff", lineHeight:1.04, letterSpacing:"-2.5px", marginBottom:32 }}>
              Where Tech<br/><em style={{ fontStyle:"italic" }}>Minds</em> Meet
            </motion.h1>
            <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.7 }}
              style={{ display:"inline-flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
              <a href="#articles" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"13px 26px", background:"#fff", color:"#1D1D1F", fontFamily:"var(--font-sans)", fontWeight:600, fontSize:14, textDecoration:"none", borderRadius:100, transition:"opacity 0.18s, transform 0.18s, box-shadow 0.18s", boxShadow:"0 4px 20px rgba(0,0,0,0.18)" }}
                onMouseEnter={e=>{ e.currentTarget.style.opacity="0.92"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
                Explore Articles
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/new" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"13px 26px", background:"rgba(255,255,255,0.1)", color:"#fff", border:"1px solid rgba(255,255,255,0.28)", fontFamily:"var(--font-sans)", fontWeight:500, fontSize:14, textDecoration:"none", borderRadius:100, backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)", transition:"background 0.18s, transform 0.18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.18)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.transform="translateY(0)"; }}>
                Write a Post
              </a>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ══ 2. TICKER ══════════════════════════════ */}
      <div style={{ background:"#F5F5F7", borderBottom:"1px solid #E8E8ED", overflow:"hidden" }}>
        <div className="marquee-track" style={{ padding:"12px 0" }}>
          {[..."Open Tech Publication,Always Free,No Login Required,Community Driven,50+ Topics,AI & Machine Learning,Web Development,Cybersecurity,Write & Share Today,Open Knowledge".split(","),
            ..."Open Tech Publication,Always Free,No Login Required,Community Driven,50+ Topics,AI & Machine Learning,Web Development,Cybersecurity,Write & Share Today,Open Knowledge".split(","),
          ].map((item, i) => (
            <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:20, padding:"0 28px", flexShrink:0 }}>
              <span style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:500, color:"#6E6E73", letterSpacing:"1px", textTransform:"uppercase", whiteSpace:"nowrap" }}>{item}</span>
              <span style={{ width:3, height:3, borderRadius:"50%", background:"#D2D2D7", flexShrink:0 }}/>
            </span>
          ))}
        </div>
      </div>

      {/* ══ 3. BENTO FEATURED ══════════════════════ */}
      <section style={{ background:"#fff", padding:"72px 24px 0" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:3, height:20, background:"#010048", borderRadius:2 }}/>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,2.5vw,26px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.4px" }}>Featured Stories</h2>
              </div>
              <a href="/blog" style={{ fontFamily:"var(--font-sans)", fontSize:13, fontWeight:500, color:"#010048", textDecoration:"none", display:"flex", alignItems:"center", gap:4, transition:"opacity 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.65"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                All articles
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </ScrollReveal>
          {loading ? <BentoSkeleton/> : posts.length > 0 ? <BentoGrid posts={posts}/> : null}
        </div>
      </section>

      {/* ══ 4. TRENDING NOW ════════════════════════ */}
      {!loading && posts.length > 0 && (
        <section style={{ background:"#fff", padding:"72px 24px 0" }}>
          <div style={{ maxWidth:1120, margin:"0 auto" }}>
            <ScrollReveal direction="up">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:3, height:20, background:"#010048", borderRadius:2 }}/>
                  <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,2.5vw,26px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.4px" }}>Trending Now</h2>
                </div>
                <a href="/blog" style={{ fontFamily:"var(--font-sans)", fontSize:13, fontWeight:500, color:"#010048", textDecoration:"none", transition:"opacity 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.65"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  View all →
                </a>
              </div>
            </ScrollReveal>
            <div style={{ border:"1px solid #E8E8ED", borderRadius:16, overflow:"hidden", background:"#fff" }}>
              <div className="trending-dark-grid">
                {posts.slice(0, 6).map((post, i) => (
                  <TrendingItem key={post.id} post={post} rank={i+1} isLast={i >= 4} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. CATEGORIES ══════════════════════════ */}
      <section style={{ background:"#fff", padding:"72px 0 0" }}>
        <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 24px" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:3, height:20, background:"#010048", borderRadius:2 }}/>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,2.5vw,26px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.4px" }}>Browse Topics</h2>
              </div>
              <a href="/topics" style={{ fontFamily:"var(--font-sans)", fontSize:13, fontWeight:500, color:"#010048", textDecoration:"none", transition:"opacity 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.65"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                All topics →
              </a>
            </div>
          </ScrollReveal>
        </div>
        <CategoryScroll categories={CATEGORIES}/>
      </section>

      {/* ══ 6. STATS STRIP ═════════════════════════ */}
      <section style={{ background:"#F5F5F7", borderTop:"1px solid #E8E8ED", borderBottom:"1px solid #E8E8ED", padding:"64px 24px", marginTop:72 }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div className="stats-bar-grid">
              {[
                { end:12,  suffix:"+",  label:"Topic Categories",   icon:"🗂️"  },
                { end:100, suffix:"%",  label:"Free Forever",        icon:"✓"   },
                { end:0,   suffix:"",   label:"Login Required",      icon:"🔓"  },
                { end:60,  suffix:"s",  label:"To Publish a Post",   icon:"⚡"  },
              ].map((s, i) => (
                <div key={s.label} style={{
                  textAlign:"center", padding:"36px 20px",
                  borderRight: i < 3 ? "1px solid #E8E8ED" : "none",
                }}>
                  <div style={{ fontSize:22, marginBottom:14, opacity:0.7 }}>{s.icon}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,4.5vw,56px)", fontWeight:700, color:"#010048", letterSpacing:"-2px", lineHeight:1, marginBottom:10 }}>
                    <CountUp end={s.end} suffix={s.suffix} duration={2200}/>
                  </div>
                  <div style={{ fontFamily:"var(--font-sans)", fontSize:13, color:"#6E6E73", letterSpacing:"0.2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ 7. ARTICLES + SIDEBAR ══════════════════ */}
      <section id="articles" style={{ background:"#fff", padding:"72px 24px 80px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:3, height:20, background:"#010048", borderRadius:2 }}/>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,2.5vw,26px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.4px" }}>
                  {search ? `"${search}"` : "Latest Articles"}
                  {!search && !loading && <span style={{ fontFamily:"var(--font-sans)", fontSize:13, fontWeight:400, color:"#A1A1A6", marginLeft:8 }}>{filtered.length} articles</span>}
                </h2>
              </div>
              <SearchBar value={search} onChange={setSearch}/>
            </div>
            {/* Tabs */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:36 }}>
              {TOPICS.map(t => (
                <button key={t.label} onClick={()=>setActiveTab(t.key)} style={{
                  padding:"6px 16px", borderRadius:100,
                  border:`1.5px solid ${activeTab===t.key ? "#010048" : "#E8E8ED"}`,
                  background: activeTab===t.key ? "#010048" : "#fff",
                  color: activeTab===t.key ? "#fff" : "#6E6E73",
                  fontFamily:"var(--font-sans)", fontSize:12, fontWeight:500,
                  cursor:"pointer", transition:"all 0.18s",
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="articles-sidebar-layout">
            <div>
              {loading ? <LoadingGrid2/> : filtered.length===0 ? (
                <EmptyState search={search} onClear={()=>{ setSearch(""); setActiveTab(null); }}/>
              ) : (
                <StaggerContainer className="articles-2col">
                  {filtered.map(post => (
                    <StaggerItem key={post.id}><ArticleCard post={post}/></StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
            <aside className="articles-sidebar" style={{ position:"sticky", top:88 }}>
              <SidebarPanel posts={posts}/>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ 8. HOW IT WORKS ════════════════════════ */}
      <section style={{ background:"#F5F5F7", borderTop:"1px solid #E8E8ED", padding:"80px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color:"#010048", letterSpacing:"2px", textTransform:"uppercase", marginBottom:10 }}>Simple by Design</p>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3.2vw,40px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.8px", lineHeight:1.1 }}>
                How TechSphere works
              </h2>
            </div>
          </ScrollReveal>
          <StaggerContainer className="how-grid" style={{ position:"relative" }}>
            <div style={{ position:"absolute", top:52, left:"17%", right:"17%", height:1, background:"linear-gradient(90deg,transparent,#D2D2D7 20%,#D2D2D7 80%,transparent)" }} className="how-line"/>
            {[
              { step:"01", icon:"🔍", title:"Discover",   desc:"Browse thousands of free articles across 12 tech topics. Search, filter, explore.",          href:"/blog",   cta:"Browse" },
              { step:"02", icon:"📖", title:"Read Free",  desc:"Every article is completely free. No paywall, no account, no limit. Just open knowledge.",    href:null,      cta:null     },
              { step:"03", icon:"✍️", title:"Publish",   desc:"Write and publish your own article in 60 seconds — no friction, no barriers.",                href:"/new",    cta:"Write"  },
            ].map(item => (
              <StaggerItem key={item.step}>
                <Tilt3D intensity={6} scale={1.02} style={{ height:"100%" }}>
                  <div style={{ background:"#fff", border:"1px solid #E8E8ED", borderRadius:16, padding:"32px 28px", height:"100%", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:20, right:20, fontFamily:"var(--font-display)", fontSize:72, fontWeight:900, color:"rgba(1,0,72,0.04)", lineHeight:1, userSelect:"none" }}>{item.step}</div>
                    <div style={{ width:48, height:48, borderRadius:12, background:"rgba(1,0,72,0.06)", border:"1px solid rgba(1,0,72,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:20 }}>{item.icon}</div>
                    <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:700, color:"#010048", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Step {item.step}</p>
                    <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.3px", marginBottom:12 }}>{item.title}</h3>
                    <p style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"#6E6E73", lineHeight:1.75, marginBottom: item.cta ? 22 : 0 }}>{item.desc}</p>
                    {item.cta && (
                      <a href={item.href} style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:"var(--font-sans)", fontSize:12, fontWeight:600, color:"#010048", textDecoration:"none", transition:"gap 0.2s" }}
                        onMouseEnter={e=>e.currentTarget.style.gap="9px"}
                        onMouseLeave={e=>e.currentTarget.style.gap="5px"}>
                        {item.cta}
                        <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                  </div>
                </Tilt3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══ 9. PLATFORM FEATURES ═══════════════════ */}
      <section style={{ background:"#fff", padding:"80px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color:"#010048", letterSpacing:"2px", textTransform:"uppercase", marginBottom:10 }}>Platform</p>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3.2vw,40px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.8px", lineHeight:1.1 }}>
                Knowledge without barriers
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {FEATURES.map((feat, i) => <FeatureRow key={i} feat={feat} flip={i%2===1}/>)}
          </div>
        </div>
      </section>

      {/* ══ 10. COMMUNITY (one blue accent section) ═ */}
      <section style={{ background:"#010048", padding:"80px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, borderRadius:20, overflow:"hidden", border:"1px solid rgba(255,255,255,0.08)" }} className="community-grid">
              {/* Left */}
              <div style={{ padding:"56px 52px", display:"flex", flexDirection:"column", justifyContent:"center", background:"rgba(255,255,255,0.03)" }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.07)", borderRadius:100, padding:"5px 14px", width:"fit-content", marginBottom:24 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#34D399", display:"inline-block", boxShadow:"0 0 8px #34D399" }}/>
                  <span style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.6)", letterSpacing:"0.5px" }}>Open Community</span>
                </div>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,3vw,38px)", fontWeight:700, color:"#fff", letterSpacing:"-0.8px", lineHeight:1.1, marginBottom:16 }}>
                  Your knowledge<br/><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.55)" }}>belongs here</em>
                </h2>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:15, color:"rgba(255,255,255,0.45)", lineHeight:1.8, marginBottom:32, maxWidth:340 }}>
                  Join thousands of developers sharing tutorials, insights, and breakthroughs — no friction, no account, no cost.
                </p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <a href="/new" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"12px 26px", background:"#fff", color:"#010048", fontFamily:"var(--font-sans)", fontSize:13, fontWeight:600, textDecoration:"none", borderRadius:100, transition:"opacity 0.15s, transform 0.15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.opacity="0.9"; e.currentTarget.style.transform="translateY(-1px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
                    Write an Article
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="/blog" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"12px 22px", background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.75)", border:"1px solid rgba(255,255,255,0.12)", fontFamily:"var(--font-sans)", fontSize:13, fontWeight:500, textDecoration:"none", borderRadius:100, transition:"background 0.18s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}>
                    Read Articles
                  </a>
                </div>
              </div>
              {/* Right: floating cards */}
              <div style={{ padding:"48px 36px", display:"flex", flexDirection:"column", justifyContent:"center", gap:12, background:"rgba(255,255,255,0.02)" }}>
                {[
                  { icon:"🤖", text:"Building LLMs from scratch",    tag:"AI & ML"    },
                  { icon:"⚡", text:"Next.js 15 performance guide",   tag:"Web Dev"    },
                  { icon:"🔐", text:"Zero Trust architecture",        tag:"Security"   },
                ].map((card, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ delay:0.12+i*0.12, duration:0.5, ease:[0.25,0.1,0.25,1] }}
                    style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"16px 18px", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", display:"flex", alignItems:"center", gap:14, transform:`translateX(${i===1?20:0}px)` }}>
                    <span style={{ fontSize:22 }}>{card.icon}</span>
                    <div>
                      <p style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.88)", marginBottom:4, lineHeight:1.2 }}>{card.text}</p>
                      <span style={{ fontFamily:"var(--font-sans)", fontSize:11, color:"rgba(255,255,255,0.35)", fontWeight:500 }}>{card.tag}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ 11. TOPICS EXPLORER ════════════════════ */}
      <section style={{ background:"#fff", borderTop:"1px solid #E8E8ED", padding:"72px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:3, height:20, background:"#010048", borderRadius:2 }}/>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,2.5vw,26px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.4px" }}>Explore by Topic</h2>
              </div>
              <a href="/topics" style={{ fontFamily:"var(--font-sans)", fontSize:13, fontWeight:500, color:"#010048", textDecoration:"none", transition:"opacity 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.65"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                All topics →
              </a>
            </div>
          </ScrollReveal>
          <StaggerContainer style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {[
              { label:"AI & Machine Learning", icon:"🤖", href:"/blog?category=ai"          },
              { label:"Web Development",        icon:"🌐", href:"/blog?category=web"         },
              { label:"Cloud & DevOps",         icon:"☁️", href:"/blog?category=cloud"       },
              { label:"Cybersecurity",          icon:"🔐", href:"/blog?category=security"    },
              { label:"Mobile Development",     icon:"📱", href:"/blog?category=mobile"      },
              { label:"Data Science",           icon:"📊", href:"/blog?category=data"        },
              { label:"Open Source",            icon:"🔓", href:"/blog?category=opensource"  },
              { label:"Programming",            icon:"💻", href:"/blog?category=programming" },
              { label:"UI & UX Design",         icon:"🎨", href:"/blog?category=ux"          },
              { label:"Tech & Startups",        icon:"🚀", href:"/blog?category=startup"     },
              { label:"Hardware & IoT",         icon:"🔧", href:"/blog?category=hardware"    },
              { label:"DevOps",                 icon:"⚙️", href:"/blog?category=devops"      },
            ].map(tag => (
              <StaggerItem key={tag.label}>
                <a href={tag.href} style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px", background:"#fff", border:"1px solid #E8E8ED", borderRadius:100, fontFamily:"var(--font-sans)", fontSize:13, fontWeight:400, color:"#1D1D1F", textDecoration:"none", transition:"all 0.18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="#010048"; e.currentTarget.style.background="rgba(1,0,72,0.04)"; e.currentTarget.style.color="#010048"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="#E8E8ED"; e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#1D1D1F"; e.currentTarget.style.transform="none"; }}>
                  <span style={{ fontSize:14 }}>{tag.icon}</span>
                  {tag.label}
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══ 12. NEWSLETTER ═════════════════════════ */}
      <section style={{ background:"#F5F5F7", borderTop:"1px solid #E8E8ED", padding:"80px 24px" }}>
        <div style={{ maxWidth:520, margin:"0 auto" }}>
          <ScrollReveal direction="scale">
            <div style={{ textAlign:"center" }}>
              <div style={{ width:52, height:52, borderRadius:14, background:"rgba(1,0,72,0.06)", border:"1px solid rgba(1,0,72,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 24px" }}>
                ✉️
              </div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,3vw,34px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.6px", lineHeight:1.15, marginBottom:12 }}>
                Stay in the loop
              </h2>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:15, color:"#6E6E73", lineHeight:1.8, marginBottom:32 }}>
                Weekly digest of the best tech articles — curated, concise, and completely free.
              </p>
              <a href="/newsletter" style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"14px 34px", background:"#010048", color:"#fff", fontFamily:"var(--font-sans)", fontSize:14, fontWeight:600, textDecoration:"none", borderRadius:100, transition:"opacity 0.18s, transform 0.18s, box-shadow 0.18s", boxShadow:"0 4px 20px rgba(1,0,72,0.22)" }}
                onMouseEnter={e=>{ e.currentTarget.style.opacity="0.88"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(1,0,72,0.3)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(1,0,72,0.22)"; }}>
                Subscribe — It&apos;s Free
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:12, color:"#A1A1A6", marginTop:14 }}>No spam. Unsubscribe anytime.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTION COMPONENTS
══════════════════════════════════════════════ */

/* ── Bento Grid ─────────────────────────────── */
function BentoGrid({ posts }) {
  return (
    <div className="bento-grid">
      <BentoMainCard post={posts[0]}/>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {posts.slice(1,4).map(p => <BentoSideCard key={p.id} post={p}/>)}
      </div>
    </div>
  );
}

function BentoMainCard({ post }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }); } catch {}
  return (
    <a href={`/blog/${post.id}`} className="bento-main"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"block", textDecoration:"none", borderRadius:16, overflow:"hidden", position:"relative", minHeight:440, background:"#1D1D1F", boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.16)" : "0 4px 24px rgba(0,0,0,0.08)", transition:"box-shadow 0.3s" }}>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity: hov?0.5:0.4, transform: hov?"scale(1.04)":"scale(1)", transition:"transform 0.7s ease, opacity 0.3s ease" }}/>}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.82) 100%)" }}/>
      {/* Top accent */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"#010048" }}/>
      <div style={{ position:"relative", zIndex:2, padding:"32px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", minHeight:440 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <span style={{ background:"rgba(1,0,72,0.85)", backdropFilter:"blur(8px)", padding:"4px 12px", borderRadius:100, fontFamily:"var(--font-sans)", fontSize:10, fontWeight:600, color:"#fff", letterSpacing:"1px", textTransform:"uppercase" }}>Featured</span>
          <span style={{ fontFamily:"var(--font-sans)", fontSize:12, color:"rgba(255,255,255,0.45)" }}>{date}</span>
        </div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,2.8vw,32px)", fontWeight:700, color:"#fff", lineHeight:1.2, letterSpacing:"-0.5px", marginBottom:12, transition:"opacity 0.2s", opacity: hov?1:0.92 }}>
          {post.title}
        </h2>
        <p style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.7, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", marginBottom:18 }}>
          {post.description}
        </p>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--font-sans)", fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>
          Read Article
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" style={{ transform: hov?"translateX(4px)":"none", transition:"transform 0.2s" }}>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

function BentoSideCard({ post }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }); } catch {}
  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", gap:14, alignItems:"center", textDecoration:"none", background:"#fff", border:`1px solid ${hov?"#D2D2D7":"#E8E8ED"}`, borderRadius:12, padding:"14px 16px", flex:1, transition:"border-color 0.2s, box-shadow 0.2s, transform 0.2s", boxShadow: hov?"0 6px 24px rgba(0,0,0,0.07)":"none", transform: hov?"translateX(3px)":"none" }}>
      <div style={{ width:56, height:56, borderRadius:10, overflow:"hidden", flexShrink:0, background:"#F5F5F7" }}>
        {post.imageUrl && <img src={post.imageUrl} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <span style={{ fontFamily:"var(--font-sans)", fontSize:11, color:"#A1A1A6", display:"block", marginBottom:4 }}>{date}</span>
        <p style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:600, color: hov?"#010048":"#1D1D1F", lineHeight:1.35, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", transition:"color 0.18s" }}>
          {post.title}
        </p>
      </div>
    </a>
  );
}

function BentoSkeleton() {
  const s = { background:"linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.4s infinite" };
  return (
    <div className="bento-grid">
      <div style={{ ...s, borderRadius:16, minHeight:440 }}/>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {[1,2,3].map(i => <div key={i} style={{ ...s, borderRadius:12, height:88 }}/>)}
      </div>
    </div>
  );
}

/* ── Trending Item ──────────────────────────── */
function TrendingItem({ post, rank, isLast }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }); } catch {}
  const isRight = rank % 2 === 0;
  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", gap:16, alignItems:"center", padding:"18px 24px", textDecoration:"none", background: hov?"rgba(1,0,72,0.02)":"#fff", transition:"background 0.18s", borderBottom: isLast?"none":"1px solid #F5F5F7", borderLeft: isRight?"1px solid #F5F5F7":"none" }}>
      <span style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:700, color: hov?"rgba(1,0,72,0.18)":"rgba(0,0,0,0.06)", lineHeight:1, flexShrink:0, width:44, textAlign:"right", transition:"color 0.22s", letterSpacing:"-1px" }}>
        {String(rank).padStart(2,"0")}
      </span>
      <div style={{ width:48, height:48, borderRadius:8, overflow:"hidden", flexShrink:0, background:"#F5F5F7" }}>
        {post.imageUrl && <img src={post.imageUrl} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:600, color: hov?"#010048":"#1D1D1F", lineHeight:1.35, display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden", transition:"color 0.18s", marginBottom:3 }}>
          {post.title}
        </p>
        <span style={{ fontFamily:"var(--font-sans)", fontSize:11, color:"#A1A1A6" }}>{date}</span>
      </div>
      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ color: hov?"#010048":"#D2D2D7", flexShrink:0, transition:"color 0.18s, transform 0.18s", transform: hov?"translateX(2px)":"none" }}>
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ── Category Horizontal Scroll ─────────────── */
function CategoryScroll({ categories }) {
  const ref = useRef(null);
  const drag = useRef({ active:false, startX:0, scrollLeft:0 });
  function onDown(e) { drag.current = { active:true, startX:e.pageX-ref.current.offsetLeft, scrollLeft:ref.current.scrollLeft }; }
  function onMove(e) { if (!drag.current.active) return; e.preventDefault(); ref.current.scrollLeft = drag.current.scrollLeft-(e.pageX-ref.current.offsetLeft-drag.current.startX); }
  function onUp() { drag.current.active=false; }
  useEffect(() => { window.addEventListener("mouseup",onUp); return()=>window.removeEventListener("mouseup",onUp); }, []);
  return (
    <div ref={ref} className="cat-scroll-track" style={{ padding:"4px 24px 16px" }} onMouseDown={onDown} onMouseMove={onMove}>
      {categories.map(cat => <CategoryCard key={cat.key} cat={cat}/>)}
    </div>
  );
}

function CategoryCard({ cat }) {
  const [hov, setHov] = useState(false);
  return (
    <Tilt3D intensity={8} scale={1.03} style={{ flexShrink:0, width:172, height:220 }}>
      <a href={`/blog?category=${cat.key}`}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:"block", width:"100%", height:"100%", textDecoration:"none", borderRadius:14, overflow:"hidden", position:"relative", userSelect:"none", border:"1px solid #E8E8ED" }}>
        <img src={cat.image} alt={cat.label} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity: hov?0.65:0.55, transform: hov?"scale(1.06)":"scale(1)", transition:"transform 0.55s ease, opacity 0.3s ease" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(1,0,72,0.75) 100%)" }}/>
        {/* Top accent */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"#010048", opacity: hov?1:0, transition:"opacity 0.25s" }}/>
        <div style={{ position:"relative", zIndex:2, padding:"18px 16px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <span style={{ fontSize:24, filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}>{cat.icon}</span>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:600, color:"#fff", lineHeight:1.3, marginBottom:6, textShadow:"0 1px 4px rgba(0,0,0,0.4)" }}>{cat.label}</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:3, background:"rgba(255,255,255,0.12)", backdropFilter:"blur(6px)", borderRadius:100, padding:"3px 10px", fontFamily:"var(--font-sans)", fontSize:10, fontWeight:500, color:"rgba(255,255,255,0.85)", transition:"background 0.2s" }}>
              Explore →
            </div>
          </div>
        </div>
      </a>
    </Tilt3D>
  );
}

/* ── Feature Row ────────────────────────────── */
function FeatureRow({ feat, flip }) {
  return (
    <ScrollReveal direction={flip?"right":"left"}>
      <div style={{ display:"grid", gridTemplateColumns: flip?"1fr 380px":"380px 1fr", gap:0, borderRadius:16, overflow:"hidden", border:"1px solid #E8E8ED" }} className="feature-row-grid">
        {/* Text */}
        <div style={{ order: flip?2:1, padding:"48px 44px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#fff" }}>
          <div style={{ width:44, height:44, borderRadius:12, background:"rgba(1,0,72,0.05)", border:"1px solid rgba(1,0,72,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:22 }}>{feat.icon}</div>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(18px,2.2vw,26px)", fontWeight:700, color:"#1D1D1F", letterSpacing:"-0.4px", lineHeight:1.2, marginBottom:14 }}>{feat.title}</h3>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:15, color:"#6E6E73", lineHeight:1.8, marginBottom:26 }}>{feat.desc}</p>
          <a href={feat.href} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"10px 22px", background:"#010048", color:"#fff", fontFamily:"var(--font-sans)", fontSize:13, fontWeight:600, textDecoration:"none", borderRadius:100, alignSelf:"flex-start", transition:"opacity 0.18s, transform 0.18s" }}
            onMouseEnter={e=>{ e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
            {feat.cta}
          </a>
        </div>
        {/* Visual */}
        <div style={{ order: flip?1:2, background:"#F5F5F7", display:"flex", alignItems:"center", justifyContent:"center", minHeight:220, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", width:240, height:240, borderRadius:"50%", border:"1px solid #E8E8ED", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
          <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%", border:"1px solid #E8E8ED", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
          <span style={{ fontSize:60, position:"relative", zIndex:1, animation:"heroFloat 4s ease-in-out infinite", filter:"drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}>{feat.icon}</span>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Article Card ───────────────────────────── */
function ArticleCard({ post }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }); } catch {}
  const readTime = post.description ? Math.max(1,Math.ceil(post.description.split(" ").length/200)) : 1;
  return (
    <a href={`/blog/${post.id}`}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", flexDirection:"column", background:"#fff", textDecoration:"none", borderRadius:12, overflow:"hidden", border:`1px solid ${hov?"#D2D2D7":"#E8E8ED"}`, height:"100%", transition:"border-color 0.2s, box-shadow 0.25s, transform 0.25s", transform: hov?"translateY(-4px)":"none", boxShadow: hov?"0 12px 40px rgba(0,0,0,0.08)":"0 1px 4px rgba(0,0,0,0.04)" }}>
      {post.imageUrl ? (
        <div style={{ height:176, overflow:"hidden", background:"#F5F5F7", flexShrink:0 }}>
          <img src={post.imageUrl} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", transform: hov?"scale(1.05)":"scale(1)", transition:"transform 0.45s ease" }}/>
        </div>
      ) : (
        <div style={{ height:90, background:"linear-gradient(135deg,#010048,rgba(1,0,72,0.7))", flexShrink:0 }}/>
      )}
      <div style={{ padding:"18px 20px 20px", flex:1, display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <span style={{ fontFamily:"var(--font-sans)", fontSize:11, color:"#A1A1A6" }}>{date}</span>
          <span style={{ width:2, height:2, background:"#D2D2D7", borderRadius:"50%", flexShrink:0 }}/>
          <span style={{ fontFamily:"var(--font-sans)", fontSize:11, color:"#A1A1A6" }}>{readTime} min read</span>
        </div>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color: hov?"#010048":"#1D1D1F", lineHeight:1.35, marginBottom:8, flex:1, transition:"color 0.2s" }}>{post.title}</h3>
        <p style={{ fontFamily:"var(--font-sans)", fontSize:13, color:"#6E6E73", lineHeight:1.65, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", marginBottom:14 }}>{post.description}</p>
        <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color: hov?"#010048":"#A1A1A6", transition:"color 0.2s" }}>
          Read Article
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" style={{ transform: hov?"translateX(2px)":"none", transition:"transform 0.2s" }}>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

/* ── Sidebar ────────────────────────────────── */
function SidebarPanel({ posts }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      {/* Stats */}
      <div style={{ background:"#010048", borderRadius:14, padding:"22px 20px" }}>
        <p style={{ fontFamily:"var(--font-sans)", fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.4)", letterSpacing:"2px", textTransform:"uppercase", marginBottom:16 }}>Platform</p>
        {[
          { label:"Articles",      value: posts.length>0?`${posts.length}+`:"∞" },
          { label:"Always Free",   value:"Yes"  },
          { label:"Login Required",value:"None" },
        ].map((s,i) => (
          <div key={s.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom: i<2?"1px solid rgba(255,255,255,0.07)":"none", padding:"10px 0" }}>
            <span style={{ fontFamily:"var(--font-sans)", fontSize:12, color:"rgba(255,255,255,0.45)" }}>{s.label}</span>
            <span style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:700, color:"#fff" }}>{s.value}</span>
          </div>
        ))}
      </div>
      {/* Recent */}
      <div style={{ background:"#fff", border:"1px solid #E8E8ED", borderRadius:14, padding:"18px 18px" }}>
        <p style={{ fontFamily:"var(--font-sans)", fontSize:10, fontWeight:600, color:"#010048", letterSpacing:"2px", textTransform:"uppercase", marginBottom:16 }}>Recent</p>
        {posts.slice(0,5).map((post,i) => <SidebarPost key={post.id} post={post} isLast={i===4}/>)}
      </div>
      {/* CTA */}
      <div style={{ background:"#F5F5F7", border:"1px solid #E8E8ED", borderRadius:14, padding:"22px 18px", textAlign:"center" }}>
        <p style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"#1D1D1F", marginBottom:8 }}>Share your knowledge</p>
        <p style={{ fontFamily:"var(--font-sans)", fontSize:12, color:"#6E6E73", lineHeight:1.65, marginBottom:16 }}>No account required. Publish instantly.</p>
        <a href="/new" style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"9px 20px", background:"#010048", color:"#fff", fontFamily:"var(--font-sans)", fontSize:12, fontWeight:600, textDecoration:"none", borderRadius:100, transition:"opacity 0.15s" }}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          Write a Post
        </a>
      </div>
    </div>
  );
}

function SidebarPost({ post, isLast }) {
  const [hov, setHov] = useState(false);
  let date = "—";
  try { date = new Date(post.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }); } catch {}
  return (
    <a href={`/blog/${post.id}`} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", gap:10, alignItems:"flex-start", paddingBottom: isLast?0:12, marginBottom: isLast?0:12, borderBottom: isLast?"none":"1px solid #F5F5F7", textDecoration:"none" }}>
      <div style={{ width:34, height:34, borderRadius:7, overflow:"hidden", flexShrink:0, background:"#F5F5F7" }}>
        {post.imageUrl && <img src={post.imageUrl} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>}
      </div>
      <div>
        <p style={{ fontFamily:"var(--font-display)", fontSize:12, fontWeight:600, color: hov?"#010048":"#1D1D1F", lineHeight:1.35, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", transition:"color 0.15s", marginBottom:2 }}>{post.title}</p>
        <span style={{ fontFamily:"var(--font-sans)", fontSize:11, color:"#A1A1A6" }}>{date}</span>
      </div>
    </a>
  );
}

/* ── Utilities ──────────────────────────────── */
function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position:"relative", background: focused?"#fff":"#F5F5F7", border:`1px solid ${focused?"#010048":"#E8E8ED"}`, borderRadius:100, transition:"border-color 0.18s, background 0.18s, box-shadow 0.18s", boxShadow: focused?"0 0 0 3px rgba(1,0,72,0.07)":"none" }}>
      <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color: focused?"#010048":"#A1A1A6", transition:"color 0.18s", pointerEvents:"none" }} width="13" height="13" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input type="text" placeholder="Search articles…" value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ padding:"9px 16px 9px 34px", border:"none", background:"transparent", fontFamily:"var(--font-sans)", fontSize:13, color:"#1D1D1F", width:210, outline:"none" }}/>
    </div>
  );
}

function LoadingGrid2() {
  const s = { background:"linear-gradient(90deg,#F5F5F7 25%,#E8E8ED 50%,#F5F5F7 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.4s infinite" };
  return (
    <div className="articles-2col">
      {[1,2,3,4].map(i=>(
        <div key={i} style={{ borderRadius:12, overflow:"hidden", border:"1px solid #E8E8ED" }}>
          <div style={{ ...s, height:176 }}/>
          <div style={{ padding:"18px 20px" }}>
            <div style={{ ...s, height:9, width:"40%", borderRadius:4, marginBottom:12 }}/>
            <div style={{ ...s, height:16, width:"90%", borderRadius:4, marginBottom:8 }}/>
            <div style={{ ...s, height:13, width:"65%", borderRadius:4 }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div style={{ textAlign:"center", padding:"64px 24px", border:"1px solid #E8E8ED", borderRadius:14, background:"#fff" }}>
      <div style={{ fontSize:36, marginBottom:14 }}>📭</div>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"#1D1D1F", marginBottom:8 }}>
        {search?"Nothing found":"Be the first to publish"}
      </h3>
      <p style={{ fontFamily:"var(--font-sans)", color:"#6E6E73", fontSize:14, marginBottom:24, lineHeight:1.7 }}>
        {search?`No results for "${search}". Try a different keyword.`:"Share your first tech insight with the world."}
      </p>
      <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
        {search && <button onClick={onClear} style={{ padding:"9px 20px", border:"1px solid #E8E8ED", borderRadius:100, background:"#fff", color:"#6E6E73", fontFamily:"var(--font-sans)", fontWeight:500, fontSize:13, cursor:"pointer" }}>Clear</button>}
        <a href="/new" style={{ padding:"9px 20px", background:"#010048", color:"#fff", fontFamily:"var(--font-sans)", fontWeight:600, fontSize:13, textDecoration:"none", borderRadius:100 }}>Write a Post</a>
      </div>
    </div>
  );
}
