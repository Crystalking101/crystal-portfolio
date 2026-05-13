"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

const WORDS = ["Product Manager.", "Fintech Native.", "Builder."] as const;

export default function Hero() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section
        style={{
          background: "#0F0F0F",
          padding: "48px 20px 44px",
          animation: "fadeUp 0.7s ease both",
        }}
      >
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: "rgba(232,180,184,0.1)",
          border: "1px solid rgba(232,180,184,0.25)",
          borderRadius: "20px",
          padding: "4px 13px",
          marginBottom: "32px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E8B4B8", flexShrink: 0 }} />
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "#E8B4B8", fontWeight: 500 }}>
            Open to PM opportunities
          </span>
        </div>

        {/* Headline */}
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "30px",
          lineHeight: 1.1,
          letterSpacing: "-1px",
          color: "#FFFFFF",
          margin: "0 0 8px",
        }}>
          I&apos;m Crystal, a
        </p>

        {/* Rotating word */}
        <div style={{ height: "38px", overflow: "hidden", position: "relative", marginBottom: "24px" }}>
          {WORDS.map((word, i) => (
            <span key={word} style={{
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              fontFamily: "Georgia, serif",
              fontSize: "30px",
              lineHeight: "38px",
              letterSpacing: "-1px",
              color: "#E8B4B8",
              animation: "rotateWord 3.6s ease infinite",
              animationDelay: `${i * 1.2}s`,
              opacity: i === 0 ? 1 : 0,
            }}>
              {word}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "14px",
          color: "#555",
          lineHeight: 1.8,
          margin: 0,
        }}>
          Builder first. PM second. The order matters.
        </p>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#0F0F0F",
        padding: "80px 40px 64px",
        animation: "fadeUp 0.7s ease both",
        minHeight: "580px",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: "48px",
        alignItems: "center",
        maxWidth: "1100px",
      }}>

        {/* ── LEFT COLUMN ── */}
        <div>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(232,180,184,0.1)",
            border: "1px solid rgba(232,180,184,0.25)",
            borderRadius: "20px",
            padding: "4px 13px",
            marginBottom: "48px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E8B4B8", flexShrink: 0 }} />
            <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "#E8B4B8", fontWeight: 500 }}>
              Open to PM opportunities
            </span>
          </div>

          {/* Static headline line */}
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: "58px",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            color: "#FFFFFF",
            margin: "0 0 8px",
          }}>
            I&apos;m Crystal, a
          </p>

          {/* Rotating words */}
          <div style={{ height: "68px", overflow: "hidden", position: "relative", marginBottom: "28px" }}>
            {WORDS.map((word, i) => (
              <span key={word} style={{
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                fontFamily: "Georgia, serif",
                fontSize: "58px",
                lineHeight: "68px",
                letterSpacing: "-1.5px",
                color: "#E8B4B8",
                animation: "rotateWord 3.6s ease infinite",
                animationDelay: `${i * 1.2}s`,
                opacity: i === 0 ? 1 : 0,
              }}>
                {word}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "17px",
            color: "#777",
            whiteSpace: "nowrap",
            margin: 0,
          }}>
            Builder first. PM second. The order matters.
          </p>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {/* Glow */}
          <div style={{
            position: "absolute",
            background: "rgba(232,180,184,0.06)",
            borderRadius: "50%",
            width: "440px",
            height: "540px",
            top: "-20px",
            right: "-20px",
            zIndex: 0,
            pointerEvents: "none",
          }} />
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/crystal.jpg"
            alt="Crystal King"
            style={{
              position: "relative",
              zIndex: 1,
              width: "420px",
              height: "560px",
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "200px 200px 180px 180px",
              border: "1px solid #1E1E1E",
              display: "block",
            }}
          />
        </div>

      </div>
    </section>
  );
}
