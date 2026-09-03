/* ------------------------------------------------------------------
   products.js — витрина продуктов и страницы продуктов.
   Раздел существует только в русской версии сайта.
   ------------------------------------------------------------------ */

/* ===== Ссылки на оплату ===========================================
   Есть ссылка — кнопка ведёт прямо на оплату ЮKassa в новой вкладке.
   Строка пустая — кнопка открывает форму обратной связи и подставляет
   название продукта в сообщение, заявка приходит на почту.
   ================================================================= */
var PAYMENT_LINKS = {
  spiktera:    'https://yookassa.ru/my/i/apkTM6S0dcQ3/l',  // 15 000 ₽ — пресейл курса
  constructor: 'https://yookassa.ru/my/i/apkT0y_-E8db/l',  // 50 000 ₽ — оплата картой
  masterplans: ''                                          // 1 990 ₽ — ссылки пока нет
};
/* Строку constructor НЕ удаляйте, даже если она пустая: `constructor` —
   служебное имя в JavaScript, и без своего ключа объект отдаёт
   унаследованное значение вместо пустой строки. Кнопка тогда ведёт в никуда.

   Ключа constructor-invoice здесь намеренно нет: счёт юридическому лицу
   Александра выставляет лично, и эта кнопка всегда ведёт на форму. */

(function () {
  'use strict';

  // Название продукта подставляется в письмо, чтобы сразу было понятно,
  // о чём заявка.
  var TITLES = {
    spiktera:               'Курс «Спиктера»',
    constructor:            'Конструктор туристических проектов',
    'constructor-invoice':  'Конструктор туристических проектов — счёт на юрлицо',
    masterplans:            'Вариации мастер-планов для туристических проектов'
  };

  function apply() {
    [].forEach.call(document.querySelectorAll('[data-buy]'), function (a) {
      var key = a.getAttribute('data-buy');
      // hasOwnProperty, а не PAYMENT_LINKS[key]: у ключа `constructor` иначе
      // подхватывается унаследованное значение из прототипа
      var paid = Object.prototype.hasOwnProperty.call(PAYMENT_LINKS, key)
        ? PAYMENT_LINKS[key] : '';

      if (paid) {
        a.href = paid;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        return;
      }
      // Запасной путь: форма на главной с подставленным продуктом
      a.href = '/?product=' + encodeURIComponent(TITLES[key] || key) + '#contact';
      a.removeAttribute('target');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply();
    if (window.MOTION) MOTION.reveal();
  });
})();
