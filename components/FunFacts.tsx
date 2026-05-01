"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

const facts = [
  { label: "Currently learning", value: "Mandarin Chinese 🀄" },
  { label: "Obsessed with",      value: "Chinese short dramas 📺" },
  { label: "Based in",           value: "New York City 🗽" },
];

export default function FunFacts() {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        background: "#EAF1FD",
        borderTop: "1px solid #C8DCFA",
        padding: isMobile ? "24px 20px" : "24px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "stretch",
          justifyContent: "space-between",
          gap: isMobile ? "24px" : "0",
        }}
      >
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              flex: 1,
              padding: isMobile ? "0" : "0 24px",
              // Vertical dividers only on desktop
              borderLeft: !isMobile && i > 0 ? "1px solid #C8DCFA" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "10px",
                color: "#AAC0E0",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {fact.label}
            </span>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "14px",
                color: "#2D6FE8",
              }}
            >
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
