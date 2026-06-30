'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// ── Color tokens ─────────────────────────────────────────────────────────────
const NAV     = '#0A1628';
const GOLD    = '#C9A84C';
const GOLD_LT = '#E8C97A';
const SURFACE = '#0F1E35';
const CARD    = '#0D1A2E';
const BORDER  = '#1E3251';
const TEXT    = '#F0F4FF';
const MUTED   = '#7A94BB';

// ── Portal hub data (top section) ────────────────────────────────────────────
const PORTAL_BRANDS = [
  {
    id: 'dental',
    name: 'Tascal Dental',
    icon: '🦷',
    color: '#0891b2',
    portals: [
      { name: '本番Portal',     url: 'https://tascal-dental.vercel.app',              icon: '🏥' },
      { name: 'Super Admin',   url: 'https://tascal-dental.vercel.app/super-admin',  icon: '🔐' },
      { name: 'Partner Portal', url: 'https://tascal-dental.vercel.app/partner',      icon: '🤝' },
    ],
  },
  {
    id: 'beauty',
    name: 'Love Beauty',
    icon: '💄',
    color: '#e91e8c',
    portals: [
      { name: '本番Portal',     url: 'https://lovebeauty.salon',              icon: '🏥' },
      { name: 'Super Admin',   url: 'https://lovebeauty.salon/super-admin',  icon: '🔐' },
      { name: 'Partner Portal', url: 'https://lovebeauty.salon/partner',      icon: '🤝' },
    ],
  },
  {
    id: 'touch',
    name: 'Tascal Touch',
    icon: '🖐️',
    color: '#7c3aed',
    portals: [
      { name: '本番Portal',     url: 'https://tascal-touch.vercel.app',              icon: '🏥' },
      { name: 'Super Admin',   url: 'https://tascal-touch.vercel.app/super-admin',  icon: '🔐' },
      { name: 'Partner Portal', url: 'https://tascal-touch.vercel.app/partner',      icon: '🤝' },
    ],
  },
  {
    id: 'manabi',
    name: 'Tascal Manabi',
    icon: '📚',
    color: '#f59e0b',
    portals: [
      { name: '本番Portal',     url: 'https://tascal-manabi.vercel.app',              icon: '🏥' },
      { name: 'Super Admin',   url: 'https://tascal-manabi.vercel.app/super-admin',  icon: '🔐' },
      { name: 'Partner Portal', url: 'https://tascal-manabi.vercel.app/partner',      icon: '🤝' },
    ],
  },
  {
    id: 'hoken',
    name: 'Tascal Hoken',
    icon: '🛡️',
    color: '#6366f1',
    portals: [
      { name: '本番Portal',     url: 'https://tascal-hoken.vercel.app',              icon: '🏥' },
      { name: 'Super Admin',   url: 'https://tascal-hoken.vercel.app/super-admin',  icon: '🔐' },
      { name: 'Partner Portal', url: 'https://tascal-hoken.vercel.app/partner',      icon: '🤝' },
    ],
  },
  {
    id: 'pet',
    name: 'Tascal Pet',
    icon: '🐾',
    color: '#10b981',
    portals: [
      { name: '本番Portal',     url: 'https://tascal-pet.vercel.app',              icon: '🏥' },
      { name: 'Super Admin',   url: 'https://tascal-pet.vercel.app/super-admin',  icon: '🔐' },
      { name: 'Partner Portal', url: 'https://tascal-pet.vercel.app/partner',      icon: '🤝' },
    ],
  },
  {
    id: 'malaysia',
    name: 'Tascal Pro Malaysia',
    icon: '🇲🇾',
    color: '#c0392b',
    portals: [
      { name: '会計事務所向け', url: 'https://tascal-pro-malaysia.vercel.app', icon: '🌏' },
    ],
  },
];

// ── Prospect launcher brand config ───────────────────────────────────────────
const BRANDS = [
  { id: 'dental', icon: '🦷', label: 'Tascal Dental',  desc: '歯科医院',   api: '/api/agent/collect' },
  { id: 'beauty', icon: '💄', label: 'Love Beauty',    desc: 'エステサロン', api: '/api/agent/beauty/collect' },
  { id: 'touch',  icon: '🖐️', label: 'Tascal Touch',   desc: '整骨院',     api: '/api/agent/touch/collect' },
  { id: 'manabi', icon: '📚', label: 'Tascal Manabi',  desc: '学習塾',     api: '/api/agent/manabi/collect' },
  { id: 'hoken',  icon: '🛡️', label: 'Tascal Hoken',   desc: '保険代理店', api: '/api/agent/hoken/collect' },
  { id: 'pet',    icon: '🐾', label: 'Tascal Pet',     desc: '動物病院',   api: '/api/agent/pet/collect' },
] as const;

