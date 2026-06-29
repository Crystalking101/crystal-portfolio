import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InkBookCaseStudyView from "@/components/InkBookCaseStudyView";
import { buildInkbookCaseStudyScopedCss } from "./inkbookCaseStudyCss";

export const metadata: Metadata = {
  title: "InkBook — Crystal King",
  description:
    "A Mandarin tone ear training web app powered by an AI Tone Coach Agent — hackathon case study.",
};

export default async function InkBookCaseStudyPage() {
  const htmlPath = path.join(
    process.cwd(),
    "public",
    "inkbook-case-study.html",
  );
  const raw = await readFile(htmlPath, "utf8");
  const styleMatch = raw.match(/<style>\s*([\s\S]*?)\s*<\/style>/);
  const bodyMatch = raw.match(/<body>\s*([\s\S]*?)\s*<\/body>/i);
  if (!styleMatch?.[1] || !bodyMatch?.[1]) {
    throw new Error("inkbook-case-study.html: missing <style> or <body>");
  }

  const scopedCss = buildInkbookCaseStudyScopedCss(styleMatch[1]);
  const bodyHtml = bodyMatch[1].trim();

  return (
    <>
      <Nav />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
      <InkBookCaseStudyView scopedCss={scopedCss} bodyHtml={bodyHtml} />
      <Footer />
    </>
  );
}
