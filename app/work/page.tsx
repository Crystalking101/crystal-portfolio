import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SingleCarousel } from "@/components/ProjectCarousel";
import { getPublishedWorkProjects } from "@/lib/portfolio-projects";

export const metadata = {
  title: "Work — Crystal King",
  description: "Professional product management work at American Express and beyond.",
};

export default async function WorkPage() {
  const projects = await getPublishedWorkProjects();

  return (
    <>
      <Nav />
      <main style={{ flex: 1, background: "#F8F7F4" }}>
        {/* Hero */}
        <section style={{ padding: "56px 32px 40px", maxWidth: "640px" }}>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 5vw, 38px)",
            color: "#0F0F0F",
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            fontWeight: "normal",
            margin: 0,
          }}>
            Products shipped.<br />
            <span style={{ color: "#2D6FE8" }}>Problems solved.</span>
          </h1>
        </section>

        {/* Carousel */}
        <div style={{ paddingBottom: "80px" }}>
          <SingleCarousel projects={projects} label="All Work" showComingSoon={false} blueHoverBorder={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
