// 한바퀴 아이폰 위젯 (Scriptable 앱용)
//
// 1) 아래 WORKER_URL, SYNC_TOKEN 두 줄을 앱의 "설정 → 아이폰 위젯 연동"에 넣은 값과 똑같이 바꿔요.
// 2) Scriptable에서 이 스크립트를 한 번 실행하면 미리보기가 보여요.
// 3) 홈 화면에 Scriptable 위젯(작게/중간/크게)을 추가하고, 위젯을 길게 눌러 Script를 이 스크립트로 고르면 끝이에요.

const WORKER_URL = 'https://hangeol-widget.내주소.workers.dev'; // 끝에 /summary는 붙이지 않아요
const SYNC_TOKEN = '여기에_앱에서_만든_보안키를_붙여넣기';
const APP_URL = 'https://miyoung03.github.io/hangeol/'; // 위젯을 누르면 열리는 주소

const BG = Color.dynamic(new Color('#f7f5f1'), new Color('#1f2224'));
const INK = Color.dynamic(new Color('#33383b'), new Color('#eceae6'));
const SUB = Color.dynamic(new Color('#8f8a84'), new Color('#9c9892'));
const TRACK = Color.dynamic(new Color('#e6e1d9'), new Color('#3a3e41'));
const MISS = new Color('#d65a50');

const fmt = (m) => { m = Math.max(0, Math.round(m || 0)); const h = Math.floor(m / 60), r = m % 60; return h && r ? `${h}시간 ${r}분` : h ? `${h}시간` : `${r}분`; };
const short = (m) => { m = Math.max(0, Math.round(m || 0)); return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; };

async function loadSummary() {
  const fm = FileManager.local();
  const cachePath = fm.joinPath(fm.documentsDirectory(), 'hanbakwi-summary.json');
  try {
    const req = new Request(WORKER_URL.replace(/\/+$/, '') + '/summary');
    req.headers = { Authorization: 'Bearer ' + SYNC_TOKEN };
    req.timeoutInterval = 15;
    const data = await req.loadJSON();
    if (req.response.statusCode !== 200 || !data || !Array.isArray(data.categories)) throw new Error(data && data.error ? data.error : '응답 오류');
    fm.writeString(cachePath, JSON.stringify(data));
    return { data, stale: false };
  } catch (e) {
    // 인터넷이 안 되면 마지막으로 받은 내용을 보여 줘요
    if (fm.fileExists(cachePath)) return { data: JSON.parse(fm.readString(cachePath)), stale: true, error: String(e.message || e) };
    return { data: null, stale: true, error: String(e.message || e) };
  }
}

// 겹친 링 그림 (바깥부터 항목 순서대로). 끝은 작은 원을 찍어 둥글게 보이게 해요.
function ringsImage(cats, size) {
  const ctx = new DrawContext();
  ctx.size = new Size(size, size);
  ctx.opaque = false;
  ctx.respectScreenScale = true;
  const n = Math.max(1, cats.length), outer = size / 2 - 2, inner = n === 1 ? size * 0.24 : size * 0.14, gap = size * 0.025;
  const w = Math.min(size * 0.13, (outer - inner - gap * (n - 1)) / n);
  const c = size / 2;
  cats.forEach((cat, i) => {
    const r = outer - w / 2 - i * (w + gap);
    ctx.setStrokeColor(TRACK);
    ctx.setLineWidth(w);
    ctx.strokeEllipse(new Rect(c - r, c - r, r * 2, r * 2));
    const p = cat.goalMinutes ? Math.min(1, cat.minutes / cat.goalMinutes) : 0;
    if (p <= 0) return;
    const color = new Color(cat.color || '#778CB8');
    const steps = Math.max(8, Math.round(120 * p)), pts = [];
    for (let k = 0; k <= steps; k++) { const a = -Math.PI / 2 + (k / steps) * p * Math.PI * 2; pts.push(new Point(c + r * Math.cos(a), c + r * Math.sin(a))); }
    const path = new Path();
    path.addLines(pts);
    ctx.addPath(path);
    ctx.setStrokeColor(color);
    ctx.setLineWidth(w);
    ctx.strokePath();
    ctx.setFillColor(color);
    for (const pt of [pts[0], pts[pts.length - 1]]) ctx.fillEllipse(new Rect(pt.x - w / 2, pt.y - w / 2, w, w));
  });
  if (n === 1 && cats[0]) {
    const pct = cats[0].goalMinutes ? Math.round((cats[0].minutes / cats[0].goalMinutes) * 100) + '%' : '—';
    ctx.setFont(Font.boldSystemFont(size * 0.16));
    ctx.setTextColor(INK);
    ctx.setTextAlignedCenter();
    ctx.drawTextInRect(pct, new Rect(0, c - size * 0.1, size, size * 0.22));
  }
  return ctx.getImage();
}

