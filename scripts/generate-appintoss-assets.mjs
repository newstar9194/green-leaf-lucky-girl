import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(
  "/Users/chaewon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/",
);
const sharp = require("sharp");

const outDir = path.resolve("appintoss-assets");

const keywords = [
  "토마토",
  "운세",
  "오늘의 운세",
  "행운",
  "럭키",
  "네잎클로버",
  "클로버",
  "귀여운 게임",
  "캐주얼 게임",
  "미니게임",
  "앱인토스",
  "럭키 토마토",
  "멋쟁이 토마토",
  "소소한 행운",
  "개큰 행운",
  "운세 게임",
  "힐링 게임",
  "수집 게임",
  "토스 게임",
  "심심할 때",
].join(", ");

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tomato({ x, y, s = 1, wink = false, sunglasses = true, lucky = false }) {
  const g = [];
  g.push(`<g transform="translate(${x} ${y}) scale(${s})">`);
  g.push(`<ellipse cx="0" cy="20" rx="116" ry="108" fill="#f24c3f"/>`);
  g.push(`<ellipse cx="-34" cy="-18" rx="58" ry="52" fill="#ff6658" opacity=".75"/>`);
  g.push(`<ellipse cx="38" cy="56" rx="55" ry="36" fill="#d92f2d" opacity=".35"/>`);
  g.push(`<path d="M-40-76 C-54-122-14-119 0-84 C12-124 58-118 36-74 C75-99 99-56 44-48 C79-27 56 10 18-36 C3 18-34 8-18-38 C-66 3-91-32-45-50 C-98-60-82-104-40-76Z" fill="#238a4a"/>`);
  g.push(`<path d="M-3-85 C8-128 48-146 72-126" fill="none" stroke="#1c7b41" stroke-width="13" stroke-linecap="round"/>`);
  if (sunglasses) {
    g.push(`<path d="M-88 2 C-58-10-25-8 0 2 C25-8 58-10 88 2" fill="none" stroke="#303841" stroke-width="12" stroke-linecap="round"/>`);
    g.push(`<rect x="-89" y="-12" width="72" height="52" rx="18" fill="#23272f"/>`);
    g.push(`<rect x="17" y="-12" width="72" height="52" rx="18" fill="#23272f"/>`);
    g.push(`<path d="M-70 2 L-36 27" stroke="#6ee7d8" stroke-width="8" stroke-linecap="round" opacity=".72"/>`);
    g.push(`<path d="M34 2 L68 27" stroke="#6ee7d8" stroke-width="8" stroke-linecap="round" opacity=".72"/>`);
  } else {
    g.push(`<circle cx="-42" cy="8" r="11" fill="#322b28"/>`);
    if (wink) {
      g.push(`<path d="M38 9 Q55 21 72 9" fill="none" stroke="#322b28" stroke-width="9" stroke-linecap="round"/>`);
    } else {
      g.push(`<circle cx="48" cy="8" r="11" fill="#322b28"/>`);
    }
  }
  g.push(`<path d="M-35 65 Q0 91 39 65" fill="none" stroke="#fff1de" stroke-width="12" stroke-linecap="round"/>`);
  g.push(`<circle cx="-70" cy="48" r="17" fill="#ff9f98" opacity=".8"/>`);
  g.push(`<circle cx="75" cy="48" r="17" fill="#ff9f98" opacity=".8"/>`);
  if (lucky) {
    g.push(`<g transform="translate(80 -88) rotate(14) scale(.75)">${cloverPath("#25b85a")}</g>`);
  }
  g.push(`</g>`);
  return g.join("");
}

