// 한바퀴 위젯 중계 서버 (Cloudflare Worker)
//
// 앱이 POST /summary 로 이번 달 합계를 보내면 KV에 저장하고,
// 아이폰 위젯(Scriptable)이 GET /summary 로 같은 내용을 읽어 갑니다.
// 개별 기록·메모·만난 사람·사진은 앱이 보내지 않으므로 여기에도 저장되지 않아요.
//
// 필요한 설정 (Cloudflare 대시보드 → 이 Worker → Settings)
//   - Variables and Secrets: SYNC_TOKEN  (앱에서 만든 보안키, Secret으로 저장)
//   - Bindings: KV namespace → 변수 이름 HANBAKWI

const MAX_BODY = 200_000; // 합계 데이터는 보통 수 KB라 넉넉하게

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors(origin) },
  });
}

// 보안키 비교: 길이가 같을 때 모든 글자를 끝까지 비교해 시간 차이로 키가 새지 않게 함
function sameToken(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (url.pathname.replace(/\/+$/, '') !== '/summary') return json({ ok: false, error: 'not found' }, 404, origin);

    if (!env.SYNC_TOKEN || !env.HANBAKWI) return json({ ok: false, error: 'worker not configured' }, 500, origin);
    const auth = request.headers.get('Authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    if (!sameToken(token, env.SYNC_TOKEN)) return json({ ok: false, error: 'unauthorized' }, 401, origin);

    if (request.method === 'POST') {
      const text = await request.text();
      if (text.length > MAX_BODY) return json({ ok: false, error: 'too large' }, 413, origin);
      let data;
      try { data = JSON.parse(text); } catch { return json({ ok: false, error: 'bad json' }, 400, origin); }
      if (!data || !Array.isArray(data.categories)) return json({ ok: false, error: 'bad data' }, 400, origin);
      data.receivedAt = new Date().toISOString();
      await env.HANBAKWI.put('summary', JSON.stringify(data));
      return json({ ok: true }, 200, origin);
    }

    if (request.method === 'GET') {
      const saved = await env.HANBAKWI.get('summary');
      if (!saved) return json({ ok: false, error: 'no data yet' }, 404, origin);
      return new Response(saved, {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors(origin) },
      });
    }

    return json({ ok: false, error: 'method not allowed' }, 405, origin);
  },
};
