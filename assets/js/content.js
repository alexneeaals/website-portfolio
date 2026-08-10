/* ------------------------------------------------------------------
   content.js — единственный источник текста для всего сайта.
   Ни одна переводимая фраза не хардкодится в HTML.
   Чтобы поправить текст — правим только здесь.
   ------------------------------------------------------------------ */

window.CONTENT = {

  /* =============================== РУССКИЙ =============================== */
  ru: {
    meta: {
      title: 'Александра Николаева — креативный продюсер и бренд-стратег',
      desc: 'Креативный продюсер и бренд-стратег. Полный цикл: аналитика, стратегия, концепция, визуализация, упаковка для инвесторов и запуск. Туризм, MICE, девелопмент, события, образование.'
    },

    nav: {
      work: 'Портфолио',
      map: 'Компетенции',
      formats: 'Форматы',
      contact: 'Контакты',
      menu: 'Меню',
      close: 'Закрыть',
      start: 'Начать проект'
    },

    hero: {
      name1: 'Александра',
      name2: 'Николаева',
      role: 'Креативный продюсер и бренд-стратег',
      location: 'Работаю с брендами по всему миру',
      scroll: 'Листайте'
    },

    about: {
      label: 'Обо мне',
      text: 'Моя зона экспертизы — стык маркетинга, арт-дирекшена, средового дизайна и режиссуры. Первый диплом архитектурный, второй — бренд-менеджмент. Отсюда системное мышление и умение вести пространство, бренд и коммуникацию как единый комплекс точек контакта.',
      text2: 'Гибридный бэкграунд позволяет соединять философию бизнеса, стратегию, проектирование и экономику так, чтобы замысел читался всеми сторонами — подрядчиком, клиентом, предпринимателем, администрацией.',
      m1v: '7',
      m1l: 'лет опыта',
      m2v: '60+',
      m2l: 'реализованных кейсов',
      quote: '«Архитектура — это застывшая музыка.»',
      quoteAuthor: '— Гёте'
    },

    sectors: {
      label: 'Направления работы',
      title: 'Сферы, в которых я работаю',
      sub: 'В разных отраслях, объединённых смыслом',
      items: ['Туризм', 'MICE', 'HoReCa', 'Девелопмент', 'Люксовые бренды', 'События', 'Образование', 'Фиджитал-системы', 'Косметика', 'Креативные индустрии']
    },

    /* ---------- Экспертиза 360 (бывш. «В чём моя разница») ---------- */
    expertise: {
      label: 'Мой подход',
      title: 'Экспертиза 360',
      sub: 'Что получает проект помимо креатива',
      intro: 'Фантазия для меня — рабочий инструмент: придумываю миры и разворачиваю их сразу в цифровом и физическом формате, чтобы замысел не остался красивой картинкой, а стал действующей системой.',
      items: [
        {
          t: 'Сторителлинг и создание миров',
          d: 'Выстраиваю вселенную бренда — легенду, характер, язык — и раскрываю её сразу в двух плоскостях: в цифровой среде и в физическом пространстве. На выходе не набор макетов, а целостный мир, в который можно войти.'
        },
        {
          t: 'Онлайн-бренд выходит в пространство',
          d: 'Проектирую, как digital-бренд живёт офлайн и каким предстаёт на новых площадках. Не магазин, а мультиформат: коворкинг, кафе, примерочная зона, сцена для событий. Современная среда на пересечении технологий, предметного дизайна и бренд-коммуникации.'
        },
        {
          t: 'Методология вместо креатива ради креатива',
          d: 'Работаю как методолог: собираю решения, которые бизнесу действительно нужны — те, что растят капитализацию и добавленную стоимость, а не просто украшают слайды.'
        },
        {
          t: 'Архитектурная база',
          d: 'Первое образование — архитектурное. Поэтому решения опираются на реальный опыт проектирования: масштаб, рельеф, зонирование, потоки людей и экономика площадей — не абстракция, а рабочие параметры.'
        },
        {
          t: 'AI как рабочий инструмент',
          d: 'Использую Claude, Figma Make, Midjourney, Higgsfield и другие современные нейросети. Они поднимают качество и заметно сокращают срок производства: идея превращается в визуализацию, сценарий и MVP в разы быстрее.'
        },
        {
          t: 'Предпринимательский опыт',
          d: 'За плечами собственное дело, поэтому замысел не остаётся замыслом: он переходит в действующие системы и методики. Веду авторский надзор, занимаюсь комплектацией и партнёрскими интеграциями.'
        }
      ]
    },

    /* ---------- Почему бренды выбирают меня ---------- */
    why: {
      label: 'Ценность',
      title: 'Почему бренды выбирают меня',
      sub: 'Стратегический бренд-менеджмент и измеримая ценность',
      intro: 'Я управляю брендами на аутсорсе, где бы ни находился бизнес, — становясь вашим стратегическим партнёром, поднимая капитализацию и обеспечивая измеримый рост. Не просто консультирую: внедряю, трансформирую и выстраиваю системы, которые приносят долгосрочную ценность.',
      items: [
        { t: 'Часть семьи вашего бренда', d: 'Погружаюсь в мир вашего бренда и работаю как доверенный партнёр, которому искренне важен ваш успех.' },
        { t: 'Глобальный бренд-менеджмент', d: 'Полный аутсорсинг бренд-стратегии — беру на себя роль вашего удалённого бренд-директора.' },
        { t: 'Повышение капитализации', d: 'Поднимаю рыночную стоимость через люксовое позиционирование и создание высокоценных активов.' },
        { t: 'Добавленная стоимость и премиум', d: 'Стратегическое перепозиционирование даёт право на более высокий ценник — маржинальность растёт на 15–30%.' },
        { t: 'Ключевые метрики бренда', d: 'Отслеживаю индекс капитала бренда, CLV, NPS, рост доли рынка и ROI бренд-инвестиций.' },
        { t: 'Фиджитал-инновации', d: 'Соединяю физическое и цифровое: бесшовные фиджитал-сценарии и продуманная среда вокруг них.' }
      ],
      badges: ['+15–30% рост маржинальности', '100% удалённо — из любой точки', 'Полный цикл: от аналитики до запуска'],
      outro: 'Я не только управляю брендами — я становлюсь частью их истории, создаю наследие, поднимаю ценность и держу их актуальность в меняющемся мире, сохраняя коммуникацию открытой, тёплой и человечной.'
    },

    /* ---------- Что я делаю ---------- */
    do: {
      label: 'Услуги',
      title: 'Что я делаю',
      sub: 'Креативное производство и бренд-архитектура',
      items: [
        { t: 'Разработка продуктов и брендов', d: 'Создание и вывод на рынок новых продуктов, брендов, а также ребрендинг: от аналитики и концепции до визуального кода, нейминга и упаковки.' },
        { t: 'Управление брендом и продуктом', d: 'Стратегия позиционирования, целостная коммуникация и визуальный язык, управление клиентским опытом, контент-экосистема, репутационная архитектура.' },
        { t: 'Специальные проекты и события', d: 'Форматы, сценарии, креативы, коллаборации, поп-ап активации и мероприятия под ключ — от замысла до площадки.' },
        { t: 'Стратегические сессии и обучение', d: 'Мастер-классы, воркшопы, ДПО, деловые и креативные игры для корпораций и вузов.' }
      ]
    },

    /* ---------- Процесс ---------- */
    process: {
      label: 'Процесс',
      title: 'Как я работаю: от идеи до MVP',
      sub: 'Полный цикл развития бренда',
      items: [
        { t: 'Аналитика', d: 'Рынок, аудитория, философия бизнеса, тайный покупатель' },
        { t: 'Стратегия', d: 'Позиционирование, смыслы, юнит-экономика' },
        { t: 'Концепция', d: 'Идея, CJM, зонирование, нейминг, визуальный код' },
        { t: 'Упаковка', d: 'Визуализации, презентация для инвестора, администрации, партнёра' },
        { t: 'Запуск (MVP)', d: 'Координация подрядчиков, контроль реализации, сопровождение' }
      ],
      note: 'Я не передаю проект «в другие руки» на середине пути — веду его от идеи до живого продукта.'
    },

    /* ---------- Форматы работы ---------- */
    formats: {
      label: 'Сотрудничество',
      title: 'Форматы работы со мной',
      sub: 'Гибко — под задачу, объём и горизонт планирования',
      items: [
        { t: 'Аутсорс и долгосрочное сопровождение', d: 'Веду направление как ваш бренд-директор на аутсорсе: системно, вдолгую и откуда угодно.' },
        { t: 'Проектная работа', d: 'Короткое сотрудничество на один или несколько проектов — с чётким объёмом, сроком и результатом на выходе.' },
        { t: 'Интенсивы и образовательные программы', d: 'Разовый воркшоп, серия мастер-классов или полноценный курс ДПО — под аудиторию и задачу.' },
        { t: 'Независимый эксперт и команда', d: 'Веду проекты самостоятельно. Под конкретную задачу подключаю свою команду — архитекторов, дизайнеров, маркетологов.' }
      ],
      priceLabel: 'Стоимость',
      price: 'По запросу — рассчитывается по техническому заданию.',
      priceNote: 'Напишите о задаче — предложу формат и объём работы.'
    },

    /* ---------- Дашборд «Карта компетенций» ---------- */
    map: {
      label: 'Профиль',
      title: 'Карта компетенций',
      sub: 'Навыки, инструменты и образование — наглядно',
      hint: 'Листайте карточки',
      prev: 'Назад',
      next: 'Вперёд',

      skillsTitle: 'Профиль компетенций',
      skillsHint: 'Шесть направлений, в которых я веду проект',
      skills: [
        'Бренд-стратегия',
        'Средовой дизайн',
        'Креативный продакшн',
        'Продукт и экономика',
        'Управление командой',
        'AI и технологии'
      ],

      toolsTitle: 'Инструменты',
      toolsHint: 'Уровень владения',
      toolsNote: 'Нейросети стоят в общем ряду инструментов: они сокращают путь от замысла к готовому материалу, а не заменяют мышление.',
      levels: ['Базовый', 'Уверенный', 'Продвинутый', 'Экспертный'],
      tools: [
        { name: 'Figma', v: 4, ai: false },
        { name: 'AutoCAD', v: 4, ai: false },
        { name: 'SketchUp', v: 3, ai: false },
        { name: 'Adobe Photoshop', v: 3, ai: false },
        { name: 'Adobe Illustrator', v: 3, ai: false },
        { name: 'Notion', v: 4, ai: false },
        { name: 'Claude', v: 4, ai: true },
        { name: 'Figma Make', v: 4, ai: true },
        { name: 'Midjourney', v: 3, ai: true },
        { name: 'Higgsfield', v: 3, ai: true }
      ],

      eduTitle: 'Образование',
      eduHint: 'Четыре ступени — одна система мышления',
      edu: [
        { years: '2018 — 2022', place: 'РУДН', what: 'Ландшафтная архитектура, перевод', deg: 'Бакалавриат', status: 'done' },
        { years: '2022 — 2024', place: 'НИУ ВШЭ', what: 'Территориальный брендинг и дизайн городской среды', deg: 'Магистратура', status: 'done' },
        { years: '2023 — 2024', place: 'МГИМО и Нетология', what: 'Туризм и гостеприимство · Brand & Product Management', deg: 'Доп. образование', status: 'done' },
        { years: '2026 — 2027', place: 'Rome Business School', what: 'Art & Culture · Brand Management', deg: 'Магистратура', status: 'progress' }
      ],
      eduInProgress: 'В процессе',

      langTitle: 'Языки',
      langHint: 'Свободно веду переговоры и презентации',
      langs: [
        { name: 'Русский', level: 'Родной', v: 1 },
        { name: 'English', level: 'C1', v: 0.8 },
        { name: 'Italiano', level: 'A2', v: 0.35 }
      ],

      softTitle: 'Soft skills',
      softHint: 'Как я работаю с людьми и задачами',
      soft: ['Лидерство', 'Управление командой', 'Менторинг', 'Переговоры', 'Публичные выступления', 'Стратегическое мышление', 'Креативное мышление', 'Эмоциональный интеллект', 'Многозадачность', 'Защита проекта']
    },

    /* ---------- Портфолио ---------- */
    work: {
      label: 'Избранное',
      title: 'Портфолио / Проекты',
      sub: 'Реализованные кейсы: туризм, девелопмент, бренды и события',
      view: 'Смотреть кейс',
      all: 'Все проекты',
      prev: 'Предыдущий кейс',
      next: 'Следующий кейс',
      back: 'К портфолио'
    },

    /* ---------- Контакты ---------- */
    contact: {
      label: 'Контакты',
      title: 'Давайте создавать вместе',
      sub: 'Расскажите о вашем проекте',
      name: 'Имя',
      namePh: 'Как к вам обращаться',
      email: 'Email',
      emailPh: 'you@example.com',
      type: 'Тип проекта',
      typeOptions: ['Туризм и MICE', 'Девелопмент и территории', 'Бренд и продукт', 'Событие и спецпроект', 'Обучение и стратсессия', 'Другое'],
      message: 'Сообщение',
      messagePh: 'Коротко о задаче, сроках и ожидаемом результате',
      submit: 'Отправить запрос',
      sending: 'Отправляем…',
      success: 'Благодарю за заполнение формы — свяжусь с вами в течение часа.',
      error: 'Не удалось отправить. Напишите, пожалуйста, напрямую на почту.',
      errName: 'Укажите имя',
      errEmail: 'Укажите корректный email',
      errMessage: 'Расскажите пару слов о задаче',
      emailLabel: 'Email:',
      studioLabel: 'Локация:',
      studio: 'Рим, Италия — работаю по всему миру'
    },

    footer: {
      copy: '© Александра Николаева — Рим, Италия',
      rights: 'Все проекты и изображения принадлежат автору'
    },

    /* ---------- Подписи на странице кейса ---------- */
    project: {
      caseLabel: 'Кейс',
      explore: 'Смотреть',
      year: 'Год',
      location: 'Локация',
      client: 'Клиент',
      task: 'Задача',
      challenge: 'Главный вызов',
      solution: 'Решение',
      result: 'Результат',
      metrics: 'Ключевые показатели',
      services: 'Объём работ',
      gallery: 'Проект в деталях',
      notFound: 'Кейс не найден.'
    }
  },

  /* =============================== ENGLISH =============================== */
  en: {
    meta: {
      title: 'Sandra Niko — Creative Producer & Brand Strategist',
      desc: 'Creative producer and brand strategist. Full cycle: research, strategy, concept, visualization, investor packaging and launch. Tourism, MICE, development, events, education.'
    },

    nav: {
      work: 'Work',
      map: 'Competencies',
      formats: 'Formats',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      start: 'Start a project'
    },

    hero: {
      name1: 'Sandra',
      name2: 'Niko',
      role: 'Creative Producer & Brand Strategist',
      location: 'Working with brands worldwide',
      scroll: 'Scroll'
    },

    about: {
      label: 'About',
      text: 'My expertise sits where marketing, art direction, environmental design and directing meet. My first degree is in architecture, my second in brand management. Hence the systemic thinking and the ability to lead space, brand and communication as one set of touchpoints.',
      text2: 'That hybrid background lets me connect business philosophy, strategy, design and economics so the idea reads clearly to everyone involved — the contractor, the client, the entrepreneur, the administration.',
      m1v: '7',
      m1l: 'years of experience',
      m2v: '60+',
      m2l: 'delivered projects',
      quote: '"Architecture is frozen music."',
      quoteAuthor: '— Goethe'
    },

    sectors: {
      label: 'Fields of work',
      title: 'Sectors I work in',
      sub: 'Across industries, united by meaning',
      items: ['Tourism', 'MICE', 'HoReCa', 'Development', 'Luxury brands', 'Events', 'Education', 'Phygital systems', 'Cosmetics', 'Creative industries']
    },

    expertise: {
      label: 'My approach',
      title: 'Expertise 360',
      sub: 'What a project gains beyond creative',
      intro: 'Imagination is a working instrument for me: I invent worlds and unfold them in the digital and the physical at once, so the idea never stays a pretty picture but becomes a functioning system.',
      items: [
        {
          t: 'Storytelling and world-building',
          d: 'I build the universe of a brand — its legend, character and language — and reveal it on two planes at once: in the digital environment and in physical space. What you get is not a set of layouts but a coherent world you can walk into.'
        },
        {
          t: 'Online brands moving into space',
          d: 'I design how a digital brand lives offline and how it appears on new sites. Not a shop, but a multi-format venue: coworking, café, fitting area, a stage for events. A contemporary environment where technology, product design and brand communication intersect.'
        },
        {
          t: 'Methodology over creative for its own sake',
          d: 'I work as a methodologist: I assemble solutions a business genuinely needs — the ones that grow capitalization and added value rather than merely decorate slides.'
        },
        {
          t: 'An architectural foundation',
          d: 'My first degree is in architecture. Decisions therefore rest on real design experience: scale, terrain, zoning, pedestrian flows and the economics of floor area are working parameters, not abstractions.'
        },
        {
          t: 'AI as a working instrument',
          d: 'I use Claude, Figma Make, Midjourney, Higgsfield and other modern neural networks. They raise quality and noticeably shorten production time: an idea becomes visualization, scenario and MVP several times faster.'
        },
        {
          t: 'Entrepreneurial experience',
          d: 'I have run my own business, so an idea never stays an idea: it turns into functioning systems and methodologies. I supervise as design author, handle procurement and partner integrations.'
        }
      ]
    },

    why: {
      label: 'Value',
      title: 'Why brands choose me',
      sub: 'Strategic brand management and measurable value',
      intro: 'I manage brands on an outsourcing basis, wherever the business sits — becoming your strategic partner, lifting equity and delivering measurable growth. Not merely advising: I execute, transform and build systems that create lasting value.',
      items: [
        { t: "Part of your brand's family", d: "I immerse myself in your brand's world and act as a trusted partner who genuinely cares about your success." },
        { t: 'Global brand management', d: 'Full outsourcing of brand strategy — I take on the role of your remote brand director.' },
        { t: 'Increased capitalization', d: 'I lift market value through luxury positioning and the creation of high-value assets.' },
        { t: 'Added value & premium pricing', d: 'Strategic repositioning earns the right to a higher price tag — margins grow by 15–30%.' },
        { t: 'Key brand metrics', d: 'I track Brand Equity Index, CLV, NPS, market share growth and ROI on brand investments.' },
        { t: 'Phygital innovation', d: 'I join the physical and the digital: seamless phygital scenarios and a considered environment around them.' }
      ],
      badges: ['+15–30% margin increase', '100% remote — any location', 'Full cycle: from research to launch'],
      outro: "I don't only manage brands — I become part of their story, build their legacy, lift their value and keep them relevant in a changing world, while keeping communication open, warm and human."
    },

    do: {
      label: 'Services',
      title: 'What I do',
      sub: 'Creative production & brand architecture',
      items: [
        { t: 'Product and brand development', d: 'Creating and launching new products and brands, plus rebrands: from research and concept to visual code, naming and packaging.' },
        { t: 'Brand and product management', d: 'Positioning strategy, coherent communication and visual language, customer experience management, content ecosystem, reputation architecture.' },
        { t: 'Special projects and events', d: 'Formats, scenarios, creative concepts, collaborations, pop-up activations and turnkey events — from concept to the venue itself.' },
        { t: 'Strategy sessions and training', d: 'Masterclasses, workshops, professional programmes, business and creative games for corporations and universities.' }
      ]
    },

    process: {
      label: 'Process',
      title: 'How I work: from idea to MVP',
      sub: 'Full-cycle brand development',
      items: [
        { t: 'Research', d: 'Market, audience, business philosophy, mystery shopping' },
        { t: 'Strategy', d: 'Positioning, meaning, unit economics' },
        { t: 'Concept', d: 'Idea, CJM, zoning, naming, visual code' },
        { t: 'Packaging', d: 'Visualizations, a presentation for the investor, administration, partner' },
        { t: 'Launch (MVP)', d: 'Contractor coordination, implementation control, project support' }
      ],
      note: "I don't hand the project over mid-way — I lead it from idea to a living product."
    },

    formats: {
      label: 'Engagement',
      title: 'Ways to work with me',
      sub: 'Flexible — matched to the task, scope and planning horizon',
      items: [
        { t: 'Outsourcing and long-term partnership', d: 'I lead the direction as your outsourced brand director: systematically, over a long horizon, from anywhere.' },
        { t: 'Project-based work', d: 'A short engagement on one or several projects — with a clear scope, timeline and deliverable.' },
        { t: 'Intensives and educational programmes', d: 'A one-off workshop, a series of masterclasses or a full professional course — matched to the audience and the task.' },
        { t: 'Independent expert and team', d: 'I lead projects on my own. For a specific task I bring in my team — architects, designers, marketers.' }
      ],
      priceLabel: 'Fee',
      price: 'On request — calculated against the brief.',
      priceNote: 'Tell me about the task and I will propose a format and scope.'
    },

    map: {
      label: 'Profile',
      title: 'Competency Map',
      sub: 'Skills, tools and education at a glance',
      hint: 'Swipe the cards',
      prev: 'Previous',
      next: 'Next',

      skillsTitle: 'Competency profile',
      skillsHint: 'Six directions in which I lead a project',
      skills: [
        'Brand strategy',
        'Environmental design',
        'Creative production',
        'Product & economics',
        'Team management',
        'AI & technology'
      ],

      toolsTitle: 'Tools',
      toolsHint: 'Proficiency',
      toolsNote: 'Neural networks sit alongside every other instrument: they shorten the path from idea to finished material rather than replacing thought.',
      levels: ['Basic', 'Confident', 'Advanced', 'Expert'],
      tools: [
        { name: 'Figma', v: 4, ai: false },
        { name: 'AutoCAD', v: 4, ai: false },
        { name: 'SketchUp', v: 3, ai: false },
        { name: 'Adobe Photoshop', v: 3, ai: false },
        { name: 'Adobe Illustrator', v: 3, ai: false },
        { name: 'Notion', v: 4, ai: false },
        { name: 'Claude', v: 4, ai: true },
        { name: 'Figma Make', v: 4, ai: true },
        { name: 'Midjourney', v: 3, ai: true },
        { name: 'Higgsfield', v: 3, ai: true }
      ],

      eduTitle: 'Education',
      eduHint: 'Four stages — one way of thinking',
      edu: [
        { years: '2018 — 2022', place: 'RUDN University', what: 'Landscape architecture, translation', deg: "Bachelor's", status: 'done' },
        { years: '2022 — 2024', place: 'HSE University', what: 'Territorial branding and urban environment design', deg: "Master's", status: 'done' },
        { years: '2023 — 2024', place: 'MGIMO and Netology', what: 'Tourism & hospitality · Brand & product management', deg: 'Additional', status: 'done' },
        { years: '2026 — 2027', place: 'Rome Business School', what: 'Art & Culture · Brand Management', deg: "Master's", status: 'progress' }
      ],
      eduInProgress: 'In progress',

      langTitle: 'Languages',
      langHint: 'I negotiate and present freely',
      langs: [
        { name: 'Russian', level: 'Native', v: 1 },
        { name: 'English', level: 'C1', v: 0.8 },
        { name: 'Italiano', level: 'A2', v: 0.35 }
      ],

      softTitle: 'Soft skills',
      softHint: 'How I work with people and tasks',
      soft: ['Leadership', 'Team management', 'Mentoring', 'Negotiation', 'Public speaking', 'Strategic thinking', 'Creative thinking', 'Emotional intelligence', 'Multitasking', 'Pitching']
    },

    work: {
      label: 'Selected',
      title: 'Portfolio / Projects',
      sub: 'Delivered cases: tourism, development, brands and events',
      view: 'View case',
      all: 'All projects',
      prev: 'Previous case',
      next: 'Next case',
      back: 'Back to portfolio'
    },

    contact: {
      label: 'Contact',
      title: "Let's create together",
      sub: 'Tell me about your project',
      name: 'Name',
      namePh: 'How should I address you',
      email: 'Email',
      emailPh: 'you@example.com',
      type: 'Project type',
      typeOptions: ['Tourism & MICE', 'Development & territories', 'Brand & product', 'Event & special project', 'Training & strategy session', 'Other'],
      message: 'Message',
      messagePh: 'Briefly about the task, timeline and expected outcome',
      submit: 'Send inquiry',
      sending: 'Sending…',
      success: 'Thank you for your message — I will get back to you within the hour.',
      error: 'Could not send. Please write to me directly by email.',
      errName: 'Please enter your name',
      errEmail: 'Please enter a valid email',
      errMessage: 'Tell me a couple of words about the task',
      emailLabel: 'Email:',
      studioLabel: 'Location:',
      studio: 'Rome, Italy — working worldwide'
    },

    footer: {
      copy: '© Sandra Niko — Rome, Italy',
      rights: 'All projects and images belong to the author'
    },

    project: {
      caseLabel: 'Case study',
      explore: 'Explore',
      year: 'Year',
      location: 'Location',
      client: 'Client',
      task: 'The brief',
      challenge: 'The challenge',
      solution: 'The solution',
      result: 'Outcome',
      metrics: 'Key figures',
      services: 'Scope of work',
      gallery: 'Project in detail',
      notFound: 'Case study not found.'
    }
  }
};

