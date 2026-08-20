/* ── Renders the shared navbar on each deep-dive page. ──
   Auto-detects the current page from its filename and looks it up in
   window.TOPICS (topics.js). Nothing to configure per page.

   Requires: <script src="topics.js"></script> loaded BEFORE this file. */
(function () {
  var topics = window.TOPICS || [];

  // current filename, e.g. "05-lsm-trees.html" -> "05-lsm-trees"
  var file = (location.pathname.split("/").pop() || "").replace(/\.html$/i, "");
  var idx = topics.findIndex(function (t) { return t.slug === file; });
  if (idx === -1) return; // not a topic page (e.g. index) — skip

  var cur = topics[idx];
  var prev = topics[idx - 1] || null;
  var next = topics[idx + 1] || null;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function seqLink(t, label, dir) {
    if (!t) {
      return '<a aria-disabled="true" aria-label="No ' + dir +
             ' topic">' + label + "</a>";
    }
    return '<a href="' + esc(t.slug) + '.html" title="' + esc(t.title) +
           '">' + label + "</a>";
  }

  var nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Deep-dive navigation");
  nav.innerHTML =
    '<div class="site-nav__inner">' +
      '<a class="site-nav__home" href="index.html">\u2190 All topics</a>' +
      '<span class="site-nav__here">Day ' + cur.day +
        ' \u00b7 <b>' + esc(cur.title) + "</b></span>" +
      '<span class="site-nav__seq">' +
        seqLink(prev, "\u2190 Prev", "previous") +
        seqLink(next, "Next \u2192", "next") +
      "</span>" +
    "</div>";

  document.body.insertBefore(nav, document.body.firstChild);

  /* ── Arrow-key paging ──
     The docs are read in order, so left/right walk the series. Ignored
     while typing, when a modifier is held (so browser/OS shortcuts such
     as alt+arrow for history still work), and at the ends of the run. */
  function isTyping(el) {
    if (!el) return false;
    if (el.isContentEditable) return true;
    return /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
  }

  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (isTyping(e.target)) return;

    var to = e.key === "ArrowLeft" ? prev : e.key === "ArrowRight" ? next : null;
    if (!to) return;

    e.preventDefault();
    location.href = to.slug + ".html";
  });
})();
