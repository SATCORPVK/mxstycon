/* ==========================
   MXSTYCON — Link Page Engine
   - Animated starfield + waveform
   - Click tracking (local)
   - Hidden Edit Mode (?edit=1)
   ========================== */

const STORAGE_KEY = "mxstycon_linkpage_v1";
const ANALYTICS_KEY = "mxstycon_clicks_v1";
const UPDATED_KEY = "mxstycon_updated_v1";

// CHANGE THIS PASSCODE:
const EDIT_PASSCODE = "7777";

const DEFAULT_DATA = {
  displayName: "Mixed Style Conflict",
  handle: "@mxstycon",
  liveText: "LIVE Pop-Up Host",
  tagline:
    "Together, we can change the world thru love, kindness & our actions! I’m just an incredibly blessed individual, far from perfect, but full of love! Quality over Quantity.",
  pills: [
    { text: "Live Music", tone: "cyan" },
    { text: "Real Conversation", tone: "violet" },
    { text: "Positive Energy", tone: "pink" },
    { text: "Disciple • Father • Musician • Veteran", tone: "amber" }
  ],
  ctas: {
    primaryLabel: "Follow • Watch • Vibe",
    primaryUrl: "https://www.tiktok.com/@mxstycon",
    bookLabel: "Request Invite",
    bookUrl: "https://www.tiktok.com/@mxstycon"
  },
  messageOptions: [
    { label: "TikTok DM", url: "https://www.tiktok.com/@mxstycon", desc: "Fastest way to reach me." },
    { label: "Instagram", url: "https://instagram.com/", desc: "If you prefer IG." },
    { label: "Email", url: "mailto:hello@example.com", desc: "For bookings / longer notes." }
  ],
  avatar: {
    // If you want a real image: put `avatar.jpg` in same folder and set url to "avatar.jpg"
    url: "",
  },
  links: [
    {
      title: "TikTok — Main Hub",
      desc: "Lives • clips • positivity • music.",
      url: "https://www.tiktok.com/@mxstycon",
      badge: "MAIN",
      icon: "tiktok"
    },
    {
      title: "Go Live / Watch Now",
      desc: "Jump into the session when I’m on.",
      url: "https://www.tiktok.com/@mxstycon/live",
      badge: "LIVE",
      icon: "bolt"
    },
    {
      title: "Showcase / Highlights",
      desc: "Best moments, songs, and conversations.",
      url: "https://www.tiktok.com/@mxstycon",
      badge: "TOP",
      icon: "star"
    },
    {
      title: "Bookings / Pop-Up Requests",
      desc: "Invite me to your event or collaboration.",
      url: "https://www.tiktok.com/@mxstycon",
      badge: "BOOK",
      icon: "calendar"
    },
    {
      title: "Support the Mission",
      desc: "Good energy fuels good work.",
      url: "https://cash.app/$YOURNAME",
      badge: "SUPPORT",
      icon: "heart"
    },
    {
      title: "YouTube (optional)",
      desc: "Long form sessions / music uploads.",
      url: "https://youtube.com/",
      badge: "VIDEO",
      icon: "play"
    }
  ]
};

/* ---------- Helpers ---------- */
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(DEFAULT_DATA), ...parsed };
  }catch(e){
    return structuredClone(DEFAULT_DATA);
  }
}
function saveData(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(UPDATED_KEY, String(Date.now()));
}

function loadClicks(){
  try{
    const raw = localStorage.getItem(ANALYTICS_KEY);
    return raw ? JSON.parse(raw) : { total: 0, per: {} };
  }catch(e){
    return { total: 0, per: {} };
  }
}
function saveClicks(c){ localStorage.setItem(ANALYTICS_KEY, JSON.stringify(c)); }

function fmtDate(ts){
  if(!ts) return "—";
  const d = new Date(Number(ts));
  return d.toLocaleDateString(undefined, { year:"numeric", month:"short", day:"2-digit" });
}

/* ---------- Icons (inline SVG) ---------- */
function iconSVG(name){
  const common = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const svgs = {
    tiktok: `<svg viewBox="0 0 24 24" ${common}><path d="M14 7v9.1a4.9 4.9 0 1 1-4.2-4.85"/><path d="M14 7c1.1 2.7 3.3 4.2 6 4.4"/><path d="M10 11.25V8.2"/><path d="M14 7V4"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" ${common}><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" ${common}><path d="M12 2l3.1 6.6 7.3 1.1-5.2 5.1 1.2 7.2L12 18.9 5.6 22l1.2-7.2L1.6 9.7l7.3-1.1L12 2z"/></svg>`,
    calendar:`<svg viewBox="0 0 24 24" ${common}><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M8 2v4M16 2v4"/><path d="M3 10h18"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" ${common}><path d="M20.8 8.5c0-2.3-1.9-4.2-4.2-4.2-1.4 0-2.7.7-3.4 1.8-.7-1.1-2-1.8-3.4-1.8-2.3 0-4.2 1.9-4.2 4.2 0 6 7.6 11.2 7.6 11.2S20.8 14.5 20.8 8.5z"/></svg>`,
    play: `<svg viewBox="0 0 24 24" ${common}><path d="M8 5v14l12-7z"/></svg>`,
    link: `<svg viewBox="0 0 24 24" ${common}><path d="M10 13a5 5 0 0 0 7.1 0l1.6-1.6a5 5 0 0 0-7.1-7.1L10.8 5"/><path d="M14 11a5 5 0 0 0-7.1 0L5.3 12.6a5 5 0 0 0 7.1 7.1L13.2 19"/></svg>`
  };
  return svgs[name] || svgs.link;
}

