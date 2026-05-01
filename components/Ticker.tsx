export default function Ticker() {
  const items = [
    "Product Manager",
    "Fintech & Banking",
    "Risk & Compliance",
    "0-to-1 Builder",
    "Payments & Cards",
    "Go-to-Market",
    "Digital Products",
  ];

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i}>
        <span>{item}</span>
        <span style={{ color: "#E8B4B8", padding: "0 10px" }}>·</span>
      </span>
    ));

  return (
    <div
      style={{
        background: "#F5E6E7",
        borderTop: "1px solid #1A1A1A",
        borderBottom: "1px solid #E8E6E1",
        padding: "12px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "ticker 18s linear infinite",
        }}
      >
        {[0, 1].map((n) => (
          <span
            key={n}
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              color: "#B87A7E",
              letterSpacing: "2px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {renderItems()}
          </span>
        ))}
      </div>
    </div>
  );
}
