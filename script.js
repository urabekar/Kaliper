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

/* ---- R&D experience directory ---- */
(function () {
  var results = document.getElementById('expResults');
  if (!results) return;

  var ORGS = [
    {n:"AbbVie",c:"Pharma"},{n:"Amgen",c:"Pharma"},{n:"Astellas",c:"Pharma"},
    {n:"AstraZeneca",c:"Pharma"},{n:"Bayer",c:"Pharma"},{n:"Biogen",c:"Pharma"},
    {n:"Bristol Myers Squibb",c:"Pharma"},{n:"Eli Lilly",c:"Pharma"},{n:"EMD Serono",c:"Pharma"},
    {n:"GSK",c:"Pharma"},{n:"Hengrui",c:"Pharma"},{n:"Johnson & Johnson",c:"Pharma"},
    {n:"Merck & Co.",c:"Pharma"},{n:"Mitsubishi Tanabe Pharma",c:"Pharma"},{n:"Moderna",c:"Pharma"},
    {n:"Novo Nordisk",c:"Pharma"},{n:"Pfizer",c:"Pharma"},{n:"Roche",c:"Pharma"},{n:"Sanofi",c:"Pharma"},
    {n:"Simcere",c:"Pharma"},{n:"Takeda",c:"Pharma"},{n:"Vertex",c:"Pharma"},
    {n:"CRISPR Therapeutics",c:"Biotech"},{n:"Editas Medicine",c:"Biotech"},{n:"Beam Therapeutics",c:"Biotech"},
    {n:"Prime Medicine",c:"Biotech"},{n:"EdiGene",c:"Biotech"},{n:"BlueRock Therapeutics",c:"Biotech"},
    {n:"Sana Biotechnology",c:"Biotech"},{n:"Scorpion Therapeutics",c:"Biotech"},{n:"Odyssey Therapeutics",c:"Biotech"},
    {n:"Sherlock Biosciences",c:"Biotech"},{n:"Clade Therapeutics",c:"Biotech"},{n:"Sensei Biotherapeutics",c:"Biotech"},
    {n:"Solid Biosciences",c:"Biotech"},{n:"TCR2 Therapeutics",c:"Biotech"},{n:"Gritstone bio",c:"Biotech"},
    {n:"Cue Biopharma",c:"Biotech"},{n:"Entrada Therapeutics",c:"Biotech"},{n:"Xsphera Biosciences",c:"Biotech"},
    {n:"Verge Genomics",c:"Biotech"},{n:"Parvus Therapeutics",c:"Biotech"},{n:"Jnana Therapeutics",c:"Biotech"},
    {n:"Kronos Bio",c:"Biotech"},{n:"Kintai Therapeutics",c:"Biotech"},{n:"Kernal Biologics",c:"Biotech"},
    {n:"Oncorus",c:"Biotech"},{n:"Yumanity Therapeutics",c:"Biotech"},{n:"Finch Therapeutics",c:"Biotech"},
    {n:"Cyclerion Therapeutics",c:"Biotech"},{n:"Day Zero Diagnostics",c:"Biotech"},{n:"Monte Rosa Therapeutics",c:"Biotech"},
    {n:"Seres Therapeutics",c:"Biotech"},{n:"ORNA Therapeutics",c:"Biotech"},{n:"NextRNA Therapeutics",c:"Biotech"},
    {n:"Guardian Therapeutics",c:"Biotech"},{n:"Atalanta Therapeutics",c:"Biotech"},{n:"Ascidian Therapeutics",c:"Biotech"},
    {n:"Alloplex Biotherapeutics",c:"Biotech"},{n:"HelixNano",c:"Biotech"},{n:"ACTnano",c:"Biotech"},
    {n:"Inkbit",c:"Biotech"},{n:"Igenomix",c:"Biotech"},{n:"Radius Health",c:"Biotech"},
    {n:"C4 Therapeutics",c:"Biotech"},{n:"Cellaria",c:"Biotech"},{n:"CELLINK",c:"Biotech"},
    {n:"Imagen Biopharma",c:"Biotech"},{n:"WaveGuide",c:"Biotech"},{n:"Intergalactic",c:"Biotech"},
    {n:"Alector",c:"Biotech"},{n:"ArsenalBio",c:"Biotech"},{n:"Senti Biosciences",c:"Biotech"},
    {n:"Mammoth Biosciences",c:"Biotech"},{n:"Vor Biopharma",c:"Biotech"},{n:"Obsidian Therapeutics",c:"Biotech"},
    {n:"Affinivax",c:"Biotech"},{n:"Ginkgo Bioworks",c:"Biotech"},{n:"Korro Bio",c:"Biotech"},
    {n:"Tango Therapeutics",c:"Biotech"},{n:"Arrakis Therapeutics",c:"Biotech"},{n:"Tessera Therapeutics",c:"Biotech"},
    {n:"Generation Bio",c:"Biotech"},{n:"Be Biopharma",c:"Biotech"},{n:"Verve Therapeutics",c:"Biotech"},
    {n:"Aktis Oncology",c:"Biotech"},{n:"Mariana Oncology",c:"Biotech"},{n:"Compass Therapeutics",c:"Biotech"},
    {n:"Pandion Therapeutics",c:"Biotech"},{n:"Montai Therapeutics",c:"Biotech"},{n:"Cellarity",c:"Biotech"},
    {n:"Generate Biomedicines",c:"Biotech"},{n:"Allogene Therapeutics",c:"Biotech"},{n:"Graphite Bio",c:"Biotech"},
    {n:"Nkarta Therapeutics",c:"Biotech"},{n:"Metagenomi",c:"Biotech"},{n:"Zymergen",c:"Biotech"},
    {n:"Eikon Therapeutics",c:"Biotech"},{n:"Noetik",c:"Biotech"},
    {n:"Charles River Laboratories",c:"Service"},{n:"Thermo Fisher",c:"Service"},{n:"Sartorius",c:"Service"},
    {n:"Nikon Instruments",c:"Service"},{n:"VWR",c:"Service"},{n:"Millipore (MilliporeSigma)",c:"Service"},
    {n:"EMD Chemicals",c:"Service"},{n:"New England Biolabs",c:"Service"},{n:"AmbioPharm",c:"Service"},
    {n:"GL Biochem",c:"Service"},
    {n:"University of Oxford",c:"Academic",l:"UK"},{n:"University of Cambridge",c:"Academic",l:"UK"},
    {n:"University College London (UCL)",c:"Academic",l:"UK"},{n:"Francis Crick Institute",c:"Academic",l:"UK"},
    {n:"MRC Laboratory of Molecular Biology",c:"Academic",l:"UK"},{n:"Heidelberg University",c:"Academic",l:"Germany"},
    {n:"University of Zurich",c:"Academic",l:"Switzerland"},{n:"Institut Pasteur",c:"Academic",l:"France"},
    {n:"University of Barcelona",c:"Academic",l:"Spain"},{n:"McGill University",c:"Academic",l:"Canada"},
    {n:"A*STAR",c:"Academic",l:"Singapore"},{n:"Harvard University",c:"Academic",l:"MA, US"},
    {n:"Massachusetts Institute of Technology (MIT)",c:"Academic",l:"MA, US"},{n:"Stanford University",c:"Academic",l:"CA, US"},
    {n:"Johns Hopkins University",c:"Academic",l:"MD, US"},{n:"University of California, San Francisco (UCSF)",c:"Academic",l:"CA, US"},
    {n:"University of California, Berkeley",c:"Academic",l:"CA, US"},{n:"University of California, Los Angeles (UCLA)",c:"Academic",l:"CA, US"},
    {n:"University of California, San Diego (UCSD)",c:"Academic",l:"CA, US"},{n:"Yale University",c:"Academic",l:"CT, US"},
    {n:"Columbia University",c:"Academic",l:"NY, US"},{n:"University of Pennsylvania",c:"Academic",l:"PA, US"},
    {n:"Princeton University",c:"Academic",l:"NJ, US"},{n:"Cornell University",c:"Academic",l:"NY, US"},
    {n:"University of Chicago",c:"Academic",l:"IL, US"},{n:"Northwestern University",c:"Academic",l:"IL, US"},
    {n:"Washington University in St. Louis",c:"Academic",l:"MO, US"},{n:"University of Michigan",c:"Academic",l:"MI, US"},
    {n:"University of Minnesota",c:"Academic",l:"MN, US"},{n:"UT Southwestern Medical Center",c:"Academic",l:"TX, US"},
    {n:"UT MD Anderson Cancer Center",c:"Academic",l:"TX, US"},{n:"Rice University",c:"Academic",l:"TX, US"},
    {n:"University of North Carolina at Chapel Hill",c:"Academic",l:"NC, US"},{n:"University of Florida",c:"Academic",l:"FL, US"},
    {n:"Florida State University",c:"Academic",l:"FL, US"},{n:"Emory University",c:"Academic",l:"GA, US"},
    {n:"Georgia Institute of Technology",c:"Academic",l:"GA, US"},{n:"University of Georgia",c:"Academic",l:"GA, US"},
    {n:"Vanderbilt University",c:"Academic",l:"TN, US"},{n:"Pennsylvania State University",c:"Academic",l:"PA, US"},
    {n:"University of Maryland, Baltimore",c:"Academic",l:"MD, US"},{n:"University of Virginia",c:"Academic",l:"VA, US"},
    {n:"Virginia Tech",c:"Academic",l:"VA, US"},{n:"Case Western Reserve University",c:"Academic",l:"OH, US"},
    {n:"University of Cincinnati",c:"Academic",l:"OH, US"},{n:"Indiana University",c:"Academic",l:"IN, US"},
    {n:"Purdue University",c:"Academic",l:"IN, US"},{n:"University of Iowa",c:"Academic",l:"IA, US"},
    {n:"University of Notre Dame",c:"Academic",l:"IN, US"},{n:"Michigan State University",c:"Academic",l:"MI, US"},
    {n:"University of Colorado Boulder",c:"Academic",l:"CO, US"},{n:"University of Arizona",c:"Academic",l:"AZ, US"},
    {n:"Arizona State University",c:"Academic",l:"AZ, US"},{n:"University of Southern California (USC)",c:"Academic",l:"CA, US"},
    {n:"California Institute of Technology (Caltech)",c:"Academic",l:"CA, US"},{n:"Boston University",c:"Academic",l:"MA, US"},
    {n:"Tufts University",c:"Academic",l:"MA, US"},{n:"Brandeis University",c:"Academic",l:"MA, US"},
    {n:"Northeastern University",c:"Academic",l:"MA, US"},{n:"Brown University",c:"Academic",l:"RI, US"},
    {n:"Dartmouth College",c:"Academic",l:"NH, US"},{n:"UMass Chan Medical School",c:"Academic",l:"MA, US"},
    {n:"Rutgers University",c:"Academic",l:"NJ, US"},{n:"Rockefeller University",c:"Academic",l:"NY, US"},
    {n:"New York University (NYU)",c:"Academic",l:"NY, US"},{n:"Icahn School of Medicine at Mount Sinai",c:"Academic",l:"NY, US"},
    {n:"Albert Einstein College of Medicine",c:"Academic",l:"NY, US"},{n:"Stony Brook University",c:"Academic",l:"NY, US"},
    {n:"University at Buffalo",c:"Academic",l:"NY, US"},{n:"University of Rochester",c:"Academic",l:"NY, US"},
    {n:"Syracuse University",c:"Academic",l:"NY, US"},{n:"Rensselaer Polytechnic Institute",c:"Academic",l:"NY, US"},
    {n:"Texas A&M University",c:"Academic",l:"TX, US"},{n:"University of Houston",c:"Academic",l:"TX, US"},
    {n:"Wake Forest University",c:"Academic",l:"NC, US"},{n:"Medical University of South Carolina (MUSC)",c:"Academic",l:"SC, US"},
    {n:"University of Vermont",c:"Academic",l:"VT, US"},{n:"University of Delaware",c:"Academic",l:"DE, US"},
    {n:"Georgetown University",c:"Academic",l:"DC, US"},{n:"George Washington University",c:"Academic",l:"DC, US"},
    {n:"Drexel University",c:"Academic",l:"PA, US"},{n:"Temple University",c:"Academic",l:"PA, US"},
    {n:"Broad Institute of MIT and Harvard",c:"Academic",l:"MA, US"},{n:"Whitehead Institute",c:"Academic",l:"MA, US"},
    {n:"Scripps Research",c:"Academic",l:"CA, US"},{n:"Salk Institute for Biological Studies",c:"Academic",l:"CA, US"},
    {n:"Sanford Burnham Prebys",c:"Academic",l:"CA, US"},{n:"La Jolla Institute for Immunology",c:"Academic",l:"CA, US"},
    {n:"Dana-Farber Cancer Institute",c:"Academic",l:"MA, US"},{n:"Memorial Sloan Kettering Cancer Center",c:"Academic",l:"NY, US"},
    {n:"Fred Hutchinson Cancer Center",c:"Academic",l:"WA, US"},{n:"Mayo Clinic",c:"Academic",l:"MN, US"},
    {n:"Cleveland Clinic (Lerner Research Institute)",c:"Academic",l:"OH, US"},{n:"Massachusetts General Hospital",c:"Academic",l:"MA, US"},
    {n:"Brigham and Women's Hospital",c:"Academic",l:"MA, US"},{n:"Boston Children's Hospital",c:"Academic",l:"MA, US"},
    {n:"Beth Israel Deaconess Medical Center",c:"Academic",l:"MA, US"},{n:"Children's Hospital of Philadelphia (CHOP)",c:"Academic",l:"PA, US"},
    {n:"Joslin Diabetes Center",c:"Academic",l:"MA, US"}
  ];

  var CATS = [
    {key:"Pharma",   label:"Pharmaceutical"},
    {key:"Biotech",  label:"Biotech"},
    {key:"Academic", label:"Academic & Research"},
    {key:"Service",  label:"Service Providers"}
  ];

  var MARQUEE = ["AbbVie","Amgen","AstraZeneca","Bristol Myers Squibb","Eli Lilly","Johnson & Johnson",
    "Merck & Co.","Moderna","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Vertex","CRISPR Therapeutics",
    "Beam Therapeutics","Ginkgo Bioworks","Generate Biomedicines","Tessera Therapeutics","Harvard University",
    "MIT","Stanford University","Broad Institute","Dana-Farber","Mass General Hospital",
    "Thermo Fisher","Charles River Laboratories"];

  var esc = function (s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };

  // live counts so the UI always matches the data
  var counts = {}; CATS.forEach(function (c) { counts[c.key] = 0; });
  ORGS.forEach(function (o) { counts[o.c] = (counts[o.c] || 0) + 1; });
  var total = ORGS.length;
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  setText("expTotal", total);
  setText("expNPharma", counts.Pharma);
  setText("expNBiotech", counts.Biotech);
  setText("expNAcademic", counts.Academic);
  var filtersEl = document.getElementById("expFilters");
  filtersEl.querySelectorAll(".exp-filter").forEach(function (b) {
    var cat = b.getAttribute("data-cat");
    var c = b.querySelector(".c");
    if (c) c.textContent = (cat === "all") ? total : (counts[cat] || 0);
  });

  // marquee (duplicated for a continuous loop)
  var track = document.getElementById("expTrack");
  if (track) {
    var one = MARQUEE.map(function (n) { return '<span class="chip">' + esc(n) + '</span>'; }).join("");
    track.innerHTML = one + one;
  }

  var activeCat = "all", query = "";
  var empty = document.getElementById("expEmpty");
  var countLine = document.getElementById("expCount");

  function render() {
    var q = query.trim().toLowerCase();
    var matched = ORGS.filter(function (o) {
      return (activeCat === "all" || o.c === activeCat) &&
        (q === "" || o.n.toLowerCase().indexOf(q) > -1 || (o.l && o.l.toLowerCase().indexOf(q) > -1));
    });
    results.innerHTML = "";
    CATS.forEach(function (cat) {
      var items = matched.filter(function (o) { return o.c === cat.key; })
        .sort(function (a, b) { return a.n.localeCompare(b.n); });
      if (!items.length) return;
      var li = items.map(function (o) {
        return '<li><span>' + esc(o.n) + '</span>' + (o.l ? '<span class="loc">' + esc(o.l) + '</span>' : '') + '</li>';
      }).join("");
      results.insertAdjacentHTML("beforeend",
        '<div class="exp-group"><h4>' + cat.label + '<span class="gc">' + items.length + '</span></h4><ul class="orgs">' + li + '</ul></div>');
    });
    empty.style.display = matched.length ? "none" : "block";
    var scope = activeCat === "all" ? "all categories" : CATS.filter(function (c) { return c.key === activeCat; })[0].label;
    countLine.innerHTML = 'Showing <b>' + matched.length + '</b> of <b>' + total + '</b> organizations' +
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
