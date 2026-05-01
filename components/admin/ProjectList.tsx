"use client";

import { useState } from "react";
import { createAdminBrowserClient } from "@/lib/supabase-admin";
import type { Project } from "@/lib/supabase";

const statusColors: Record<string, { bg: string; color: string }> = {
  live:          { bg: "#E8F8F0", color: "#1A7A4A" },
  "in-progress": { bg: "#FFF8E6", color: "#A07010" },
  "coming-soon": { bg: "#F2F0EC", color: "#888888" },
};

const themeColors: Record<string, { bg: string; color: string }> = {
  dark:  { bg: "#0F0F0F", color: "#E8B4B8" },
  blue:  { bg: "#EAF1FD", color: "#2D6FE8" },
  rose:  { bg: "#F5E6E7", color: "#B87A7E" },
  mint:  { bg: "#E8F8F4", color: "#2A7A60" },
  cream: { bg: "#ECEAE6", color: "#555555" },
  gold:  { bg: "#FDF6E3", color: "#A07030" },
};

function Pill({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: "20px",
        background: bg,
        color,
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

type Props = { initialProjects: Project[] };

export default function ProjectList({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const supabase = createAdminBrowserClient();

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      await fetch("/api/revalidate", { method: "POST" });
    }
    setDeletingId(null);
    setConfirmId(null);
  }

  async function togglePublished(project: Project) {
    const updated = !project.published;
    const { error } = await supabase
      .from("projects")
      .update({ published: updated })
      .eq("id", project.id);
    if (!error) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: updated } : p))
      );
      await fetch("/api/revalidate", { method: "POST" });
    }
  }

  if (projects.length === 0) {
    return (
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E6E1",
          borderRadius: "12px",
          padding: "60px 32px",
          textAlign: "center",
        }}
      >
        <p style={{ fontFamily: "Georgia, serif", fontSize: "20px", color: "#0F0F0F", margin: "0 0 8px" }}>
          No projects yet
        </p>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", color: "#BBBBBB", margin: "0 0 24px" }}>
          Add your first project to get started.
        </p>
        <a
          href="/admin/new"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#fff",
            background: "#2D6FE8",
            padding: "9px 20px",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          + New Project
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Confirm delete dialog */}
      {confirmId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setConfirmId(null)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "380px",
              width: "100%",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "20px",
                color: "#0F0F0F",
                margin: "0 0 10px",
              }}
            >
              Delete project?
            </p>
            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "14px",
                color: "#888",
                margin: "0 0 28px",
                lineHeight: 1.6,
              }}
            >
              &ldquo;{projects.find((p) => p.id === confirmId)?.title}&rdquo; will be permanently
              deleted and cannot be recovered.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setConfirmId(null)}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "13px",
                  color: "#555",
                  background: "none",
                  border: "1px solid #E8E6E1",
                  borderRadius: "6px",
                  padding: "8px 18px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deletingId === confirmId}
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "13px",
                  color: "#fff",
                  background: "#C0392B",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 18px",
                  cursor: "pointer",
                }}
              >
                {deletingId === confirmId ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E6E1",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 80px 90px 70px 55px 55px 110px",
            gap: "0",
            padding: "10px 20px",
            background: "#F8F7F4",
            borderBottom: "1px solid #E8E6E1",
          }}
        >
          {["Title", "Type", "Status", "Theme", "Order", "Pub", "Actions"].map((h) => (
            <span
              key={h}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "10px",
                color: "#BBBBBB",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {projects.map((project, i) => {
          const status = statusColors[project.status] ?? { bg: "#F2F0EC", color: "#888" };
          const theme = themeColors[project.card_theme] ?? { bg: "#ECEAE6", color: "#555" };
          const isLast = i === projects.length - 1;

          return (
            <div
              key={project.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 80px 90px 70px 55px 55px 110px",
                gap: "0",
                padding: "14px 20px",
                borderBottom: isLast ? "none" : "1px solid #F2F0EC",
                alignItems: "center",
              }}
            >
              {/* Title */}
              <div>
                <p
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#0F0F0F",
                    margin: "0 0 2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {project.title}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "11px",
                    color: "#BBBBBB",
                    margin: 0,
                  }}
                >
                  /{project.slug}
                </p>
              </div>

              {/* Type */}
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                {project.type === "side-project" ? "Side" : "Work"}
              </span>

              {/* Status */}
              <Pill label={project.status} bg={status.bg} color={status.color} />

              {/* Theme */}
              <Pill label={project.card_theme} bg={theme.bg} color={theme.color} />

              {/* Sort order */}
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "13px",
                  color: "#888",
                }}
              >
                {project.sort_order}
              </span>

              {/* Published toggle */}
              <button
                onClick={() => togglePublished(project)}
                title={project.published ? "Click to unpublish" : "Click to publish"}
                style={{
                  width: "36px",
                  height: "20px",
                  borderRadius: "10px",
                  border: "none",
                  background: project.published ? "#2D6FE8" : "#E8E6E1",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    left: project.published ? "19px" : "3px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }}
                />
              </button>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  href={`/admin/edit/${project.id}`}
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "12px",
                    color: "#2D6FE8",
                    textDecoration: "none",
                    border: "1px solid #C8DCFA",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    background: "#EAF1FD",
                    whiteSpace: "nowrap",
                  }}
                >
                  Edit
                </a>
                <button
                  onClick={() => setConfirmId(project.id)}
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "12px",
                    color: "#C0392B",
                    border: "1px solid #F5C6C2",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    background: "#FDF0EF",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
