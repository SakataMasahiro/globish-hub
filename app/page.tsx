'use client';

import { useState } from 'react';
import { PROJECTS } from '@/lib/data';

const C = {
  bg: '#0D1117',
  surface: '#161B22',
  border: '#30363D',
  text: '#F0F6FC',
  muted: '#8B949E',
};

export default function Home() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pwError, setPwError] = useState(false);

  const stats = {
    services: PROJECTS.length,
    active: PROJECTS.filter(p => p.done).length,
    portals: PROJECTS.reduce((n, p) => n + p.portals.length, 0),
  };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === 'Norikosan1947##') {
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  }

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Noto Sans JP', sans-serif" }}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '3rem', width: 380, boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌐</div>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Globish International</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Portal Hub</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>坂田さん専用</div>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="パスワードを入力"
            autoFocus
            style={{
              width: '100%', padding: '12px 16px', background: C.bg,
              border: `1px solid ${pwError ? '#ef4444' : C.border}`,
              borderRadius: 8, color: C.text, fontSize: 15, outline: 'none',
              marginBottom: '1rem', boxSizing: 'border-box', fontFamily: 'inherit',
            }}
          />
          {pwError && <p style={{ color: '#ef4444', fontSize: 12, marginBottom: '0.75rem' }}>パスワードが違います</p>}
          <button type="submit" style={{
            width: '100%', padding: '13px',
            background: 'linear-gradient(135deg, #0891b2, #0e7490)',
            border: 'none', borderRadius: 8, color: '#fff',
            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            ログイン →
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Noto Sans JP', sans-serif", color: C.text }}>

      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🌐</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Globish Portal Hub</div>
            <div style={{ fontSize: 10, color: '#0891b2', letterSpacing: '0.15em', textTransform: 'uppercase' }}>全サービス一元管理</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/portal" style={{ padding: '6px 14px', background: '#0891b215', border: '1px solid #0891b240', borderRadius: 8, color: '#0891b2', fontSize: 12, textDecoration: 'none', fontWeight: 700 }}>
            📂 書類ポータル
          </a>
          <div style={{ fontSize: 12, color: C.muted }}>坂田昌鴻</div>
          <button onClick={() => setAuthed(false)} style={{ padding: '6px 14px', background: '#ef444415', border: '1px solid #ef444430', borderRadius: 8, color: '#ef4444', fontSize: 12, cursor: 'pointer' }}>
            ログアウト
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 2rem' }}>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Portal 一覧</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>クリックするだけで各Portalに直接アクセスできます</p>
        </div>

        {/* Stats — lib/data.ts から自動計算 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '総サービス数', value: String(stats.services), color: '#0891b2' },
            { label: '稼働中', value: String(stats.active), color: '#10b981' },
            { label: '総Portal数', value: String(stats.portals), color: '#7c3aed' },
          ].map((s, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '1.25rem', borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Portal Cards — lib/data.ts から自動生成 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PROJECTS.map(service => (
            <div key={service.id} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 14, overflow: 'hidden',
              opacity: service.done ? 1 : 0.6,
            }}>
              {/* Service Header */}
              <div style={{
                padding: '14px 20px', borderBottom: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: 12,
                background: `${service.color}10`,
              }}>
                <span style={{ fontSize: 22 }}>{service.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{service.name}</div>
                  {service.description && <div style={{ fontSize: 11, color: C.muted }}>{service.description}</div>}
                </div>
                {service.driveUrl && (
                  <a href={service.driveUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontSize: 11, padding: '3px 10px', borderRadius: 12, fontWeight: 700, color: C.muted, border: `1px solid ${C.border}`, textDecoration: 'none' }}>
                    📂 書類
                  </a>
                )}
                <div style={{
                  marginLeft: service.driveUrl ? 0 : 'auto', fontSize: 11, padding: '3px 10px', borderRadius: 12, fontWeight: 700,
                  background: service.done ? '#10b98120' : '#8B949E20',
                  color: service.done ? '#10b981' : C.muted,
                  border: `1px solid ${service.done ? '#10b98140' : '#8B949E40'}`,
                }}>
                  {service.done ? `✅ ${service.status}` : `🔧 ${service.status}`}
                </div>
              </div>

              {/* Portal Links */}
              {service.portals.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(service.portals.length, 3)}, 1fr)` }}>
                  {service.portals.map((portal, i) => (
                    <div key={i} style={{ borderRight: i < service.portals.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      {service.done && portal.url ? (
                        <a href={portal.url} target="_blank" rel="noopener noreferrer" style={{
                          display: 'flex', flexDirection: 'column', gap: 6, padding: '18px 20px',
                          textDecoration: 'none', transition: 'background 0.15s',
                        }}
                          onMouseEnter={e => (e.currentTarget.style.background = `${service.color}15`)}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <span style={{ fontSize: 22 }}>{portal.icon}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{portal.name}</span>
                          <span style={{ fontSize: 11, color: C.muted }}>{portal.desc}</span>
                          <span style={{ fontSize: 10, color: service.color, marginTop: 4 }}>→ 開く</span>
                        </a>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '18px 20px' }}>
                          <span style={{ fontSize: 22 }}>{portal.icon}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.muted }}>{portal.name}</span>
                          <span style={{ fontSize: 11, color: C.muted }}>{portal.desc}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '18px 20px', fontSize: 12, color: C.muted }}>🔧 準備中 — 完成後、lib/data.ts に追加すると自動掲載されます</div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem 0', borderTop: `1px solid ${C.border}`, color: C.muted, fontSize: 12 }}>
          Globish International Co., Ltd. — CEO: Masahiro Sakata — Kuala Lumpur, Malaysia
        </div>
      </div>
    </div>
  );
}
