import { ImageResponse } from "next/og";

export const alt = "Priyanshu Chamoli — IT Student & Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              color: "white",
            }}
          >
            PC
          </div>
          <span style={{ fontSize: "24px", color: "#a1a1aa", fontWeight: 600 }}>
            priyanshuchamoli.dev
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#fafafa",
            }}
          >
            Priyanshu Chamoli
          </div>
          <div style={{ fontSize: "32px", color: "#60a5fa", fontWeight: 600 }}>
            IT Student &amp; Developer
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Networking • Cloud Computing • Linux Systems • Virtual Labs • Software Engineering
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Dehradun, India", "Interactive Labs", "B.Sc. IT"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: "16px",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#d4d4d8",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