/* ---------- Render ---------- */
const data = loadData();
const clicks = loadClicks();

function render(){
  $("#displayName").textContent = data.displayName;
  $("#footName").textContent = data.displayName;
  $("#handle").textContent = data.handle;
  $("#footHandle").textContent = data.handle;
  $("#liveText").textContent = data.liveText;
  $("#tagline").textContent = data.tagline;

  // Avatar
  const av = $("#avatar");
  if(data.avatar?.url){
    av.style.backgroundImage = `url("${data.avatar.url}")`;
    av.style.backgroundSize = "cover";
    av.style.backgroundPosition = "center";
  }

  // Pills
  const pillrow = $("#pillrow");
  pillrow.innerHTML = "";
  (data.pills || []).forEach(p => {
    const el = document.createElement("div");
    el.className = "pill";
    el.innerHTML = `<span class="dot" aria-hidden="true"></span><span>${p.text}</span>`;
    pillrow.appendChild(el);
  });

  // CTAs
  const primary = $("#primaryCta");
  primary.href = data.ctas?.primaryUrl || "#";
  primary.querySelector("span:last-child")?.remove?.();
  primary.childNodes[primary.childNodes.length - 1].textContent = data.ctas?.primaryLabel || "Follow • Watch • Vibe";

  const book = $("#bookBtn");
  book.href = data.ctas?.bookUrl || "#";
  book.textContent = data.ctas?.bookLabel || "Request Invite";

  // Links grid
  const grid = $("#linkGrid");
  grid.innerHTML = "";
  (data.links || []).forEach((l, idx) => {
    const card = document.createElement("div");
    card.className = "linkCard";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute("aria-label", `${l.title} — ${l.desc}`);

    const icon = document.createElement("div");
    icon.className = "icon";
    icon.innerHTML = iconSVG(l.icon);

    const meta = document.createElement("div");
    meta.className = "linkMeta";
    meta.innerHTML = `<p class="linkTitle">${l.title}</p><p class="linkDesc">${l.desc}</p>`;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = l.badge || "LINK";

    card.appendChild(icon);
    card.appendChild(meta);
    card.appendChild(badge);

    const open = () => {
      trackClick(idx, l.title);
      if(l.url) window.open(l.url, "_blank", "noopener");
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); }
    });

    grid.appendChild(card);
  });

  // Stats
  $("#totalClicks").textContent = String(clicks.total || 0);
  $("#lastUpdated").textContent = fmtDate(localStorage.getItem(UPDATED_KEY));
  $("#tapEnergy").textContent = calcTapEnergy(clicks.total || 0);
}
render();

/* ---------- Tracking ---------- */
function trackClick(idx, title){
  clicks.total = (clicks.total || 0) + 1;
  clicks.per = clicks.per || {};
  const k = String(idx);
  clicks.per[k] = (clicks.per[k] || 0) + 1;
  saveClicks(clicks);
  $("#totalClicks").textContent = String(clicks.total);
  $("#tapEnergy").textContent = calcTapEnergy(clicks.total);

  // micro feedback
  vibrate(18);
  toast(`Opened: ${title}`);
}
function calcTapEnergy(total){
  // Just a fun “power” readout
  const lvl = Math.floor(Math.log10(total + 10) * 18);
  const p = clamp(lvl, 8, 99);
  return `${p}%`;
}
function vibrate(ms){
  if("vibrate" in navigator) navigator.vibrate(ms);
}

/* ---------- Copy link ---------- */
$("#copyLink").addEventListener("click", async () => {
  const url = location.href.split("?")[0];
  try{
    await navigator.clipboard.writeText(url);
    toast("Link copied.");
    vibrate(18);
  }catch(e){
    toast("Could not copy. Hold to copy manually.");
  }
});

/* ---------- Modal messaging ---------- */
const modal = $("#modal");
$("#messageBtn").addEventListener("click", () => openModal());

