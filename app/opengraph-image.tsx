import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Rechtsanwaltskanzlei Karakis Güldogan · Hannover — Ihr Recht hat hier eine Adresse.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const root = process.cwd();
  const [serif, sans, map, logo] = await Promise.all([
    readFile(join(root, "assets/fonts/YoungSerif-Regular.ttf")),
    readFile(join(root, "assets/fonts/AtkinsonHyperlegible-Bold.ttf")),
    readFile(join(root, "assets/og-map.jpg")),
    readFile(join(root, "public/brand/logo-karakis-gueldogan.png")),
  ]);
  const mapSrc = `data:image/jpeg;base64,${map.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4f6f5", color: "#13202a" }}>
        <div style={{ width: 600, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px 52px" }}>
          <img src={logoSrc} width={250} height={70} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Young", fontSize: 70, lineHeight: 1.04, letterSpacing: -2, display: "flex", flexDirection: "column" }}>
              <span>Ihr Recht hat</span>
              <span>hier eine</span>
              <span style={{ color: "#0b6b65" }}>Adresse.</span>
            </div>
            <div style={{ fontFamily: "Atkinson", fontSize: 26, marginTop: 26, lineHeight: 1.3 }}>
              Rechtsanwältin Penbe Güldogan · Hannover-Mühlenberg
            </div>
          </div>
        </div>
        <div style={{ width: 600, height: 630, display: "flex", position: "relative", overflow: "hidden" }}>
          <img src={mapSrc} width={660} height={630} alt="" style={{ position: "absolute", left: -60, top: 0 }} />
          <div style={{ position: "absolute", left: 246, top: 291, width: 48, height: 48, borderRadius: 48, background: "#13202a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Young", fontSize: 30, border: "5px solid #139c93" }}>§</div>
          <div style={{ position: "absolute", left: 306, top: 290, display: "flex", background: "#fff", padding: "10px 16px", borderRadius: 10, fontFamily: "Atkinson", fontSize: 22 }}>Mühlenbergzentrum 8</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Young", data: serif, weight: 400 }, { name: "Atkinson", data: sans, weight: 700 }] },
  );
}
