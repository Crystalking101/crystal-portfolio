"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ── Design tokens ─────────────────────────────────────────────── */
const FOREST  = "#1E3F2F";
const GOLD    = "#C9A84C";
const SAGE    = "#D4ECD8";
const CREAM   = "#FAF7F1";
const INK     = "#1A1A18";
const MUTED   = "#6B6558";
const BORDER  = "rgba(30,63,47,0.12)";

const iconStroke = { stroke: FOREST, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function FeatureIcon({ id }: { id: string }) {
  const size = 28;
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (id) {
    case "ai":
      return (
        <svg {...common}>
          <rect {...iconStroke} x="4" y="4" width="16" height="16" rx="2" />
          <path {...iconStroke} d="M9 9h6M9 12h6M9 15h4" />
        </svg>
      );
    case "friction":
      return (
        <svg {...common}>
          <path {...iconStroke} d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path {...iconStroke} d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "community":
      return (
        <svg {...common}>
          <path {...iconStroke} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect {...iconStroke} x="3" y="4" width="18" height="18" rx="2" />
          <path {...iconStroke} d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path {...iconStroke} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle {...iconStroke} cx="18" cy="5" r="3" />
          <circle {...iconStroke} cx="6" cy="12" r="3" />
          <circle {...iconStroke} cx="18" cy="19" r="3" />
          <path {...iconStroke} d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Small shared helpers ─────────────────────────────────────── */
function Tag({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "11px",
      letterSpacing: "3px",
      textTransform: "uppercase" as const,
      color: GOLD,
      display: "block",
      marginBottom: "14px",
    }}>{children}</span>
  );
}

function SectionH2({ children }: { children: string }) {
  return (
    <h2 style={{
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontSize: "clamp(32px, 5vw, 48px)",
      fontWeight: 400,
      color: FOREST,
      letterSpacing: "-1px",
      lineHeight: 1.1,
      marginBottom: "24px",
    }}>{children}</h2>
  );
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontSize: "17px",
      color: MUTED,
      lineHeight: 1.8,
      marginBottom: "18px",
      maxWidth: "680px",
      ...style,
    }}>{children}</p>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: BORDER, margin: "0 0 64px" }} />;
}