function openModal(){
  const body = $("#modalBody");
  body.innerHTML = "";
  (data.messageOptions || []).forEach((m) => {
    const btn = document.createElement("a");
    btn.className = "btn btn--secondary";
    btn.href = m.url || "#";
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.innerHTML = `<span class="btn__icon" aria-hidden="true">✉</span>
      <span>
        <div style="font-weight:800; letter-spacing:-.01em">${m.label}</div>
        <div style="opacity:.75; font-size:12px; margin-top:4px">${m.desc || ""}</div>
      </span>`;
    body.appendChild(btn);
  });

  modal.setAttribute("data-open","1");
  modal.setAttribute("aria-hidden","false");
}

modal.addEventListener("click", (e) => {
  const close = e.target?.dataset?.close === "1";
  if(close){
    modal.removeAttribute("data-open");
    modal.setAttribute("aria-hidden","true");
  }
});

/* ---------- FX Toggle ---------- */
let fxOn = true;
$("#toggleFX").addEventListener("click", () => {
  fxOn = !fxOn;
  $("#toggleFX").textContent = fxOn ? "FX: ON" : "FX: OFF";
  document.body.classList.toggle("fx-off", !fxOn);
});

/* ---------- Toast ---------- */
let toastTimer = null;
function toast(msg){
  let el = $("#toast");
  if(!el){
    el = document.createElement("div");
    el.id = "toast";
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "22px";
    el.style.transform = "translateX(-50%)";
    el.style.zIndex = "99";
    el.style.padding = "10px 12px";
    el.style.borderRadius = "999px";
    el.style.border = "1px solid rgba(255,255,255,.14)";
    el.style.background = "rgba(0,0,0,.35)";
    el.style.backdropFilter = "blur(10px)";
    el.style.color = "rgba(255,255,255,.9)";
    el.style.fontFamily = `"JetBrains Mono", ui-monospace, monospace`;
    el.style.fontSize = "12px";
    el.style.letterSpacing = ".06em";
    el.style.boxShadow = "0 18px 60px rgba(0,0,0,.55)";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.opacity = "0"; }, 1300);
}

/* ---------- Edit Mode ---------- */
(function editMode(){
  const params = new URLSearchParams(location.search);
  if(params.get("edit") !== "1") return;

  const pass = prompt("Edit Mode — Enter passcode:");
  if(pass !== EDIT_PASSCODE){
    alert("Nope.");
    return;
  }

  // Minimal editor using prompt loops (simple + reliable on mobile)
  const d = structuredClone(loadData());

  const menu =
`EDIT MENU:
1) Name
2) Handle
3) Live text
4) Tagline
5) Primary CTA (label + url)
6) Book CTA (label + url)
7) Edit Links
8) Message Options
9) Avatar URL
S) Save & exit`;

  while(true){
    const choice = prompt(menu);
    if(!choice) break;

    if(choice.toLowerCase() === "s"){
      saveData(d);
      alert("Saved. Refreshing…");
      location.href = location.href.split("?")[0];
      return;
    }

    if(choice === "1") d.displayName = prompt("Display name:", d.displayName) ?? d.displayName;
    if(choice === "2") d.handle = prompt("Handle:", d.handle) ?? d.handle;
    if(choice === "3") d.liveText = prompt("Live text:", d.liveText) ?? d.liveText;
    if(choice === "4") d.tagline = prompt("Tagline:", d.tagline) ?? d.tagline;

    if(choice === "5"){
      d.ctas.primaryLabel = prompt("Primary CTA label:", d.ctas.primaryLabel) ?? d.ctas.primaryLabel;
      d.ctas.primaryUrl = prompt("Primary CTA url:", d.ctas.primaryUrl) ?? d.ctas.primaryUrl;
    }

    if(choice === "6"){
      d.ctas.bookLabel = prompt("Book CTA label:", d.ctas.bookLabel) ?? d.ctas.bookLabel;
      d.ctas.bookUrl = prompt("Book CTA url:", d.ctas.bookUrl) ?? d.ctas.bookUrl;
    }

    if(choice === "7"){
      const idx = Number(prompt(`Link index (0-${d.links.length - 1}):`));
      if(Number.isFinite(idx) && d.links[idx]){
        d.links[idx].title = prompt("Title:", d.links[idx].title) ?? d.links[idx].title;
        d.links[idx].desc  = prompt("Description:", d.links[idx].desc) ?? d.links[idx].desc;
        d.links[idx].url   = prompt("URL:", d.links[idx].url) ?? d.links[idx].url;
        d.links[idx].badge = prompt("Badge:", d.links[idx].badge) ?? d.links[idx].badge;
        d.links[idx].icon  = prompt("Icon (tiktok/bolt/star/calendar/heart/play/link):", d.links[idx].icon) ?? d.links[idx].icon;
      } else {
        alert("Invalid index.");
      }
    }

    if(choice === "8"){
      const idx = Number(prompt(`Message option index (0-${d.messageOptions.length - 1}):`));
      if(Number.isFinite(idx) && d.messageOptions[idx]){
        d.messageOptions[idx].label = prompt("Label:", d.messageOptions[idx].label) ?? d.messageOptions[idx].label;
        d.messageOptions[idx].url   = prompt("URL:", d.messageOptions[idx].url) ?? d.messageOptions[idx].url;
        d.messageOptions[idx].desc  = prompt("Description:", d.messageOptions[idx].desc) ?? d.messageOptions[idx].desc;
      } else {
        alert("Invalid index.");
      }
    }

    if(choice === "9"){
      d.avatar.url = prompt("Avatar image URL (or local file like avatar.jpg):", d.avatar.url || "") ?? d.avatar.url;
    }
  }
})();

