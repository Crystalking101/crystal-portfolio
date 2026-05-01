"use client";

import { useState, useEffect } from "react";
import { createAdminBrowserClient } from "@/lib/supabase-admin";

export default function SettingsPage() {
  const supabase = createAdminBrowserClient();
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail]       = useState("");
  const [github, setGithub]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("settings").select("key, value");
      if (data) {
        const map = Object.fromEntries(data.map((r: { key: string; value: string | null }) => [r.key, r.value ?? ""]));
        setLinkedin(map["linkedin_url"] ?? "");
        setEmail(map["email"] ?? "");
        setGithub(map["github_url"] ?? "");
      }
      setLoading(false);
    }
    load();
  }, [supabase]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    const rows = [
      { key: "linkedin_url", value: linkedin },
      { key: "email",        value: email },
      { key: "github_url",   value: github },
    ];

    const { error: err } = await supabase
      .from("settings")
      .upsert(rows, { onConflict: "key" });

    if (err) {
      setError(err.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "11px",
    color: "#BBBBBB",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "6px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #E8E6E1",
    borderRadius: "6px",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px",
    background: "#F8F7F4",
    color: "#0F0F0F",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "26px",
            color: "#0F0F0F",
            fontWeight: "normal",
            letterSpacing: "-0.5px",
            margin: "0 0 4px",
          }}
        >
          Settings
        </h1>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#BBBBBB",
            margin: 0,
          }}
        >
          Site-wide links and contact info
        </p>
      </div>

      {loading ? (
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", color: "#BBBBBB" }}>
          Loading…
        </p>
      ) : (
        <form onSubmit={handleSave} style={{ maxWidth: "560px" }}>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E6E1",
              borderRadius: "12px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <label style={labelStyle}>LinkedIn URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://www.linkedin.com/in/crystalking101/"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="king.d.crystal@gmail.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>GitHub URL</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/"
                style={inputStyle}
              />
            </div>
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
                marginTop: "16px",
              }}
            >
              {error}
            </p>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              disabled={saving}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#fff",
                background: saving ? "#8AB4F8" : "#2D6FE8",
                border: "none",
                borderRadius: "6px",
                padding: "9px 22px",
                cursor: saving ? "default" : "pointer",
              }}
            >
              {saving ? "Saving…" : "Save Settings"}
            </button>
            {saved && (
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "13px",
                  color: "#1A7A4A",
                }}
              >
                ✓ Saved
              </span>
            )}
          </div>

          {/* Setup note */}
          <div
            style={{
              marginTop: "32px",
              background: "#F8F7F4",
              border: "1px solid #E8E6E1",
              borderRadius: "8px",
              padding: "16px 20px",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "11px",
                color: "#BBBBBB",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              First-time setup
            </p>
            <p
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: "12px",
                color: "#555",
                lineHeight: 1.7,
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {`create table settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text
);

insert into settings (key, value) values
  ('linkedin_url', ''),
  ('email', 'king.d.crystal@gmail.com'),
  ('github_url', '');`}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
