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
  // Row 1
  { label: "Roadmapping",             top: 20,  left: "1%",   width: 180, height: 80,  rot: "-6deg",  delay: 0.10, shape: "pill",         group: "pm" },
  { label: "Stakeholder Mgmt",        top: 10,  left: "17%",  width: 210, height: 88,  rot: "4deg",   delay: 0.25, shape: "rounded-rect", group: "pm",     alt: true },
  { label: "Agile / Scrum",           top: 30,  left: "35%",  width: 105, height: 105, rot: "-8deg",  delay: 0.15, shape: "circle",       group: "pm" },
  { label: "Go-to-Market",            top: 15,  left: "46%",  width: 175, height: 82,  rot: "5deg",   delay: 0.40, shape: "pill",         group: "domain" },
  { label: "Next.js",                 top: 25,  left: "62%",  width: 115, height: 115, rot: "10deg",  delay: 0.20, shape: "circle",       group: "tools" },
  { label: "Risk & Compliance",       top: 10,  left: "72%",  width: 205, height: 84,  rot: "-5deg",  delay: 0.50, shape: "pill",         group: "domain", alt: true },
  { label: "Cursor AI",               top: 30,  left: "89%",  width: 115, height: 65,  rot: "7deg",   delay: 0.30, shape: "rounded-rect", group: "tools" },
  // Row 2
  { label: "User Research",           top: 175, left: "2%",   width: 160, height: 75,  rot: "5deg",   delay: 0.60, shape: "rounded-rect", group: "pm",     alt: true },
  { label: "Data Analysis",           top: 165, left: "16%",  width: 150, height: 70,  rot: "-4deg",  delay: 0.45, shape: "rounded-rect", group: "pm" },
  { label: "Fintech",                 top: 185, left: "30%",  width: 185, height: 84,  rot: "8deg",   delay: 0.70, shape: "pill",         group: "domain", alt: true },
  { label: "Digital Banking",         top: 160, left: "46%",  width: 185, height: 80,  rot: "-6deg",  delay: 0.55, shape: "rounded-rect", group: "domain" },
  { label: "React Native",            top: 180, left: "62%",  width: 165, height: 76,  rot: "4deg",   delay: 0.65, shape: "pill",         group: "tools",  alt: true },
  { label: "Supabase",                top: 160, left: "78%",  width: 125, height: 125, rot: "-3deg",  delay: 0.80, shape: "circle",       group: "tools" },
  { label: "A/B Testing",             top: 175, left: "90%",  width: 165, height: 78,  rot: "6deg",   delay: 0.90, shape: "pill",         group: "pm",     alt: true },
  // Row 3
  { label: "Requirements Definition", top: 345, left: "3%",   width: 215, height: 86,  rot: "-7deg",  delay: 1.00, shape: "rounded-rect", group: "pm" },
  { label: "Figma",                   top: 355, left: "22%",  width: 110, height: 68,  rot: "5deg",   delay: 1.15, shape: "pill",         group: "tools",  alt: true },
];

// Mobile: pixel-based, fits within ~375px, 2 columns, 5 rows
const mobileBlobs: BlobDef[] = [
  // Row 1
  { label: "Roadmapping",       top: 15,  left: "3%",   width: 150, height: 66, rot: "-5deg", delay: 0.10, shape: "pill",         group: "pm" },
  { label: "Stakeholder Mgmt",  top: 10,  left: "46%",  width: 160, height: 70, rot: "4deg",  delay: 0.25, shape: "rounded-rect", group: "pm",     alt: true },
  // Row 2
  { label: "Agile / Scrum",     top: 110, left: "3%",   width: 90,  height: 90, rot: "6deg",  delay: 0.15, shape: "circle",       group: "pm" },
  { label: "Go-to-Market",      top: 115, left: "30%",  width: 160, height: 68, rot: "-4deg", delay: 0.40, shape: "pill",         group: "domain" },
  // Row 3
  { label: "User Research",     top: 225, left: "3%",   width: 150, height: 66, rot: "5deg",  delay: 0.55, shape: "rounded-rect", group: "pm",     alt: true },
  { label: "Fintech",           top: 220, left: "46%",  width: 145, height: 68, rot: "-6deg", delay: 0.70, shape: "pill",         group: "domain", alt: true },
  // Row 4
  { label: "Risk & Compliance", top: 320, left: "3%",   width: 165, height: 68, rot: "-4deg", delay: 0.60, shape: "pill",         group: "domain" },
  { label: "Next.js",           top: 315, left: "50%",  width: 90,  height: 90, rot: "8deg",  delay: 0.30, shape: "circle",       group: "tools" },
  // Row 5
  { label: "Data Analysis",     top: 430, left: "3%",   width: 148, height: 64, rot: "4deg",  delay: 0.45, shape: "rounded-rect", group: "pm" },
  { label: "Figma",             top: 435, left: "46%",  width: 130, height: 64, rot: "-5deg", delay: 0.85, shape: "pill",         group: "tools",  alt: true },
];

function getBlobStyles(b: BlobDef, isMobile: boolean): React.CSSProperties {
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
    animationDelay: `${b.delay}s`,
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
  const zoneRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);
  const isMobile = useIsMobile();

  const blobs = isMobile ? mobileBlobs : desktopBlobs;

  function triggerDrop() {
    const blobEls = document.querySelectorAll<HTMLElement>(".skill-blob");
    blobEls.forEach((b) => {
      b.classList.remove("dropped");
      b.style.opacity = "0";
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        blobEls.forEach((b) => b.classList.add("dropped"));
      });
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
            triggerDrop();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    const zone = zoneRef.current;
    if (zone) observer.observe(zone);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "#F8F7F4" }}>
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
        ref={zoneRef}
        style={{
          position: "relative",
          height: isMobile ? "600px" : "500px",
          margin: "0 0 64px",
          overflow: "hidden",
        }}
      >
        {blobs.map((b) => (
          <div key={b.label} className="skill-blob" style={getBlobStyles(b, isMobile)}>
            {b.label}
          </div>
        ))}
      </div>

      <div
        style={{
          padding: isMobile ? "0 20px 32px" : "0 32px 36px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => triggerDrop()}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "11px",
            color: "#2D6FE8",
            background: "transparent",
            border: "1px solid #2D6FE8",
            borderRadius: "4px",
            padding: "6px 14px",
            cursor: "pointer",
            letterSpacing: "0.3px",
          }}
        >
          ▶ Replay drop
        </button>
      </div>
    </section>
  );
}
