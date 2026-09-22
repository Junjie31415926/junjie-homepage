(() => {
  'use strict';

  const sidebar = document.querySelector('.identity');
  if (!sidebar) return;

  const desktop = window.matchMedia('(min-width: 821px)');
  const edge = 24;
  let pendingFrame = 0;

  function updateOffset() {
    pendingFrame = 0;
    if (!desktop.matches) {
      sidebar.style.removeProperty('--sidebar-offset');
      return;
    }

    // A tall sidebar scrolls with the page until its lower links fit, then sticks.
    // A sidebar that fits stays 24px below the viewport top. No nested scroller.
    const sidebarHeight = sidebar.getBoundingClientRect().height;
    const offset = Math.min(edge, window.innerHeight - sidebarHeight - edge);
    sidebar.style.setProperty('--sidebar-offset', `${Math.floor(offset)}px`);
  }

  function scheduleUpdate() {
    if (!pendingFrame) pendingFrame = window.requestAnimationFrame(updateOffset);
  }

  window.addEventListener('resize', scheduleUpdate, { passive: true });
  desktop.addEventListener('change', scheduleUpdate);

  if ('ResizeObserver' in window) {
    const observer = new window.ResizeObserver(scheduleUpdate);
    observer.observe(sidebar);
  }

  if (document.fonts) document.fonts.ready.then(scheduleUpdate);
  sidebar.querySelectorAll('img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', scheduleUpdate, { once: true });
  });

  updateOffset();
})();
