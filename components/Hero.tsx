"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

const WORDS = ["Product Manager.", "Fintech Native.", "Builder."] as const;

export default function Hero() {
  const isMobile = useIsMobile();

  const tagline = "Builder first. PM second. The order matters.";

  return (
    <section
      style={{
        background: "#0F0F0F",
        width: "100%",
        boxSizing: "border-box",
        padding: isMobile ? "48px 0 0" : "80px 40px 64px",
        animation: "fadeUp 0.7s ease both",
        minHeight: isMobile ? undefined : "580px",
      }}
    >
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "1fr 420px",
          gap: isMobile ? "28px" : "48px",
          alignItems: isMobile ? "stretch" : "center",
          maxWidth: isMobile ? "100%" : "1100px",
          margin: isMobile ? 0 : "0 auto",
        }}
      >
        {/* ── Copy column ── */}
        <div style={{ padding: isMobile ? "0 20px 44px" : 0 }}>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: isMobile ? "30px" : "58px",
              lineHeight: 1.1,
              letterSpacing: isMobile ? "-1px" : "-1.5px",
              color: "#FFFFFF",
              margin: "0 0 8px",
            }}
          >
            I&apos;m Crystal, a
          </p>

          <div
            style={{
              height: isMobile ? "38px" : "68px",
              overflow: "hidden",
              position: "relative",
              marginBottom: isMobile ? "24px" : "28px",
            }}
          >
            {WORDS.map((word, i) => (
              <span
                key={word}
                style={{
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  fontFamily: "Georgia, serif",
                  fontSize: isMobile ? "30px" : "58px",
                  lineHeight: isMobile ? "38px" : "68px",
                  letterSpacing: isMobile ? "-1px" : "-1.5px",
                  color: "#E8B4B8",
                  animation: "rotateWord 3.6s ease infinite",
                  animationDelay: `${i * 1.2}s`,
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: isMobile ? "14px" : "24px",
              color: isMobile ? "#555" : "#777",
              lineHeight: 1.8,
              whiteSpace: isMobile ? "normal" : "nowrap",
              margin: "0 0 16px",
            }}
          >
            {tagline}
          </p>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#E8B4B8",
              lineHeight: 1.75,
              margin: "48px 0 0",
              maxWidth: "420px",
            }}
          >
            &ldquo;Every product I have built started with the same frustration. I was looking for a clear answer in a noisy category and the right tool did not exist. So I built it. That is when AI creates the most value, turning personal pain points into shipped products.&rdquo;
          </p>
        </div>

        {/* ── Photo — full viewport width on mobile ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignSelf: "stretch",
          }}
        >
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                background: "rgba(232,180,184,0.06)",
                borderRadius: "50%",
                width: "440px",
                height: "540px",
                top: "-20px",
                right: "-20px",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/crystal.jpg"
            alt="Crystal King"
            style={{
              position: "relative",
              zIndex: 1,
              display: "block",
              width: isMobile ? "100%" : "420px",
              height: isMobile ? undefined : "560px",
              aspectRatio: isMobile ? "3 / 4" : undefined,
              maxHeight: isMobile ? "min(75vh, 520px)" : undefined,
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: isMobile ? 0 : "200px 200px 180px 180px",
              border: isMobile ? "none" : "1px solid #1E1E1E",
              borderTop: isMobile ? "1px solid #1E1E1E" : undefined,
            }}
          />
        </div>
      </div>
    </section>
  );
}
