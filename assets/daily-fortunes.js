function esc(value) {
  return String(value ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function markdownLite(text) {
  return esc(text)
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\*\*(.+?)\*\*\s*$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(?:<li>.*<\/li>\n?)+/g, (block) => `<ul>${block}</ul>`)
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

function displayContent(text) {
  return String(text || '')
    .replace(/^##\s*완료\s*—\s*.+?오늘의 운세\s*\n+/, '')
    .trim();
}

function sectionTitle(raw) {
  return String(raw || '').replace(/^\d+\)\s*/, '').trim();
}

function splitMarkdownSections(text) {
  const lines = String(text || '').split(/\n/);
  const intro = [];
  const sections = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(/^###\s+(.+)\s*$/);
    if (match) {
      if (current) sections.push(current);
      current = { title: sectionTitle(match[1]), body: [] };
    } else if (current) {
      current.body.push(line);
    } else {
      intro.push(line);
    }
  }
  if (current) sections.push(current);
  return { intro: intro.join('\n').trim(), sections };
}

function isSystemSection(title) {
  return /(점성술|사주|자미두수|이름풀이).*관점/.test(title);
}

function isOverviewSection(title) {
  return /(종합|핵심)/.test(title);
}

function bodyHtml(text) {
  const cleaned = String(text || '').trim();
  return cleaned ? `<p>${markdownLite(cleaned)}</p>` : '';
}

function renderStructuredFortune(text) {
  const content = displayContent(text);
  const { intro, sections } = splitMarkdownSections(content);
  if (!sections.length) return `<p>${markdownLite(content)}</p>`;

  const overview = [];
  const systems = [];
  const rest = [];

  for (const sec of sections) {
    if (isSystemSection(sec.title)) systems.push(sec);
    else if (isOverviewSection(sec.title)) overview.push(sec);
    else rest.push(sec);
  }

  const introHtml = intro ? `<div class="fortune-meta"><p>${markdownLite(intro)}</p></div>` : '';
  const overviewHtml = overview.map((sec) => `
    <section class="fortune-overview-block">
      <h3>${esc(sec.title)}</h3>
      ${bodyHtml(sec.body.join('\n'))}
    </section>`).join('');

  const systemsHtml = systems.length ? `
    <section class="fortune-systems">
      <h3>4체계별 운세 보기</h3>
      <p class="section-help">종합 운세를 먼저 보고, 궁금한 체계만 펼쳐서 확인하세요.</p>
      ${systems.map((sec) => `
        <details class="system-fold">
          <summary>${esc(sec.title)}</summary>
          <div class="system-fold-body">${bodyHtml(sec.body.join('\n'))}</div>
        </details>`).join('')}
    </section>` : '';

  const restHtml = rest.map((sec) => `
    <section class="fortune-rest-block">
      <h3>${esc(sec.title)}</h3>
      ${bodyHtml(sec.body.join('\n'))}
    </section>`).join('');

  return [introHtml, overviewHtml, systemsHtml, restHtml].filter(Boolean).join('\n');
}

function shortUpdated(value) {
  const text = String(value || '-');
  const match = text.match(/(\d{2}:\d{2})/);
  return match ? `${match[1]} 업데이트` : text;
}

function renderEntry(entry, index) {
  return `<details class="grade-card fortune-entry" ${index === 0 ? 'open' : ''}>
    <summary class="fortune-summary">
      <span class="fortune-summary-main">
        <span class="fortune-icon" aria-hidden="true">🔮</span>
        <span class="fortune-title">${esc(entry.title || '운세 기록')}</span>
      </span>
      <span class="fortune-date">${esc(entry.date || '-')}</span>
    </summary>
    <div class="fortune-body">${renderStructuredFortune(entry.content)}</div>
  </details>`;
}

function normalizeEntries(data) {
  return Array.isArray(data?.entries) ? data.entries : [];
}

// Data contract: fortune-history.html keeps only the shell,
// data/daily_fortunes.json stores records, and this reusable view loops over entries.
const summaryEl = document.getElementById('summary');
const statusEl = document.getElementById('status');
const fortuneListEl = document.getElementById('fortune-list');
const dataSource = fortuneListEl?.dataset.source || 'data/daily_fortunes.json';

function render(data) {
  const entries = normalizeEntries(data);
  summaryEl.textContent = `${entries.length}건 · ${shortUpdated(data?.updatedAt)}`;
  statusEl.innerHTML = [
    `<span class="pill">기록 ${entries.length}건</span>`,
    `<span class="pill">${esc(shortUpdated(data?.updatedAt))}</span>`,
    `<span class="pill">JSON 데이터 기반</span>`,
    `<span class="pill">개인정보 비공개</span>`,
    `<span class="pill">종합 먼저 · 4체계 접기/펼치기</span>`,
  ].join('');
  fortuneListEl.innerHTML = entries.length
    ? entries.map((entry, index) => renderEntry(entry, index)).join('')
    : '<div class="grade-card empty">아직 공개 가능한 운세 기록이 없습니다.</div>';
}

fetch(`${dataSource}?ts=${Date.now()}`)
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(render)
  .catch((err) => {
    summaryEl.textContent = '데이터 로드 실패';
    fortuneListEl.innerHTML = `<div class="grade-card empty">${esc(err.message)}</div>`;
  });
