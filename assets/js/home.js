(() => {
  const { en, projects } = window.homeContent;
  const select = (selector) => document.querySelector(selector);
  const selectAll = (selector) => [...document.querySelectorAll(selector)];
  const translatable = [
    ['data-copy', null],
    ['data-label', 'aria-label'],
    ['data-roledescription', 'aria-roledescription'],
    ['data-alt', 'alt']
  ].flatMap(([data, attribute]) => selectAll('[' + data + ']').map((element) => ({
    element,
    attribute,
    english: en[element.getAttribute(data)],
    russian: attribute ? element.getAttribute(attribute) : element.textContent
  })));
  const metadata = select('meta[name="description"]');
  const canonical = select('link[rel="canonical"]');
  const originalTitle = document.title;
  const originalDescription = metadata.content;
  const languageLinks = selectAll('.language a');
  const cinema = select('.cinema');
  const stickyPanel = select('.cinema-sticky');
  const track = select('.gallery-track');
  const caseLink = select('.case-link');
  const filmTitle = select('.film-title');
  const counter = select('.counter');
  const status = select('.film-status');
  const previous = select('.prev');
  const next = select('.next');
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const stickyLayout = matchMedia('(min-width: 741px) and (min-height: 620px)');
  const usesScroll = () => motion.matches && stickyLayout.matches;
  const films = projects.filter((project) => project.featured);
  let language = 'ru';
  let active = 0;
  let frame = 0;

  function makeCard(project, exhibition = false) {
    const card = select('#project-card').content.firstElementChild.cloneNode(true);
    card.href = project.url;
    const image = card.querySelector('img');
    image.src = project.image;
    if (exhibition) {
      card.classList.add('exhibition-card');
      image.loading = 'eager';
    }
    return { project, card };
  }

  const cards = projects.map((project) => {
    const entry = makeCard(project);
    const tags = document.createElement('span');
    tags.className = 'project-tags';
    entry.card.querySelector('.card-caption').append(tags);
    return { ...entry, tags };
  });
  select('.project-index').replaceChildren(...cards.map(({ card }) => card));
  const filters = select('.project-filters');
  const filterButtons = selectAll('[data-filter]');
  const tagLabels = new Map(filterButtons.map((button) => [button.dataset.filter, button]));
  const archiveCount = select('.archive-count');
  filters.hidden = false;

  for (const button of filterButtons) {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let count = 0;
      for (const { project, card } of cards) {
        card.hidden = filter !== 'all' && !project.tags.includes(filter);
        if (!card.hidden) count += 1;
      }
      for (const option of filterButtons) option.setAttribute('aria-pressed', String(option === button));
      archiveCount.textContent = count;
    });
  }

  const services = select('#services');
  const serviceTemplate = select('#service-package');
  const serviceList = select('.service-list');

  function renderServices() {
    const copy = window.CONTENT?.[language]?.do;
    if (!copy) return;
    const open = [...serviceList.children].map((item) => item.open);
    const rows = copy.items.slice(0, 5).map((item, index) => {
      const row = serviceTemplate.content.firstElementChild.cloneNode(true);
      row.open = open[index] ?? false;
      row.querySelector('.service-number').textContent = String(index + 1).padStart(2, '0');
      row.querySelector('.service-name').textContent = item.t;
      row.querySelector('.service-intro').textContent = item.d;
      row.querySelector('.service-included').textContent = copy.incLabel;
      const parts = item.inc.map((part) => {
        const entry = document.createElement('li');
        entry.textContent = part;
        return entry;
      });
      row.querySelector('ul').append(...parts);
      const [timeline, fee] = row.querySelectorAll('dl > div');
      timeline.querySelector('dt').textContent = copy.timeLabel;
      timeline.querySelector('dd').textContent = item.time;
      fee.querySelector('dt').textContent = copy.priceLabel;
      fee.querySelector('dd').textContent = item.price;
      row.querySelector('a[href="#contact"]').textContent = copy.cta;

      if (item.link) {
        const more = row.querySelector('.service-more');
        more.href = item.link;
        more.textContent = item.linkLabel || copy.more;
        more.hidden = false;
      }
      return row;
    });
    serviceList.replaceChildren(...rows);
    services.hidden = false;
  }

  const exhibition = [films.at(-1), ...films, films[0]].map((project) => makeCard(project, true));
  for (const { card } of [exhibition[0], exhibition.at(-1)]) {
    card.classList.add('preview');
    card.setAttribute('aria-hidden', 'true');
    card.tabIndex = -1;
  }
  track.replaceChildren(...exhibition.map(({ card }) => card));

  function readLanguage() {
    const specified = new URLSearchParams(location.search).get('lang');
    if (specified === 'ru' || specified === 'en') return specified;
    try {
      return localStorage.getItem('sn-lang') === 'en' ? 'en' : 'ru';
    } catch {
      return 'ru';
    }
  }

  function applyLanguage() {
    language = readLanguage();
    const english = language === 'en';
    document.documentElement.lang = language;
    document.title = english ? en.title : originalTitle;
    metadata.content = english ? en.description : originalDescription;
    canonical.href = 'https://sandraniko.com/' + (english ? '?lang=en' : '');
    try {
      localStorage.setItem('sn-lang', language);
    } catch {
      // Language remains available in the URL.
    }
    for (const { element, attribute, english: translation, russian } of translatable) {
      const value = english ? translation : russian;
      if (attribute) element.setAttribute(attribute, value);
      else element.textContent = value;
    }

    for (const link of languageLinks) {
      link.removeAttribute('aria-current');
      if (link.hreflang === language) link.setAttribute('aria-current', 'true');
      link.href = '?lang=' + link.hreflang + location.hash;
    }
    for (const { card, project } of [...cards, ...exhibition]) {
      card.querySelector('strong').textContent = project.title[language];
      card.querySelector('.card-caption span').textContent = project.category[language];
    }
    for (const { project, tags } of cards) {
      tags.textContent = project.tags.map((tag) => tagLabels.get(tag).textContent).join(' · ');
    }
    renderServices();
    updateCaption();
  }

  languageLinks.forEach((link) => link.addEventListener('click', (event) => {
    if (location.protocol === 'file:' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = new URL(location.href);
    url.searchParams.set('lang', link.hreflang);
    if (url.href !== location.href) history.pushState(null, '', url);
    applyLanguage();
  }));
  window.addEventListener('popstate', applyLanguage);
  window.addEventListener('hashchange', () => {
    languageLinks.forEach((link) => { link.href = '?lang=' + link.hreflang + location.hash; });
  });

  function updateCaption() {
    const project = films[active];
    filmTitle.textContent = project.title[language];
    caseLink.href = project.url;
    counter.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(films.length).padStart(2, '0');
    previous.disabled = active === 0;
    next.disabled = active === films.length - 1;
    for (const [index, { card }] of exhibition.entries()) {
      if (index === active + 1) card.setAttribute('aria-current', 'true');
      else card.removeAttribute('aria-current');
    }
  }

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  function centerOffset(index) {
    const { card } = exhibition[index + 1];
    return card.offsetLeft + (card.offsetWidth - track.clientWidth) / 2;
  }

  function renderTrack() {
    const first = centerOffset(0);
    const step = centerOffset(1) - first;
    if (step <= 0) return;
    const position = (track.scrollLeft - first) / step;
    for (const [index, { card }] of exhibition.entries()) {
      const proximity = 1 - Math.min(1, Math.abs(index - 1 - position));
      card.style.setProperty('--focus', proximity);
    }
    const index = clamp(Math.round(position), 0, films.length - 1);
    if (index === active) return;
    active = index;
    updateCaption();
  }

  function readScroll() {
    frame = 0;
    if (!usesScroll()) return;
    const distance = cinema.offsetHeight - stickyPanel.offsetHeight;
    if (distance <= 0) return;
    const progress = clamp(-cinema.getBoundingClientRect().top / distance, 0, 1);
    track.scrollLeft = centerOffset(0) + progress * (centerOffset(films.length - 1) - centerOffset(0));
    renderTrack();
  }

  function queueScroll() {
    if (!frame) frame = requestAnimationFrame(readScroll);
  }

  function chooseFilm(index) {
    if (index < 0 || index >= films.length) return;
    if (usesScroll()) {
      const fromTop = cinema.getBoundingClientRect().top;
      const distance = cinema.offsetHeight - stickyPanel.offsetHeight;
      const top = window.scrollY + fromTop + distance * index / (films.length - 1);
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      track.scrollTo({ left: centerOffset(index), behavior: motion.matches ? 'smooth' : 'instant' });
    }
    status.textContent = films[index].title[language] + ', ' + (index + 1) + ' / ' + films.length;
  }

  previous.addEventListener('click', () => chooseFilm(active - 1));
  next.addEventListener('click', () => chooseFilm(active + 1));
  cinema.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    chooseFilm(active + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', renderTrack, { passive: true });
  window.addEventListener('scroll', queueScroll, { passive: true });

  function updateLayout() {
    cinema.classList.toggle('is-sticky', usesScroll());
    if (usesScroll()) readScroll();
    else {
      track.scrollLeft = centerOffset(active);
      renderTrack();
    }
  }

  cinema.style.setProperty('--film-count', films.length);
  cinema.classList.add('is-ready');
  motion.addEventListener('change', updateLayout);
  stickyLayout.addEventListener('change', updateLayout);
  window.addEventListener('resize', updateLayout);
  applyLanguage();
  updateLayout();
})();
