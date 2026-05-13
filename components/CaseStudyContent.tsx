"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CaseStudyCtaBand, { FinTipsCtaLayoutSpacer } from "@/components/CaseStudyCtaBand";
import DiscoverDramalandCta from "@/components/DiscoverDramalandCta";
import DiscoverDramalandFeatureGrid from "@/components/DiscoverDramalandFeatureGrid";
import { useInPageNavActive } from "@/hooks/useInPageNavActive";
import type { Project } from "@/lib/supabase";
import { useIsMobile } from "@/hooks/useIsMobile";

const InsideItalicBox = createContext(false);

type Props = {
  project: Project;
  prev: Project | null;
  next: Project | null;
};

// ── Accent colours per card theme ──────────────────────────────
const accentMap: Record<string, string> = {
  dark:  "#E8B4B8",
  blue:  "#2D6FE8",
  rose:  "#B87A7E",
  mint:  "#3A8C72",
  cream: "#888888",
};

// ── Per-project sidebar config ──────────────────────────────────
type SidebarTag = { label: string; variant: "rose" | "blue" };
type SidebarConfig = {
  borderColor: string;
  rows: { label: string; value: string }[];
  tagsLabel?: string;
  tags?: SidebarTag[];
  link?: { label: string; href: string };
};

const SIDEBAR_CONFIG: Record<string, SidebarConfig> = {
  "kri-automation": {
    borderColor: "#2D6FE8",
    rows: [
      { label: "Role",     value: "Associate Product Manager" },
      { label: "Duration", value: "4 months" },
      { label: "Teams",    value: "Risk, Compliance, Engineering, Operations" },
      { label: "Domain",   value: "Risk and Compliance" },
    ],
    tagsLabel: "Skills Used",
    tags: [
      { label: "Risk and Compliance",       variant: "rose" },
      { label: "Automation",                variant: "blue" },
      { label: "Cross-functional Delivery", variant: "blue" },
      { label: "Gap Analysis",              variant: "blue" },
      { label: "Stakeholder Management",    variant: "blue" },
    ],
  },
  "discover-dramaland": {
    borderColor: "#E8B4B8",
    rows: [
      { label: "Role",     value: "Founder & Product Manager" },
      { label: "Timeline", value: "2026 — Ongoing" },
      { label: "Type",     value: "Side Project" },
      { label: "Status",   value: "Live" },
    ],
    tagsLabel: "Stack",
    tags: [
      { label: "Next.js",       variant: "rose" },
      { label: "Supabase",      variant: "rose" },
      { label: "Vercel",        variant: "rose" },
      { label: "Google OAuth",  variant: "rose" },
      { label: "Figma",         variant: "rose" },
      { label: "Mockup App",    variant: "rose" },
    ],
    link: { label: "discoverdramaland.com", href: "https://discoverdramaland.com" },
  },
};

// ── Sidebar card (shared desktop + mobile) ──────────────────────
function ProjectSidebar({ config }: { config: SidebarConfig }) {
  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "10px",
    color: "#BBBBBB",
    fontWeight: 400,
    margin: "0 0 3px",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  };
  const valueStyle: React.CSSProperties = {
    fontFamily: "var(--font-playfair), Georgia, serif",
    fontSize: "14px",
    color: "#0F0F0F",
    fontWeight: 500,
    margin: 0,
    lineHeight: 1.4,
  };
  const sectionLabelStyle: React.CSSProperties = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "10px",
    color: "#BBBBBB",
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  };

  return (
    <div style={{
      background: "#FFFFFF",
      border: `2px solid ${config.borderColor}`,
      borderRadius: "12px",
      padding: "28px",
      boxShadow: "0 4px 20px rgba(45,111,232,0.15)",
      display: "flex",
      flexDirection: "column",
    }}>
      {config.rows.map((row, i, arr) => (
        <div key={row.label} style={{ marginBottom: i < arr.length - 1 ? "16px" : "0" }}>
          <p style={labelStyle}>{row.label}</p>
          <p style={valueStyle}>{row.value}</p>
        </div>
      ))}

      {config.tags && config.tags.length > 0 && (
        <>
          <div style={{ height: "1px", background: "#E8E6E1", margin: "20px 0" }} />
          <p style={sectionLabelStyle}>{config.tagsLabel ?? "Tags"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {config.tags.map((tag) => (
              <span key={tag.label} style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "12px",
                fontWeight: 500,
                padding: "4px 11px",
                borderRadius: "20px",
                background: tag.variant === "rose" ? "#F5E6E7" : "#EAF1FD",
                border: `1px solid ${tag.variant === "rose" ? "#E8B4B8" : "#C8DCFA"}`,
                color: tag.variant === "rose" ? "#B87A7E" : "#2D6FE8",
              }}>{tag.label}</span>
            ))}
          </div>
        </>
      )}

      {config.link && (
        <>
          <div style={{ height: "1px", background: "#E8E6E1", margin: "20px 0" }} />
          <p style={sectionLabelStyle}>Live Product</p>
          <a
            href={config.link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#B87A7E",
              textDecoration: "none",
              wordBreak: "break-all",
            }}
          >
            {config.link.label} ↗
          </a>
        </>
      )}
    </div>
  );
}

// ── Preprocess markdown: convert <br> HTML tags to markdown hard breaks ──
function prepMd(md: string): string {
  return md
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/<br\s*\/?>/gi, "  \n");
}

/** Split at a line starting with `## Features` (before `## My Role` this lives in `beforeMyRole`). */
function splitMarkdownAtFeaturesHeading(md: string): [string, string] | null {
  if (!md.trim()) return null;
  const normalized = md
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
  const re = /^##\s+features\b.*$/im;
  const match = normalized.match(re);
  if (!match || match.index === undefined) return null;
  const before = normalized.slice(0, match.index).trimEnd();
  const after = normalized.slice(match.index + match[0].length).replace(/^\n+/, "");
  return [before, after];
}

/** Sticky sub-nav scroll offset (site nav + sub-nav). */
const DRAMALAND_SUB_NAV_SCROLL = "120px";

