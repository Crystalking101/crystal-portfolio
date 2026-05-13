"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyCtaBand from "@/components/CaseStudyCtaBand";
import { useInPageNavActive } from "@/hooks/useInPageNavActive";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ── Design tokens ─────────────────────────────────────────────── */
const FOREST  = "#1E3F2F";
const GOLD    = "#C9A84C";
const SAGE    = "#D4ECD8";
const CREAM   = "#FAF7F1";
const INK     = "#1A1A18";
const MUTED   = "#6B6558";
const BORDER  = "rgba(30,63,47,0.12)";

/** Sticky site nav (~56–72px) + FinTips bar height; keeps in-page anchors from hiding under sticky headers. */
const FINTIPS_SCROLL_MARGIN = "120px";

/** Y from viewport top: section tops above this count as “passed” for sub-nav scroll-spy. */
const FINTIPS_NAV_ACTIVATION_PX = { mobile: 108, desktop: 118 } as const;

/**
 * FinTips sub-nav anchors + scroll-spy. `href` must match a section `id` on this page.
 * Keep list order top-to-bottom. Tune `FINTIPS_NAV_ACTIVATION_PX` if the active state feels early/late.
 */
const FINTIPS_SUBNAV: { href: string; label: string }[] = [
  { href: "#problem", label: "Problem" },
  { href: "#market-insights", label: "Market" },
  { href: "#competitive-landscape", label: "Competitive" },
  { href: "#primary-persona", label: "Persona" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#learnings", label: "Learnings" },
];

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

/** Overview stats row — large forest numerals, muted labels, light vertical dividers (matches hero metrics look). */
function OverviewStatsRow({ isMobile }: { isMobile: boolean }) {
  const numSize = isMobile ? "36px" : "52px";
  const unitSize = isMobile ? "20px" : "28px";

  const blocks = [
    {
      key: "wk",
      label: "Zero to live product",
      value: (
        <>
          <span style={{ fontSize: numSize }}>1</span>
          <span style={{ fontSize: unitSize, fontWeight: 700 }}>wk</span>
        </>
      ),
    },
    {
      key: "8",
      label: "Core features shipped",
      value: (
        <>
          <span style={{ fontSize: numSize }}>8</span>
          <span style={{ fontSize: unitSize, fontWeight: 700 }}>+</span>
        </>
      ),
    },
    {
      key: "100",
      label: "Curated financial facts",
      value: <span style={{ fontSize: numSize }}>100</span>,
    },
    {
      key: "0",
      label: "Monthly operating cost",
      value: (
        <span style={{ fontSize: numSize, fontVariantNumeric: "slashed-zero" }}>$0</span>
      ),
    },
  ];

  return (
    <div style={{
      display: "flex",
      flexWrap: isMobile ? ("wrap" as const) : "nowrap",
      alignItems: "stretch",
      rowGap: isMobile ? "24px" : undefined,
      columnGap: 0,
      marginTop: "28px",
      marginBottom: "4px",
      maxWidth: "720px",
    }}>
      {blocks.map((b, i) => (
        <div key={b.key} style={{ display: "flex", alignItems: "stretch" }}>
          {i > 0 && (
            <div style={{
              width: "1px",
              background: BORDER,
              alignSelf: "stretch",
              margin: isMobile ? "0 20px 0 0" : "0 28px",
              flexShrink: 0,
            }} />
          )}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: isMobile ? "calc(50% - 12px)" : "auto",
          }}>
            <div style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              color: FOREST,
              lineHeight: 1,
              marginBottom: "10px",
              display: "flex",
              alignItems: "baseline",
              gap: "2px",
            }}>
              {b.value}
            </div>
            <div style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              color: MUTED,
              letterSpacing: "0.2px",
              lineHeight: 1.45,
              maxWidth: "148px",
            }}>{b.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: BORDER, margin: "0 0 64px" }} />;
}

