(() => {
  const projects = window.PROJECTS;
  const slug = document.body.dataset.caseStudy;
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const labels = {
    ru: {
      skip: 'К содержанию',
      mainNav: 'Основное меню',
      work: 'Проекты',
      products: 'Продукты',
      contactLink: 'Связаться',
      contactTitle: 'Обсудим проект?',
      sections: 'Разделы кейса',
      about: 'О проекте',
      brand: 'Бренд',
      brandIntro: 'Айдентика и упаковка для собственной косметической линии спа на основе сапожковского торфа.',
      brandNote: 'Природные материалы и фактуры спа продолжаются в визуальном языке косметики. В основе линейки — сапожковский торф.',
      place: 'Место',
      event: 'Событие',
      placeIntro: 'Интерьеры, рендеры и планировки спа из четырёх транспортных модулей.',
      otherCases: 'Другие кейсы',
      legal: 'Правовые документы'
    },
    en: {
      skip: 'Skip to content',
      mainNav: 'Main navigation',
      work: 'Work',
      products: 'Products',
      contactLink: 'Get in touch',
      contactTitle: 'Let’s talk about your project.',
      sections: 'Case study sections',
      about: 'About the project',
      brand: 'Brand',
      brandIntro: 'Visual identity and packaging for the spa’s own line of Sapozhok peat cosmetics.',
      brandNote: 'The spa’s natural materials and textures inform the cosmetics’ visual identity. The collection is based on Sapozhok peat.',
      place: 'Place',
      event: 'Event',
      placeIntro: 'Interiors, renderings and floor plans for a spa assembled from four shipping modules.',
      otherCases: 'Other case studies',
      legal: 'Legal documents'
    }
  };

  for (const lang of ['ru', 'en']) {
    window.CONTENT[lang].caseStudy = {
      ...project[lang],
      ...labels[lang],
      year: project.year,
      client: lang === 'en' ? project.clientEn || project.client : project.client,
      prev: previous[lang].title,
      next: next[lang].title
    };
  }

  document.addEventListener('langchange', ({ detail: { lang } }) => {
    const copy = window.CONTENT[lang].caseStudy;
    window.I18N.setMeta(copy.title + ' — Sandra Niko', copy.kicker);
    if (location.protocol !== 'file:') {
      const url = new URL(location.href);
      if (url.searchParams.get('lang') !== lang) {
        url.searchParams.set('lang', lang);
        history.replaceState(history.state, '', url);
      }
    }
    for (const link of document.querySelectorAll('[data-home-link], [data-case-link]')) {
      const url = new URL(link.href);
      url.searchParams.set('lang', lang);
      link.href = url.href;
    }
  });

  const requested = new URLSearchParams(location.search).get('lang');
  if (requested === 'ru' || requested === 'en') window.I18N.lang = requested;
})();
