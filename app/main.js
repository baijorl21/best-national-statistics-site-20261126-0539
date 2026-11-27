import { indicators, provinces } from './data.js';
import { compareBars, formatPopulation } from './charts.js';
import { economyChart, homeChart, indicatorCards, provinceCards, renderEconomy, renderHome, renderNotFound, renderPeople, renderRegions, renderSources } from './views.js';

const app = document.querySelector('#main');
const navLinks = [...document.querySelectorAll('[data-route]')];
const nationalPopulation2024 = 283487931;

const routes = {
  '': renderHome,
  '/': renderHome,
  '/people': renderPeople,
  '/economy': renderEconomy,
  '/regions': renderRegions,
  '/sources': renderSources,
};

const routeTitles = {
  '': 'Archipelago Atlas · Indonesia Statistics',
  '/': 'Archipelago Atlas · Indonesia Statistics',
  '/people': 'People · Archipelago Atlas',
  '/economy': 'Economy · Archipelago Atlas',
  '/regions': 'Regions · Archipelago Atlas',
  '/sources': 'Sources · Archipelago Atlas',
};

function routeName() {
  return location.hash.replace(/^#/, '') || '/';
}

function setPressed(buttons, active) {
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(button === active)));
}

function bindHome() {
  const chart = document.querySelector('#home-chart');
  const buttons = [...document.querySelectorAll('[data-home-metric]')];
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      chart.innerHTML = homeChart(button.dataset.homeMetric);
      setPressed(buttons, button);
    });
  });

  const form = document.querySelector('#indicator-controls');
  const grid = document.querySelector('#indicator-grid');
  if (!form || !grid) return;
  const update = () => {
    const data = new FormData(form);
    const query = String(data.get('q') ?? '').trim().toLowerCase();
    const category = String(data.get('category') ?? 'all');
    const filtered = indicators.filter((item) => {
      const inCategory = category === 'all' || item.category === category;
      const text = `${item.label} ${item.category} ${item.note} ${item.source}`.toLowerCase();
      return inCategory && (!query || text.includes(query));
    });
    grid.innerHTML = indicatorCards(filtered);
    grid.setAttribute('aria-label', `${filtered.length} indicators shown`);
  };
  form.addEventListener('input', update);
  form.addEventListener('submit', (event) => event.preventDefault());
}

function bindEconomy() {
  const chart = document.querySelector('#economy-chart');
  const caption = document.querySelector('#economy-caption');
  const buttons = [...document.querySelectorAll('[data-economy-metric]')];
  const captions = {
    growth: 'Real GDP growth, World Bank WDI / BPS. The 2020 dip is the pandemic contraction.',
    inflation: 'December consumer-price inflation, BPS. The 2022 peak follows fuel and food price pressure.',
    unemployment: 'Open unemployment each August, BPS Sakernas. The rate fell after the 2020 labour-market shock.',
  };
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      chart.innerHTML = economyChart(button.dataset.economyMetric);
      caption.textContent = captions[button.dataset.economyMetric];
      setPressed(buttons, button);
    });
  });
}

function filteredProvinces(form) {
  const data = new FormData(form);
  const query = String(data.get('q') ?? '').trim().toLowerCase();
  const region = String(data.get('region') ?? 'all');
  const sort = String(data.get('sort') ?? 'population');
  const list = provinces.filter((province) => {
    const text = `${province.name} ${province.region} ${province.capital}`.toLowerCase();
    return (region === 'all' || province.region === region) && (!query || text.includes(query));
  });
  if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  else list.sort((a, b) => b.population - a.population);
  return list;
}

function bindRegions() {
  const form = document.querySelector('#province-controls');
  const grid = document.querySelector('#province-grid');
  if (form && grid) {
    const update = () => {
      const list = filteredProvinces(form);
      grid.innerHTML = provinceCards(list);
      grid.setAttribute('aria-label', `${list.length} provinces shown`);
    };
    form.addEventListener('input', update);
    form.addEventListener('submit', (event) => event.preventDefault());
  }

  const compare = document.querySelector('#compare-controls');
  const output = document.querySelector('#compare-output');
  const note = document.querySelector('#compare-note');
  if (!compare || !output || !note) return;
  compare.elements.b.value = 'Jakarta';
  const updateCompare = () => {
    const a = provinces.find((province) => province.name === compare.elements.a.value) ?? provinces[0];
    const b = provinces.find((province) => province.name === compare.elements.b.value) ?? provinces[1];
    output.innerHTML = compareBars(a, b);
    const ratio = Math.max(a.population, b.population) / Math.min(a.population, b.population);
    const bigger = a.population >= b.population ? a : b;
    const smaller = a.population >= b.population ? b : a;
    const gap = Math.abs(a.population - b.population);
    note.textContent = `${bigger.name} is ${ratio.toFixed(1)} times ${smaller.name}; the gap is ${formatPopulation(gap)} people (${((gap / nationalPopulation2024) * 100).toFixed(1)}% of Indonesia).`;
  };
  compare.addEventListener('change', updateCompare);
  compare.addEventListener('submit', (event) => event.preventDefault());
  updateCompare();
}

function render() {
  const route = routeName();
  const view = routes[route] ?? renderNotFound;
  document.title = routeTitles[route] ?? 'Not found · Archipelago Atlas';
  app.innerHTML = view();
  navLinks.forEach((link) => {
    const active = (route === '/' && link.dataset.route === 'home') || route === `/${link.dataset.route}`;
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (route === '/' || route === '') bindHome();
  if (route === '/economy') bindEconomy();
  if (route === '/regions') bindRegions();
  app.focus({ preventScroll: true });
}

window.addEventListener('hashchange', render);
render();
