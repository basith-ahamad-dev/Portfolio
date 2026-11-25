import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Basith Ahamad — Software Engineer & AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/images/logo.png"))).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          color: "#f5f5f4",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(229,18,31,0.42), transparent 45%), radial-gradient(circle at 10% 100%, rgba(255,90,100,0.16), transparent 40%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" width={190} height={80} />
          <div style={{ fontSize: 28, letterSpacing: 6, color: "#e5121f" }}>PORTFOLIO — 2026</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 124, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, textTransform: "uppercase" }}>
            Basith Ahamad
          </div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#a1a1aa" }}>
            Software Engineer · AI Builder · Web Developer
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 26 }}>
          {["React · Next.js", "Laravel", "AI / ML", "Automation"].map((t) => (
            <div
              key={t}
              style={{ padding: "12px 26px", borderRadius: 999, border: "2px solid rgba(255,255,255,0.18)", display: "flex" }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
