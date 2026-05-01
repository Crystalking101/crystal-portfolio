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
          fontFamily: "Georgia, serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#0F0F0F",
          textDecoration: "none",
          letterSpacing: "-0.4px",
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
            color: "#fff",
            background: "#2D6FE8",
            padding: "7px 16px",
            borderRadius: "4px",
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
