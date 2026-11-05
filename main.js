// CaloriBot - main.js

/* ===== NAV: scroll effect & mobile toggle ===== */
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

/* ===== SIMULADOR MICRO:BIT ===== */
let calories = 0;
const display = document.getElementById('calorie-display');
const btnRight = document.getElementById('btn-right');
const btnLeft = document.getElementById('btn-left');
const btnCenter = document.getElementById('btn-center');
const btnLogo = document.getElementById('btn-logo');

function updateDisplay(value) {
  display.textContent = value;
  display.style.transform = 'scale(1.2)';
  setTimeout(() => { display.style.transform = 'scale(1)'; }, 200);
}

function showToast(msg, color = '#2f9e44') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = color;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

btnRight.addEventListener('click', () => {
  calories += 100;
  updateDisplay(calories);
  showToast(`+100 kcal → Total: ${calories} kcal`, '#2f9e44');
});

btnLeft.addEventListener('click', () => {
  calories = Math.max(0, calories - 100);
  updateDisplay(calories);
  showToast(`−100 kcal → Total: ${calories} kcal`, '#e03131');
});

btnCenter.addEventListener('click', () => {
  showToast(`💾 Guardado: ${calories} kcal registradas hoy`, '#1971c2');
});

btnLogo.addEventListener('click', () => {
  calories = 0;
  updateDisplay(0);
  showToast('↺ Reiniciado — ¡Nuevo día!', '#f59f00');
});

/* ===== ACTIVE NAV LINK on scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active',
          link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ===== SCROLL REVEAL (simple) ===== */
const revealEls = document.querySelectorAll('.problem-card, .componente-card, .boton-item, .stat-item, .step-prev');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});

