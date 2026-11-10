// Kaliper: minimal interactions
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  // Header background on scroll
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.section-head, .approach-body, .who, .sector, .service-row, .difference-lead, .diff, .founder-body, .contact-inner');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
})();

/* ---- R&D experience directory ----
   The organization list is written into index.html so it can be read without
   JavaScript. This script only counts, filters and searches that list. To add
   or remove an organization, edit the list in index.html. */
(function () {
  var results = document.getElementById('expResults');
  if (!results) return;

  var groups = [].slice.call(results.querySelectorAll('.exp-group')).map(function (g) {
    return {
      el: g,
      cat: g.getAttribute('data-cat'),
      label: g.querySelector('h4').firstChild.textContent,
      gc: g.querySelector('.gc'),
      items: [].slice.call(g.querySelectorAll('li')).map(function (li) {
        var loc = li.querySelector('.loc');
        return { el: li, n: li.querySelector('span').textContent.toLowerCase(), l: loc ? loc.textContent.toLowerCase() : '' };
      })
    };
  });

  var esc = function (s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };

  // live counts so the UI always matches the list
  var counts = {}, total = 0;
  groups.forEach(function (g) { counts[g.cat] = g.items.length; total += g.items.length; });
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  setText("expTotal", total);
  setText("expTotalBtn", total);
  setText("expNPharma", counts.Pharma);
  setText("expNBiotech", counts.Biotech);
  setText("expNAcademic", counts.Academic);
  var filtersEl = document.getElementById("expFilters");
  filtersEl.querySelectorAll(".exp-filter").forEach(function (b) {
    var cat = b.getAttribute("data-cat");
    var c = b.querySelector(".c");
    if (c) c.textContent = (cat === "all") ? total : (counts[cat] || 0);
  });

  var activeCat = "all", query = "";
  var empty = document.getElementById("expEmpty");
  var countLine = document.getElementById("expCount");

  function render() {
    var q = query.trim().toLowerCase(), matched = 0, scope = "all categories";
    groups.forEach(function (g) {
      var inCat = activeCat === "all" || g.cat === activeCat, shown = 0;
      if (g.cat === activeCat) scope = g.label;
      g.items.forEach(function (o) {
        var show = inCat && (q === "" || o.n.indexOf(q) > -1 || o.l.indexOf(q) > -1);
        o.el.hidden = !show;
        if (show) shown++;
      });
      g.el.hidden = !shown;
      g.gc.textContent = shown;
      matched += shown;
    });
    empty.style.display = matched ? "none" : "block";
    countLine.innerHTML = 'Showing <b>' + matched + '</b> of <b>' + total + '</b> organizations' +
      (q ? ' matching "' + esc(query.trim()) + '"' : ' · ' + scope);
  }

  filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest(".exp-filter"); if (!b) return;
    activeCat = b.getAttribute("data-cat");
    filtersEl.querySelectorAll(".exp-filter").forEach(function (f) {
      f.setAttribute("aria-pressed", f === b ? "true" : "false");
    });
    render();
  });
  document.getElementById("expQ").addEventListener("input", function (e) { query = e.target.value; render(); });
  render();
})();