/** Y from viewport top for Dramaland sub-nav scroll-spy (site nav + sticky bar). */
const DRAMALAND_NAV_ACTIVATION_PX = { mobile: 108, desktop: 118 } as const;

/**
 * Discover Dramaland sub-nav anchors + scroll-spy.
 * - `href` must match a real element `id` on the page (`#the-problem` = `id="the-problem"` on an h2 from markdown, etc.).
 * - Keep this list in **the same order** as sections appear top-to-bottom so the active link tracks scroll correctly.
 * - If a link has no matching `id`, that item never becomes “active”; fix the `href` or the heading text in CMS.
 */
const DISCOVER_DRAMALAND_SUBNAV: { href: string; label: string }[] = [
  { href: "#the-problem", label: "Problem" },
  { href: "#the-market-insight", label: "Market" },
  { href: "#competitive-landscape", label: "Competitive" },
  { href: "#persona-the-discoverer", label: "Persona" },
  { href: "#the-solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#the-design-process", label: "Process" },
  { href: "#how-success-is-measured", label: "Metrics" },
  { href: "#risks", label: "Risk" },
  { href: "#go-to-market", label: "GTM" },
  { href: "#next-steps", label: "NxtSteps" },
];

const DD_NAV_BG = "#F8F7F4";
const DD_NAV_ROSE = "#B87A7E";
const DD_NAV_MUTED = "#6B6558";
const DD_NAV_BORDER = "rgba(15, 15, 15, 0.1)";

function plainTextFromNodes(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainTextFromNodes).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    const el = node as { props?: { children?: ReactNode } };
    return plainTextFromNodes(el.props?.children as ReactNode);
  }
  return "";
}

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function DiscoverDramalandSubNav({
  isMobile,
  brandLabel,
  brandTitle,
  ctaHref,
}: {
  isMobile: boolean;
  brandLabel: string;
  /** Full name for hover tooltip (optional). */
  brandTitle?: string;
  ctaHref: string;
}) {
  const navTop = isMobile ? 56 : 64;
  const activationPx = isMobile
    ? DRAMALAND_NAV_ACTIVATION_PX.mobile
    : DRAMALAND_NAV_ACTIVATION_PX.desktop;
  const activeHref = useInPageNavActive(
    DISCOVER_DRAMALAND_SUBNAV.map((item) => item.href),
    activationPx,
  );

  const linkRow = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "1px" : "4px",
        minWidth: 0,
        justifyContent: isMobile ? "flex-start" : "center",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "thin",
      }}
    >
      {DISCOVER_DRAMALAND_SUBNAV.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "location" : undefined}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: isMobile ? "11px" : "12px",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? DD_NAV_ROSE : DD_NAV_MUTED,
              background: isActive ? "rgba(232, 180, 184, 0.28)" : "transparent",
              textDecoration: "none",
              padding: isMobile ? "6px 7px" : "7px 9px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = DD_NAV_ROSE;
              e.currentTarget.style.background = "rgba(232, 180, 184, 0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isActive ? DD_NAV_ROSE : DD_NAV_MUTED;
              e.currentTarget.style.background = isActive
                ? "rgba(232, 180, 184, 0.28)"
                : "transparent";
            }}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );

  const cta = (
    <a
      href={ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flexShrink: 0,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: isMobile ? "11px" : "12px",
        fontWeight: 600,
        color: "#FFFFFF",
        background: DD_NAV_ROSE,
        textDecoration: "none",
        padding: isMobile ? "7px 10px" : "8px 14px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
      }}
    >
      Watch now →
    </a>
  );

  const brand = (
    <span
      style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: isMobile ? "16px" : "18px",
        fontWeight: 600,
        color: DD_NAV_ROSE,
        letterSpacing: "-0.35px",
        flexShrink: 0,
        maxWidth: isMobile ? "min(36vw, 152px)" : "200px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      title={brandTitle ?? brandLabel}
    >
      {brandLabel}
    </span>
  );

  return (
    <nav
      aria-label="Discover Dramaland page sections"
      style={{
        position: "sticky",
        top: navTop,
        zIndex: 45,
        background: DD_NAV_BG,
        borderBottom: `1px solid ${DD_NAV_BORDER}`,
        boxShadow: "0 1px 0 rgba(15, 15, 15, 0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          padding: isMobile ? "10px 12px" : "12px 20px",
        }}
      >
        {isMobile ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              {brand}
              {cta}
            </div>
            {linkRow}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            {brand}
            <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center" }}>{linkRow}</div>
            {cta}
          </div>
        )}
      </div>
    </nav>
  );
}

/** Narrow 1px rule between Discover Dramaland sections (matches light cream layout). */
function DiscoverDramalandSectionDivider() {
  return (
    <div
      role="separator"
      aria-hidden
      style={{
        height: "1px",
        width: "92%",
        maxWidth: "720px",
        margin: "36px auto",
        background: "rgba(15, 15, 15, 0.08)",
      }}
    />
  );
}

/** Remove leading rows that only embed `/drama-competitive.png` so pasted markdown does not duplicate that figure. */
function stripLeadingBundledCompetitiveDiagramRows(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) {
      i += 1;
      continue;
    }
    const mdImg = /^\s*!\[[^\]]*\]\(([^)]*)\)\s*$/.exec(line);
    if (mdImg && /drama-competitive\.png/i.test(mdImg[1])) {
      i += 1;
      continue;
    }
    const htmlImg = /^\s*<img\b[^>]*\bsrc=["']([^"']*)["'][^>]*>\s*$/i.exec(line);
    if (htmlImg && /drama-competitive\.png/i.test(htmlImg[1])) {
      i += 1;
      continue;
    }
    break;
  }
  return lines.slice(i).join("\n").trimStart();
}

