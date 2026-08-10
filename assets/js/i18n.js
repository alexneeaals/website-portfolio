/* ------------------------------------------------------------------
   i18n.js — переключение RU/EN без перезагрузки страницы.

   Статические строки размечаются в HTML:
     <span data-i18n="hero.role"></span>
     <input data-i18n-attr="placeholder:contact.namePh">
   Списки и повторяющиеся блоки рендерят main.js / project.js,
   подписавшись на событие 'langchange'.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  var STORE = 'sn-lang';
  var SUPPORTED = ['ru', 'en'];

  /* ---------------------- Типографика ----------------------
     Короткие слова (предлоги, союзы, местоимения) нельзя оставлять
     в конце строки — приклеиваем их к следующему слову неразрывным
     пробелом. Тире, наоборот, не должно начинать строку, поэтому
     привязываем его к предыдущему слову.                        */

  var SHORT = ('а и но да или же ли бы не ни во ко со об обо из изо от ото при для над под про без ' +
               'в к с о у за на по до я мы вы он она они то та тот те как что чем где чтобы ' +
               'мой моя моё мои ваш ваша ваше ваши это эти этот та так уже ещё' +
               ' a an the in on at to of for and or but by as is it we i my our your so if no not' +
               ' from with into via per').split(' ');

  var NBSP = '\u00A0';

  var SHORT_SET = Object.create(null);
  SHORT.forEach(function (w) { SHORT_SET[w] = true; });

  /** Расставляет неразрывные пробелы. Возвращает строку как есть,
      если на входе не строка (в словаре есть массивы и объекты). */
  function typo(s) {
    if (typeof s !== 'string' || s.indexOf(' ') < 0) return s;

    var parts = s.split(' ');
    var out = parts[0];

    for (var i = 1; i < parts.length; i++) {
      var prev = parts[i - 1].replace(/[^0-9A-Za-zА-Яа-яЁё]/g, '').toLowerCase();
      var startsWithDash = /^[—–-]/.test(parts[i]);
      // тире притягиваем назад, короткое слово — вперёд
      var glue = startsWithDash || SHORT_SET[prev];
      out += (glue ? NBSP : ' ') + parts[i];
    }
    return out;
  }

  window.typo = typo;

  function detect() {
    try {
      var saved = localStorage.getItem(STORE);
      if (SUPPORTED.indexOf(saved) > -1) return saved;
    } catch (e) { /* приватный режим — просто идём дальше */ }

    var nav = (navigator.language || 'ru').slice(0, 2).toLowerCase();
    return nav === 'ru' ? 'ru' : 'en';
  }

  /** Достаёт значение по пути 'contact.typeOptions' из словаря языка. */
  function resolve(lang, path) {
    var node = window.CONTENT[lang];
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  var I18N = {
    lang: detect(),

    /** t('hero.role') → строка текущего языка. */
    t: function (path) {
      var v = resolve(this.lang, path);
      if (v === undefined) {
        // Не роняем страницу — показываем ключ и сообщаем в консоль.
        console.warn('[i18n] нет ключа:', path, '(' + this.lang + ')');
        return path;
      }
      return v;
    },

    setLang: function (lang) {
      if (SUPPORTED.indexOf(lang) < 0 || lang === this.lang) return;
      this.lang = lang;
      try { localStorage.setItem(STORE, lang); } catch (e) {}
      this.apply();
    },

    /** Проставляет все статические строки и уведомляет динамические блоки. */
    apply: function () {
      var lang = this.lang;
      document.documentElement.setAttribute('lang', lang);

      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var v = resolve(lang, el.getAttribute('data-i18n'));
        if (typeof v === 'string') el.textContent = typo(v);
        else console.warn('[i18n] нет ключа:', el.getAttribute('data-i18n'));
      });

      // data-i18n-attr="placeholder:contact.namePh" (можно несколько через ;)
      document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
        el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
          var bits = pair.split(':');
          if (bits.length < 2) return;
          var v = resolve(lang, bits[1].trim());
          if (typeof v === 'string') el.setAttribute(bits[0].trim(), v);
        });
      });

      // Тумблер
      var toggle = document.querySelector('.lang');
      if (toggle) {
        toggle.setAttribute('data-lang', lang);
        toggle.querySelectorAll('.lang__btn').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
        });
      }

      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    },

    /** Обновляет <title> и мета-описание (страницы кейсов зовут со своим текстом). */
    setMeta: function (title, desc) {
      document.title = title;
      [['meta[name="description"]', 'content', desc],
       ['meta[property="og:title"]', 'content', title],
       ['meta[property="og:description"]', 'content', desc]].forEach(function (m) {
        var el = document.querySelector(m[0]);
        if (el && m[2]) el.setAttribute(m[1], m[2]);
      });
    }
  };

  window.I18N = I18N;

  // Тумблер и первичная отрисовка
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang__btn').forEach(function (btn) {
      btn.addEventListener('click', function () { I18N.setLang(btn.dataset.lang); });
    });
    I18N.apply();
  });
})();
