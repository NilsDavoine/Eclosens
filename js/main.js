/* Éclosens — main.js */

/* ── Scroll-triggered fade-up animations ── */
const fadeEls = document.querySelectorAll('.understanding-card, .service-card, .testimonial-card, .faq-item, .hero-content, .hero-visual, .why-content, .why-visual, .contact-content, .contact-visual, .section-header');

if ('IntersectionObserver' in window && fadeEls.length) {
  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('fade-up'));
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 60}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));
}


/* ── Mobile navigation toggle ── */
const toggle = document.querySelector('.nav-toggle');
const menu   = document.querySelector('.nav-links');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open', !expanded);
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}


/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);

    if (!answer) return;

    /* Close any open item */
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherId = other.getAttribute('aria-controls');
        const otherAnswer = document.getElementById(otherId);
        if (otherAnswer) otherAnswer.hidden = true;
      }
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});


/* ── Sticky header shadow on scroll ── */
const header = document.querySelector('.site-header');
if (header) {
  const updateHeader = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(44, 40, 37, 0.08)'
      : 'none';
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}
