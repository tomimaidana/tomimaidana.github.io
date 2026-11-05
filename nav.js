// nav.js — para las páginas secundarias (instructivo)
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

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

