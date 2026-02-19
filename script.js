/* ═══════════════════════════════════════
   MOKSHITH NARAYAN — PORTFOLIO JS
═══════════════════════════════════════ */

// NAV: scroll shadow + active link
const navbar = document.getElementById('navbar');
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
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

// MODALS
const modalOverlays = document.querySelectorAll('.modal-overlay');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    const modal = document.getElementById(card.getAttribute('data-modal'));
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.getAttribute('data-close'));
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

modalOverlays.forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modalOverlays.forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.project-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});
document.querySelectorAll('.achievement-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});
document.querySelectorAll('.skill-group').forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});

//CONTACT
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    formStatus.textContent = '';

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
        formStatus.style.color = '#15803d';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      formStatus.textContent = 'Something went wrong. Email me directly at mokshithnarayan09@gmail.com';
      formStatus.style.color = '#b45309';
    }

    btn.textContent = 'Send Message →';
    btn.disabled = false;
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});
