import { supabase, type Project } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SingleCarousel } from "@/components/ProjectCarousel";

export const metadata = {
  title: "Work — Crystal King",
  description: "Professional product management work at American Express and beyond.",
};

const PLACEHOLDER: Project[] = [
  {
    id: "placeholder-1",
    created_at: "",
    title: "Key Risk Indicator Automation",
    company: "American Express",
    type: "work",
    status: "live",
    slug: "kri-automation",
    tagline: "Led 4-team cross-functional delivery of 2 automated risk controls across 3M+ cardholders.",
    description: "Identified an APR data gap affecting 3M+ cardholders.",
    stat_number: "80%",
    stat_label: "Manual review time saved",
    stat_2_number: "3M+",
    stat_2_label: "Cardholders covered by new controls",
    stat_3_number: "4",
    stat_3_label: "Cross-functional teams led",
    year_start: "2023",
    year_end: "2025",
    tags: ["Automation", "Cross-functional"],
    rose_tags: ["Risk & Compliance"],
    card_theme: "blue",
    case_study_content: null,
    is_featured: true,
    sort_order: 1,
    published: true,
  },
];

async function getWorkProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("type", "work")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return PLACEHOLDER;
  return data as Project[];
}

export default async function WorkPage() {
  const projects = await getWorkProjects();

  return (
    <>
      <Nav />
      <main style={{ flex: 1, background: "#F8F7F4" }}>
        {/* Hero */}
        <section style={{ padding: "56px 32px 40px", maxWidth: "640px" }}>
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "10px",
            color: "#BBBBBB",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}>
            Professional Work
          </p>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 5vw, 38px)",
            color: "#0F0F0F",
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            fontWeight: "normal",
            margin: "0 0 16px",
          }}>
            Products shipped.<br />
            <span style={{ color: "#2D6FE8" }}>Problems solved.</span>
          </h1>
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            color: "#777",
            lineHeight: 1.8,
            margin: 0,
          }}>
            A selection of cross-functional PM work from my time at American Express and beyond.
          </p>
        </section>

        {/* Carousel */}
        <div style={{ paddingBottom: "80px" }}>
          <SingleCarousel projects={projects} label="All Work" showComingSoon={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
