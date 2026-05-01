"use client";

import type { Project } from "@/lib/supabase";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProjectCard, { ComingSoonCard } from "./ProjectCard";

type Props = {
  projects: Project[];
  label?: string;
  viewAllHref?: string;
  showComingSoon?: boolean;
};

function CarouselRow({ projects, label, viewAllHref, showComingSoon, isMobile }: Props & { isMobile: boolean }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      {/* Row header */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "#CCCCCC" }}>
            ← scroll →
          </span>
          {viewAllHref && (
            <a
              href={viewAllHref}
              style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "#2D6FE8", textDecoration: "none" }}
            >
              View all →
            </a>
          )}
        </div>
      </div>

      {/* Scroll track */}
      <div
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          padding: isMobile ? "4px 20px 20px" : "4px 32px 20px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isMobile={isMobile} />
        ))}
        {showComingSoon && <ComingSoonCard isMobile={isMobile} />}
      </div>
    </div>
  );
}

// Single-row carousel (used on /work and /projects pages)
export function SingleCarousel({ projects, label, viewAllHref, showComingSoon = true }: Props) {
  const isMobile = useIsMobile();
  return (
    <CarouselRow
      projects={projects}
      label={label}
      viewAllHref={viewAllHref}
      showComingSoon={showComingSoon}
      isMobile={isMobile}
    />
  );
}

// Two-row carousel for homepage
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
