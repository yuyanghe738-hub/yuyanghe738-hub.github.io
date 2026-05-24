/* Academic homepage — small client-side helpers */
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
      const icon = themeBtn.querySelector('i');
      if (icon) icon.className = theme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
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

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  }
})();
