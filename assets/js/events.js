/* ------------------------------------------------------------------
   events.js — страница «Режиссура событий».

   Одиночные строки заполняет i18n.js по data-i18n, списки собираются
   здесь из словаря ev в content.js. Разметка намеренно переиспользует
   классы главной и страницы Террабука: grow, tb-struct, tb-get, svc,
   works — своих стилей у страницы почти нет.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };

  function esc(s) {
    return String(window.typo(String(s))).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  /** Экранирование для адресов и подписей: без typo(), иначе в путь
      попадут неразрывные пробелы. */
  function attr(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function num(i) { return String(i + 1).padStart(2, '0'); }
  function t(key) { return I18N.t('ev.' + key); }

  function fill(sel, html) {
    var host = $(sel);
    if (host) host.innerHTML = html;
    return host;
  }

  function render() {
    fill('#ev-meta', t('meta').map(function (m) {
      return '<div><span class="label" style="display:block;margin-bottom:6px">' + esc(m.l) + '</span>' +
             '<span class="pd-meta__v">' + esc(m.v) + '</span></div>';
    }).join(''));

    var metrics = fill('#ev-metrics', t('metrics').map(function (m) {
      return '<article class="grow__i">' +
               '<span class="grow__arr" aria-hidden="true">↑</span>' +
               '<h3 class="grow__t">' + esc(m.t) + '</h3>' +
               '<p class="grow__d">' + esc(m.d) + '</p>' +
             '</article>';
    }).join(''));

    fill('#ev-tags', t('withTags').map(function (x) {
      return '<span class="chip">' + esc(x) + '</span>';
    }).join(''));

    var what = fill('#ev-what', t('what').map(function (b, i) {
      return '<div class="tb-block">' +
               '<span class="tb-block__n">' + num(i) + '</span>' +
               '<h3 class="tb-block__t">' + esc(b.t) + '</h3>' +
               '<ul>' + b.p.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
             '</div>';
    }).join(''));

    var book = fill('#ev-book', t('book').map(function (b) {
      return '<div class="tb-get__i">' +
               '<p class="tb-get__t">' + esc(b.t) + '</p>' +
               '<p class="tb-get__d">' + esc(b.d) + '</p>' +
             '</div>';
    }).join(''));

    /* Форматы работы — те же строки «как в меню», что у услуг главной */
    var L = { inc: esc(t('incLabel')), time: esc(t('timeLabel')), price: esc(t('priceLabel')), cta: esc(t('cta')) };
    var href = '/?product=' + encodeURIComponent(t('pick')) + '#contact';

    var formats = fill('#ev-formats', t('formats').map(function (f, i) {
      return '<article class="svc__row">' +
               '<div class="svc__head">' +
                 '<span class="svc__n">' + num(i) + '</span>' +
                 '<h3 class="svc__t">' + esc(f.t) + '</h3>' +
               '</div>' +
               '<div class="svc__body">' +
                 '<p class="svc__d">' + esc(f.d) + '</p>' +
                 '<span class="label">' + L.inc + '</span>' +
                 '<ul class="svc__inc">' + f.inc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
               '</div>' +
               '<div class="svc__side">' +
                 '<div class="svc__meta"><span class="label">' + L.time + '</span><b>' + esc(f.time) + '</b></div>' +
                 '<div class="svc__meta"><span class="label">' + L.price + '</span><b class="svc__price svc__price--ask">' + esc(f.price) + '</b></div>' +
                 '<div class="svc__acts"><a class="pbtn pbtn--solid" href="' + attr(href) + '">' + L.cta + '</a></div>' +
               '</div>' +
             '</article>';
    }).join(''));

    /* Проекты — галерея: кадр, название и описание. Отдельных страниц
       у событий пока нет, ссылка ставится только там, где есть кейс.
       Новое событие добавляется в ev.cases в content.js — в обоих языках. */
    var cases = fill('#ev-cases', t('cases').map(function (c) {
      return '<article class="evg__i">' +
               '<figure class="evg__media">' +
                 '<img src="' + attr(c.img) + '" alt="' + attr(c.t) + '" loading="lazy">' +
                 '<span class="evg__frame"></span>' +
               '</figure>' +
               '<h3 class="evg__t">' + esc(c.t) + '</h3>' +
               '<p class="evg__d">' + esc(c.d) + '</p>' +
               (c.href ? '<a class="evg__link" href="' + attr(c.href) + '">' + esc(c.hrefLabel || '') + '</a>' : '') +
             '</article>';
    }).join(''));

    var why = fill('#ev-why', t('why').map(function (w, i) {
      return '<article class="card">' +
               '<span class="card__n">' + num(i) + '</span>' +
               '<h3 class="h-card card__t">' + esc(w.t) + '</h3>' +
               '<p class="card__d">' + esc(w.d) + '</p>' +
             '</article>';
    }).join(''));

    document.querySelectorAll('[data-ev-cta]').forEach(function (a) { a.href = href; });

    var cover = $('#ev-cover');
    if (cover) cover.alt = t('coverAlt');

    I18N.setMeta(t('metaTitle'), t('metaDesc'));

    if (metrics) MOTION.stagger(metrics, '.grow__i', 50);
    if (what) MOTION.stagger(what, '.tb-block', 70);
    if (book) MOTION.stagger(book, '.tb-get__i', 60);
    if (formats) MOTION.stagger(formats, '.svc__row', 70);
    if (cases) MOTION.stagger(cases, '.evg__i', 80);
    if (why) MOTION.stagger(why, '.card', 70);
    MOTION.reveal();
  }

  document.addEventListener('langchange', render);
})();