/* ── Sidebar card ─────────────────────────────────────────────── */
function SidebarCard() {
  const rows = [
    { label: "Role",           value: "Product Manager & Builder" },
    { label: "Timeline",       value: "1 Week, 0 to Launch" },
    { label: "Operating Cost", value: "$0 / month" },
    { label: "Type",           value: "Side Project" },
  ];
  const stack = [
    "React + Vite", "Supabase", "OpenRouter AI",
    "Vercel", "Google Analytics", "Google Search Console",
  ];

  return (
    <div style={{
      background: "#FFFFFF",
      border: `2px solid ${FOREST}`,
      borderRadius: "12px",
      padding: "28px",
      boxShadow: "0 4px 20px rgba(30,63,47,0.1)",
    }}>
      {rows.map((row) => (
        <div key={row.label} style={{ marginBottom: "16px" }}>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", color: "#BBB", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "4px" }}>
            {row.label}
          </p>
          <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "13px", fontWeight: 500, color: INK }}>
            {row.value}
          </p>
        </div>
      ))}

      <div style={{ height: "1px", background: "#E8E6E1", margin: "20px 0" }} />

      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", color: "#BBB", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "12px" }}>Stack</p>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px", marginBottom: "20px" }}>
        {stack.map((tag) => (
          <span key={tag} style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "11px",
            padding: "4px 10px",
            borderRadius: "20px",
            border: `1px solid rgba(30,63,47,0.25)`,
            color: FOREST,
            background: "rgba(212,236,216,0.3)",
          }}>{tag}</span>
        ))}
      </div>

      <div style={{ height: "1px", background: "#E8E6E1", margin: "20px 0" }} />

      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", color: "#BBB", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "8px" }}>Live Product</p>
      <a
        href="https://fintips.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "14px", fontWeight: 500, color: FOREST, textDecoration: "none" }}
      >
        fintips.vercel.app ↗
      </a>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function FinTipsPage() {
  const isMobile = useIsMobile();

  const metrics = [
    { num: "1", unit: "wk",  label: "Zero to live product" },
    { num: "8", unit: "+",   label: "Core features shipped" },
    { num: "100", unit: "",  label: "Curated financial facts" },
    { num: "$0", unit: "",   label: "Monthly operating cost" },
  ];

  const features = [
    { iconId: "ai" as const, title: "AI Personalization",   desc: "A 3-question quiz feeds into an AI model to generate personalized tips tailored to each user's goals and situation." },
    { iconId: "friction" as const, title: "Zero Friction",         desc: "No sign-up, no account, no tracking. Users get value immediately, the fastest path from problem to advice." },
    { iconId: "community" as const, title: "Community Tips",        desc: "Users can submit, like, and filter advice from real people, creating a community-driven layer of trust that AI alone can't provide." },
    { iconId: "calendar" as const, title: "Daily Tip",             desc: "A new featured financial fact surfaces every day, giving users a reason to return and creating a daily engagement loop." },
    { iconId: "shield" as const, title: "Content Moderation",   desc: "Report system and hidden admin panel keep the community feed safe and high quality without requiring user accounts." },
    { iconId: "share" as const, title: "Shareable Cards",       desc: "Every tip generates a branded downloadable image for social sharing, turning users into organic distribution channels." },
  ];

  const processSteps = [
    { num: "01 —", title: "Problem definition & market research",      body: "Mapped the landscape of financial advice apps. Identified the core gap: existing solutions were either too generic, too expensive, or required too much commitment before delivering value. Defined the north star: get users to real, personalized advice in under 60 seconds." },
    { num: "02 —", title: "Product strategy & feature prioritization", body: "Scoped the MVP using a ruthless prioritization framework. Decided what to build first (AI personalization + zero-friction flow), what to build second (community + sharing), and what to leave for later. Every feature decision tied back to reducing friction or increasing trust." },
    { num: "03 —", title: "UX design & user flow",                     body: "Designed the full user experience — homepage, quiz flow, advice screen, financial facts, community feed, and write advice screens. Established the design system: cream/forest green/gold palette, editorial typography, clean sharp feel." },
    { num: "04 —", title: "Build & iterate",                           body: "Directed the full technical build using React, Supabase, and OpenRouter AI. Shipped 8 core features, fixed bugs in real time, and made UX decisions throughout — icon quiz cards, progress bar animations, image-based sharing, and a hidden admin panel for content moderation." },
    { num: "05 —", title: "Launch & growth",                           body: "Deployed to Vercel at fintips.vercel.app, connected Google Analytics, submitted to Google Search Console for SEO indexing, and implemented Open Graph meta tags so every shared link generates a branded preview card on social platforms." },
  ];

  const learnings = [
    { bold: "Speed of decision-making is a competitive advantage:", body: " With no approval cycles, I could test ideas, kill them, and move on in hours. This sharpened my instinct for what matters and what doesn't." },
    { bold: "Friction is the real product problem:", body: " The biggest drop-off risk wasn't bad advice — it was users not reaching the advice at all. Every design decision was filtered through one question: does this make it faster or slower to get value?" },
    { bold: "API reliability matters more than features:", body: " Early issues with AI API rate limits and key exposure taught me that infrastructure stability is a product problem, not just an engineering problem. I rebuilt the API architecture to be resilient before adding more features." },
    { bold: "Retention requires a reason to return:", body: " After receiving feedback that the app lacked a daily engagement loop, I shipped the Daily Tip feature — a date-based tip that rotates every midnight, giving users a reason to come back without requiring accounts or notifications." },
    { bold: "Distribution is a product feature:", body: " Building shareable image cards for every tip turned sharing into a feature and not an afterthought, making every user a potential distribution channel for the product." },
  ];

  const problemPoints = [
    { bold: "Advice isn't personalized:", body: " A 22-year-old trying to build credit needs different guidance than a 35-year-old paying off a mortgage, but most apps treat them the same." },
    { bold: "Trust is a barrier:", body: " People don't trust advice from brands with a financial incentive to sell them products. Community-sourced advice from real people feels more credible." },
    { bold: "Friction kills behavior change:", body: " Sign-ups, account creation, and paywalls all create friction before users get any value. Most people drop off before they start." },
  ];

  return (
    <>
      <Nav />
      <main style={{ flex: 1, background: CREAM }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section style={{
          background: FOREST,
          padding: isMobile ? "32px 24px 64px" : "48px 48px 100px",
          position: "relative",
          overflow: "hidden",
          minHeight: isMobile ? "auto" : "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />


          <div style={{ marginTop: isMobile ? "52px" : "80px", position: "relative", zIndex: 1 }}>
            <h1 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: isMobile ? "44px" : "clamp(48px, 6vw, 72px)",
              fontWeight: 400,
              color: CREAM,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              marginBottom: "0px",
            }}>
              <span style={{ fontSize: isMobile ? "64px" : "clamp(72px, 10vw, 120px)", letterSpacing: "-3px", display: "block", marginBottom: isMobile ? "24px" : "52px" }}>Fin<em style={{ fontStyle: "italic", color: GOLD }}>Tips</em></span>
              <span style={{ display: "block" }}>Money advice <em style={{ fontStyle: "italic", color: CREAM }}>made</em> for you by you</span>
            </h1>

            {/* Metrics row — gold dividers */}
            <div style={{
              display: "flex",
              flexWrap: "wrap" as const,
              gap: "0",
              marginTop: isMobile ? "48px" : "140px",
            }}>
              {[
                { num: "1",   unit: "wk",  label: "Zero to live product"   },
                { num: "8",   unit: "+",   label: "Core features shipped"  },
                { num: "100", unit: "",    label: "Curated financial facts" },
                { num: "$0",  unit: "",    label: "Monthly operating cost" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "stretch",
                }}>
                  {i > 0 && (
                    <div style={{ width: "1px", background: GOLD, opacity: 0.4, margin: "0 28px", flexShrink: 0 }} />
                  )}
                  <div style={{ paddingRight: i < 3 ? "0" : "0" }}>
                    <div style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: isMobile ? "40px" : "64px",
                      fontWeight: 700,
                      color: CREAM,
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}>
                      {s.num}<span style={{ fontSize: isMobile ? "22px" : "32px", color: GOLD }}>{s.unit}</span>
                    </div>
                    <div style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: "12px",
                      color: "rgba(212,236,216,0.6)",
                      letterSpacing: "0.2px",
                      lineHeight: 1.5,
                    }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── CONTENT + SIDEBAR ────────────────────────────────── */}
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: isMobile ? "48px 24px 80px" : "64px 48px 80px",
          display: isMobile ? "block" : "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "64px",
          alignItems: "start",
        }}>

          {/* Sidebar — desktop */}
          {!isMobile && (
            <aside style={{ position: "sticky", top: "96px" }}>
              <SidebarCard />
            </aside>
          )}

          {/* Main content */}
          <div>

            {/* Sidebar — mobile */}
            {isMobile && (
              <div style={{ marginBottom: "40px" }}>
                <SidebarCard />
              </div>
            )}

            {/* ── OVERVIEW ──────────────────────────────────────── */}
            <section id="overview" style={{ marginBottom: "64px" }}>
              <Tag>Overview</Tag>
              <SectionH2>What is FinTips?</SectionH2>
              <Body>
                FinTips is a <strong style={{ color: INK, fontWeight: 600 }}>free, anonymous, AI-powered financial advice web app</strong> that gives users personalized money tips based on their goals, with no sign-up, no tracking, and no cost.
              </Body>
              <Body>
                I built it independently from concept to live product in one week, owning every part of the process: problem identification, product strategy, UX design, and directing the full technical build.
              </Body>

            </section>

            <Divider />

            {/* ── PROBLEM ───────────────────────────────────────── */}
            <section id="problem" style={{ marginBottom: "64px" }}>
              <Tag>Problem</Tag>
              <SectionH2>Most people can&apos;t access good financial advice</SectionH2>
              <Body>
                With today&apos;s economic conditions financial advisors are expensive, generic apps give the same tips to everyone, and most financial platforms require sign-ups, push subscriptions, or hide their best content behind paywalls.
              </Body>
              <Body>
                Fintips are for people who need financial guidance the most, including those just starting out, rebuilding credit, or trying to pay off debt, are the least likely to get clear and actionable help.
              </Body>

              {/* Problem quote box */}
              <div style={{
                background: FOREST,
                padding: isMobile ? "32px 28px" : "56px",
                margin: "40px 0",
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
              }}>
                <div style={{
                  position: "absolute", right: "32px", top: "-24px",
                  fontFamily: "Georgia, serif", fontSize: "200px", fontStyle: "italic",
                  color: "rgba(255,255,255,0.04)", lineHeight: 1, pointerEvents: "none",
                }}>"</div>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: isMobile ? "20px" : "28px",
                  fontStyle: "italic",
                  color: "rgba(250,247,241,0.9)",
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: "600px",
                  position: "relative",
                  zIndex: 1,
                }}>
                  "Most financial advice is either{" "}
                  <em style={{ color: GOLD, fontStyle: "normal" }}>too generic</em>
                  {" "}or locked behind a paywall. There had to be a better way."
                </p>
              </div>

              <Body style={{ marginBottom: "24px" }}>I identified three specific user pain points driving this gap:</Body>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {problemPoints.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "8px", height: "8px", background: GOLD, flexShrink: 0, marginTop: "9px" }} />
                    <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "17px", color: INK, lineHeight: 1.7, margin: 0 }}>
                      <strong style={{ color: FOREST }}>{p.bold}</strong>{p.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── SOLUTION + FEATURES ───────────────────────────── */}
            <section id="solution" style={{ marginBottom: "64px" }}>
              <Tag>Solution</Tag>
              <SectionH2>Personalized. Anonymous. Community-powered.</SectionH2>
              <Body>
                FinTips makes financial guidance easy to access with no sign-up, no tracking, and no cost. It&apos;s just real advice personalized by AI and shaped by community insight.
              </Body>
              <Body>
                The core user flow is intentionally frictionless: answer <strong style={{ color: INK }}>3 quick questions</strong> about your financial goal → get <strong style={{ color: INK }}>AI-generated advice</strong> tailored to your exact situation → browse <strong style={{ color: INK }}>100 curated financial facts</strong> and real tips from the community.
              </Body>

              {/* Features grid */}
              <div id="features" style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: "2px",
                margin: "40px 0",
                background: BORDER,
              }}>
                {features.map((f) => (
                  <div key={f.title} style={{
                    background: "#FFFFFF",
                    padding: "28px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = SAGE)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                  >
                    <div style={{ marginBottom: "14px", display: "flex", alignItems: "center" }}>
                      <FeatureIcon id={f.iconId} />
                    </div>
                    <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 700, color: FOREST, marginBottom: "8px" }}>{f.title}</h3>
                    <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "14px", color: MUTED, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── PROCESS ───────────────────────────────────────── */}
            <section id="process" style={{ marginBottom: "64px" }}>
              <Tag>Process</Tag>
              <SectionH2>From idea to live in one week</SectionH2>
              <Body>
                I owned the full product lifecycle — from identifying the problem to shipping a live, production-ready product. Here&apos;s how the week unfolded:
              </Body>

              <div style={{ margin: "40px 0" }}>
                {processSteps.map((s, i) => (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "72px 1fr",
                    gap: isMobile ? "8px" : "32px",
                    padding: "36px 0",
                    borderBottom: i < processSteps.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}>
                    <p style={{ fontFamily: "Inter, system-ui, monospace", fontSize: "12px", color: GOLD, fontWeight: 500, paddingTop: "4px" }}>{s.num}</p>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "22px", color: FOREST, marginBottom: "10px", letterSpacing: "-0.3px" }}>{s.title}</h3>
                      <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "16px", color: MUTED, lineHeight: 1.75, margin: 0 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── LEARNINGS ─────────────────────────────────────── */}
            <section id="learnings" style={{ marginBottom: "80px" }}>
              <Tag>Learnings</Tag>
              <SectionH2>What building this taught me</SectionH2>
              <Body>
                Shipping a real product end-to-end, outside of a corporate environment, forced me to make decisions faster and with fewer resources than any role I&apos;ve held. Here&apos;s what stood out:
              </Body>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "32px" }}>
                {learnings.map((l, i) => (
                  <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ width: "8px", height: "8px", background: GOLD, flexShrink: 0, marginTop: "8px" }} />
                    <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "17px", color: INK, lineHeight: 1.7, margin: 0 }}>
                      <strong style={{ color: FOREST }}>{l.bold}</strong>{l.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section style={{
          background: FOREST,
          padding: isMobile ? "64px 24px" : "100px 48px",
          textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: isMobile ? "40px" : "clamp(40px, 5vw, 64px)",
            fontWeight: 400,
            color: CREAM,
            letterSpacing: "-1px",
            marginBottom: "16px",
          }}>See it live</h2>
          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "18px",
            color: "rgba(212,236,216,0.8)",
            marginBottom: "40px",
          }}>
            Free, anonymous, and working right now. Try the full experience in under 60 seconds.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://fintips.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: GOLD, color: FOREST,
                fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 700,
                padding: "16px 36px", textDecoration: "none", display: "inline-block",
                borderRadius: "4px",
              }}
            >Try FinTips →</a>
            <a
              href="mailto:crystalking101@gmail.com"
              style={{
                background: "transparent", color: CREAM,
                fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 600,
                padding: "16px 36px", textDecoration: "none", display: "inline-block",
                border: "1.5px solid rgba(250,247,241,0.3)", borderRadius: "4px",
              }}
            >Get in touch</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
