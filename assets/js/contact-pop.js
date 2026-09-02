/* ------------------------------------------------------------------
   contact-pop.js — окно быстрой связи в правом нижнем углу.

   Появляется через минуту после того, как человек открыл страницу,
   и предлагает написать сразу в мессенджер или на почту. В каждом
   канале уже подставлен готовый текст — остаётся дописать своё.

   Закрыли окно — больше не показываем: отметка живёт в localStorage
   и держится неделю. Так возвращающийся посетитель не видит его
   на каждой странице.
   ------------------------------------------------------------------ */

/* ===== Куда писать ================================================
   WHATSAPP — номер в международном формате, только цифры, без плюса
   и пробелов. Например: '79161234567'. Пока строка пустая, кнопка
   WhatsApp просто не показывается — остальные работают.
   ================================================================= */
var CONTACT_POP = {
  telegram: 'nikolaeva_creates',
  whatsapp: '',
  email:    'alexneeaals@gmail.com',
  delay:    60,   // через сколько секунд показать
  quiet:    7     // на сколько дней замолчать после закрытия
};

(function () {
  'use strict';

  var STORE = 'sn-pop-closed';
  var C = CONTACT_POP;

  /* Заготовки: у мессенджеров текст короткий — его дописывают прямо
     в поле ввода, в письме можно позволить себе структуру. */
  var TXT = {
    ru: {
      title: 'Написать напрямую',
      lede: 'Отвечаю лично — обычно в течение часа.',
      close: 'Закрыть',
      open: 'Быстрая связь',
      mail: 'Почта',
      script: 'Здравствуйте, Александра! Пишу с сайта sandraniko.com. Хочу обсудить проект: ',
      subject: 'Заявка с сайта sandraniko.com',
      letter: 'Здравствуйте, Александра!\n\nПишу с сайта sandraniko.com.\n\nО проекте: \nСроки: \nКак связаться: \n'
    },
    en: {
      title: 'Write to me directly',
      lede: 'I answer personally — usually within the hour.',
      close: 'Close',
      open: 'Quick contact',
      mail: 'Email',
      script: 'Hello Sandra! I am writing from sandraniko.com. I would like to discuss a project: ',
      subject: 'Enquiry from sandraniko.com',
      letter: 'Hello Sandra!\n\nI am writing from sandraniko.com.\n\nAbout the project: \nTimeline: \nHow to reach me: \n'
    }
  };

  function lang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ru';
  }

  function silenced() {
    try {
      var until = Number(localStorage.getItem(STORE) || 0);
      return until > Date.now();
    } catch (e) { return false; }
  }

  function silence() {
    try {
      localStorage.setItem(STORE, String(Date.now() + C.quiet * 864e5));
    } catch (e) {}
  }

  var ICONS = {
    tg: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.7 13.2 2.1 11.8c-1-.3-1-1 .2-1.5l18.2-7c.8-.3 1.6.2 1.4 1z"/></svg>',
    wa: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.4c.1.2 1.6 2.6 4 3.6 1.4.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.3-.1Z"/></svg>',
    mail: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15"/><path d="m3 6 9 7 9-7"/></svg>'
  };

  function build() {
    var t = TXT[lang()];
    var wrap = document.createElement('div');
    wrap.className = 'qpop';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', t.title);

    var rows = '';
    rows += '<a class="qpop__row" href="https://t.me/' + C.telegram + '?text=' +
            encodeURIComponent(t.script) + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="qpop__ic">' + ICONS.tg + '</span>Telegram</a>';

    if (C.whatsapp) {
      rows += '<a class="qpop__row" href="https://wa.me/' + C.whatsapp + '?text=' +
              encodeURIComponent(t.script) + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="qpop__ic">' + ICONS.wa + '</span>WhatsApp</a>';
    }

    rows += '<a class="qpop__row" href="mailto:' + C.email + '?subject=' +
            encodeURIComponent(t.subject) + '&body=' + encodeURIComponent(t.letter) + '">' +
            '<span class="qpop__ic">' + ICONS.mail + '</span>' + t.mail + '</a>';

    wrap.innerHTML =
      '<button class="qpop__x" type="button" aria-label="' + t.close + '">' +
        '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="m1 1 10 10M11 1 1 11"/></svg>' +
      '</button>' +
      '<div class="tick"></div>' +
      '<div class="qpop__t">' + t.title + '</div>' +
      '<p class="qpop__lede">' + t.lede + '</p>' +
      '<div class="qpop__rows">' + rows + '</div>';

    wrap.querySelector('.qpop__x').addEventListener('click', function () {
      wrap.classList.remove('is-in');
      silence();
      setTimeout(function () { wrap.remove(); }, 400);
    });

    document.body.appendChild(wrap);
    /* Принудительный пересчёт вместо requestAnimationFrame: браузер
       придерживает кадры у фоновых вкладок, и окно могло остаться
       прозрачным. Чтение offsetWidth заставляет применить стартовые
       стили сразу, и следующая строка уже даёт переход. */
    void wrap.offsetWidth;
    wrap.classList.add('is-in');

    // Переключили язык — меняем и надписи внутри окна
    document.addEventListener('langchange', function () {
      if (!document.body.contains(wrap)) return;
      wrap.remove();
      build();
    }, { once: true });
  }

  function start() {
    if (silenced()) return;
    setTimeout(build, C.delay * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