function FinTipsSubNav({ isMobile }: { isMobile: boolean }) {
  const navTop = isMobile ? 56 : 64;
  const activationPx = isMobile ? FINTIPS_NAV_ACTIVATION_PX.mobile : FINTIPS_NAV_ACTIVATION_PX.desktop;
  const activeHref = useInPageNavActive(
    FINTIPS_SUBNAV.map((item) => item.href),
    activationPx,
  );

  const linkRow = (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "2px" : "6px",
      minWidth: 0,
      justifyContent: isMobile ? "flex-start" : "center",
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "thin",
    }}
    >
      {FINTIPS_SUBNAV.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "location" : undefined}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: isMobile ? "12px" : "14px",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? FOREST : MUTED,
              background: isActive ? "rgba(212,236,216,0.45)" : "transparent",
              textDecoration: "none",
              padding: isMobile ? "8px 10px" : "10px 12px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = FOREST;
              e.currentTarget.style.background = "rgba(212,236,216,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isActive ? FOREST : MUTED;
              e.currentTarget.style.background = isActive ? "rgba(212,236,216,0.45)" : "transparent";
            }}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );

  const cta = (
    <a
      href="https://fintips.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flexShrink: 0,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: isMobile ? "12px" : "14px",
        fontWeight: 700,
        color: "#FFFFFF",
        background: FOREST,
        textDecoration: "none",
        padding: isMobile ? "10px 14px" : "12px 22px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
      }}
    >
      Try it live →
    </a>
  );

  const brand = (
    <span style={{
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontSize: isMobile ? "22px" : "26px",
      fontWeight: 600,
      color: FOREST,
      letterSpacing: "-0.5px",
      flexShrink: 0,
    }}>
      FinTips
    </span>
  );

  return (
    <nav
      aria-label="FinTips page sections"
      style={{
        position: "sticky",
        top: navTop,
        zIndex: 45,
        background: CREAM,
        borderBottom: `1px solid ${BORDER}`,
        boxShadow: "0 1px 0 rgba(30,63,47,0.04)",
      }}
    >
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: isMobile ? "12px 16px" : "14px 48px",
      }}
      >
        {isMobile ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
              {brand}
              {cta}
            </div>
            {linkRow}
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
            {brand}
            <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center" }}>
              {linkRow}
            </div>
            {cta}
          </div>
        )}
      </div>
    </nav>
  );
}