/** Remove duplicate page heading when the same H2 is pasted into settings or case study. */
function stripDuplicateCompetitiveH2(md: string): string {
  return md.replace(/^##\s+Competitive Landscape\s*\n+/im, "").trimStart();
}

/**
 * Remove `## Competitive Landscape` … up to the next top-level `##` from the main body
 * so it can render under the dedicated Competitive block (image + prose).
 */
function extractCompetitiveLandscapeSection(md: string): { remainder: string; body: string | null } {
  const normalized = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n");
  const startIdx = lines.findIndex((line) =>
    /^##\s+Competitive Landscape\s*$/i.test(line.replace(/\r/g, "").trimEnd())
  );
  if (startIdx === -1) return { remainder: md, body: null };

  let endIdx = lines.length;
  for (let j = startIdx + 1; j < lines.length; j++) {
    const raw = lines[j].replace(/\r/g, "");
    if (/^##\s+/.test(raw)) {
      endIdx = j;
      break;
    }
  }

  const bodyLines = lines.slice(startIdx + 1, endIdx);
  const body = bodyLines.join("\n").trim();
  const remainderLines = [...lines.slice(0, startIdx), ...lines.slice(endIdx)];
  const remainder = remainderLines.join("\n").trimEnd();

  return { remainder, body: body.length > 0 ? body : null };
}

// ── Inline em renderer — context-aware ─────────────────────────
function EmRenderer({ children }: { children: ReactNode }) {
  const insideBox = useContext(InsideItalicBox);
  if (insideBox) {
    return <em style={{ fontStyle: "italic" }}>{children}</em>;
  }
  return (
    <em style={{ fontStyle: "normal", fontWeight: 700, fontSize: "15px", color: "#333" }}>
      {children}
    </em>
  );
}

// ── Markdown prose renderer ─────────────────────────────────────
function Prose({
  content,
  allowHtml,
  autoHeadingIds,
}: {
  content: string;
  allowHtml?: boolean;
  autoHeadingIds?: boolean;
}) {
  const h2Scroll: CSSProperties = autoHeadingIds ? { scrollMarginTop: DRAMALAND_SUB_NAV_SCROLL } : {};
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={allowHtml ? [rehypeRaw] : undefined}
      components={{
        h2: ({ children }) => {
          const label = plainTextFromNodes(children as ReactNode);
          const id =
            autoHeadingIds && label ? slugifyHeading(label) : undefined;
          return (
            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "22px",
              color: "#0F0F0F",
              margin: "40px 0 12px",
              letterSpacing: "-0.3px",
              fontWeight: 600,
              ...h2Scroll,
            }} id={id}>{children}</h2>
          );
        },
        h3: ({ children }) => (
          <h3 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "17px",
            fontWeight: 600,
            color: "#0F0F0F",
            margin: "28px 0 8px",
            letterSpacing: "-0.1px",
          }}>{children}</h3>
        ),
        p: ({ children, node }) => {
          // A fully italic paragraph (*...*) wraps all visible content in <em>.
          // Guard against trailing whitespace text nodes by allowing them.
          const isItalicParagraph =
            !!node?.children?.length &&
            node.children.every(
              (child) =>
                (child.type === "element" &&
                  (child as { tagName?: string }).tagName === "em") ||
                (child.type === "text" &&
                  (child as { value?: string }).value?.trim() === "")
            ) &&
            node.children.some(
              (child) =>
                child.type === "element" &&
                (child as { tagName?: string }).tagName === "em"
            );
          return isItalicParagraph ? (
            <InsideItalicBox.Provider value={true}>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "15px",
                color: "#0F0F0F",
                lineHeight: 1.9,
                margin: "0 0 20px",
                fontStyle: "italic",
                border: "2px solid #E8B4B8",
                borderRadius: "8px",
                padding: "14px 18px",
                boxShadow: "0 4px 20px rgba(232,180,184,0.3)",
              }}>{children}</p>
            </InsideItalicBox.Provider>
          ) : (
            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "17px",
              color: "#333",
              lineHeight: 1.9,
              margin: "0 0 20px",
            }}>{children}</p>
          );
        },
        em: ({ children }) => <EmRenderer>{children}</EmRenderer>,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt ?? ""}
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              display: "block",
              margin: "24px 0",
            }}
          />
        ),
        strong: ({ children }) => (
          <strong style={{ color: "#0F0F0F", fontWeight: 700 }}>{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote style={{
            borderLeft: "4px solid #E8B4B8",
            background: "#F5E6E7",
            padding: "20px 24px",
            margin: "32px 0",
            borderRadius: "0 8px 8px 0",
          }}>
            <div style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontStyle: "italic",
              fontSize: "19px",
              color: "#7A3D41",
              lineHeight: 1.7,
            }}>{children}</div>
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul style={{
            margin: "0 0 20px",
            paddingLeft: "24px",
            listStyleType: "disc",
          }}>{children}</ul>
        ),
        ol: ({ children }) => (
          <ol style={{
            margin: "0 0 20px",
            paddingLeft: "24px",
            listStyleType: "decimal",
          }}>{children}</ol>
        ),
        li: ({ children }) => (
          <li style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "16px",
            color: "#333",
            lineHeight: 1.85,
            marginBottom: "8px",
            display: "list-item",
          }}>{children}</li>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

/** Exact copy shown under overview intro; image sits directly below this line. */
const DRAMALAND_BUILD_PARAGRAPH =
  "I built Drama Land independently from concept to live product in one week, owning every part of the process: problem identification, product strategy, UX design, and directing the full technical build.";

/** Split CMS markdown around the build paragraph so stats can sit under it without duplicating the line. */
function splitAroundBuildParagraph(md: string): { before: string; after: string; found: boolean } {
  const normalized = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const key =
    "I built Drama Land independently from concept to live product in one week, owning every part of the process: problem identification, product strategy, UX design, and directing the full technical build";
  let idx = normalized.indexOf(key);
  let end = -1;
  if (idx !== -1) {
    end = idx + key.length;
    if (normalized[end] === ".") end += 1;
  } else {
    idx = normalized.indexOf(key + ".");
    if (idx !== -1) end = idx + key.length + 1;
  }
  if (idx === -1 || end === -1) return { before: md, after: "", found: false };
  const before = normalized.slice(0, idx).trimEnd();
  const after = normalized.slice(end).trimStart();
  return { before, after, found: true };
}

