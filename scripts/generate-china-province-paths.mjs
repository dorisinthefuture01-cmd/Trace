/**
 * One-off / maintenance: reads cn-atlas provinces GeoJSON, simplifies rings,
 * projects to SVG paths, writes lib/data/chinaProvincePaths.json
 * Run: node scripts/generate-china-province-paths.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { geoMercator, geoPath } from "d3-geo";
import rewind from "@turf/rewind";
import simplify from "simplify-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const ADCODE_SLUG = JSON.parse(
  fs.readFileSync(path.join(root, "lib/data/provinceAdcodeSlugs.json"), "utf8")
);

const TOLERANCE = 0.14;

function simplifyRing(ring) {
  if (ring.length < 4) return ring;
  const pts = ring.map(([lng, lat]) => ({ x: lng, y: lat }));
  const out = simplify(pts, TOLERANCE, true);
  if (out.length < 4) return ring;
  return out.map((p) => [p.x, p.y]);
}

function simplifyGeom(g) {
  if (g.type === "Polygon") {
    return { ...g, coordinates: g.coordinates.map((r) => simplifyRing(r)) };
  }
  if (g.type === "MultiPolygon") {
    return {
      ...g,
      coordinates: g.coordinates.map((poly) => poly.map((r) => simplifyRing(r))),
    };
  }
  return g;
}

function roundPathD(d) {
  return d.replace(/-?\d+\.\d+/g, (m) => {
    const n = Number(m);
    return String(Math.round(n * 10) / 10);
  });
}

const raw = JSON.parse(
  fs.readFileSync(path.join(root, "node_modules/cn-atlas/provinces.json"), "utf8")
);

/** 与 d3-geo 球面多边形一致：修正绕序，避免出现整块视口矩形伪路径 */
function rewindFeature(f) {
  return rewind(JSON.parse(JSON.stringify(f)), { reverse: true });
}

const features = raw.features.map((f) => {
  const fixed = rewindFeature(f);
  return {
    type: "Feature",
    properties: fixed.properties,
    geometry: simplifyGeom(fixed.geometry),
  };
});

const fc = { type: "FeatureCollection", features };

const width = 900;
const height = 620;
const pad = 18;

const projection = geoMercator().fitExtent(
  [
    [pad, pad],
    [width - pad, height - pad],
  ],
  fc
);

const pathGen = geoPath(projection);

const out = features.map((f) => {
  const id = f.properties.id;
  const slug = ADCODE_SLUG[id];
  if (!slug) {
    throw new Error(`Missing slug for adcode ${id} ${f.properties.地名}`);
  }
  const d = roundPathD(pathGen(f));
  return {
    slug,
    label: f.properties.地名,
    d,
  };
});

const destDir = path.join(root, "lib", "data");
fs.mkdirSync(destDir, { recursive: true });
const dest = path.join(destDir, "chinaProvincePaths.json");
fs.writeFileSync(
  dest,
  JSON.stringify({ viewBox: `0 0 ${width} ${height}`, provinces: out }, null, 0),
  "utf8"
);

console.log("Wrote", dest, "bytes", fs.statSync(dest).size);