function GoldBulletList({ items, style }: { items: string[]; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        maxWidth: "680px",
        marginBottom: "24px",
        ...style,
      }}
    >
      {items.map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <div
            aria-hidden
            style={{
              width: "8px",
              height: "8px",
              flexShrink: 0,
              marginTop: "10px",
              background: GOLD,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "17px",
              color: INK,
              lineHeight: 1.75,
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
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
          background: "#1E3F2F",
          padding: isMobile ? "32px 24px 40px" : "48px 48px 36px",
          position: "relative",
          overflow: "hidden",
          minHeight: isMobile ? "auto" : "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-end" : "stretch",
        }}>
          <div style={{
            marginTop: isMobile ? "52px" : "80px",
            position: "relative",
            maxWidth: "1180px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            flex: isMobile ? undefined : 1,
            minHeight: isMobile ? undefined : 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}>
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "stretch",
              justifyContent: "space-between",
              gap: isMobile ? "32px" : "40px",
              flex: isMobile ? undefined : 1,
              minHeight: isMobile ? undefined : 0,
            }}>
              <div style={{
                flex: "1 1 auto",
                minWidth: 0,
                alignSelf: isMobile ? "stretch" : "flex-start",
              }}>
                <h1 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontWeight: 400,
                  color: CREAM,
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                  marginBottom: "0px",
                }}>
                  <span style={{ fontSize: isMobile ? "64px" : "clamp(72px, 10vw, 120px)", letterSpacing: "-3px", display: "block", marginBottom: isMobile ? "24px" : "52px" }}>Fin<em style={{ fontStyle: "italic", color: GOLD }}>Tips</em></span>
                </h1>
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: isMobile ? "center" : "flex-end",
                flexShrink: 0,
                alignSelf: isMobile ? "center" : "stretch",
                marginRight: isMobile ? 0 : "-32px",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/project%20card-Fintips.png"
                  alt="FinTips project card preview"
                  style={{
                    width: isMobile ? "100%" : "min(720px, 58vw)",
                    maxWidth: isMobile ? "580px" : undefined,
                    height: "auto",
                    flexShrink: 0,
                    borderRadius: "12px",
                  }}
                />
              </div>
            </div>

          </div>
        </section>

        <FinTipsSubNav isMobile={isMobile} />

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
            <section id="overview" style={{ marginBottom: "64px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
              <Tag>Overview</Tag>
              <SectionH2>What is FinTips?</SectionH2>
              <Body>
                FinTips is a <strong style={{ color: INK, fontWeight: 600 }}>free, anonymous, AI-powered financial advice web app</strong> that gives users personalized money tips based on their goals, with no sign-up, no tracking, and no cost.
              </Body>
              <Body>
                I built it independently from concept to live product in one week, owning every part of the process: problem identification, product strategy, UX design, and directing the full technical build.
              </Body>
              <OverviewStatsRow isMobile={isMobile} />

            </section>

            <Divider />

            {/* ── PROBLEM ───────────────────────────────────────── */}
            <section id="problem" style={{ marginBottom: "64px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
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

            {/* ── MARKET INSIGHTS ───────────────────────────────── */}
            <section id="market-insights" style={{ marginBottom: "64px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
              <Tag>Market Insights</Tag>
              <SectionH2>The demand for accessible financial guidance is growing</SectionH2>
              <Body>
                The personal finance market is rapidly growing, reaching over $11B globally with strong double-digit growth, driven by increasing demand for financial guidance. However, most existing solutions are still too complex, expensive, or lack personalization. This creates a clear opportunity for simpler, more accessible, and user-driven financial advice platforms. This is why FinTips is a perfect market fit.
              </Body>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fintips-market.png"
                alt="FinTips market context: demand for accessible financial guidance"
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  height: "auto",
                  display: "block",
                  marginTop: "28px",
                  borderRadius: "4px",
                  border: `1px solid ${BORDER}`,
                }}
              />
            </section>

            <Divider />

            {/* ── COMPETITIVE LANDSCAPE ─────────────────────────── */}
            <section id="competitive-landscape" style={{ marginBottom: "64px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
              <Tag>Competitive Landscape</Tag>
              <SectionH2>Existing solutions leave beginners behind</SectionH2>
              <Body>
                Most competitors focus on tracking or automation. FinTips is the only product combining financial guidance with community-driven advice and full accessibility.
              </Body>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fintips-COMPETITIVE.png"
                alt="FinTips competitive landscape: positioning versus tracking, advice, personalization, community, and free access"
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  height: "auto",
                  display: "block",
                  marginTop: "28px",
                  borderRadius: "4px",
                  border: `1px solid ${BORDER}`,
                }}
              />
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "17px",
                color: FOREST,
                fontWeight: 600,
                lineHeight: 1.6,
                margin: "28px 0 16px",
                maxWidth: "680px",
              }}>
                FinTips = only player with all 5 strengths
              </p>
              <GoldBulletList
                style={{ marginBottom: "28px" }}
                items={[
                  "Tracking ✔",
                  "Financial advice ✔",
                  "Personalization ✔",
                  "Social/community ✔",
                  "Free access ✔",
                ]}
              />
              <Body>
                FinTips delivers instant, personalized financial advice with no sign-up or friction, unlike competitors that require accounts or subscriptions. While platforms like Mint and Rocket Money focus on tracking and management, and Cleo relies on AI chat, FinTips combines AI with real community insights. This creates a faster, more accessible, and more relatable way for users to get actionable financial guidance.
              </Body>

              <h3 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: 600,
                color: FOREST,
                letterSpacing: "-0.4px",
                lineHeight: 1.2,
                margin: "36px 0 16px",
                maxWidth: "900px",
              }}>
                Behavior-Based Competition
              </h3>
              <div
                style={{
                  maxWidth: "900px",
                  width: "100%",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/fintips_behavior_landscape.png"
                  alt="Where people actually go for financial advice: behavior-based competition versus FinTips"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    margin: 0,
                  }}
                />
                <blockquote
                  style={{
                    margin: 0,
                    padding: isMobile ? "14px 16px" : "16px 22px",
                    background: "#1E3F2F",
                    color: "#FAF7F1",
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: isMobile ? "15px" : "16px",
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    border: "none",
                  }}
                >
                  &ldquo;People don&apos;t search for a new app when they need financial advice. They open Reddit, ask ChatGPT, or scroll TikTok. FinTips meets them there.&rdquo;
                </blockquote>
              </div>
            </section>

            <Divider />

            {/* ── PRIMARY PERSONA ───────────────────────────────── */}
            <section id="primary-persona" style={{ marginBottom: "64px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
              <Tag>Primary Persona — The Advice Seeker</Tag>
              <SectionH2>Actively evaluates financial decisions and values speed, simplicity, and personalization</SectionH2>
              <Body>
                <strong style={{ color: FOREST, fontWeight: 600 }}>Who she is:</strong>{" "}
                Samantha is a 28-year-old Marketing Associate living in New York City. She is ambitious, socially connected and financially aware enough to know she is behind but not enough to know how to catch up.
              </Body>
              <Body style={{ marginBottom: "10px" }}>
                <strong style={{ color: FOREST, fontWeight: 600 }}>Her financial reality:</strong>
              </Body>
              <GoldBulletList
                items={[
                  "Carrying $6K in debt she is actively trying to pay off",
                  "Has a savings account but no consistent contribution strategy",
                  "No investments yet",
                  "Credit score is a work in progress",
                ]}
              />
              <Body>
                <strong style={{ color: FOREST, fontWeight: 600 }}>What she wants:</strong>{" "}
                Get out of debt without feeling overwhelmed. Build a savings habit. Eventually buy a car and a house.
              </Body>
              <Body style={{ marginBottom: "10px" }}>
                <strong style={{ color: FOREST, fontWeight: 600 }}>What frustrates her:</strong>
              </Body>
              <GoldBulletList
                items={[
                  "Budgeting apps feel too complicated and she abandons them quickly",
                  "Googled advice is generic and full of jargon that does not apply to her life",
                  "She does not trust advice from brands trying to sell her something",
                  "When a debt collector calls she does not understand the terms",
                ]}
              />
              <Body>
                <strong style={{ color: FOREST, fontWeight: 600 }}>How she behaves:</strong>{" "}
                She turns to TikTok and Instagram for relatable financial content. She learns best through short digestible story-driven advice, not spreadsheets or long reads.
              </Body>
              <Body style={{ marginBottom: 0 }}>
                <strong style={{ color: FOREST, fontWeight: 600 }}>The insight that drives every product decision:</strong>{" "}
                Samantha does not have a money problem. She has a clarity and trust problem. She needs advice that speaks her language, reflects her situation and comes from people she believes actually understand her life.
              </Body>
            </section>

            <Divider />

            {/* ── SOLUTION + FEATURES ───────────────────────────── */}
            <section id="solution" style={{ marginBottom: "64px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
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
                scrollMarginTop: FINTIPS_SCROLL_MARGIN,
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
            <section id="process" style={{ marginBottom: "64px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
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

              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "8px" }}>
                <h3 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: isMobile ? "22px" : "28px",
                  fontWeight: 600,
                  color: FOREST,
                  letterSpacing: "-0.4px",
                  lineHeight: 1.2,
                  margin: "0 0 4px",
                  maxWidth: "900px",
                }}>
                  Design Process &amp; Iteration
                </h3>
                <Body style={{ marginTop: "0", marginBottom: 0 }}>
                  These initial prototypes were built using Claude as a design tool. The color palette and visual direction were strong, but the layouts didn&apos;t fully capture what I had in mind. Rather than continuing to iterate with AI, I brought the designs into Figma to take more direct control of the details.
                </Body>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/fintips-process 2.png"
                  alt="FinTips product process — 1 of 2"
                  style={{
                    width: "100%",
                    maxWidth: "900px",
                    height: "auto",
                    display: "block",
                    borderRadius: "4px",
                    border: `1px solid ${BORDER}`,
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/fintips-process1.png"
                  alt="FinTips product process — 2 of 2"
                  style={{
                    width: "100%",
                    maxWidth: "900px",
                    height: "auto",
                    display: "block",
                    borderRadius: "4px",
                    border: `1px solid ${BORDER}`,
                  }}
                />
              </div>
            </section>

            <Divider />

            {/* ── LEARNINGS ─────────────────────────────────────── */}
            <section id="learnings" style={{ marginBottom: "80px", scrollMarginTop: FINTIPS_SCROLL_MARGIN }}>
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

        {/* ── CTA (shell shared with KRI / Discover Dramaland bands) ── */}
        <CaseStudyCtaBand background={FOREST}>
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
        </CaseStudyCtaBand>

      </main>
      <Footer />
    </>
  );
}
