/* ------------------------------------------------------------------
   project.js — рендер страницы кейса.

   Страница-оболочка задаёт только window.PROJECT_SLUG, всё остальное
   собирается здесь из window.PROJECTS. Пути к ассетам на один уровень
   выше, потому что кейсы лежат в /projects/.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  var slug = window.PROJECT_SLUG;
  var index = window.PROJECTS.findIndex(function (p) { return p.slug === slug; });
  var project = window.PROJECTS[index];

  function render() {
    var host = $('#case');
    if (!host) return;

    if (!project) {
      host.innerHTML = '<div class="shell section"><p class="lede">' + esc(I18N.t('project.notFound')) + '</p></div>';
      return;
    }

    var lang = I18N.lang;
    var c = project[lang];
    var t = function (k) { return esc(I18N.t('project.' + k)); };
    var base = '../assets/img/projects/' + project.dir + '/';
    var client = (lang === 'en' && project.clientEn) ? project.clientEn : project.client;

    var html = '';

    /* ---------- Обложка ---------- */
    html +=
      '<header class="case-hero">' +
        '<div class="shell">' +
          '<span class="label label--accent case-hero__label">' + t('caseLabel') + '</span>' +
          '<h1 class="case-hero__title">' + esc(c.title) + '</h1>' +
          '<div class="case-hero__sub">' + esc(c.kicker) + '</div>' +
          '<div class="case-hero__rule"><i></i><b></b><i></i></div>' +
          '<div class="case-meta">' +
            '<div class="case-meta__item"><span class="label">' + t('year') + '</span><span>' + esc(project.year) + '</span></div>' +
            '<div class="case-meta__item"><span class="label">' + t('location') + '</span><span>' + esc(c.location) + '</span></div>' +
            '<div class="case-meta__item"><span class="label">' + t('client') + '</span><span>' + esc(client) + '</span></div>' +
          '</div>' +
        '</div>' +
      '</header>';

    /* ---------- Крупный кадр ---------- */
    html +=
      '<div class="shell rv">' +
        '<figure class="case-cover">' +
          '<img src="' + base + project.images[0] + '" alt="' + esc(c.title) + '">' +
        '</figure>' +
      '</div>';

    /* ---------- Задача и вызов ---------- */
    html +=
      '<section class="section shell">' +
        '<div class="case-text">' +
          '<div class="case-text__block rv">' +
            '<span class="label label--accent">' + t('task') + '</span>' +
            '<div class="case-text__quote"><p>' + esc(c.summary) + '</p></div>' +
            '<p style="margin-top:22px">' + esc(c.task) + '</p>' +
          '</div>' +
          '<div class="case-text__block rv" data-rv-delay="120">' +
            '<span class="label label--accent">' + t('challenge') + '</span>' +
            '<p>' + esc(c.challenge) + '</p>' +
            '<span class="label label--accent" style="display:block;margin:34px 0 14px">' + t('solution') + '</span>' +
            '<p>' + esc(c.solution) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>';

    /* ---------- Ключевые показатели (только если есть реальные цифры) ---------- */
    if (c.metrics && c.metrics.length) {
      html +=
        '<section class="section section--ivory">' +
          '<div class="shell">' +
            '<div class="section-head rv">' +
              '<div class="tick"></div>' +
              '<span class="label">' + t('metrics') + '</span>' +
            '</div>' +
            '<div class="case-metrics">' +
              c.metrics.map(function (m, i) {
                return '<div class="metric rv" data-rv-delay="' + (i * 90) + '">' +
                  '<span class="metric__v">' + esc(m.v) + '</span>' +
                  '<span class="metric__l">' + esc(m.l) + '</span>' +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</section>';
    }

    /* ---------- Галерея ---------- */
    if (project.images.length > 1) {
      html +=
        '<section class="section shell">' +
          '<div class="section-head rv">' +
            '<div class="tick"></div>' +
            '<h2 class="h-section">' + t('gallery') + '</h2>' +
          '</div>' +
          '<div class="case-gallery">' +
            project.images.slice(1).map(function (img, i) {
              var cap = (c.captions && c.captions[i + 1]) || '';
              return '<figure class="shot rv" data-rv-delay="' + (i % 3 * 80) + '">' +
                '<div class="shot__media"><img src="' + base + img + '" alt="' + esc(cap || c.title) + '" loading="lazy"></div>' +
                (cap ? '<figcaption class="shot__cap">' + esc(cap) + '</figcaption>' : '') +
              '</figure>';
            }).join('') +
          '</div>' +
        '</section>';
    }

    /* ---------- Результат ---------- */
    html +=
      '<section class="section section--ivory">' +
        '<div class="shell">' +
          '<div class="section-head rv" style="max-width:900px">' +
            '<div class="tick"></div>' +
            '<span class="label label--accent" style="display:block;margin-bottom:18px">' + t('result') + '</span>' +
            '<p class="lede">' + esc(c.result) + '</p>' +
          '</div>' +
          '<div class="chips rv" style="margin-top:12px">' +
            '<span class="label" style="width:100%;margin-bottom:10px">' + t('services') + '</span>' +
            c.tags.map(function (tag) { return '<span class="chip">' + esc(tag) + '</span>'; }).join('') +
          '</div>' +
        '</div>' +
      '</section>';

    /* ---------- Предыдущий / следующий ---------- */
    var prev = window.PROJECTS[(index - 1 + window.PROJECTS.length) % window.PROJECTS.length];
    var next = window.PROJECTS[(index + 1) % window.PROJECTS.length];

    html +=
      '<div class="shell">' +
        '<nav class="case-nav">' +
          '<a href="' + prev.slug + '.html">' +
            '<span class="label">' + esc(I18N.t('work.prev')) + '</span>' +
            '<b>' + esc(prev[lang].title) + '</b>' +
          '</a>' +
          '<a class="case-nav__next" href="' + next.slug + '.html">' +
            '<span class="label">' + esc(I18N.t('work.next')) + '</span>' +
            '<b>' + esc(next[lang].title) + '</b>' +
          '</a>' +
        '</nav>' +
      '</div>';

    host.innerHTML = html;

    // Заголовок вкладки и превью при шеринге — на языке страницы
    I18N.setMeta(c.title + ' — ' + I18N.t('meta.title'), c.summary);

    MOTION.reveal();
  }

  document.addEventListener('DOMContentLoaded', render);
  document.addEventListener('langchange', render);
})();
