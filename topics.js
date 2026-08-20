/* ────────────────────────────────────────────────────────────────
   THE ONLY FILE YOU EDIT WHEN YOU ADD A TOPIC.
   Append one line to the array below. index, navbar, and prev/next
   all read from here, so every page updates at once.

   slug   = the .html filename WITHOUT extension (NN-topic-name)
   day    = the deep-dive day number (drives ordering + labels)
   title  = display name
   ──────────────────────────────────────────────────────────────── */
window.TOPICS = [
  { day: 1, slug: "01-consistent-hashing",  title: "Consistent Hashing" },
  { day: 2, slug: "02-bloom-filters",       title: "Bloom Filters" },
  { day: 3, slug: "03-merkle-trees",        title: "Merkle Trees" },
  { day: 4, slug: "04-write-ahead-logging", title: "Write-Ahead Logging" },
  { day: 5, slug: "05-lsm-trees",           title: "LSM Trees" },
  { day: 6, slug: "06-union-find",          title: "Union-Find" },
  { day: 7, slug: "07-raft-consensus",      title: "Raft Consensus" },
  { day: 8, slug: "08-skip-lists",          title: "Skip Lists" },
  { day: 9, slug: "09-hyperloglog",         title: "HyperLogLog" },
];
