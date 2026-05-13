"use client";

import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Nav() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const linkStyle = (href: string): React.CSSProperties => ({
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px",
    color: "#555",
    textDecoration: "none",
    paddingBottom: "2px",
    borderBottom: pathname === href ? "2px solid #E8B4B8" : "2px solid transparent",
    transition: "color 0.15s",
  });

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "16px 20px" : "18px 32px",
        borderBottom: "1px solid #E8E6E1",
        background: "#F8F7F4",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: isMobile ? "24px" : "clamp(26px, 2.8vw, 32px)",
          fontWeight: 600,
          color: "#0F0F0F",
          textDecoration: "none",
          letterSpacing: "-0.6px",
          lineHeight: 1.1,
        }}
      >
        Crystal King
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "16px" : "28px" }}>
        {!isMobile && (
          <>
            <a
              href="/work"
              style={linkStyle("/work")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F0F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              Work
            </a>
            <a
              href="/projects"
              style={linkStyle("/projects")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F0F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              Projects
            </a>
            <a
              href="/about"
              style={linkStyle("/about")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F0F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              About
            </a>
          </>
        )}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#FFFFFF",
            background: "#B87A7E",
            padding: "7px 16px",
            borderRadius: "4px",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "background 0.15s, opacity 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#9E656A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#B87A7E";
          }}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
