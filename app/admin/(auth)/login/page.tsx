"use client";

import { useState } from "react";
import { createAdminBrowserClient } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createAdminBrowserClient();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #E8E6E1",
    borderRadius: "6px",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px",
    background: "#F8F7F4",
    color: "#0F0F0F",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "11px",
    color: "#BBBBBB",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F7F4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E6E1",
          borderRadius: "12px",
          padding: "40px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "22px",
            color: "#0F0F0F",
            margin: "0 0 4px",
            letterSpacing: "-0.3px",
          }}
        >
          Admin
        </p>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#BBBBBB",
            margin: "0 0 32px",
          }}
        >
          crystal-portfolio
        </p>

        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>

          {error && (
            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "13px",
                color: "#C0392B",
                background: "#FDF0EF",
                border: "1px solid #F5C6C2",
                borderRadius: "6px",
                padding: "10px 14px",
                marginBottom: "16px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#8AB4F8" : "#2D6FE8",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              cursor: loading ? "default" : "pointer",
              transition: "opacity 0.15s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
