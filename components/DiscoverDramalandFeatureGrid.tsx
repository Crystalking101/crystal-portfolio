/**
 * Discover Dramaland — 3×2 feature grid (from dramaland_feature_grid_final.html).
 */

import type { CSSProperties } from "react";

const BORDER = "#F9A8B4";
const RADIUS = "12px";
const BG_FEATURED = "#FFF1F4";
const BG_DEFAULT = "#FFFFFF";
const ICON_BG_STRONG = "#FB7185";
const ICON_BG_SOFT = "#FECDD3";
const TITLE_FEATURED = "#881337";
const BODY_FEATURED = "#9F1239";
const TITLE_DEFAULT = "#0F0F0F";
const BODY_DEFAULT = "#57534E";
const STROKE = "#9F1239";

type DramalandFeatureCell = {
  id: string;
  featured?: boolean;
  title: string;
  body: string;
  icon: "play" | "search" | "bookmark" | "message" | "grid" | "star";
};

const CELLS: DramalandFeatureCell[] = [
  {
    id: "stream",
    featured: true,
    title: "Free streaming, no paywalls",
    body: "Users can watch full Asian short dramas at no cost. There are no coins, no subscriptions and no locked episodes standing between them and the content.",
    icon: "play",
  },
  {
    id: "search",
    title: "Tag-based search",
    body: "Users can search by trope, genre or title. The search experience is built around how drama fans actually discover content rather than how content is catalogued.",
    icon: "search",
  },
  {
    id: "watchlist",
    title: "Watchlist and my list",
    body: "Users can save shows to a personal list tied to their account. This drives return visits and helps users keep track of serialized content across sessions.",
    icon: "bookmark",
  },
  {
    id: "comments",
    title: "Comments and community",
    body: "Users can leave comments on every show. An admin moderation layer keeps the community feed high quality without requiring users to create a separate account.",
    icon: "message",
  },
  {
    id: "admin",
    title: "Admin content panel",
    body: "A custom internal CMS allows the team to add shows, curate homepage categories, moderate comments and manage the hero banner without touching the database directly.",
    icon: "grid",
  },
  {
    id: "discovery",
    title: "Curated discovery rows",
    body: "The homepage surfaces five editorially curated rows including Hot Picks, Fan Favorites, Trending, Recently Added and Spicy and Steamy to guide users toward content they will enjoy.",
    icon: "star",
  },
];

function FeatureIcon({ id, featured }: { id: DramalandFeatureCell["icon"]; featured?: boolean }) {
  const size = 18;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24" as const,
    fill: "none" as const,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const stroke = featured ? "#FFFFFF" : STROKE;

  switch (id) {
    case "play":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" stroke={stroke} />
          <polygon points="10 8 16 12 10 16 10 8" fill={featured ? "#FFFFFF" : STROKE} stroke="none" />
        </svg>
      );
    case "search":
      return (
        <svg {...common} stroke={stroke}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...common} stroke={stroke}>
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "message":
      return (
        <svg {...common} stroke={stroke}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common} stroke={stroke}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} stroke={stroke}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DiscoverDramalandFeatureGrid({ isMobile }: { isMobile: boolean }) {
  const cols = isMobile ? 1 : 3;

  const cellBorder = (index: number): CSSProperties => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    if (isMobile) {
      return {
        borderBottom: index < CELLS.length - 1 ? `0.5px solid ${BORDER}` : "none",
        borderRight: "none",
      };
    }
    return {
      borderRight: col < cols - 1 ? `0.5px solid ${BORDER}` : "none",
      borderBottom: row < Math.ceil(CELLS.length / cols) - 1 ? `0.5px solid ${BORDER}` : "none",
    };
  };

  return (
    <div style={{ padding: "16px 0 0" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          border: `0.5px solid ${BORDER}`,
          borderRadius: RADIUS,
          overflow: "hidden",
        }}
      >
        {CELLS.map((cell, i) => {
          const featured = !!cell.featured;
          return (
            <div
              key={cell.id}
              style={{
                padding: "1.5rem",
                background: featured ? BG_FEATURED : BG_DEFAULT,
                ...cellBorder(i),
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: featured ? ICON_BG_STRONG : ICON_BG_SOFT,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <FeatureIcon id={cell.icon} featured={featured} />
              </div>
              <p
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  margin: "0 0 8px",
                  color: featured ? TITLE_FEATURED : TITLE_DEFAULT,
                }}
              >
                {cell.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: 13,
                  color: featured ? BODY_FEATURED : BODY_DEFAULT,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {cell.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
