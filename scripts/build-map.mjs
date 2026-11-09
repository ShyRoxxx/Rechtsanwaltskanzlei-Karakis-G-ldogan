// Baut die Karten der Website einmalig aus OpenStreetMap-Kacheln (© OpenStreetMap-Mitwirkende, ODbL).
// Zur Laufzeit wird nichts von OpenStreetMap geladen.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const UA = "BilbaoConsulting-WebsiteBuild/1.0 (einmaliger Kartenbau)";
const OUT = new URL("../public/map/", import.meta.url);

const lon2x = (lon, z) => ((lon + 180) / 360) * 2 ** z * 256;
const lat2y = (lat, z) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z * 256;
};

// Duoton: dunkel = Tinte, hell = Papier, leicht türkis gekippt
function tint(dark, light) {
  return { dark, light };
}

async function build({ name, lat, lon, z, w, h, colors, points }) {
  const cx = lon2x(lon, z), cy = lat2y(lat, z);
  const x0 = Math.round(cx - w / 2), y0 = Math.round(cy - h / 2);
  const tx0 = Math.floor(x0 / 256), ty0 = Math.floor(y0 / 256);
  const tx1 = Math.floor((x0 + w - 1) / 256), ty1 = Math.floor((y0 + h - 1) / 256);
  const comps = [];
  for (let tx = tx0; tx <= tx1; tx++) {
    for (let ty = ty0; ty <= ty1; ty++) {
      const url = `https://tile.openstreetmap.org/${z}/${tx}/${ty}.png`;
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`${url}: ${res.status}`);
      comps.push({ input: Buffer.from(await res.arrayBuffer()), left: (tx - tx0) * 256, top: (ty - ty0) * 256 });
      await new Promise((r) => setTimeout(r, 120));
    }
  }
  const W = (tx1 - tx0 + 1) * 256, H = (ty1 - ty0 + 1) * 256;
  const mosaic = await sharp({ create: { width: W, height: H, channels: 3, background: "#fff" } })
    .composite(comps).png().toBuffer();
  const crop = await sharp(mosaic).extract({ left: x0 - tx0 * 256, top: y0 - ty0 * 256, width: w, height: h })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  // Graustufen -> Duoton
  const { data, info } = crop;
  const [d, l] = [colors.dark, colors.light].map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)));
  const rgb = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const lum = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
    const t = Math.min(1, Math.max(0, (lum - 0.42) * 1.75));
    // Grünflächen und Wasser bekommen einen Hauch Türkis, alles andere bleibt Tinte/Papier
    const green = g - (r + b) / 2 > 8 ? 1 : 0;
    const water = b - r > 20 && b > 180 ? 1 : 0;
    for (let c = 0; c < 3; c++) {
      let v = d[c] + (l[c] - d[c]) * t;
      if (green) v = v * 0.86 + [196, 228, 222][c] * 0.14;
      if (water) v = v * 0.6 + [150, 205, 200][c] * 0.4;
      rgb[i * 3 + c] = Math.round(v);
    }
  }
  const img = sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } });
  await img.clone().avif({ quality: 52 }).toFile(new URL(`${name}.avif`, OUT).pathname);
  await img.clone().webp({ quality: 72 }).toFile(new URL(`../assets/${name}.webp`, import.meta.url).pathname);
  const pos = Object.fromEntries(Object.entries(points).map(([k, [plat, plon]]) => [k, {
    x: +((lon2x(plon, z) - x0) / w * 100).toFixed(2), y: +((lat2y(plat, z) - y0) / h * 100).toFixed(2),
  }]));
  return { name, w, h, points: pos };
}

await mkdir(OUT, { recursive: true });
const points = {
  kanzlei: [52.340881, 9.692455],
  stadtbahn: [52.34089, 9.692935],
  parken: [52.3399, 9.6941],
};
const results = [];
results.push(await build({
  name: "muehlenberg", lat: 52.3405, lon: 9.6905, z: 16, w: 2000, h: 1300,
  colors: tint("#1b3542", "#f1f5f4"), points,
}));
results.push(await build({
  name: "hannover-sued", lat: 52.352, lon: 9.712, z: 13, w: 1200, h: 900,
  colors: tint("#1b3542", "#eef3f2"),
  points: { kanzlei: points.kanzlei, innenstadt: [52.3745, 9.7386], ricklingen: [52.3460, 9.7224], linden: [52.3655, 9.7095], wettbergen: [52.3365, 9.6851], hemmingen: [52.3240, 9.7250], ronnenberg: [52.3195, 9.6560] },
}));
await writeFile(new URL("../lib/map-points.json", import.meta.url), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));

// Ausschnitt fürs Handy: 1040 × 800 rund um die Kanzlei
{
  const m = results[0];
  const px = Math.round((m.points.kanzlei.x / 100) * m.w), py = Math.round((m.points.kanzlei.y / 100) * m.h);
  const CW = 1040, CH = 800;
  const left = Math.max(0, Math.min(m.w - CW, px - CW / 2)), top = Math.max(0, Math.min(m.h - CH, py - CH / 2));
  const src = new URL("../assets/muehlenberg.webp", import.meta.url).pathname;
  await sharp(src).extract({ left, top, width: CW, height: CH }).avif({ quality: 42 }).toFile(new URL("muehlenberg-m.avif", OUT).pathname);
  const rel = (k) => ({ x: +((((m.points[k].x / 100) * m.w - left) / CW) * 100).toFixed(2), y: +((((m.points[k].y / 100) * m.h - top) / CH) * 100).toFixed(2) });
  results.push({ name: "muehlenberg-m", w: CW, h: CH, points: { kanzlei: rel("kanzlei"), stadtbahn: rel("stadtbahn"), parken: rel("parken") } });
  await writeFile(new URL("../lib/map-points.json", import.meta.url), JSON.stringify(results, null, 2));
}
