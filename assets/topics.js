/* ────────────────────────────────────────────────────────────────
   THE ONLY FILE YOU EDIT WHEN YOU ADD A TOPIC.
   Append one line to the array below. index, navbar, and prev/next
   all read from here, so every page updates at once.

   slug   = the .html filename WITHOUT extension (NN-topic-name)
   day    = the deep-dive day number (drives ordering + labels)
   title  = display name
   blurb  = one sentence; used for the index cards AND as the page's
            meta description / social-card text. Keep it under ~160
            characters and avoid double quotes.

   After editing, run `node tools/sync-meta.js` to push the titles and
   blurbs into each page's <head>. Social crawlers don't run JS, so
   those tags have to be baked into the HTML, not injected at runtime.
   ──────────────────────────────────────────────────────────────── */
window.SITE = {
  name: "Byte-Size System Design",
  base: "https://eplisoncygni.github.io/byte-size-system-design",
  tagline: "One surprise topic a day — data structures, storage internals, and distributed-systems primitives.",
  repo: "https://github.com/eplisoncygni/byte-size-system-design",
  author: "Nirajan Kharal",
  license: "MIT",
  since: 2026,
};

window.TOPICS = [
  { day: 1, slug: "01-consistent-hashing",  title: "Consistent Hashing",
    blurb: "How distributed systems decide which server owns which data — without reshuffling everything when a server joins or leaves." },
  { day: 2, slug: "02-bloom-filters",       title: "Bloom Filters",
    blurb: "A tiny bit array that tells you something is definitely absent, or probably present — using a fraction of the memory of storing the items." },
  { day: 3, slug: "03-merkle-trees",        title: "Merkle Trees",
    blurb: "A tree of hashes that lets one small value verify a whole dataset — and lets two copies find their differences without shipping everything." },
  { day: 4, slug: "04-write-ahead-logging", title: "Write-Ahead Logging",
    blurb: "How a database survives losing power mid-write: describe every change in an append-only log before touching the real data." },
  { day: 5, slug: "05-lsm-trees",           title: "LSM Trees",
    blurb: "The write-optimized engine inside Cassandra, RocksDB, and LevelDB — every write an append, with sorted files and background merges keeping reads viable." },
  { day: 6, slug: "06-union-find",          title: "Union-Find",
    blurb: "A tiny structure that merges any two groups in one pointer change and answers same-group queries in effectively constant time." },
  { day: 7, slug: "07-raft-consensus",      title: "Raft Consensus",
    blurb: "How servers agree on one ordered log through crashes and network splits — by electing a temporary leader and committing only what a majority stores." },
  { day: 8, slug: "08-skip-lists",          title: "Skip Lists",
    blurb: "A stack of sorted linked lists where each level is a sparser express lane — balanced-tree speed from coin flips instead of rotations." },
  { day: 9, slug: "09-hyperloglog",         title: "HyperLogLog",
    blurb: "Count distinct items in a billions-strong stream with about 12 KB of memory: the rarest bit pattern you have seen tells you how much you have seen." },
  { day: 10, slug: "10-count-min-sketch",   title: "Count-Min Sketch",
    blurb: "Estimate how often each item appears in an endless stream from a tiny fixed grid of counters — collisions can only inflate a count, so it never under-reports." },
];
