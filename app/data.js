export const country = {
  name: 'Indonesia',
  capital: 'Jakarta',
  provinces: 38,
  vintage: 'Comparable indicators mostly use 2024-2025 releases; each figure keeps its own year.',
};

export const indicators = [
  { id: 'population', label: 'Population', value: 285721236, unit: 'people', year: 2025, source: 'World Bank WDI / UN WPP 2024', category: 'People', note: 'Midyear estimate; fourth-largest national population.', format: 'compact' },
  { id: 'urban', label: 'Urban share', value: 59.39, unit: '%', year: 2025, source: 'World Bank WDI', category: 'People', note: 'Share living in urban areas.', format: 'percent' },
  { id: 'life', label: 'Life expectancy', value: 71.29, unit: 'years', year: 2024, source: 'World Bank WDI', category: 'People', note: 'Life expectancy at birth, total population.', format: 'decimal' },
  { id: 'internet', label: 'Internet users', value: 72.78, unit: '%', year: 2024, source: 'World Bank WDI / ITU', category: 'People', note: 'Individuals using the internet.', format: 'percent' },
  { id: 'gdp', label: 'GDP', value: 1445642584164, unit: 'US$', year: 2025, source: 'World Bank WDI', category: 'Economy', note: 'Gross domestic product in current US dollars.', format: 'money' },
  { id: 'gdp-capita', label: 'GDP per person', value: 5059.63, unit: 'US$', year: 2025, source: 'World Bank WDI', category: 'Economy', note: 'GDP divided by midyear population.', format: 'money0' },
  { id: 'growth', label: 'Real GDP growth', value: 5.11, unit: '%', year: 2025, source: 'World Bank WDI / BPS', category: 'Economy', note: 'Annual change in constant-price GDP.', format: 'percent' },
  { id: 'inflation', label: 'Inflation', value: 1.57, unit: '% yoy', year: 'Dec 2024', source: 'BPS CPI release', category: 'Prices', note: 'Consumer prices compared with December 2023.', format: 'percent' },
  { id: 'unemployment', label: 'Open unemployment', value: 4.91, unit: '%', year: 'Aug 2024', source: 'BPS Sakernas', category: 'Work', note: 'Open unemployment rate in the labour force.', format: 'percent' },
  { id: 'poverty', label: 'Poverty rate', value: 9.03, unit: '%', year: 'Mar 2024', source: 'BPS Susenas', category: 'Living standards', note: 'People below the national poverty line.', format: 'percent' },
  { id: 'fertility', label: 'Fertility rate', value: 2.115, unit: 'births', year: 2024, source: 'World Bank WDI / UN WPP 2024', category: 'People', note: 'Births per woman over a lifetime at current rates.', format: 'decimal' },
  { id: 'density', label: 'Population density', value: 149.8, unit: 'people/km²', year: 2024, source: 'World Bank WDI', category: 'People', note: 'Midyear population divided by land area.', format: 'decimal' },
];

