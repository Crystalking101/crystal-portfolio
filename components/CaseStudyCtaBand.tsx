"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Shared padding with FinTips bottom CTA (`/work/fintips`).
 * Change here to keep FinTips, Discover Dramaland CTA, and KRI strip aligned.
 */
export function ctaBandPadding(isMobile: boolean): string {
  return isMobile ? "64px 24px" : "100px 48px";
}

type CaseStudyCtaBandProps = {
  background: string;
  children?: React.ReactNode;
  textAlign?: "center" | "left";
};

/** Full-width CTA band shell (FinTips-style vertical padding). */
export default function CaseStudyCtaBand({
  background,
  children,
  textAlign = "center",
}: CaseStudyCtaBandProps) {
  const isMobile = useIsMobile();
  return (
    <section
      style={{
        background,
        width: "100%",
        boxSizing: "border-box",
        padding: ctaBandPadding(isMobile),
        textAlign,
      }}
    >
      {children}
    </section>
  );
}

/**
 * Invisible layout twin of the FinTips CTA (heading + sub + button row)
 * so empty bands match `/work/fintips` height without hard-coded minHeight.
 * Keep typography / spacing in sync with the visible CTA in `app/work/fintips/page.tsx`.
 */
export function FinTipsCtaLayoutSpacer() {
  const isMobile = useIsMobile();
  return (
    <div
      aria-hidden
      style={{
        visibility: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: isMobile ? "40px" : "clamp(40px, 5vw, 64px)",
          fontWeight: 400,
          color: "#000",
          letterSpacing: "-1px",
          margin: "0 0 16px",
        }}
      >
        See it live
      </h2>
      <p
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "18px",
          color: "#000",
          marginBottom: "40px",
          lineHeight: 1.55,
        }}
      >
        Free, anonymous, and working right now. Try the full experience in under 60 seconds.
      </p>
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            padding: "16px 36px",
            display: "inline-block",
            borderRadius: "4px",
          }}
        >
          Try FinTips →
        </span>
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            padding: "16px 36px",
            display: "inline-block",
            border: "1.5px solid rgba(250,247,241,0.3)",
            borderRadius: "4px",
          }}
        >
          Get in touch
        </span>
      </div>
    </div>
  );
}
