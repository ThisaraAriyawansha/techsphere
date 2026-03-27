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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const update = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth < 900); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
          <motion.video
            src="/img/0326.mp4"
            autoPlay loop muted playsInline aria-hidden="true"
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
              <a href="#articles" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"9px 18px", background:"transparent", color:"#fff", border:"1px solid #fff", fontFamily:"var(--font-sans)", fontWeight:600, fontSize:13, textDecoration:"none", borderRadius:6, transition:"opacity 0.18s, transform 0.18s, background 0.18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateY(0)"; }}>
                Explore Articles
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/new" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"9px 18px", background:"rgba(255,255,255,0.1)", color:"#fff", border:"1px solid rgba(255,255,255,0.28)", fontFamily:"var(--font-sans)", fontWeight:500, fontSize:13, textDecoration:"none", borderRadius:6, backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)", transition:"background 0.18s, transform 0.18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.18)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.transform="translateY(0)"; }}>
                Write a Post
              </a>
            </motion.div>
          </div>
        </section>
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


            {/* ══ 2. TICKER ══════════════════════════════ */}
          <div 
            style={{ 
              borderBottom: "1px solid #E8E8ED",
              borderTop: "1px solid #E8E8ED", 
              overflow: "hidden",
              marginTop: "40px",     // ← Increased top margin
              marginBottom: "20px"   // ← Added some bottom margin for better spacing
            }}
          >
            <div className="marquee-track" style={{ padding: "12px 0" }}>
              {[... 
                "Open Tech Publication,Always Free,No Login Required,Community Driven,50+ Topics,AI & Machine Learning,Web Development,Cybersecurity,Write & Share Today,Open Knowledge"
                  .split(","),
                ...
                "Open Tech Publication,Always Free,No Login Required,Community Driven,50+ Topics,AI & Machine Learning,Web Development,Cybersecurity,Write & Share Today,Open Knowledge"
                  .split(",")
              ].map((item, i) => (
                <span 
                  key={i} 
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: 20, 
                    padding: "0 28px", 
                    flexShrink: 0 
                  }}
                >
                  <span 
                    style={{ 
                      fontFamily: "var(--font-sans)", 
                      fontSize: 11, 
                      fontWeight: 500, 
                      color: "#6E6E73", 
                      letterSpacing: "1px", 
                      textTransform: "uppercase", 
                      whiteSpace: "nowrap" 
                    }}
                  >
                    {item}
                  </span>
                  <span 
                    style={{ 
                      width: 3, 
                      height: 3, 
                      borderRadius: "50%", 
                      background: "#D2D2D7", 
                      flexShrink: 0 
                    }} 
                  />
                </span>
              ))}
            </div>
          </div>

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
      <section style={{ padding:"72px 0 0" }}>
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
      <section style={{ padding:"80px 24px", marginTop:72, position:"relative", overflow:"hidden" }}>
        {/* fixed bg image */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"url('/img/2454628.webp')", backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed", zIndex:0 }}/>
        {/* subtle radial glow */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99,102,241,0.18) 0%, transparent 70%)", pointerEvents:"none", zIndex:2 }}/>
        <div style={{ maxWidth:1120, margin:"0 auto", position:"relative", zIndex:3 }}>
          <ScrollReveal direction="up">
            <p style={{ fontFamily:"var(--font-sans)", fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.45)", letterSpacing:"2px", textTransform:"uppercase", textAlign:"center", marginBottom:56 }}>By the numbers</p>
            <div className="stats-bar-grid">
              {[
                { end:12,  suffix:"+",  label:"Topic Categories",  desc:"Spanning every major tech domain" },
                { end:100, suffix:"%",  label:"Free Forever",       desc:"No hidden fees or paywalls" },
                { end:0,   suffix:"",   label:"Login Required",     desc:"Read anything, anytime" },
                { end:60,  suffix:"s",  label:"To Publish a Post",  desc:"Frictionless writing experience" },
              ].map((s, i) => (
                <div key={s.label} style={{
                  textAlign:"center", padding:"40px 24px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(40px,4.5vw,60px)", fontWeight:700, color:"#fff", letterSpacing:"-2px", lineHeight:1, marginBottom:10 }}>
                    <CountUp end={s.end} suffix={s.suffix} duration={2200}/>
                  </div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"rgba(255,255,255,0.9)", marginBottom:6 }}>{s.label}</div>
                  <div style={{ fontFamily:"var(--font-sans)", fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>{s.desc}</div>
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

      {/* ══ D. PERSPECTIVE ═════════════════════════ */}
      <section style={{ background:"#010122", padding:"96px 24px" }}>
        <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:1.1, ease:[0.16,1,0.3,1] }}
          >
            <svg width="28" height="20" fill="none" viewBox="0 0 32 24" style={{ marginBottom:32, opacity:0.15 }}>
              <path d="M0 24V15.2C0 6.587 5.6 1.387 16.8 0l2.24 3.52C13.28 4.907 9.547 8 9 12.8H14.4V24H0zm17.6 0V15.2C17.6 6.587 23.2 1.387 34.4 0l2.24 3.52C30.88 4.907 27.147 8 26.6 12.8H32V24H17.6z" fill="white"/>
            </svg>
            <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(18px,2.6vw,32px)", fontWeight:400, fontStyle:"italic", color:"rgba(255,255,255,0.72)", lineHeight:1.65, letterSpacing:"-0.3px", marginBottom:40 }}>
              The best technology writing comes from engineers who actually build things — not observers watching from the outside.
            </p>
            <div style={{ display:"inline-flex", alignItems:"center", gap:14 }}>
              <span style={{ width:28, height:1, background:"rgba(255,255,255,0.12)", display:"block" }}/>
              <span style={{ fontFamily:"var(--font-sans)", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.2)", letterSpacing:"3px", textTransform:"uppercase" }}>TechSphere · Open by Design</span>
              <span style={{ width:28, height:1, background:"rgba(255,255,255,0.12)", display:"block" }}/>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 8. HOW IT WORKS ════════════════════════ */}
      <section style={{ background:"#F8F8FB", padding:"110px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ textAlign:"center", marginBottom:80 }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--font-sans)", fontSize:11, fontWeight:700, color:"#010048", letterSpacing:"2.5px", textTransform:"uppercase", background:"rgba(1,0,72,0.07)", borderRadius:100, padding:"7px 18px", marginBottom:20 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#010048", display:"inline-block" }}/>
                Simple by Design
              </span>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(30px,3.8vw,48px)", fontWeight:700, color:"#0A0A0F", letterSpacing:"-1.2px", lineHeight:1.08, marginBottom:18 }}>
                How TechSphere works
              </h2>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:16, color:"#6E6E73", maxWidth:460, margin:"0 auto", lineHeight:1.75 }}>
                Three steps. Zero friction. Built for readers and writers alike.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="how-grid" style={{ position:"relative", alignItems:"stretch" }}>
            {[
              { step:"01", title:"Discover",  tag:"Explore",  desc:"Browse thousands of free articles across 12 tech topics. Search, filter, and explore at your pace.",              href:"/blog", cta:"Browse articles" },
              { step:"02", title:"Read Free", tag:"Access",   desc:"Every article is 100% free. No paywall, no account required, no limits — open knowledge for everyone.",          href:null,    cta:null              },
              { step:"03", title:"Publish",   tag:"Create",   desc:"Write and publish your own article in under 60 seconds. No friction, no barriers — your voice deserves to be heard.", href:"/new",  cta:"Start writing"   },
            ].map((item, i) => (
              <StaggerItem key={item.step} style={{ display:"flex" }}>
                <div style={{
                  flex:1, display:"flex", flexDirection:"column",
                  background:"#fff",
                  border:"1px solid #EBEBF0",
                  borderTop: i===1 ? "3px solid #010048" : "3px solid transparent",
                  borderRadius:20,
                  padding:"40px 36px 36px",
                  boxShadow: i===1 ? "0 16px 48px rgba(1,0,72,0.1)" : "0 2px 16px rgba(0,0,0,0.04)",
                  position:"relative", overflow:"hidden",
                  transform: i===1 ? "translateY(-8px)" : "none",
                }}>
                  {/* watermark step */}
                  <div style={{ position:"absolute", bottom:-10, right:16, fontFamily:"var(--font-display)", fontSize:100, fontWeight:900, color:"rgba(1,0,72,0.035)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>{item.step}</div>

                  {/* tag + step */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32 }}>
                    <span style={{ fontFamily:"var(--font-sans)", fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color: i===1 ? "#010048" : "#A0A0AB", background: i===1 ? "rgba(1,0,72,0.07)" : "#F3F3F7", borderRadius:100, padding:"5px 12px" }}>{item.tag}</span>
                    <span style={{ fontFamily:"var(--font-display)", fontSize:13, fontWeight:700, color:"#D0D0DA" }}>{item.step}</span>
                  </div>

                  {/* icon circle */}
                  <div style={{ width:52, height:52, borderRadius:14, background: i===1 ? "#010048" : "#F3F3F7", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, boxShadow: i===1 ? "0 6px 20px rgba(1,0,72,0.2)" : "none" }}>
                    {i===0 && <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#010048" strokeWidth="2"/><path d="M20 20l-3-3" stroke="#010048" strokeWidth="2" strokeLinecap="round"/></svg>}
                    {i===1 && <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}
                    {i===2 && <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#010048" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>

                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"#0A0A0F", letterSpacing:"-0.5px", marginBottom:12 }}>{item.title}</h3>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"#6E6E73", lineHeight:1.85, flexGrow:1, marginBottom: item.cta ? 28 : 0 }}>{item.desc}</p>

                  {item.cta && (
                    <a href={item.href} style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"var(--font-sans)", fontSize:13, fontWeight:600, color:"#fff", textDecoration:"none", background:"#010048", borderRadius:100, padding:"10px 20px", alignSelf:"flex-start", transition:"opacity 0.18s, transform 0.18s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-1px)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
                      {item.cta}
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══ A. MANIFESTO ═══════════════════════════ */}
      <section style={{ background:"#010122", padding:"140px 24px", overflow:"hidden" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <motion.p
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:0.6 }}
            style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.22)", letterSpacing:"3.5px", textTransform:"uppercase", marginBottom:48 }}
          >
            Our Belief
          </motion.p>

          {[
            { text:"Knowledge",  muted:false, italic:false, delay:0.05 },
            { text:"should be",  muted:true,  italic:true,  delay:0.18 },
            { text:"free.",      muted:false, italic:false, delay:0.3  },
          ].map((line, i) => (
            <motion.p key={i}
              initial={{ opacity:0, y:48 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:1.1, delay:line.delay, ease:[0.16,1,0.3,1] }}
              style={{
                fontFamily:"var(--font-display)",
                fontSize:"clamp(68px,11vw,148px)",
                fontWeight:800,
                color: line.muted ? "rgba(255,255,255,0.14)" : "#fff",
                letterSpacing:"-4px",
                lineHeight:0.92,
                fontStyle: line.italic ? "italic" : "normal",
                margin:"0 0 6px",
              }}
            >
              {line.text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.5 }}
            style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24, marginTop:72, paddingTop:40, borderTop:"1px solid rgba(255,255,255,0.07)" }}
          >
            <p style={{ fontFamily:"var(--font-sans)", fontSize:15, color:"rgba(255,255,255,0.3)", maxWidth:400, lineHeight:1.85, margin:0 }}>
              No paywalls. No accounts. No noise. Just open technology knowledge for every curious mind on the planet.
            </p>
            <a href="/blog"
              style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"var(--font-sans)", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.45)", textDecoration:"none", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, padding:"13px 26px", transition:"all 0.22s" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,255,255,0.35)"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.background="transparent"; }}>
              Start reading
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ 9. PLATFORM FEATURES ═══════════════════ */}
      <section style={{ background:"#fff", padding: isMobile ? "60px 16px" : "100px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"flex", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", justifyContent:"space-between", marginBottom: isMobile ? 40 : 64, gap:32 }}>
              <div>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:700, color:"#010048", letterSpacing:"2.5px", textTransform:"uppercase", marginBottom:14 }}>Platform</p>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:700, color:"#0A0A0F", letterSpacing:"-1px", lineHeight:1.1, maxWidth:420 }}>
                  Knowledge without barriers
                </h2>
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:15, color:"#6E6E73", maxWidth: isMobile ? "100%" : 340, lineHeight:1.75, margin:0 }}>
                Everything you need to read, write, and grow — completely free, forever.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap:2 }}>
            {FEATURES.map((feat, i) => (
              <ScrollReveal key={i} direction="up">
                <div style={{ padding: isMobile ? "32px 20px" : "44px 36px", borderTop:"1px solid #E8E8ED", position:"relative", height:"100%", display:"flex", flexDirection:"column" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#F8F8FB"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ width:40, height:40, borderRadius:10, background:"#010048", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28 }}>
                    {i===0 && <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" stroke="#fff" strokeWidth="2"/></svg>}
                    {i===1 && <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {i===2 && <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#fff" strokeWidth="2"/></svg>}
                  </div>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:19, fontWeight:700, color:"#0A0A0F", letterSpacing:"-0.4px", marginBottom:12, lineHeight:1.3 }}>{feat.title}</h3>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"#6E6E73", lineHeight:1.8, flexGrow:1, marginBottom:28 }}>{feat.desc}</p>
                  <a href={feat.href} style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--font-sans)", fontSize:12, fontWeight:600, color:"#010048", textDecoration:"none", transition:"gap 0.2s" }}
                    onMouseEnter={e=>e.currentTarget.style.gap="10px"}
                    onMouseLeave={e=>e.currentTarget.style.gap="6px"}>
                    {feat.cta}
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ B. PILLARS ══════════════════════════════ */}
      <section style={{ background:"#fff", padding:"110px 24px", borderTop:"1px solid #EBEBF0" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color:"#A1A1A6", letterSpacing:"3px", textTransform:"uppercase", marginBottom:64 }}>
              What We Stand For
            </p>
          </ScrollReveal>
          {[
            { n:"01", title:"Openness",   desc:"Every article is accessible to everyone — no account, no payment, no barrier between curiosity and knowledge." },
            { n:"02", title:"Velocity",   desc:"From idea to published in under 60 seconds. We remove friction so great ideas reach the world faster." },
            { n:"03", title:"Breadth",    desc:"12 technology domains under one roof. The full spectrum from silicon to software to cloud." },
            { n:"04", title:"Community",  desc:"Built by developers, designers, and engineers sharing real knowledge — not press releases or marketing copy." },
          ].map((item, i) => (
            <motion.div key={item.n}
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }}
              transition={{ duration:0.55, delay:i*0.07, ease:[0.16,1,0.3,1] }}
            >
              <div
                className="pillar-row"
                style={{ display:"grid", gridTemplateColumns: isMobile ? "40px 1fr" : "60px 1fr 1fr", gap: isMobile ? "16px" : 32, alignItems:"center", padding:"28px 0", borderTop:"1px solid #EBEBF0", transition:"background 0.2s", borderRadius:4, cursor:"default" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="#FAFAFA"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; }}
              >
                <span style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:700, color:"#C8C8D0", letterSpacing:"1.5px" }}>{item.n}</span>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,2.8vw,34px)", fontWeight:700, color:"#0A0A0F", letterSpacing:"-0.7px", margin:0 }}>{item.title}</h3>
                {!isMobile && <p style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"#6E6E73", lineHeight:1.85, margin:0 }}>{item.desc}</p>}
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop:"1px solid #EBEBF0" }}/>
        </div>
      </section>

      {/* ══ 10. COMMUNITY (one blue accent section) ═ */}
            <section style={{ background:"#010122", padding:"120px 24px", position:"relative", overflow:"hidden" }}>
        {/* grid pattern */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"64px 64px", pointerEvents:"none" }}/>
        {/* glow */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:400, background:"radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents:"none" }}/>

        <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <ScrollReveal direction="up">
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, padding:"6px 16px", marginBottom:32 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#34D399", display:"inline-block", boxShadow:"0 0 8px #34D399" }}/>
              <span style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.6)", letterSpacing:"1.5px", textTransform:"uppercase" }}>Open Community</span>
            </div>

            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(32px,5vw,60px)", fontWeight:700, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.06, marginBottom:20 }}>
              Your knowledge<br/>
              <span style={{ color:"rgba(255,255,255,0.35)" }}>belongs here.</span>
            </h2>

            <p style={{ fontFamily:"var(--font-sans)", fontSize:17, color:"rgba(255,255,255,0.45)", lineHeight:1.8, maxWidth:500, margin:"0 auto 48px" }}>
              Join thousands of developers sharing tutorials, insights, and breakthroughs — no account, no friction, no cost.
            </p>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, flexWrap:"wrap", marginBottom:64 }}>
              <a href="/new" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"#fff", color:"#010048", fontFamily:"var(--font-sans)", fontSize:14, fontWeight:700, textDecoration:"none", borderRadius:100, transition:"opacity 0.15s, transform 0.15s", letterSpacing:"-0.2px" }}
                onMouseEnter={e=>{ e.currentTarget.style.opacity="0.9"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
                Start Writing
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/blog" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"transparent", color:"rgba(255,255,255,0.65)", border:"1px solid rgba(255,255,255,0.15)", fontFamily:"var(--font-sans)", fontSize:14, fontWeight:500, textDecoration:"none", borderRadius:100, transition:"border-color 0.18s, color 0.18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.4)"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.color="rgba(255,255,255,0.65)"; }}>
                Browse Articles
              </a>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:32, flexWrap:"wrap" }}>
              {[["12+","Topic categories"],["100%","Free forever"],["60s","To publish"]].map(([val,lbl])=>(
                <div key={lbl} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:700, color:"#fff", letterSpacing:"-0.8px", lineHeight:1 }}>{val}</div>
                  <div style={{ fontFamily:"var(--font-sans)", fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ C. SIGNAL LINES ════════════════════════ */}
      <div style={{ background:"#fff", padding:"72px 0", overflow:"hidden", borderTop:"1px solid #EBEBF0", borderBottom:"1px solid #EBEBF0" }}>
        {[
          { items:["AI & Machine Learning","Web Development","Cybersecurity","Cloud Computing","Mobile Dev","Data Science"], reverse:false, speed:"50s", color:"#010122" },
          { items:["Open Source","DevOps","UI & UX Design","Tech & Startups","Hardware & IoT","Programming"],                reverse:true,  speed:"40s", color:"#D2D2D7" },
        ].map((row, ri) => (
          <div key={ri} style={{ overflow:"hidden", padding:"8px 0" }}>
            <div className={row.reverse ? "marquee-track-reverse" : "marquee-track"} style={{ animationDuration: row.speed }}>
              {[...row.items, ...row.items, ...row.items].map((item, i) => (
                <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:20, flexShrink:0 }}>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:"clamp(30px,4.2vw,52px)", fontWeight:700, color: row.color, letterSpacing:"-1.2px", whiteSpace:"nowrap", paddingRight:20 }}>
                    {item}
                  </span>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"#E2E2EA", flexShrink:0, marginRight:20 }}/>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ══ 11. TOPICS EXPLORER ════════════════════ */}
            <section style={{ background:"#fff", borderTop:"1px solid #EBEBF0", padding:"90px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:44, gap:16, flexWrap:"wrap" }}>
              <div>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:700, color:"#010048", letterSpacing:"2.5px", textTransform:"uppercase", marginBottom:10 }}>Topics</p>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,3vw,36px)", fontWeight:700, color:"#0A0A0F", letterSpacing:"-0.8px", lineHeight:1.1 }}>Explore by Topic</h2>
              </div>
              <a href="/topics" style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--font-sans)", fontSize:13, fontWeight:600, color:"#010048", textDecoration:"none", borderBottom:"1.5px solid rgba(1,0,72,0.2)", paddingBottom:2, transition:"border-color 0.18s, gap 0.2s", whiteSpace:"nowrap" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="#010048"; e.currentTarget.style.gap="10px"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(1,0,72,0.2)"; e.currentTarget.style.gap="6px"; }}>
                View all topics
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </ScrollReveal>
          <StaggerContainer style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {[
              { label:"AI & Machine Learning", href:"/blog?category=ai"          },
              { label:"Web Development",        href:"/blog?category=web"         },
              { label:"Cloud & DevOps",         href:"/blog?category=cloud"       },
              { label:"Cybersecurity",          href:"/blog?category=security"    },
              { label:"Mobile Development",     href:"/blog?category=mobile"      },
              { label:"Data Science",           href:"/blog?category=data"        },
              { label:"Open Source",            href:"/blog?category=opensource"  },
              { label:"Programming",            href:"/blog?category=programming" },
              { label:"UI & UX Design",         href:"/blog?category=ux"          },
              { label:"Tech & Startups",        href:"/blog?category=startup"     },
              { label:"Hardware & IoT",         href:"/blog?category=hardware"    },
              { label:"DevOps",                 href:"/blog?category=devops"      },
            ].map(tag => (
              <StaggerItem key={tag.label}>
                <a href={tag.href} style={{ display:"inline-flex", alignItems:"center", padding:"10px 20px", background:"#F5F5F8", border:"1px solid transparent", borderRadius:100, fontFamily:"var(--font-sans)", fontSize:13, fontWeight:500, color:"#3A3A4A", textDecoration:"none", transition:"all 0.18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#010048"; e.currentTarget.style.color="#fff"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#F5F5F8"; e.currentTarget.style.color="#3A3A4A"; e.currentTarget.style.transform="none"; }}>
                  {tag.label}
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══ E. READING PATHS ════════════════════════ */}
      <section style={{ background:"#010122", padding: isMobile ? "72px 16px" : "110px 24px", position:"relative", overflow:"hidden" }}>
        {/* grid overlay */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"56px 56px", pointerEvents:"none" }}/>
        {/* radial glow */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:500, background:"radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1120, margin:"0 auto", position:"relative", zIndex:1 }}>
          <ScrollReveal direction="up">
            <div style={{ display:"flex", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", justifyContent:"space-between", gap:24, marginBottom:56 }}>
              <div>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.3)", letterSpacing:"3px", textTransform:"uppercase", marginBottom:14 }}>Curated</p>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3.5vw,42px)", fontWeight:700, color:"#fff", letterSpacing:"-1px", lineHeight:1.1, margin:0 }}>Reading paths</h2>
              </div>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"rgba(255,255,255,0.35)", maxWidth:300, lineHeight:1.85, margin:0 }}>
                Hand-curated collections for every level and domain of tech.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap:1, background:"rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
            {[
              { tag:"Beginner",     accent:"#9f9f9f", title:"Start with AI",    desc:"Ground-up foundations in machine learning, from basic concepts to your first working model.", topics:["What is Machine Learning?","Neural Networks Explained","Python for AI Beginners","Your First ML Model"], href:"/blog?category=ai"       },
              { tag:"Intermediate", accent:"#9f9f9f", title:"Master the Web",   desc:"Modern full-stack patterns, architecture decisions, and deployment from zero to production.",  topics:["Modern React Patterns","Node.js Architecture","REST vs GraphQL","Deploying Full-Stack Apps"],  href:"/blog?category=web"      },
              { tag:"Advanced",     accent:"#9f9f9f", title:"Cloud at Scale",   desc:"Production-grade cloud architecture, container orchestration, and distributed systems.",         topics:["Kubernetes in Production","Microservices Design","CI/CD Pipelines","Distributed Systems 101"], href:"/blog?category=cloud"    },
            ].map((path, i) => (
              <ScrollReveal key={i} direction="up">
                <div
                  style={{ padding: isMobile ? "36px 28px" : "44px 36px", background:"#010133", height:"100%", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden", transition:"background 0.22s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#010144"}
                  onMouseLeave={e=>e.currentTarget.style.background="#010133"}
                >
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:path.accent, opacity:0.8 }}/>
                  <span style={{ fontFamily:"var(--font-sans)", fontSize:10, fontWeight:700, color:path.accent, letterSpacing:"2px", textTransform:"uppercase", background:`${path.accent}18`, borderRadius:100, padding:"5px 14px", alignSelf:"flex-start", marginBottom:28 }}>{path.tag}</span>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,2.2vw,26px)", fontWeight:700, color:"#fff", letterSpacing:"-0.5px", marginBottom:12, lineHeight:1.2 }}>{path.title}</h3>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:13, color:"rgba(255,255,255,0.28)", lineHeight:1.8, marginBottom:28 }}>{path.desc}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:10, flexGrow:1, marginBottom:32 }}>
                    {path.topics.map((t, ti) => (
                      <div key={ti} style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ width:3, height:3, borderRadius:"50%", background:"rgba(255,255,255,0.18)", flexShrink:0 }}/>
                        <span style={{ fontFamily:"var(--font-sans)", fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <a href={path.href}
                    style={{ display:"inline-flex", alignItems:"center", gap:7, fontFamily:"var(--font-sans)", fontSize:12, fontWeight:600, color:path.accent, textDecoration:"none", transition:"gap 0.2s" }}
                    onMouseEnter={e=>e.currentTarget.style.gap="12px"}
                    onMouseLeave={e=>e.currentTarget.style.gap="7px"}>
                    Begin exploring
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:"#F8F8FB", borderTop:"1px solid #EBEBF0", padding: isMobile ? "60px 16px" : "100px 24px" }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <ScrollReveal direction="up">
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:0, borderRadius:24, overflow:"hidden", border:"1px solid #E2E2EA", boxShadow:"0 4px 32px rgba(0,0,0,0.06)" }} className="community-grid">
              {/* Left */}
              <div style={{ padding: isMobile ? "40px 28px" : "60px 56px", background:"#fff", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3vw,38px)", fontWeight:700, color:"#0A0A0F", letterSpacing:"-1px", lineHeight:1.1, marginBottom:16 }}>
                  Stay in the loop
                </h2>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:15, color:"#6E6E73", lineHeight:1.8, marginBottom:0, maxWidth:320 }}>
                  Weekly digest of the best tech articles — curated, concise, and completely free.
                </p>
              </div>
              {/* Right */}
              <div style={{ padding: isMobile ? "40px 28px" : "60px 56px", background:"#F8F8FB", display:"flex", flexDirection:"column", justifyContent:"center", gap:20 }}>
                {[
                  { icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#010048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text:"Handpicked articles every week" },
                  { icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#010048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text:"No spam, unsubscribe anytime" },
                  { icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#010048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, text:"100% free, always" },
                ].map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:28, height:28, borderRadius:8, background:"rgba(1,0,72,0.07)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{item.icon}</div>
                    <span style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"#3A3A4A", fontWeight:500 }}>{item.text}</span>
                  </div>
                ))}
                <a href="/newsletter" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", background:"#010048", color:"#fff", fontFamily:"var(--font-sans)", fontSize:13, fontWeight:700, textDecoration:"none", borderRadius:100, alignSelf:"flex-start", marginTop:8, transition:"opacity 0.18s, transform 0.18s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
                  Subscribe — It&apos;s Free
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ F. FAQ ════════════════════════════════ */}
      <FAQSection isMobile={isMobile}/>

    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTION COMPONENTS
