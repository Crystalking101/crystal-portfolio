"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type BlobDef = {
  label: string;
  top: number;
  left: string;
  width: number;
  height: number;
  rot: string;
  delay: number;
  shape: "rounded-rect" | "pill" | "circle";
  group: "pm" | "domain" | "tools";
  alt?: boolean;
};

// Desktop: percentage-based, spans full width
const desktopBlobs: BlobDef[] = [
  // Row 1 — upper band
  { label: "Roadmapping",             top: 32,  left: "1%",   width: 180, height: 80,  rot: "-6deg",  delay: 0.10, shape: "pill",         group: "pm" },
  { label: "Stakeholder Mgmt",        top: 22,  left: "17%",  width: 210, height: 88,  rot: "4deg",   delay: 0.25, shape: "rounded-rect", group: "pm",     alt: true },
  { label: "Agile / Scrum",           top: 42,  left: "35%",  width: 105, height: 105, rot: "-8deg",  delay: 0.15, shape: "circle",       group: "pm" },
  { label: "Go-to-Market",            top: 26,  left: "46%",  width: 175, height: 82,  rot: "5deg",   delay: 0.40, shape: "pill",         group: "domain" },
  { label: "Next.js",                 top: 38,  left: "62%",  width: 115, height: 115, rot: "10deg",  delay: 0.20, shape: "circle",       group: "tools" },
  { label: "Risk & Compliance",       top: 22,  left: "72%",  width: 205, height: 84,  rot: "-5deg",  delay: 0.50, shape: "pill",         group: "domain", alt: true },
  { label: "Cursor AI",               top: 42,  left: "89%",  width: 115, height: 65,  rot: "7deg",   delay: 0.30, shape: "rounded-rect", group: "tools" },
  // Row 2 — mid
  { label: "User Research",           top: 248, left: "2%",   width: 160, height: 75,  rot: "5deg",   delay: 0.60, shape: "rounded-rect", group: "pm",     alt: true },
  { label: "Data Analysis",           top: 236, left: "16%",  width: 150, height: 70,  rot: "-4deg",  delay: 0.45, shape: "rounded-rect", group: "pm" },
  { label: "Fintech",                 top: 258, left: "30%",  width: 185, height: 84,  rot: "8deg",   delay: 0.70, shape: "pill",         group: "domain", alt: true },
  { label: "Digital Banking",         top: 232, left: "46%",  width: 185, height: 80,  rot: "-6deg",  delay: 0.55, shape: "rounded-rect", group: "domain" },
  { label: "React Native",            top: 252, left: "62%",  width: 165, height: 76,  rot: "4deg",   delay: 0.65, shape: "pill",         group: "tools",  alt: true },
  { label: "Supabase",                top: 232, left: "78%",  width: 125, height: 125, rot: "-3deg",  delay: 0.80, shape: "circle",       group: "tools" },
  { label: "A/B Testing",             top: 248, left: "90%",  width: 165, height: 78,  rot: "6deg",   delay: 0.90, shape: "pill",         group: "pm",     alt: true },
  // Row 3 — lower band (uses open space below)
  { label: "Requirements Definition", top: 468, left: "3%",   width: 215, height: 86,  rot: "-7deg",  delay: 1.00, shape: "rounded-rect", group: "pm" },
  { label: "Figma",                   top: 478, left: "22%",  width: 110, height: 68,  rot: "5deg",   delay: 1.15, shape: "pill",         group: "tools",  alt: true },
];

// Mobile: pixel-based, fits within ~375px, 2 columns, 5 rows
const mobileBlobs: BlobDef[] = [
  // Row 1
  { label: "Roadmapping",       top: 22,  left: "3%",   width: 150, height: 66, rot: "-5deg", delay: 0.10, shape: "pill",         group: "pm" },
  { label: "Stakeholder Mgmt",  top: 16,  left: "46%",  width: 160, height: 70, rot: "4deg",  delay: 0.25, shape: "rounded-rect", group: "pm",     alt: true },
  // Row 2
  { label: "Agile / Scrum",     top: 148, left: "3%",   width: 90,  height: 90, rot: "6deg",  delay: 0.15, shape: "circle",       group: "pm" },
  { label: "Go-to-Market",      top: 152, left: "30%",  width: 160, height: 68, rot: "-4deg", delay: 0.40, shape: "pill",         group: "domain" },
  // Row 3
  { label: "User Research",     top: 298, left: "3%",   width: 150, height: 66, rot: "5deg",  delay: 0.55, shape: "rounded-rect", group: "pm",     alt: true },
  { label: "Fintech",           top: 292, left: "46%",  width: 145, height: 68, rot: "-6deg", delay: 0.70, shape: "pill",         group: "domain", alt: true },
  // Row 4
  { label: "Risk & Compliance", top: 428, left: "3%",   width: 165, height: 68, rot: "-4deg", delay: 0.60, shape: "pill",         group: "domain" },
  { label: "Next.js",           top: 422, left: "50%",  width: 90,  height: 90, rot: "8deg",  delay: 0.30, shape: "circle",       group: "tools" },
  // Row 5
  { label: "Data Analysis",     top: 558, left: "3%",   width: 148, height: 64, rot: "4deg",  delay: 0.45, shape: "rounded-rect", group: "pm" },
  { label: "Figma",             top: 562, left: "46%",  width: 130, height: 64, rot: "-5deg", delay: 0.85, shape: "pill",         group: "tools",  alt: true },
];

