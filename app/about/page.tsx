import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import FunFacts from "@/components/FunFacts";

export const metadata = {
  title: "About — Crystal King",
  description: "Builder first. PM second. The story of how Crystal King got here.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>

        {/* ── Hero ── */}
        <section
          style={{
            background: "#F8F7F4",
            padding: "clamp(36px, 6vw, 56px) clamp(20px, 4vw, 32px) 48px",
            maxWidth: "640px",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "10px",
              color: "#BBBBBB",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            About Me
          </p>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(26px, 5vw, 36px)",
              color: "#0F0F0F",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              margin: "0 0 24px",
              fontWeight: "normal",
            }}
          >
            I didn&apos;t start in product. I started by{" "}
            <span style={{ color: "#E8B4B8" }}>building.</span>
          </h1>

          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "15px",
              color: "#555",
              lineHeight: 1.9,
              margin: "0 0 24px",
            }}
          >
            I&apos;m Crystal, and my path here has been anything but straight. From the
            fashion industry, then entrepreneurship to being a PM — my journey has
            been a roller coaster. While working full time, I was quietly building on
            the side experimenting with online projects. That habit of building led me
            to pivot into finance, where I became an Associate Product Manager at
            American Express.
          </p>

          <p
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "17px",
              color: "#E8B4B8",
              margin: 0,
            }}
          >
            Here&apos;s how I got here.
          </p>
        </section>

        {/* ── Timeline ── */}
        <Timeline />

        {/* ── Fun Facts Strip ── */}
        <FunFacts />

      </main>
      <Footer />
    </>
  );
}
