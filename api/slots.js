/* ------------------------------------------------------------------
   GET /api/slots — свободные часы для записи на консультацию.

   Отдаёт только время: ни имён, ни занятых слотов, ни устройства
   базы наружу не уходит. Ответ кешируется на минуту, чтобы частые
   заходы не били по Notion.
   ------------------------------------------------------------------ */

'use strict';

var { freeSlots } = require('./_notion');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method' });
  }

  /* Обе переменные проверяем сразу: иначе видно только ту, до которой
     код добрался первой, и настройка идёт в несколько заходов. */
  var missing = [];
  if (!process.env.NOTION_TOKEN) missing.push('token');
  if (!process.env.NOTION_DB) missing.push('db');
  if (missing.length) {
    return res.status(502).json({ error: 'unavailable', reason: 'no_' + missing.join('_') });
  }

  try {
    var slots = await freeSlots(100);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      slots: slots.map(function (s) { return { id: s.id, start: s.start, end: s.end }; })
    });
  } catch (e) {
    console.error('slots:', e && e.message);
    /* Наружу — только категория: чего не хватает, видно, а токен
       и устройство базы не раскрываются. Страница на любую ошибку
       просто прячет блок. */
    return res.status(502).json({ error: 'unavailable', reason: e && e.reason ? e.reason : 'notion' });
  }
};
