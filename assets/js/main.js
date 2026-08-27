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
     Сферы работы — плашки на первом экране.
     Раскладка по образцу «пример главного экрана.pdf»: плашки стоят
     в свободных полях по краям, никогда не наезжая ни на кадры
     коллажа, ни на имя. Проценты — желаемое место, но окончательное
     решает placeHeroTags(): она сверяет каждую плашку с занятыми
     областями и, если та накрывает кадр или текст, сдвигает её в
     ближайшее свободное место.
     ================================================================== */
  var HERO_TAGS = [
    { x: 30, y: 17, style: 'box'  },  // Туризм
    { x:  7, y: 78, style: 'box'  },  // MICE
    { x: 76, y: 36, style: 'line' },  // HoReCa
    { x: 33, y: 72, style: 'line' },  // Девелопмент
    { x: 62, y: 12, style: 'box'  },  // Люксовые бренды
    { x: 22, y: 52, style: 'line' },  // События
    { x: 75, y: 70, style: 'line' },  // Образование
    { x: 22, y: 6,  style: 'line' },  // Фиджитал-системы
    { x: 55, y: 88, style: 'box'  },  // Косметика
    { x: 60, y: 46, style: 'line' }   // Креативные индустрии
  ];

  function renderHeroTags() {
    var host = $('#hero-tags');
    if (!host) return;
    host.innerHTML = '';

    I18N.t('hero.tags').forEach(function (name, i) {
      var L = HERO_TAGS[i] || { x: 10 + (i % 4) * 22, y: 12 + Math.floor(i / 4) * 26, style: 'box' };
      // Координаты через переменные, а не напрямую в left/top: так
      // медиазапрос может убрать разброс и построить обычный поток.
      host.appendChild(el(
        '<span class="htag htag--' + L.style + '"' +
          ' style="--x:' + L.x + '%;--y:' + L.y + '%"' +
          ' data-parallax="' + (0.4 + (i % 3) * 0.25).toFixed(2) + '">' +
          esc(name) +
        '</span>'
      ));
    });

    placeHeroTags();
  }

  /** Область, которую плашки обязаны обходить, с запасом в px. */
  function padRect(r, pad) {
    return { l: r.left - pad, t: r.top - pad, r: r.right + pad, b: r.bottom + pad };
  }
  function hits(a, b) {
    return a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;
  }

  /** Разводит плашки так, чтобы ни одна не накрывала кадр или текст. */
  function placeHeroTags() {
    var host = $('#hero-tags');
    var hero = host && host.parentNode;
    if (!host || !hero) return;

    // В мобильной раскладке плашки идут обычным потоком — разводить нечего
    if (getComputedStyle(host).position === 'static') return;

    var box = host.getBoundingClientRect();
    if (!box.width || !box.height) return;

    // Запретные зоны: кадры коллажа, имя с подписями, индикатор прокрутки
    var blocked = [];
    [].forEach.call(hero.querySelectorAll('.collage__item, .hero__title, .hero__meta, .hero__scroll'),
      function (n) { blocked.push(padRect(n.getBoundingClientRect(), 14)); });

    var tags = [].slice.call(host.querySelectorAll('.htag'));

    tags.forEach(function (tag) {
      tag.style.left = tag.style.getPropertyValue('--x');
      tag.style.top  = tag.style.getPropertyValue('--y');
    });

    tags.forEach(function (tag) {
      var w = tag.offsetWidth, h = tag.offsetHeight;
      var x0 = parseFloat(tag.style.getPropertyValue('--x'));
      var y0 = parseFloat(tag.style.getPropertyValue('--y'));

      // Кандидаты: сначала желаемая точка, затем сетка вокруг неё
      var tries = [[x0, y0]];
      for (var ring = 1; ring <= 12; ring++) {
        for (var dy = -ring; dy <= ring; dy++) {
          for (var dx = -ring; dx <= ring; dx++) {
            if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue;
            tries.push([x0 + dx * 3, y0 + dy * 4]);
          }
        }
      }

      var maxX = 100 - (w / box.width) * 100;
      var maxY = 100 - (h / box.height) * 100;

      for (var k = 0; k < tries.length; k++) {
        var px = Math.min(Math.max(tries[k][0], 0), Math.max(maxX, 0));
        var py = Math.min(Math.max(tries[k][1], 0), Math.max(maxY, 0));
        var rect = {
          l: box.left + box.width  * px / 100,
          t: box.top  + box.height * py / 100
        };
        rect.r = rect.l + w;
        rect.b = rect.t + h;

        var free = true;
        for (var m = 0; m < blocked.length; m++) {
          if (hits(rect, blocked[m])) { free = false; break; }
        }
        if (free) {
          tag.style.left = px + '%';
          tag.style.top  = py + '%';
          blocked.push(padRect({ left: rect.l, top: rect.t, right: rect.r, bottom: rect.b }, 10));
          return;
        }
      }
      // Свободного места не нашлось — лучше не показывать, чем перекрыть
      tag.style.display = 'none';
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
        // Плитки созданы заново и снова помечены .rv — без этого вызова
        // они остались бы прозрачными: наблюдатель их уже не видит
        MOTION.reveal();
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

  /* ==================== Задачи клиентов — слайдер ==================== */

  function renderAsks() {
    var host = $('#solve-list');
    if (!host) return;
    var askTpl = I18N.t('solve.askLabel');
    host.innerHTML = '';

    I18N.t('solve.items').forEach(function (it, i) {
      host.appendChild(el(
        '<article class="ask">' +
          '<span class="ask__n">' + num(i) + '</span>' +
          '<span class="label label--accent">' + esc(askTpl.replace('{n}', i + 1)) + '</span>' +
          '<h3 class="ask__q">' + esc(it.q) + '</h3>' +
          '<p class="ask__a">' + esc(it.a) + '</p>' +
          '<ul class="ask__list">' +
            it.points.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
          '</ul>' +
        '</article>'
      ));
    });

    initAskSlider();
  }

  /** Горизонтальная прокрутка карточек: свайп и колесо нативные,
      JS отвечает только за стрелки, точки и синхронизацию. */
  function initAskSlider() {
    var track = $('#solve-list');
    var dotsHost = $('#solve-dots');
    if (!track || !dotsHost) return;

    var cards = $$('.ask', track);
    if (!cards.length) return;

    var current = 0;

    /* Позиция карточки в ленте. Считаем по реальному смещению узла,
       а не по «шагу»: ширина карточки задана в процентах и на разных
       экранах шаг разный, а после смены шрифта — ещё и плавающий. */
    function maxScroll() { return track.scrollWidth - track.clientWidth; }
    function cardPos(i) {
      return Math.min(cards[i].offsetLeft - cards[0].offsetLeft, Math.max(maxScroll(), 0));
    }

    /* Последняя достижимая позиция: на широком экране видно сразу
       несколько карточек, поэтому «страниц» меньше, чем карточек. */
    function lastIndex() {
      var max = maxScroll();
      if (max <= 1) return 0;
      for (var i = 0; i < cards.length; i++) {
        if (cardPos(i) >= max - 1) return i;
      }
      return cards.length - 1;
    }

    function buildDots() {
      var need = lastIndex() + 1;
      if (dotsHost.children.length === need) return;
      dotsHost.innerHTML = '';
      for (var i = 0; i < need; i++) {
        (function (k) {
          var d = el('<button class="sdot" type="button" aria-label="' + (k + 1) + '"></button>');
          d.addEventListener('click', function () { goTo(k); });
          dotsHost.appendChild(d);
        })(i);
      }
    }

    function sync() {
      buildDots();
      var last = lastIndex();
      $$('.sdot', dotsHost).forEach(function (d, k) { d.classList.toggle('is-on', k === current); });
      $$('.sbtn', track.parentNode).forEach(function (b) {
        var dir = Number(b.dataset.dir);
        b.disabled = (dir < 0 && current === 0) || (dir > 0 && current === last);
      });
    }

    function goTo(i) {
      var last = lastIndex();
      current = Math.min(Math.max(i, 0), last);
      // Плавность задаёт CSS (scroll-behavior на ленте): вызов
      // scrollTo с behavior:'smooth' часть движков молча игнорирует.
      // На последнем шаге доезжаем до самого края, иначе крайняя
      // карточка осталась бы подрезанной.
      track.scrollLeft = (current === last) ? maxScroll() : cardPos(current);
      sync();
    }

    /** Какая карточка ближе всего к текущему положению ленты. */
    function fromScroll() {
      var x = track.scrollLeft, best = 0, bestD = Infinity;
      for (var i = 0; i <= lastIndex(); i++) {
        var d = Math.abs(cardPos(i) - x);
        if (d < bestD) { bestD = d; best = i; }
      }
      if (best !== current) { current = best; sync(); }
    }

    $$('.sbtn', track.parentNode).forEach(function (b) {
      b.addEventListener('click', function () { goTo(current + Number(b.dataset.dir)); });
    });
    track.addEventListener('scroll', function () {
      clearTimeout(track._t);
      track._t = setTimeout(fromScroll, 90);
    }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    });
    window.addEventListener('resize', function () {
      clearTimeout(track._r);
      track._r = setTimeout(sync, 180);
    }, { passive: true });

    sync();
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
    // Шрифты подгружаются после первой отрисовки и меняют ширину плашек,
    // поэтому раскладку пересчитываем ещё раз, когда они готовы
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeHeroTags);
  });

  /* При смене размера окна свободные поля вокруг имени меняются —
     плашки нужно разложить заново. */
  var placeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(placeTimer);
    placeTimer = setTimeout(function () {
      [].forEach.call(document.querySelectorAll('.htag'), function (t) { t.style.display = ''; });
      placeHeroTags();
    }, 180);
  }, { passive: true });

  document.addEventListener('langchange', renderAll);
})();
