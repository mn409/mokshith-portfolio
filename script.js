/* ═══════════════════════════════════════
   MOKSHITH NARAYAN — PORTFOLIO JS
═══════════════════════════════════════ */

// ── NAV: scroll shadow + active link highlight ──
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

// ── MODALS ──
// Open on card click
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    const modal   = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close via ✕ button (uses data-close attribute)
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal-overlay');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close on backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

// ── SCROLL REVEAL (IntersectionObserver) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// Project cards — staggered
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.dataset.delay = i * 90;
  revealObserver.observe(el);
});

// Achievement cards — staggered
document.querySelectorAll('.achievement-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
  revealObserver.observe(el);
});

// Timeline items — slide in from left, staggered
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.dataset.delay = i * 120;
  revealObserver.observe(el);
});

// Skill groups — staggered
document.querySelectorAll('.skill-group').forEach((el, i) => {
  el.dataset.delay = i * 110;
  revealObserver.observe(el);
});

// About info cards — staggered
document.querySelectorAll('.info-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`;
  revealObserver.observe(el);
  el.classList.add('reveal-info');
});

// About bio paragraphs
document.querySelectorAll('.about-bio p').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`;
  revealObserver.observe(el);
  el.classList.add('reveal-info');
});

// Section labels + titles — fast fade
document.querySelectorAll('.section-label, .section-title, .section-sub').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`;
  revealObserver.observe(el);
  el.classList.add('reveal-info');
});

// Contact links
document.querySelectorAll('.contact-link').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity 0.45s ease ${i * 80}ms, transform 0.45s ease ${i * 80}ms`;
  revealObserver.observe(el);
  el.classList.add('reveal-info');
});

// Handle the inline-style reveals
const infoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains('reveal-info')) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      infoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal-info').forEach(el => infoObserver.observe(el));

// ── CONTACT FORM (Formspree) ──
const form      = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn  = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled    = true;
    formStatus.textContent = '';

    try {
      const response = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        formStatus.textContent = 'Message sent! I will get back to you soon.';
        formStatus.style.color = '#15803d';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch(err) {
      formStatus.textContent = 'Something went wrong. Email me at mokshithnarayan09@gmail.com';
      formStatus.style.color = '#b91c1c';
    }

    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled    = false;
  });
}

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});
