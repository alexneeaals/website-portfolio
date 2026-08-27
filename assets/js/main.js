/* ------------------------------------------------------------------
   main.js — главная страница: рендер динамических блоков,
   слайдер «Карта компетенций» и форма обратной связи.
   ------------------------------------------------------------------ */

/* ===== Ключ доступа Web3Forms =====================================
   Заявки с формы уходят на alexneeaals@gmail.com.
   Ключ публичный по замыслу сервиса: он виден в коде страницы и
   позволяет только отправлять письма на подтверждённый адрес.
   Сменить почту получателя можно в личном кабинете web3forms.com.
   Если очистить строку, форма вернётся к запасному варианту —
   будет открывать почтовую программу посетителя.
   ================================================================= */
var WEB3FORMS_KEY = '8c7b279b-790e-449a-81dd-1b78939b3375';
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
     Сферы работы — плашки, разбросанные вокруг имени на первом экране.
     Два типа: в бордовой рамке (сериф) и с подчёркиванием (санс).
     Координаты в процентах от холста героя, поворот в градусах.
     Порядок соответствует hero.tags в content.js.
     ================================================================== */
  var HERO_TAGS = [
    { x:  4, y: 16, rot: -3,   style: 'box'  },  // Туризм
    { x: 78, y: 10, rot: 2.5,  style: 'line' },  // MICE
    { x: 62, y: 22, rot: -1.5, style: 'box'  },  // HoReCa
    { x: 12, y: 74, rot: 2,    style: 'line' },  // Девелопмент
    { x: 70, y: 63, rot: -2.5, style: 'box'  },  // Люксовые бренды
    { x: 30, y: 8,  rot: 1.5,  style: 'line' },  // События
    { x: 86, y: 44, rot: -2,   style: 'line' },  // Образование
    { x:  2, y: 44, rot: 3,    style: 'box'  },  // Фиджитал-системы
    { x: 47, y: 84, rot: -1.8, style: 'box'  },  // Косметика
    { x: 52, y: 90, rot: 2.2,  style: 'line' }   // Креативные индустрии
  ];

  function renderHeroTags() {
    var host = $('#hero-tags');
    if (!host) return;
    host.innerHTML = '';

    I18N.t('hero.tags').forEach(function (name, i) {
      var L = HERO_TAGS[i] || { x: 10 + (i % 4) * 22, y: 12 + Math.floor(i / 4) * 26, rot: 0, style: 'box' };
      // Координаты через переменные, а не напрямую в left/top: так
      // медиазапрос может убрать разброс и построить обычный поток.
      host.appendChild(el(
        '<span class="htag htag--' + L.style + '"' +
          ' style="--x:' + L.x + '%;--y:' + L.y + '%;--rot:' + L.rot + 'deg"' +
          ' data-parallax="' + (0.4 + (i % 3) * 0.25).toFixed(2) + '">' +
          esc(name) +
        '</span>'
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

  /* Выбранная категория переживает смену языка: при переключении RU/EN
     страница пересобирается целиком, и без этой переменной фильтр
     каждый раз сбрасывался бы на «все». */
  var workCat = 'all';

  var WORK_CATS = ['all', 'spaces', 'brands', 'events'];

  function renderWorkCats() {
    var host = $('#work-cats');
    if (!host) return;
    var names = I18N.t('work.cats') || {};
    host.innerHTML = '';

    WORK_CATS.forEach(function (cat) {
      // Категорию без единого проекта не показываем
      if (cat !== 'all' && !window.PROJECTS.some(function (p) { return p.cat === cat; })) return;
      var b = el('<button class="wcat' + (cat === workCat ? ' is-on' : '') + '" type="button">' +
                 esc(names[cat] || cat) + '</button>');
      b.addEventListener('click', function () {
        if (workCat === cat) return;
        workCat = cat;
        renderWorkCats();
        renderWorks();
      });
      host.appendChild(b);
    });
  }

  function renderWorks() {
    var host = $('#works');
    if (!host) return;
    var lang = I18N.lang;
    host.innerHTML = '';

    window.PROJECTS.filter(function (p) {
      return workCat === 'all' || p.cat === workCat;
    }).forEach(function (p) {
      var c = p[lang];
      // cover — отдельная картинка для плитки, если задана
      var tile = p.cover || p.images[0];
      // focus — какую часть кадра держать в рамке, когда пропорции
      // картинки и плитки не совпадают (по умолчанию центр)
      var focus = p.focus ? ' style="object-position:' + p.focus + '"' : '';
      host.appendChild(el(
        '<a class="work" href="projects/' + p.slug + '.html">' +
          '<div class="work__media">' +
            '<img src="assets/img/projects/' + p.dir + '/' + tile + '" alt="' + esc(c.title) + '" loading="lazy"' + focus + '>' +
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

  /* ==================== Задачи клиентов ==================== */

  function renderAsks() {
    var host = $('#solve-list');
    if (!host) return;
    // Номер подставляем в саму подпись: в русском это «№ 1», в английском «#1»
    var askTpl = I18N.t('solve.askLabel');
    host.innerHTML = '';

    I18N.t('solve.items').forEach(function (it, i) {
      host.appendChild(el(
        '<article class="ask rv" data-rv-delay="' + (i % 2 * 90) + '">' +
          '<span class="ask__n">' + num(i) + '</span>' +
          '<div class="ask__body">' +
            '<span class="label label--accent">' + esc(askTpl.replace('{n}', i + 1)) + '</span>' +
            '<h3 class="ask__q">' + esc(it.q) + '</h3>' +
            '<p class="ask__a">' + esc(it.a) + '</p>' +
            '<ul class="ask__list">' +
              it.points.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
            '</ul>' +
          '</div>' +
        '</article>'
      ));
    });
  }

  /* ==================== Дорожная карта образования ==================== */

  function renderRoad() {
    var host = $('#edu-road');
    if (!host) return;
    host.innerHTML = '';

    I18N.t('edu.items').forEach(function (e, i) {
      host.appendChild(el(
        '<div class="road__step">' +
          '<span class="road__dot"></span>' +
          '<span class="road__n">' + num(i) + '</span>' +
          '<span class="road__place">' + esc(e.place) + '</span>' +
          '<span class="road__what">' + esc(e.what) + '</span>' +
        '</div>'
      ));
    });
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

  /** Переход с витрины продуктов: подставляем продукт в сообщение,
      чтобы заявка сразу говорила, о чём речь. Работает, пока не
      подключён эквайринг. */
  function prefillFromQuery() {
    var m = /[?&]product=([^&#]+)/.exec(window.location.search);
    if (!m) return;
    var product = decodeURIComponent(m[1].replace(/\+/g, ' '));
    var msg = $('#field-message');
    if (msg && !msg.value) {
      msg.value = 'Здравствуйте! Интересует: ' + product + '.';
    }
    // адрес чистим, чтобы подстановка не повторялась при обновлении
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + '#contact');
    }
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
    renderHeroTags();
    renderCards('#why-cards', 'why.items');
    renderCards('#do-cards', 'do.items');
    renderCards('#formats-cards', 'formats.items');
    renderBadges();
    renderSteps();
    renderWorkCats();
    renderWorks();
    renderAsks();
    renderRoad();

    renderFormOptions();
    prefillFromQuery();

    I18N.setMeta(I18N.t('meta.title'), I18N.t('meta.desc'));
    MOTION.reveal();
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAll();
    initForm();
  });

  document.addEventListener('langchange', renderAll);
})();
