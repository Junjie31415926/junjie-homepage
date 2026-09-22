(() => {
  'use strict';

  // Every document load starts at About. Section links work after arrival.
  // Some embedded browsers restore position after pageshow, so also catch
  // delayed restoration during a short startup window, until the user acts.
  const root = document.documentElement;
  let active = true;
  let expiry;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) {
    history.replaceState(history.state, '', location.pathname + location.search);
  }
  root.style.setProperty('scroll-behavior', 'auto');

  function finish() {
    active = false;
    window.clearTimeout(expiry);
    root.style.removeProperty('scroll-behavior');
  }

  function showAbout() {
    if (!active) return;
    if (location.hash) {
      finish();
      return;
    }
    const scroller = document.scrollingElement;
    if (scroller) {
      scroller.scrollTop = 0;
      scroller.scrollLeft = 0;
    }
    if (window.scrollY || window.scrollX) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }

  for (const event of ['pointerdown', 'wheel', 'touchstart']) {
    window.addEventListener(event, finish, { passive: true });
  }
  window.addEventListener('keydown', (event) => {
    if (!event.metaKey && !event.ctrlKey && !event.altKey &&
        ['Tab', 'Enter', ' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
      finish();
    }
  });
  window.addEventListener('hashchange', finish);
  window.addEventListener('scroll', showAbout, { passive: true });
  document.addEventListener('DOMContentLoaded', showAbout, { once: true });
  window.addEventListener('load', showAbout, { once: true });
  window.addEventListener('pageshow', (event) => {
    // Returning from the page cache should retain the user's reading position.
    if (event.persisted) return;
    showAbout();
    window.requestAnimationFrame(showAbout);
    if (active) expiry = window.setTimeout(finish, 1500);
  }, { once: true });
  if (document.fonts) document.fonts.ready.then(showAbout);
  showAbout();
})();
