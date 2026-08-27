/* ------------------------------------------------------------------
   motion.js — анимация: курсор, параллакс за мышью, появление при
   скролле, магнитные ссылки, счётчики.

   Всё держится на transform/opacity и одном rAF-цикле, чтобы не
   провоцировать пересчёт layout. При prefers-reduced-motion и на
   тач-устройствах интерактивная часть не инициализируется вовсе.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ------------------- Появление блоков при скролле -------------------
     Наблюдатели живут на уровне модуля и пересоздаются при каждом
     вызове: при переключении языка блоки перерисовываются, и старый
     observer держал бы ссылки на уже удалённые узлы. */
  var revealIO = null;

  function reveal() {
    var items = document.querySelectorAll('.rv, .panel');
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (revealIO) revealIO.disconnect();

    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        show(e.target);
        revealIO.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    function show(el) {
      // Каскад внутри одной группы: элементы с общим родителем
      var delay = parseFloat(el.dataset.rvDelay || 0);
      setTimeout(function () { el.classList.add('is-in'); }, delay);
    }

    items.forEach(function (el) { revealIO.observe(el); });

    /* Страховка. Наблюдатель сообщает о пересечении не сразу, а иногда —
       если блок перерисовали и он уже стоит в кадре — не сообщает вовсе.
       Тогда контент остаётся невидимым: именно так пропадали плитки
       портфолио после переключения категории. Поэтому всё, что уже
       попало в окно, показываем сами, не дожидаясь наблюдателя. */
    function sweep() {
      var h = window.innerHeight || document.documentElement.clientHeight;
      items.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.height === 0 && r.width === 0) return;      // скрытый блок
        if (r.top < h && r.bottom > 0) {
          show(el);
          revealIO.unobserve(el);
        }
      });
    }

    sweep();                          // сразу, пока вкладка активна
    requestAnimationFrame(sweep);     // и ещё раз, когда вёрстка устаканилась

    /* В фоновой вкладке размеры окна равны нулю, наблюдатель молчит,
       и страница может остаться невидимой. Возвращаемся — пересчитываем. */
    document.addEventListener('visibilitychange', function onVis() {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVis);
      sweep();
    });
  }

  /** Расставляет ступенчатую задержку детям контейнера. */
  function stagger(container, sel, step) {
    var kids = container.querySelectorAll(sel);
    kids.forEach(function (el, i) {
      el.classList.add('rv');
      el.dataset.rvDelay = String(i * (step || 60));
    });
  }

  /* -------------------------- Счётчики -------------------------- */
  var countIO = null;

  function counters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) return;
    if (countIO) countIO.disconnect();

    countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        countIO.unobserve(el);

        // «60+», «67,21 га», «∞» — анимируем только ведущее число,
        // хвост (знаки, единицы) оставляем как есть.
        var raw = el.textContent.trim();
        var m = raw.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
        if (!m) return;
        var target = parseFloat(m[1].replace(',', '.'));
        var decimals = (m[1].split(/[.,]/)[1] || '').length;
        var sep = m[1].indexOf(',') > -1 ? ',' : '.';
        var tail = m[2];
        var t0 = performance.now();
        var dur = 1100;

        (function tick(now) {
          var p = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          var v = (target * eased).toFixed(decimals);
          if (decimals) v = v.replace('.', sep);
          el.textContent = v + tail;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { countIO.observe(el); });
  }

  /* ------------- Курсор + параллакс коллажа + магнитные ссылки ------------- */
  function pointer() {
    if (reduce || !fine) return;

    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'cursor';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;   // цель
    var rx = mx, ry = my;                                          // кольцо (с отставанием)

    // Нормализованное смещение мыши от центра, -1…1
    var nx = 0, ny = 0, cnx = 0, cny = 0;

    var layers = [].map.call(document.querySelectorAll('[data-parallax]'), function (el) {
      return { el: el, depth: parseFloat(el.dataset.parallax) || 1, base: el.style.transform || '' };
    });

    var magnets = [].map.call(document.querySelectorAll('[data-magnet]'), function (el) {
      return { el: el, x: 0, y: 0, tx: 0, ty: 0 };
    });

    document.body.classList.add('has-cursor');

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      nx = (mx / window.innerWidth - 0.5) * 2;
      ny = (my / window.innerHeight - 0.5) * 2;

      magnets.forEach(function (m) {
        var r = m.el.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var dx = mx - cx, dy = my - cy;
        var dist = Math.hypot(dx, dy);
        var reach = Math.max(r.width, r.height) * 1.1 + 40;
        if (dist < reach) {
          m.tx = dx * 0.16;
          m.ty = dy * 0.16;
        } else {
          m.tx = 0; m.ty = 0;
        }
      });
    }, { passive: true });

    document.addEventListener('mouseleave', function () { document.body.classList.remove('has-cursor'); });
    document.addEventListener('mouseenter', function () { document.body.classList.add('has-cursor'); });

    // Кольцо расширяется над интерактивным
    var hoverables = 'a, button, .work, .sector, .chip, input, select, textarea, .lang__btn';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverables)) document.body.classList.add('cursor-lg');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverables)) document.body.classList.remove('cursor-lg');
    });

    (function frame() {
      // Курсор: точка мгновенно, кольцо — с отставанием
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';

      // Параллакс коллажа
      cnx = lerp(cnx, nx, 0.06);
      cny = lerp(cny, ny, 0.06);
      layers.forEach(function (l) {
        var dx = -cnx * 16 * l.depth;
        var dy = -cny * 16 * l.depth;
        l.el.style.transform = l.base + ' translate3d(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px,0)';
      });

      // Магнитные ссылки
      magnets.forEach(function (m) {
        m.x = lerp(m.x, m.tx, 0.14);
        m.y = lerp(m.y, m.ty, 0.14);
        m.el.style.transform = 'translate(' + m.x.toFixed(2) + 'px,' + m.y.toFixed(2) + 'px)';
      });

      requestAnimationFrame(frame);
    })();
  }

  /* ----------------------- Шапка при скролле ----------------------- */
  function topbar() {
    var bar = document.querySelector('.topbar');
    if (!bar) return;
    var on = false;
    var check = function () {
      var should = window.scrollY > 40;
      if (should !== on) { on = should; bar.classList.toggle('is-stuck', on); }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
  }

  /* ------------------------ Мобильное меню ------------------------ */
  function menu() {
    var burger = document.querySelector('.burger');
    if (!burger) return;
    burger.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
    document.querySelectorAll('.nav--mobile .nav__link').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
    });
  }

  /* ------- Якорный скролл с поправкой на высоту шапки ------- */
  function anchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      document.body.classList.remove('menu-open');
      var bar = document.querySelector('.topbar');
      var offset = bar ? bar.offsetHeight + 12 : 0;
      var y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  window.MOTION = { reveal: reveal, stagger: stagger, counters: counters, reduce: reduce };

  document.addEventListener('DOMContentLoaded', function () {
    topbar();
    menu();
    anchors();
  });

  // Курсор и параллакс поднимаем после полной загрузки — к этому моменту
  // main.js уже отрисовал динамические блоки с data-magnet.
  window.addEventListener('load', function () { pointer(); });
})();
