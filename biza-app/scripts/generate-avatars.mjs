import fs from "fs";
import path from "path";

const avatars = {
  lion: { bg: "#1A3A2A", accent: "#F5C842", glyph: "L" },
  leopard: { bg: "#2E6644", accent: "#F4F1E8", glyph: "Lp" },
  eagle: { bg: "#1A3A2A", accent: "#F5C842", glyph: "E" },
  elephant: { bg: "#2E6644", accent: "#F4F1E8", glyph: "El" },
  zebra: { bg: "#F4F1E8", accent: "#1A1A1A", glyph: "Z" },
  compass: { bg: "#1A3A2A", accent: "#F5C842", glyph: "C" },
  flame: { bg: "#F5C842", accent: "#1A3A2A", glyph: "F" },
  mountain: { bg: "#2E6644", accent: "#F5C842", glyph: "M" },
  crown: { bg: "#F5C842", accent: "#1A3A2A", glyph: "Cr" },
  rocket: { bg: "#1A3A2A", accent: "#F5C842", glyph: "R" },
};

const dir = path.join("public", "avatars");
fs.mkdirSync(dir, { recursive: true });

for (const [id, c] of Object.entries(avatars)) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="${id}">` +
    `<circle cx="24" cy="24" r="24" fill="${c.bg}"/>` +
    `<circle cx="24" cy="20" r="10" fill="${c.accent}" opacity="0.9"/>` +
    `<text x="24" y="26" text-anchor="middle" font-size="10" font-weight="700" font-family="system-ui,sans-serif" fill="${c.bg}">${c.glyph}</text>` +
    `</svg>`;
  fs.writeFileSync(path.join(dir, `${id}.svg`), svg);
}

console.log(`Created ${Object.keys(avatars).length} avatar SVGs in ${dir}`);
