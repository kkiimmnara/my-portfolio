const navigationLinks = [...document.querySelectorAll('.site-nav a')];
const sections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

  if (!visibleSection) return;

  navigationLinks.forEach((link) => {
    if (link.hash === `#${visibleSection.target.id}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.15, 0.5] });

sections.forEach((section) => sectionObserver.observe(section));

const cursorDot = document.querySelector('.cursor-dot');
const supportsCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursorDot && supportsCustomCursor) {
  const cursorParts = [...cursorDot.querySelectorAll('[data-cursor-part]')];
  document.body.classList.add('has-custom-cursor');

  document.addEventListener('pointermove', (event) => {
    const firstMove = !cursorDot.classList.contains('is-visible');
    if (firstMove) cursorDot.classList.add('is-initializing');

    cursorParts.forEach((part) => {
      part.style.left = `${event.clientX}px`;
      part.style.top = `${event.clientY}px`;
    });
    cursorDot.classList.add('is-visible');

    if (firstMove) {
      requestAnimationFrame(() => requestAnimationFrame(() => cursorDot.classList.remove('is-initializing')));
    }
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    if (!(event.target instanceof Element)) return;
    cursorDot.classList.toggle('is-over-link', Boolean(event.target.closest('a, button, [role="button"]')));
  });
}