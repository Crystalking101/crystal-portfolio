export default function QuoteBanner() {
  return (
    <section style={{ position: "relative", width: "100%", minHeight: "420px", overflow: "hidden" }}>

      {/* Layer 1 — background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/crystal-sketch.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Layer 2 — dark overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, rgba(15,15,15,0.88), rgba(15,15,15,0.75))",
      }} />

      {/* Layer 3 — rose top accent line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        background: "linear-gradient(to right, #E8B4B8, transparent)",
      }} />

      {/* Layer 4 — rose bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "3px",
        background: "linear-gradient(to right, transparent, #E8B4B8)",
      }} />

      {/* Layer 5 — quote content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "420px",
        padding: "60px 48px",
        textAlign: "center",
      }}>

        {/* Opening quote mark */}
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "80px",
          color: "#E8B4B8",
          opacity: 0.6,
          lineHeight: 0.5,
          marginBottom: "32px",
          userSelect: "none",
        }}>
          &ldquo;
        </div>

        {/* Quote text */}
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: "normal",
          color: "#FFFFFF",
          letterSpacing: "-1px",
          lineHeight: 1.3,
          maxWidth: "680px",
          margin: "0 0 28px",
        }}>
          Fall in love with the{" "}
          <span style={{ color: "#E8B4B8" }}>problem,</span>
          {" "}not the solution.
        </h2>

        {/* Attribution */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}>
          <div style={{ width: "40px", height: "1px", background: "#E8B4B8", opacity: 0.5 }} />
          <span style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "#888",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}>
            Uri Levine
          </span>
          <div style={{ width: "40px", height: "1px", background: "#E8B4B8", opacity: 0.5 }} />
        </div>

      </div>
    </section>
  );
}
