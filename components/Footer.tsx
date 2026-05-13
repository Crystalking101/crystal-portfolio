"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer style={{ background: "#E8B4B8" }}>
      {/* Main row */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "center",
          justifyContent: isMobile ? "center" : "space-between",
          textAlign: isMobile ? "center" : "left",
          gap: isMobile ? "20px" : "0",
          padding: "52px 40px 40px",
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "22px",
            color: "#4A1F22",
            margin: 0,
          }}
        >
          Let&apos;s build something together.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <a
            href="mailto:king.d.crystal@gmail.com"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#7A3D41",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Email
          </a>
          <span
            style={{
              color: "#C47A7E",
              fontSize: "8px",
              margin: "0 12px",
              lineHeight: 1,
            }}
          >
            ●
          </span>
          <a
            href="https://www.linkedin.com/in/crystalking101/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#7A3D41",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            LinkedIn
          </a>
          <span
            style={{
              color: "#C47A7E",
              fontSize: "8px",
              margin: "0 12px",
              lineHeight: 1,
            }}
          >
            ●
          </span>
          <a
            href="https://github.com/Crystalking101"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#7A3D41",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#DFA8AC",
          margin: "0 40px",
        }}
      />

      {/* Copyright bar */}
      <p
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "12px",
          color: "#C47A7E",
          textAlign: "center",
          padding: "18px 40px",
          margin: 0,
        }}
      >
        © 2026 Crystal King. Independently designed, built, and launched.
      </p>
    </footer>
  );
}
