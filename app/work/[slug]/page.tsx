import CaseStudyContent from "@/components/CaseStudyContent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import {
  DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY,
  settingsValueAsMarkdown,
  supabase,
  type Project,
} from "@/lib/supabase";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Canonical copy fix when CMS still has older wording. */
const KRI_ROUTINE_REVIEW_OLD =
  "I uncovered this independently during a routine review of Key Risk Indicator processes.";
const KRI_ROUTINE_REVIEW_NEW =
  "I uncovered this independently during a routine review.";

async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  let project = data as Project;

  if (slug === "kri-automation" && project.case_study_content) {
    project = {
      ...project,
      case_study_content: project.case_study_content.replaceAll(
        KRI_ROUTINE_REVIEW_OLD,
        KRI_ROUTINE_REVIEW_NEW,
      ),
    };
  }

  if (slug === "discover-dramaland") {
    const { data: row } = await supabase
      .from("settings")
      .select("value")
      .eq("key", DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY)
      .maybeSingle();
    return {
      ...project,
      competitive_landscape_content: settingsValueAsMarkdown(row?.value),
    };
  }
  return project;
}

async function getAdjacentProjects(currentSortOrder: number): Promise<{
  prev: Project | null;
  next: Project | null;
}> {
  const { data } = await supabase
    .from("projects")
    .select("id, title, slug, sort_order, card_theme")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (!data) return { prev: null, next: null };

  const all = data as Project[];
  const idx = all.findIndex((p) => p.sort_order === currentSortOrder);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Case Study — Crystal King" };
  return {
    title: `${project.title} — Crystal King`,
    description: project.tagline ?? project.description ?? "",
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(project.sort_order);

  return (
    <>
      <Nav />
      <CaseStudyContent project={project} prev={prev} next={next} />
      <Footer />
    </>
  );
}
