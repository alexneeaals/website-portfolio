/* ------------------------------------------------------------------
   _notion.js — общая часть двух функций записи на консультацию.

   Токен интеграции лежит в переменных окружения Vercel и на страницу
   никогда не попадает: браузер обращается к /api/slots и /api/book,
   а с Notion разговаривает только сервер.

   Переменные окружения (Vercel → Settings → Environment Variables):
     NOTION_TOKEN — секрет интеграции, начинается с ntn_ или secret_
     NOTION_DB    — идентификатор базы со слотами
   ------------------------------------------------------------------ */

'use strict';

var API = 'https://api.notion.com/v1';
var VERSION = '2022-06-28';

/* Названия свойств базы. Если в Notion колонки названы иначе —
   поменяйте здесь, больше нигде эти строки не встречаются. */
var P = {
  when:    'Когда',        // Date со временем начала и конца
  status:  'Статус',       // Select: Свободен / Занят
  name:    'Имя',          // Title
  email:   'Email',        // Email
  contact: 'Контакт',      // Rich text — телефон или ник
  task:    'Задача',       // Rich text
  hours:   'Часов'         // Number
};

var FREE = 'Свободен';
var BUSY = 'Занят';

function must(name) {
  var v = process.env[name];
  if (!v) throw new Error('Не задана переменная окружения ' + name);
  return v;
}

async function notion(path, options) {
  var res = await fetch(API + path, {
    method: (options && options.method) || 'GET',
    headers: {
      Authorization: 'Bearer ' + must('NOTION_TOKEN'),
      'Notion-Version': VERSION,
      'Content-Type': 'application/json'
    },
    body: options && options.body ? JSON.stringify(options.body) : undefined
  });

  var data = await res.json().catch(function () { return {}; });
  if (!res.ok) {
    // Сообщение Notion пишем в лог, наружу отдаём общее — чтобы не
    // раскрывать устройство базы случайному посетителю.
    console.error('Notion ' + res.status + ':', data && data.message);
    var err = new Error(data && data.message ? data.message : 'notion error');
    err.status = res.status;
    throw err;
  }
  return data;
}

/** Свободные слоты начиная с «сейчас», по возрастанию времени. */
async function freeSlots(limit) {
  var now = new Date().toISOString();
  var data = await notion('/databases/' + must('NOTION_DB') + '/query', {
    method: 'POST',
    body: {
      page_size: limit || 100,
      filter: {
        and: [
          { property: P.status, select: { equals: FREE } },
          { property: P.when, date: { on_or_after: now } }
        ]
      },
      sorts: [{ property: P.when, direction: 'ascending' }]
    }
  });

  return (data.results || []).map(function (row) {
    var when = row.properties[P.when] && row.properties[P.when].date;
    return when && when.start ? { id: row.id, start: when.start, end: when.end || null } : null;
  }).filter(Boolean);
}

function text(value) {
  return [{ type: 'text', text: { content: String(value || '').slice(0, 1800) } }];
}

module.exports = { notion, freeSlots, must, text, P, FREE, BUSY };
