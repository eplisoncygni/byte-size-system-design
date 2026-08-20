# Daily Deep-Dives — site

Static site for GitHub Pages. Every page shares one navbar + prev/next,
driven by a single data file.

## Structure
    index.html          hub / landing page (renders itself from topics.js)
    NN-topic.html       the deep-dive docs (stay at root)
    assets/
      base.css          shared styles for every doc (restyle all pages here)
      nav.css           styles for navbar + index
      nav.js            renders the sticky navbar (auto-detects the page)
      topics.js         the ONLY file you edit to add/rename/reorder topics
      favicon.svg       the ring mark, used as the tab icon
      og/*.png          1200x630 social cards, one per page (generated)
    tools/
      og-card.html      the social-card template Chrome screenshots
      build-og.js       renders assets/og/*.png from topics.js
      sync-meta.js      bakes titles + meta/OG tags into every page

Docs stay at the root and link assets with a *relative* path
(`assets/…`), never a root-absolute one (`/assets/…`) — relative paths
work on both project pages (user.github.io/repo/) and user/custom-domain
pages, absolute ones break on project pages.

## Add a new topic (4 steps)
1. Save the doc as `NN-topic-name.html` (zero-padded day number).
2. Add one entry to the array in `assets/topics.js` — `day`, `slug`,
   `title`, and a one-sentence `blurb` (under ~160 characters).
3. Paste the snippet below into the new doc.
4. Run the two generators:

       node tools/build-og.js    # renders the social card
       node tools/sync-meta.js   # writes <title> + meta tags into the HTML

That's it — the index, the navbar, and prev/next on every page update
automatically. You never touch the older docs.

### Why steps 2 and 4 are separate
`topics.js` is the single source of truth, but social crawlers
(Twitter, LinkedIn, Slack, Facebook) don't run JavaScript — so the
description and Open Graph tags have to be *in* the served HTML, not
injected at runtime. `sync-meta.js` copies them from `topics.js` into
each page's `<head>`, between the `meta:start` / `meta:end` markers.
Everything inside those markers is generated; edit `topics.js` instead.

`node tools/sync-meta.js --check` exits non-zero if any page is stale,
which makes it a usable pre-commit or CI check. `build-og.js` needs
Chrome installed, but only at build time — the site ships finished PNGs.

## Snippet to paste into each doc
Put these lines just before `</head>` (replace the doc's own base styles;
keep only page-specific rules — diagrams, one-off cards — in the inline
`<style>`):

    <link rel="stylesheet" href="assets/base.css">
    <link rel="stylesheet" href="assets/nav.css">

Put these two lines just before `</body>` (order matters — topics first):

    <script src="assets/topics.js"></script>
    <script src="assets/nav.js"></script>

Diagrams go in a `<figure>` and need a `viewBox` — `base.css` scales
anything matching `figure svg` down to the column width, which is what
keeps them from overflowing on phones.

## Current topics
All docs below are renamed, registered in `assets/topics.js`, and wired
to the shared assets:
- Day 1 — Consistent Hashing    01-consistent-hashing.html
- Day 2 — Bloom Filters         02-bloom-filters.html
- Day 3 — Merkle Trees          03-merkle-trees.html
- Day 4 — Write-Ahead Logging   04-write-ahead-logging.html
- Day 5 — LSM Trees             05-lsm-trees.html
- Day 6 — Union-Find            06-union-find.html
- Day 7 — Raft Consensus        07-raft-consensus.html
- Day 8 — Skip Lists            08-skip-lists.html
- Day 9 — HyperLogLog           09-hyperloglog.html

## Preview locally
    python3 -m http.server 8765

Then open <http://localhost:8765>. Hard-reload after editing CSS or JS —
browsers cache both aggressively on localhost.

## Deploy
Push to a repo, then Settings -> Pages -> deploy from branch (root).
`index.html` becomes the site root.

Live at <https://eplisoncygni.github.io/byte-size-system-design/>. That
URL is also `SITE.base` in `assets/topics.js`, where the canonical and
Open Graph tags get it from — change it there if the site ever moves.
