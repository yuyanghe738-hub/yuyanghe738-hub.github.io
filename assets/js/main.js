/* Academic homepage — theme toggle, TOC scrollspy, cursor pet */
(function () {
  const STORAGE_THEME = 'site-theme';

  /* ---------- Theme toggle ---------- */
  const themeBtn = document.getElementById('theme-toggle');
  const setTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_THEME, theme);
    if (themeBtn) {
      const icon = themeBtn.querySelector('.theme-icon');
      if (icon) icon.textContent = theme === 'dark' ? '◑' : '◐';
    }
  };
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(localStorage.getItem(STORAGE_THEME) || (prefersDark ? 'dark' : 'light'));
  if (themeBtn) {
    themeBtn.addEventListener('click', () =>
      setTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));
  }

  /* ---------- TOC scrollspy ---------- */
  const tocLinks = Array.from(document.querySelectorAll('[data-toc]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const ids = tocLinks.map(a => a.getAttribute('data-toc'));
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);

    const setActive = (id) => {
      tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('data-toc') === id));
    };
    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
        else visible.delete(e.target.id);
      });
      let best = null, bestRatio = -1;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { best = id; bestRatio = ratio; }
      });
      if (best) setActive(best);
    }, { rootMargin: '-90px 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(s => io.observe(s));
    if (sections[0]) setActive(sections[0].id);
  }

  /* ---------- Cursor-follower Pikachu ---------- */
  const pet = document.querySelector('.cursor-pet');
  if (pet && window.matchMedia('(hover: hover)').matches) {
    const size = pet.offsetWidth || 56;
    const offsetX = 22;   // pixels right of the cursor
    const offsetY = 14;   // pixels below the cursor
    const ease = 0.14;    // smoothing — lower = lazier follow

    let targetX = -200, targetY = -200;
    let x = targetX, y = targetY;
    let active = false;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX + offsetX;
      targetY = e.clientY + offsetY;
      if (!active) {
        x = targetX; y = targetY;
        active = true;
        pet.classList.add('visible');
      }
    });
    document.addEventListener('mouseleave', () => {
      pet.classList.remove('visible');
    });
    document.addEventListener('mouseenter', () => {
      if (active) pet.classList.add('visible');
    });

    const tick = () => {
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      // small bobbing — sine wave on time, ~2 px amplitude
      const bob = Math.sin(performance.now() / 280) * 2;
      // flip pikachu horizontally based on movement direction
      const dir = targetX < x - 0.3 ? -1 : 1;
      pet.style.transform =
        `translate3d(${(x - size / 2).toFixed(1)}px, ${(y - size / 2 + bob).toFixed(1)}px, 0) scaleX(${dir})`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();