export const series = {
  population: [
    { year: 2019, value: 272.49 }, { year: 2020, value: 274.81 }, { year: 2021, value: 276.76 },
    { year: 2022, value: 278.83 }, { year: 2023, value: 281.19 }, { year: 2024, value: 283.49 },
    { year: 2025, value: 285.72 },
  ],
  gdpPerCapita: [
    { year: 2019, value: 4106.95 }, { year: 2020, value: 3853.70 }, { year: 2021, value: 4287.17 },
    { year: 2022, value: 4730.83 }, { year: 2023, value: 4876.30 }, { year: 2024, value: 4925.44 },
    { year: 2025, value: 5059.63 },
  ],
  growth: [
    { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 }, { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
    { year: 2025, value: 5.11 },
  ],
  inflation: [
    { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
  ],
  unemployment: [
    { year: 2019, value: 5.23 }, { year: 2020, value: 7.07 }, { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
  ],
  urban: [
    { year: 2019, value: 55.74 }, { year: 2020, value: 56.28 }, { year: 2021, value: 56.88 },
    { year: 2022, value: 57.49 }, { year: 2023, value: 58.12 }, { year: 2024, value: 58.75 },
    { year: 2025, value: 59.39 },
  ],
};

export const ageStructure = [
  { label: '0-14', value: 24.25, color: '#2f9e8f' },
  { label: '15-64', value: 68.21, color: '#f2b544' },
  { label: '65+', value: 7.54, color: '#d95d39' },
];

export const regions = [
  { name: 'Java', share: 55.81, note: 'More than half of residents; densest labour and consumer markets.' },
  { name: 'Sumatra', share: 21.88, note: 'Second-largest population bloc, led by North Sumatra.' },
  { name: 'Sulawesi', share: 7.35, note: 'South Sulawesi is the main population centre.' },
  { name: 'Kalimantan', share: 6.21, note: 'Large land area, lower average density.' },
  { name: 'Bali & Nusa Tenggara', share: 5.55, note: 'Tourism, agriculture and island provinces.' },
  { name: 'Papua', share: 2.01, note: 'Small population share across a very large eastern region.' },
  { name: 'Maluku', share: 1.18, note: 'Island provinces in the east.' },
];

export const provinces = [
  { name: 'West Java', region: 'Java', capital: 'Bandung', population: 50345200 },
  { name: 'East Java', region: 'Java', capital: 'Surabaya', population: 41814500 },
  { name: 'Central Java', region: 'Java', capital: 'Semarang', population: 37892300 },
  { name: 'North Sumatra', region: 'Sumatra', capital: 'Medan', population: 15588500 },
  { name: 'Banten', region: 'Java', capital: 'Serang', population: 11834087 },
  { name: 'Jakarta', region: 'Java', capital: 'Jakarta', population: 11135191 },
  { name: 'South Sulawesi', region: 'Sulawesi', capital: 'Makassar', population: 9463400 },
  { name: 'Lampung', region: 'Sumatra', capital: 'Bandar Lampung', population: 9419600 },
  { name: 'South Sumatra', region: 'Sumatra', capital: 'Palembang', population: 8837300 },
  { name: 'Riau', region: 'Sumatra', capital: 'Pekanbaru', population: 6728100 },
  { name: 'West Sumatra', region: 'Sumatra', capital: 'Padang', population: 5836200 },
  { name: 'West Kalimantan', region: 'Kalimantan', capital: 'Pontianak', population: 5695500 },
  { name: 'East Nusa Tenggara', region: 'Bali & Nusa Tenggara', capital: 'Kupang', population: 5656000 },
  { name: 'West Nusa Tenggara', region: 'Bali & Nusa Tenggara', capital: 'Mataram', population: 5646000 },
  { name: 'Aceh', region: 'Sumatra', capital: 'Banda Aceh', population: 5554800 },
  { name: 'Papua', region: 'Papua', capital: 'Jayapura', population: 4542600 },
  { name: 'Bali', region: 'Bali & Nusa Tenggara', capital: 'Denpasar', population: 4433300 },
  { name: 'South Kalimantan', region: 'Kalimantan', capital: 'Banjarbaru', population: 4273400 },
  { name: 'East Kalimantan', region: 'Kalimantan', capital: 'Samarinda', population: 4045900 },
  { name: 'Yogyakarta', region: 'Java', capital: 'Yogyakarta', population: 3759500 },
  { name: 'Central Sulawesi', region: 'Sulawesi', capital: 'Palu', population: 3121800 },
  { name: 'Maluku', region: 'Maluku', capital: 'Ambon', population: 1945600 },
];

export const sources = [
  { topic: 'Population and GDP', source: 'World Bank World Development Indicators; UN World Population Prospects 2024', year: '2024-2025', note: 'Population is a midyear estimate. GDP is shown in current US dollars; growth uses constant prices.' },
  { topic: 'Prices', source: 'BPS consumer price index releases', year: 'Dec 2024', note: 'Inflation is the December year-on-year change in the consumer price index.' },
  { topic: 'Work', source: 'BPS Sakernas labour-force survey', year: 'Aug 2024', note: 'Open unemployment counts people without work who are available for and seeking work, plus BPS availability categories.' },
  { topic: 'Poverty', source: 'BPS Susenas and national poverty line', year: 'Mar 2024', note: 'The BPS line is built around 2,100 calories per person per day plus basic non-food needs.' },
  { topic: 'Regional shares', source: 'Kemendagri population register, semester II 2025', year: '2025', note: 'Shares describe registered residents by island group and can differ slightly from survey-based estimates.' },
  { topic: 'Province populations', source: 'BPS provincial population estimates', year: '2024', note: 'Displayed province shares use the 2024 national population denominator; small differences can appear after revisions.' },
];
