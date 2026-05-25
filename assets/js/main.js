/* Academic homepage — language toggle, theme toggle, TOC scrollspy */
(function () {
  const STORAGE_LANG  = 'site-lang';
  const STORAGE_THEME = 'site-theme';

  /* ---------- Language toggle ---------- */
  const langBtn = document.getElementById('lang-toggle');
  const setLang = (lang) => {
    document.body.classList.remove('lang-en', 'lang-zh');
    document.body.classList.add('lang-' + lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    localStorage.setItem(STORAGE_LANG, lang);
  };
  const savedLang = localStorage.getItem(STORAGE_LANG)
    || (navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');
  setLang(savedLang);
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      setLang(document.body.classList.contains('lang-en') ? 'zh' : 'en');
    });
  }

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
  const savedTheme = localStorage.getItem(STORAGE_THEME) || (prefersDark ? 'dark' : 'light');
  setTheme(savedTheme);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
    });
  }

  /* ---------- TOC scrollspy ---------- */
  const tocLinks = Array.from(document.querySelectorAll('[data-toc]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const sectionIds = tocLinks.map(a => a.getAttribute('data-toc'));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const setActive = (id) => {
      tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('data-toc') === id));
    };

    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible.set(entry.target.id, entry.intersectionRatio);
        } else {
          visible.delete(entry.target.id);
        }
      });
      let best = null, bestRatio = -1;
      visible.forEach((ratio, id) => {
        const idx = sectionIds.indexOf(id);
        if (ratio > bestRatio || (ratio === bestRatio && idx < sectionIds.indexOf(best))) {
          best = id; bestRatio = ratio;
        }
      });
      if (best) setActive(best);
    }, { rootMargin: '-90px 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });

    sections.forEach(s => io.observe(s));
    if (sections[0]) setActive(sections[0].id);
  }
})();
