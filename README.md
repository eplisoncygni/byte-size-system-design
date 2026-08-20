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

Docs stay at the root and link assets with a *relative* path
(`assets/…`), never a root-absolute one (`/assets/…`) — relative paths
work on both project pages (user.github.io/repo/) and user/custom-domain
pages, absolute ones break on project pages.

## Add a new topic (3 steps)
1. Save the doc as `NN-topic-name.html` (zero-padded day number).
2. Add one line to the array in `topics.js`.
3. Paste the snippet below into the new doc.

That's it — the index, the navbar, and prev/next on every page update
automatically. You never touch the older docs.

## Snippet to paste into each doc
Put these lines just before `</head>` (replace the doc's own base styles;
keep only page-specific rules — diagrams, one-off cards — in the inline
`<style>`):

    <link rel="stylesheet" href="assets/base.css">
    <link rel="stylesheet" href="assets/nav.css">

Put these two lines just before `</body>` (order matters — topics first):

    <script src="assets/topics.js"></script>
    <script src="assets/nav.js"></script>

## Still to convert
These docs weren't in the project folder, so they still need renaming +
the snippet above:
- Day 6 — Union-Find      -> 06-union-find.html
- Day 7 — Raft Consensus  -> 07-raft-consensus.html
- Day 9 — HyperLogLog     -> 09-hyperloglog.html

## Deploy
Push to a repo, then Settings -> Pages -> deploy from branch (root).
`index.html` becomes the site root.