function DramalandBuildParagraph() {
  return (
    <p
      style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "17px",
        color: "#333",
        lineHeight: 1.9,
        margin: "20px 0 0",
        maxWidth: "720px",
      }}
    >
      {DRAMALAND_BUILD_PARAGRAPH}
    </p>
  );
}

/** Overview stats — same idea as FinTips `OverviewStatsRow`: large numerals + muted labels; Dramaland rose palette. */
function DramalandOverviewStatsRow({ isMobile }: { isMobile: boolean }) {
  const numSize = isMobile ? "32px" : "40px";
  const unitSize = isMobile ? "18px" : "22px";

  const blocks: { key: string; label: string; value: ReactNode }[] = [
    {
      key: "wk",
      label: "Zero to live product",
      value: (
        <>
          <span style={{ fontSize: numSize }}>1</span>
          <span style={{ fontSize: unitSize, fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" }}>wk</span>
        </>
      ),
    },
    {
      key: "100",
      label: "Asian dramas on platform",
      value: (
        <>
          <span style={{ fontSize: numSize }}>100</span>
          <span style={{ fontSize: unitSize, fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" }}>+</span>
        </>
      ),
    },
    {
      key: "8",
      label: "Core features shipped",
      value: (
        <>
          <span style={{ fontSize: numSize }}>8</span>
          <span style={{ fontSize: unitSize, fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" }}>+</span>
        </>
      ),
    },
    {
      key: "90",
      label: "Active users worldwide",
      value: (
        <>
          <span style={{ fontSize: numSize }}>90</span>
          <span style={{ fontSize: unitSize, fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" }}>+</span>
        </>
      ),
    },
    {
      key: "15k",
      label: "Total views",
      value: (
        <>
          <span style={{ fontSize: numSize }}>1.5</span>
          <span style={{ fontSize: unitSize, fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" }}>k</span>
        </>
      ),
    },
    {
      key: "cost",
      label: "Monthly operating cost",
      value: (
        <span style={{ fontSize: numSize, fontVariantNumeric: "slashed-zero" }}>$0</span>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "16px", maxWidth: "720px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
          columnGap: isMobile ? "12px" : "24px",
          rowGap: isMobile ? "22px" : "26px",
        }}
      >
        {blocks.map((b) => (
          <div
            key={b.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 600,
                color: DD_NAV_ROSE,
                lineHeight: 1,
                marginBottom: "8px",
                display: "flex",
                alignItems: "baseline",
                gap: "2px",
              }}
            >
              {b.value}
            </div>
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: isMobile ? "11px" : "12px",
                color: DD_NAV_MUTED,
                letterSpacing: "0.2px",
                lineHeight: 1.45,
                maxWidth: "148px",
              }}
            >
              {b.label}
            </div>
          </div>
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: isMobile ? "14px" : "15px",
          color: "#333",
          lineHeight: 1.65,
          margin: "20px 0 0",
          maxWidth: "720px",
        }}
      >
        Top audiences in{" "}
        <strong style={{ color: DD_NAV_ROSE, fontWeight: 700 }}>United States</strong>,{" "}
        <strong style={{ color: DD_NAV_ROSE, fontWeight: 700 }}>India</strong>, and{" "}
        <strong style={{ color: DD_NAV_ROSE, fontWeight: 700 }}>Germany</strong>
      </p>
    </div>
  );
}

/**
 * Renders overview markdown, then the build line + stats row (or splits CMS copy when that line is embedded).
 * Set `forceClosingAndStats={false}` for non-overview blocks (e.g. Market) that should not inject this line.
 */
function DramalandOverviewSectionWithStats({
  markdown,
  allowHtml,
  autoHeadingIds,
  forceClosingAndStats = true,
  isMobile,
}: {
  markdown: string;
  allowHtml: boolean;
  autoHeadingIds?: boolean;
  forceClosingAndStats?: boolean;
  isMobile: boolean;
}) {
  if (!forceClosingAndStats) {
    return <Prose content={markdown} allowHtml={allowHtml} autoHeadingIds={autoHeadingIds} />;
  }
  const { before, after, found } = splitAroundBuildParagraph(markdown);
  if (found) {
    return (
      <>
        {before.trim() ? (
          <Prose content={before.trim()} allowHtml={allowHtml} autoHeadingIds={autoHeadingIds} />
        ) : null}
        <DramalandBuildParagraph />
        <DramalandOverviewStatsRow isMobile={isMobile} />
        {after.trim() ? (
          <Prose content={after.trim()} allowHtml={allowHtml} autoHeadingIds={autoHeadingIds} />
        ) : null}
      </>
    );
  }
  return (
    <>
      <Prose content={markdown} allowHtml={allowHtml} autoHeadingIds={autoHeadingIds} />
      <DramalandBuildParagraph />
      <DramalandOverviewStatsRow isMobile={isMobile} />
    </>
  );
}

// ── Before / After diagram ──────────────────────────────────────
function BeforeAfter({ before, after }: { before: string[]; after: string[] }) {
  const col = (items: string[], color: string, label: string, bg: string) => (
    <div style={{ flex: 1 }}>
      <div style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color,
        marginBottom: "12px",
      }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{
              background: bg,
              border: `1px solid ${color}`,
              borderRadius: "8px",
              padding: "10px 14px",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "13px",
              color: "#333",
              lineHeight: 1.4,
            }}>
              {item}
            </div>
            {i < items.length - 1 && (
              <div style={{ textAlign: "center", color, fontSize: "16px", margin: "4px 0" }}>↓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      background: "#F8F7F4",
      border: "1px solid #E8E6E1",
      borderRadius: "12px",
      padding: "28px",
      margin: "40px 0",
    }}>
      <p style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10px",
        color: "#BBBBBB",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        marginBottom: "24px",
      }}>Before & After</p>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {col(before, "#C0392B", "Before", "#FDF0EF")}
        <div style={{ display: "flex", alignItems: "center", paddingTop: "32px", color: "#BBBBBB", fontSize: "20px" }}>→</div>
        {col(after, "#27AE60", "After", "#EDF7F1")}
      </div>
    </div>
  );
}

// ── Numbered process steps ──────────────────────────────────────
function ProcessSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", margin: "16px 0 32px" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#0F0F0F",
            color: "#E8B4B8",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "2px",
          }}>
            {i + 1}
          </div>
          <div>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#0F0F0F",
              margin: "0 0 4px",
            }}>{step.title}</p>
            {step.body && (
              <p style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "14px",
                color: "#666",
                lineHeight: 1.75,
                margin: 0,
              }}>{step.body}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────
