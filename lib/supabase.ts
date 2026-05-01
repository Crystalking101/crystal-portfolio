import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Settings row key for DiscoverDramaland competitive landscape markdown (avoids new `projects` columns / schema cache issues). */
export const DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY = "discover_dramaland_competitive_landscape";

export type Project = {
  id: string;
  created_at: string;
  title: string;
  company: string | null;
  type: string | null;
  status: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  stat_number: string | null;
  stat_label: string | null;
  stat_2_number?: string | null;
  stat_2_label?: string | null;
  stat_3_number?: string | null;
  stat_3_label?: string | null;
  year_start: string | null;
  year_end: string | null;
  tags: string[] | null;
  rose_tags: string[] | null;
  card_theme: string;
  case_study_content: string | null;
  /**
   * Populated at read time for discover-dramaland from `settings` (not a DB column on `projects`).
   * Optional legacy: if you add `competitive_landscape_content` on `projects`, merge can prefer that later.
   */
  competitive_landscape_content?: string | null;
  is_featured: boolean;
  sort_order: number;
  published: boolean;
};
