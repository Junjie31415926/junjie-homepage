(() => {
  'use strict';
  const root = document.documentElement;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.getElementById('motion-toggle');
  let paused = media.matches;
  function apply() {
    root.classList.toggle('motion-paused', paused);
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    toggle.setAttribute('aria-pressed', String(paused));
  }
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => { paused = !paused; apply(); });
    media.addEventListener('change', event => { paused = event.matches; apply(); });
    apply();
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .04 });
    document.querySelectorAll('section:not(.hero)').forEach(section => { section.classList.add('reveal'); observer.observe(section); });
    root.classList.add('motion-ready');
  }
})();
