// Bilingual legal pages: French by default, English with ?lang=en.
// Loaded in <head>, after <title>, so the right language shows from the first paint.
// Without this script, both languages show one after the other.
(function () {
  var root = document.documentElement;
  var titles = { fr: document.title, en: root.getAttribute('data-title-en') || document.title };
  var lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fr';

  function apply() {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    document.title = titles[lang];
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
  }

  apply();
  document.addEventListener('DOMContentLoaded', function () {
    apply();
    document.addEventListener('click', function (e) {
      var button = e.target.closest('[data-set-lang]');
      if (!button) return;
      lang = button.getAttribute('data-set-lang');
      apply();
      var url = new URL(location.href);
      if (lang === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    });
  });
})();
