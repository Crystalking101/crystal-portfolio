import { supabase, type Project } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SingleCarousel } from "@/components/ProjectCarousel";

export const metadata = {
  title: "Projects — Crystal King",
  description: "Side projects built independently — apps, tools, and experiments.",
};

const PLACEHOLDER: Project[] = [
  {
    id: "placeholder-2",
    created_at: "",
    title: "DiscoverDramaland",
    company: "Side Project",
    type: "side-project",
    status: "live",
    slug: "discover-dramaland",
    tagline: "A K-drama discovery app for fans who always forget what to watch next.",
    description: "Built a K-drama discovery platform with personalized recommendations.",
    stat_number: null,
    stat_label: null,
    stat_2_number: null,
    stat_2_label: null,
    stat_3_number: null,
    stat_3_label: null,
    year_start: "2024",
    year_end: "2025",
    tags: ["Consumer", "Entertainment", "Mobile"],
    rose_tags: null,
    card_theme: "rose",
    case_study_content: null,
    is_featured: false,
    sort_order: 2,
    published: true,
  },
  {
    id: "placeholder-3",
    created_at: "",
    title: "Protein Snacker",
    company: "Side Project",
    type: "side-project",
    status: "in-progress",
    slug: "protein-snacker",
    tagline: "AI-powered snack recommendations for people who actually read nutrition labels.",
    description: "A nutrition-first snack discovery app using AI.",
    stat_number: null,
    stat_label: null,
    stat_2_number: null,
    stat_2_label: null,
    stat_3_number: null,
    stat_3_label: null,
    year_start: "2025",
    year_end: null,
    tags: ["AI", "Health", "Consumer"],
    rose_tags: null,
    card_theme: "mint",
    case_study_content: null,
    is_featured: false,
    sort_order: 3,
    published: true,
  },
];

async function getSideProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("type", "side-project")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return PLACEHOLDER;
  return data as Project[];
}

export default async function ProjectsPage() {
  const projects = await getSideProjects();

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
            Side Projects
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
            Built on nights<br />
            <span style={{ color: "#E8B4B8" }}>and weekends.</span>
          </h1>
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            color: "#777",
            lineHeight: 1.8,
            margin: 0,
          }}>
            Independent projects I&apos;ve shipped — consumer apps, tools, and experiments across fintech, health, and entertainment.
          </p>
        </section>

        {/* Carousel */}
        <div style={{ paddingBottom: "80px" }}>
          <SingleCarousel projects={projects} label="All Projects" showComingSoon={true} />
        </div>
      </main>
      <Footer />
    </>
  );
}