/* ------------------------------------------------------------------
   Проекты. Порядок в массиве = порядок в портфолио и навигации
   «предыдущий / следующий».

   cover — необязательное поле: картинка для плитки в портфолио,
   если она должна отличаться от обложки самого кейса.
   ------------------------------------------------------------------ */

window.PROJECTS = [

  {
    slug: 'rose-stone',
    year: '2026',
    client: 'NDA',
    dir: 'rose-stone',
    images: ['hero.jpg', '02-identity.jpg', '01-zoning.jpg', '05-pool.jpg', '06-fields.jpg', '03-label.jpg', '04-bottle.jpg'],
    ru: {
      title: 'Rosé & Stone',
      kicker: 'Туристический кластер',
      location: 'Казанлык, Болгария',
      tags: ['Мастер-план', 'Зонирование', 'Нейминг', 'Стратегия', 'Брендинг', 'Упаковка проекта'],
      summary: 'Туристический кластер в сердце Болгарской Долины роз, где среди гор на 40 гектарах сходятся винодельня, бутик-отель и ресторан в элегантном средиземноморском стиле с белым камнем и арками. Обширные виноградники, розовые и лавандовые поля дополняют картину премиального отдыха.',
      task: 'Комплексная разработка кластера и рост узнаваемости региона: от мастер-плана и сценариев пользования до фирменного стиля, легенды и вывода на рынок собственного вина.',
      challenge: 'Регион с сильной идентичностью — Долина роз — оставался малоизвестен за пределами Болгарии. Требовалось собрать разрозненные функции (винодельня, отель, ресторан, поля) в единую историю, которая работает и как туристический продукт, и как инвестиционный кейс.',
      solution: 'Название родилось из местной легенды о союзе прочного горного духа, воплощённого в камне, и нежной души розы, подарившей ему свою целебную слезу. История переходит в архитектуру, где белый камень служит основой, а розовые поля наполняют территорию жизнью и ароматом. Легенда развёрнута в зонировании, сценариях пользования, фирменном стиле и этикетке вина.',
      result: 'Проект одобрен к реализации, узнаваемость региона выросла на 22%, усилена культура и привлечены инвестиционные потоки. Открытие кластера и запуск брендированного вина станут двойным событием, объединившим старт территории и фестиваль.',
      metrics: [
        { v: '40 га', l: 'площадь кластера' },
        { v: '+22%', l: 'узнаваемость региона' },
        { v: '3', l: 'функции в одном кластере' }
      ],
      captions: ['Территория кластера', 'Фирменный стиль и легенда', 'Зонирование и сценарии пользования', 'Атмосфера отдыха', 'Розовые и лавандовые поля', 'Вывод нового вина на рынок', 'Брендированное вино']
    },
    en: {
      title: 'Rosé & Stone',
      kicker: 'Tourism cluster',
      location: 'Kazanlak, Bulgaria',
      tags: ['Master plan', 'Zoning', 'Naming', 'Strategy', 'Branding', 'Project packaging'],
      summary: 'A tourism cluster in the heart of the Bulgarian Valley of Roses, where a winery, a boutique hotel and a restaurant meet across 40 hectares of mountain landscape in an elegant Mediterranean language of white stone and arches. Extensive vineyards, rose and lavender fields complete the picture of premium leisure.',
      task: 'End-to-end development of the cluster and growth of regional awareness: from master plan and use scenarios to visual identity, brand legend and the market launch of the estate wine.',
      challenge: 'A region with a strong identity — the Valley of Roses — remained little known outside Bulgaria. Separate functions (winery, hotel, restaurant, fields) had to be assembled into a single story that works both as a tourism product and as an investment case.',
      solution: 'The name grew out of a local legend about the union of the steadfast mountain spirit embodied in stone and the tender soul of the rose, which gave it its healing tear. The story carries into the architecture, where white stone forms the base and the rose fields fill the territory with life and scent. The legend unfolds across zoning, use scenarios, visual identity and the wine label.',
      result: 'The project was approved for implementation, regional awareness grew by 22%, cultural presence strengthened and investment flows were attracted. The opening of the cluster and the launch of the branded wine will form a double event — the start of the territory and a festival.',
      metrics: [
        { v: '40 ha', l: 'cluster area' },
        { v: '+22%', l: 'regional awareness' },
        { v: '3', l: 'functions in one cluster' }
      ],
      captions: ['The cluster territory', 'Visual identity and legend', 'Zoning and use scenarios', 'The atmosphere of leisure', 'Rose and lavender fields', 'Bringing a new wine to market', 'The branded wine']
    }
  },

  {
    slug: 'rodnoe',
    year: '2025',
    client: 'NDA',
    dir: 'rodnoe',
    images: ['hero.jpg', '01-masterplan.jpg', '02-architecture.jpg'],
    ru: {
      title: 'Родное',
      kicker: 'Усадебный парк-курорт',
      location: 'Севастополь, Терновский округ',
      tags: ['Мастер-план', 'Продуктовая концепция', 'Зонирование', 'Архитектурное задание', 'ТЭПы', 'Упаковка проекта'],
      summary: '«Родное» — место, где природа становится терапией. Круглогодичный парк-курорт для осознанного отдыха и восстановления на 67,21 га, из них 16,61 га под освоение. Проект объединяет идеи заземления, осознанного движения, пользы и настоящего комьюнити.',
      task: 'Разработать продуктовую концепцию, структуру номерного фонда, зонирование, архитектурное задание, рассчитать ТЭПы и подготовить презентационные материалы.',
      challenge: 'Сохранить природный ландшафт — черешневые сады, два озера, лесные массивы, поляну подснежников, эвкалиптовую рощу — и при этом бережно вписать в рельеф архитектуру, которая экономически оправдана и рассчитана на три разные аудитории сразу.',
      solution: 'Номерной фонд собран из типологий под конкретные сценарии: 10 семейных домов на две спальни, 4 дома на одну спальню для семей с ребёнком, 12 домов на одну спальню для пар и соло, 2 резиденции для малых компаний, 24 студии в клубном и корпоративном корпусах. Все сценарии досуга спрограммированы, аудитории разведены по территории — это сохраняет тишину и комфорт каждому гостю.',
      result: 'Проект ориентирован на три ключевых сегмента: пары и соло (45%), семьи с детьми (35%), малые компании и корпоративные заезды (20%). Упор сделан на осознанный отдых, восстановление, экологичность и заземление.',
      metrics: [
        { v: '67,21 га', l: 'общая площадь' },
        { v: '16,61 га', l: 'под освоение' },
        { v: '48', l: 'ключей' },
        { v: '112', l: 'гостей единовременно' }
      ],
      captions: ['Парк-курорт в ландшафте', 'Мастер-план территории', 'Архитектура, вписанная в рельеф']
    },
    en: {
      title: 'Rodnoe',
      kicker: 'Estate park-resort',
      location: 'Sevastopol, Ternovsky district',
      tags: ['Master plan', 'Product concept', 'Zoning', 'Architectural brief', 'Feasibility figures', 'Project packaging'],
      summary: 'Rodnoe is a place where nature becomes therapy. A year-round park-resort for mindful rest and recovery across 67.21 hectares, of which 16.61 are developed. It brings together grounding, mindful movement, wellbeing and genuine community.',
      task: 'Develop the product concept, the structure of the accommodation stock, zoning and the architectural brief; calculate feasibility figures and prepare presentation materials.',
      challenge: 'Preserve the natural landscape — cherry orchards, two lakes, woodland, a snowdrop meadow and a eucalyptus grove — while carefully setting architecture into the terrain that is economically sound and serves three different audiences at once.',
      solution: 'The accommodation stock is assembled from typologies matched to specific scenarios: 10 family houses with two bedrooms, 4 one-bedroom houses for families with a child, 12 one-bedroom houses for couples and solo travellers, 2 residences for small groups, and 24 studios in the club and corporate buildings. Every leisure scenario is programmed and audiences are separated across the territory, which preserves quiet and comfort for each guest.',
      result: 'The project targets three key segments: couples and solo travellers (45%), families with children (35%), small groups and corporate stays (20%), with the emphasis on mindful rest, recovery, sustainability and grounding.',
      metrics: [
        { v: '67.21 ha', l: 'total area' },
        { v: '16.61 ha', l: 'developed' },
        { v: '48', l: 'keys' },
        { v: '112', l: 'guests at a time' }
      ],
      captions: ['The resort in its landscape', 'Territory master plan', 'Architecture set into the terrain']
    }
  },

  {
    slug: 'valley-wanderers',
    year: '2026',
    client: 'NDA',
    dir: 'valley-wanderers',
    cover: '01-map.jpg',
    images: ['hero.jpg', '01-map.jpg', '02-navigation.jpg', '03-lantern.jpg'],
    ru: {
      title: 'Странники долины',
      kicker: 'Глэмпинг и философский ретрит',
      location: 'Калмыкия, Россия',
      tags: ['Мастер-план', 'Зонирование', 'Нейминг', 'Стратегия', 'Брендинг', 'Упаковка проекта'],
      summary: 'Вдохновлённый духом ковбойских странствий и посвящённый поиску себя, проект создан вместе с психологами и предлагает три этапа трансформации: от отречения от ложных целей до обретения новых смыслов. Пространство соединяет вестерн-эстетику с глубокой философией — медитации у костра, конные прогулки и ритуалы становятся инструментами самопознания.',
      task: 'Комплексная разработка концепции глэмпинга: мастер-план, зонирование, брендинг и упаковка под тренды и запросы рынка.',
      challenge: 'Сделать так, чтобы философская программа не осталась текстом в буклете, а читалась прямо в среде: в маршруте, архитектуре, навигации и сценариях активностей.',
      solution: 'Три этапа трансформации вшиты в архитектуру и маршрут по территории: каждый получил свою зону, свой ритуал и свой объект. Навигация построена на именах-состояниях — «беседка прозрения», «гостевые домики», — так путь по территории превращается в путь внутренний.',
      result: 'Разработаны мастер-план, зонирование, брендинг и концепция трёх этапов трансформации. Проект открывает новую нишу на стыке wellness-туризма и философских ретритов, формируя место для восстановления и самопознания.',
      metrics: [
        { v: '3', l: 'этапа трансформации' },
        { v: '2', l: 'ниши в одном формате: wellness и ретрит' }
      ],
      captions: ['Глэмпинг на закате', 'Туристическая карта и навигация', 'Навигация по территории', 'Свет как элемент среды']
    },
    en: {
      title: 'Valley Wanderers',
      kicker: 'Glamping and philosophical retreat',
      location: 'Kalmykia, Russia',
      tags: ['Master plan', 'Zoning', 'Naming', 'Strategy', 'Branding', 'Project packaging'],
      summary: 'Inspired by the spirit of cowboy wandering and devoted to the search for self, the project was created together with psychologists and offers three stages of transformation, from renouncing false goals to finding new meaning. The space joins western aesthetics with deep philosophy: fireside meditation, horse rides and rituals become instruments of self-discovery.',
      task: 'End-to-end development of the glamping concept: master plan, zoning, branding and packaging aligned with market trends and demand.',
      challenge: 'Ensure the philosophical programme did not remain text in a brochure, but stayed legible in the environment itself — in the route, the architecture, the wayfinding and the activity scenarios.',
      solution: 'The three stages of transformation are sewn into the architecture and the route across the territory: each received its own zone, its own ritual and its own object. Wayfinding is built on names that describe states, so moving through the territory turns into an inner journey.',
      result: 'Master plan, zoning, branding and the three-stage transformation concept were developed. The project opens a new niche between wellness tourism and philosophical retreats, shaping a place for recovery and self-discovery.',
      metrics: [
        { v: '3', l: 'stages of transformation' },
        { v: '2', l: 'niches in one format: wellness and retreat' }
      ],
      captions: ['Glamping at sunset', 'Tourist map and wayfinding', 'Wayfinding across the territory', 'Light as part of the environment']
    }
  },

  {
    slug: 'menok-spa',
    year: '2026',
    client: 'Сапожковские грязи',
    clientEn: 'Sapozhkovskie Gryazi',
    dir: 'menok-spa',
    images: ['hero.jpg', '01-interior.jpg', '02-plan.jpg', '03-signage.jpg', '04-packaging.jpg', '05-soap.jpg', '06-cream.jpg', '07-flags.jpg'],
    ru: {
      title: 'MENOK SPA',
      kicker: 'Модульный спа-комплекс и бренд косметики',
      location: 'Россия',
      tags: ['Управление проектом', 'Разработка бренда', 'Продукт', 'Модульная архитектура', 'Косметика', 'Франшиза'],
      summary: 'MENOK SPA — автономный спа-комплекс, собранный из четырёх транспортных блоков (каждый 6×3×3 м) в единое пространство около 100 м² с двумя процедурными кабинетами, зонами отдыха, банями, хамамом и торфяной комнатой. Продукт предлагается по модели франшизы с полным пакетом методологии.',
      task: 'Разработать продукт, бренд и модуль как тиражируемую систему: от планировки и интеграции бренда в среду до собственной линейки косметики и упаковки под франшизу.',
      challenge: 'Собрать полноценный спа-опыт в габаритах транспортных блоков — так, чтобы продукт остался премиальным, тиражировался от 15 модулей в год и при этом сохранял индивидуальность в каждой локации.',
      solution: 'MENOK — это «тихий бунт» против суеты и поверхностности. Мы возвращаем человеку связь с землёй через осязаемый люкс: природные материалы, слоистые текстуры, тактильную глубину. В основе всего — собственная косметика на базе сапожковского торфа, уникального ультракислого пелоида с рекордным содержанием железа.',
      result: 'Создан тиражируемый продукт с полным пакетом методологии: планировка, интеграция бренда в среду, навигация, линейка косметики и упаковка. Франшиза рассчитана на выпуск от 15 модулей в год.',
      metrics: [
        { v: '~100 м²', l: 'площадь комплекса' },
        { v: '4', l: 'транспортных модуля 6×3×3 м' },
        { v: '15+', l: 'модулей в год по франшизе' }
      ],
      captions: ['Спа-комплекс в среде', 'Интерьер и материалы', 'Планировка модуля', 'Интеграция бренда в среду', 'Упаковка косметики', 'Линейка мыла', 'Крем на основе торфа', 'Носители фирменного стиля']
    },
    en: {
      title: 'MENOK SPA',
      kicker: 'Modular spa complex and cosmetics brand',
      location: 'Russia',
      tags: ['Project management', 'Brand development', 'Product', 'Modular architecture', 'Cosmetics', 'Franchise'],
      summary: 'MENOK SPA is a self-contained spa complex assembled from four shipping modules (6×3×3 m each) into a single space of roughly 100 m², with two treatment rooms, relaxation areas, saunas, a hammam and a peat room. The product is offered as a franchise with a full methodology package.',
      task: 'Develop the product, the brand and the module as a replicable system: from the layout and brand integration into the environment to an in-house cosmetics line and franchise packaging.',
      challenge: 'Fit a complete spa experience within the dimensions of shipping modules — keeping the product premium, replicable from 15 modules a year, and still individual in every location.',
      solution: 'MENOK is a quiet rebellion against haste and superficiality. It returns the connection with the earth through tangible luxury: natural materials, layered textures, tactile depth. At the core is an in-house cosmetics line based on Sapozhok peat — a unique ultra-acidic peloid with a record iron content.',
      result: 'A replicable product with a full methodology package: layout, brand integration into the environment, wayfinding, cosmetics line and packaging. The franchise is designed to produce from 15 modules per year.',
      metrics: [
        { v: '~100 m²', l: 'complex area' },
        { v: '4', l: 'shipping modules 6×3×3 m' },
        { v: '15+', l: 'modules per year via franchise' }
      ],
      captions: ['The spa complex in its setting', 'Interior and materials', 'Module layout', 'Brand integrated into the environment', 'Cosmetics packaging', 'The soap line', 'Peat-based cream', 'Identity carriers']
    }
  },

  {
    slug: 'agrobiotuscany',
    year: '2026',
    client: 'NDA',
    dir: 'agrobiotuscany',
    images: ['hero.jpg', '01-capsule.jpg', '02-alley.jpg'],
    ru: {
      title: 'AgroBioTuscany',
      kicker: 'Агро-курортный комплекс',
      location: 'Тоскана, Италия',
      tags: ['Концепция', 'Типология', 'Бионика', 'Эко-интеграция', 'Умные технологии'],
      summary: 'Агро-фермерский курорт нового поколения, где высокие технологии и природа соединяются в единую среду обитания. Вертикальные фермы высотой 3–4 метра образуют зелёные аллеи, расставленные небольшими группами. Между ними — жилые капсулы в стиле бионика: современная архитектура, абстрактные формы, прозрачные объёмы, минимализм, вписанность в рельеф.',
      task: 'Разработать концепцию комплекса, который одновременно служит агро-инновационным центром, курортом для осознанного отдыха и местом для жизни в гармонии с природой и технологиями.',
      challenge: 'Соединить производственную функцию вертикального фермерства с курортным сценарием так, чтобы техника не подавляла ландшафт, а жильё не читалось как объект посреди поля.',
      solution: 'Модульные дома не доминируют, а прячутся среди вертикальных огородов — капсулы утоплены в зелень, создавая ощущение лёгкости и единения с природой. Пространство между домами и фермами организовано экологическими тропами с гравийным покрытием. Архитектурный язык — современная абстракция, бионика, минимализм, свет, воздух, зелень.',
      result: 'Комплекс работает сразу в трёх ролях: агро-инновационный центр (вертикальное фермерство, умные системы полива, контроль микроклимата), курорт для осознанного отдыха и место для жизни в гармонии с природой и технологиями.',
      metrics: [
        { v: '3–4 м', l: 'высота вертикальных ферм' },
        { v: '3', l: 'функции в одной среде' }
      ],
      captions: ['Вертикальные фермы и жилые капсулы', 'Жилая капсула среди вертикальных огородов', 'Зелёная аллея между фермами']
    },
    en: {
      title: 'AgroBioTuscany',
      kicker: 'Agri-resort complex',
      location: 'Tuscany, Italy',
      tags: ['Concept', 'Typology', 'Bionics', 'Eco-integration', 'Smart technology'],
      summary: 'A new-generation agri-farming resort where advanced technology and nature merge into a single habitat. Vertical farms three to four metres high form green alleys arranged in small groups. Between them sit bionic living capsules: contemporary architecture, abstract forms, transparent volumes, minimalism, set into the terrain.',
      task: 'Develop the concept of a complex that serves at once as an agri-innovation centre, a resort for mindful rest, and a place to live in harmony with nature and technology.',
      challenge: 'Combine the productive function of vertical farming with a resort scenario so the machinery never overwhelms the landscape and the housing never reads as an object dropped in a field.',
      solution: 'The modular houses do not dominate — they hide among the vertical gardens, sunk into the greenery to create a sense of lightness and unity with nature. The space between houses and farms is organised with gravel eco-trails. The architectural language is contemporary abstraction, bionics, minimalism, light, air and green.',
      result: 'The complex works in three roles at once: an agri-innovation centre (vertical farming, smart irrigation, microclimate control), a resort for mindful rest, and a place to live in harmony with nature and technology.',
      metrics: [
        { v: '3–4 m', l: 'height of the vertical farms' },
        { v: '3', l: 'functions in one environment' }
      ],
      captions: ['Vertical farms and living capsules', 'A living capsule among the vertical gardens', 'The green alley between the farms']
    }
  },

  {
    slug: 'rebirth-forum',
    year: '2026',
    client: 'NDA',
    dir: 'rebirth-forum',
    images: ['hero.jpg', '01-stage.jpg', '02-badges.jpg'],
    ru: {
      title: 'Форум RE:BIRTH',
      kicker: 'Комплексная упаковка события',
      location: 'Россия',
      tags: ['Концепция', 'Сценарий', 'Брендинг', 'Фирменный стиль события', 'Мультимедиа'],
      summary: 'Форум, посвящённый экологии и безотходному производству. Название расшифровывается как Revolutionary Ecology & Business Innovation for Resource Transformation Hub.',
      task: 'Комплексная упаковка форума: концепция, сценарий и брендинг — от идеи события до носителей фирменного стиля.',
      challenge: 'Сделать деловое событие об экологии таким, чтобы тема безотходного производства считывалась не из презентаций спикеров, а из самой среды зала.',
      solution: 'Концепция строится на заранее подготовленном контенте спикеров, встроенном в чистую белоснежную среду через яркие мультимедиа-модули с полупрозрачной диффузией и подсветкой элементов пластика. Человек становится частью перформанса, превращая деловое событие в полноценное шоу.',
      result: 'Событие получило целостную концепцию, сценарий и систему носителей фирменного стиля — от сценографии зала до бейджей участников.',
      metrics: [],
      captions: ['Сценография главного зала', 'Мультимедиа-среда', 'Носители фирменного стиля']
    },
    en: {
      title: 'RE:BIRTH Forum',
      kicker: 'End-to-end event packaging',
      location: 'Russia',
      tags: ['Concept', 'Scenario', 'Branding', 'Event identity', 'Multimedia'],
      summary: 'A forum devoted to ecology and zero-waste production. The name stands for Revolutionary Ecology & Business Innovation for Resource Transformation Hub.',
      task: 'End-to-end packaging of the forum: concept, scenario and branding — from the idea of the event to the identity carriers.',
      challenge: 'Make a business event about ecology where the theme of zero-waste production is read from the environment of the hall itself, not from the speakers’ slides.',
      solution: 'The concept builds on pre-prepared speaker content embedded into a clean, snow-white environment through vivid multimedia modules with semi-transparent diffusion and illuminated plastic elements. The visitor becomes part of the performance, turning a business event into a full show.',
      result: 'The event received a coherent concept, scenario and identity system — from the scenography of the hall to the participant badges.',
      metrics: [],
      captions: ['Scenography of the main hall', 'The multimedia environment', 'Identity carriers']
    }
  },

  {
    slug: 'bagstory',
    year: '2026',
    client: 'NDA',
    dir: 'bagstory',
    // кадр вертикальный, плитка горизонтальная — держим в рамке бирку
    // и подпись, обрезая пустой верх с фоном аэропорта
    focus: 'center 78%',
    images: ['hero.jpg', '01-app.jpg', '02-journeys.jpg', '03-journeys-b.jpg'],
    ru: {
      title: 'История чемодана',
      kicker: 'Специальный проект · Продюсирование',
      location: 'Москва, Россия',
      tags: ['Продюсирование спецпроекта', 'Бренд компании', 'Цифровой продукт', 'Эмоциональный маркетинг'],
      summary: 'BagStory — сервис, который превращает чемодан в хроникёра путешествий. С помощью небольшого брелока-трекера, QR-кода и опциональной мини-камеры чемодан запоминает свой маршрут: километраж, страны, перелёты. В мобильном приложении эти данные превращаются в интерактивную карту, статистику и короткие истории от лица чемодана — текстовые и в формате мини-фильмов.',
      task: 'Запустить новый формат эмоционального маркетинга в туристической отрасли, усилить лояльность аудитории и собрать уникальный пользовательский контент, работающий на узнаваемость бренда.',
      challenge: 'Чемодан — функциональный товар, о котором не рассказывают. Нужно было найти механику, которая превращает покупку в повод для истории и возвращает клиента к бренду между поездками.',
      solution: 'Мы отдали голос самому предмету. Трекер и QR-код собирают маршрут, а приложение превращает сухие данные в повествование от первого лица — чемодан рассказывает, где побывал, сколько километров прошёл и что видел. Так функциональная покупка становится носителем личной истории владельца.',
      result: 'Сформирован новый формат эмоционального маркетинга в туристической отрасли: бренд получает поток пользовательского контента, а клиент — повод возвращаться к продукту между путешествиями.',
      metrics: [],
      captions: ['Трекер на чемодане', 'Мобильное приложение и карта маршрута', 'Хроника путешествий', 'Маршрут глазами чемодана']
    },
    en: {
      title: 'BagStory',
      kicker: 'Special project · Production',
      location: 'Moscow, Russia',
      tags: ['Special project production', 'Corporate brand', 'Digital product', 'Emotional marketing'],
      summary: 'BagStory turns a suitcase into the chronicler of its own travels. A small tracker fob, a QR code and an optional mini-camera let the case remember its route: distance, countries, flights. In the mobile app this data becomes an interactive map, statistics and short stories told by the suitcase itself — as text and as mini-films.',
      task: 'Launch a new format of emotional marketing in the travel industry, strengthen audience loyalty and gather distinctive user content that builds brand recognition.',
      challenge: 'A suitcase is a functional product nobody talks about. We needed a mechanic that turns a purchase into an occasion for a story and brings the customer back to the brand between trips.',
      solution: 'We gave the object its own voice. The tracker and QR code capture the route, and the app turns dry data into a first-person narrative — the suitcase recounts where it has been, how far it has travelled and what it has seen. A functional purchase becomes the carrier of its owner’s personal story.',
      result: 'A new format of emotional marketing in the travel industry: the brand gains a stream of user-generated content, and the customer gains a reason to return to the product between journeys.',
      metrics: [],
      captions: ['The tracker on the case', 'Mobile app and route map', 'A chronicle of journeys', 'The route as the suitcase sees it']
    }
  },

  {
    slug: 'moscow-picnic',
    year: '2025',
    client: 'Парки Москвы',
    clientEn: 'Moscow Parks',
    dir: 'moscow-picnic',
    images: ['hero.jpg', '03-size-s.jpg', '04-size-m.jpg', '05-size-l.jpg', '06-size-xl.jpg', '02-app.jpg'],
    ru: {
      title: 'Пикник в парках Москвы',
      kicker: 'Продукт · Малые архитектурные формы',
      location: 'Москва, 4 парка',
      tags: ['Продукт', 'МАФ', 'Размерная линейка', 'Мобильное приложение', 'Фирменный стиль'],
      summary: 'Размерная линейка пикниковых зон под разные форматы парковых территорий и разное количество людей, выдержанная в единой стилистике бренда «Парки Москвы». Форма и конструкция вытекают из философии бренда.',
      task: 'Собрать систему пикниковых зон, которая масштабируется под разные парки и компании — от небольшой группы до крупного мероприятия — и остаётся узнаваемой как единый продукт.',
      challenge: 'Парки различаются по площади, рельефу и посещаемости. Требовалось одно решение, которое одинаково хорошо ведёт себя и в маленьком сквере, и на большой территории, без потери стиля и удобства эксплуатации.',
      solution: 'Разработана линейка из четырёх типоразмеров — S (6–8 человек), M (10–15), L (20–30) и XL (30–40). Все типы собраны на общей конструктивной логике и едином визуальном коде. Дополнительно проработана концепция мобильного приложения для заказа наборов в пикниковые точки.',
      result: 'Продукт внедряется в четырёх парках. Единая линейка позволяет тиражировать решение на новые территории без переработки конструкции и стиля.',
      metrics: [
        { v: '4', l: 'парка' },
        { v: '4', l: 'типоразмера: S · M · L · XL' },
        { v: '30–40', l: 'человек в максимальном формате' }
      ],
      captions: ['Пикниковая зона в парке', 'Формат S — 6–8 человек', 'Формат M — 10–15 человек', 'Формат L — 20–30 человек', 'Формат XL — 30–40 человек', 'Приложение для заказа наборов']
    },
    en: {
      title: 'Picnic in Moscow Parks',
      kicker: 'Product · Street furniture',
      location: 'Moscow, 4 parks',
      tags: ['Product', 'Street furniture', 'Size range', 'Mobile app', 'Visual identity'],
      summary: 'A size range of picnic areas for different park formats and group sizes, held within the single visual language of the Moscow Parks brand. Form and construction follow from the brand philosophy.',
      task: 'Assemble a system of picnic areas that scales across different parks and group sizes — from a small gathering to a large event — while remaining recognisable as one product.',
      challenge: 'Parks differ in area, terrain and footfall. One solution had to behave equally well in a small square and on a large territory, without losing style or ease of maintenance.',
      solution: 'A range of four sizes was developed — S (6–8 people), M (10–15), L (20–30) and XL (30–40). All types share one structural logic and one visual code. A concept for a mobile app to order picnic sets to specific points was developed alongside.',
      result: 'The product is being rolled out across four parks. The unified range allows the solution to be replicated on new territories without reworking the structure or the style.',
      metrics: [
        { v: '4', l: 'parks' },
        { v: '4', l: 'sizes: S · M · L · XL' },
        { v: '30–40', l: 'people in the largest format' }
      ],
      captions: ['Picnic area in the park', 'Size S — 6–8 people', 'Size M — 10–15 people', 'Size L — 20–30 people', 'Size XL — 30–40 people', 'App for ordering sets']
    }
  },

  {
    slug: 'mesto-history',
    year: '2024',
    client: 'История места',
    clientEn: 'Istoriya Mesta',
    dir: 'mesto-history',
    images: ['hero.jpg', '01-apparel.jpg', '02-cards.jpg'],
    ru: {
      title: 'История места',
      kicker: 'Разработка бренда',
      location: 'Россия',
      tags: ['Бренд', 'Смыслы', 'Активности', 'Коллаборации', 'Продуктовые линейки'],
      summary: 'Разработка бренда, смыслов, активностей и коллабораций под разные целевые аудитории и направления. В рамках проекта создано четыре линейки: «Наука», «Личности», «Природа», «История».',
      task: 'Превратить сеть кафе из точки питания в полноценный туристический бренд федерального уровня, объединяющий науку, личности, природу и образование вместе с местными ремесленниками в регионах.',
      challenge: 'Сеть воспринималась исключительно функционально. Нужно было дать ей содержание, которое играет в каждом регионе по-своему, но собирается в один узнаваемый федеральный бренд.',
      solution: 'Бренд построен вокруг четырёх содержательных линеек — «Наука», «Личности», «Природа», «История». Каждая получила свои активности, коллаборации и носители, а региональные ремесленники стали соавторами продукта. Так локальная специфика усиливает бренд, а не размывает его.',
      result: 'Масштабный федеральный проект, объединивший просвещение, туризм и региональную идентичность. Бренд стал платформой для интеграции со школьными программами и развития регионального туризма.',
      metrics: [
        { v: '4', l: 'содержательные линейки' }
      ],
      captions: ['Носители бренда', 'Мерч и одежда', 'Продуктовые линейки']
    },
    en: {
      title: 'Istoriya Mesta',
      kicker: 'Brand development',
      location: 'Russia',
      tags: ['Brand', 'Meaning', 'Activations', 'Collaborations', 'Product lines'],
      summary: 'Development of the brand, its meaning, activations and collaborations for different audiences and directions. Four content lines were created: Science, People, Nature and History.',
      task: 'Turn a café chain from a place to eat into a full federal-level tourism brand uniting science, people, nature and education together with local artisans across the regions.',
      challenge: 'The chain was perceived in purely functional terms. It needed content that plays differently in every region yet assembles into one recognisable federal brand.',
      solution: 'The brand is built around four content lines — Science, People, Nature and History. Each received its own activations, collaborations and carriers, and regional artisans became co-authors of the product. Local specificity strengthens the brand instead of diluting it.',
      result: 'A large federal project uniting education, tourism and regional identity. The brand became a platform for integration with school programmes and for developing regional tourism.',
      metrics: [
        { v: '4', l: 'content lines' }
      ],
      captions: ['Brand carriers', 'Merch and apparel', 'Product lines']
    }
  },

  {
    slug: 'meshchovsk',
    year: '2024',
    client: 'Проектный офис',
    clientEn: 'Project office',
    dir: 'meshchovsk',
    images: ['hero.jpg', '01-tote.jpg', '02-pattern.jpg', '03-pattern-detail.jpg'],
    ru: {
      title: 'Туристическая стратегия Мещовска',
      kicker: 'Территориальный брендинг',
      location: 'Калужская область, Россия',
      tags: ['Территориальный брендинг', 'Стратегия', 'Логотип', 'Дизайн-код', 'Носители'],
      summary: 'Концепция строится на позиционировании «город двух цариц» — жён великих царей, родом из Калужской области. Легенда визуализирована в логотипе: профиль двух цариц, образующих корону как символ целостности города.',
      task: 'Переупаковать малый город с богатой историей в привлекательный туристический бренд, способный конкурировать за внимание молодёжи и семейной аудитории.',
      challenge: 'У города богатая история, но нет короткого узнаваемого образа. Требовалось найти одну сильную идею, которая объясняет город за секунду и разворачивается в носители.',
      solution: 'Найдена опорная легенда — «город двух цариц». Профиль двух цариц образует корону: один знак несёт и историю, и мысль о целостности города. Дизайн-код развёрнут в паттерн и систему носителей под молодёжную и семейную аудиторию.',
      result: 'Брендинг разработан ради роста туристической осведомлённости и привлечения молодёжи в регионы в рамках стратегии развития внутреннего туризма.',
      metrics: [
        { v: '2', l: 'царицы в основе легенды' }
      ],
      captions: ['Носители фирменного стиля', 'Сувенирная продукция', 'Паттерн и дизайн-код', 'Знаки дизайн-кода крупным планом']
    },
    en: {
      title: 'Meshchovsk Tourism Strategy',
      kicker: 'Place branding',
      location: 'Kaluga region, Russia',
      tags: ['Place branding', 'Strategy', 'Logotype', 'Design code', 'Identity carriers'],
      summary: 'The concept positions the town as the "city of two tsarinas" — the wives of great tsars, both born in the Kaluga region. The legend is visualised in the logotype: the profiles of two tsarinas forming a crown as a symbol of the town’s wholeness.',
      task: 'Repackage a small town with a rich history into an attractive tourism brand able to compete for the attention of young people and families.',
      challenge: 'The town has a rich history but no short, recognisable image. One strong idea was needed — one that explains the town in a second and unfolds across carriers.',
      solution: 'The anchoring legend was found: the city of two tsarinas. Two profiles form a crown, so a single mark carries both the history and the thought of the town’s wholeness. The design code unfolds into a pattern and a system of carriers aimed at young and family audiences.',
      result: 'The branding was developed to grow tourism awareness and draw younger visitors to the regions as part of the domestic tourism development strategy.',
      metrics: [
        { v: '2', l: 'tsarinas at the heart of the legend' }
      ],
      captions: ['Identity carriers', 'Souvenir products', 'Pattern and design code', 'Design-code marks up close']
    }
  },

  {
    slug: 'novosibirsk',
    year: '2023',
    client: 'Россвет',
    clientEn: 'Rossvet',
    dir: 'novosibirsk',
    images: ['hero.jpg', '01-scheme.jpg', '02-navigation.jpg', '03-facade.jpg', '04-bikes.jpg'],
    ru: {
      title: 'Туристическая стратегия Новосибирска',
      kicker: 'Территориальный брендинг · Победитель «Россвет» 2023',
      location: 'Новосибирск, Россия',
      tags: ['Территориальный брендинг', 'Стратегия', 'Дизайн-код', 'Средовое наполнение', 'Навигация'],
      summary: 'Концепция строится на идее «город двух берегов». ДНК логотипа отражает философию: Новосибирск — это преобразование, наука и рекорды.',
      task: 'Разработать единую стратегию позиционирования туристического облика Новосибирска и создать дизайн-код для бренд-носителей и средового наполнения.',
      challenge: 'Объединить два конфликтующих берега города в одну туристическую концепцию, используя самый длинный мост в России как метафору единства и символ преодоления разрозненности.',
      solution: 'Мост стал смысловым центром: то, что разделяло, превращено в то, что соединяет. ДНК логотипа собирает три опоры городской идентичности — преобразование, науку и рекорды — и разворачивается в дизайн-код для навигации, средового наполнения и бренд-носителей.',
      result: 'Создана единая концепция, формирующая узнаваемый туристический облик Новосибирска и укрепляющая его позиции как центра науки, рекордов и единства. Проект — победитель конкурса «Россвет» 2023.',
      metrics: [
        { v: '2023', l: 'победитель конкурса «Россвет»' },
        { v: '2', l: 'берега в одной концепции' }
      ],
      captions: ['Средовое наполнение', 'Схема территории', 'Навигация в городе', 'Бренд в городской среде', 'Городской транспорт']
    },
    en: {
      title: 'Novosibirsk Tourism Strategy',
      kicker: 'Place branding · Winner, Rossvet 2023',
      location: 'Novosibirsk, Russia',
      tags: ['Place branding', 'Strategy', 'Design code', 'Environmental design', 'Wayfinding'],
      summary: 'The concept is built on the idea of the "city of two banks". The DNA of the logotype reflects the philosophy: Novosibirsk is transformation, science and records.',
      task: 'Develop a single positioning strategy for the tourism image of Novosibirsk and create a design code for brand carriers and environmental design.',
      challenge: 'Unite the two conflicting banks of the city into one tourism concept, using the longest bridge in Russia as a metaphor of unity and a symbol of overcoming division.',
      solution: 'The bridge became the semantic centre: what divided the city was turned into what connects it. The DNA of the logotype gathers three pillars of the city’s identity — transformation, science and records — and unfolds into a design code for wayfinding, environmental design and brand carriers.',
      result: 'A unified concept that shapes a recognisable tourism image for Novosibirsk and strengthens its position as a centre of science, records and unity. The project won the Rossvet competition in 2023.',
      metrics: [
        { v: '2023', l: 'winner of the Rossvet competition' },
        { v: '2', l: 'river banks in one concept' }
      ],
      captions: ['Environmental design', 'Territory scheme', 'Wayfinding in the city', 'The brand in the urban environment', 'Urban transport']
    }
  }
];
