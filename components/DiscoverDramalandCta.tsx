/**
 * Bottom CTA for the Discover Dramaland case study only (before site footer).
 * Client component so it can render inside `CaseStudyContent` ("use client").
 */
"use client";

import CaseStudyCtaBand from "@/components/CaseStudyCtaBand";

const ROSE = "#E8B4B8";
const ROSE_DEEP = "#B87A7E";

export default function DiscoverDramalandCta() {
  return (
    <CaseStudyCtaBand background="#0F0F0F">
      <h2
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 400,
          color: ROSE,
          letterSpacing: "-0.5px",
          lineHeight: 1.15,
          margin: "0 0 16px",
        }}
      >
        See it live
      </h2>
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "17px",
          color: "rgba(232, 180, 184, 0.82)",
          lineHeight: 1.55,
          margin: "0 auto 40px",
          maxWidth: "520px",
        }}
      >
        Free, legal and available right now. Watch your first drama in under 60 seconds.
      </p>
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://discoverdramaland.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: ROSE_DEEP,
            color: "#FFFFFF",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            padding: "16px 36px",
            textDecoration: "none",
            display: "inline-block",
            borderRadius: "4px",
          }}
        >
          Watch Now
        </a>
        <a
          href="mailto:king.d.crystal@gmail.com"
          style={{
            background: "transparent",
            color: ROSE,
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            padding: "16px 36px",
            textDecoration: "none",
            display: "inline-block",
            border: `1.5px solid ${ROSE}`,
            borderRadius: "4px",
          }}
        >
          Get in touch
        </a>
      </div>
    </CaseStudyCtaBand>
  );
}
