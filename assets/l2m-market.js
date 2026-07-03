const gradeMeta = {
  common: { label: '일반 등급', icon: '⚪', className: 'dot-common' },
  uncommon: { label: '고급 등급', icon: '🟢', className: 'dot-uncommon' },
  rare: { label: '희귀 등급', icon: '🔵', className: 'dot-rare' },
  heroic: { label: '영웅 등급', icon: '🔴', className: 'dot-heroic' },
  legendary: { label: '전설 등급', icon: '🟣', className: 'dot-legendary' },
};
const gradeOrder = ['common', 'uncommon', 'rare', 'heroic', 'legendary'];

function esc(value) {
  return String(value ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function renderTable(items) {
  if (!items.length) return '<div class="empty">조건 매물 없음</div>';
  let prevKind = null;
  const rows = items.map((item) => {
    const kind = item.kind === prevKind ? '' : item.kind;
    prevKind = item.kind;
    return `<tr>
      <td>${esc(kind)}</td>
      <td class="num"><span class="enchant grade-text-${esc(item.grade || 'unknown')}">${esc(item.enchant)}</span></td>
      <td class="name"><span class="item-name grade-text-${esc(item.grade || 'unknown')}">${esc(item.name)}</span></td>
      <td class="num"><span class="diamond-price">${esc(item.price)}</span></td>
      <td class="note">${esc(item.note)}</td>
    </tr>`;
  }).join('');
  return `<div class="table-wrap"><table>
    <thead><tr><th>종류</th><th class="num">강화</th><th>아이템명</th><th class="num">가격</th><th>비고</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function render(data) {
  const total = gradeOrder.reduce((sum, grade) => sum + (data.groups?.[grade]?.length || 0), 0);
  document.getElementById('summary').textContent = `${data.checkedAt || '-'} · 상태: ${data.errors?.length ? '일부 오류' : '정상'} · ${total}개`;
  document.getElementById('status').innerHTML = [
    `<span class="pill">서버 ${esc(data.server || '안타라스')}</span>`,
    `<span class="pill">업데이트 ${esc(data.checkedAt || '-')}</span>`,
    `<span class="pill">조건 매물 ${total}개</span>`,
  ].join('');
  document.getElementById('dashboard').innerHTML = gradeOrder.map((grade) => {
    const meta = gradeMeta[grade];
    const items = data.groups?.[grade] || [];
    return `<article class="grade-card">
      <header class="grade-head"><h2><span class="${meta.className}">${meta.icon}</span> ${meta.label}</h2><span>${items.length}개</span></header>
      ${renderTable(items.map((item) => ({ ...item, grade })))}
    </article>`;
  }).join('');
}

fetch('data/l2m_market.json?ts=' + Date.now())
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(render)
  .catch((err) => {
    document.getElementById('summary').textContent = '데이터 로드 실패';
    document.getElementById('dashboard').innerHTML = `<div class="grade-card empty">${esc(err.message)}</div>`;
  });
