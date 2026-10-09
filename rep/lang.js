// Bilingual pages: French by default, English with ?lang=en.
// Loaded in <head>, after <title>, so the right language shows from the first paint.
// Elements carry data-l="fr" or data-l="en"; the stylesheet hides the other language.
// Without this script, pages stay in French and legal pages show both texts one after the other.
(function () {
  var root = document.documentElement;
  var titles = { fr: document.title, en: root.getAttribute('data-title-en') || document.title };
  var lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fr';

  // Links to the site's own pages carry the language along.
  function updateLinks() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (!/^[^:#?]*\.html(\?lang=en)?(#.*)?$/.test(href)) continue;
      var parts = href.split('#');
      var page = parts[0].replace('?lang=en', '') + (lang === 'en' ? '?lang=en' : '');
      links[i].setAttribute('href', parts.length > 1 ? page + '#' + parts[1] : page);
    }
  }

  function apply() {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    document.title = titles[lang];
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
    updateLinks();
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
