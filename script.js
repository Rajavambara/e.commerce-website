// script.js - lightweight interactivity & performance helpers

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Theme toggle (simple)
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const body = document.body;
    if (body.dataset.theme === 'dark') {
      body.dataset.theme = 'light';
      document.documentElement.style.setProperty('--bg','#f7fafc');
      document.documentElement.style.setProperty('--text','#0b1220');
      themeToggle.textContent = 'Light';
    } else {
      body.dataset.theme = 'dark';
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--text');
      themeToggle.textContent = 'Dark';
    }
  });

  // Modal preview
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const closeModal = document.getElementById('closeModal');
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      modalTitle.textContent = btn.dataset.title || 'Preview';
      modal.setAttribute('aria-hidden','false');
    });
  });
  closeModal.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // Contact form (simple client-side validation + simulated send)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      formMsg.textContent = 'Please complete all fields.';
      return;
    }
    formMsg.textContent = 'Sending...';
    // Simulate an async send (no network call)
    setTimeout(() => {
      formMsg.textContent = 'Message sent — I will get back to you soon!';
      form.reset();
    }, 700);
  });

  // Lazy-loading images using IntersectionObserver
  const lazyImages = document.querySelectorAll('img.lazy');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, {rootMargin: '100px 0px', threshold: 0.01});
    lazyImages.forEach(img => obs.observe(img));
  } else {
    // Fallback: load all
    lazyImages.forEach(img => img.src = img.dataset.src);
  }

  // Small performance note: debounce resize events when adding listeners in real projects
});
