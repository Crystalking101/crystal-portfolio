"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Project } from "@/lib/supabase";
import { useIsMobile } from "@/hooks/useIsMobile";
import CompetitivePositioning from "@/components/CompetitivePositioning";

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
  return md.replace(/<br\s*\/?>/gi, "  \n");
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
function Prose({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "22px",
            color: "#0F0F0F",
            margin: "40px 0 12px",
            letterSpacing: "-0.3px",
            fontWeight: 600,
          }}>{children}</h2>
        ),
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

  // Split markdown at "## My Role" so Before/After can be injected between
  // The Problem and My Role sections.
  const splitMarkdown = (md: string): [string, string] => {
    const splitPoint = md.search(/^##\s+My Role/im);
    if (splitPoint === -1) return [md, ""];
    return [md.slice(0, splitPoint).trimEnd(), md.slice(splitPoint)];
  };
  /** DiscoverDramaland: split right after the Market Insight(s) section (next ## heading). */
  const splitAfterMarketInsight = (md: string): [string, string] | null => {
    const re = /^##\s+The Market Insight\b/im;
    const match = md.match(re);
    if (!match || match.index === undefined) return null;
    let lineEnd = match.index + match[0].length;
    while (lineEnd < md.length && md[lineEnd] !== "\n") lineEnd += 1;
    if (lineEnd < md.length && md[lineEnd] === "\n") lineEnd += 1;
    const tail = md.slice(lineEnd);
    const nextHeading = tail.search(/^##\s+/m);
    if (nextHeading === -1) return null;
    const splitIdx = lineEnd + nextHeading;
    return [md.slice(0, splitIdx).trimEnd(), md.slice(splitIdx)];
  };
  /** Fallback: split before `## The Problem` if Market Insight heading not found. */
  const splitBeforeProblem = (md: string): [string, string] | null => {
    const m = md.match(/^##\s+The Problem/im);
    if (!m || m.index === undefined || m.index <= 0) return null;
    return [md.slice(0, m.index).trimEnd(), md.slice(m.index)];
  };
  const splitDiscoverLandscape = (md: string): [string, string] | null =>
    splitAfterMarketInsight(md) ?? splitBeforeProblem(md);
  const [beforeMyRole, fromMyRole] = project.case_study_content
    ? splitMarkdown(prepMd(project.case_study_content))
    : ["", ""];

  const discoverLandscapeSplit =
    project.slug === "discover-dramaland" && beforeMyRole
      ? splitDiscoverLandscape(beforeMyRole)
      : null;

  const caseStudyH2Style: CSSProperties = {
    fontFamily: "var(--font-playfair), Georgia, serif",
    fontSize: "22px",
    color: "#0F0F0F",
    margin: "40px 0 12px",
    letterSpacing: "-0.3px",
    fontWeight: 600,
  };

  const px = isMobile ? "20px" : "32px";

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
      <section style={{
        position: "relative",
        background: "#0F0F0F",
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
              gap: "2px",
              borderRadius: "12px",
              overflow: "hidden",
              marginTop: "55px",
              width: isMobile ? "100%" : "fit-content",
              maxWidth: "100%",
              justifyContent: isMobile ? undefined : "start",
            }}>
              {[
                { num: project.stat_number ?? "—", label: project.stat_label ?? "", color: "#E8B4B8" },
                { num: project.stat_2_number || "3M+", label: project.stat_2_label || "cardholders covered", color: "#2D6FE8" },
                { num: project.stat_3_number || "4",   label: project.stat_3_label || "cross-functional teams led", color: "#ECEAE6" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "#111111",
                  padding: isMobile ? "24px 18px" : "36px 28px",
                  textAlign: "left",
                }}>
                  <div style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: isMobile ? "44px" : "78px",
                    fontWeight: 700,
                    color: s.color,
                    lineHeight: 1,
                    marginBottom: "10px",
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: isMobile ? "12px" : "14px",
                    color: "#666",
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
              height: "120px",
              width: "auto",
              opacity: 0.85,
            }}
          />
        )}
      </section>

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
              {discoverLandscapeSplit[0] && (
                <section style={{ marginBottom: "8px" }}>
                  <Prose content={discoverLandscapeSplit[0]} />
                </section>
              )}
              <section style={{ marginBottom: "8px" }}>
                <h2 style={caseStudyH2Style}>Competitive Landscape</h2>
                {project.competitive_landscape_content?.trim() ? (
                  <Prose content={prepMd(project.competitive_landscape_content)} />
                ) : (
                  <CompetitivePositioning />
                )}
              </section>
              {discoverLandscapeSplit[1] && (
                <section style={{ marginBottom: "8px" }}>
                  <Prose content={discoverLandscapeSplit[1]} />
                </section>
              )}
            </>
          ) : (
            beforeMyRole && (
              <section style={{ marginBottom: "8px" }}>
                <Prose content={beforeMyRole} />
              </section>
            )
          )}

          {/* ── Before & After — KRI only ── */}
          {project.slug === "kri-automation" && (
            <BeforeAfter before={problemBullets} after={afterBulletsResolved} />
          )}

          {/* My Role + everything after */}
          {fromMyRole && (
            <section style={{ marginTop: "40px" }}>
              <Prose content={fromMyRole} />
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
    </main>
  );
}
