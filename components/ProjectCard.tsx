"use client";

/**
 * Project card — portfolio summary tile linking to `/work/[slug]`.
 * FinTips (`slug === "fintips"`) is image-only: `/Tips.png`, no text chrome.
 * Discover Dramaland (`slug === "discover-dramaland"`) is image-only: `/dramaland-thumbnail.png`.
 * KRI (`slug === "kri-automation"`) is image-only: `/Amex-card.png`.
 * Protein Snacker (`slug === "protein-snacker"`) is image-only: `/Snacker-card2.png`.
 * Used in carousels (`/work`, homepage) and grid (`/projects`).
 */

import type { Project } from "@/lib/supabase";

/** Desktop carousel width; image cards use `IMG_ASPECT` below. */
const CARD_W = 432;
/** Mobile carousel: viewport width for one card + peek of next. */
const MOBILE_CAROUSEL_W = "94vw";
/**
 * Image-only cards: height chosen so aspect matches text cards (minHeight CARD_W + footer row ≈ proportional to legacy 320×368).
 */
const IMG_HEIGHT_AT_CARD_W = Math.round((CARD_W * 368) / 320);
const IMG_ASPECT = `${CARD_W} / ${IMG_HEIGHT_AT_CARD_W}`;

type Props = {
  project: Project;
  width?: number;
  isMobile?: boolean;
  /** Fill a CSS grid cell (width 100%, minWidth 0). */
  fillGrid?: boolean;
  /** When false, hover keeps the theme border (no blue outline). */
  blueHoverBorder?: boolean;
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
        padding: "2px 7px",
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
    fontSize: "10px",
    fontWeight: 500,
    padding: "3px 7px",
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

export default function ProjectCard({ project, width, isMobile, fillGrid, blueHoverBorder = true }: Props) {
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

  /** Image-only card; asset in `/public/Tips.png`. Fills fixed aspect (~same footprint as text cards). */
  if (slug === "fintips") {
    const cardWidth = fillGrid
      ? "100%"
      : isMobile
        ? MOBILE_CAROUSEL_W
        : `${width ?? CARD_W}px`;
    const minW = fillGrid ? 0 : cardWidth;
    return (
      <a
        href="/work/fintips"
        style={{
          position: "relative",
          display: "block",
          width: cardWidth,
          minWidth: minW,
          maxWidth: fillGrid ? "100%" : undefined,
          aspectRatio: IMG_ASPECT,
          borderRadius: "14px",
          overflow: "hidden",
          textDecoration: "none",
          scrollSnapAlign: fillGrid ? undefined : "start",
          transition: "transform 0.2s, border-color 0.2s",
          flexShrink: fillGrid ? 1 : 0,
          border: "1px solid #E0DDD8",
          background: "#0F0F0F",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#2D6FE8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#E0DDD8";
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Tips.png"
          alt="FinTips — personal finance web app"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </a>
    );
  }

  /** Image-only card; asset in `/public/dramaland-thumbnail.png`. Same footprint as FinTips for grid alignment. */
  if (slug === "discover-dramaland") {
    const cardWidth = fillGrid
      ? "100%"
      : isMobile
        ? MOBILE_CAROUSEL_W
        : `${width ?? CARD_W}px`;
    const minW = fillGrid ? 0 : cardWidth;
    return (
      <a
        href="/work/discover-dramaland"
        style={{
          position: "relative",
          display: "block",
          width: cardWidth,
          minWidth: minW,
          maxWidth: fillGrid ? "100%" : undefined,
          aspectRatio: IMG_ASPECT,
          borderRadius: "14px",
          overflow: "hidden",
          textDecoration: "none",
          scrollSnapAlign: fillGrid ? undefined : "start",
          transition: "transform 0.2s, border-color 0.2s",
          flexShrink: fillGrid ? 1 : 0,
          border: "1px solid #E8B4B8",
          background: "#F5E6E7",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#2D6FE8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#E8B4B8";
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dramaland-thumbnail.png"
          alt="Discover Dramaland — K-drama discovery app"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </a>
    );
  }

  /** Image-only card; asset in `/public/Amex-card.png`. Blue theme border to match `card_theme: blue`. */
  if (slug === "kri-automation") {
    const cardWidth = fillGrid
      ? "100%"
      : isMobile
        ? MOBILE_CAROUSEL_W
        : `${width ?? CARD_W}px`;
    const minW = fillGrid ? 0 : cardWidth;
    return (
      <a
        href="/work/kri-automation"
        style={{
          position: "relative",
          display: "block",
          width: cardWidth,
          minWidth: minW,
          maxWidth: fillGrid ? "100%" : undefined,
          aspectRatio: IMG_ASPECT,
          borderRadius: "14px",
          overflow: "hidden",
          textDecoration: "none",
          scrollSnapAlign: fillGrid ? undefined : "start",
          transition: "transform 0.2s, border-color 0.2s",
          flexShrink: fillGrid ? 1 : 0,
          border: "1px solid #C8DCFA",
          background: "#EAF1FD",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#2D6FE8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#C8DCFA";
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Amex-card.png"
          alt="Key Risk Indicator Automation — American Express"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </a>
    );
  }

  /** Image-only card; asset in `/public/Snacker-card2.png`. Mint theme to match `card_theme: mint`. */
  if (slug === "protein-snacker") {
    const cardWidth = fillGrid
      ? "100%"
      : isMobile
        ? MOBILE_CAROUSEL_W
        : `${width ?? CARD_W}px`;
    const minW = fillGrid ? 0 : cardWidth;
    return (
      <a
        href="/work/protein-snacker"
        style={{
          position: "relative",
          display: "block",
          width: cardWidth,
          minWidth: minW,
          maxWidth: fillGrid ? "100%" : undefined,
          aspectRatio: IMG_ASPECT,
          borderRadius: "14px",
          overflow: "hidden",
          textDecoration: "none",
          scrollSnapAlign: fillGrid ? undefined : "start",
          transition: "transform 0.2s, border-color 0.2s",
          flexShrink: fillGrid ? 1 : 0,
          border: "1px solid #A8E0D0",
          background: "#E8F8F4",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#2D6FE8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          if (blueHoverBorder) e.currentTarget.style.borderColor = "#A8E0D0";
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Snacker-card2.png"
          alt="Protein Snacker — snack discovery for macro trackers"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </a>
    );
  }

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

  // Mobile carousel: one card + peek of next (`MOBILE_CAROUSEL_W`)
  const cardWidth = fillGrid
    ? "100%"
    : isMobile
      ? MOBILE_CAROUSEL_W
      : `${width ?? CARD_W}px`;
  const minW = fillGrid ? 0 : cardWidth;

  return (
    <a
      href={`/work/${slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        width: cardWidth,
        minWidth: minW,
        maxWidth: fillGrid ? "100%" : undefined,
        borderRadius: "14px",
        overflow: "hidden",
        textDecoration: "none",
        scrollSnapAlign: fillGrid ? undefined : "start",
        transition: "transform 0.2s, border-color 0.2s",
        flexShrink: fillGrid ? 1 : 0,
        ...themeStyles,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        if (blueHoverBorder) e.currentTarget.style.borderColor = "#2D6FE8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        if (blueHoverBorder) {
          e.currentTarget.style.borderColor = borderColorMap[theme] ?? "#E0DDD8";
        }
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: theme === "dark" ? "22px 20px 16px" : "20px 22px 16px",
          gap: "9px",
          minHeight: `${CARD_W}px`,
        }}
      >
        {/* Title — always at the very top */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "17px",
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
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "1px",
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
                fontSize: "50px",
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
                  fontSize: "10px",
                  color: descColor,
                  letterSpacing: "0.45px",
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
          padding: "12px 20px",
          borderTop: `1px solid ${bottomBorder}`,
        }}
      >
        <StatusBadge status={status} theme={theme} />
        <span style={{ color: "#2D6FE8", fontSize: "14px" }}>→</span>
      </div>
    </a>
  );
}

/** Placeholder project card for work not yet published. */
export function ComingSoonCard({
  isMobile,
  fillGrid,
}: {
  isMobile?: boolean;
  fillGrid?: boolean;
}) {
  const w = fillGrid ? "100%" : isMobile ? MOBILE_CAROUSEL_W : `${CARD_W}px`;
  const minW = fillGrid ? 0 : isMobile ? MOBILE_CAROUSEL_W : `${CARD_W}px`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: w,
        minWidth: minW,
        maxWidth: fillGrid ? "100%" : undefined,
        minHeight: fillGrid ? "min(290px, 46vw)" : `min(${IMG_HEIGHT_AT_CARD_W}px, 62vw)`,
        borderRadius: "14px",
        border: "1px solid #E8B4B8",
        background: "#F5E6E7",
        padding: fillGrid ? "28px 18px" : "24px 16px",
        gap: 0,
        scrollSnapAlign: fillGrid ? undefined : "start",
        flexShrink: fillGrid ? 1 : 0,
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "19px",
          fontWeight: 500,
          color: "#8B4A5C",
          lineHeight: 1.45,
          letterSpacing: "-0.02em",
          margin: 0,
          maxWidth: "12em",
        }}
      >
        More case studies coming soon
      </p>
    </div>
  );
}