export default function CaseStudyContent({ project, prev, next }: Props) {
  const isMobile = useIsMobile();
  const accent = accentMap[project.card_theme ?? "cream"];

  const problemBullets = ["APR history not carried over", "No validation check in place", "Risk exposure goes undetected"];
  const afterBulletsResolved = ["Validation check triggers on replacement", "APR history correctly mapped", "Account automatically routed to review"];

  // Split at "## My Role" when present (KRI injects Before/After). Discover Dramaland often
  // has no "## My Role" — then the full case study stays in `beforeMyRole` and `fromMyRole` is empty.
  const splitMarkdown = (md: string): [string, string] => {
    const splitPoint = md.search(/^##\s+My Role/im);
    if (splitPoint === -1) return [md, ""];
    return [md.slice(0, splitPoint).trimEnd(), md.slice(splitPoint)];
  };
  const DRAMALAND_MARKET_HEADING_LINE = /^##\s+(?:The\s+)?Market Insights?\b/i;
  const DRAMALAND_PROBLEM_HEADING_LINE = /^##\s+The Problem\b/i;

  /** Discover Dramaland: split after Market Insight body (next top-level `##` line). Line-based to avoid `m`-regex false matches inside HTML. */
  const splitAfterMarketInsight = (md: string): [string, string] | null => {
    const normalized = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const lines = normalized.split("\n");
    const startIdx = lines.findIndex((line) => DRAMALAND_MARKET_HEADING_LINE.test(line.trimEnd()));
    if (startIdx === -1) return null;
    let endIdx = lines.length;
    for (let j = startIdx + 1; j < lines.length; j++) {
      const raw = lines[j].replace(/\r/g, "");
      if (/^##\s+/.test(raw)) {
        endIdx = j;
        break;
      }
    }
    if (endIdx >= lines.length) return null;
    const first = lines.slice(0, endIdx).join("\n").trimEnd();
    const second = lines.slice(endIdx).join("\n").trimStart();
    return [first, second];
  };
  /** Fallback: split before `## The Problem` if Market Insight heading not found. */
  const splitBeforeProblem = (md: string): [string, string] | null => {
    const normalized = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const lines = normalized.split("\n");
    const idx = lines.findIndex((line) => DRAMALAND_PROBLEM_HEADING_LINE.test(line.trimEnd()));
    if (idx === -1 || idx === 0) return null;
    const before = lines.slice(0, idx).join("\n").trimEnd();
    const after = lines.slice(idx).join("\n").trimStart();
    return [before, after];
  };
  /**
   * Discover Dramaland: everything before the Market Insight `##` line (Overview + stats, etc.)
   * vs from that line onward. Keeps the overview block (stats, etc.) separate from Market so layout matches the narrative order.
   */
  const splitBeforeMarketInsightHeading = (md: string): [string, string] | null => {
    const normalized = md.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const lines = normalized.split("\n");
    const idx = lines.findIndex((line) => DRAMALAND_MARKET_HEADING_LINE.test(line.trimEnd()));
    if (idx === -1 || idx === 0) return null;
    const before = lines.slice(0, idx).join("\n").trimEnd();
    if (!before.trim()) return null;
    const after = lines.slice(idx).join("\n").trimStart();
    return [before, after];
  };
  const splitDiscoverLandscape = (md: string): [string, string] | null =>
    splitAfterMarketInsight(md) ?? splitBeforeProblem(md);
  const fullCaseStudyPrep = project.case_study_content ? prepMd(project.case_study_content) : "";
  const clExtract =
    project.slug === "discover-dramaland" && fullCaseStudyPrep
      ? extractCompetitiveLandscapeSection(fullCaseStudyPrep)
      : { remainder: fullCaseStudyPrep, body: null as string | null };
  const [beforeMyRole, fromMyRole] = splitMarkdown(clExtract.remainder);

  /** When `## Features` exists, split `beforeMyRole` into markdown before / after that heading. */
  const dramalandFeaturesHeadingSplit =
    project.slug === "discover-dramaland"
      ? splitMarkdownAtFeaturesHeading(beforeMyRole)
      : null;
  const beforeMyRoleForLandscape =
    dramalandFeaturesHeadingSplit?.[0] ?? beforeMyRole;
  /** Text after `## Features` through end of `beforeMyRole` (works with or without a `## My Role` section). */
  const dramalandMarkdownAfterFeatures =
    dramalandFeaturesHeadingSplit?.[1] ?? "";

  const dramalandEarlyOverviewSplit =
    project.slug === "discover-dramaland" && beforeMyRoleForLandscape
      ? splitBeforeMarketInsightHeading(beforeMyRoleForLandscape)
      : null;
  const beforeMyRoleForLandscapeAfterEarlyOverview =
    dramalandEarlyOverviewSplit?.[1] ?? beforeMyRoleForLandscape;

  const discoverLandscapeSplit: [string, string] | null =
    project.slug === "discover-dramaland" && beforeMyRoleForLandscapeAfterEarlyOverview.trim()
      ? splitDiscoverLandscape(beforeMyRoleForLandscapeAfterEarlyOverview) ?? [
          "",
          beforeMyRoleForLandscapeAfterEarlyOverview,
        ]
      : null;
  /** When landscape split puts nothing in [0], overview + market live in [1]; split again before `## The Problem`. */
  const dramalandDiscoverSplit1BeforeProblem =
    project.slug === "discover-dramaland" &&
    discoverLandscapeSplit &&
    !discoverLandscapeSplit[0]?.trim() &&
    discoverLandscapeSplit[1]?.trim()
      ? splitBeforeProblem(discoverLandscapeSplit[1])
      : null;

  const settingsCompetitiveProse =
    project.slug === "discover-dramaland" && project.competitive_landscape_content
      ? stripDuplicateCompetitiveH2(
          stripLeadingBundledCompetitiveDiagramRows(project.competitive_landscape_content)
        ).trim()
      : "";
  const caseStudyCompetitiveProse = (clExtract.body ?? "").trim();
  const discoverCompetitiveProseBody =
    project.slug === "discover-dramaland"
      ? (settingsCompetitiveProse || caseStudyCompetitiveProse).trim()
      : "";
  const showDiscoverCompetitiveProse = discoverCompetitiveProseBody.length > 0;

  const caseStudyH2Style: CSSProperties = {
    fontFamily: "var(--font-playfair), Georgia, serif",
    fontSize: "22px",
    color: "#0F0F0F",
    margin: "40px 0 12px",
    letterSpacing: "-0.3px",
    fontWeight: 600,
  };

  const px = isMobile ? "20px" : "32px";

  const heroBackground =
    project.slug === "kri-automation"
      ? "#096FD2"
      : project.slug === "discover-dramaland"
        ? "#000000"
        : project.slug === "fintips"
          ? "#1E3F2F"
          : "#0F0F0F";

  const dramalandBodyHtml = project.slug === "discover-dramaland";

  return (
    <main style={{ flex: 1, background: "#F8F7F4" }}>

      {/* ── Back link — hidden on DiscoverDramaland ── */}
      {project.slug !== "discover-dramaland" && (
        <div style={{ background: "#F8F7F4", padding: `16px ${px} 0` }}>
          <a href="/work" style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#2D6FE8",
            textDecoration: "none",
          }}>
            ← Back to Work
          </a>
        </div>
      )}

      {/* ── Hero ── */}
      {project.slug === "discover-dramaland" ? (
        <section
          style={{
            background: heroBackground,
            padding: isMobile ? "32px 24px 40px" : "48px 48px 36px",
            position: "relative",
            overflow: "hidden",
            minHeight: isMobile ? "auto" : "75vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: isMobile ? "flex-end" : "stretch",
          }}
        >
          <div
            style={{
              marginTop: isMobile ? "52px" : "80px",
              position: "relative",
              maxWidth: "1180px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              flex: isMobile ? undefined : 1,
              minHeight: isMobile ? undefined : 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: isMobile ? "32px" : "40px",
                flex: isMobile ? undefined : 1,
                minHeight: isMobile ? undefined : 0,
              }}
            >
              <div
                style={{
                  flex: "1 1 auto",
                  minWidth: 0,
                  alignSelf: isMobile ? "stretch" : "flex-start",
                  containerType: "inline-size",
                }}
              >
                <div
                  style={{
                    transform: isMobile ? "translateY(56px)" : "translateY(80px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: isMobile ? "36px" : "clamp(42px, 6vw, 64px)",
                      fontWeight: 600,
                      color: "#F0C6CB",
                      lineHeight: 1.05,
                      letterSpacing: "-1px",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Drama Land
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: isMobile ? "center" : "flex-end",
                  flexShrink: 0,
                  alignSelf: isMobile ? "center" : "stretch",
                  marginRight: isMobile ? 0 : "-32px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dramaland-hero.png"
                  alt="DramaLand product preview — desktop and mobile"
                  style={{
                    width: isMobile ? "100%" : "min(720px, 58vw)",
                    maxWidth: isMobile ? "580px" : undefined,
                    height: "auto",
                    flexShrink: 0,
                    borderRadius: "12px",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.35)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
      <section style={{
        position: "relative",
        background: heroBackground,
        padding: isMobile ? "40px 20px 48px" : "52px 32px 60px",
        marginTop: "20px",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: "900px" }}>
          {/* Company heading + title */}
          <div style={{ margin: "0 0 40px" }}>
            {project.company && (
              <p style={{
                fontFamily: "Georgia, serif",
                fontSize: isMobile ? "42px" : "72px",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                margin: "0 0 12px",
              }}>
                {project.company}
              </p>
            )}
            {project.slug !== "discover-dramaland" && (
              <p style={{
                fontFamily: "Georgia, serif",
                fontSize: isMobile ? "22px" : "30px",
                fontWeight: 400,
                color: "#BBBBBB",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                margin: "52px 0 0",
                maxWidth: "320px",
              }}>
                {project.title}
              </p>
            )}
          </div>

          {/* Stat grid — KRI only */}
          {project.slug === "kri-automation" && project.stat_number && (
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 260px))",
              gap: isMobile ? "28px" : "48px",
              marginTop: "55px",
              width: isMobile ? "100%" : "fit-content",
              maxWidth: "100%",
              justifyContent: isMobile ? undefined : "start",
            }}>
              {[
                { num: project.stat_number ?? "—", label: project.stat_label ?? "" },
                { num: project.stat_2_number || "3M+", label: project.stat_2_label || "cardholders covered" },
                { num: project.stat_3_number || "4", label: project.stat_3_label || "cross-functional teams led" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "transparent",
                  padding: isMobile ? "24px 18px" : "36px 28px",
                  textAlign: "left",
                }}>
                  <div style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: isMobile ? "44px" : "78px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1,
                    marginBottom: "10px",
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: isMobile ? "12px" : "14px",
                    color: "rgba(255, 255, 255, 0.92)",
                    letterSpacing: "0.2px",
                    lineHeight: 1.5,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Amex logo — bottom right */}
        {project.company === "American Express" && !isMobile && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/Amex_Logo.png"
            alt="American Express"
            style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              height: "210px",
              width: "auto",
              opacity: 0.85,
            }}
          />
        )}
      </section>
      )}

      {project.slug === "discover-dramaland" && (
        <DiscoverDramalandSubNav
          isMobile={isMobile}
          brandLabel={
            project.company?.replace(/^Discover\s+/i, "").trim() || "Dramaland"
          }
          brandTitle={project.company ?? undefined}
          ctaHref={SIDEBAR_CONFIG["discover-dramaland"]?.link?.href ?? "https://discoverdramaland.com"}
        />
      )}

      {/* ── Two-column content layout ── */}
      {(() => {
        const sidebarConfig = SIDEBAR_CONFIG[project.slug] ?? null;
        return (
      <div style={{
        maxWidth: "1060px",
        margin: "0 auto",
        padding: isMobile ? "40px 20px 64px" : "56px 32px 72px",
        display: isMobile ? "block" : "grid",
        gridTemplateColumns: isMobile || !sidebarConfig ? undefined : "280px 1fr",
        gap: isMobile ? undefined : "48px",
        alignItems: "start",
      }}>

        {/* ── LEFT SIDEBAR ── */}
        {!isMobile && sidebarConfig && (
          <aside style={{ position: "sticky", top: "96px" }}>
            <ProjectSidebar config={sidebarConfig} />
          </aside>
        )}

        {/* ── RIGHT MAIN — scrollable content ── */}
        <div>

          {isMobile && sidebarConfig && (
            <div style={{ marginBottom: "32px" }}>
              <ProjectSidebar config={sidebarConfig} />
            </div>
          )}

          {project.slug === "discover-dramaland" && discoverLandscapeSplit ? (
            <>
              {dramalandEarlyOverviewSplit?.[0]?.trim() && (
                <>
                  <section style={{ marginBottom: "8px" }}>
                    <DramalandOverviewSectionWithStats
                      markdown={dramalandEarlyOverviewSplit[0]}
                      allowHtml={dramalandBodyHtml}
                      autoHeadingIds
                      isMobile={isMobile}
                    />
                  </section>
                  <DiscoverDramalandSectionDivider />
                </>
              )}
              {discoverLandscapeSplit[0] && (
                <>
                  <section style={{ marginBottom: "8px" }}>
                    <DramalandOverviewSectionWithStats
                      markdown={discoverLandscapeSplit[0]}
                      allowHtml={dramalandBodyHtml}
                      autoHeadingIds
                      forceClosingAndStats={!dramalandEarlyOverviewSplit?.[0]?.trim()}
                      isMobile={isMobile}
                    />
                  </section>
                  <DiscoverDramalandSectionDivider />
                </>
              )}
              <section id="competitive-landscape" style={{ marginBottom: "8px", scrollMarginTop: DRAMALAND_SUB_NAV_SCROLL }}>
                <h2 style={caseStudyH2Style}>Competitive Landscape</h2>
                {showDiscoverCompetitiveProse && (
                  <Prose content={prepMd(discoverCompetitiveProseBody)} allowHtml autoHeadingIds />
                )}
              </section>
              {(discoverLandscapeSplit[1] || dramalandFeaturesHeadingSplit || fromMyRole) && (
                <DiscoverDramalandSectionDivider />
              )}
              {dramalandDiscoverSplit1BeforeProblem ? (
                <>
                  <section style={{ marginBottom: "8px" }}>
                    <DramalandOverviewSectionWithStats
                      markdown={dramalandDiscoverSplit1BeforeProblem[0]}
                      allowHtml={dramalandBodyHtml}
                      autoHeadingIds
                      forceClosingAndStats={
                        !dramalandEarlyOverviewSplit?.[0]?.trim() && !discoverLandscapeSplit[0]?.trim()
                      }
                      isMobile={isMobile}
                    />
                  </section>
                  {dramalandDiscoverSplit1BeforeProblem[1]?.trim() ? (
                    <section style={{ marginBottom: "8px" }}>
                      <Prose content={dramalandDiscoverSplit1BeforeProblem[1]} allowHtml={dramalandBodyHtml} autoHeadingIds />
                    </section>
                  ) : null}
                </>
              ) : discoverLandscapeSplit[1] ? (
                <section style={{ marginBottom: "8px" }}>
                  <Prose content={discoverLandscapeSplit[1]} allowHtml={dramalandBodyHtml} autoHeadingIds />
                </section>
              ) : null}
              {dramalandFeaturesHeadingSplit && (
                <>
                  <section
                    id="features"
                    style={{
                      scrollMarginTop: DRAMALAND_SUB_NAV_SCROLL,
                      marginTop: discoverLandscapeSplit[1] ? "8px" : "0",
                    }}
                  >
                    <DiscoverDramalandFeatureGrid isMobile={isMobile} />
                  </section>
                  {dramalandMarkdownAfterFeatures.trim() ? (
                    <>
                      <DiscoverDramalandSectionDivider />
                      <section style={{ marginBottom: "8px" }}>
                        <Prose content={dramalandMarkdownAfterFeatures} allowHtml={dramalandBodyHtml} autoHeadingIds />
                      </section>
                    </>
                  ) : null}
                </>
              )}
              {fromMyRole ? <DiscoverDramalandSectionDivider /> : null}
            </>
          ) : (
            beforeMyRole && (
              <>
                {project.slug === "discover-dramaland" && dramalandFeaturesHeadingSplit ? (
                  <>
                    {dramalandEarlyOverviewSplit?.[0]?.trim() ? (
                      <>
                        <section style={{ marginBottom: "8px" }}>
                          <DramalandOverviewSectionWithStats
                            markdown={dramalandEarlyOverviewSplit[0]}
                            allowHtml={dramalandBodyHtml}
                            autoHeadingIds
                            isMobile={isMobile}
                          />
                        </section>
                        <DiscoverDramalandSectionDivider />
                        <section style={{ marginBottom: "8px" }}>
                          <Prose content={dramalandEarlyOverviewSplit[1]} allowHtml={dramalandBodyHtml} autoHeadingIds />
                        </section>
                      </>
                    ) : (
                      <section style={{ marginBottom: "8px" }}>
                        <DramalandOverviewSectionWithStats
                          markdown={dramalandFeaturesHeadingSplit[0]}
                          allowHtml={dramalandBodyHtml}
                          autoHeadingIds
                          isMobile={isMobile}
                        />
                      </section>
                    )}
                    <DiscoverDramalandSectionDivider />
                    <section
                      id="features"
                      style={{
                        scrollMarginTop: DRAMALAND_SUB_NAV_SCROLL,
                        marginTop: "8px",
                      }}
                    >
                      <DiscoverDramalandFeatureGrid isMobile={isMobile} />
                    </section>
                    {dramalandMarkdownAfterFeatures.trim() ? (
                      <>
                        <DiscoverDramalandSectionDivider />
                        <section style={{ marginBottom: "8px" }}>
                          <Prose content={dramalandMarkdownAfterFeatures} allowHtml={dramalandBodyHtml} autoHeadingIds />
                        </section>
                      </>
                    ) : null}
                  </>
                ) : (
                  <section style={{ marginBottom: "8px" }}>
                    {project.slug === "discover-dramaland" && dramalandEarlyOverviewSplit?.[0]?.trim() ? (
                      <>
                        <DramalandOverviewSectionWithStats
                          markdown={dramalandEarlyOverviewSplit[0]}
                          allowHtml={dramalandBodyHtml}
                          autoHeadingIds
                          isMobile={isMobile}
                        />
                        <DiscoverDramalandSectionDivider />
                        <Prose content={dramalandEarlyOverviewSplit[1]} allowHtml={dramalandBodyHtml} autoHeadingIds />
                      </>
                    ) : (
                      <>
                        {project.slug === "discover-dramaland" ? (
                          <DramalandOverviewSectionWithStats
                            markdown={beforeMyRole}
                            allowHtml={dramalandBodyHtml}
                            autoHeadingIds
                            isMobile={isMobile}
                          />
                        ) : (
                          <Prose
                            content={beforeMyRole}
                            allowHtml={dramalandBodyHtml}
                            autoHeadingIds={project.slug === "discover-dramaland"}
                          />
                        )}
                      </>
                    )}
                  </section>
                )}
                {project.slug === "discover-dramaland" && fromMyRole ? <DiscoverDramalandSectionDivider /> : null}
              </>
            )
          )}

          {/* ── Before & After — KRI only ── */}
          {project.slug === "kri-automation" && (
            <BeforeAfter before={problemBullets} after={afterBulletsResolved} />
          )}

          {/* Optional second markdown block (e.g. `## Features` split from `fromMyRole`, or content after My Role). */}
          {fromMyRole && (
            <section style={{ marginTop: project.slug === "discover-dramaland" ? "8px" : "40px" }}>
              {project.slug === "discover-dramaland" ? (
                dramalandFeaturesHeadingSplit ? (
                  <Prose content={fromMyRole} allowHtml={dramalandBodyHtml} autoHeadingIds />
                ) : (
                  (() => {
                    const featuresSplit = splitMarkdownAtFeaturesHeading(fromMyRole);
                    const featureSectionMarginTop = featuresSplit ? "8px" : "40px";
                    const featureBlock = (
                      <section
                        id="features"
                        style={{
                          scrollMarginTop: DRAMALAND_SUB_NAV_SCROLL,
                          marginTop: featureSectionMarginTop,
                        }}
                      >
                        <DiscoverDramalandFeatureGrid isMobile={isMobile} />
                      </section>
                    );
                    if (featuresSplit) {
                      const [beforeFeatures, afterFeatures] = featuresSplit;
                      return (
                        <>
                          <Prose content={beforeFeatures} allowHtml={dramalandBodyHtml} autoHeadingIds />
                          {featureBlock}
                          {afterFeatures.trim() ? (
                            <Prose content={afterFeatures} allowHtml={dramalandBodyHtml} autoHeadingIds />
                          ) : null}
                        </>
                      );
                    }
                    return (
                      <>
                        <Prose content={fromMyRole} allowHtml={dramalandBodyHtml} autoHeadingIds />
                        {featureBlock}
                      </>
                    );
                  })()
                )
              ) : (
                <Prose content={fromMyRole} />
              )}
            </section>
          )}

          {/* ── Divider ── */}
          <div style={{ height: "1px", background: "#E8E6E1", margin: "48px 0 40px" }} />

          {/* ── Prev / Next navigation ── */}
          <div style={{ display: "grid", gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr", gap: "16px" }}>
            {prev && (
              <a href={`/work/${prev.slug}`} style={{ display: "flex", flexDirection: "column", gap: "6px", textDecoration: "none", background: "#F2F0EC", border: "1px solid #E8E6E1", borderRadius: "10px", padding: "18px 20px", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2D6FE8")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E6E1")}
              >
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", color: "#BBBBBB", letterSpacing: "1.5px", textTransform: "uppercase" }}>← Previous</span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#0F0F0F" }}>{prev.title}</span>
              </a>
            )}
            {next && (
              <a href={`/work/${next.slug}`} style={{ display: "flex", flexDirection: "column", gap: "6px", textDecoration: "none", background: "#F2F0EC", border: "1px solid #E8E6E1", borderRadius: "10px", padding: "18px 20px", textAlign: "right", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2D6FE8")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E6E1")}
              >
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", color: "#BBBBBB", letterSpacing: "1.5px", textTransform: "uppercase" }}>Next →</span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#0F0F0F" }}>{next.title}</span>
              </a>
            )}
          </div>

        </div>{/* end right column */}
      </div>
        );
      })()}

      {project.slug === "discover-dramaland" && <DiscoverDramalandCta />}
      {project.slug === "kri-automation" && (
        <CaseStudyCtaBand background="#2D6FE8">
          <FinTipsCtaLayoutSpacer />
        </CaseStudyCtaBand>
      )}
    </main>
  );
}
