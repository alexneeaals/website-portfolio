/* ------------------------------------------------------------------
   POST /api/book — запись на консультацию.

   Слот занимается сразу, без подтверждения. Поэтому перед записью
   свободность проверяется ещё раз: между тем, как посетитель открыл
   страницу и нажал кнопку, слот мог занять кто-то другой.

   Консультация от часа. Если выбрано больше, занимаются подряд
   идущие часы — иначе получится встреча с дыркой посередине.
   ------------------------------------------------------------------ */

'use strict';

var { notion, freeSlots, must, text, P, BUSY } = require('./_notion');

var MAX_HOURS = 4;

function bad(res, code, reason) {
  return res.status(code).json({ error: reason });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return bad(res, 405, 'method');
  }

  var body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { return bad(res, 400, 'json'); }
  }
  body = body || {};

  // Ловушка для ботов: настоящие люди этого поля не видят
  if (body.company) return res.status(200).json({ ok: true });

  var name = String(body.name || '').trim();
  var email = String(body.email || '').trim();
  var contact = String(body.contact || '').trim();
  var task = String(body.task || '').trim();
  var slotId = String(body.slot || '').trim();
  var hours = Math.min(Math.max(parseInt(body.hours, 10) || 1, 1), MAX_HOURS);

  if (!name || name.length > 120) return bad(res, 400, 'name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return bad(res, 400, 'email');
  if (!contact || contact.length > 160) return bad(res, 400, 'contact');
  if (task.length < 5) return bad(res, 400, 'task');
  if (!slotId) return bad(res, 400, 'slot');

  try {
    var free = await freeSlots(100);

    var first = free.findIndex(function (s) { return s.id === slotId; });
    if (first === -1) return bad(res, 409, 'taken');

    /* Набираем нужное число часов подряд: конец одного слота должен
       совпадать с началом следующего. */
    var chain = [free[first]];
    for (var i = 1; i < hours; i++) {
      var prev = chain[chain.length - 1];
      var next = free[first + i];
      if (!prev.end || !next || next.start !== prev.end) return bad(res, 409, 'span');
      chain.push(next);
    }

    var starts = chain[0].start;
    var ends = chain[chain.length - 1].end || chain[chain.length - 1].start;

    // Первый слот несёт данные клиента, остальные просто закрываются
    await notion('/pages/' + chain[0].id, {
      method: 'PATCH',
      body: {
        properties: (function () {
          var props = {};
          props[P.status] = { select: { name: BUSY } };
          props[P.name] = { title: text(name) };
          props[P.email] = { email: email };
          props[P.contact] = { rich_text: text(contact) };
          props[P.task] = { rich_text: text(task) };
          props[P.hours] = { number: hours };
          return props;
        })()
      }
    });

    for (var k = 1; k < chain.length; k++) {
      await notion('/pages/' + chain[k].id, {
        method: 'PATCH',
        body: {
          properties: (function () {
            var props = {};
            props[P.status] = { select: { name: BUSY } };
            props[P.name] = { title: text(name + ' — продолжение') };
            return props;
          })()
        }
      });
    }

    return res.status(200).json({ ok: true, start: starts, end: ends, hours: hours });
  } catch (e) {
    console.error('book:', e && e.message);
    return bad(res, 502, 'unavailable');
  }
};
