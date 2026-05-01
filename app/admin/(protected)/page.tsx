import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Project } from "@/lib/supabase";
import ProjectList from "@/components/admin/ProjectList";

export const metadata = { title: "Admin — Projects" };

export default async function AdminDashboard() {
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
    .order("sort_order", { ascending: true });

  const projects: Project[] = error || !data ? [] : (data as Project[]);

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "26px",
              color: "#0F0F0F",
              fontWeight: "normal",
              letterSpacing: "-0.5px",
              margin: "0 0 4px",
            }}
          >
            Projects
          </h1>
          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "13px",
              color: "#BBBBBB",
              margin: 0,
            }}
          >
            {projects.length} total · includes unpublished
          </p>
        </div>
        <a
          href="/admin/new"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#fff",
            background: "#2D6FE8",
            padding: "9px 18px",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          + New Project
        </a>
      </div>

      <ProjectList initialProjects={projects} />
    </div>
  );
}
