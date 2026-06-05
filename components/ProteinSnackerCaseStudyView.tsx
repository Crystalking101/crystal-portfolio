"use client";

import Link from "next/link";
import { useInPageNavActive } from "@/hooks/useInPageNavActive";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = {
  scopedCss: string;
  bodyHtml: string;
};

const PAGE_BG = "#F8F7F4";
const ACCENT = "#2A8C5A";
const MUTED = "#6B6558";
const BORDER = "rgba(15, 15, 15, 0.1)";

/** Section anchors — order matches case study HTML. */
const PROTEIN_SUBNAV: { href: string; label: string }[] = [
  { href: "#problem", label: "Problem" },
  { href: "#market", label: "Market" },
  { href: "#competitive", label: "Competitive" },
  { href: "#users", label: "Users" },
  { href: "#solution", label: "Solution" },
  { href: "#design", label: "Design" },
  { href: "#features", label: "Features" },
  { href: "#data", label: "Data" },
  { href: "#monetization", label: "Monetization" },
  { href: "#metrics", label: "Metrics" },
  { href: "#roadmap", label: "Roadmap" },
];

const SUBNAV_SCROLL_MARGIN = "120px";
const NAV_ACTIVATION_PX = { mobile: 108, desktop: 118 } as const;

/** Hides duplicate in-HTML hero/subnav on small screens; normalizes body grid (FinTips / CaseStudyContent–style shell). */
const MOBILE_SUPPLEMENT_CSS = `
@media (max-width: 767px) {
  #protein-snacker-cs .hero,
  #protein-snacker-cs .subnav {
    display: none !important;
  }
  #protein-snacker-cs .page-body {
    display: block !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 32px 0 48px !important;
    gap: 0 !important;
  }
  #protein-snacker-cs .sidebar {
    position: static !important;
    top: auto !important;
  }
  #protein-snacker-cs .section[id] {
    scroll-margin-top: ${SUBNAV_SCROLL_MARGIN};
  }
}
`;

function ProteinSubNav({ isMobile }: { isMobile: boolean }) {
  const navTop = isMobile ? 56 : 64;
  const activationPx = isMobile ? NAV_ACTIVATION_PX.mobile : NAV_ACTIVATION_PX.desktop;
  const activeHref = useInPageNavActive(
    PROTEIN_SUBNAV.map((item) => item.href),
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
      {PROTEIN_SUBNAV.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "location" : undefined}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: isMobile ? "11px" : "12px",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? ACCENT : MUTED,
              background: isActive ? "rgba(42, 140, 90, 0.12)" : "transparent",
              textDecoration: "none",
              padding: isMobile ? "6px 7px" : "7px 9px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ACCENT;
              e.currentTarget.style.background = "rgba(42, 140, 90, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isActive ? ACCENT : MUTED;
              e.currentTarget.style.background = isActive ? "rgba(42, 140, 90, 0.12)" : "transparent";
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
      title="Protein Snacker"
    >
      Protein Snacker
    </span>
  );

  return (
    <nav
      aria-label="Protein Snacker page sections"
      style={{
        position: "sticky",
        top: navTop,
        zIndex: 45,
        background: PAGE_BG,
        borderBottom: `1px solid ${BORDER}`,
        boxShadow: "0 1px 0 rgba(15, 15, 15, 0.04)",
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

function MobileHero() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #FFFDF8 0%, #E8F8F0 55%, #EBF9FF 100%)",
        padding: "28px 20px 36px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            color: "#1A9FCC",
            margin: "0 0 14px",
          }}
        >
          Side project · Mobile app · In development
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(36px, 9vw, 48px)",
            fontWeight: 700,
            color: "#0F1A14",
            letterSpacing: "-0.5px",
            lineHeight: 1.05,
            margin: "0 0 12px",
          }}
        >
          Protein Snacker
        </h1>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            color: "#555",
            lineHeight: 1.55,
            margin: "0 0 24px",
            maxWidth: "520px",
          }}
        >
          A snack discovery engine for people who live and breathe macros. Find your perfect high-protein snack in under
          60 seconds.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/proteinsnacker-hero.png"
            alt="Protein Snacker app mockup — welcome and My Goals screens"
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "auto",
              borderRadius: "12px",
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default function ProteinSnackerCaseStudyView({ scopedCss, bodyHtml }: Props) {
  const isMobile = useIsMobile(768);

  return (
    <main style={{ flex: 1, background: PAGE_BG, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div style={{ background: PAGE_BG, padding: `16px ${isMobile ? "20px" : "32px"} 0` }}>
        <Link
          href="/work"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#2D6FE8",
            textDecoration: "none",
          }}
        >
          ← Back to Work
        </Link>
      </div>

      {isMobile && <MobileHero />}
      {isMobile && <ProteinSubNav isMobile />}

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
        <div id="protein-snacker-cs" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </main>
  );
}
