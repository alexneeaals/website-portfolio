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
     Сферы работы — бегущая строка между первым экраном и «Обо мне».
     Плашки чередуются через одну: в бордовой рамке и с подчёркиванием.
     Список печатается дважды подряд: пока уезжает первая половина,
     вторая занимает её место, и шов не виден.
     ================================================================== */
  function renderTagStrip() {
    var host = $('#tag-strip');
    if (!host) return;

    var items = I18N.t('hero.tags') || [];
    if (!items.length) return;

    function row() {
      return items.map(function (name, i) {
        var kind = (i % 2 === 0) ? 'box' : 'line';
        return '<span class="htag htag--' + kind + '">' + esc(name) + '</span>';
      }).join('');
    }

    host.innerHTML = row() + row();

    /* Скорость привязана к длине строки, иначе на разных языках лента
       ехала бы с разной прытью. Границы — на случай, если измерить
       ширину не удалось: без них лента могла бы уехать за миг. */
    var width = host.scrollWidth / 2;
    var secs = Math.min(Math.max(Math.round(width / 55), 22), 70);
    host.style.setProperty('--marq-time', secs + 's');
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
      // У галочки события input может не быть — слушаем change
      if (f.type === 'checkbox') f.addEventListener('change', function () { clearError(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      box.textContent = '';
      box.className = 'form__status';

      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;
      var type = form.elements.type;
      var consent = form.elements.consent;
      var ok = true;

      if (!name.value.trim()) { setError(name, 'contact.errName'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError(email, 'contact.errEmail'); ok = false; }
      if (message.value.trim().length < 5) { setError(message, 'contact.errMessage'); ok = false; }
      if (consent && !consent.checked) { setError(consent, 'contact.errConsent'); ok = false; }
      if (!ok) return;

      // Honeypot: боты заполняют скрытое поле — тихо выходим.
      if (form.elements.company && form.elements.company.value) return;

      var payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        type: type.value,
        message: message.value.trim(),
        consent: (consent && consent.checked) ? 'да' : 'нет'
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
          'Согласие на обработку данных': payload.consent,
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

    /* Если для продукта есть пункт в списке — выбираем его и ставим
       готовую заготовку. Иначе просто называем продукт в сообщении. */
    var sel = $('#field-type');
    var matched = false;
    if (sel) {
      [].forEach.call(sel.options, function (opt, i) {
        if (!matched && opt.value === product) { sel.selectedIndex = i; matched = true; }
      });
    }
    if (matched) {
      applyScript(product, false);
    } else {
      var msg = $('#field-message');
      if (msg && !msg.value) {
        msg.value = 'Здравствуйте! Интересует: ' + product + '.';
      }
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
      sel.appendChild(el('<option value="' + esc(o.t) + '">' + esc(o.t) + '</option>'));
    });
    if (current > -1) sel.selectedIndex = current;

    /* Сменили язык — вместе с подписями меняем и заготовку в поле,
       если человек её не переписал под себя. */
    var msg = $('#field-message');
    if (msg && autoScript && msg.value === autoScript) {
      autoScript = '';
      msg.value = '';
      applyScript(sel.value, false);
    }
  }

  /** Заготовка письма для выбранного типа проекта, если она есть. */
  function scriptFor(label) {
    var found = null;
    I18N.t('contact.typeOptions').forEach(function (o) {
      if (o.t === label && o.script) found = o.script;
    });
    return found;
  }

  /* Текст, который подставили мы сами. Нужен, чтобы при смене пункта
     заменить свою же заготовку, но не затереть то, что человек написал. */
  var autoScript = '';

  /** Ставит заготовку в поле сообщения и выделяет её, чтобы сразу
      было видно: текст можно дополнить или стереть. */
  function applyScript(label, focus) {
    var msg = $('#field-message');
    if (!msg) return;
    var text = scriptFor(label);
    if (!text) return;
    // Чужой текст не трогаем
    if (msg.value.trim() && msg.value !== autoScript) return;
    msg.value = text;
    autoScript = text;
    msg.closest('.field').classList.remove('has-error');
    if (focus) {
      msg.focus();
      // Курсор в конец, а не в начало — дописывать удобнее
      try { msg.setSelectionRange(text.length, text.length); } catch (err) {}
    }
  }

  function initTypeScripts() {
    var sel = $('#field-type');
    if (!sel) return;
    sel.addEventListener('change', function () { applyScript(sel.value, true); });
  }

  /* ==================== Сборка ==================== */

  function renderAll() {
    renderTagStrip();
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
    initTypeScripts();
    // Шрифты подгружаются после первой отрисовки и меняют длину ленты —
    // пересчитываем скорость, когда они готовы
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderTagStrip);
  });

  document.addEventListener('langchange', renderAll);
})();