type BrandId = typeof BRANDS[number]['id'];

const PREFECTURES = [
  '北海道', '宮城県', '東京都', '神奈川県', '埼玉県', '千葉県', '愛知県',
  '大阪府', '兵庫県', '京都府', '広島県', '福岡県', '沖縄県',
];

type ProspectRow = {
  id: string;
  clinic_name: string;
  address: string | null;
  prefecture: string | null;
  rating: number | null;
  email: string | null;
  created_at: string | null;
};

type BrandState = {
  selectedPrefs: string[];
  collecting: boolean;
  progress: string;
  message: string;
  showData: boolean;
  data: ProspectRow[] | null;
  dataLoading: boolean;
  totalCount: number | null;
  scraping: boolean;
  scrapeMessage: string;
};

const initState = (): BrandState => ({
  selectedPrefs: ['大阪府'],
  collecting: false,
  progress: '',
  message: '',
  showData: false,
  data: null,
  dataLoading: false,
  totalCount: null,
  scraping: false,
  scrapeMessage: '',
});

// ── Prefecture Dropdown ───────────────────────────────────────────────────────
function PrefDropdown({
  selected,
  open,
  onToggle,
  onTogglePref,
  dropRef,
}: {
  selected: string[];
  open: boolean;
  onToggle: () => void;
  onTogglePref: (p: string) => void;
  dropRef: React.RefObject<HTMLDivElement>;
}) {
  const label =
    selected.length === 0 ? '都道府県を選択' :
    selected.length === 1 ? selected[0] :
    `${selected.length}件選択中`;

  return (
    <div ref={dropRef} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 12px', borderRadius: 8,
          background: SURFACE, border: `1px solid ${BORDER}`,
          color: TEXT, fontSize: 12, fontWeight: 500, cursor: 'pointer',
          whiteSpace: 'nowrap', minWidth: 120,
        }}
      >
        <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
        <span style={{ fontSize: 9, color: MUTED }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 50,
          marginTop: 4, background: SURFACE, border: `1px solid ${BORDER}`,
          borderRadius: 10, padding: '6px 4px',
          width: 148, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {PREFECTURES.map(p => (
            <label
              key={p}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
                fontSize: 12, color: selected.includes(p) ? GOLD : MUTED,
                background: selected.includes(p) ? 'rgba(201,168,76,0.08)' : 'transparent',
              }}
            >
              <input
                type="checkbox"
                checked={selected.includes(p)}
                onChange={() => onTogglePref(p)}
                style={{ accentColor: GOLD, width: 13, height: 13 }}
              />
              {p}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Data Table ────────────────────────────────────────────────────────────────
function DataTable({ rows, loading }: { rows: ProspectRow[] | null; loading: boolean }) {
  if (loading) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center', color: MUTED, fontSize: 13 }}>
        読み込み中...
      </div>
    );
  }
  if (!rows || rows.length === 0) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center', color: MUTED, fontSize: 13 }}>
        データがありません。まず収集を実行してください。
      </div>
    );
  }

  const cols = [
    { key: 'clinic_name', label: '店舗名',       width: '20%' },
    { key: 'address',     label: '住所',         width: '28%' },
    { key: 'prefecture',  label: '都道府県',     width: '9%' },
    { key: 'rating',      label: '評価',         width: '7%' },
    { key: 'email',       label: 'メールアドレス', width: '20%' },
    { key: 'created_at',  label: '収集日時',     width: '16%' },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
            {cols.map(c => (
              <th key={c.key} style={{
                padding: '8px 12px', textAlign: 'left',
                color: MUTED, fontWeight: 600, letterSpacing: '0.05em',
                fontSize: 10, textTransform: 'uppercase',
                borderBottom: `1px solid ${BORDER}`, width: c.width,
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              style={{ borderBottom: `1px solid rgba(30,50,81,0.5)`, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}
            >
              <td style={{ padding: '8px 12px', color: TEXT, fontWeight: 500 }}>{row.clinic_name}</td>
              <td style={{ padding: '8px 12px', color: MUTED }}>{row.address ?? '—'}</td>
              <td style={{ padding: '8px 12px', color: MUTED }}>{row.prefecture ?? '—'}</td>
              <td style={{ padding: '8px 12px', color: row.rating ? GOLD : MUTED }}>
                {row.rating ? `★ ${row.rating}` : '—'}
              </td>
              <td style={{ padding: '8px 12px', color: row.email ? '#60A5FA' : MUTED, fontSize: 11 }}>
                {row.email ?? '—'}
              </td>
              <td style={{ padding: '8px 12px', color: MUTED }}>
                {row.created_at ? new Date(row.created_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [states, setStates] = useState<Record<BrandId, BrandState>>(
    () => Object.fromEntries(BRANDS.map(b => [b.id, initState()])) as Record<BrandId, BrandState>
  );
  const [openDropdown, setOpenDropdown] = useState<BrandId | null>(null);
  const dropRefs = useRef<Partial<Record<BrandId, React.RefObject<HTMLDivElement>>>>(
    Object.fromEntries(BRANDS.map(b => [b.id, { current: null }]))
  );

  // Load initial counts for all brands
  useEffect(() => {
    BRANDS.forEach(async b => {
      try {
        const res = await fetch(`/api/prospects/${b.id}`);
        const json = await res.json();
        if (typeof json.count === 'number') {
          setStates(prev => ({
            ...prev,
            [b.id]: { ...prev[b.id], totalCount: json.count },
          }));
        }
      } catch { /* ignore */ }
    });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      const ref = dropRefs.current[openDropdown];
      if (ref?.current && !ref.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDropdown]);

  function togglePref(brandId: BrandId, pref: string) {
    setStates(prev => ({
      ...prev,
      [brandId]: {
        ...prev[brandId],
        selectedPrefs: prev[brandId].selectedPrefs.includes(pref)
          ? prev[brandId].selectedPrefs.filter(p => p !== pref)
          : [...prev[brandId].selectedPrefs, pref],
      },
    }));
  }

  async function handleCollect(brand: typeof BRANDS[number]) {
    const st = states[brand.id];
    if (st.selectedPrefs.length === 0) {
      setStates(prev => ({ ...prev, [brand.id]: { ...prev[brand.id], message: '都道府県を選択してください' } }));
      return;
    }
    setStates(prev => ({ ...prev, [brand.id]: { ...prev[brand.id], collecting: true, progress: '', message: '' } }));
    try {
      let total = 0;
      const prefs = states[brand.id].selectedPrefs;
      for (let i = 0; i < prefs.length; i++) {
        const prefecture = prefs[i];
        setStates(prev => ({
          ...prev,
          [brand.id]: { ...prev[brand.id], progress: `${prefecture} 収集中... ${i + 1}/${prefs.length}` },
        }));
        const res = await fetch(brand.api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prefecture }),
        });
        const data = await res.json();
        total += data.collected ?? 0;
      }
      // Refresh count after collection
      const countRes = await fetch(`/api/prospects/${brand.id}`);
      const countJson = await countRes.json();
      setStates(prev => ({
        ...prev,
        [brand.id]: {
          ...prev[brand.id],
          collecting: false,
          progress: '',
          message: `✓ ${total}件収集`,
          totalCount: typeof countJson.count === 'number' ? countJson.count : prev[brand.id].totalCount,
          // Refresh expanded data if it was open
          data: prev[brand.id].showData ? countJson.rows ?? null : prev[brand.id].data,
        },
      }));
    } catch {
      setStates(prev => ({ ...prev, [brand.id]: { ...prev[brand.id], collecting: false, progress: '', message: '収集失敗' } }));
    }
  }

  async function handleScrapeEmails(brandId: BrandId) {
    setStates(prev => ({ ...prev, [brandId]: { ...prev[brandId], scraping: true, scrapeMessage: '' } }));
    try {
      const res = await fetch('/api/agent/scrape-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: brandId }),
      });
      const data = await res.json();
      setStates(prev => ({
        ...prev,
        [brandId]: {
          ...prev[brandId],
          scraping: false,
          scrapeMessage: `📧 ${data.updated ?? 0}件取得`,
          // Refresh expanded data to show email column
          data: null,
          dataLoading: prev[brandId].showData,
        },
      }));
      if (states[brandId].showData) {
        const fresh = await fetch(`/api/prospects/${brandId}`);
        const json = await fresh.json();
        setStates(prev => ({
          ...prev,
          [brandId]: { ...prev[brandId], data: json.rows ?? [], dataLoading: false },
        }));
      }
    } catch {
      setStates(prev => ({ ...prev, [brandId]: { ...prev[brandId], scraping: false, scrapeMessage: '取得失敗' } }));
    }
  }

  async function handleViewData(brandId: BrandId) {
    const st = states[brandId];
    if (st.showData) {
      setStates(prev => ({ ...prev, [brandId]: { ...prev[brandId], showData: false } }));
      return;
    }
    setStates(prev => ({ ...prev, [brandId]: { ...prev[brandId], showData: true, dataLoading: true } }));
    try {
      const res = await fetch(`/api/prospects/${brandId}`);
      const json = await res.json();
      setStates(prev => ({
        ...prev,
        [brandId]: {
          ...prev[brandId],
          dataLoading: false,
          data: json.rows ?? [],
          totalCount: typeof json.count === 'number' ? json.count : prev[brandId].totalCount,
        },
      }));
    } catch {
      setStates(prev => ({ ...prev, [brandId]: { ...prev[brandId], dataLoading: false } }));
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: NAV, color: TEXT, fontFamily: "'Noto Sans JP', 'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .portal-link:hover { opacity: 0.82; }
        .collect-btn:hover:not(:disabled) { background: rgba(201,168,76,0.25) !important; }
        .email-btn:hover:not(:disabled) { background: rgba(96,165,250,0.22) !important; }
        .data-btn:hover { border-color: rgba(201,168,76,0.5) !important; color: ${GOLD_LT} !important; }
        .row-link:hover { color: ${GOLD} !important; }
      `}</style>

      {/* Header */}
      <header style={{
        background: SURFACE, borderBottom: `1px solid ${BORDER}`,
        height: 60, display: 'flex', alignItems: 'center',
        padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100,
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(135deg, ${GOLD}, #A87C2A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>🌐</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: GOLD, letterSpacing: '0.03em' }}>Globish Hub</div>
            <div style={{ fontSize: 9, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Globish International</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: MUTED }}>坂田昌鴻 — CEO</div>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>

        {/* ── Section 1: Portal リンク集 ──────────────────────────────── */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>🌐 Portal リンク集</h2>
            <p style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>各ブランドの本番Portal・Super Admin・Partner Portalへ直接アクセス</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {PORTAL_BRANDS.map(service => (
              <div
                key={service.id}
                style={{
                  background: CARD, border: `1px solid ${BORDER}`,
                  borderRadius: 14, overflow: 'hidden',
                }}
              >
                {/* Brand header */}
                <div style={{
                  padding: '12px 16px', borderBottom: `1px solid ${BORDER}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: `${service.color}12`,
                }}>
                  <span style={{ fontSize: 20 }}>{service.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{service.name}</span>
                  <div style={{
                    marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700,
                    background: 'rgba(74,222,128,0.12)',
                    color: '#4ADE80',
                    border: '1px solid rgba(74,222,128,0.3)',
                    whiteSpace: 'nowrap',
                  }}>
                    ✅ 稼働中
                  </div>
                </div>

                {/* 3 stacked link buttons */}
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {service.portals.map((portal, i) => (
                    <a
                      key={i}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portal-link"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '9px 12px', borderRadius: 9, textDecoration: 'none',
                        background: i === 0
                          ? `linear-gradient(135deg, ${GOLD}, #A87C2A)`
                          : 'rgba(255,255,255,0.04)',
                        border: i === 0 ? 'none' : `1px solid ${BORDER}`,
                        color: i === 0 ? '#0A1628' : TEXT,
                        fontSize: 12, fontWeight: i === 0 ? 700 : 500,
                        transition: 'opacity 0.15s',
                      }}
                    >
                      <span>{portal.icon} {portal.name}</span>
                      <span style={{ fontSize: 11, opacity: 0.75 }}>→ 開く</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Prospectランチャー ───────────────────────────── */}
        <section>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>🔍 Prospectランチャー</h2>
            <p style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>都道府県を選択して一括収集 → Supabaseに保存</p>
          </div>

          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 160px 100px 110px 1fr 130px',
              padding: '10px 20px', borderBottom: `1px solid ${BORDER}`,
              background: SURFACE,
            }}>
              {['ブランド', '都道府県', '収集', 'メール', '状況', 'データ'].map(h => (
                <div key={h} style={{ fontSize: 10, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
              ))}
            </div>

            {/* Brand rows */}
            {BRANDS.map((b, i) => {
              const st = states[b.id];
              const dropRef = dropRefs.current[b.id] as React.RefObject<HTMLDivElement>;
              return (
                <div key={b.id}>
                  {/* Main row */}
                  <div
                    style={{
                      display: 'grid', gridTemplateColumns: '1fr 160px 100px 110px 1fr 130px',
                      alignItems: 'center', padding: '14px 20px',
                      borderBottom: `1px solid ${BORDER}`,
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    {/* Brand name + count badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{b.icon}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <Link
                            href={`/prospects/${b.id}`}
                            className="row-link"
                            style={{ fontSize: 13, fontWeight: 600, color: TEXT, textDecoration: 'none', transition: 'color 0.15s' }}
                          >
                            {b.label}
                          </Link>
                          {st.totalCount !== null && (
                            <span style={{
                              fontSize: 10, padding: '1px 7px', borderRadius: 8, fontWeight: 700,
                              background: 'rgba(201,168,76,0.15)', color: GOLD,
                              border: '1px solid rgba(201,168,76,0.3)',
                            }}>
                              {st.totalCount}件
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: MUTED }}>{b.desc}</div>
                      </div>
                    </div>

                    {/* Prefecture dropdown */}
                    <PrefDropdown
                      selected={st.selectedPrefs}
                      open={openDropdown === b.id}
                      onToggle={() => setOpenDropdown(openDropdown === b.id ? null : b.id)}
                      onTogglePref={p => togglePref(b.id, p)}
                      dropRef={dropRef}
                    />

                    {/* Collect button */}
                    <button
                      onClick={() => handleCollect(b)}
                      disabled={st.collecting}
                      className="collect-btn"
                      style={{
                        padding: '7px 14px', borderRadius: 8,
                        background: 'rgba(201,168,76,0.15)', border: `1px solid rgba(201,168,76,0.35)`,
                        color: GOLD, fontSize: 12, fontWeight: 600,
                        cursor: st.collecting ? 'not-allowed' : 'pointer',
                        opacity: st.collecting ? 0.6 : 1,
                        transition: 'background 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {st.collecting ? '収集中...' : '🔍 収集'}
                    </button>

                    {/* Scrape email button */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <button
                        onClick={() => handleScrapeEmails(b.id)}
                        disabled={st.scraping}
                        className="collect-btn"
                        style={{
                          padding: '7px 10px', borderRadius: 8,
                          background: 'rgba(96,165,250,0.12)', border: `1px solid rgba(96,165,250,0.3)`,
                          color: '#60A5FA', fontSize: 12, fontWeight: 600,
                          cursor: st.scraping ? 'not-allowed' : 'pointer',
                          opacity: st.scraping ? 0.6 : 1,
                          transition: 'background 0.15s',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {st.scraping ? '取得中...' : '📧 メール収集'}
                      </button>
                      {st.scrapeMessage && (
                        <div style={{ fontSize: 10, color: st.scrapeMessage.includes('失敗') ? '#F87171' : '#60A5FA', textAlign: 'center' }}>
                          {st.scrapeMessage}
                        </div>
                      )}
                    </div>

                    {/* Status / progress / result */}
                    <div style={{ paddingLeft: 8 }}>
                      {st.collecting && st.progress ? (
                        <div style={{ fontSize: 11, color: '#60A5FA' }}>{st.progress}</div>
                      ) : (
                        <div style={{
                          fontSize: 12,
                          color: st.message.startsWith('✓') ? '#4ADE80' : st.message ? '#F87171' : MUTED,
                        }}>
                          {st.message || '—'}
                        </div>
                      )}
                    </div>

                    {/* View data button */}
                    <button
                      onClick={() => handleViewData(b.id)}
                      className="data-btn"
                      style={{
                        padding: '7px 12px', borderRadius: 8,
                        background: st.showData ? 'rgba(201,168,76,0.12)' : 'transparent',
                        border: `1px solid ${st.showData ? 'rgba(201,168,76,0.4)' : BORDER}`,
                        color: st.showData ? GOLD : MUTED,
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        transition: 'border-color 0.15s, color 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      📋 データ{st.showData ? ' ▲' : ' ▼'}
                    </button>
                  </div>

                  {/* Expandable data panel */}
                  {st.showData && (
                    <div style={{
                      borderBottom: i < BRANDS.length - 1 ? `1px solid ${BORDER}` : 'none',
                      background: 'rgba(0,0,0,0.25)',
                    }}>
                      <div style={{
                        padding: '10px 20px', borderBottom: `1px solid rgba(30,50,81,0.5)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}>
                        <span style={{ fontSize: 12, color: MUTED }}>
                          {b.label} — 最新200件
                          {st.totalCount !== null && ` (合計 ${st.totalCount}件)`}
                        </span>
                      </div>
                      <DataTable rows={st.data} loading={st.dataLoading} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <footer style={{ marginTop: '4rem', textAlign: 'center', color: MUTED, fontSize: 11, borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem' }}>
          Globish International Co., Ltd. — Kuala Lumpur, Malaysia
        </footer>
      </main>
    </div>
  );
}