function cloverPath(fill = "#22a957") {
  return `<g fill="${fill}">
    <circle cx="-20" cy="-18" r="25"/><circle cx="20" cy="-18" r="25"/>
    <circle cx="-20" cy="18" r="25"/><circle cx="20" cy="18" r="25"/>
    <path d="M0 24 C12 58 20 81 43 101" fill="none" stroke="${fill}" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}

function sparkle(x, y, r = 18, fill = "#ffe873") {
  return `<path d="M${x} ${y - r} L${x + r * 0.25} ${y - r * 0.25} L${x + r} ${y} L${x + r * 0.25} ${y + r * 0.25} L${x} ${y + r} L${x - r * 0.25} ${y + r * 0.25} L${x - r} ${y} L${x - r * 0.25} ${y - r * 0.25}Z" fill="${fill}"/>`;
}

function bg(w, h, dark = false) {
  const start = dark ? "#13251f" : "#d8ffd8";
  const mid = dark ? "#183d33" : "#94e4b1";
  const end = dark ? "#331d24" : "#ffd1bd";
  const cloud = dark ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.62)";
  return `
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${start}"/><stop offset=".58" stop-color="${mid}"/><stop offset="1" stop-color="${end}"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#fff4a5"/><stop offset="1" stop-color="#ffbd4a"/></linearGradient>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#17412d" flood-opacity=".22"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="${w * 0.15}" cy="${h * 0.14}" r="${Math.min(w, h) * 0.13}" fill="${cloud}"/>
  <circle cx="${w * 0.86}" cy="${h * 0.18}" r="${Math.min(w, h) * 0.1}" fill="${cloud}"/>
  <circle cx="${w * 0.74}" cy="${h * 0.86}" r="${Math.min(w, h) * 0.12}" fill="${cloud}"/>`;
}

function textBlock(lines, x, y, opts = {}) {
  const {
    size = 52,
    weight = 900,
    fill = "#223d34",
    anchor = "middle",
    gap = 1.2,
    family = "Apple SD Gothic Neo, Malgun Gothic, sans-serif",
  } = opts;
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${esc(family)}" font-size="${size}" font-weight="${weight}" fill="${fill}">
    ${lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * gap}">${esc(line)}</tspan>`).join("")}
  </text>`;
}

function logoSvg({ dark = false } = {}) {
  const fg = dark ? "#fff8dc" : "#234338";
  const sub = dark ? "#aef2c7" : "#2d7a53";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    ${bg(600, 600, dark)}
    ${sparkle(120, 130, 26)}
    ${sparkle(492, 174, 20, dark ? "#d9fff0" : "#fff6a7")}
    <g filter="url(#softShadow)">${tomato({ x: 300, y: 262, s: 1.32, sunglasses: true, lucky: true })}</g>
    <g transform="translate(112 418)">${cloverPath(dark ? "#48e27b" : "#1faf56")}</g>
    ${textBlock(["멋쟁이", "럭키 토마토"], 300, 455, { size: 44, fill: fg })}
    ${textBlock(["오늘의 운세"], 300, 555, { size: 24, fill: sub, weight: 850 })}
  </svg>`;
}

function thumbnailSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1932" height="828" viewBox="0 0 1932 828">
    ${bg(1932, 828)}
    <g opacity=".25">${Array.from({ length: 11 }, (_, i) => `<g transform="translate(${140 + i * 172} ${120 + (i % 3) * 200}) scale(${0.62 + (i % 2) * 0.25}) rotate(${i * 17})">${cloverPath("#1db85d")}</g>`).join("")}</g>
    <g filter="url(#softShadow)">${tomato({ x: 1382, y: 390, s: 2.15, sunglasses: true, lucky: true })}</g>
    ${sparkle(1570, 112, 48)}
    ${sparkle(1160, 642, 34, "#ffffff")}
    ${textBlock(["멋쟁이 럭키", "토마토 게임"], 150, 210, { anchor: "start", size: 112, fill: "#223d34", gap: 1.08 })}
    ${textBlock(["귀여운 토마토가 오늘의 운세를 알려줘요!"], 154, 500, { anchor: "start", size: 44, fill: "#2f654b", weight: 850 })}
    <g transform="translate(154 586)">
      <rect width="690" height="92" rx="46" fill="#fff7c6" stroke="#ffffff" stroke-width="6"/>
      ${textBlock(["네잎클로버는 소소한 행운, 멋쟁이 토마토는 개큰 행운!"], 345, 59, { size: 34, fill: "#a53a2e", weight: 900 })}
    </g>
  </svg>`;
}

function phoneFrame(inner, title = "멋쟁이 럭키 토마토") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="636" height="1048" viewBox="0 0 636 1048">
    ${bg(636, 1048)}
    <rect x="32" y="36" width="572" height="976" rx="52" fill="#f9fff4" stroke="#ffffff" stroke-width="8" filter="url(#softShadow)"/>
    <rect x="54" y="72" width="528" height="902" rx="34" fill="#c8f2cb"/>
    <rect x="78" y="102" width="480" height="70" rx="22" fill="rgba(255,255,255,.65)"/>
    ${textBlock([title], 318, 149, { size: 30, fill: "#24513b" })}
    ${inner}
  </svg>`;
}

