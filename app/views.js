import { ageStructure, country, indicators, provinces, regions, series, sources } from './data.js';
import { barChart, compareBars, formatPopulation, formatValue, lineChart, stackedAge } from './charts.js';

const byId = (id) => indicators.find((item) => item.id === id);
const nationalPopulation2024 = 283487931;

function sourceLine(item) {
  return `<small>${item.source} · ${item.year}</small>`;
}

export function indicatorCards(list) {
  if (!list.length) return '<p class="empty">No indicators match that search. Try “population”, “GDP” or “poverty”.</p>';
  return list.map((item) => {
    const suffix = item.format === 'decimal' ? ` <span>${item.unit}</span>` : '';
    return `<article class="stat-card">
    <div class="stat-top"><span>${item.category}</span><span>${item.year}</span></div>
    <h3>${item.label}</h3>
    <p class="stat-value">${formatValue(item)}${suffix}</p>
    <p>${item.note}</p>${sourceLine(item)}
  </article>`;
  }).join('');
}

export function homeChart(metric) {
  if (metric === 'gdpPerCapita') {
    return lineChart(series.gdpPerCapita, { label: 'GDP per person, 2019 to 2025', format: (value) => `$${Math.round(value).toLocaleString('en-US')}` });
  }
  return lineChart(series.population, { label: 'Population in millions, 2019 to 2025', format: (value) => `${value.toFixed(1)}m` });
}

export function renderHome() {
  const headline = ['population', 'gdp', 'growth', 'poverty'].map(byId);
  return `<section class="hero">
    <div>
      <p class="eyebrow">National statistics · ${country.provinces} provinces</p>
      <h1>Indonesia, measured clearly.</h1>
      <p class="lede">A fast atlas for the figures people actually look up: how many people live here, how the economy is moving, where work and prices stand, and how population is spread across the archipelago.</p>
      <div class="hero-actions"><a class="button" href="#/regions">Explore regions</a><a class="button ghost" href="#/economy">See economy</a></div>
    </div>
    <div class="hero-panel" aria-label="Headline indicators">
      ${headline.map((item) => `<div><span>${item.label}</span><strong>${formatValue(item)}</strong>${sourceLine(item)}</div>`).join('')}
    </div>
  </section>
  <section class="grid two">
    <article class="panel wide">
      <div class="panel-head"><div><p class="eyebrow">Trend</p><h2>Scale and income</h2></div>
      <div class="segmented" role="group" aria-label="Choose trend">
        <button type="button" data-home-metric="population" aria-pressed="true">Population</button>
        <button type="button" data-home-metric="gdpPerCapita" aria-pressed="false">GDP per person</button>
      </div></div>
      <div id="home-chart">${homeChart('population')}</div>
      <p class="caption">World Bank WDI. Population is a midyear estimate; GDP per person uses current US dollars.</p>
    </article>
    <article class="panel">
      <p class="eyebrow">At a glance</p><h2>What changed?</h2>
      <ul class="fact-list">
        <li><strong>5.11%</strong> real GDP growth in 2025, after 5.03% in 2024.</li>
        <li><strong>4.91%</strong> open unemployment in August 2024, down from 5.32% a year earlier.</li>
        <li><strong>55.81%</strong> of registered residents live on Java.</li>
        <li><strong>72.78%</strong> of people used the internet in 2024.</li>
      </ul>
      <a class="text-link" href="#/sources">Check definitions and vintages</a>
    </article>
  </section>
  <section class="panel">
    <div class="panel-head"><div><p class="eyebrow">Indicator explorer</p><h2>Find a figure</h2></div>
      <form class="controls" id="indicator-controls">
        <label>Search <input type="search" name="q" placeholder="poverty, GDP, internet" autocomplete="off"></label>
        <label>Topic <select name="category"><option value="all">All topics</option><option>People</option><option>Economy</option><option>Prices</option><option>Work</option><option>Living standards</option></select></label>
      </form>
    </div>
    <div class="stat-grid" id="indicator-grid">${indicatorCards(indicators)}</div>
  </section>`;
}

