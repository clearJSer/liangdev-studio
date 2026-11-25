/* 金债比原站的浏览器脚本。比率与历史位置描述相对规模。 */
/* global document, window */
/* eslint no-irregular-whitespace: ["warn", { "skipTemplates": true }] */
'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const fmt = (n, digits = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const money = n => '$' + fmt(n, 0);
  const month = s => s.replace('-', ' 年 ') + ' 月';
  const state = { mode: 'gross', range: 'all', data: null, selected: null };
  const ratio = r => r[state.mode === 'gross' ? 'ratioGross' : 'ratioMarket'];
  // Reference bands are descriptive; both boundaries belong to the middle band.
  function regime(r) { return r > 0.8 ? { label: '高比率', key: 'bull' } : r < 0.6 ? { label: '低比率', key: 'buy' } : { label: '中比率', key: 'neutral' }; }
  const modeName = () => state.mode === 'gross' ? '联邦债务总额（面值）' : '可交易国债市值';
  const text = (id, value) => { if ($(id)) $(id).textContent = value; };

  /** Render separate aligned SVG panels to avoid a misleading shared price/ratio scale. */
  function renderCharts() {
    const rows = state.data.observations.filter(r => state.range === 'all' || Number(r.date.slice(0, 4)) >= Number(state.range));
    state.visible = rows;
    const compact = $('ratio-chart').getBoundingClientRect().width < 600;
    const W = compact ? Math.max(280, Math.round($('ratio-chart').getBoundingClientRect().width)) : 1100;
    const left = compact ? 42 : 58, right = compact ? 36 : 90, plotW = W - left - right;
    $('ratio-chart').setAttribute('viewBox', `0 0 ${W} 330`);
    $('price-chart').setAttribute('viewBox', `0 0 ${W} 170`);
    const x = i => left + i / (rows.length - 1) * plotW;
    const yMax = Math.ceil(Math.max(...rows.map(ratio), 1) * 1.1 * 2) / 2;
    const priceMax = Math.ceil(Math.max(...rows.map(r => r.price)) / 1000) * 1000;
    const yR = v => 286 - v / yMax * 262;
    const yP = v => 132 - v / priceMax * 112;
    const path = (getY, getValue) => rows.map((r, i) => `${i ? 'L' : 'M'}${x(i).toFixed(2)},${getY(getValue(r)).toFixed(2)}`).join(' ');
    const tickYears = compact ? (state.range === 'all' ? [1972,1990,2010,2026] : state.range === '2000' ? [2000,2010,2020,2026] : [2015,2020,2026]) : state.range === 'all' ? [1972, 1980, 1990, 2000, 2010, 2020, 2026] : state.range === '2000' ? [2000, 2005, 2010, 2015, 2020, 2026] : [2015, 2018, 2021, 2024, 2026];
    const ticks = tickYears.map(year => ({ year, i: rows.findIndex(r => Number(r.date.slice(0, 4)) === year) })).filter(t => t.i >= 0);
    const xTicks = (h) => ticks.map(t => `<text x="${x(t.i)}" y="${h}" text-anchor="middle" fill="#70796f" font-size="12">${t.year}</text>`).join('');
    let grid = '';
    const step = yMax <= 1.5 ? 0.2 : yMax <= 3 ? 0.5 : 1;
    for (let v = 0; v <= yMax + 1e-8; v += step) grid += `<line x1="${left}" x2="${W-right}" y1="${yR(v)}" y2="${yR(v)}" stroke="#122a25" stroke-opacity=".09"/><text x="${left-12}" y="${yR(v)+4}" text-anchor="end" fill="#70796f" font-size="12">${fmt(v, 1)}</text>`;
    const bands = `<rect x="${left}" y="${yR(yMax)}" width="${plotW}" height="${yR(.8)-yR(yMax)}" fill="#c5a052" fill-opacity=".11"/><rect x="${left}" y="${yR(.8)}" width="${plotW}" height="${yR(.6)-yR(.8)}" fill="#a0a8a0" fill-opacity=".11"/><rect x="${left}" y="${yR(.6)}" width="${plotW}" height="${yR(0)-yR(.6)}" fill="#779c85" fill-opacity=".12"/>`;
    const thresholds = [.6, .8].map(v => `<line x1="${left}" x2="${W-right}" y1="${yR(v)}" y2="${yR(v)}" stroke="${v===.8?'#aa8134':'#57806b'}" stroke-dasharray="4 5"/><text x="${W-right+10}" y="${yR(v)+4}" fill="#71623e" font-size="12">${fmt(v, 1)}</text>`).join('');
    $('ratio-chart').innerHTML = `<title>黄金与${modeName()}比率；可用左右方向键查看月份</title>${bands}${grid}${thresholds}<path d="${path(yR, ratio)}" fill="none" stroke="#173e32" stroke-width="2.5" stroke-linejoin="round"/>${xTicks(316)}<g id="ratio-marker" hidden><line y1="20" y2="286" stroke="#6e7e70" stroke-dasharray="3 4"/><circle r="5" fill="#173e32" stroke="#f4f2ea" stroke-width="2"/></g>`;
    let pg = '';
    for (let v = 0; v <= priceMax; v += priceMax / 4) pg += `<line x1="${left}" x2="${W-right}" y1="${yP(v)}" y2="${yP(v)}" stroke="#122a25" stroke-opacity=".07"/><text x="${left-12}" y="${yP(v)+4}" text-anchor="end" fill="#70796f" font-size="12">${fmt(v, 0)}</text>`;
    $('price-chart').innerHTML = `<title>同月美元黄金月均价</title>${pg}<path d="${path(yP, r => r.price)}" fill="none" stroke="#b58b39" stroke-width="2.2"/>${xTicks(160)}<g id="price-marker" hidden><line y1="20" y2="132" stroke="#6e7e70" stroke-dasharray="3 4"/><circle r="4" fill="#b58b39" stroke="#f4f2ea" stroke-width="2"/></g>`;
    function select(i, event) {
      i = Math.max(0, Math.min(rows.length - 1, i));
      state.selected = i;
      const r = rows[i], val = ratio(r);
      [['ratio-marker', yR(val)], ['price-marker', yP(r.price)]].forEach(([id, y]) => {
        const marker = $(id); marker.removeAttribute('hidden');
        const line = marker.querySelector('line'); line.setAttribute('x1', x(i)); line.setAttribute('x2', x(i));
        const circle = marker.querySelector('circle'); circle.setAttribute('cx', x(i)); circle.setAttribute('cy', y);
      });
      text('selection-summary', `${month(r.date)} · 比率 ${fmt(val, 3)} · ${regime(val).label} · 金价 ${money(r.price)} / oz · 黄金 ${fmt(r.goldCap)} 万亿美元 · 美债 ${fmt(r[state.mode])} 万亿美元`);
      if (event) {
        const box = $('charts-wrap').getBoundingClientRect();
        const tip = $('chart-tooltip'); tip.hidden = false;
        tip.innerHTML = `<b>${month(r.date)}</b><br>比率 ${fmt(val, 3)} · ${regime(val).label}<br>金价 ${money(r.price)} / oz`;
        tip.style.left = Math.max(4, Math.min(event.clientX - box.left + 14, box.width - 220)) + 'px';
        tip.style.top = Math.max(4, event.clientY - box.top - 85) + 'px';
      }
    }
    ['ratio-chart', 'price-chart'].forEach(id => {
      const svg = $(id); svg.setAttribute('tabindex', '0');
      svg.onpointermove = e => { const box = svg.getBoundingClientRect(); select(Math.round(((e.clientX - box.left) / box.width * W - left) / plotW * (rows.length - 1)), e); };
      svg.onpointerleave = () => { $('chart-tooltip').hidden = true; };
      svg.onfocus = () => select(state.selected ?? rows.length - 1);
      svg.onkeydown = e => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) { e.preventDefault(); select(e.key === 'Home' ? 0 : e.key === 'End' ? rows.length - 1 : (state.selected ?? rows.length - 1) + (e.key === 'ArrowRight' ? 1 : -1)); } };
    });
    state.selected = null;
    text('selection-summary', `显示 ${month(rows[0].date)}—${month(rows.at(-1).date)} · 移动、点按曲线或聚焦后使用方向键查看月份。`);
  }

  /** Describe the current observation and its empirical rank within the full dated sample. */
  function renderOverview() {
    const all = state.data.observations, last = all.at(-1);
    const percentile = all.filter(r => ratio(r) <= ratio(last)).length / all.length * 100;
    text('snapshot-date', last.date + ' 月度快照');
    text('latest-ratio', fmt(ratio(last), 3));
    text('latest-regime', regime(ratio(last)).label);
    text('latest-percentile', fmt(percentile, 0) + '%');
    text('percentile-caption', '高于样本中约 ' + fmt(percentile, 0) + '% 的月份');
    text('latest-price', money(last.price));
    text('latest-price-date', last.date + ' 月均 · 美元/盎司');
    text('latest-gold-cap', fmt(last.goldCap));
    text('latest-debt', fmt(last[state.mode]));
    text('active-definition', modeName());
    text('newest-price', '另：'+state.data.newestPrice.date+' 金价月均 '+money(state.data.newestPrice.gold)+'；因债务数据未对齐，未计入比率。');
    renderCharts();
  }

  /** Keep definitions and research limitations accessible without occupying the dashboard. */
  function renderMethod() {
    $('methodology').innerHTML = `<p><strong>公式</strong>　全球地上黄金存量（盎司，含首饰等）× 美元金价 ÷ 美国债务。默认分母为联邦债务总额（面值，含政府内部债务）；可切换为可交易国债市值。两种口径分别计算，不共用历史分位。</p><p><strong>数据</strong>　金价取月均值，债务取同月末值。存量以 WGC 2025 年末 219,891 吨为锚，扣除待估年份之后至 2025 年的矿产金产量回推；月度及 2026 年季度之间线性插值。历史存量为重建估算，使用事后信息，并非官方月度序列。</p><p><strong>解读</strong>　0.6／0.8 是参考分界，未验证为买卖阈值。历史分位取 1971-08—2026-08 共 661 个月、按所选口径计算，只描述样本位置。金价自 2025-06 起由伦敦 PM 定盘价均值转为现货均值。本页为静态快照。</p>`;
    $('sources').innerHTML = state.data.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title} ↗</a>`).join('');
    text('footer-date', '数据核对 '+state.data.asOf+' · 非实时');
  }

  /** Export the retained inputs and both ratios at full precision for independent review. */
  function exportCSV() {
    const header = 'month,gold_price_monthly_average_usd_oz,gold_stock_estimate_tonnes,gold_cap_trillion_usd,gross_federal_debt_face_trillion_usd,marketable_treasury_market_trillion_usd,ratio_gross,ratio_market';
    const lines = state.data.observations.map(r=>[r.date,r.price,r.stock,r.goldCap,r.gross,r.market,r.ratioGross,r.ratioMarket].join(','));
    const blob = new Blob(['\uFEFF'+header+'\r\n'+lines.join('\r\n')],{type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href=url; a.download='gold-debt-monthly-1971-2026-08.csv'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  async function init() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error('数据文件未能载入');
      state.data = await response.json();
      $('denominator').value = state.mode;
      $('denominator').onchange = e => { state.mode = e.target.value; renderOverview(); };
      document.querySelectorAll('[data-range]').forEach(button => button.onclick=()=>{ state.range=button.dataset.range; document.querySelectorAll('[data-range]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));}); renderCharts(); });
      $('toggle-price').onclick = () => {
        const panel = $('price-panel'), expanded = panel.hidden;
        panel.hidden = !expanded;
        $('toggle-price').setAttribute('aria-expanded', String(expanded));
        text('toggle-price', expanded ? '收起同期金价' : '显示同期金价');
        $('chart-tooltip').hidden = true;
      };
      $('export-csv').onclick=exportCSV;
      let resizeTimer;
      window.addEventListener('resize',()=>{ clearTimeout(resizeTimer); resizeTimer=setTimeout(renderCharts,150); });
      renderMethod(); renderOverview(); text('data-status', '');
    } catch (e) { text('selection-summary','数据加载失败，请刷新重试。'); console.error(e); }
  }
  init();
})();
