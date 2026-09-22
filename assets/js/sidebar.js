(() => {
  'use strict';

  const sidebar = document.querySelector('.identity');
  if (!sidebar) return;
  const layout = sidebar.closest('.scholar-layout');
  if (!layout) return;

  const desktop = window.matchMedia('(min-width: 821px)');
  const edge = 24;
  const top = 48;
  let pendingFrame = 0;

  function updateOffset() {
    pendingFrame = 0;
    if (!desktop.matches) {
      sidebar.classList.remove('is-fixed');
      sidebar.style.removeProperty('--sidebar-offset');
      sidebar.style.removeProperty('--sidebar-left');
      return;
    }

    // Fix a profile that fits at its original top/left coordinates. This avoids
    // both the initial sticky slide and the sticky boundary shift at the footer.
    // Tall profiles may scroll with the page so every link remains reachable.
    const sidebarHeight = sidebar.getBoundingClientRect().height;
    const fits = sidebarHeight + top <= window.innerHeight;
    sidebar.style.setProperty('--sidebar-left', `${layout.getBoundingClientRect().left}px`);
    sidebar.classList.toggle('is-fixed', fits);
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
