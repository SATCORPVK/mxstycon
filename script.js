// script.js

// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for in-page anchors (nice feel on mobile)
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const id = a.getAttribute("href");
  if (!id || id === "#") return;

  const target = document.querySelector(id);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  // If on mobile, close any open focus states nicely
  if (document.activeElement) document.activeElement.blur();
});

// Request-a-Quote (preview): convert form submission into a pre-filled SMS
// If you later want email delivery, swap this for a backend endpoint (Cloudflare Worker, Formspree, etc.)
window.handleQuote = function handleQuote(e) {
  e.preventDefault();

  const form = e.target;
  const fd = new FormData(form);

  const name = (fd.get("name") || "").toString().trim();
  const phone = (fd.get("phone") || "").toString().trim();
  const vehicle = (fd.get("vehicle") || "").toString().trim();
  const service = (fd.get("service") || "").toString().trim();
  const details = (fd.get("details") || "").toString().trim();

  const msg =
`Hi Kambo Kustoms — Quote Request
Name: ${name}
Phone: ${phone}
Vehicle: ${vehicle}
Service: ${service}
Details: ${details}`;

  // iOS/Android differences: keep it simple
  const smsUrl = "sms:+18159551895?&body=" + encodeURIComponent(msg);
  window.location.href = smsUrl;

  return false;
};

// Optional: light phone formatting while typing (US format)
// Only runs if the input exists and is not already formatted.
(() => {
  const phoneInput = document.querySelector('input[name="phone"]');
  if (!phoneInput) return;

  const format = (v) => {
    const digits = (v || "").replace(/\D/g, "").slice(0, 10);
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 10);
    if (digits.length <= 3) return a;
    if (digits.length <= 6) return `(${a}) ${b}`;
    return `(${a}) ${b}-${c}`;
  };

  phoneInput.addEventListener("input", () => {
    const cur = phoneInput.value;
    const next = format(cur);
    if (cur !== next) phoneInput.value = next;
  });
})();