export function renderPeople() {
  return `<section class="page-head"><p class="eyebrow">People</p><h1>A young, urbanising country</h1><p>Indonesia is still in a demographic window: most residents are working age, while the older share is rising slowly.</p></section>
  <section class="grid two">
    <article class="panel wide"><p class="eyebrow">Age structure · 2025</p><h2>Working-age majority</h2>${stackedAge(ageStructure)}
      <div class="legend">${ageStructure.map((row) => `<span><i style="background:${row.color}"></i>${row.label}: ${row.value.toFixed(2)}%</span>`).join('')}</div>
      <p class="caption">World Bank WDI age shares. The 15-64 share is the remainder after ages 0-14 and 65+.</p></article>
    <article class="panel"><p class="eyebrow">Urban share</p><h2>Cities keep gaining share</h2>${lineChart(series.urban, { label: 'Urban population share, 2019 to 2025', format: (value) => `${value.toFixed(1)}%` })}<p class="caption">World Bank WDI, percent of total population.</p></article>
  </section>
  <section class="stat-grid">${indicatorCards(['population', 'life', 'fertility', 'density', 'internet', 'urban'].map(byId))}</section>
  <section class="panel"><h2>Reading the people numbers</h2><p>Population estimates are modelled midyear totals, so they can differ from the civil register used for regional shares. Fertility near two births per woman means growth is slowing, but population still rises because large cohorts are entering parenthood and life expectancy is above 71 years.</p></section>`;
}

export function economyChart(metric) {
  const labels = {
    growth: 'Real GDP growth, percent, 2019 to 2025',
    inflation: 'December inflation, percent year on year, 2019 to 2024',
    unemployment: 'Open unemployment, percent, August 2019 to August 2024',
  };
  return lineChart(series[metric], { label: labels[metric], includeZero: true, format: (value) => `${value.toFixed(2)}%` });
}

export function renderEconomy() {
  return `<section class="page-head"><p class="eyebrow">Economy</p><h1>Growth near five percent</h1><p>The economy expanded 5.11% in 2025. Prices cooled through 2024, and open unemployment fell below five percent in August 2024.</p></section>
  <section class="stat-grid">${indicatorCards(['gdp', 'gdp-capita', 'growth', 'inflation', 'unemployment', 'poverty'].map(byId))}</section>
  <section class="panel wide">
    <div class="panel-head"><div><p class="eyebrow">Cycle</p><h2>Growth, prices and work</h2></div>
    <div class="segmented" role="group" aria-label="Choose economic series">
      <button type="button" data-economy-metric="growth" aria-pressed="true">Growth</button>
      <button type="button" data-economy-metric="inflation" aria-pressed="false">Inflation</button>
      <button type="button" data-economy-metric="unemployment" aria-pressed="false">Unemployment</button>
    </div></div>
    <div id="economy-chart">${economyChart('growth')}</div>
    <p class="caption" id="economy-caption">Real GDP growth, World Bank WDI / BPS. The 2020 dip is the pandemic contraction.</p>
  </section>
  <section class="grid two">
    <article class="panel"><h2>What the headline hides</h2><p>GDP per person reached $5,060 in 2025, but poverty was still 9.03% in March 2024. A national average can rise while rural poverty remains higher than urban poverty, so the atlas keeps welfare beside output.</p></article>
    <article class="panel"><h2>Useful next checks</h2><ul class="fact-list"><li>Compare growth with inflation before judging real incomes.</li><li>Read unemployment with poverty: a job can still pay too little.</li><li>Use province data before treating Java as the whole country.</li></ul></article>
  </section>`;
}

export function provinceCards(list) {
  if (!list.length) return '<p class="empty">No provinces match. Clear the search or choose another island group.</p>';
  return list.map((province) => {
    const share = (province.population / nationalPopulation2024) * 100;
    return `<article class="province-card"><div><h3>${province.name}</h3><p>${province.region} · Capital ${province.capital}</p></div><strong>${formatPopulation(province.population)}</strong><span>${share.toFixed(1)}% of Indonesia</span></article>`;
  }).join('');
}