function addText(stack, text, font, color, lines = 1) {
  const t = stack.addText(text);
  t.font = font;
  t.textColor = color;
  t.lineLimit = lines;
  t.minimumScaleFactor = 0.7;
  return t;
}

function todayLine(cat) {
  if (!cat) return null;
  if (cat.todayGoalMinutes) {
    const done = cat.todayMinutes >= cat.todayGoalMinutes;
    return { text: `오늘 ${cat.name} ${short(cat.todayMinutes)} / ${short(cat.todayGoalMinutes)}`, color: done ? new Color(cat.color || '#3d7fd9') : MISS };
  }
  return { text: `오늘 ${cat.name} ${short(cat.todayMinutes)}`, color: SUB };
}

async function build() {
  const family = config.widgetFamily || 'medium';
  const { data, stale, error } = await loadSummary();
  const w = new ListWidget();
  w.backgroundColor = BG;
  w.url = APP_URL;
  w.setPadding(14, 14, 14, 14);
  w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);

  if (!data) {
    addText(w, 'hanbakwi', Font.boldRoundedSystemFont(14), INK);
    w.addSpacer(6);
    addText(w, '아직 받은 기록이 없어요', Font.systemFont(12), SUB, 2);
    addText(w, error || '', Font.systemFont(10), SUB, 2);
    return w;
  }

  const cats = data.categories.slice(0, family === 'small' ? 3 : 5);
  const month = Number(String(data.month || '').slice(5, 7)) || '';
  const main = cats.find((c) => c.todayGoalMinutes) || cats[0];

  if (family === 'small') {
    const head = w.addStack();
    addText(head, `${month}월 누적`, Font.boldSystemFont(12), INK);
    head.addSpacer();
    if (stale) addText(head, '⟳', Font.systemFont(10), SUB);
    w.addSpacer(4);
    const row = w.addStack();
    row.addSpacer();
    row.addImage(ringsImage(cats, 84)).imageSize = new Size(84, 84);
    row.addSpacer();
    w.addSpacer(6);
    const t = todayLine(main);
    if (t) addText(w, t.text, Font.boldSystemFont(11), t.color);
    return w;
  }

  const head = w.addStack();
  head.centerAlignContent();
  addText(head, 'hanbakwi', Font.boldRoundedSystemFont(13), INK);
  head.addSpacer();
  addText(head, `${month}월 누적${stale ? ' · 이전 기록' : ''}`, Font.systemFont(11), SUB);
  w.addSpacer(8);

  const body = w.addStack();
  body.centerAlignContent();
  const ringSize = family === 'large' ? 120 : 92;
  body.addImage(ringsImage(cats, ringSize)).imageSize = new Size(ringSize, ringSize);
  body.addSpacer(12);
  const list = body.addStack();
  list.layoutVertically();
  cats.forEach((c, i) => {
    if (i) list.addSpacer(family === 'large' ? 6 : 3);
    const r = list.addStack();
    r.centerAlignContent();
    const dot = r.addText('●');
    dot.font = Font.systemFont(9);
    dot.textColor = new Color(c.color || '#778CB8');
    r.addSpacer(5);
    addText(r, c.name, Font.boldSystemFont(12), INK);
    r.addSpacer();
    addText(r, c.goalMinutes ? `${fmt(c.minutes)} / ${Math.round(c.goalMinutes / 60)}시간` : fmt(c.minutes), Font.systemFont(11), SUB);
  });

  w.addSpacer();
  const t = todayLine(main);
  if (t) addText(w, t.text, Font.boldSystemFont(12), t.color);

  if (family === 'large') {
    w.addSpacer(8);
    addText(w, '오늘', Font.boldSystemFont(12), INK);
    data.categories.forEach((c) => {
      const line = todayLine(c);
      if (line) addText(w, '  ' + line.text.replace('오늘 ', ''), Font.systemFont(11), line.color);
    });
  }
  return w;
}

const widget = await build();
if (config.runsInWidget) Script.setWidget(widget);
else await widget.presentMedium();
Script.complete();
