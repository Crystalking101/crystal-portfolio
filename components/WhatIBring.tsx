"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const cards = [
  {
    theme: "rose",
    bg: "#F5E6E7",
    border: "#E8B4B8",
    shadow: "0 12px 40px rgba(232,180,184,0.45), 0 4px 12px rgba(184,122,126,0.2)",
    shadowHover: "0 20px 56px rgba(232,180,184,0.6), 0 8px 20px rgba(184,122,126,0.3)",
    iconBg: "rgba(232,180,184,0.2)",
    iconBorder: "#E8B4B8",
    iconStroke: "#B87A7E",
    titleColor: "#3D1A1C",
    bodyColor: "#B87A7E",
    title: "From Fashion to Fintech",
    body: "My path was never straight. Fashion taught me how customers feel. Entrepreneurship taught me how products fail. Fintech taught me how they scale.",
    icon: (stroke: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    theme: "mint",
    bg: "#E8F8F4",
    border: "#A8E0D0",
    shadow: "0 12px 40px rgba(116,212,183,0.35), 0 4px 12px rgba(42,140,90,0.15)",
    shadowHover: "0 20px 56px rgba(116,212,183,0.5), 0 8px 20px rgba(42,140,90,0.25)",
    iconBg: "rgba(168,224,208,0.25)",
    iconBorder: "#A8E0D0",
    iconStroke: "#2A7A60",
    titleColor: "#0D3D2E",
    bodyColor: "#3A8C72",
    title: "Builder Mindset",
    body: "I don't just write specs, I ship. Independently developed and launched DiscoverDramaland, FinTips, and Protein Snacker. I understand the product process from every angle.",
    icon: (stroke: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="8 21 12 17 16 21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="6 8 10 11 6 14" />
        <line x1="13" y1="14" x2="17" y2="14" />
      </svg>
    ),
  },
  {
    theme: "cream",
    bg: "#ECEAE6",
    border: "#D8D5D0",
    shadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)",
    shadowHover: "0 20px 56px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.12)",
    iconBg: "rgba(0,0,0,0.05)",
    iconBorder: "#C8C4BE",
    iconStroke: "#555",
    titleColor: "#0F0F0F",
    bodyColor: "#777",
    title: "Enterprise at Scale",
    body: "At American Express I learned what it means to ship inside a complex regulated institution. Four teams, millions of cardholders, real compliance stakes. I know how to get things done.",
    icon: (stroke: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    theme: "blue",
    bg: "#EAF1FD",
    border: "#C8DCFA",
    shadow: "0 12px 40px rgba(45,111,232,0.25), 0 4px 12px rgba(45,111,232,0.12)",
    shadowHover: "0 20px 56px rgba(45,111,232,0.38), 0 8px 20px rgba(45,111,232,0.2)",
    iconBg: "rgba(45,111,232,0.1)",
    iconBorder: "#C8DCFA",
    iconStroke: "#2D6FE8",
    titleColor: "#0A1628",
    bodyColor: "#6080AA",
    title: "Go-to-Market",
    body: "From Delta co-branded card campaigns to consumer app launches, I understand how products reach people. Strategy, positioning and launch planning across enterprise and startup scale.",
    icon: (stroke: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
] as const;

function Card({ card, isMobile }: { card: typeof cards[number]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: card.bg,
        border: `1px solid ${card.border}`,
        borderRadius: "16px",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxShadow: hovered ? card.shadowHover : card.shadow,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: card.iconBg,
        border: `1px solid ${card.iconBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        {card.icon(card.iconStroke)}
      </div>

      {/* Title */}
      <p style={{
        fontFamily: "Georgia, serif",
        fontSize: "18px",
        color: card.titleColor,
        lineHeight: 1.3,
        margin: 0,
        fontWeight: "normal",
      }}>
        {card.title}
      </p>

      {/* Body */}
      <p style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "13px",
        color: card.bodyColor,
        lineHeight: 1.75,
        margin: 0,
      }}>
        {card.body}
      </p>
    </div>
  );
}

export default function WhatIBring() {
  const isMobile = useIsMobile();

  return (
    <section style={{
      background: "#F8F7F4",
      padding: isMobile ? "48px 20px 56px" : "60px 32px 60px",
    }}>
      {/* Heading */}
      <h2 style={{
        fontFamily: "Georgia, serif",
        fontSize: isMobile ? "28px" : "36px",
        color: "#0F0F0F",
        fontWeight: "bold",
        letterSpacing: "-1px",
        margin: "0 0 40px",
        lineHeight: 1.15,
      }}>
        What I Bring to the Table.
      </h2>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
        gap: "20px",
      }}>
        {cards.map((card) => (
          <Card key={card.title} card={card} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
