import { supabase, type Project } from "@/lib/supabase";

/** Shown when Supabase has no published work projects. */
export const WORK_PROJECT_PLACEHOLDERS: Project[] = [
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

/** Shown when Supabase has no published side projects. */
export const SIDE_PROJECT_PLACEHOLDERS: Project[] = [
  {
    id: "placeholder-6",
    created_at: "",
    title: "Shortlist",
    company: "Side Project",
    type: "side-project",
    status: "live",
    slug: "shortlist",
    tagline: "AI-powered job ranking tool. One command surfaces your best-fit roles from 40+ listings in under 5 minutes.",
    description: "A Python script that scrapes Google Jobs, scores every listing with Claude AI, and exports a ranked Excel shortlist.",
    stat_number: "5min",
    stat_label: "One command to ranked shortlist",
    stat_2_number: null,
    stat_2_label: null,
    stat_3_number: null,
    stat_3_label: null,
    year_start: "2026",
    year_end: "2026",
    tags: ["AI", "Python", "Open Source"],
    rose_tags: null,
    card_theme: "blue",
    case_study_content: null,
    is_featured: false,
    sort_order: 2,
    published: true,
  },
  {
    id: "placeholder-5",
    created_at: "",
    title: "FinTips",
    company: "Side Project",
    type: "side-project",
    status: "live",
    slug: "fintips",
    tagline: "Free, anonymous AI-powered financial advice. No sign-up, no tracking, built in a week.",
    description: "An AI-powered web app giving personalized money tips with no sign-up or tracking.",
    stat_number: "1",
    stat_label: "Week to launch",
    stat_2_number: null,
    stat_2_label: null,
    stat_3_number: null,
    stat_3_label: null,
    year_start: "2025",
    year_end: "2025",
    tags: ["AI", "Fintech", "Web App"],
    rose_tags: null,
    card_theme: "cream",
    case_study_content: null,
    is_featured: false,
    sort_order: 2,
    published: true,
  },
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
  {
    id: "placeholder-4",
    created_at: "",
    title: "InkBook",
    company: "Hackathon Project",
    type: "side-project",
    status: "live",
    slug: "inkbook",
    tagline: "A Mandarin tone ear training app with an AI Tone Coach, built in 6 days for drama learners.",
    description: "Mandarin tone ear training powered by AI and Azure Speech Services.",
    stat_number: "6",
    stat_label: "Days to ship",
    stat_2_number: null,
    stat_2_label: null,
    stat_3_number: null,
    stat_3_label: null,
    year_start: "2026",
    year_end: "2026",
    tags: ["AI", "EdTech", "Web App"],
    rose_tags: null,
    card_theme: "rose",
    case_study_content: null,
    is_featured: false,
    sort_order: 4,
    published: true,
  },
];

export async function getPublishedWorkProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("type", "work")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return WORK_PROJECT_PLACEHOLDERS;
  return data as Project[];
}

export async function getPublishedSideProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("type", "side-project")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return SIDE_PROJECT_PLACEHOLDERS;

  const dbProjects = data as Project[];
  const dbSlugs = new Set(dbProjects.map((p) => p.slug));

  // Append any placeholder projects not already present in Supabase
  const missing = SIDE_PROJECT_PLACEHOLDERS.filter((p) => !dbSlugs.has(p.slug));
  return [...dbProjects, ...missing];
}
