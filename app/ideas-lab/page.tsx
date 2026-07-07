import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ideas Lab — Crystal King",
  description: "Product teardowns, frameworks, and thinking from Crystal King.",
};

export default function IdeasLabPage() {
  return (
    <>
      <Nav />
      <main style={{ flex: 1 }}>

        {/* Coming Soon */}
        <section style={{
          background: "#F8F7F4",
          padding: "80px 40px 120px",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
        }}>
          <div style={{
            background: "#ECEAE6",
            borderRadius: "20px",
            padding: "64px",
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2D6FE8",
              marginBottom: "16px",
            }}>
              Ideas Lab
            </p>

            <h1 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              color: "#0F0F0F",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}>
              Where I think out loud.
            </h1>

            <span style={{
              display: "inline-block",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#B87A7E",
              background: "rgba(232,180,184,0.15)",
              border: "1px solid rgba(232,180,184,0.3)",
              borderRadius: "100px",
              padding: "5px 14px",
              marginBottom: "24px",
            }}>
              Coming Soon
            </span>

            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              color: "#0F0F0F",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}>
              Teardowns and frameworks in progress.
            </h2>

            <p style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "15px",
              color: "#777",
              lineHeight: 1.75,
              marginBottom: "28px",
            }}>
              The first drop will include a product teardown and a framework I use for scoping AI features. Check back soon.
            </p>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