export function renderRegions() {
  const regionRows = regions.map((region) => ({ label: region.name, value: region.share }));
  const options = provinces.map((province) => `<option value="${province.name}">${province.name}</option>`).join('');
  return `<section class="page-head"><p class="eyebrow">Regions</p><h1>Java holds the majority</h1><p>Population is concentrated on Java, while land and resources are spread far east. That contrast shapes transport, services and regional policy.</p></section>
  <section class="grid two">
    <article class="panel wide"><p class="eyebrow">Island groups · 2025 register</p><h2>Where residents live</h2>${barChart(regionRows, { label: 'Population share by island group', format: (value) => `${value.toFixed(2)}%` })}<p class="caption">Kemendagri population register, semester II 2025. Shares sum to about 100% after rounding.</p></article>
    <article class="panel"><p class="eyebrow">Compare provinces</p><h2>Two places, one scale</h2>
      <form class="controls stacked" id="compare-controls">
        <label>First <select name="a">${options}</select></label>
        <label>Second <select name="b">${options}</select></label>
      </form>
      <div id="compare-output">${compareBars(provinces[0], provinces[5])}</div>
      <p class="caption" id="compare-note">West Java has about 4.5 times Jakarta's population in the 2024 estimates.</p>
    </article>
  </section>
  <section class="panel">
    <div class="panel-head"><div><p class="eyebrow">Province explorer</p><h2>Largest provinces</h2></div>
      <form class="controls" id="province-controls">
        <label>Search <input type="search" name="q" placeholder="Bali, Medan, Java" autocomplete="off"></label>
        <label>Island group <select name="region"><option value="all">All groups</option>${regions.map((region) => `<option>${region.name}</option>`).join('')}</select></label>
        <label>Sort <select name="sort"><option value="population">Population</option><option value="name">Name</option><option value="share">Share</option></select></label>
      </form>
    </div>
    <div class="province-grid" id="province-grid">${provinceCards(provinces)}</div>
    <p class="caption">Province populations are BPS 2024 estimates for selected large provinces; shares use the 2024 national total.</p>
  </section>`;
}

export function renderSources() {
  return `<section class="page-head"><p class="eyebrow">Methods & sources</p><h1>Numbers with receipts</h1><p>Each figure is tied to a source and year. Different Indonesian series use different methods, so small gaps between survey estimates and register counts are normal.</p></section>
  <section class="panel"><h2>Source map</h2><div class="table-wrap"><table><caption>Sources used by this atlas</caption><thead><tr><th>Topic</th><th>Source</th><th>Year</th><th>How to read it</th></tr></thead><tbody>
    ${sources.map((row) => `<tr><th scope="row">${row.topic}</th><td>${row.source}</td><td>${row.year}</td><td>${row.note}</td></tr>`).join('')}
  </tbody></table></div></section>
  <section class="grid two">
    <article class="panel"><h2>Definitions that matter</h2><ul class="fact-list"><li><strong>GDP growth</strong> is real, inflation-adjusted change; GDP level here is current US dollars.</li><li><strong>Open unemployment</strong> is not everyone without income; it follows labour-force survey rules.</li><li><strong>Poverty</strong> uses the BPS national line, not an international dollar line.</li><li><strong>Register shares</strong> count recorded residents and can move with administrative updates.</li></ul></article>
    <article class="panel"><h2>Update rule</h2><p>When a newer release replaces a figure, the year beside it should change too. This atlas keeps older labour and poverty vintages visible instead of silently mixing them with newer GDP and population estimates.</p><a class="text-link" href="#/">Back to overview</a></article>
  </section>`;
}

export function renderNotFound() {
  return `<section class="panel"><p class="eyebrow">Not found</p><h1>That page is not in the atlas.</h1><p>Use the navigation above, or return to the overview.</p><a class="button" href="#/">Overview</a></section>`;
}