/* ---------- Starfield ---------- */
const starCanvas = $("#stars");
const sctx = starCanvas.getContext("2d", { alpha: true });

let sw=0, sh=0, sdpr=1;
let stars = [];
let mouseX=0.5, mouseY=0.4;

function resizeStars(){
  sdpr = Math.min(window.devicePixelRatio || 1, 2);
  sw = window.innerWidth;
  sh = window.innerHeight;
  starCanvas.width = Math.floor(sw * sdpr);
  starCanvas.height = Math.floor(sh * sdpr);
  starCanvas.style.width = sw + "px";
  starCanvas.style.height = sh + "px";
  sctx.setTransform(sdpr,0,0,sdpr,0,0);

  const count = Math.floor((sw * sh) / 16000); // density
  stars = new Array(count).fill(0).map(() => ({
    x: Math.random() * sw,
    y: Math.random() * sh,
    r: Math.random() * 1.6 + 0.2,
    v: Math.random() * 0.35 + 0.05,
    a: Math.random() * 0.6 + 0.25
  }));
}
resizeStars();
window.addEventListener("resize", resizeStars);
window.addEventListener("pointermove", (e)=>{
  mouseX = e.clientX / sw;
  mouseY = e.clientY / sh;
});

function drawStars(t){
  if(!fxOn) return;
  sctx.clearRect(0,0,sw,sh);

  const driftX = (mouseX - 0.5) * 20;
  const driftY = (mouseY - 0.5) * 20;

  for(const s of stars){
    s.y += s.v;
    if(s.y > sh + 10){ s.y = -10; s.x = Math.random() * sw; }

    const x = s.x + driftX * (s.r * 0.9);
    const y = s.y + driftY * (s.r * 0.9);

    sctx.globalAlpha = s.a;
    sctx.beginPath();
    sctx.arc(x, y, s.r, 0, Math.PI*2);
    sctx.fillStyle = "white";
    sctx.fill();
  }

  requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

/* ---------- Waveform Footer ---------- */
const wave = $("#wave");
const wctx = wave.getContext("2d", { alpha: true });

function resizeWave(){
  const box = wave.parentElement.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  wave.width = Math.floor(box.width * dpr);
  wave.height = Math.floor(box.height * dpr);
  wave.style.width = box.width + "px";
  wave.style.height = box.height + "px";
  wctx.setTransform(dpr,0,0,dpr,0,0);
}
resizeWave();
window.addEventListener("resize", resizeWave);

function drawWave(t){
  wctx.clearRect(0,0,wave.width,wave.height);
  const W = wave.parentElement.getBoundingClientRect().width;
  const H = wave.parentElement.getBoundingClientRect().height;

  if(!fxOn){
    requestAnimationFrame(drawWave);
    return;
  }

  const time = t * 0.001;
  const mid = H * 0.56;

  wctx.globalAlpha = 0.9;
  wctx.lineWidth = 2;

  // glow line
  wctx.beginPath();
  for(let x=0; x<=W; x+=6){
    const n = Math.sin((x * 0.015) + time * 2.2) * 10
            + Math.sin((x * 0.008) - time * 1.3) * 6;
    const y = mid + n;
    if(x === 0) wctx.moveTo(x,y);
    else wctx.lineTo(x,y);
  }
  wctx.strokeStyle = "rgba(255,255,255,.35)";
  wctx.stroke();

  // underglow fill
  wctx.globalAlpha = 0.22;
  wctx.beginPath();
  wctx.moveTo(0, H);
  for(let x=0; x<=W; x+=6){
    const n = Math.sin((x * 0.015) + time * 2.2) * 10
            + Math.sin((x * 0.008) - time * 1.3) * 6;
    const y = mid + n;
    wctx.lineTo(x,y);
  }
  wctx.lineTo(W, H);
  wctx.closePath();
  wctx.fillStyle = "rgba(139,92,246,.35)";
  wctx.fill();

  requestAnimationFrame(drawWave);
}
requestAnimationFrame(drawWave);