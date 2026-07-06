import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SingleCarousel } from "@/components/ProjectCarousel";
import { getPublishedSideProjects } from "@/lib/portfolio-projects";

export const metadata = {
  title: "Products — Crystal King",
  description: "Side projects built independently — apps, tools, and experiments.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedSideProjects();

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
            Built on nights<br />
            <span style={{ color: "#E8B4B8" }}>and weekends.</span>
          </h1>
        </section>

        {/* Carousel */}
        <div style={{ paddingBottom: "80px" }}>
          <SingleCarousel projects={projects} label="All Products" showComingSoon={true} blueHoverBorder={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
