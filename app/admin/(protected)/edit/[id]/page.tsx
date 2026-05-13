import ProjectForm from "@/components/admin/ProjectForm";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY,
  settingsValueAsMarkdown,
  type Project,
} from "@/lib/supabase";

export const metadata = { title: "Admin — Edit Project" };

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  let project = data as Project;
  if (project.slug === "discover-dramaland") {
    const { data: row } = await supabase
      .from("settings")
      .select("value")
      .eq("key", DISCOVER_DRAMALAND_COMPETITIVE_SETTINGS_KEY)
      .maybeSingle();
    project = {
      ...project,
      competitive_landscape_content: settingsValueAsMarkdown(row?.value),
    };
  }

  return <ProjectForm initialData={project} projectId={project.id} />;
}
