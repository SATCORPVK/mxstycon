// Mixed Style Conflict — PULSE Neon Hub
// script.js

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Paste real URLs here (page auto-wires)
  const LINKS = {
    live: "#",        // e.g. "https://www.tiktok.com/@mxstycon/live"
    message: "#",     // e.g. "mailto:..." or IG profile link
    music: "#",       // spotify/apple/youtube music
    schedule: "#",    // schedule or "live" link again
    tiktok: "https://www.tiktok.com/@mxstycon",
    instagram: "#",
    youtube: "#",
    support: "#",
    notify: "#",
  };

  // Wire HERO buttons
  const liveBtn = $(".btn--primary");
  if (liveBtn && LINKS.live !== "#") liveBtn.href = LINKS.live;

  const msgBtn = $(".btn--ghost");
  if (msgBtn && LINKS.message !== "#") msgBtn.href = LINKS.message;

  // Wire cards in order (matches index.html)
  const cards = Array.from(document.querySelectorAll(".grid .card"));
  const setCard = (i, href) => {
    if (!cards[i]) return;
    if (href && href !== "#") cards[i].href = href;
  };
  setCard(0, LINKS.music);
  setCard(1, LINKS.schedule !== "#" ? LINKS.schedule : LINKS.live);
  setCard(2, LINKS.tiktok);
  setCard(3, LINKS.instagram);
  setCard(4, LINKS.youtube);
  setCard(5, LINKS.support);

  // Wire notify button
  const notifyBtn = Array.from(document.querySelectorAll("a.btn"))
    .find((b) => (b.textContent || "").toLowerCase().includes("notify"));
  if (notifyBtn && LINKS.notify !== "#") notifyBtn.href = LINKS.notify;

  // ----------------------------
  // Animated Stars (lightweight)
  // ----------------------------
  const canvas = document.getElementById("stars");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w = 0, h = 0, dpr = 1;
  let stars = [];
  let t = 0;

  const rand = (a, b) => a + Math.random() * (b - a);

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.floor(window.innerWidth * dpr);
    h = Math.floor(window.innerHeight * dpr);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    // Star count scales with screen size
    const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    stars = new Array(Math.max(55, Math.min(140, count))).fill(0).map(() => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.6, 1.8) * dpr,
      sp: rand(0.08, 0.32) * dpr,
      a: rand(0.25, 0.95),
      tw: rand(0.002, 0.01)
    }));
  }

  function draw(){
    if (prefersReduced) return;

    t += 1;

    ctx.clearRect(0, 0, w, h);

    // faint dust / nebula speckle
    ctx.globalAlpha = 0.22;
    for (let i = 0; i < 120; i++){
      const x = (Math.sin((t * 0.002) + i) * 0.5 + 0.5) * w;
      const y = (Math.cos((t * 0.0017) + i * 1.3) * 0.5 + 0.5) * h;
      ctx.fillRect(x, y, 1 * dpr, 1 * dpr);
    }

    // stars
    for (const s of stars){
      s.y += s.sp;
      if (s.y > h + 10) { s.y = -10; s.x = rand(0, w); }

      // twinkle
      const a = s.a + Math.sin(t * s.tw) * 0.18;

      ctx.beginPath();
      ctx.globalAlpha = Math.max(0, Math.min(1, a));
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }

    // a couple subtle “color glints”
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = "rgba(34,211,238,1)";
    ctx.fillRect(w * 0.18, h * 0.22, 2 * dpr, 2 * dpr);

    ctx.fillStyle = "rgba(236,72,153,1)";
    ctx.fillRect(w * 0.78, h * 0.34, 2 * dpr, 2 * dpr);

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
})();