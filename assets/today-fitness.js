const FITNESS_IMAGE_POOL = {
  upper: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
  lower: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  full: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  recovery: 'https://images.unsplash.com/photo-1540206276207-3af25c08abc4?auto=format&fit=crop&w=900&q=80'
};

const FITNESS_PLAN = [
  {
    key: 'sun',
    title: '회복 + 식단 준비',
    badge: 'Rest / Meal Prep',
    focus: '173cm·60kg 기준 증량은 쉬는 날 식사량을 지키는 것이 핵심입니다. 완전 휴식 또는 가벼운 산책만 합니다.',
    image: FITNESS_IMAGE_POOL.recovery,
    workout: [
      '가벼운 산책 20–30분 · 호흡 편한 속도',
      '고관절·흉추·어깨 가동성 10분',
      '전신 스트레칭 8–12분',
      '7일 평균 체중·허리둘레·운동기록 확인'
    ],
    meals: [
      '출근 전 5분 아침 약 650–750kcal: 전날 만든 오버나이트 오트 60g + 우유 250ml + 웨이 1스쿱 + 바나나 + 땅콩버터 10g',
      '간식 약 370kcal: 그릭요거트 200g + 그래놀라 40g + 꿀 10g',
      '점심 약 680kcal: 김치볶음밥 + 참치/닭고기 + 계란',
      '저녁 약 715kcal: 고등어/연어 + 밥 250g + 두부찌개',
      '자기 전 약 240kcal: 우유 250ml + 견과류 15g'
    ]
  },
  {
    key: 'mon',
    title: '상체 A: 가슴·등 중량 찾기',
    badge: 'Upper A · RIR 2',
    focus: '첫 4주는 실패 세트 금지. 시작 무게 하단값으로 폼을 잡고, 목표 반복 상단을 채우면 다음 주 소폭 증량합니다.',
    image: FITNESS_IMAGE_POOL.upper,
    workout: [
      '벤치프레스 3세트 x 6–10회 · 시작 30–35kg · 30kg부터 권장',
      '체스트 서포티드 로우 또는 케이블 로우 3세트 x 8–12회 · 시작 35–45kg',
      '인클라인 덤벨프레스 3세트 x 8–12회 · 시작 덤벨 10–14kg씩',
      '랫풀다운 3세트 x 8–12회 · 시작 35–45kg',
      '레터럴 레이즈 3세트 x 12–20회 · 시작 덤벨 4–6kg씩',
      '트라이셉스 프레스다운 2세트 x 10–15회 · 시작 15–25kg',
      '덤벨/케이블 컬 2세트 x 10–15회 · 시작 덤벨 6–9kg씩'
    ],
    meals: [
      '총량 목표: 2,900–3,000kcal · 단백질 125g · 탄수화물 420–440g',
      '출근 전 5분 아침 약 650–750kcal: 오버나이트 오트 또는 쉐이크(우유 400ml + 웨이 + 바나나 + 오트 40g + 땅콩버터)',
      '점심 약 680kcal: 불고기덮밥, 밥 250g, 계란 1개, 익힌 채소',
      '운동 전후 약 280kcal: 떡 70g 또는 바나나 1–2개 + 웨이 1스쿱',
      '저녁 약 715kcal: 고등어구이 + 밥 250g + 두부/된장국',
      '자기 전 약 240kcal: 우유 250ml + 견과류 15g'
    ]
  },
  {
    key: 'tue',
    title: '하체 A: 스쿼트·햄스트링',
    badge: 'Lower A · RIR 2',
    focus: '스쿼트와 RDL은 허리 중립이 무너지면 즉시 감량합니다. 하체는 무게보다 깊이와 반복 품질을 우선합니다.',
    image: FITNESS_IMAGE_POOL.lower,
    workout: [
      '백스쿼트 3세트 x 5–8회 · 시작 35–45kg · 초보 안전 시작 35kg',
      '루마니안 데드리프트 3세트 x 6–10회 · 시작 35–45kg',
      '레그프레스 3세트 x 10–15회 · 시작 80–120kg · 머신별 조정',
      '레그컬 3세트 x 10–15회 · 시작 20–35kg',
      '스탠딩 카프레이즈 3세트 x 10–15회 · 시작 40–70kg',
      '케이블 크런치 또는 AB wheel 2–3세트 · 케이블 15–30kg 또는 AB wheel 5–10회'
    ],
    meals: [
      '총량 목표: 2,900–3,000kcal. 하체 날은 탄수화물 절대 줄이지 않기',
      '출근 전 5분 아침: 베이글 + 프로틴우유/우유 + 바나나 · 계란은 삶아서 들고 가기',
      '간식: 그릭요거트 200g + 그래놀라 40g + 꿀',
      '점심: 닭다리살 카레라이스 + 밥 250g',
      '운동 전후: 웨이 1스쿱 + 떡 70g',
      '저녁: 제육볶음 + 밥 250g + 익힌 채소',
      '자기 전: 우유 + 견과류'
    ]
  },
  {
    key: 'wed',
    title: '휴식: 회복 + 체중 체크',
    badge: 'Recovery',
    focus: '수요일은 쉬어야 목·금 운동 기록이 오릅니다. 운동 욕심보다 수면 7시간과 3,000kcal 달성이 우선입니다.',
    image: FITNESS_IMAGE_POOL.recovery,
    workout: [
      '가벼운 산책 20–30분 또는 완전 휴식',
      '고관절·흉추·어깨 가동성 10분',
      '팔꿈치·어깨·무릎 통증 체크',
      '아침 공복 체중 기록 · 7일 평균만 판단'
    ],
    meals: [
      '출근 전 5분 아침 약 650–750kcal: 쉐이크(우유 400ml + 웨이 + 바나나 + 오트 40g + 땅콩버터) 또는 오버나이트 오트',
      '간식 약 370kcal: 그릭요거트 + 그래놀라 + 꿀',
      '점심 약 680kcal: 참치마요덮밥 + 밥 250g + 계란',
      '저녁 약 715kcal: 소고기/돼지고기 + 파스타 또는 밥 250g',
      '체중이 2주 정체면 오늘부터 밥 100g 또는 우유 300ml 추가'
    ]
  },
  {
    key: 'thu',
    title: '상체 B: 어깨·등·상부가슴',
    badge: 'Upper B · RIR 1–2',
    focus: '오버헤드프레스는 허리 꺾임 금지. 목요일은 어깨와 등 볼륨으로 체격의 폭을 키우는 날입니다.',
    image: FITNESS_IMAGE_POOL.upper,
    workout: [
      '오버헤드프레스 3세트 x 5–8회 · 시작 20–25kg · 어려우면 덤벨 8–10kg씩',
      '풀업 보조 또는 랫풀다운 3세트 x 6–10회 · 랫풀다운 시작 40–50kg',
      '덤벨 벤치프레스 3세트 x 8–12회 · 시작 덤벨 12–16kg씩',
      '케이블 로우 3세트 x 8–12회 · 시작 35–45kg',
      '페이스풀 3세트 x 12–20회 · 시작 10–20kg',
      '레터럴 레이즈 2세트 x 12–20회 · 시작 덤벨 4–6kg씩',
      '오버헤드 트라이셉스 익스텐션 2세트 x 10–15회 · 시작 10–20kg',
      '덤벨/케이블 컬 2세트 x 10–15회 · 시작 덤벨 6–10kg씩'
    ],
    meals: [
      '총량 목표: 2,900–3,000kcal · 단백질 125g',
      '출근 전 5분 아침: 미숫가루+우유+웨이 쉐이크 + 바나나 또는 베이글 반~1개',
      '출근 후 간식: 그릭요거트 200g + 그래놀라 40g 또는 삶은 계란 2개 + 우유',
      '점심: 닭갈비덮밥 + 밥 250g',
      '운동 전후: 바나나 + 웨이 또는 떡 70g + 웨이',
      '저녁: 연어/고등어 + 밥 250g + 두부/채소',
      '자기 전: 우유 또는 그릭요거트'
    ]
  },
  {
    key: 'fri',
    title: '하체 B: 둔근·하체 볼륨',
    badge: 'Lower B · RIR 1–2',
    focus: '트랩바/프론트스쿼트는 하체 중량 자극, 불가리안과 힙쓰러스트는 둔근·허벅지 볼륨을 만듭니다.',
    image: FITNESS_IMAGE_POOL.lower,
    workout: [
      '트랩바 데드리프트 또는 프론트 스쿼트 3세트 x 4–8회 · 트랩바 45–65kg 또는 프론트스쿼트 25–35kg',
      '불가리안 스플릿 스쿼트 3세트 x 8–12회 · 맨몸~덤벨 8kg씩',
      '힙쓰러스트 3세트 x 8–12회 · 시작 40–60kg',
      '레그익스텐션 2–3세트 x 10–15회 · 시작 25–40kg',
      '레그컬 2–3세트 x 10–15회 · 시작 20–35kg',
      '코어: 케이블 크런치 15–30kg x 10–15회 또는 플랭크 30–60초'
    ],
    meals: [
      '출근 전 5분 아침: 오버나이트 오트 + 우유 + 웨이 + 그래놀라 또는 편의점 베이글+프로틴음료',
      '간식: 식빵 + 땅콩버터 + 잼',
      '점심: 비빔밥 + 소고기 + 계란 2개 + 참기름',
      '운동 전후: 우유 + 바나나 + 웨이',
      '저녁: 돼지고기 안심/등심 + 밥 250g + 된장국',
      '자기 전: 그릭요거트 또는 우유 + 견과류'
    ]
  },
  {
    key: 'sat',
    title: '선택: 약점 보강 or 휴식',
    badge: 'Optional',
    focus: '피곤하면 쉽니다. 컨디션이 좋을 때만 어깨·팔·등 약점 보강을 40분 안에 끝냅니다.',
    image: FITNESS_IMAGE_POOL.full,
    workout: [
      '레터럴 레이즈 3세트 x 15–20회 · 덤벨 4–6kg씩',
      '페이스풀 3세트 x 15–20회 · 10–20kg',
      '케이블 로우 2세트 x 10–12회 · 35–45kg',
      '덤벨 컬 2세트 x 12–15회 · 6–9kg씩',
      '트라이셉스 프레스다운 2세트 x 12–15회 · 15–25kg',
      '가벼운 산책 20분 또는 스트레칭'
    ],
    meals: [
      '총량은 쉬는 날도 2,900kcal 아래로 떨어뜨리지 않기',
      '늦은 아침/브런치: 프렌치토스트 + 계란 + 우유 + 과일 또는 베이글+프로틴음료',
      '간식: 견과류 + 프로틴음료',
      '점심: 규동/돈부리 스타일 덮밥',
      '저녁: 닭다리살 구이 + 밥 250g + 감자/고구마',
      '자기 전: 우유 + 치즈 또는 그릭요거트'
    ]
  }
];

