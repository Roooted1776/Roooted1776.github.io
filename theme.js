// Every open starts dark (home, store, and any page that loads this file).
// The header switch flips light/dark for the current page view.
(function () {
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var lastFlip = 0;

  function paint() {
    var on = root.dataset.theme === 'dark';
    if (meta) meta.setAttribute('content', on ? '#141011' : '#ffffff');
    var sw = document.getElementById('theme-toggle');
    if (sw) sw.setAttribute('aria-checked', on ? 'true' : 'false');
  }

  var ready = false;
  function apply(next) {
    if (ready && root.dataset.theme !== next) {
      // Swap every colour in one frame. Without this the page background fades over 250ms while
      // cards and text change at once, which shows mismatched patches in the corners and edges.
      root.classList.add('rm-theme-swap');
      void root.offsetWidth;
      setTimeout(function () { root.classList.remove('rm-theme-swap'); }, 80);
    }
    root.dataset.theme = next;
    try { localStorage.setItem('redmed-theme', next); } catch (e) {}
    paint();
  }

  apply('dark');

  // Safe to load twice (home loads this before and after its bundle).
  if (window.__rmTheme) return;
  window.__rmTheme = true;

  // One capture-phase listener on the document. It runs before any handler on the button itself,
  // including the home bundle's own toggle, and stops them, so one click flips the theme exactly once.
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest || !t.closest('#theme-toggle')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var now = Date.now();
    if (now - lastFlip < 200) return;
    lastFlip = now;
    apply(root.dataset.theme === 'dark' ? 'light' : 'dark');
  }, true);

  new MutationObserver(paint).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint);
  else paint();
  ready = true;
})();
