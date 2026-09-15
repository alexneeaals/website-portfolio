/* ------------------------------------------------------------------
   terrabook.js — страница «Террабук».

   Одиночные строки заполняет i18n.js по data-i18n, а списки —
   параметры, дисциплины, структура, результат и эффект — собираются
   здесь из словаря tb в content.js. Перерисовываемся на каждое
   событие langchange: оно приходит и при первой загрузке.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };

  function esc(s) {
    return String(window.typo(String(s))).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function num(i) { return String(i + 1).padStart(2, '0'); }

  function t(key) { return I18N.t('tb.' + key); }

  function fill(sel, html) {
    var host = $(sel);
    if (host) host.innerHTML = html;
    return host;
  }

  function render() {
    fill('#tb-meta', t('meta').map(function (m) {
      return '<div><span class="label" style="display:block;margin-bottom:6px">' + esc(m.l) + '</span>' +
             '<span class="pd-meta__v">' + esc(m.v) + '</span></div>';
    }).join(''));

    fill('#tb-disc', t('disciplines').map(function (d, i) {
      return '<li><span>' + num(i) + '</span>' + esc(d) + '</li>';
    }).join(''));

    var struct = fill('#tb-struct', t('struct').map(function (b, i) {
      return '<div class="tb-block">' +
               '<span class="tb-block__n">' + num(i) + '</span>' +
               '<h3 class="tb-block__t">' + esc(b.t) + '</h3>' +
               '<ul>' + b.p.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
             '</div>';
    }).join(''));

    var get = fill('#tb-get', t('get').map(function (g) {
      return '<div class="tb-get__i">' +
               '<p class="tb-get__t">' + esc(g.t) + '</p>' +
               '<p class="tb-get__d">' + esc(g.d) + '</p>' +
             '</div>';
    }).join(''));

    /* Если у пункта нет цифры, ставим фирменную точку, а не номер:
       «03» рядом с «98%» читалось бы как ещё один показатель */
    var why = fill('#tb-why', t('why').map(function (w) {
      return '<div class="tb-why__i">' +
               (w.v ? '<span class="tb-why__v">' + esc(w.v) + '</span>'
                    : '<span class="tb-why__v tb-why__v--mark" aria-hidden="true"><i></i></span>') +
               '<span class="tb-why__t">' + esc(w.t) + '</span>' +
               '<p class="tb-why__d">' + esc(w.d) + '</p>' +
             '</div>';
    }).join(''));

    // Кнопки «Обсудить» ведут на форму главной с выбранным пунктом
    var href = '/?product=' + encodeURIComponent(t('pick')) + '#contact';
    document.querySelectorAll('[data-tb-cta]').forEach(function (a) { a.href = href; });

    var cover = $('#tb-cover');
    if (cover) cover.alt = t('coverAlt');

    I18N.setMeta(t('metaTitle'), t('metaDesc'));

    if (struct) MOTION.stagger(struct, '.tb-block', 70);
    if (get) MOTION.stagger(get, '.tb-get__i', 60);
    if (why) MOTION.stagger(why, '.tb-why__i', 70);
    MOTION.reveal();
  }

  document.addEventListener('langchange', render);
})();