function esc(value) {
  return String(value ?? '').replace(/[&<>\"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(date);
}

const EXERCISE_LIBRARY = [
  { keys: ['벤치프레스', '덤벨 벤치프레스'], name: '벤치프레스', target: '가슴·삼두·전면어깨', weight: '바벨 30–35kg 또는 덤벨 12–16kg씩', progress: '전 세트 목표 상단 달성 시 +2.5kg 또는 덤벨 +1–2kg', cues: ['견갑을 모으고 가슴을 세움', '팔꿈치 45–70도', '가슴 근처까지 내린 뒤 밀기'], type: 'press' },
  { keys: ['인클라인'], name: '인클라인 프레스', target: '상부가슴·전면어깨', weight: '덤벨 10–14kg씩', progress: '12회가 전 세트 가능하면 한쪽당 +1–2kg', cues: ['벤치 20–35도', '손목 수직', '가슴 위쪽으로 내리기'], type: 'incline' },
  { keys: ['오버헤드프레스', '숄더프레스'], name: '오버헤드프레스', target: '어깨·삼두', weight: '바벨 20–25kg 또는 덤벨 8–10kg씩', progress: '8회가 전 세트 가능하면 +1–2.5kg', cues: ['갈비뼈 과신전 금지', '턱을 살짝 당김', '귀 옆으로 수직 밀기'], type: 'shoulder' },
  { keys: ['로우'], name: '로우', target: '광배·중부등', weight: '케이블/머신 35–45kg', progress: '12회가 전 세트 가능하면 +2.5–5kg', cues: ['가슴 고정', '팔꿈치를 뒤로 당김', '어깨 으쓱 금지'], type: 'pull' },
  { keys: ['풀업', '랫풀다운'], name: '풀업/랫풀다운', target: '광배·이두', weight: '랫풀다운 35–50kg 또는 6–10회 가능한 풀업 보조', progress: '목표 상단 달성 시 +2.5–5kg 또는 보조무게 감소', cues: ['가슴을 바 쪽으로', '팔꿈치를 옆구리로 당김', '반동 줄이기'], type: 'pulldown' },
  { keys: ['스쿼트', '고블렛', '프론트 스쿼트'], name: '스쿼트', target: '대퇴사두·둔근', weight: '백스쿼트 35–45kg, 프론트스쿼트 25–35kg', progress: '폼 유지로 8회 전 세트 가능하면 +2.5–5kg', cues: ['발 전체로 지면 밀기', '무릎은 발끝 방향', '허리 중립 유지'], type: 'squat' },
  { keys: ['레그프레스'], name: '레그프레스', target: '대퇴사두·둔근', weight: '머신 기준 80–120kg', progress: '15회 전 세트 가능하면 +5–10kg', cues: ['엉덩이 뜨지 않게', '무릎 잠그지 않기', '통제해서 내리기'], type: 'legpress' },
  { keys: ['데드리프트', '루마니안', 'RDL'], name: '데드리프트/RDL', target: '햄스트링·둔근·척추기립근', weight: 'RDL 35–45kg, 트랩바 45–65kg', progress: '허리 중립 유지 시 +2.5–5kg, 말리면 즉시 -5kg', cues: ['엉덩이를 뒤로 접기', '바는 몸 가까이', '허리 말림 금지'], type: 'hinge' },
  { keys: ['힙쓰러스트'], name: '힙쓰러스트', target: '둔근', weight: '바벨 40–60kg', progress: '12회 전 세트 가능하면 +5kg', cues: ['턱 당기고 갈비뼈 내림', '정점에서 엉덩이 수축', '허리 과신전 금지'], type: 'hip' },
  { keys: ['불가리안'], name: '불가리안 스플릿 스쿼트', target: '둔근·대퇴사두', weight: '맨몸~덤벨 8kg씩', progress: '12회 안정되면 한쪽당 +1–2kg', cues: ['앞발 중심', '상체 살짝 전경사', '무릎 방향 유지'], type: 'split' },
  { keys: ['레그컬'], name: '레그컬', target: '햄스트링', weight: '20–35kg', progress: '15회 전 세트 가능하면 +2.5–5kg', cues: ['골반 고정', '끝까지 말아 올림', '내릴 때 천천히'], type: 'curl' },
  { keys: ['레그익스텐션'], name: '레그익스텐션', target: '대퇴사두', weight: '25–40kg', progress: '15회 전 세트 가능하면 +2.5–5kg', cues: ['무릎 축 맞추기', '상단 1초 수축', '반동 금지'], type: 'extension' },
  { keys: ['카프레이즈'], name: '카프레이즈', target: '종아리', weight: '40–70kg', progress: '15회 전 세트 가능하면 +5kg', cues: ['최하단 스트레치', '최상단 수축', '반동 없이 반복'], type: 'calf' },
  { keys: ['레터럴 레이즈'], name: '레터럴 레이즈', target: '측면어깨', weight: '덤벨 4–6kg씩', progress: '20회 전 세트 가능하면 +1kg, 승모 개입하면 감량', cues: ['팔꿈치 살짝 굽힘', '어깨 높이까지만', '승모 개입 줄이기'], type: 'lateral' },
  { keys: ['페이스풀', '리어델트'], name: '페이스풀/리어델트', target: '후면어깨·상부등', weight: '케이블 10–20kg', progress: '20회 전 세트 가능하면 +2.5kg', cues: ['팔꿈치 높게', '얼굴 쪽으로 당김', '견갑 통제'], type: 'rear' },
  { keys: ['트라이셉스', '삼두'], name: '트라이셉스 운동', target: '삼두', weight: '프레스다운 15–25kg, 오버헤드 10–20kg', progress: '15회 전 세트 가능하면 +2.5kg', cues: ['팔꿈치 고정', '끝에서 완전 수축', '어깨 흔들림 줄이기'], type: 'triceps' },
  { keys: ['컬', '이두'], name: '컬', target: '이두', weight: '덤벨 6–10kg씩', progress: '15회 전 세트 가능하면 +1kg', cues: ['팔꿈치 고정', '손목 꺾임 금지', '내릴 때 천천히'], type: 'biceps' },
  { keys: ['크런치', 'AB wheel', '코어', '플랭크', 'Pallof'], name: '코어 운동', target: '복근·몸통 안정성', weight: '케이블 15–30kg, AB wheel 5–10회, 플랭크 30–60초', progress: '허리 꺾임 없이 반복/시간부터 증가', cues: ['허리 꺾임 방지', '갈비뼈 내림', '느리게 통제'], type: 'core' },
  { keys: ['산책', '가동성', '스트레칭', '운동기록', '체중'], name: '회복/가동성', target: '회복·관절 가동범위', weight: '무게 없음', progress: '통증 없이 10–30분', cues: ['호흡 안정', '통증 없는 범위', '가볍게 마무리'], type: 'recovery' }
];

function findExerciseInfo(item) {
  return EXERCISE_LIBRARY.find((entry) => entry.keys.some((key) => item.includes(key))) || {
    name: item.split(/\s+\d/)[0],
    target: '전신 보조',
    cues: ['통증 없는 가동범위', '반동 없이 통제', '기록 가능한 중량 사용'],
    type: 'general'
  };
}

function svgData(svg) {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function exerciseSvg(info) {
  const safeName = esc(info.name);
  const safeTarget = esc(info.target);
  const cue1 = esc(info.cues[0] || '통제된 반복');
  const color = {
    press: '#ef4444', incline: '#f97316', shoulder: '#8b5cf6', pull: '#2563eb', pulldown: '#0ea5e9',
    squat: '#16a34a', legpress: '#22c55e', hinge: '#14b8a6', hip: '#10b981', split: '#84cc16',
    curl: '#06b6d4', extension: '#65a30d', calf: '#a3e635', lateral: '#a855f7', rear: '#6366f1',
    triceps: '#f43f5e', biceps: '#ec4899', core: '#64748b', recovery: '#059669', general: '#334155'
  }[info.type] || '#334155';
  const figure = {
    press: '<line x1="112" y1="118" x2="220" y2="118"/><line x1="150" y1="118" x2="150" y2="165"/><line x1="182" y1="118" x2="182" y2="165"/><line x1="105" y1="168" x2="235" y2="168"/><circle cx="86" cy="118" r="18"/><circle cx="246" cy="118" r="18"/>',
    incline: '<line x1="105" y1="175" x2="235" y2="120"/><line x1="138" y1="126" x2="205" y2="95"/><line x1="158" y1="132" x2="225" y2="102"/><circle cx="120" cy="108" r="16"/>',
    shoulder: '<circle cx="170" cy="80" r="22"/><line x1="170" y1="102" x2="170" y2="178"/><line x1="120" y1="88" x2="220" y2="88"/><line x1="140" y1="88" x2="140" y2="138"/><line x1="200" y1="88" x2="200" y2="138"/>',
    pull: '<circle cx="120" cy="90" r="20"/><line x1="140" y1="105" x2="230" y2="105"/><line x1="150" y1="135" x2="225" y2="135"/><path d="M230 80 L190 105 L230 130"/>',
    pulldown: '<line x1="90" y1="70" x2="250" y2="70"/><circle cx="170" cy="120" r="20"/><line x1="110" y1="72" x2="150" y2="115"/><line x1="230" y1="72" x2="190" y2="115"/><path d="M135 98 L150 115 L132 118"/><path d="M205 98 L190 115 L208 118"/>',
    squat: '<circle cx="155" cy="75" r="18"/><line x1="155" y1="94" x2="185" y2="140"/><line x1="185" y1="140" x2="140" y2="178"/><line x1="185" y1="140" x2="220" y2="178"/><line x1="110" y1="105" x2="215" y2="105"/>',
    legpress: '<rect x="100" y="120" width="150" height="18" rx="6"/><circle cx="135" cy="90" r="18"/><line x1="145" y1="108" x2="185" y2="138"/><line x1="185" y1="138" x2="235" y2="95"/><line x1="238" y1="78" x2="260" y2="120"/>',
    hinge: '<circle cx="135" cy="82" r="18"/><line x1="150" y1="100" x2="205" y2="132"/><line x1="205" y1="132" x2="185" y2="182"/><line x1="205" y1="132" x2="245" y2="178"/><line x1="115" y1="150" x2="250" y2="150"/>',
    hip: '<circle cx="120" cy="105" r="17"/><line x1="130" y1="120" x2="210" y2="120"/><line x1="210" y1="120" x2="245" y2="160"/><line x1="95" y1="142" x2="240" y2="142"/><path d="M190 120 Q210 80 230 120"/>',
    split: '<circle cx="150" cy="78" r="18"/><line x1="150" y1="96" x2="170" y2="142"/><line x1="170" y1="142" x2="125" y2="180"/><line x1="170" y1="142" x2="230" y2="165"/><line x1="220" y1="165" x2="255" y2="165"/>',
    lateral: '<circle cx="170" cy="82" r="20"/><line x1="170" y1="102" x2="170" y2="175"/><line x1="170" y1="120" x2="95" y2="105"/><line x1="170" y1="120" x2="245" y2="105"/>',
    rear: '<circle cx="145" cy="78" r="18"/><line x1="150" y1="96" x2="195" y2="135"/><line x1="165" y1="116" x2="95" y2="105"/><line x1="175" y1="126" x2="245" y2="105"/>',
    biceps: '<circle cx="150" cy="78" r="18"/><line x1="150" y1="96" x2="150" y2="170"/><path d="M150 122 Q105 122 112 165"/><path d="M150 122 Q195 122 188 165"/>',
    triceps: '<circle cx="165" cy="82" r="18"/><line x1="165" y1="100" x2="165" y2="172"/><line x1="122" y1="118" x2="165" y2="118"/><line x1="208" y1="118" x2="165" y2="118"/><path d="M122 118 L122 165"/><path d="M208 118 L208 165"/>',
    core: '<circle cx="110" cy="120" r="18"/><line x1="130" y1="126" x2="230" y2="126"/><line x1="185" y1="126" x2="220" y2="170"/><line x1="180" y1="126" x2="210" y2="90"/>',
    recovery: '<path d="M110 160 Q170 85 240 160"/><circle cx="170" cy="93" r="20"/><path d="M130 175 Q170 205 210 175"/>',
    general: '<circle cx="170" cy="78" r="20"/><line x1="170" y1="100" x2="170" y2="170"/><line x1="120" y1="125" x2="220" y2="125"/><line x1="170" y1="170" x2="130" y2="205"/><line x1="170" y1="170" x2="210" y2="205"/>'
  }[info.type] || '<circle cx="170" cy="105" r="42"/>';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f8fafc"/><stop offset="1" stop-color="#eef2ff"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity=".12"/></filter></defs><rect width="640" height="360" rx="28" fill="url(#bg)"/><rect x="30" y="30" width="300" height="300" rx="24" fill="white" filter="url(#s)"/><g transform="translate(20,40)" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none">${figure}</g><circle cx="520" cy="66" r="36" fill="${color}" opacity=".13"/><text x="520" y="78" text-anchor="middle" font-size="40">🏋️</text><text x="360" y="128" font-family="-apple-system,BlinkMacSystemFont,'Noto Sans KR',sans-serif" font-size="34" font-weight="900" fill="#111827">${safeName}</text><text x="360" y="172" font-family="-apple-system,BlinkMacSystemFont,'Noto Sans KR',sans-serif" font-size="20" font-weight="800" fill="${color}">${safeTarget}</text><text x="360" y="222" font-family="-apple-system,BlinkMacSystemFont,'Noto Sans KR',sans-serif" font-size="18" font-weight="700" fill="#334155">핵심: ${cue1}</text><text x="360" y="258" font-family="-apple-system,BlinkMacSystemFont,'Noto Sans KR',sans-serif" font-size="16" font-weight="700" fill="#64748b">통증 있으면 중량·가동범위 조정</text></svg>`;
  return svgData(svg);
}

function fallbackSvg(title) {
  return exerciseSvg({ name: title, target: '운동 설명', cues: ['통증 없는 범위에서 수행'], type: 'general' });
}

function mealList(items) {
  return `<ul class="meal-list">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function exerciseImage(info) {
  const byType = {
    press: 'bench-press',
    incline: 'incline-press',
    shoulder: 'overhead-press',
    pull: 'seated-row',
    pulldown: 'lat-pulldown',
    squat: 'squat',
    legpress: 'leg-press',
    hinge: 'deadlift-rdl',
    hip: 'hip-thrust',
    split: 'bulgarian-split-squat',
    curl: 'leg-curl',
    extension: 'leg-extension',
    calf: 'calf-raise',
    lateral: 'lateral-raise',
    rear: 'rear-delt-facepull',
    triceps: 'triceps-extension',
    biceps: 'biceps-curl',
    core: 'core',
    recovery: 'recovery-mobility',
    general: 'recovery-mobility'
  };
  const slug = byType[info.type] || 'recovery-mobility';
  return `assets/exercise-images/${slug}.png`;
}

function exerciseCard(item, index) {
  const info = findExerciseInfo(item);
  return `<li class="exercise-card ${index === 0 ? 'active' : ''}" data-slide="${index}">
    <img class="exercise-diagram" src="${exerciseImage(info)}" alt="${esc(info.name)} 설명 이미지" onerror="this.onerror=null;this.src='${fallbackSvg(info.name)}';" />
    <div class="exercise-copy">
      <strong>${esc(item)}</strong>
      <small>주요 자극: ${esc(info.target)}</small>
      <p class="weight-line"><b>시작 중량</b> ${esc(info.weight || 'RIR 2로 가능한 무게')}</p>
      <p class="progress-line"><b>증량 기준</b> ${esc(info.progress || '목표 반복 상단 달성 시 소폭 증량')}</p>
      <ol>${info.cues.map((cue) => `<li>${esc(cue)}</li>`).join('')}</ol>
    </div>
  </li>`;
}

function exerciseList(plan, carouselId) {
  const total = plan.workout.length;
  return `<div class="exercise-carousel" id="${esc(carouselId)}" data-index="0" data-total="${total}">
    <div class="carousel-top">
      <button class="carousel-btn" type="button" data-dir="-1" aria-label="이전 운동">‹</button>
      <span class="carousel-count"><b>1</b> / ${total}</span>
      <button class="carousel-btn" type="button" data-dir="1" aria-label="다음 운동">›</button>
    </div>
    <ul class="exercise-list">${plan.workout.map(exerciseCard).join('')}</ul>
  </div>`;
}

function renderPanel(plan, date, label) {
  const isRest = plan.key === 'sun';
  const isTomorrow = label === '내일';
  const carouselId = `${label === '오늘' ? 'today' : 'tomorrow'}-exercise-carousel`;
  const header = `
    <${isTomorrow ? 'summary' : 'div'} class="day-head ${isTomorrow ? 'collapsible-head' : ''}">
      <div>
        <p class="eyebrow">${esc(label)} · ${esc(formatDate(date))}</p>
        <h2>${esc(plan.title)}</h2>
      </div>
      <span class="head-actions">
        <span class="plan-badge">${esc(plan.badge)}</span>
        ${isTomorrow ? '<span class="toggle-label" aria-hidden="true"></span>' : ''}
      </span>
    </${isTomorrow ? 'summary' : 'div'}>`;
  const body = `
    <div class="day-content">
      <div class="day-main">
        <div class="plan-note">${esc(plan.focus)} ${isRest ? '' : '아래 각 운동 카드는 동작 이해용 설명 이미지와 핵심 큐를 함께 표시합니다.'}</div>
        <div class="split-blocks">
          <section>
            <h3>운동 루틴</h3>
            ${exerciseList(plan, carouselId)}
          </section>
          <section>
            <h3>식단 루틴</h3>
            ${mealList(plan.meals)}
          </section>
        </div>
      </div>
    </div>`;

  return isTomorrow ? `<details class="day-details tomorrow-details">${header}${body}</details>` : `${header}${body}`;
}

function updateCarousel(carousel, nextIndex) {
  const total = Number(carousel.dataset.total || 0);
  if (!total) return;
  const index = (nextIndex + total) % total;
  carousel.dataset.index = String(index);
  carousel.querySelectorAll('.exercise-card').forEach((card, cardIndex) => {
    card.classList.toggle('active', cardIndex === index);
  });
  const count = carousel.querySelector('.carousel-count b');
  if (count) count.textContent = String(index + 1);
}

function initCarousels() {
  document.querySelectorAll('.exercise-carousel').forEach((carousel) => {
    carousel.querySelectorAll('.carousel-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = Number(button.dataset.dir || 1);
        const current = Number(carousel.dataset.index || 0);
        updateCarousel(carousel, current + direction);
      });
    });
  });
}

function renderFitness() {
  const now = new Date();
  const todayIndex = now.getDay();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const today = FITNESS_PLAN[todayIndex];
  const next = FITNESS_PLAN[tomorrow.getDay()];

  document.getElementById('fitness-summary').textContent = `${formatDate(now)} 기준 자동 업데이트 · 173cm·60kg 맞춤 오늘/내일 식단과 PT식 중량 코칭`;
  document.getElementById('fitness-status').innerHTML = [
    '<span class="pill">173cm·60kg 기준</span>',
    '<span class="pill">2,900–3,000kcal/day</span>',
    '<span class="pill">단백질 125g/day</span>',
    '<span class="pill">목표 +0.15–0.30kg/주</span>'
  ].join('');
  document.getElementById('today-panel').innerHTML = renderPanel(today, now, '오늘');
  document.getElementById('tomorrow-panel').innerHTML = renderPanel(next, tomorrow, '내일');
  initCarousels();
}

renderFitness();
