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

  try {
    var slots = await freeSlots(100);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      slots: slots.map(function (s) { return { id: s.id, start: s.start, end: s.end }; })
    });
  } catch (e) {
    console.error('slots:', e && e.message);
    // Наружу — без подробностей: страница просто покажет «не удалось загрузить»
    return res.status(502).json({ error: 'unavailable' });
  }
};
