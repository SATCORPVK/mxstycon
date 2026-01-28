// Mixed Style Conflict — Community Hub
// script.js

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Optional: set these right here, no code changes elsewhere.
  // Just paste URLs and the page updates automatically.
  const LINKS = {
    live: "#",        // e.g. "https://www.tiktok.com/@mxstycon/live"
    message: "#",     // e.g. "mailto:hello@..." or "https://instagram.com/..."
    music: "#",       // Spotify/Apple/Link hub
    schedule: "#",    // Schedule/Live page
    tiktok: "#",      // https://www.tiktok.com/@mxstycon
    instagram: "#",   // https://www.instagram.com/...
    youtube: "#",     // https://www.youtube.com/@...
    support: "#",     // CashApp/PayPal/Ko-fi/etc
    notify: "#",      // Email signup / Discord invite / IG channel
  };

  // Wire links if elements exist (safe if you delete sections)
  // HERO buttons
  const liveBtn = $(".btn--primary");
  if (liveBtn && LINKS.live !== "#") liveBtn.href = LINKS.live;

  const ghostBtns = document.querySelectorAll(".btn--ghost");
  if (ghostBtns.length && LINKS.message !== "#") {
    ghostBtns.forEach((b) => (b.href = LINKS.message));
  }

  // Cards (in order)
  const cards = Array.from(document.querySelectorAll(".grid .card"));

  const setCard = (idx, href) => {
    const el = cards[idx];
    if (!el) return;
    if (href && href !== "#") el.href = href;
  };

  // Match the order in index.html:
  // 0 Music, 1 LIVE/Schedule, 2 TikTok, 3 IG, 4 YouTube, 5 Support
  setCard(0, LINKS.music);
  setCard(1, LINKS.schedule);
  setCard(2, LINKS.tiktok);
  setCard(3, LINKS.instagram);
  setCard(4, LINKS.youtube);
  setCard(5, LINKS.support);

  // Notify button
  const notifyBtn = Array.from(document.querySelectorAll(".btn"))
    .find((b) => (b.textContent || "").toLowerCase().includes("notify"));
  if (notifyBtn && LINKS.notify !== "#") notifyBtn.href = LINKS.notify;

  // Smooth scroll for any on-page anchors like #about if you add them
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;

    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Tiny tap feedback (mobile): add a pressed class quickly
  const pressables = document.querySelectorAll(".btn, .card");
  pressables.forEach((el) => {
    el.addEventListener("touchstart", () => el.classList.add("is-pressed"), { passive: true });
    el.addEventListener("touchend", () => el.classList.remove("is-pressed"));
    el.addEventListener("touchcancel", () => el.classList.remove("is-pressed"));
  });
})();