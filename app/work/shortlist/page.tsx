"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInPageNavActive } from "@/hooks/useInPageNavActive";

/* ── Design tokens ─────────────────────────────────────────────── */
const INK   = "#0F1117";
const BLUE  = "#0066FF";
const GREEN = "#00FF85";
const CREAM = "#F8F7F4";
const MUTED = "#6B6558";
const BODY  = "#4A4540";
const BORDER = "rgba(10,10,10,0.08)";

const SUBNAV_ITEMS: { href: string; label: string }[] = [
  { href: "#problem",   label: "Problem"  },
  { href: "#solution",  label: "Solution" },
  { href: "#features",  label: "Features" },
  { href: "#technical", label: "Technical"},
  { href: "#outcome",   label: "Outcome"  },
  { href: "#roadmap",   label: "Roadmap"  },
  { href: "#learned",   label: "Learnings"},
];

/* ── Sub-nav ───────────────────────────────────────────────────── */
function ShortlistSubNav({ isMobile }: { isMobile: boolean }) {
  const navTop = isMobile ? 56 : 64;
  const activeHref = useInPageNavActive(
    SUBNAV_ITEMS.map((i) => i.href),
    isMobile ? 108 : 118,
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
    }}>
      {SUBNAV_ITEMS.map(({ href, label }) => {
        const active = activeHref === href;
        return (
          <a
            key={href}
            href={href}
            aria-current={active ? "location" : undefined}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: isMobile ? "12px" : "13px",
              fontWeight: active ? 700 : 500,
              color: active ? BLUE : MUTED,
              background: active ? "rgba(0,102,255,0.08)" : "transparent",
              textDecoration: "none",
              padding: isMobile ? "8px 10px" : "9px 11px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = BLUE;
              e.currentTarget.style.background = "rgba(0,102,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = active ? BLUE : MUTED;
              e.currentTarget.style.background = active ? "rgba(0,102,255,0.08)" : "transparent";
            }}
          >
            {label}
          </a>
        );
      })}
    </div>
  );

  const cta = (
    <a
      href="https://github.com/Crystalking101/shortlist"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flexShrink: 0,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: isMobile ? "12px" : "13px",
        fontWeight: 700,
        color: "#FFFFFF",
        background: BLUE,
        textDecoration: "none",
        padding: isMobile ? "10px 14px" : "11px 20px",
        borderRadius: "6px",
        whiteSpace: "nowrap",
      }}
    >
      View on GitHub →
    </a>
  );

  const brand = (
    <span style={{
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: 700,
      color: BLUE,
      letterSpacing: "-0.5px",
      flexShrink: 0,
    }}>
      Shortlist
    </span>
  );

  return (
    <nav
      aria-label="Shortlist page sections"
      style={{
        position: "sticky",
        top: navTop,
        zIndex: 45,
        background: CREAM,
        borderBottom: `1px solid ${BORDER}`,
        boxShadow: "0 1px 0 rgba(10,10,10,0.04)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "12px 16px" : "12px 48px" }}>
        {isMobile ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
              {brand}{cta}
            </div>
            {linkRow}
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
            {brand}
            <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center" }}>{linkRow}</div>
            {cta}
          </div>
        )}
      </div>
    </nav>
  );
}

