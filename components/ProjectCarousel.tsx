"use client";

/**
 * Project card layouts: horizontal carousel (`/work`, homepage) and grid (`/projects`).
 * Carousels: single row, scroll snap, hidden scrollbar, prev/next controls.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/supabase";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProjectCard, { ComingSoonCard } from "./ProjectCard";

type Props = {
  projects: Project[];
  label?: string;
  viewAllHref?: string;
  showComingSoon?: boolean;
  /** When false, cards keep theme border on hover (e.g. `/projects`). */
  blueHoverBorder?: boolean;
};

const CAROUSEL_GAP = 14;

function CarouselChevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CarouselRow({ projects, label, viewAllHref, showComingSoon, isMobile, blueHoverBorder = true }: Props & { isMobile: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const paddingX = isMobile ? 20 : 32;

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 1) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const left = el.scrollLeft;
    setCanScrollLeft(left > 4);
    setCanScrollRight(left < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, projects, showComingSoon]);

  const scrollByDirection = useCallback(
    (dir: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slides = Array.from(el.children) as HTMLElement[];
      if (!slides.length) return;

      const anchor = el.getBoundingClientRect().left + paddingX + 2;
      let nearestIndex = 0;
      let nearestDelta = Infinity;
      slides.forEach((slide, i) => {
        const delta = Math.abs(slide.getBoundingClientRect().left - anchor);
        if (delta < nearestDelta) {
          nearestDelta = delta;
          nearestIndex = i;
        }
      });

      const target = Math.max(0, Math.min(slides.length - 1, nearestIndex + dir));
      slides[target].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    },
    [paddingX],
  );

  const btnBase: React.CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid #E0DDD8",
    background: "rgba(248, 247, 244, 0.96)",
    boxShadow: "0 2px 10px rgba(15, 15, 15, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0F0F0F",
    cursor: "pointer",
    padding: 0,
    transition: "opacity 0.2s",
  };

  const btnDisabled: React.CSSProperties = {
    opacity: 0.28,
    cursor: "default",
    pointerEvents: "none",
  };

  return (
    <div style={{ marginBottom: "48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 20px" : "0 32px",
          marginBottom: "18px",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "10px",
            color: "#BBBBBB",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
          }}
        >
          {label ?? "Selected Work"}
        </span>
        {viewAllHref && (
          <a
            href={viewAllHref}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              color: "#2D6FE8",
              textDecoration: "none",
            }}
          >
            View all →
          </a>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => scrollByDirection(-1)}
          style={{
            ...btnBase,
            left: isMobile ? 8 : 12,
            ...(canScrollLeft ? {} : btnDisabled),
          }}
        >
          <CarouselChevron dir="left" />
        </button>
        <button
          type="button"
          aria-label="Next projects"
          onClick={() => scrollByDirection(1)}
          style={{
            ...btnBase,
            right: isMobile ? 8 : 12,
            ...(canScrollRight ? {} : btnDisabled),
          }}
        >
          <CarouselChevron dir="right" />
        </button>

        <div
          ref={scrollerRef}
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: `${CAROUSEL_GAP}px`,
            overflowX: "auto",
            padding: isMobile ? "4px 20px 20px" : "4px 32px 20px",
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: paddingX,
            scrollPaddingRight: paddingX,
            overscrollBehaviorX: "contain",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} isMobile={isMobile} blueHoverBorder={blueHoverBorder} />
          ))}
          {showComingSoon && <ComingSoonCard isMobile={isMobile} />}
        </div>
      </div>
    </div>
  );
}

export function SingleCarousel({ projects, label, viewAllHref, showComingSoon = true, blueHoverBorder = true }: Props) {
  const isMobile = useIsMobile();
  return (
    <CarouselRow
      projects={projects}
      label={label}
      viewAllHref={viewAllHref}
      showComingSoon={showComingSoon}
      isMobile={isMobile}
      blueHoverBorder={blueHoverBorder}
    />
  );
}

/** Responsive grid (1 col mobile, 2 col desktop) — `/projects`. */
export function ProjectCardGrid({ projects, label, viewAllHref, showComingSoon = true }: Props) {
  const isMobile = useIsMobile();
  return (
    <div style={{ marginBottom: "48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 20px" : "0 32px",
          marginBottom: "18px",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "10px",
            color: "#BBBBBB",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
          }}
        >
          {label ?? "Selected Work"}
        </span>
        {viewAllHref && (
          <a
            href={viewAllHref}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              color: "#2D6FE8",
              textDecoration: "none",
            }}
          >
            View all →
          </a>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))",
          gap: "20px",
          maxWidth: "960px",
          margin: "0 auto",
          padding: isMobile ? "4px 20px 20px" : "4px 32px 20px",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isMobile={isMobile} fillGrid />
        ))}
        {showComingSoon && <ComingSoonCard isMobile={isMobile} fillGrid />}
      </div>
    </div>
  );
}

type TwoRowProps = {
  workProjects: Project[];
  sideProjects: Project[];
};

export default function ProjectCarousel({ workProjects, sideProjects }: TwoRowProps) {
  const isMobile = useIsMobile();

  return (
    <section
      id="work"
      style={{ background: "#F8F7F4", padding: "48px 0 220px" }}
    >
      <CarouselRow
        projects={workProjects}
        label="Professional Work"
        viewAllHref="/work"
        showComingSoon={false}
        isMobile={isMobile}
      />
      <CarouselRow
        projects={sideProjects}
        label="Side Projects"
        viewAllHref="/projects"
        showComingSoon={true}
        isMobile={isMobile}
      />
    </section>
  );
}
