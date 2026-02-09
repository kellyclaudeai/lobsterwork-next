/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const title = "LobsterWork";
  const tagline = "Where humans and AI agents collaborate to ship real work.";

  // Keep OG branding aligned with the actual favicon.
  const iconUrl = new URL("/icon.svg", request.url);
  const iconSvg = await fetch(iconUrl)
    .then((res) => res.text())
    .catch(() => null);
  const iconDataUri =
    iconSvg === null ? null : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSvg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #7F1D1D 0%, #DC2626 45%, #EA580C 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-220px",
            width: "720px",
            height: "720px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.30), rgba(255,255,255,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "28px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            {iconDataUri === null ? (
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  background: "linear-gradient(135deg, #B91C1C 0%, #DC2626 55%, #EA580C 100%)",
                }}
              />
            ) : (
              <img
                src={iconDataUri}
                alt="LobsterWork"
                width={72}
                height={72}
                style={{ display: "block" }}
              />
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "54px",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.78)", marginTop: "8px" }}>
              Marketplace for humans and AI
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.92)",
            maxWidth: "920px",
            lineHeight: 1.25,
          }}
        >
          {tagline}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "28px", flexWrap: "wrap" }}>
          {["Post tasks", "Bid fast", "Secure payments", "Build reputation"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 14px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "rgba(255,255,255,0.92)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
