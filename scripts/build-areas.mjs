/**
 * Builds lib/data/areas.json from china-division + provinceAdcodeSlugs (pinyin).
 * Run: node scripts/build-areas.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pinyin } from "pinyin-pro";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "node_modules/china-division/dist");

const adcodeSlug = JSON.parse(
  fs.readFileSync(path.join(root, "lib/data/provinceAdcodeSlugs.json"), "utf8")
);

const provinces = JSON.parse(fs.readFileSync(path.join(dist, "provinces.json"), "utf8"));
const pc = JSON.parse(fs.readFileSync(path.join(dist, "pc.json"), "utf8"));
const hkmo = JSON.parse(fs.readFileSync(path.join(dist, "HK-MO-TW.json"), "utf8"));

function slugify(zh) {
  const s = pinyin(zh, { toneType: "none", type: "string", separator: "" })
    .replace(/\s+/g, "")
    .toLowerCase();
  return s.replace(/[^a-z0-9]/g, "");
}

/** 地级市常用短 slug：青岛市 → 青岛 → qingdao（与习惯 URL 一致） */
function citySlugFromLabel(cityLabel) {
  let core = cityLabel;
  if (/市$/.test(cityLabel) && cityLabel.length > 2) {
    core = cityLabel.slice(0, -1);
  }
  return slugify(core) || slugify(cityLabel);
}

function buildSearchText(label, slug) {
  const initials = pinyin(label, { pattern: "first", toneType: "none", type: "string", separator: "" })
    .replace(/\s+/g, "")
    .toLowerCase();
  return `${label} ${slug} ${initials}`.toLowerCase();
}

/** @type {Set<string>} */
const usedCitySlugs = new Set();

function uniqueCitySlug(base) {
  let s = base || "city";
  let n = 0;
  while (usedCitySlugs.has(s)) {
    n += 1;
    s = `${base}${n}`;
  }
  usedCitySlugs.add(s);
  return s;
}

const outProvinces = [];

for (const p of provinces) {
  const adcode = `${p.code}0000`;
  const slug = adcodeSlug[adcode];
  if (!slug) continue;
  const name = p.name;
  const citiesRaw = pc[name];
  if (!citiesRaw) {
    console.warn("No pc entry for", name);
    continue;
  }
  const cities = citiesRaw.map((cityLabel) => {
    const base = citySlugFromLabel(cityLabel.replace(/[（）()]/g, ""));
    const citySlug = uniqueCitySlug(base);
    return {
      slug: citySlug,
      label: cityLabel,
      search: buildSearchText(cityLabel, citySlug),
    };
  });
  outProvinces.push({
    code: p.code,
    adcode,
    slug,
    label: name,
    search: buildSearchText(name, slug),
    cities,
  });
}

function pushSpecial(label, slug, cityLabels) {
  const adcode = Object.keys(adcodeSlug).find((k) => adcodeSlug[k] === slug) ?? "";
  const cities = cityLabels.map((cityLabel) => {
    const base = citySlugFromLabel(cityLabel);
    const citySlug = uniqueCitySlug(base || slugify(label));
    return {
      slug: citySlug,
      label: cityLabel,
      search: buildSearchText(cityLabel, citySlug),
    };
  });
  outProvinces.push({
    code: adcode.slice(0, 2) || slug.slice(0, 2),
    adcode,
    slug,
    label,
    search: buildSearchText(label, slug),
    cities,
  });
}

const hkCities = Object.keys(hkmo["香港特别行政区"] ?? {});
const moCities = Object.keys(hkmo["澳门特别行政区"] ?? {});
const twCities = Object.keys(hkmo["台湾省"] ?? {});

pushSpecial("香港特别行政区", "xianggang", hkCities.length ? hkCities : ["香港特别行政区"]);
pushSpecial("澳门特别行政区", "aomen", moCities.length ? moCities : ["澳门特别行政区"]);
pushSpecial("台湾省", "taiwan", twCities);

outProvinces.sort((a, b) => String(a.adcode).localeCompare(String(b.adcode)));

const dest = path.join(root, "lib/data/areas.json");
fs.writeFileSync(dest, JSON.stringify({ provinces: outProvinces }, null, 0), "utf8");
console.log("Wrote", dest, "provinces", outProvinces.length, "bytes", fs.statSync(dest).size);
