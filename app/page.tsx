import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WhatIBring from "@/components/WhatIBring";
import SkillsDrop from "@/components/SkillsDrop";
import QuoteBanner from "@/components/QuoteBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <Ticker />
        <WhatIBring />
        <SkillsDrop />
        <QuoteBanner />
      </main>
      <Footer />
    </>
  );
}
