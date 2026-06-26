'use client';

import Link from 'next/link';

const NAV = '#0A1628';
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C97A';
const SURFACE = '#0F1E35';
const BORDER = '#1E3251';
const TEXT = '#F0F4FF';
const MUTED = '#7A94BB';

type ProspectItem = {
  icon: string;
  label: string;
  href?: string;
  active: boolean;
};

const PROSPECTS: ProspectItem[] = [
  { icon: '🦷', label: '歯科プロスペクト', href: '/prospects/dental', active: true },
  { icon: '💄', label: '美容プロスペクト', active: false },
  { icon: '🖐️', label: 'Touchプロスペクト', active: false },
  { icon: '📚', label: 'Manabiプロスペクト', active: false },
  { icon: '🐾', label: 'Petプロスペクト', active: false },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: NAV, fontFamily: "'Noto Sans JP', 'DM Sans', sans-serif", color: TEXT, display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link-active:hover { background: rgba(201,168,76,0.15) !important; }
        .card-active:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(201,168,76,0.2) !important; }
        .open-btn:hover { background: ${GOLD_LIGHT} !important; }
      `}</style>

      {/* Header */}
      <header style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, height: 64, display: 'flex', alignItems: 'center', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${GOLD}, #A87C2A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            🌐
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: GOLD, letterSpacing: '0.03em' }}>Globish Hub</div>
            <div style={{ fontSize: 10, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Globish International</div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: 240, background: SURFACE, borderRight: `1px solid ${BORDER}`, padding: '28px 0', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0 20px 20px', borderBottom: `1px solid ${BORDER}`, marginBottom: 16 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: MUTED, textTransform: 'uppercase', marginBottom: 8 }}>プロスペクト管理</div>
          </div>
          <nav style={{ padding: '0 12px', flex: 1 }}>
            {PROSPECTS.map((item, i) => (
              item.active && item.href ? (
                <Link key={i} href={item.href} className="nav-link-active" style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 8, textDecoration: 'none', marginBottom: 4,
                  background: 'rgba(201,168,76,0.1)', border: `1px solid rgba(201,168,76,0.25)`,
                  color: GOLD, fontSize: 13, fontWeight: 500, transition: 'background 0.15s',
                }}>
                  <span style={{ fontSize: 17 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  <span style={{ fontSize: 10, color: GOLD, fontWeight: 700 }}>→</span>
                </Link>
              ) : (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 8, marginBottom: 4, opacity: 0.45,
                  color: MUTED, fontSize: 13, cursor: 'default',
                }}>
                  <span style={{ fontSize: 17 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  <span style={{ fontSize: 9, background: '#1E3251', color: MUTED, padding: '2px 6px', borderRadius: 10, letterSpacing: '0.05em' }}>Soon</span>
                </div>
              )
            ))}
          </nav>
          <div style={{ padding: '16px 20px', borderTop: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 11, color: MUTED }}>Globish International Co., Ltd.</div>
            <div style={{ fontSize: 10, color: '#3A5070', marginTop: 3 }}>坂田昌鴻 — CEO</div>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>

            {/* Title */}
            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: TEXT, marginBottom: 8 }}>
                Globish International — 社内管理ツール
              </h1>
              <p style={{ color: MUTED, fontSize: 14 }}>プロスペクト管理・営業支援ツール一覧</p>
            </div>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {PROSPECTS.map((item, i) => (
                <div key={i} className={item.active ? 'card-active' : ''} style={{
                  background: SURFACE,
                  border: `1px solid ${item.active ? `rgba(201,168,76,0.4)` : BORDER}`,
                  borderRadius: 14,
                  padding: '1.5rem',
                  opacity: item.active ? 1 : 0.5,
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  boxShadow: item.active ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 10,
                      background: item.active ? `rgba(201,168,76,0.15)` : '#1E3251',
                      border: `1px solid ${item.active ? `rgba(201,168,76,0.3)` : BORDER}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: item.active ? TEXT : MUTED }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: item.active ? GOLD : MUTED, marginTop: 2 }}>
                        {item.active ? 'プロスペクト管理' : 'Coming Soon'}
                      </div>
                    </div>
                  </div>

                  {item.active && item.href ? (
                    <Link href={item.href} className="open-btn" style={{
                      display: 'block', textAlign: 'center', padding: '9px',
                      background: GOLD, color: '#0A1628',
                      borderRadius: 8, fontSize: 13, fontWeight: 700,
                      textDecoration: 'none', transition: 'background 0.15s',
                      marginTop: 4,
                    }}>
                      開く →
                    </Link>
                  ) : (
                    <div style={{
                      textAlign: 'center', padding: '9px',
                      background: '#1E3251', color: MUTED,
                      borderRadius: 8, fontSize: 12, fontWeight: 500,
                    }}>
                      準備中
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '1.5rem', borderTop: `1px solid ${BORDER}`, textAlign: 'center', color: MUTED, fontSize: 11 }}>
              Globish International Co., Ltd. — Kuala Lumpur, Malaysia
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