function screenshotHomeSvg() {
  const inner = `
    <g opacity=".55">${Array.from({ length: 14 }, (_, i) => `<g transform="translate(${92 + (i % 4) * 135} ${230 + Math.floor(i / 4) * 135}) scale(.32) rotate(${i * 31})">${cloverPath("#28ad59")}</g>`).join("")}</g>
    <g filter="url(#softShadow)">${tomato({ x: 318, y: 420, s: 1.28, sunglasses: true, lucky: true })}</g>
    ${textBlock(["오늘의 운세를", "토마토에게 물어봐!"], 318, 645, { size: 42, fill: "#243f35", gap: 1.22 })}
    <rect x="138" y="784" width="360" height="82" rx="41" fill="#fff6b7" stroke="#fff" stroke-width="5"/>
    ${textBlock(["시작"], 318, 838, { size: 34, fill: "#9b3a30" })}
  `;
  return phoneFrame(inner);
}

function screenshotCloverSvg() {
  const leaves = Array.from({ length: 18 }, (_, i) => {
    const x = 86 + (i % 5) * 108 + (i % 2) * 20;
    const y = 210 + Math.floor(i / 5) * 132;
    return `<g transform="translate(${x} ${y}) scale(${i === 7 ? .68 : .38}) rotate(${i * 29})">${cloverPath(i === 7 ? "#16bd52" : "#52c66d")}</g>`;
  }).join("");
  const inner = `
    <rect x="76" y="196" width="146" height="72" rx="18" fill="rgba(255,255,255,.68)"/>
    <rect x="246" y="196" width="146" height="72" rx="18" fill="rgba(255,255,255,.68)"/>
    <rect x="416" y="196" width="118" height="72" rx="18" fill="#fff0a3"/>
    ${textBlock(["행운 77"], 149, 242, { size: 24, fill: "#246548" })}
    ${textBlock(["최고 128"], 319, 242, { size: 24, fill: "#246548" })}
    ${textBlock(["럭키!"], 475, 242, { size: 24, fill: "#9a6900" })}
    ${leaves}
    <g filter="url(#softShadow)">${tomato({ x: 318, y: 735, s: .9, sunglasses: false, wink: true })}</g>
    <path d="M130 850 Q318 908 506 850" fill="none" stroke="#4db96d" stroke-width="18" stroke-linecap="round"/>
    ${textBlock(["네잎클로버 발견!"], 318, 942, { size: 34, fill: "#1e7448" })}
  `;
  return phoneFrame(inner, "소소한 행운 모으기");
}

function screenshotFortuneSvg() {
  const inner = `
    <g filter="url(#softShadow)">${tomato({ x: 318, y: 315, s: 1.02, sunglasses: true, lucky: true })}</g>
    <rect x="92" y="494" width="452" height="318" rx="34" fill="#fffbe4" stroke="#ffffff" stroke-width="6"/>
    ${textBlock(["럭키777 토마토 운세"], 318, 560, { size: 28, fill: "#bd3b2f" })}
    <g transform="translate(152 610)">
      <rect width="142" height="142" rx="28" fill="#ffd9ce" stroke="#ffffff" stroke-width="5"/>
      ${textBlock(["토마토"], 71, 88, { size: 28, fill: "#a6362d" })}
    </g>
    <g transform="translate(342 610)">
      <rect width="142" height="142" rx="28" fill="#e2ffd8" stroke="#ffffff" stroke-width="5"/>
      ${textBlock(["클로버"], 71, 88, { size: 28, fill: "#217447" })}
    </g>
    ${textBlock(["멋쟁이 토마토를 찾으면", "개큰 행운이 와요!"], 318, 856, { size: 31, fill: "#263f35", gap: 1.25 })}
    ${sparkle(500, 340, 28)}
    ${sparkle(116, 404, 22, "#ffffff")}
  `;
  return phoneFrame(inner, "오늘의 운세");
}

async function render(name, svg) {
  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, name));
}

await mkdir(outDir, { recursive: true });
await Promise.all([
  render("app-logo-600.png", logoSvg()),
  render("app-logo-dark-600.png", logoSvg({ dark: true })),
  render("thumbnail-1932x828.png", thumbnailSvg()),
  render("screenshot-1-start-636x1048.png", screenshotHomeSvg()),
  render("screenshot-2-clover-636x1048.png", screenshotCloverSvg()),
  render("screenshot-3-fortune-636x1048.png", screenshotFortuneSvg()),
  writeFile(path.join(outDir, "keywords.txt"), `${keywords}\n`, "utf8"),
]);

console.log(`Wrote App in Toss assets to ${outDir}`);
