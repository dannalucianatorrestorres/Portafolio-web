// Año footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const burger = document.querySelector(".nav-burger");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Cerrar al hacer click en un link
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// Contadores animados (Habilidades)
function animateCounter(el, to) {
  const duration = 900;
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(start + (to - start) * eased);
    el.textContent = value;
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll("[data-counter]");
const countersIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const to = Number(el.getAttribute("data-counter")) || 0;
      animateCounter(el, to);
      countersIO.unobserve(el);
    }
  });
}, { threshold: 0.4 });

counters.forEach(el => countersIO.observe(el));


