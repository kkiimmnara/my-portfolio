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