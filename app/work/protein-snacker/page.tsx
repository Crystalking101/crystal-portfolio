import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProteinSnackerCaseStudyView from "@/components/ProteinSnackerCaseStudyView";
import { buildProteinCaseStudyScopedCss } from "./proteinCaseStudyCss";

export const metadata: Metadata = {
  title: "Protein Snacker — Crystal King",
  description:
    "A snack discovery engine for macro trackers — product case study.",
};

export default async function ProteinSnackerCaseStudyPage() {
  const htmlPath = path.join(
    process.cwd(),
    "public",
    "protein-snacker-case-study.html",
  );
  const raw = await readFile(htmlPath, "utf8");
  const styleMatch = raw.match(/<style>\s*([\s\S]*?)\s*<\/style>/);
  const bodyMatch = raw.match(/<body>\s*([\s\S]*?)\s*<\/body>/i);
  if (!styleMatch?.[1] || !bodyMatch?.[1]) {
    throw new Error("protein-snacker-case-study.html: missing <style> or <body>");
  }

  const scopedCss = buildProteinCaseStudyScopedCss(styleMatch[1]);
  const bodyHtml = bodyMatch[1].trim();

  return (
    <>
      <Nav />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap"
      />
      <ProteinSnackerCaseStudyView scopedCss={scopedCss} bodyHtml={bodyHtml} />
      <Footer />
    </>
  );
}
