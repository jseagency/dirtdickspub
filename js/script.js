// ============================================
// VIDEO INTRO SPLASH SCREEN
// ============================================

// Check if user has already seen the intro
function hasSeenIntro() {
  return localStorage.getItem('dirtydicks-intro-seen') === 'true';
}

// Mark intro as seen
function markIntroAsSeen() {
  localStorage.setItem('dirtydicks-intro-seen', 'true');
}

// Initialize intro on page load
window.addEventListener('load', () => {
  if (!hasSeenIntro()) {
    showIntroVideo();
  } else {
    hideIntroVideo();
  }
});

// Show intro video
function showIntroVideo() {
  const introContainer = document.getElementById('intro-video-container');
  const introVideo = document.getElementById('intro-video');
  const skipBtn = document.getElementById('skip-intro-btn');

  if (!introContainer) return;

  introContainer.style.display = 'flex';
  introContainer.style.opacity = '1';

  // Video ended - transition to main site
  introVideo.addEventListener('ended', () => {
    transitionToMainSite();
  });

  // Skip button clicked
  skipBtn.addEventListener('click', () => {
    transitionToMainSite();
  });

  // Also allow ESC key to skip
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && introContainer.style.display === 'flex') {
      transitionToMainSite();
    }
  });
}

// Hide intro video
function hideIntroVideo() {
  const introContainer = document.getElementById('intro-video-container');
  if (introContainer) {
    introContainer.style.display = 'none';
  }
}

// Transition from intro to main site
function transitionToMainSite() {
  const introContainer = document.getElementById('intro-video-container');
  
  // Fade out intro
  introContainer.style.opacity = '0';
  introContainer.style.transition = 'opacity 0.8s ease-out';

  setTimeout(() => {
    hideIntroVideo();
    markIntroAsSeen();
    
    // Fade in main content
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.8s ease-in';
  }, 800);
}

// ============================================
// STICKY HEADER ON SCROLL
// ============================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
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

// ============================================
// FADE-IN ANIMATION ON SCROLL
// ============================================
const faders = document.querySelectorAll(
  '.menu-card, .review-card, .stat, .gallery-item, .drink-card, .food-item, .whisky-card, .event-card'
);
const appearOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

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
  fader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  appearOnScroll.observe(fader);
});

// ============================================
// SMOOTH SCROLL OFFSET FOR FIXED HEADER
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollY < heroHeight) {
      hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
  });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
  let currentValue = 0;
  const increment = target / (duration / 16);
  const startTime = Date.now();

  function update() {
    currentValue += increment;
    if (currentValue < target) {
      element.textContent = Math.floor(currentValue);
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  update();
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      
      const statNum = entry.target.querySelector('.stat-num');
      if (statNum) {
        const text = statNum.textContent;
        const number = parseInt(text.match(/\d+/));
        if (!isNaN(number)) {
          animateCounter(statNum, number);
        }
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
  statsObserver.observe(stat);
});

// ============================================
// VIDEO AUTOPLAY WITH FALLBACK
// ============================================
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', function() {
    this.style.display = 'block';
  });
});

// ============================================
// LAZY LOAD IMAGES
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// RESET INTRO IF USER WANTS TO RE-WATCH
// ============================================
window.addEventListener('keydown', (e) => {
  // Press 'R' to reset and re-watch intro
  if (e.ctrlKey && e.key === 'r') {
    localStorage.removeItem('dirtydicks-intro-seen');
  }
});
