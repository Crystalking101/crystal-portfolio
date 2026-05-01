"use client";

import type { Project } from "@/lib/supabase";

type Props = {
  project: Project;
  width?: number;
  isMobile?: boolean;
};

const accentColorMap: Record<string, string> = {
  dark:  "#E8B4B8",
  blue:  "#2D6FE8",
  rose:  "#B87A7E",
  mint:  "#3A8C72",
  cream: "#888888",
};

function StatusBadge({
  status,
  theme,
}: {
  status: string;
  theme: string;
}) {
  const isLive = status === "live";
  const isInProgress = status === "in-progress";
  if (!isLive && !isInProgress) return null;

  const accent = accentColorMap[theme] ?? "#888";

  const pillStyle: React.CSSProperties = isLive
    ? {
        border: `1px solid ${accent}`,
        color: accent,
        background: "transparent",
      }
    : {
        border: "1px solid #BBBBBB",
        color: "#AAAAAA",
        background: "transparent",
      };

  return (
    <span
      style={{
        ...pillStyle,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: "20px",
        letterSpacing: "0.4px",
        display: "inline-block",
      }}
    >
      {isLive ? "Live" : "In progress"}
    </span>
  );
}

function Tag({
  label,
  theme,
  isRose,
}: {
  label: string;
  theme: string;
  isRose?: boolean;
}) {
  const base: React.CSSProperties = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    padding: "3px 8px",
    borderRadius: "3px",
    display: "inline-block",
  };

  if (theme === "dark") {
    return (
      <span
        style={{
          ...base,
          background: isRose ? "rgba(232,180,184,0.15)" : "rgba(255,255,255,0.07)",
          color: isRose ? "#E8B4B8" : "#555",
        }}
      >
        {label}
      </span>
    );
  }
  if (theme === "blue") {
    return <span style={{ ...base, background: "rgba(45,111,232,0.12)", color: "#185FA5" }}>{label}</span>;
  }
  if (theme === "rose") {
    return <span style={{ ...base, background: "rgba(232,180,184,0.2)", color: "#B87A7E" }}>{label}</span>;
  }
  if (theme === "mint") {
    return <span style={{ ...base, background: "rgba(116,212,183,0.2)", color: "#2A7A60" }}>{label}</span>;
  }
  return <span style={{ ...base, background: "#E4E2DE", color: "#555555" }}>{label}</span>;
}

export default function ProjectCard({ project, width, isMobile }: Props) {
  const {
    title,
    company,
    status,
    slug,
    description,
    stat_number,
    stat_label,
    year_start,
    year_end,
    tags,
    rose_tags,
    card_theme,
  } = project;

  const theme = card_theme ?? "cream";

  const borderColorMap: Record<string, string> = {
    dark:  "#222",
    blue:  "#C8DCFA",
    rose:  "#E8B4B8",
    mint:  "#A8E0D0",
    cream: "#E0DDD8",
  };

  const themeStyles: React.CSSProperties =
    theme === "dark"
      ? { background: "#0F0F0F", border: "1px solid #222" }
      : theme === "blue"
      ? { background: "#EAF1FD", border: "1px solid #C8DCFA" }
      : theme === "rose"
      ? { background: "#F5E6E7", border: "1px solid #E8B4B8" }
      : theme === "mint"
      ? { background: "#E8F8F4", border: "1px solid #A8E0D0" }
      : { background: "#F8F7F4", border: "1px solid #E0DDD8" };

  const titleColor =
    theme === "dark"  ? "#fff"
    : theme === "blue"  ? "#0A1628"
    : theme === "rose"  ? "#3D1A1C"
    : theme === "mint"  ? "#0D3D2E"
    : "#0F0F0F";

  const descColor =
    theme === "dark"  ? "#555"
    : theme === "blue"  ? "#6080AA"
    : theme === "rose"  ? "#B87A7E"
    : theme === "mint"  ? "#3A8C72"
    : "#888888";

  const bottomBorder = borderColorMap[theme] ?? "#E0DDD8";

  const bottomTextColor =
    theme === "dark"  ? "#333"
    : theme === "blue"  ? "#AAC0E0"
    : theme === "rose"  ? "#D4A0A4"
    : theme === "mint"  ? "#7ABFB0"
    : "#999";

  const statColor =
    theme === "dark"  ? "#E8B4B8"
    : theme === "blue"  ? "#2D6FE8"
    : theme === "rose"  ? "#B87A7E"
    : theme === "mint"  ? "#3A8C72"
    : "#0F0F0F";

  // Mobile: 85vw so one card fills the screen with a peek of the next
  const cardWidth = isMobile
    ? "85vw"
    : `${width ?? (theme === "dark" ? 280 : 260)}px`;

  return (
    <a
      href={`/work/${slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        width: cardWidth,
        minWidth: cardWidth,
        borderRadius: "12px",
        overflow: "hidden",
        textDecoration: "none",
        scrollSnapAlign: "start",
        transition: "transform 0.2s, border-color 0.2s",
        flexShrink: 0,
        ...themeStyles,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#2D6FE8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = borderColorMap[theme] ?? "#E0DDD8";
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: theme === "dark" ? "28px 24px 20px" : "24px 26px 20px",
          gap: "10px",
          minHeight: "360px",
        }}
      >
        {/* Title — always at the very top */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "18px",
            color: titleColor,
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>

        {/* Company label — above stat, work projects only */}
        {company && company !== "Side Project" && (
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: bottomTextColor,
            }}
          >
            {company}
          </span>
        )}

        {stat_number && (
          <div style={{ marginBottom: "4px" }}>
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "56px",
                fontWeight: 700,
                color: statColor,
                lineHeight: 1,
              }}
            >
              {stat_number}
            </div>
            {stat_label && (
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "11px",
                  color: descColor,
                  letterSpacing: "0.5px",
                  marginTop: "4px",
                }}
              >
                {stat_label}
              </div>
            )}
          </div>
        )}

        {((tags && tags.length > 0) || (rose_tags && rose_tags.length > 0)) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
            {rose_tags?.map((t) => (
              <Tag key={t} label={t} theme={theme} isRose />
            ))}
            {tags?.map((t) => (
              <Tag key={t} label={t} theme={theme} />
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderTop: `1px solid ${bottomBorder}`,
        }}
      >
        <StatusBadge status={status} theme={theme} />
        <span style={{ color: "#2D6FE8", fontSize: "14px" }}>→</span>
      </div>
    </a>
  );
}

export function ComingSoonCard({ isMobile }: { isMobile?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: isMobile ? "60vw" : "200px",
        minWidth: isMobile ? "60vw" : "200px",
        borderRadius: "12px",
        border: "1px dashed #E0DDD8",
        background: "#F2F0EC",
        padding: "32px 20px",
        gap: "14px",
        scrollSnapAlign: "start",
        flexShrink: 0,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "1.5px dashed #C8C4BE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C8C4BE",
          fontSize: "20px",
        }}
      >
        +
      </div>
      <p
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "12px",
          color: "#BBBBBB",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        More case studies coming soon
      </p>
    </div>
  );
}
