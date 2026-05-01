"use client";

import { createAdminBrowserClient } from "@/lib/supabase-admin";
import { useRouter, usePathname } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createAdminBrowserClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const navLink = (href: string, label: string): React.CSSProperties => ({
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "13px",
    color: pathname === href ? "#2D6FE8" : "#555",
    textDecoration: "none",
    fontWeight: pathname === href ? 600 : 400,
    borderBottom: pathname === href ? "2px solid #2D6FE8" : "2px solid transparent",
    paddingBottom: "2px",
    transition: "color 0.15s",
  });

  return (
    <nav
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E8E6E1",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "52px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "15px",
            color: "#0F0F0F",
            fontWeight: 700,
            letterSpacing: "-0.3px",
          }}
        >
          Crystal Admin
        </span>
        <a href="/admin" style={navLink("/admin", "Projects")}>
          Projects
        </a>
        <a href="/admin/settings" style={navLink("/admin/settings", "Settings")}>
          Settings
        </a>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#888",
            textDecoration: "none",
          }}
        >
          ↗ View site
        </a>
        <button
          onClick={handleSignOut}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#888",
            background: "none",
            border: "1px solid #E8E6E1",
            borderRadius: "4px",
            padding: "5px 12px",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