/* ── Section wrapper helpers ───────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "1.4px",
      textTransform: "uppercase",
      color: BLUE,
      marginBottom: "10px",
    }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontSize: "clamp(22px, 3vw, 28px)",
      fontWeight: 700,
      color: "#0A0A0A",
      lineHeight: 1.2,
      marginBottom: "16px",
    }}>
      {children}
    </h2>
  );
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "15px",
      color: BODY,
      lineHeight: 1.75,
      marginBottom: "14px",
      ...style,
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: BORDER, margin: "48px 0 40px" }} />;
}

/* ── Sidebar ───────────────────────────────────────────────────── */
function Sidebar({ isMobile }: { isMobile: boolean }) {
  const rows = [
    { label: "Role",     value: "Builder & Product Manager" },
    { label: "Timeline", value: "June 2026" },
    { label: "Type",     value: "Personal Tool · Python Script" },
    { label: "Status",   value: "Live on GitHub" },
  ];
  const stack = ["Python", "Claude API", "SerpAPI", "OpenPyXL", "python-dotenv"];
  const focus = ["AI Automation", "Open Source", "Personal Tool"];

  return (
    <aside style={{
      position: isMobile ? "static" : "sticky",
      top: isMobile ? undefined : "120px",
      flexShrink: 0,
      width: isMobile ? "100%" : "220px",
    }}>
      <div style={{
        background: "#ECEAE6",
        borderRadius: "16px",
        padding: "24px",
        border: `1px solid ${BORDER}`,
      }}>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: BLUE, marginBottom: "4px" }}>
          Case Study
        </p>
        <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.2, marginBottom: "20px" }}>
          Shortlist
        </p>

        {rows.map((r) => (
          <div key={r.label} style={{ marginBottom: "14px" }}>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#9B9286", marginBottom: "3px" }}>
              {r.label}
            </p>
            {r.label === "Status" ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 600, color: "#00AA55", background: "rgba(0,255,133,0.12)", borderRadius: "100px", padding: "4px 10px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, display: "inline-block" }} />
                {r.value}
              </span>
            ) : (
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "#3A3430", lineHeight: 1.45 }}>{r.value}</p>
            )}
          </div>
        ))}

        <div style={{ height: "1px", background: "rgba(10,10,10,0.1)", margin: "16px 0" }} />

        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#9B9286", marginBottom: "8px" }}>Stack</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {stack.map((t) => (
            <span key={t} style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 500, background: "rgba(0,102,255,0.09)", color: BLUE, borderRadius: "6px", padding: "4px 8px" }}>{t}</span>
          ))}
        </div>

        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#9B9286", marginBottom: "8px" }}>Focus</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "16px" }}>
          {focus.map((t) => (
            <span key={t} style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 500, background: "rgba(10,10,10,0.06)", color: "#4A4540", borderRadius: "6px", padding: "4px 8px" }}>{t}</span>
          ))}
        </div>

        <div style={{ height: "1px", background: "rgba(10,10,10,0.1)", margin: "16px 0" }} />

        <a
          href="https://github.com/Crystalking101/shortlist"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: BLUE,
            textDecoration: "none",
            padding: "8px 12px",
            background: "rgba(0,102,255,0.07)",
            borderRadius: "8px",
            textAlign: "center",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,102,255,0.14)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,102,255,0.07)"; }}
        >
          View on GitHub →
        </a>
      </div>
    </aside>
  );
}

/* ── Feature card ──────────────────────────────────────────────── */
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{
      background: "#ECEAE6",
      borderRadius: "10px",
      padding: "18px 20px",
      marginBottom: "12px",
      borderLeft: `3px solid ${BLUE}`,
    }}>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0A0A0A", marginBottom: "6px" }}>{title}</p>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "#5A5550", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

/* ── Tech layer card ───────────────────────────────────────────── */
function TechLayer({ layer, title, desc }: { layer: string; title: string; desc: React.ReactNode }) {
  return (
    <div style={{
      background: INK,
      borderRadius: "12px",
      padding: "22px 24px",
      marginBottom: "12px",
    }}>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: GREEN, marginBottom: "10px" }}>{layer}</p>
      <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "18px", fontWeight: 700, color: CREAM, marginBottom: "8px" }}>{title}</p>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "rgba(248,247,244,0.65)", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

/* ── Roadmap item ──────────────────────────────────────────────── */
function RoadmapItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
      <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "26px", fontWeight: 700, color: "rgba(0,102,255,0.25)", lineHeight: 1, flexShrink: 0, width: "36px" }}>{num}</span>
      <div>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: 700, color: "#0A0A0A", marginBottom: "4px" }}>{title}</p>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: MUTED, lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ── Learning item ─────────────────────────────────────────────── */
function LearnedItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ background: "#ECEAE6", borderRadius: "12px", padding: "20px 22px", marginBottom: "12px" }}>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: 700, color: BLUE, marginBottom: "6px" }}>{title}</p>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "#5A5550", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ShortlistPage() {
  const isMobile = useIsMobile();

  const heroStats = [
    { num: "43",   label: "listings scored in one run" },
    { num: "5min", label: "from zero to ranked shortlist" },
    { num: "3hrs", label: "of manual browsing replaced" },
  ];

  return (
    <>
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{
        background: INK,
        padding: isMobile ? "48px 20px 48px" : "80px 32px 72px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative background glyph */}
        {!isMobile && (
          <span aria-hidden style={{
            position: "absolute",
            right: "40px",
            top: "20px",
            fontSize: "200px",
            fontFamily: "Inter, monospace",
            color: "rgba(0,102,255,0.05)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}>{"{ }"}</span>
        )}

        <div style={{
          maxWidth: "1060px",
          margin: "0 auto",
          display: isMobile ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: isMobile ? undefined : "1fr 280px",
          gap: isMobile ? "32px" : "48px",
          alignItems: "center",
        }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(0,102,255,0.15)",
              border: "1px solid rgba(0,102,255,0.3)",
              borderRadius: "100px",
              padding: "5px 14px",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              color: BLUE,
              marginBottom: "20px",
            }}>
              Personal Tool · Python · Open Source
            </div>

            <h1 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(44px, 6.5vw, 80px)",
              fontWeight: 700,
              color: CREAM,
              letterSpacing: "-1.5px",
              lineHeight: 1.0,
              marginBottom: "8px",
            }}>
              Short<span style={{ color: BLUE }}>list</span>
            </h1>

            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "clamp(14px, 2vw, 18px)",
              color: GREEN,
              fontWeight: 600,
              letterSpacing: "0.5px",
              margin: "16px 0 18px",
            }}>
              One command. Five minutes. Your ranked job shortlist.
            </p>

            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "15px",
              color: "rgba(248,247,244,0.65)",
              lineHeight: 1.65,
              maxWidth: "560px",
            }}>
              Shortlist is an AI-powered opportunity ranking system that analyzes job listings and
              surfaces the strongest matches for your background and goals. Instead of spending hours
              searching and filtering, you start with a prioritized list of roles worth pursuing.
            </p>
          </div>

          {/* Stats column */}
          <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: "14px", flexWrap: isMobile ? "wrap" : undefined }}>
            {heroStats.map(({ num, label }) => (
              <div key={num} style={{
                flex: isMobile ? "1 1 calc(33% - 10px)" : undefined,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,102,255,0.18)",
                borderRadius: "14px",
                padding: "20px 22px",
                textAlign: "center",
              }}>
                <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: isMobile ? "28px" : "38px", fontWeight: 700, color: BLUE, lineHeight: 1, marginBottom: "6px" }}>{num}</p>
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", color: "rgba(248,247,244,0.45)", lineHeight: 1.4 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ShortlistSubNav isMobile={isMobile} />

      <main style={{ flex: 1, background: CREAM }}>
        <div style={{
          maxWidth: "1060px",
          margin: "0 auto",
          padding: isMobile ? "32px 20px 80px" : "40px 32px 96px",
          display: isMobile ? "block" : "grid",
          gridTemplateColumns: isMobile ? undefined : "220px 1fr",
          gap: isMobile ? undefined : "48px",
          alignItems: "start",
        }}>

          {/* Sidebar */}
          {!isMobile && <Sidebar isMobile={isMobile} />}

          {/* Main content */}
          <div style={{ minWidth: 0 }}>

            {/* Problem */}
            <section id="problem" style={{ marginBottom: "48px", scrollMarginTop: "120px" }}>
              <Eyebrow>The Problem</Eyebrow>
              <SectionTitle>Job boards have filters. They do not have judgment.</SectionTitle>
              <Body>
                When you are actively job searching, keeping up with multiple job boards every day is
                time consuming and inconsistent. Roles that match your exact criteria get posted and
                filled fast, sometimes within 24 to 48 hours. Checking LinkedIn, Indeed, and Google
                Jobs manually every morning means you are always reacting, never ahead of it.
              </Body>
              <Body>
                The deeper issue is that filtering on job boards only gets you so far. You can filter
                by title and location but you cannot filter by how well a role actually matches your
                specific background, your target company tier, your salary floor, and which resume
                version makes the most sense to send. That judgment call still lives entirely in your
                head and takes time every single time.
              </Body>
              <Body>
                I needed something that would handle the scanning automatically, score each role against
                my actual criteria, and surface only the listings worth acting on. That is why I built
                Shortlist.
              </Body>
            </section>

            <Divider />

            {/* Solution */}
            <section id="solution" style={{ marginBottom: "48px", scrollMarginTop: "120px" }}>
              <Eyebrow>The Solution</Eyebrow>
              <SectionTitle>One command. A ranked shortlist in under 5 minutes.</SectionTitle>
              <Body>
                Shortlist is a Python script I built to replace my daily job board routine. It searches
                Google Jobs, scores every listing against my background and criteria using Claude AI,
                and drops a ranked Excel file on my Desktop every time I run it.
              </Body>
              <Body>
                Every listing that makes the shortlist comes with a match reason explaining why it is
                or is not a good fit, a recommendation on which resume version to send, specific tweaks
                to make for that role, and a direct apply link. The entire process runs in one command
                in under 5 minutes.
              </Body>
            </section>

            <Divider />

            {/* Features */}
            <section id="features" style={{ marginBottom: "48px", scrollMarginTop: "120px" }}>
              <Eyebrow>Features</Eyebrow>
              <SectionTitle>Built around the judgment call job boards cannot make</SectionTitle>

              <FeatureCard
                title="Automated job scraping"
                desc="Searches Google Jobs across five targeted queries covering Product Manager, Senior Associate Product Manager, AI Product Manager, Strategy and Operations, and Remote roles. Eliminates the daily manual browsing routine that makes job searching feel like a second job."
              />
              <FeatureCard
                title="Smart filtering"
                desc="Automatically skips excluded companies, seniority levels you are not targeting, and locations you do not want before a single listing ever gets scored. Filtering before scoring means no wasted API calls and no noise reaching the output."
              />
              <FeatureCard
                title="AI powered scoring"
                desc="Every listing is scored from 0 to 100 by Claude AI against your candidate profile, target roles, preferred company tiers, salary floor, and location. Each score comes with a plain language explanation of why the role is or is not a good fit, replacing the gut check you would otherwise make manually for every listing."
              />
              <FeatureCard
                title="Resume recommendations"
                desc="Most job seekers send the same resume to every role. Shortlist tells you which version to send and what to change before you apply."
              />
              <FeatureCard
                title="Fully configurable and open source"
                desc="Target roles, company tiers, excluded companies, salary floor, and location preferences all live in a single config file separate from the core logic. This architecture decision made it possible to open source the tool without exposing private job search strategy."
              />
              <FeatureCard
                title="Color coded Excel output"
                desc="Results export to a ranked Excel file with green for strong matches (80+), yellow for partial matches (65–79), and red for poor matches (below 65). Every row includes a direct apply link so the path from shortlist to application is one click."
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/excel-design.png"
                alt="Shortlist Excel output showing color coded job scores — green for strong matches, yellow for partial matches"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  margin: "8px 0 20px",
                  border: `1px solid ${BORDER}`,
                }}
              />
            </section>

            <Divider />

            {/* Technical */}
            <section id="technical" style={{ marginBottom: "48px", scrollMarginTop: "120px" }}>
              <Eyebrow>Technical</Eyebrow>
              <SectionTitle>Three distinct layers, one clean pipeline</SectionTitle>
              <Body>Shortlist is built in Python across three distinct layers: scraping, scoring, and output.</Body>

              <TechLayer
                layer="Layer 01"
                title="Scraping"
                desc="Two tools were evaluated: Apify and SerpAPI. Apify offered powerful actor based scraping but required more configuration overhead for a single use personal tool. SerpAPI was chosen for its clean Google Jobs integration, structured JSON output, and simpler setup that fit the scope of the project."
              />
              <TechLayer
                layer="Layer 02"
                title="Scoring"
                desc="Every listing is passed to the Claude API alongside the full candidate profile and filter criteria. Claude returns a structured JSON object with a score, match reason, resume recommendation, resume tweaks, and verdict. API calls are wrapped in error handling so a single failed scoring request does not crash the entire run."
              />
              <TechLayer
                layer="Layer 03"
                title="Output"
                desc="Results are exported to a color coded Excel file using OpenPyXL. Excel was chosen over a web dashboard deliberately. The goal was a tool that could be opened, scanned, and acted on immediately without any additional setup or interface."
              />
              <TechLayer
                layer="Architecture"
                title="Configuration"
                desc={<>All personal criteria live in a gitignored <code style={{ color: BLUE, background: "rgba(0,102,255,0.12)", padding: "2px 5px", borderRadius: "3px" }}>config.py</code> file while a public <code style={{ color: BLUE, background: "rgba(0,102,255,0.12)", padding: "2px 5px", borderRadius: "3px" }}>config.example.py</code> gives anyone cloning the repo a clear template. This separation made it possible to open source the tool without exposing private job search strategy.</>}
              />
            </section>

            <Divider />

            {/* Outcome */}
            <section id="outcome" style={{ marginBottom: "48px", scrollMarginTop: "120px" }}>
              <Eyebrow>Outcome</Eyebrow>
              <SectionTitle>Shipped, open sourced, and running</SectionTitle>
              <Body>
                Shortlist is fully built, tested, and live on GitHub. In a single run it searches Google
                Jobs across five targeted queries, scores every listing with Claude AI, and exports a
                ranked Excel file to the Desktop in under 5 minutes. A test run returned 6 qualified
                matches out of 43 listings scored.
              </Body>
              <Body>
                What used to take roughly 3 hours of manual browsing across multiple job boards every
                day now runs in under 5 minutes with one command.
              </Body>
              <Body>
                The tool was architected from the start to be open source. Personal criteria live in a
                gitignored config file so anyone can clone the repo, fill in their own profile, and run
                it immediately without touching the core logic.
              </Body>
            </section>

            <Divider />

            {/* Roadmap */}
            <section id="roadmap" style={{ marginBottom: "48px", scrollMarginTop: "120px" }}>
              <Eyebrow>What Is Coming Next</Eyebrow>
              <SectionTitle>Roadmap</SectionTitle>
              <Body>Already scoped and prioritized for the next build phase.</Body>

              <div style={{ marginTop: "20px" }}>
                <RoadmapItem
                  num="01"
                  title="n8n automation"
                  desc="Schedule Shortlist to run automatically every morning using n8n so a fresh ranked shortlist lands without running any command manually. New matches surface the moment they are posted."
                />
                <RoadmapItem
                  num="02"
                  title="Multi-source scraping"
                  desc="Add direct scraping of LinkedIn and Indeed separately instead of routing everything through Google Jobs. Broader source coverage means fewer missed listings and better signal across the full job market."
                />
                <RoadmapItem
                  num="03"
                  title="Email or Slack delivery"
                  desc="After n8n automation is live, pipe the daily shortlist directly to email or a Slack channel so the output comes to you instead of requiring you to open a Desktop file."
                />
                <RoadmapItem
                  num="04"
                  title="Web interface"
                  desc="A lightweight web UI so the tool is accessible without a terminal. Configure your profile, run a search, and review results in a browser instead of an Excel file."
                />
              </div>
            </section>

            <Divider />

            {/* Learnings */}
            <section id="learned" style={{ marginBottom: "48px", scrollMarginTop: "120px" }}>
              <Eyebrow>What I Learned</Eyebrow>
              <SectionTitle>Four things building Shortlist taught me</SectionTitle>

              <LearnedItem
                title="Building for yourself is the fastest way to validate a real problem."
                desc="Every product decision was grounded in a genuine personal pain point. There was no user research needed because I was the user. That clarity made scoping faster and the output more focused."
              />
              <LearnedItem
                title="Separation of concerns is a product decision, not just a technical one."
                desc="Splitting personal config from core logic started as a privacy consideration but became an architecture principle. It made the tool open sourceable and shareable without any rework. Good product thinking and good engineering thinking are often the same decision viewed from different angles."
              />
              <LearnedItem
                title="AI is most powerful when it replaces a specific human judgment call."
                desc="I did not use Claude to summarize job listings. I used it to replace the 30 second gut check I was making manually for every role. The more precisely you define the judgment you want AI to make, the more useful the output becomes."
              />
              <LearnedItem
                title="Scoping a personal tool requires the same discipline as scoping a product."
                desc="It would have been easy to keep adding features. Shipping a focused version that solved the core problem first was the right call."
              />
            </section>

            {/* CTA */}
            <div style={{
              marginTop: "64px",
              padding: isMobile ? "32px 24px" : "40px",
              background: INK,
              borderRadius: "20px",
              textAlign: "center",
              border: "1px solid rgba(0,102,255,0.2)",
            }}>
              <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "24px", fontWeight: 700, color: CREAM, marginBottom: "12px" }}>
                Shortlist is open source
              </h3>
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", color: "rgba(248,247,244,0.55)", marginBottom: "24px" }}>
                Clone the repo, fill in your own config, and run it for your job search in under 10 minutes.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="https://github.com/Crystalking101/shortlist"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 600, color: "#F8F7F4", background: BLUE, padding: "11px 24px", borderRadius: "8px", textDecoration: "none" }}
                >
                  View on GitHub →
                </a>
                <a
                  href="/projects"
                  style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 600, color: BLUE, background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.25)", padding: "11px 24px", borderRadius: "8px", textDecoration: "none" }}
                >
                  See all products
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
