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

// ── Brand config ─────────────────────────────────────────────────────────────
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

// ── Types ────────────────────────────────────────────────────────────────────
type BrandState = {
  selectedPrefs: string[];
  collecting: boolean;
  message: string;
};

const initState = (): BrandState => ({
  selectedPrefs: ['大阪府'],
  collecting: false,
  message: '',
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

// ── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [states, setStates] = useState<Record<BrandId, BrandState>>(
    () => Object.fromEntries(BRANDS.map(b => [b.id, initState()])) as Record<BrandId, BrandState>
  );
  const [openDropdown, setOpenDropdown] = useState<BrandId | null>(null);
  const dropRefs = useRef<Partial<Record<BrandId, React.RefObject<HTMLDivElement>>>>(
    Object.fromEntries(BRANDS.map(b => [b.id, { current: null }]))
  );

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
    setStates(prev => ({ ...prev, [brand.id]: { ...prev[brand.id], collecting: true, message: '' } }));
    try {
      let total = 0;
      for (const prefecture of st.selectedPrefs) {
        const res = await fetch(brand.api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prefecture }),
        });
        const data = await res.json();
        total += data.collected ?? 0;
      }
      setStates(prev => ({ ...prev, [brand.id]: { ...prev[brand.id], collecting: false, message: `✓ ${total}件収集` } }));
    } catch {
      setStates(prev => ({ ...prev, [brand.id]: { ...prev[brand.id], collecting: false, message: '収集失敗' } }));
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: NAV, color: TEXT, fontFamily: "'Noto Sans JP', 'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .portal-card:hover { transform: translateY(-2px); border-color: rgba(201,168,76,0.5) !important; box-shadow: 0 8px 32px rgba(201,168,76,0.12) !important; }
        .open-btn:hover { background: ${GOLD_LT} !important; }
        .collect-btn:hover:not(:disabled) { background: rgba(201,168,76,0.25) !important; }
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

        {/* ── Section 1: Portal一覧 ────────────────────────────────────── */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>📋 Portal一覧</h2>
            <p style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>各ブランドのプロスペクト管理画面</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {BRANDS.map(b => (
              <div
                key={b.id}
                className="portal-card"
                style={{
                  background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14,
                  padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 12,
                  transition: 'transform 0.18s, border-color 0.18s, box-shadow 0.18s',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'rgba(201,168,76,0.12)', border: `1px solid rgba(201,168,76,0.25)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>{b.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{b.label}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{b.desc}</div>
                  </div>
                </div>
                <Link
                  href={`/prospects/${b.id}`}
                  className="open-btn"
                  style={{
                    display: 'block', textAlign: 'center', padding: '8px',
                    background: GOLD, color: '#0A1628',
                    borderRadius: 8, fontSize: 12, fontWeight: 700,
                    textDecoration: 'none', transition: 'background 0.15s',
                  }}
                >
                  管理画面を開く →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Prospectランチャー ───────────────────────────── */}
        <section>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>🔍 Prospectランチャー</h2>
            <p style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>都道府県を選択して一括収集</p>
          </div>

          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 160px 100px 1fr',
              padding: '10px 20px', borderBottom: `1px solid ${BORDER}`,
              background: SURFACE,
            }}>
              {['ブランド', '都道府県', 'アクション', '結果'].map(h => (
                <div key={h} style={{ fontSize: 10, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
              ))}
            </div>

            {/* Brand rows */}
            {BRANDS.map((b, i) => {
              const st = states[b.id];
              const dropRef = dropRefs.current[b.id] as React.RefObject<HTMLDivElement>;
              return (
                <div
                  key={b.id}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 160px 100px 1fr',
                    alignItems: 'center', padding: '14px 20px',
                    borderBottom: i < BRANDS.length - 1 ? `1px solid ${BORDER}` : 'none',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {/* Brand */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{b.icon}</span>
                    <div>
                      <Link
                        href={`/prospects/${b.id}`}
                        className="row-link"
                        style={{ fontSize: 13, fontWeight: 600, color: TEXT, textDecoration: 'none', transition: 'color 0.15s' }}
                      >
                        {b.label}
                      </Link>
                      <div style={{ fontSize: 11, color: MUTED }}>{b.desc}</div>
                    </div>
                  </div>

                  {/* Dropdown */}
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
                    }}
                  >
                    {st.collecting ? '収集中...' : '🔍 収集'}
                  </button>

                  {/* Result */}
                  <div style={{ fontSize: 12, color: st.message.startsWith('✓') ? '#4ADE80' : st.message ? '#F87171' : MUTED, paddingLeft: 8 }}>
                    {st.message || '—'}
                  </div>
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
