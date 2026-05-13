import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WhatIBring from "@/components/WhatIBring";
import SkillsDrop from "@/components/SkillsDrop";
import QuoteBanner from "@/components/QuoteBanner";
import Footer from "@/components/Footer";
import ProjectCarousel from "@/components/ProjectCarousel";
import { getPublishedSideProjects, getPublishedWorkProjects } from "@/lib/portfolio-projects";

export default async function HomePage() {
  const [workProjects, sideProjects] = await Promise.all([
    getPublishedWorkProjects(),
    getPublishedSideProjects(),
  ]);

  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <Ticker />
        <WhatIBring />
        <SkillsDrop />
        <QuoteBanner />
        <ProjectCarousel workProjects={workProjects} sideProjects={sideProjects} />
      </main>
      <Footer />
    </>
  );
}
