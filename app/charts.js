const number = new Intl.NumberFormat('en-US');

export function formatValue(indicator) {
  const value = indicator.value;
  if (indicator.format === 'compact') return `${(value / 1000000).toFixed(1)} million`;
  if (indicator.format === 'money') return `$${(value / 1000000000000).toFixed(2)} trillion`;
  if (indicator.format === 'money0') return `$${number.format(Math.round(value))}`;
  if (indicator.format === 'percent') return `${value.toFixed(2).replace(/0$/, '')}%`;
  if (indicator.format === 'decimal') return value.toFixed(2).replace(/0$/, '');
  return number.format(value);
}

export function formatPopulation(value) {
  return `${(value / 1000000).toFixed(2)}m`;
}

function bounds(points, includeZero = false) {
  const values = points.map((point) => point.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (includeZero) {
    min = Math.min(0, min);
    max = Math.max(0, max);
  }
  const pad = Math.max((max - min) * 0.16, 0.4);
  return { min: min - pad, max: max + pad };
}

export function lineChart(points, options = {}) {
  const width = 680;
  const height = 260;
  const left = 54;
  const right = 18;
  const top = 22;
  const bottom = 38;
  const { min, max } = bounds(points, options.includeZero);
  const x = (index) => left + (index * (width - left - right)) / Math.max(points.length - 1, 1);
  const y = (value) => top + ((max - value) * (height - top - bottom)) / (max - min);
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(index).toFixed(1)} ${y(point.value).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)} ${height - bottom} L${left} ${height - bottom} Z`;
  const zero = min < 0 && max > 0 ? `<line class="zero-line" x1="${left}" x2="${width - right}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}"></line>` : '';
  const dots = points.map((point, index) => `<circle class="dot" cx="${x(index).toFixed(1)}" cy="${y(point.value).toFixed(1)}" r="4"><title>${point.year}: ${options.format ? options.format(point.value) : point.value}</title></circle>`).join('');
  const labels = points.map((point, index) => `<text class="axis-label" x="${x(index).toFixed(1)}" y="${height - 12}" text-anchor="middle">${point.year}</text>`).join('');
  const last = points[points.length - 1];
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.label ?? 'Line chart'}">
    <title>${options.label ?? 'Line chart'}</title>
    <path class="area" d="${area}"></path>${zero}<path class="line" d="${path}"></path>${dots}${labels}
    <text class="chart-callout" x="${width - right}" y="${Math.max(18, y(last.value) - 10)}" text-anchor="end">${options.format ? options.format(last.value) : last.value}</text>
  </svg>`;
}

export function barChart(rows, options = {}) {
  const max = Math.max(...rows.map((row) => row.value));
  return `<div class="bars" role="img" aria-label="${options.label ?? 'Bar chart'}">${rows.map((row) => `
    <div class="bar-row">
      <span>${row.label}</span>
      <div class="bar-track"><i style="width:${Math.max(2, (row.value / max) * 100).toFixed(1)}%"></i></div>
      <strong>${options.format ? options.format(row.value) : row.value}</strong>
    </div>`).join('')}</div>`;
}

export function stackedAge(rows) {
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  return `<div class="age-stack" role="img" aria-label="Age structure: ${rows.map((row) => `${row.label} ${row.value.toFixed(1)} percent`).join(', ')}">
    ${rows.map((row) => `<span style="width:${((row.value / total) * 100).toFixed(1)}%;background:${row.color}"><b>${row.label}</b><small>${row.value.toFixed(1)}%</small></span>`).join('')}
  </div>`;
}

export function compareBars(a, b) {
  const max = Math.max(a.population, b.population);
  const row = (province) => `<div class="compare-row"><span>${province.name}</span><div class="bar-track"><i style="width:${((province.population / max) * 100).toFixed(1)}%"></i></div><strong>${formatPopulation(province.population)}</strong></div>`;
  return `<div class="compare-bars">${row(a)}${row(b)}</div>`;
}
