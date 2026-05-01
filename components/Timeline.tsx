"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type TimelineItem = {
  label: string;
  labelColor: string;
  cardBg: string;
  cardBorder: string;
  title: string;
  body: string;
  titleColor?: string;
  bodyColor?: string;
};

const items: TimelineItem[] = [
  {
    label: "NOW · 2025 → present",
    labelColor: "#E8B4B8",
    cardBg: "#F5E6E7",
    cardBorder: "#E8B4B8",
    title: "Building independently.",
    body: "Shipped DiscoverDramaland, a live streaming platform. Built FinTips, a personal finance web app. Currently building Protein Snacker, a React Native health app.",
  },
  {
    label: "AMERICAN EXPRESS · 2023 → 2025",
    labelColor: "#2D6FE8",
    cardBg: "#EAF1FD",
    cardBorder: "#C8DCFA",
    title: "Associate Product Manager.",
    body: "Worked across Risk & Compliance, Payments & Cards, and Go-to-Market — shipping products that impacted millions of cardholders.",
  },
  {
    label: "NYU",
    labelColor: "#57068C",
    cardBg: "#F0E8F8",
    cardBorder: "#C9A8E8",
    title: "M.S. Integrated Marketing.",
    body: "Learned how users think, how markets move, and how to tell a story that makes people act.",
    titleColor: "#3B0A6B",
    bodyColor: "#57068C",
  },
  {
    label: "FASHION INDUSTRY · Early career",
    labelColor: "#888888",
    cardBg: "#ECEAE6",
    cardBorder: "#E0DDD8",
    title: "Where the instincts were born.",
    body: "Developed a sharp eye for customer behavior, brand strategy, and market gaps.",
  },
  {
    label: "THE ORIGIN · Berkeley College · BBA",
    labelColor: "#888888",
    cardBg: "#ECEAE6",
    cardBorder: "#E0DDD8",
    title: "Where it all started.",
    body: "Business fundamentals and a curiosity for how things work — the beginning of a habit of building things from scratch.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#F8F7F4",
        padding: isMobile ? "36px 20px 44px" : "48px 32px 56px",
      }}
    >
      <p
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "10px",
          color: "#BBBBBB",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          marginBottom: "40px",
        }}
      >
        The Journey
      </p>

      <div
        style={{
          position: "relative",
          paddingLeft: "32px",
          maxWidth: isMobile ? "100%" : "580px",
        }}
      >
        {/* Animated vertical line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: 0,
            width: "2px",
            height: visible ? "100%" : "0%",
            background: "linear-gradient(to bottom, #E8B4B8, #2D6FE8, #C8C4BE)",
            transition: "height 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {items.map((item, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              marginBottom: i < items.length - 1 ? "36px" : 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 0.28}s, transform 0.5s ease ${i * 0.28}s`,
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: "-28px",
                top: "4px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: item.labelColor,
                border: "2px solid #F8F7F4",
                boxShadow: `0 0 0 2px ${item.labelColor}`,
                transform: visible ? "scale(1)" : "scale(0)",
                transition: `transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.28 + 0.15}s`,
              }}
            />

            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: item.labelColor,
                margin: "0 0 10px",
              }}
            >
              {item.label}
            </p>

            <div
              style={{
                background: item.cardBg,
                border: `1px solid ${item.cardBorder}`,
                borderRadius: "12px",
                padding: isMobile ? "16px 18px" : "20px 22px",
              }}
            >
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: isMobile ? "16px" : "17px",
                  color: item.titleColor ?? "#0F0F0F",
                  margin: "0 0 8px",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "14px",
                  color: item.bodyColor ?? "#666",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
