#!/usr/bin/env node
/* Renders one 1200x630 social card per topic (plus the index) into
   assets/og/<slug>.png, using tools/og-card.html + headless Chrome.

   Run after editing titles/blurbs in assets/topics.js:
       node tools/build-og.js

   Chrome is only needed here, at build time - the site itself ships the
   finished PNGs and has no dependency on it. */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "assets", "og");
const TEMPLATE = path.join(__dirname, "og-card.html");

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error("No Chrome/Chromium found. Install Chrome, or hand-place PNGs in assets/og/.");
  process.exit(1);
}

global.window = {};
require(path.join(ROOT, "assets", "topics.js"));
const { TOPICS, SITE } = global.window;

fs.mkdirSync(OUT_DIR, { recursive: true });

function render(slug, params) {
  const url =
    "file://" + TEMPLATE + "?" +
    Object.entries(params)
      .map(([k, v]) => k + "=" + encodeURIComponent(v))
      .join("&");
  const out = path.join(OUT_DIR, slug + ".png");
  execFileSync(chrome, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--virtual-time-budget=6000",
    "--screenshot=" + out,
    url,
  ], { stdio: ["ignore", "ignore", "pipe"] });
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`  ${slug}.png  ${kb} KB`);
}

console.log(`Rendering ${TOPICS.length + 1} cards with ${path.basename(chrome)}:`);
render("index", {
  kicker: "Byte-Size System Design",
  title: "Daily deep-dives",
  blurb: SITE.tagline,
  mark: SITE.base.replace(/^https?:\/\//, ""),
});
for (const t of TOPICS) {
  render(t.slug, {
    kicker: `Day ${t.day} · ${SITE.name}`,
    title: t.title,
    blurb: t.blurb,
    mark: `Day ${t.day}`,
  });
}
console.log("Done. Now run: node tools/sync-meta.js");
