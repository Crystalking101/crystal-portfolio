"use client";

import { useState, useEffect } from "react";
import { createAdminBrowserClient } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";
import { DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY, type Project } from "@/lib/supabase";

type Props = {
  initialData?: Partial<Project>;
  projectId?: string;
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Shared input/label styles ────────────────────────────────────────────────
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

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", color: "#0F0F0F" }}>
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "12px",
          border: "none",
          background: checked ? "#2D6FE8" : "#E8E6E1",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "4px",
            left: checked ? "23px" : "4px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
          }}
        />
      </button>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "Georgia, serif",
        fontSize: "16px",
        color: "#0F0F0F",
        fontWeight: "normal",
        margin: "0 0 16px",
        paddingBottom: "10px",
        borderBottom: "1px solid #E8E6E1",
      }}
    >
      {children}
    </p>
  );
}

export default function ProjectForm({ initialData, projectId }: Props) {
  const router = useRouter();
  const supabase = createAdminBrowserClient();
  const isEdit = Boolean(projectId);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [slugManual, setSlugManual] = useState(Boolean(projectId));

  const [title, setTitle]                   = useState(initialData?.title ?? "");
  const [slug, setSlug]                     = useState(initialData?.slug ?? "");
  const [company, setCompany]               = useState(initialData?.company ?? "");
  const [type, setType]                     = useState(initialData?.type ?? "work");
  const [status, setStatus]                 = useState(initialData?.status ?? "live");
  const [cardTheme, setCardTheme]           = useState(initialData?.card_theme ?? "cream");
  const [tagline, setTagline]               = useState(initialData?.tagline ?? "");
  const [statNumber, setStatNumber]         = useState(initialData?.stat_number ?? "");
  const [statLabel, setStatLabel]           = useState(initialData?.stat_label ?? "");
  const [stat2Number, setStat2Number]       = useState(initialData?.stat_2_number ?? "");
  const [stat2Label, setStat2Label]         = useState(initialData?.stat_2_label ?? "");
  const [stat3Number, setStat3Number]       = useState(initialData?.stat_3_number ?? "");
  const [stat3Label, setStat3Label]         = useState(initialData?.stat_3_label ?? "");
  const [yearStart, setYearStart]           = useState(initialData?.year_start ?? "");
  const [yearEnd, setYearEnd]               = useState(initialData?.year_end ?? "");
  const [tags, setTags]                     = useState((initialData?.tags ?? []).join(", "));
  const [roseTags, setRoseTags]             = useState((initialData?.rose_tags ?? []).join(", "));
  const [isFeatured, setIsFeatured]         = useState(initialData?.is_featured ?? false);
  const [published, setPublished]           = useState(initialData?.published ?? true);
  const [sortOrder, setSortOrder]           = useState(String(initialData?.sort_order ?? 0));
  const [description, setDescription]       = useState(initialData?.description ?? "");
  const [caseStudyContent, setCaseStudyContent] = useState(initialData?.case_study_content ?? "");
  const [competitiveLandscapeContent, setCompetitiveLandscapeContent] = useState(
    initialData?.competitive_landscape_content ?? ""
  );

  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  /** New project: load competitive markdown from settings when slug is discover-dramaland. */
  useEffect(() => {
    if (projectId) return;
    if (slug.trim() !== "discover-dramaland") return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("settings")
        .select("value")
        .eq("key", DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY)
        .maybeSingle();
      if (!cancelled) setCompetitiveLandscapeContent(data?.value ?? "");
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, supabase, projectId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");

    const payload = {
      title,
      slug,
      company: company || null,
      type,
      status,
      card_theme: cardTheme,
      tagline: tagline || null,
      stat_number: statNumber || null,
      stat_label: statLabel || null,
      stat_2_number: stat2Number || null,
      stat_2_label: stat2Label || null,
      stat_3_number: stat3Number || null,
      stat_3_label: stat3Label || null,
      year_start: yearStart || null,
      year_end: yearEnd || null,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      rose_tags: roseTags ? roseTags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      is_featured: isFeatured,
      published,
      sort_order: parseInt(sortOrder, 10) || 0,
      description: description || null,
      case_study_content: caseStudyContent || null,
    };

    let error;
    if (isEdit && projectId) {
      ({ error } = await supabase.from("projects").update(payload).eq("id", projectId));
    } else {
      ({ error } = await supabase.from("projects").insert(payload));
    }

    if (error) {
      setSaveError(error.message);
      setSaving(false);
      return;
    }

    if (slug.trim() === "discover-dramaland") {
      const { error: settingsError } = await supabase.from("settings").upsert(
        {
          key: DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY,
          value: competitiveLandscapeContent.trim(),
        },
        { onConflict: "key" }
      );
      if (settingsError) {
        setSaveError(settingsError.message);
        setSaving(false);
        return;
      }
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  const card: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid #E8E6E1",
    borderRadius: "12px",
    padding: "28px",
    marginBottom: "20px",
  };

  const grid2: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  };

  const grid3: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
  };

  return (
    <form onSubmit={handleSave}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
        }}
      >
        <div>
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
            {isEdit ? "Edit Project" : "New Project"}
          </h1>
          {isEdit && (
            <a
              href={`/work/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "12px",
                color: "#2D6FE8",
                textDecoration: "none",
              }}
            >
              ↗ /work/{slug}
            </a>
          )}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "13px",
              color: "#555",
              background: "none",
              border: "1px solid #E8E6E1",
              borderRadius: "6px",
              padding: "9px 18px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </div>

      {saveError && (
        <div
          style={{
            background: "#FDF0EF",
            border: "1px solid #F5C6C2",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "20px",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#C0392B",
          }}
        >
          {saveError}
        </div>
      )}

      {/* ── Core details ── */}
      <div style={card}>
        <SectionTitle>Core Details</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Field label="Title *">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Key Risk Indicator Automation"
              style={inputStyle}
            />
          </Field>

          <Field label="Slug *">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                required
                placeholder="kri-automation"
                style={{ ...inputStyle, flex: 1 }}
              />
              {slugManual && (
                <button
                  type="button"
                  onClick={() => { setSlug(slugify(title)); setSlugManual(false); }}
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "11px",
                    color: "#2D6FE8",
                    background: "#EAF1FD",
                    border: "1px solid #C8DCFA",
                    borderRadius: "4px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Auto
                </button>
              )}
            </div>
          </Field>

          <div style={grid2}>
            <Field label="Company">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="American Express"
                style={inputStyle}
              />
            </Field>
            <Field label="Type">
              <select value={type} onChange={(e) => setType(e.target.value)} style={selectStyle}>
                <option value="work">Work</option>
                <option value="side-project">Side Project</option>
              </select>
            </Field>
          </div>

          <div style={grid3}>
            <Field label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={selectStyle}>
                <option value="live">Live</option>
                <option value="in-progress">In Progress</option>
                <option value="coming-soon">Coming Soon</option>
              </select>
            </Field>
            <Field label="Card Theme">
              <select value={cardTheme} onChange={(e) => setCardTheme(e.target.value)} style={selectStyle}>
                <option value="dark">Dark</option>
                <option value="blue">Blue</option>
                <option value="rose">Rose</option>
                <option value="mint">Mint</option>
                <option value="cream">Cream</option>
                <option value="gold">Gold</option>
              </select>
            </Field>
            <Field label="Sort Order">
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={inputStyle}
              />
            </Field>
          </div>

          <div style={grid2}>
            <Field label="Year Start">
              <input
                type="text"
                value={yearStart}
                onChange={(e) => setYearStart(e.target.value)}
                placeholder="2023"
                style={inputStyle}
              />
            </Field>
            <Field label="Year End">
              <input
                type="text"
                value={yearEnd}
                onChange={(e) => setYearEnd(e.target.value)}
                placeholder="2025"
                style={inputStyle}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Card content ── */}
      <div style={card}>
        <SectionTitle>Card Content</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Field label="Tagline">
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Short one-liner shown on project card"
              style={inputStyle}
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Longer description shown on the card"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Field>

          <div style={grid2}>
            <Field label="Tags (comma-separated)">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Automation, Cross-functional"
                style={inputStyle}
              />
            </Field>
            <Field label="Rose Tags (comma-separated)">
              <input
                type="text"
                value={roseTags}
                onChange={(e) => setRoseTags(e.target.value)}
                placeholder="Risk & Compliance"
                style={inputStyle}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={card}>
        <SectionTitle>Stats</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={grid2}>
            <Field label="Stat 1 — Number">
              <input type="text" value={statNumber} onChange={(e) => setStatNumber(e.target.value)} placeholder="80%" style={inputStyle} />
            </Field>
            <Field label="Stat 1 — Label">
              <input type="text" value={statLabel} onChange={(e) => setStatLabel(e.target.value)} placeholder="manual review time saved" style={inputStyle} />
            </Field>
          </div>
          <div style={grid2}>
            <Field label="Stat 2 — Number">
              <input type="text" value={stat2Number} onChange={(e) => setStat2Number(e.target.value)} placeholder="3M+" style={inputStyle} />
            </Field>
            <Field label="Stat 2 — Label">
              <input type="text" value={stat2Label} onChange={(e) => setStat2Label(e.target.value)} placeholder="cardholders covered" style={inputStyle} />
            </Field>
          </div>
          <div style={grid2}>
            <Field label="Stat 3 — Number">
              <input type="text" value={stat3Number} onChange={(e) => setStat3Number(e.target.value)} placeholder="4" style={inputStyle} />
            </Field>
            <Field label="Stat 3 — Label">
              <input type="text" value={stat3Label} onChange={(e) => setStat3Label(e.target.value)} placeholder="cross-functional teams led" style={inputStyle} />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Visibility ── */}
      <div style={card}>
        <SectionTitle>Visibility</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Toggle label="Published" checked={published} onChange={setPublished} />
          <Toggle label="Is Featured" checked={isFeatured} onChange={setIsFeatured} />
        </div>
      </div>

      {/* ── Case study content ── */}
      <div style={card}>
        <SectionTitle>Case Study Content (Markdown)</SectionTitle>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "12px",
            color: "#BBBBBB",
            margin: "0 0 12px",
          }}
        >
          Use ## headings for sections: Overview, The Problem, My Role, Process, Results, What I Learned
        </p>
        <textarea
          value={caseStudyContent}
          onChange={(e) => setCaseStudyContent(e.target.value)}
          rows={24}
          placeholder={`## Overview\n\n...\n\n## The Problem\n\n...\n\n## My Role\n\n...\n\n## Process\n\n**Step title.** Description\n\n## Results\n\n- **80%** reduction in...\n\n## What I Learned\n\n...`}
          style={{
            ...inputStyle,
            resize: "vertical",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* ── Competitive landscape (DiscoverDramaland) ── */}
      {slug.trim() === "discover-dramaland" && (
      <div style={{ ...card, marginBottom: "0" }}>
        <SectionTitle>Competitive Landscape (Markdown)</SectionTitle>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "12px",
            color: "#BBBBBB",
            margin: "0 0 12px",
          }}
        >
          You can put this block in the <strong style={{ color: "#666" }}>case study</strong> as <code style={{ fontSize: "11px" }}>## Competitive Landscape</code> (anywhere) <em>or</em> here. Case study wins if this field is empty. Saved to <code>settings</code> (key <code>{DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY}</code>). Use markdown or HTML. Renders between <strong style={{ color: "#666" }}>The Market Insight</strong> and the next section.
        </p>
        <textarea
          value={competitiveLandscapeContent}
          onChange={(e) => setCompetitiveLandscapeContent(e.target.value)}
          rows={12}
          placeholder="Optional: markdown or HTML for this section."
          style={{
            ...inputStyle,
            resize: "vertical",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
        />
      </div>
      )}
    </form>
  );
}