function getBlobStyles(b: BlobDef, isMobile: boolean, blobIndex: number): React.CSSProperties {
  const radius =
    b.shape === "circle" ? "50%" : b.shape === "pill" ? "50px" : "14px";

  const base: React.CSSProperties = {
    position: "absolute",
    top: b.top,
    left: b.left,
    width: b.width,
    height: b.height,
    borderRadius: radius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 600,
    fontSize: isMobile ? "12px" : "13px",
    opacity: 0,
    ["--rot" as string]: `rotate(${b.rot})`,
    transform: `rotate(${b.rot})`,
    animationDelay: `${blobIndex * 0.032}s`,
    padding: "0 10px",
    lineHeight: 1.3,
  };

  if (b.group === "pm") {
    return { ...base, background: b.alt ? "#E4E2DE" : "#ECEAE6", color: "#3A3A3A", border: "1.5px solid #D8D5D0", boxShadow: "0 4px 0 #C8C4BE" };
  }
  if (b.group === "domain") {
    return { ...base, background: b.alt ? "#F0D8DA" : "#F5E6E7", color: "#A06468", border: "1.5px solid #E8B4B8", boxShadow: "0 4px 0 #DFA8AC" };
  }
  return { ...base, background: b.alt ? "#D8E9FC" : "#EAF1FD", color: "#2055C0", border: "1.5px solid #C8DCFA", boxShadow: "0 4px 0 #AACAF5" };
}

export default function SkillsDrop() {
  const sectionRef = useRef<HTMLElement>(null);
  const droppedIndices = useRef<Set<number>>(new Set());
  const rafRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const blobs = isMobile ? mobileBlobs : desktopBlobs;

  const minDelay = Math.min(...blobs.map((b) => b.delay));
  const maxDelay = Math.max(...blobs.map((b) => b.delay));
  const delaySpan = maxDelay - minDelay || 1;

  function scrollThresholdForDelay(delay: number): number {
    return (delay - minDelay) / delaySpan;
  }

  function updateScrollDrop() {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = vh + rect.height;
    if (total <= 0) return;
    const raw = (vh - rect.top) / total;
    const p = Math.min(1, Math.max(0, raw));
    /** Map viewport travel so drops span the middle of the scroll-through window (tuned for homepage pacing). */
    const effectiveP = Math.min(1, Math.max(0, (p - 0.04) / 0.86));

    const els = section.querySelectorAll<HTMLElement>(".skill-blob");
    els.forEach((el, i) => {
      const d = blobs[i]?.delay ?? minDelay;
      const threshold = scrollThresholdForDelay(d);
      if (effectiveP >= threshold && !droppedIndices.current.has(i)) {
        droppedIndices.current.add(i);
        el.classList.add("dropped");
      }
    });
  }

  function scheduleScrollUpdate() {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateScrollDrop();
    });
  }

  useEffect(() => {
    droppedIndices.current.clear();
    const onScroll = () => scheduleScrollUpdate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    scheduleScrollUpdate();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} style={{ background: "#F8F7F4" }}>
      <div style={{ padding: isMobile ? "60px 20px 24px" : "80px 32px 32px" }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: isMobile ? "28px" : "36px",
            color: "#0F0F0F",
            fontWeight: "bold",
            letterSpacing: "-1px",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          Capabilities
        </h2>
      </div>

      <div
        style={{
          position: "relative",
          height: isMobile ? "720px" : "640px",
          margin: "0 0 64px",
          overflow: "hidden",
        }}
      >
        {blobs.map((b, i) => (
          <div key={b.label} className="skill-blob" style={getBlobStyles(b, isMobile, i)}>
            {b.label}
          </div>
        ))}
      </div>
    </section>
  );
}
