/* ------------------------------------------------------------------
   main.js — главная страница: рендер динамических блоков,
   слайдер «Карта компетенций» и форма обратной связи.
   ------------------------------------------------------------------ */

/* ===== Ключ доступа Web3Forms =====================================
   Получить бесплатно за пару минут на https://web3forms.com —
   там нужно указать почту, куда будут падать заявки, и сервис
   пришлёт ключ. Вставьте его между кавычками.
   Пока строка пустая, форма работает через почтовый клиент (mailto),
   так что сайт можно публиковать и без ключа.
   ================================================================= */
var WEB3FORMS_KEY = '';
var CONTACT_EMAIL = 'alexneeaals@gmail.com';

(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /** Экранирует и сразу расставляет неразрывные пробелы. */
  function esc(s) {
    return String(window.typo(String(s))).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function num(i) { return String(i + 1).padStart(2, '0'); }

  /* ==================================================================
     Сферы — свободный разброс по референсу.
     Два типа плашек: в рамке (сериф, бордо) и с подчёркиванием (санс).
     Координаты в процентах от холста, поворот в градусах.
     Порядок соответствует sectors.items в content.js.
     ================================================================== */
  var SECTOR_LAYOUT = [
    { x: 6,  y: 6,  rot: -2,   style: 'box'  },  // Туризм
    { x: 60, y: 10, rot: 3.5,  style: 'box'  },  // MICE
    { x: 14, y: 26, rot: 0,    style: 'line' },  // HoReCa
    { x: 44, y: 47, rot: 0,    style: 'line' },  // Девелопмент
    { x: 36, y: 24, rot: -1.5, style: 'box'  },  // Люксовые бренды
    { x: 73, y: 30, rot: 0,    style: 'line' },  // События
    { x: 33, y: 3,  rot: 0,    style: 'line' },  // Образование
    { x: 10, y: 45, rot: 4,    style: 'box'  },  // Фиджитал-системы
    { x: 64, y: 44, rot: -2.5, style: 'box'  },  // Косметика
    { x: 27, y: 66, rot: 1.8,  style: 'box'  }   // Креативные индустрии
  ];

  var SECTOR_SHOTS = [
    { src: 'assets/img/decor/arches.jpg',   x: 0,  y: 56, w: 11, rot: -3   },
    { src: 'assets/img/decor/cosmetic.jpg', x: 56, y: 64, w: 15, rot: 0.6  }
  ];

  function renderSectors() {
    var host = $('#sectors-scatter');
    if (!host) return;
    host.innerHTML = '';

    I18N.t('sectors.items').forEach(function (name, i) {
      var L = SECTOR_LAYOUT[i] || { x: 10 + (i % 4) * 20, y: 10 + Math.floor(i / 4) * 22, rot: 0, style: 'box' };
      // Координаты через переменные, а не напрямую в left/top:
      // так медиазапрос может перестроить раскладку в обычный поток.
      host.appendChild(el(
        '<span class="sector sector--' + L.style + '"' +
          ' style="--x:' + L.x + '%;--y:' + L.y + '%;--rot:' + L.rot + 'deg">' +
          esc(name) +
        '</span>'
      ));
    });

    SECTOR_SHOTS.forEach(function (s) {
      host.appendChild(el(
        '<figure class="scatter-shot"' +
          ' style="--x:' + s.x + '%;--y:' + s.y + '%;--w:' + s.w + '%;--rot:' + s.rot + 'deg"' +
          ' data-parallax="0.7">' +
          '<img src="' + s.src + '" alt="" loading="lazy">' +
        '</figure>'
      ));
    });
  }

  /* ==================== Карточки и списки ==================== */

  function renderCards(hostSel, key) {
    var host = $(hostSel);
    if (!host) return;
    host.innerHTML = '';
    I18N.t(key).forEach(function (it, i) {
      host.appendChild(el(
        '<article class="card">' +
          '<span class="card__n">' + num(i) + '</span>' +
          '<h3 class="h-card card__t">' + esc(it.t) + '</h3>' +
          '<p class="card__d">' + esc(it.d) + '</p>' +
        '</article>'
      ));
    });
    MOTION.stagger(host, '.card', 70);
  }

  function renderBadges() {
    var host = $('#why-badges');
    if (!host) return;
    host.innerHTML = '';
    I18N.t('why.badges').forEach(function (b) {
      host.appendChild(el('<span class="badge">' + esc(b) + '</span>'));
    });
  }

  function renderSteps() {
    var host = $('#process-steps');
    if (!host) return;
    host.innerHTML = '';
    I18N.t('process.items').forEach(function (s, i) {
      host.appendChild(el(
        '<article class="step">' +
          '<span class="step__n">' + num(i) + '</span>' +
          '<h3 class="step__t">' + esc(s.t) + '</h3>' +
          '<p class="step__d">' + esc(s.d) + '</p>' +
        '</article>'
      ));
    });
    MOTION.stagger(host, '.step', 70);
  }

  /* ==================== Портфолио ==================== */

  function renderWorks() {
    var host = $('#works');
    if (!host) return;
    var lang = I18N.lang;
    host.innerHTML = '';

    window.PROJECTS.forEach(function (p) {
      var c = p[lang];
      // cover — отдельная картинка для плитки, если задана
      var tile = p.cover || p.images[0];
      host.appendChild(el(
        '<a class="work" href="projects/' + p.slug + '.html">' +
          '<div class="work__media">' +
            '<img src="assets/img/projects/' + p.dir + '/' + tile + '" alt="' + esc(c.title) + '" loading="lazy">' +
            '<span class="work__frame"></span>' +
          '</div>' +
          '<div class="work__body">' +
            '<div>' +
              '<h3 class="work__title">' + esc(c.title) + '</h3>' +
              '<div class="work__kicker">' + esc(c.kicker) + '</div>' +
            '</div>' +
            '<span class="work__year">' + esc(p.year) + '</span>' +
          '</div>' +
          '<span class="work__dot"></span>' +
        '</a>'
      ));
    });
    MOTION.stagger(host, '.work', 80);
  }

  /* ==================== Карта компетенций ==================== */

  /** Профиль компетенций: список направлений с тумблером, без цифр и оценок. */
  function renderSkills() {
    var host = $('#skills-list');
    if (!host) return;
    host.innerHTML = '';

    I18N.t('map.skills').forEach(function (name, i) {
      host.appendChild(el(
        '<div class="skill">' +
          '<span class="skill__name">' + esc(name) + '</span>' +
          '<span class="switch" style="transition-delay:' + (i * 90) + 'ms" aria-hidden="true">' +
            '<i class="switch__dot"></i>' +
          '</span>' +
        '</div>'
      ));
    });
  }

  function renderTools() {
    var host = $('#tools-list');
    if (!host) return;
    var levels = I18N.t('map.levels');
    host.innerHTML = '';

    I18N.t('map.tools').forEach(function (t, idx) {
      var meter = '';
      for (var i = 1; i <= 4; i++) {
        meter += '<i class="' + (i <= t.v ? 'on' : '') + '" style="transition-delay:' + (idx * 40 + i * 60) + 'ms"></i>';
      }
      host.appendChild(el(
        '<div class="tool">' +
          '<span class="tool__name">' + esc(t.name) +
            (t.ai ? '<span class="tool__ai">AI</span>' : '') +
          '</span>' +
          '<span class="meter" title="' + esc(levels[t.v - 1]) + '" aria-label="' + esc(t.name + ': ' + levels[t.v - 1]) + '">' + meter + '</span>' +
        '</div>'
      ));
    });
  }

  function renderEdu() {
    var host = $('#edu-timeline');
    if (!host) return;
    var inProgress = I18N.t('map.eduInProgress');
    host.innerHTML = '';

    I18N.t('map.edu').forEach(function (e) {
      host.appendChild(el(
        '<div class="tl' + (e.status === 'progress' ? ' tl--progress' : '') + '">' +
          '<span class="tl__years">' + esc(e.years) + '</span>' +
          '<span class="tl__place">' + esc(e.place) + '</span>' +
          '<span class="tl__what">' + esc(e.what) + '</span>' +
          '<span class="tl__deg' + (e.status === 'progress' ? ' tl__now' : '') + '">' +
            esc(e.status === 'progress' ? inProgress : e.deg) +
          '</span>' +
        '</div>'
      ));
    });
  }

  function renderLangs() {
    var host = $('#langs');
    if (!host) return;
    var C = 2 * Math.PI * 34;
    host.innerHTML = '';

    I18N.t('map.langs').forEach(function (l, i) {
      var offset = C * (1 - l.v);
      host.appendChild(el(
        '<div class="lang-item">' +
          '<svg class="ring" viewBox="0 0 76 76" aria-hidden="true">' +
            '<circle class="ring__bg" cx="38" cy="38" r="34"/>' +
            '<circle class="ring__fg" cx="38" cy="38" r="34" ' +
              'stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + C.toFixed(1) + '" ' +
              'data-offset="' + offset.toFixed(1) + '" style="transition-delay:' + (i * 180) + 'ms"/>' +
          '</svg>' +
          '<span class="lang-item__name">' + esc(l.name) + '</span>' +
          '<span class="lang-item__lvl">' + esc(l.level) + '</span>' +
        '</div>'
      ));
    });
  }

  function renderSoft() {
    var host = $('#soft-chips');
    if (!host) return;
    host.innerHTML = '';
    I18N.t('map.soft').forEach(function (s) {
      host.appendChild(el('<span class="chip">' + esc(s) + '</span>'));
    });
  }

  /** Слайдер: стрелки, точки, синхронизация с прокруткой. */
  function initSlider() {
    var track = $('#map-track');
    if (!track) return;
    var dotsHost = $('#map-dots');
    var slides = $$('.slide', track);
    if (!slides.length) return;

    // Текущую позицию держим отдельной переменной, а не вычисляем из
    // scrollLeft: прокрутка анимируется, и сразу после клика позиция ещё
    // старая — стрелки и точки успевали «отстать» на шаг.
    var current = 0;

    function step() {
      var a = slides[0].getBoundingClientRect();
      var b = slides[1] && slides[1].getBoundingClientRect();
      return b ? (b.left - a.left) : a.width;
    }

    /** Последняя достижимая позиция. На широком экране видно сразу
        несколько карточек, поэтому «страниц» меньше, чем слайдов —
        иначе крайние точки указывали бы на один и тот же край. */
    function lastIndex() {
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return 0;
      return Math.min(slides.length - 1, Math.ceil(maxScroll / step()));
    }

    /** Точек столько, сколько реальных положений — пересобираем при ресайзе. */
    function buildDots() {
      var need = lastIndex() + 1;
      if (dotsHost.children.length === need) return;
      dotsHost.innerHTML = '';
      for (var i = 0; i < need; i++) {
        (function (k) {
          var d = el('<button class="sdot" aria-label="' + (k + 1) + '"></button>');
          d.addEventListener('click', function () { goTo(k); });
          dotsHost.appendChild(d);
        })(i);
      }
    }

    function sync() {
      buildDots();
      var last = lastIndex();
      $$('.sdot', dotsHost).forEach(function (d, k) {
        d.classList.toggle('is-on', k === current);
      });
      $$('.sbtn', track.parentNode).forEach(function (b) {
        var dir = Number(b.dataset.dir);
        b.disabled = (dir < 0 && current === 0) || (dir > 0 && current === last);
      });
    }

    function goTo(i) {
      current = Math.max(0, Math.min(lastIndex(), i));
      // behavior намеренно не передаём: плавность задаёт CSS scroll-behavior,
      // он же выключается при prefers-reduced-motion.
      track.scrollTo({ left: current * step() });
      sync();
    }

    /** Свайп и колесо меняют позицию мимо goTo — подхватываем её. */
    function fromScroll() {
      var i = Math.round(track.scrollLeft / step());
      if (i !== current) { current = Math.max(0, Math.min(lastIndex(), i)); sync(); }
    }

    if (!track.dataset.bound) {
      track.dataset.bound = '1';
      $$('.sbtn', track.parentNode).forEach(function (b) {
        b.addEventListener('click', function () { goTo(current + Number(b.dataset.dir)); });
      });
      var timer = null;
      track.addEventListener('scroll', function () {
        clearTimeout(timer);
        timer = setTimeout(fromScroll, 90);
      }, { passive: true });
      window.addEventListener('resize', function () { goTo(current); });
    }
    sync();
  }

  /** Все карточки слайдера оживают, когда секция попадает в поле зрения:
      горизонтально уехавшие слайды сами по себе в observer не попадут. */
  function activateMap() {
    var section = $('#map');
    if (!section) return;
    var wake = function () {
      $$('.panel', section).forEach(function (p) { p.classList.add('is-in'); });
      $$('.ring__fg', section).forEach(function (c) { c.style.strokeDashoffset = c.dataset.offset; });
    };
    if (MOTION.reduce || !('IntersectionObserver' in window)) { wake(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { wake(); io.disconnect(); } });
    }, { threshold: 0.15 });
    io.observe(section);
  }

  /* ==================== Форма ==================== */

  function initForm() {
    var form = $('#contact-form');
    if (!form) return;

    var box = $('#form-status');
    var btn = $('#form-submit');
    var btnLabel = $('#form-submit-label');

    function setError(field, msgKey) {
      var wrap = field.closest('.field');
      wrap.classList.add('has-error');
      $('.field__err', wrap).textContent = I18N.t(msgKey);
    }
    function clearError(field) { field.closest('.field').classList.remove('has-error'); }

    $$('input, textarea, select', form).forEach(function (f) {
      f.addEventListener('input', function () { clearError(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      box.textContent = '';
      box.className = 'form__status';

      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;
      var type = form.elements.type;
      var ok = true;

      if (!name.value.trim()) { setError(name, 'contact.errName'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError(email, 'contact.errEmail'); ok = false; }
      if (message.value.trim().length < 5) { setError(message, 'contact.errMessage'); ok = false; }
      if (!ok) return;

      // Honeypot: боты заполняют скрытое поле — тихо выходим.
      if (form.elements.company && form.elements.company.value) return;

      var payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        type: type.value,
        message: message.value.trim()
      };

      if (!WEB3FORMS_KEY) {
        var body =
          I18N.t('contact.name') + ': ' + payload.name + '\n' +
          I18N.t('contact.email') + ': ' + payload.email + '\n' +
          I18N.t('contact.type') + ': ' + payload.type + '\n\n' +
          payload.message;
        window.location.href = 'mailto:' + CONTACT_EMAIL +
          '?subject=' + encodeURIComponent('Заявка с сайта — ' + payload.name) +
          '&body=' + encodeURIComponent(body);
        box.textContent = I18N.t('contact.success');
        box.className = 'form__status ok';
        form.reset();
        return;
      }

      btn.disabled = true;
      btnLabel.textContent = I18N.t('contact.sending');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Заявка с сайта: ' + payload.type + ' — ' + payload.name,
          from_name: 'sandraniko.com',
          email: payload.email,
          // replyto — чтобы в почте кнопка «Ответить» вела прямо клиенту,
          // а не на служебный адрес сервиса
          replyto: payload.email,
          'Имя': payload.name,
          'Тип проекта': payload.type,
          'Язык сайта': I18N.lang === 'ru' ? 'Русский' : 'English',
          message: payload.message
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data.success) throw new Error(data.message || 'failed');
          box.textContent = I18N.t('contact.success');
          box.className = 'form__status ok';
          form.reset();
        })
        .catch(function () {
          box.textContent = I18N.t('contact.error');
          box.className = 'form__status bad';
        })
        .finally(function () {
          btn.disabled = false;
          btnLabel.textContent = I18N.t('contact.submit');
        });
    });
  }

  function renderFormOptions() {
    var sel = $('#field-type');
    if (!sel) return;
    var current = sel.selectedIndex;
    sel.innerHTML = '';
    I18N.t('contact.typeOptions').forEach(function (o) {
      sel.appendChild(el('<option value="' + esc(o) + '">' + esc(o) + '</option>'));
    });
    if (current > -1) sel.selectedIndex = current;
  }

  /* ==================== Сборка ==================== */

  function renderAll() {
    renderSectors();
    renderCards('#expertise-cards', 'expertise.items');
    renderCards('#why-cards', 'why.items');
    renderCards('#do-cards', 'do.items');
    renderCards('#formats-cards', 'formats.items');
    renderBadges();
    renderSteps();
    renderWorks();

    renderSkills();
    renderTools();
    renderEdu();
    renderLangs();
    renderSoft();
    initSlider();
    activateMap();

    renderFormOptions();

    I18N.setMeta(I18N.t('meta.title'), I18N.t('meta.desc'));
    MOTION.reveal();
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAll();
    initForm();
  });

  document.addEventListener('langchange', renderAll);
})();
