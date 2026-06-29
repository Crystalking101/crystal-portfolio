"use client";

import Link from "next/link";
import { useInPageNavActive } from "@/hooks/useInPageNavActive";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = {
  scopedCss: string;
  bodyHtml: string;
};

const PAGE_BG = "#FAF6F0";
const ACCENT = "#8B0000";
const MUTED = "#6B6558";
const BORDER = "rgba(26, 26, 26, 0.1)";

const INKBOOK_SUBNAV: { href: string; label: string }[] = [
  { href: "#problem", label: "Problem" },
  { href: "#market", label: "Market" },
  { href: "#users", label: "Users" },
  { href: "#solution", label: "Solution" },
  { href: "#design", label: "Design" },
  { href: "#features", label: "Features" },
  { href: "#technical", label: "Technical" },
  { href: "#outcome", label: "Outcome" },
  { href: "#roadmap", label: "Roadmap" },
];

const SUBNAV_SCROLL_MARGIN = "120px";
const NAV_ACTIVATION_PX = { mobile: 108, desktop: 118 } as const;

const MOBILE_SUPPLEMENT_CSS = `
/* Always hide the in-HTML hero and subnav — React versions replace them */
#inkbook-cs .hero,
#inkbook-cs .subnav {
  display: none !important;
}

/* Ensure anchor links clear both site nav + subnav on all screen sizes */
#inkbook-cs .section[id] {
  scroll-margin-top: ${SUBNAV_SCROLL_MARGIN};
}

@media (max-width: 767px) {
  #inkbook-cs .page-body {
    display: block !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 32px 0 48px !important;
    gap: 0 !important;
  }
  #inkbook-cs .sidebar {
    position: static !important;
    top: auto !important;
  }
}
`;

function InkBookSubNav({ isMobile }: { isMobile: boolean }) {
  const navTop = isMobile ? 56 : 64;
  const activationPx = isMobile ? NAV_ACTIVATION_PX.mobile : NAV_ACTIVATION_PX.desktop;
  const activeHref = useInPageNavActive(
    INKBOOK_SUBNAV.map((item) => item.href),
    activationPx,
  );

  const linkRow = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "1px" : "4px",
        minWidth: 0,
        justifyContent: isMobile ? "flex-start" : "center",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "thin",
      }}
    >
      {INKBOOK_SUBNAV.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "location" : undefined}
            style={{
              fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans', sans-serif)",
              fontSize: isMobile ? "11px" : "12px",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? ACCENT : MUTED,
              background: isActive ? "rgba(139,0,0,0.1)" : "transparent",
              textDecoration: "none",
              padding: isMobile ? "6px 7px" : "7px 9px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ACCENT;
              e.currentTarget.style.background = "rgba(139,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isActive ? ACCENT : MUTED;
              e.currentTarget.style.background = isActive ? "rgba(139,0,0,0.1)" : "transparent";
            }}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );

  const brand = (
    <span
      style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: isMobile ? "16px" : "18px",
        fontWeight: 600,
        color: ACCENT,
        letterSpacing: "-0.35px",
        flexShrink: 0,
        maxWidth: isMobile ? "min(42vw, 168px)" : "220px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      title="InkBook 墨书"
    >
      InkBook 墨书
    </span>
  );

  return (
    <nav
      aria-label="InkBook page sections"
      style={{
        position: "sticky",
        top: navTop,
        zIndex: 45,
        background: PAGE_BG,
        borderBottom: `1px solid ${BORDER}`,
        boxShadow: "0 1px 0 rgba(26, 26, 26, 0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          padding: isMobile ? "10px 12px" : "12px 20px",
        }}
      >
        {isMobile ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              {brand}
            </div>
            {linkRow}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {brand}
            <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center" }}>{linkRow}</div>
          </div>
        )}
      </div>
    </nav>
  );
}

function MobileHero({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        background: "#FAF6F0",
        backgroundImage: "repeating-linear-gradient(180deg, transparent, transparent 27px, rgba(139,0,0,0.06) 28px)",
        padding: isMobile ? "28px 20px 36px" : "80px 32px 72px",
        borderBottom: "1px solid rgba(26,26,26,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "0" : "48px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans', sans-serif)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              color: ACCENT,
              margin: "0 0 20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(139,0,0,0.08)",
              border: "1px solid rgba(139,0,0,0.2)",
              borderRadius: "100px",
              padding: "5px 14px",
            }}
          >
            Hackathon Project · Microsoft Agents League · June 2026
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: isMobile ? "clamp(36px, 9vw, 48px)" : "clamp(44px, 6.5vw, 72px)",
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              margin: "0 0 4px",
            }}
          >
            InkBook
          </h1>
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: isMobile ? "clamp(16px, 4vw, 20px)" : "clamp(20px, 3vw, 30px)",
              color: ACCENT,
              letterSpacing: "3px",
              fontWeight: 600,
              margin: "0 0 18px",
            }}
          >
            墨 书
          </p>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans', sans-serif)",
              fontSize: "15px",
              color: "#5A5550",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "560px",
            }}
          >
            A Mandarin tone ear training web app powered by an AI Tone Coach Agent, built for
            learners who fell in love with the language through Chinese and Korean dramas.
          </p>
        </div>

        {/* Hero image — placeholder for future screenshot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/inkBook_hero.png"
          alt="InkBook app screenshot"
          style={{
            width: isMobile ? "100%" : "auto",
            maxWidth: isMobile ? "420px" : "560px",
            height: "auto",
            borderRadius: "12px",
            display: "block",
            marginTop: isMobile ? "28px" : "0",
            flexShrink: 0,
          }}
        />
      </div>
    </section>
  );
}

export default function InkBookCaseStudyView({ scopedCss, bodyHtml }: Props) {
  const isMobile = useIsMobile(768);

  return (
    <main style={{ flex: 1, background: PAGE_BG, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div style={{ background: PAGE_BG, padding: `16px ${isMobile ? "20px" : "32px"} 0` }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans', sans-serif)",
            fontSize: "13px",
            color: ACCENT,
            textDecoration: "none",
          }}
        >
          ← Back to Projects
        </Link>
      </div>

      <MobileHero isMobile={isMobile} />
      <InkBookSubNav isMobile={isMobile} />

      <div
        style={{
          flex: 1,
          width: "100%",
          ...(isMobile
            ? { maxWidth: "1060px", margin: "0 auto", padding: "0 20px 64px" }
            : { padding: 0 }),
          boxSizing: "border-box",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: scopedCss }} />
        <style dangerouslySetInnerHTML={{ __html: MOBILE_SUPPLEMENT_CSS }} />
        <div id="inkbook-cs" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </main>
  );
}
