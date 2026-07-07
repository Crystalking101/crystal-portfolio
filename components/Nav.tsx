"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const MOBILE_BREAKPOINT = 768;

export default function Nav() {
  const pathname = usePathname();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMenuOpen(false));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      const el = menuWrapRef.current;
      if (el && !el.contains(e.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const linkStyle = (href: string): CSSProperties => ({
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px",
    color: "#555",
    textDecoration: "none",
    paddingBottom: "2px",
    borderBottom: pathname === href ? "2px solid #E8B4B8" : "2px solid transparent",
    transition: "color 0.15s",
  });

  const mobileNavItems: { href: string; label: string }[] = [
    { href: "/work", label: "Work" },
    { href: "/projects", label: "Products" },
    { href: "/ideas-lab", label: "Ideas Lab" },
    { href: "/about", label: "About" },
  ];

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
      <Link
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
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "28px" }}>
        {!isMobile && (
          <>
            <Link
              href="/work"
              style={linkStyle("/work")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F0F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              Work
            </Link>
            <Link
              href="/projects"
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
                transition: "background 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#9E656A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#B87A7E"; }}
            >
              Products
            </Link>
            <Link
              href="/ideas-lab"
              style={linkStyle("/ideas-lab")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F0F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              Ideas Lab
            </Link>
            <Link
              href="/about"
              style={linkStyle("/about")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F0F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              About
            </Link>
          </>
        )}

        {isMobile && (
          <div ref={menuWrapRef} style={{ position: "relative" }}>
            <button
              type="button"
              id="site-nav-menu-button"
              aria-expanded={menuOpen}
              aria-controls="site-nav-dropdown"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                margin: 0,
                padding: 0,
                border: "1px solid #E0DED8",
                borderRadius: 8,
                background: "#FFFFFF",
                cursor: "pointer",
                color: "#0F0F0F",
              }}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M4 8h16v1.5H4V8zm0 5.25h16v1.5H4v-1.5zm0 5.25h16V20H4v-1.5z" />
                </svg>
              )}
            </button>

            {menuOpen && (
              <div
                id="site-nav-dropdown"
                role="navigation"
                aria-label="Site"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  minWidth: 220,
                  background: "#FFFFFF",
                  border: "1px solid #E8E6E1",
                  borderRadius: 10,
                  boxShadow: "0 12px 40px rgba(15, 15, 15, 0.12)",
                  overflow: "hidden",
                  zIndex: 60,
                }}
              >
                {mobileNavItems.map(({ href, label }, i) => {
                  const active = pathname === href;
                  const itemStyle: CSSProperties = {
                    display: "block",
                    padding: "12px 18px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "15px",
                    textDecoration: "none",
                    borderBottom:
                      i < mobileNavItems.length - 1 ? "1px solid #F0EEEA" : undefined,
                    background: active ? "rgba(232, 180, 184, 0.2)" : "transparent",
                    fontWeight: active ? 600 : 400,
                    color: active ? "#0F0F0F" : "#333",
                  };
                  return (
                    <Link key={href} href={href} style={itemStyle} onClick={() => setMenuOpen(false)}>
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
