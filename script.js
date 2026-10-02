/* ---------- Projects data (edit here) ---------- */
var PROJECTS = [
  { name: "Skinning-AI", type: "Group project", role: "Model trainer, backend",
    desc: "An AI-powered (EfficientNet) web application that integrates machine learning to detect and classify external skin diseases for diagnostic education.",
    tags: ["EfficientNet", "Machine learning"], url: "https://github.com/ikideren/Skinning-AI" },
  { name: "Traffic Detection MOG2", type: "Group project", role: "Model training, report writing, backend",
    desc: "A computer vision system that leverages the MOG2 background subtraction algorithm to efficiently detect and track moving vehicles in video streams.",
    tags: ["Computer vision", "MOG2"], url: "https://github.com/ikideren/traffic-detection-mog2-CV" },
  { name: "Language Detection", type: "Personal project", role: "",
    desc: "A Natural Language Processing model designed to automatically detect and classify the origin language of raw text inputs.",
    tags: ["NLP"], url: "https://github.com/ikideren/Language-Detection-NLP" },
  { name: "DormHunt", type: "Role", role: "Front-end developer",
    desc: "A streamlined accommodation search platform tailored to help college students easily find dormitories that match their living preferences.",
    tags: ["Web", "Front-end"], url: "https://github.com/ikideren/DormHunt" },
  { name: "VSTravel", type: "Personal project", role: "Full-stack developer",
    desc: "A comprehensive travel information system developed to streamline route searching, destination browsing, and overall trip planning.",
    tags: ["Web", "Full-stack"], url: "https://github.com/ikideren/VSTravel" },
  { name: "H.A.N.A.F.I", type: "Role", role: "Deployment",
    desc: "A predictive healthcare model designed to estimate mortality rates by analyzing critical patient medical data such as age, gender, blood pressure, etc.",
    tags: ["Healthcare", "Prediction"], url: "https://github.com/ikideren/H.A.N.A.F.I" }
];

/* ---------- Infinite carousel ---------- */
var box = document.getElementById("cards");
var stage = document.getElementById("stage");
var veil = document.getElementById("veil");
var n = PROJECTS.length, cur = 0, els = [];

PROJECTS.forEach(function (p, i) {
  var a = document.createElement("article");
  a.className = "pc";
  var role = p.role
    ? '<div class="role"><b>' + p.type + "</b>" + p.role + "</div>"
    : '<div class="role"><b>' + p.type + "</b>Solo build</div>";
  a.innerHTML =
    '<div class="in">' + role +
    "<h3>" + p.name + "</h3><p>" + p.desc + "</p>" +
    '<ul class="chips">' + p.tags.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
    '<a class="btn" href="' + p.url + '" target="_blank" rel="noopener">View repository</a></div>';
  a.addEventListener("click", function (e) {
    if (!a.classList.contains("c")) { e.preventDefault(); cur = i; render(); }
  });
  box.appendChild(a);
  els.push(a);
});

function render() {
  var half = Math.floor(n / 2);
  var w = els[0].offsetWidth;
  var step = w * (window.innerWidth < 700 ? 0.78 : 0.86);
  els.forEach(function (el, i) {
    var off = ((i - cur + half) % n + n) % n - half;   /* wraps around forever */
    var abs = Math.abs(off);
    var scale = abs === 0 ? 1 : abs === 1 ? 0.8 : 0.62;
    el.style.transform = "translateX(" + off * step + "px) scale(" + scale + ")";
    el.style.opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : abs === 2 ? 0.25 : 0;
    el.style.zIndex = 10 - abs;
    el.style.pointerEvents = abs > 1 ? "none" : "auto";
    el.classList.toggle("c", off === 0);
    el.setAttribute("aria-hidden", off === 0 ? "false" : "true");
    el.querySelectorAll("a").forEach(function (a) { a.tabIndex = off === 0 ? 0 : -1; });
  });
  veil.classList.remove("show");
}
function go(d) { cur = (cur + d + n) % n; render(); }

document.getElementById("next").onclick = function () { go(1); };
document.getElementById("prev").onclick = function () { go(-1); };
box.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") go(1);
  if (e.key === "ArrowLeft") go(-1);
});
window.addEventListener("resize", render);

/* blur the page only while hovering the focused (center) card */
box.addEventListener("mouseover", function (e) {
  var c = e.target.closest(".pc");
  veil.classList.toggle("show", !!(c && c.classList.contains("c")));
});
box.addEventListener("mouseleave", function () { veil.classList.remove("show"); });

/* drag / swipe */
var sx = null, moved = false;
box.addEventListener("pointerdown", function (e) { sx = e.clientX; moved = false; });
window.addEventListener("pointerup", function (e) {
  if (sx === null) return;
  var dx = e.clientX - sx; sx = null;
  if (Math.abs(dx) > 50) { moved = true; go(dx < 0 ? 1 : -1); }
});
box.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);

render();

/* ---------- Navbar highlight ---------- */
var links = document.querySelectorAll("nav li a");
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["home", "about", "projects"].forEach(function (id) { io.observe(document.getElementById(id)); });
