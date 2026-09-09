/* Optional enhancements only: all page content works without JavaScript. */
(() => {
  'use strict';
  const status = document.getElementById('copy-status');
  async function copyText(text, button) {
    const label = button.textContent;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied!';
      status.textContent = 'Copied to clipboard.';
    } catch {
      // Local file previews may restrict clipboard access; content stays selectable.
      button.textContent = 'Select and copy manually';
      status.textContent = 'Copy is unavailable here. Please select the text and copy it manually.';
    }
    window.setTimeout(() => { button.textContent = label; }, 3000);
  }
  const emailButton = document.getElementById('copy-email');
  emailButton?.addEventListener('click', () => copyText(emailButton.dataset.email, emailButton));
  document.querySelectorAll('.copy-citation').forEach(button => {
    button.addEventListener('click', () => copyText(button.parentElement.querySelector('code').textContent, button));
  });
  const links = [...document.querySelectorAll('nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let pending = false;
  function updateNavigation() {
    const offset = (document.querySelector('.site-header')?.offsetHeight || 0) + 80;
    let active = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= offset) active = section; });
    links.forEach(link => {
      if (link.getAttribute('href') === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    pending = false;
  }
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; window.requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
})();
