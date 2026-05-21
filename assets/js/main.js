/* Éclosens — main.js */

/* ── Scroll animations ── */
if ('IntersectionObserver' in window) {
  const animTargets = document.querySelectorAll(
    '.fade-up, .fade-in, .stagger-children, ' +
    '.understanding-card, .service-card, .testimonial-card, ' +
    '.blog-card, .faq-item, .section-header, ' +
    '.hero-content, .hero-visual, .why-content, .why-visual, ' +
    '.contact-content, .contact-visual, .about-portrait, .about-content'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  animTargets.forEach(el => {
    if (!el.classList.contains('fade-up') && !el.classList.contains('fade-in') && !el.classList.contains('stagger-children')) {
      el.classList.add('fade-up');
    }
    observer.observe(el);
  });
}


/* ── Sticky header shadow ── */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* ── Mobile navigation ── */
const toggle = document.querySelector('.nav-toggle');
const menu   = document.querySelector('.nav-links');

if (toggle && menu) {
  const open  = () => { toggle.setAttribute('aria-expanded', 'true');  menu.classList.add('is-open');    document.body.style.overflow = 'hidden'; };
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); document.body.style.overflow = ''; };

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}


/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId   = btn.getAttribute('aria-controls');
    const answer     = answerId
      ? document.getElementById(answerId)
      : btn.closest('.faq-item')?.querySelector('.faq-answer');
    if (!answer) return;

    /* Close siblings */
    btn.closest('.faq-list')?.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.closest('.faq-item')?.classList.remove('is-open');
        const otherId = other.getAttribute('aria-controls');
        const otherAnswer = otherId
          ? document.getElementById(otherId)
          : other.closest('.faq-item')?.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.hidden = true;
      }
    });

    btn.setAttribute('aria-expanded', String(!isExpanded));
    btn.closest('.faq-item')?.classList.toggle('is-open', !isExpanded);
    answer.hidden = isExpanded;
  });
});


/* ── Blog category filter ── */
const categoryBtns = document.querySelectorAll('.blog-category');
const blogCards    = document.querySelectorAll('.blog-card');

if (categoryBtns.length && blogCards.length) {
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.textContent.trim();

      // Fade out all cards
      blogCards.forEach(card => card.classList.add('is-fading'));

      setTimeout(() => {
        let matchIndex = 0;
        blogCards.forEach(card => {
          const tag   = card.querySelector('.blog-card-tag')?.textContent.trim();
          const match = filter === 'Tous' || tag === filter;
          card.classList.remove('is-fading');

          if (match) {
            card.style.display = '';
            card.style.animationDelay = `${matchIndex * 0.07}s`;
            card.classList.add('is-appearing');
            card.addEventListener('animationend', () => {
              card.classList.remove('is-appearing');
              card.style.animationDelay = '';
            }, { once: true });
            matchIndex++;
          } else {
            card.style.display = 'none';
          }
        });
      }, 220);
    });
  });
}


/* ── Active nav link highlight ── */
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href')?.split('/').pop();
  if (href && href === currentPath) a.classList.add('active');
});


/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
