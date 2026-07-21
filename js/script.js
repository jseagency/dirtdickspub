// Sticky header on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Fade-in animation on scroll
const faders = document.querySelectorAll('.menu-card, .review-card, .stat, .gallery-item');
const appearOptions = { threshold: 0.15 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.style.opacity = '0';
  fader.style.transform = 'translateY(30px)';
  fader.style.transition = 'opacity .6s ease, transform .6s ease';
  appearOnScroll.observe(fader);
});