══════════════════════════════════════════════ */

/* ── FAQ ────────────────────────────────────── */
function FAQSection({ isMobile }) {
  const [open, setOpen] = useState(null);
  const items = [
    { q:"Is TechSphere really free?",                a:"Yes, completely. Reading, writing, and browsing are all 100% free — no subscription, no paywall, no hidden tier, ever." },
    { q:"Do I need an account to read articles?",    a:"No. Every article is openly accessible to anyone with a browser. No login, no signup, no friction of any kind." },
    { q:"How do I publish an article?",              a:"Click 'Write a Post', add a title, write your content, and optionally attach a cover image. Hit publish — the whole process takes under 60 seconds." },
    { q:"What topics are covered on TechSphere?",    a:"TechSphere covers 12 major tech domains: AI & ML, Web Development, Cloud & DevOps, Cybersecurity, Mobile Dev, Data Science, Open Source, Programming, UI/UX Design, Tech & Startups, Hardware & IoT, and DevOps." },
    { q:"Can anyone write on TechSphere?",           a:"Yes. We believe great knowledge comes from practitioners. Any developer, designer, or engineer can share tutorials, insights, or breakthroughs — no account approval required." },
    { q:"How does TechSphere sustain itself?",       a:"TechSphere is built lean and mission-first. We keep infrastructure costs low and our goal clear: open knowledge as a public good, free and independent." },
  ];
  return (
    <section style={{ background:"#fff", padding: isMobile ? "72px 16px" : "110px 24px", borderTop:"1px solid #EBEBF0" }}>
      <div style={{ maxWidth:1120, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 48 : 80, alignItems:"start" }}>
        {/* Left label */}
        <ScrollReveal direction="up">
          <p style={{ fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, color:"#A1A1A6", letterSpacing:"3px", textTransform:"uppercase", marginBottom:16 }}>FAQ</p>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3.2vw,40px)", fontWeight:700, color:"#0A0A0F", letterSpacing:"-1px", lineHeight:1.1, marginBottom:18 }}>Common<br/>questions</h2>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:15, color:"#6E6E73", lineHeight:1.8, marginBottom:28, maxWidth:260 }}>
            Everything you need to know about TechSphere.
          </p>
          <a href="/blog"
            style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--font-sans)", fontSize:13, fontWeight:600, color:"#010048", textDecoration:"none", borderBottom:"1.5px solid rgba(1,0,72,0.2)", paddingBottom:2, transition:"border-color 0.18s, gap 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="#010048"; e.currentTarget.style.gap="10px"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(1,0,72,0.2)"; e.currentTarget.style.gap="6px"; }}>
            Browse articles instead
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </ScrollReveal>
        {/* Right accordion */}
        <div>
          {items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:8 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.4, delay:i*0.04 }}
            >
              <div style={{ borderTop:"1px solid #EBEBF0" }}>
                <button
                  onClick={()=>setOpen(open===i ? null : i)}
                  style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"22px 0", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
                >
                  <span style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color: open===i ? "#010048" : "#0A0A0F", lineHeight:1.4, transition:"color 0.18s" }}>
                    {item.q}
                  </span>
                  <span style={{ width:26, height:26, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.22s", background: open===i ? "#010048" : "#F5F5F8", border: open===i ? "none" : "1.5px solid #E8E8ED" }}>
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" style={{ transform: open===i ? "rotate(180deg)" : "none", transition:"transform 0.22s" }}>
                      <path d="M6 9l6 6 6-6" stroke={open===i ? "#fff" : "#A1A1A6"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open===i ? "auto" : 0, opacity: open===i ? 1 : 0 }}
                  transition={{ duration:0.32, ease:[0.16,1,0.3,1] }}
                  style={{ overflow:"hidden" }}
                >
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:14, color:"#6E6E73", lineHeight:1.9, paddingBottom:22, margin:0 }}>{item.a}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop:"1px solid #EBEBF0" }}/>
        </div>
      </div>
    </section>
  );
}

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
        style={{ display:"block", width:"100%", height:"100%", textDecoration:"none", borderRadius:14, overflow:"hidden", position:"relative", userSelect:"none" }}>
        <img src={cat.image} alt={cat.label} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity: hov?0.85:1, transform: hov?"scale(1.06)":"scale(1)", transition:"transform 0.55s ease, opacity 0.3s ease" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(1,0,72,0.85) 100%)" }}/>
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
