/* ------------------------------------------------------------------
   booking.js — запись на консультацию.

   Свободные часы приходят с /api/slots, запись уходит на /api/book.
   С Notion разговаривает только сервер: на странице нет ни токена,
   ни идентификатора базы.

   Слоты приходят часовыми. Если выбрано больше часа, сервер занимает
   подряд идущие часы; здесь мы заранее показываем только те начала,
   от которых нужная длительность действительно набирается.
   ------------------------------------------------------------------ */

var BOOKING = {
  price: 3500,          // рублей за час
  hours: [1, 2, 3],     // из чего выбирает клиент
  lead: 24              // за сколько часов присылать материалы
};

(function () {
  'use strict';

  var host = document.getElementById('booking');
  if (!host) return;

  var T = {
    ru: {
      loading: 'Загружаю свободные часы…',
      empty: 'Свободных часов сейчас нет. Напишите мне — подберём время вручную.',
      failed: 'Не удалось загрузить расписание. Напишите мне, и я предложу время.',
      pick: 'Выберите день',
      day: 'Часы на этот день',
      dur: 'Длительность',
      hour: 'ч',
      total: 'Итого',
      name: 'Имя', email: 'Email', contact: 'Телефон или мессенджер',
      task: 'О чём хотите поговорить',
      taskPh: 'Коротко о задаче — так я подготовлюсь заранее',
      submit: 'Записаться',
      sending: 'Записываю…',
      okTitle: 'Вы записаны',
      okText: 'Подтверждение ушло вам на почту. За {lead} часа до встречи пришлите материалы, которые считаете нужными, — на почту alexneeaals@gmail.com.',
      errName: 'Укажите имя',
      errEmail: 'Укажите корректный email',
      errContact: 'Оставьте телефон или ник',
      errTask: 'Пара слов о задаче',
      errTaken: 'Этот час только что заняли. Выберите другой.',
      errSpan: 'Подряд идущих часов не хватает. Выберите меньше или другое начало.',
      errFail: 'Не получилось записать. Напишите мне напрямую.',
      months: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
      wdays: ['вс','пн','вт','ср','чт','пт','сб']
    },
    en: {
      loading: 'Loading available hours…',
      empty: 'No free hours right now. Write to me and we will find a time.',
      failed: 'Could not load the schedule. Write to me and I will suggest a time.',
      pick: 'Choose a day',
      day: 'Hours on this day',
      dur: 'Duration',
      hour: 'h',
      total: 'Total',
      name: 'Name', email: 'Email', contact: 'Phone or messenger',
      task: 'What would you like to discuss',
      taskPh: 'A few words about the task, so I can prepare',
      submit: 'Book',
      sending: 'Booking…',
      okTitle: 'You are booked',
      okText: 'A confirmation has been sent to your email. {lead} hours before the call, send any materials you find useful to alexneeaals@gmail.com.',
      errName: 'Please enter your name',
      errEmail: 'Please enter a valid email',
      errContact: 'Leave a phone or username',
      errTask: 'A couple of words about the task',
      errTaken: 'That hour has just been taken. Please pick another.',
      errSpan: 'Not enough consecutive hours. Choose fewer or another start.',
      errFail: 'Booking failed. Please write to me directly.',
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      wdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    }
  };

  var slots = [];
  var byDay = {};
  var pickedDay = null;
  var pickedSlot = null;
  var pickedHours = BOOKING.hours[0];

  function t() { return T[document.documentElement.lang === 'en' ? 'en' : 'ru']; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function dayKey(iso) { return iso.slice(0, 10); }
  function hhmm(iso) {
    var d = new Date(iso);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function money(n) { return n.toLocaleString('ru-RU').replace(/ /g, ' '); }

  /** Сколько часов подряд набирается от этого слота. */
  function span(slot) {
    var i = slots.indexOf(slot), n = 1;
    while (i + n < slots.length && slots[i + n - 1].end && slots[i + n].start === slots[i + n - 1].end) n++;
    return n;
  }

  function group() {
    byDay = {};
    slots.forEach(function (s) {
      var k = dayKey(s.start);
      (byDay[k] = byDay[k] || []).push(s);
    });
  }

  function note(msg) {
    host.querySelector('.bk-body').innerHTML = '<p class="bk-note">' + esc(msg) + '</p>';
  }

  function render() {
    var L = t();
    var days = Object.keys(byDay).sort();
    if (!days.length) return note(L.empty);

    if (!pickedDay || days.indexOf(pickedDay) === -1) pickedDay = days[0];

    var dayBtns = days.map(function (k) {
      var d = new Date(k + 'T00:00:00');
      return '<button type="button" class="bk-day' + (k === pickedDay ? ' is-on' : '') + '" data-day="' + k + '">' +
        '<span class="bk-day__wd">' + L.wdays[d.getDay()] + '</span>' +
        '<span class="bk-day__n">' + d.getDate() + '</span>' +
        '<span class="bk-day__m">' + L.months[d.getMonth()].slice(0, 3) + '</span>' +
        '</button>';
    }).join('');

    var todays = byDay[pickedDay] || [];
    if (!pickedSlot || todays.indexOf(pickedSlot) === -1) pickedSlot = null;

    var timeBtns = todays.map(function (s) {
      var enough = span(s) >= pickedHours;
      return '<button type="button" class="bk-time' + (s === pickedSlot ? ' is-on' : '') + '"' +
        (enough ? '' : ' disabled') + ' data-slot="' + esc(s.id) + '">' + hhmm(s.start) + '</button>';
    }).join('');

    var durBtns = BOOKING.hours.map(function (h) {
      return '<button type="button" class="bk-dur' + (h === pickedHours ? ' is-on' : '') + '" data-hours="' + h + '">' +
        h + ' ' + L.hour + '</button>';
    }).join('');

    host.querySelector('.bk-body').innerHTML =
      '<div class="bk-step"><span class="label label--accent">' + esc(L.pick) + '</span>' +
        '<div class="bk-days">' + dayBtns + '</div></div>' +
      '<div class="bk-step"><span class="label label--accent">' + esc(L.day) + '</span>' +
        '<div class="bk-times">' + timeBtns + '</div></div>' +
      '<div class="bk-step"><span class="label label--accent">' + esc(L.dur) + '</span>' +
        '<div class="bk-durs">' + durBtns + '</div>' +
        '<p class="bk-total">' + esc(L.total) + ' — <b>' + money(BOOKING.price * pickedHours) + ' ₽</b></p></div>' +
      form();

    wire();
  }

  function field(id, label, type, ph) {
    return '<div class="field"><label class="label" for="bk-' + id + '">' + esc(label) + '</label>' +
      (type === 'area'
        ? '<textarea id="bk-' + id + '" rows="3" placeholder="' + esc(ph || '') + '"></textarea>'
        : '<input id="bk-' + id + '" type="' + type + '" placeholder="' + esc(ph || '') + '">') +
      '<span class="field__err"></span></div>';
  }

  function form() {
    var L = t();
    return '<form class="bk-form" novalidate>' +
      '<input class="hp" type="text" id="bk-company" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      field('name', L.name, 'text') +
      field('email', L.email, 'email', 'you@example.com') +
      field('contact', L.contact, 'text', '@username') +
      field('task', L.task, 'area', L.taskPh) +
      '<button class="btn" type="submit"><span>' + esc(L.submit) + '</span></button>' +
      '<div class="bk-status" role="status" aria-live="polite"></div>' +
      '</form>';
  }

  function wire() {
    host.querySelectorAll('.bk-day').forEach(function (b) {
      b.addEventListener('click', function () { pickedDay = b.dataset.day; pickedSlot = null; render(); });
    });
    host.querySelectorAll('.bk-time').forEach(function (b) {
      b.addEventListener('click', function () {
        pickedSlot = (byDay[pickedDay] || []).filter(function (s) { return s.id === b.dataset.slot; })[0] || null;
        render();
      });
    });
    host.querySelectorAll('.bk-dur').forEach(function (b) {
      b.addEventListener('click', function () {
        pickedHours = Number(b.dataset.hours);
        // Выбранное начало могло перестать вмещать новую длительность
        if (pickedSlot && span(pickedSlot) < pickedHours) pickedSlot = null;
        render();
      });
    });

    var f = host.querySelector('.bk-form');
    if (f) f.addEventListener('submit', submit);
    host.querySelectorAll('.bk-form input, .bk-form textarea').forEach(function (el) {
      el.addEventListener('input', function () { el.closest('.field').classList.remove('has-error'); });
    });
  }

  function err(id, msg) {
    var wrap = host.querySelector('#bk-' + id).closest('.field');
    wrap.classList.add('has-error');
    wrap.querySelector('.field__err').textContent = msg;
  }

  function submit(e) {
    e.preventDefault();
    var L = t();
    var box = host.querySelector('.bk-status');
    box.textContent = '';
    box.className = 'bk-status';

    var v = function (id) { return host.querySelector('#bk-' + id).value.trim(); };
    var ok = true;
    if (!v('name')) { err('name', L.errName); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) { err('email', L.errEmail); ok = false; }
    if (!v('contact')) { err('contact', L.errContact); ok = false; }
    if (v('task').length < 5) { err('task', L.errTask); ok = false; }
    if (!pickedSlot) { box.textContent = L.pick; box.className = 'bk-status bad'; ok = false; }
    if (!ok) return;

    var btn = host.querySelector('.bk-form .btn');
    var label = btn.querySelector('span').textContent;
    btn.disabled = true;
    btn.querySelector('span').textContent = L.sending;

    fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slot: pickedSlot.id, hours: pickedHours,
        name: v('name'), email: v('email'), contact: v('contact'), task: v('task'),
        company: host.querySelector('#bk-company').value
      })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (r) {
        if (!r.ok) {
          var m = r.d.error === 'taken' ? L.errTaken : r.d.error === 'span' ? L.errSpan : L.errFail;
          box.textContent = m;
          box.className = 'bk-status bad';
          if (r.d.error === 'taken') load();       // расписание устарело — перечитываем
          return;
        }
        done(r.d);
      })
      .catch(function () { box.textContent = L.errFail; box.className = 'bk-status bad'; })
      .finally(function () {
        btn.disabled = false;
        btn.querySelector('span').textContent = label;
      });
  }

  function done(d) {
    var L = t();
    var start = new Date(d.start);
    var when = start.getDate() + ' ' + L.months[start.getMonth()] + ', ' + hhmm(d.start);
    host.querySelector('.bk-body').innerHTML =
      '<div class="bk-done">' +
        '<span class="label label--accent">' + esc(L.okTitle) + '</span>' +
        '<p class="bk-done__when">' + esc(when) + ' · ' + d.hours + ' ' + esc(L.hour) + '</p>' +
        '<p class="bk-done__text">' + esc(L.okText.replace('{lead}', BOOKING.lead)) + '</p>' +
      '</div>';
    notify(d);
  }

  /** Письмо-уведомление. Notion уже знает о записи, это просто копия
      в почту — поэтому ошибку отправки клиенту не показываем. */
  function notify(d) {
    if (!window.WEB3FORMS_KEY) return;
    var v = function (id) { var el = host.querySelector('#bk-' + id); return el ? el.value.trim() : ''; };
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: window.WEB3FORMS_KEY,
        subject: 'Запись на консультацию — ' + d.start,
        from_name: 'sandraniko.com',
        'Когда': d.start + ' — ' + d.end,
        'Часов': d.hours,
        'Имя': v('name'),
        'Email': v('email'),
        'Контакт': v('contact'),
        message: v('task')
      })
    }).catch(function () {});
  }

  /* Пока календарь не подключён, /api/slots отвечает ошибкой. Показывать
     посетителю мёртвый блок незачем — прячем секцию целиком вместе с
     пунктом меню. Заработает Notion — блок появится сам. */
  function hide() {
    host.style.display = 'none';
    var link = document.querySelectorAll('a[href="#booking"]');
    [].forEach.call(link, function (a) { a.style.display = 'none'; });
  }

  function load() {
    note(t().loading);
    fetch('/api/slots')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) {
        slots = (d.slots || []).filter(function (s) { return s.start; });
        host.style.display = '';
        group();
        render();
      })
      .catch(hide);
  }

  document.addEventListener('DOMContentLoaded', load);
  document.addEventListener('langchange', function () { if (slots.length) render(); });
})();
