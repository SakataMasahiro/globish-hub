'use client';

import { useState } from 'react';

const portals = [
  {
    id: 'dental',
    name: 'Tascal Dental',
    icon: '🦷',
    status: 'active',
    color: '#0891b2',
    portals: [
      { name: '歯科医院 Portal', desc: '医院向けダッシュボード', url: 'https://tascal-dental.vercel.app', icon: '🏥' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://tascal-dental.vercel.app/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://tascal-dental.vercel.app/partner', icon: '🤝' },
    ],
    docs: [
      { name: '設計書・ブランド資料', url: 'https://drive.google.com/drive/folders/1y6Z_tEKRB2MdAv_ysBswHuxCO5AuFxXv', icon: '📁' },
    ],
  },
  {
    id: 'beauty',
    name: 'Love Beauty',
    icon: '💄',
    status: 'active',
    color: '#e91e8c',
    portals: [
      { name: 'Beauty Portal', desc: 'サロン向けダッシュボード', url: 'https://lovebeauty.salon', icon: '✨' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://lovebeauty.salon/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://lovebeauty.salon/partner', icon: '🤝' },
    ],
    docs: [
      { name: '設計書・ブランド資料', url: 'https://drive.google.com/drive/folders/1LDtF2q9tZByp77GYUZ6WJiZBx5ptokB7', icon: '📁' },
    ],
  },
  {
    id: 'touch',
    name: 'Tascal Touch',
    icon: '👆',
    status: 'coming',
    color: '#7c3aed',
    portals: [
      { name: 'Touch Portal', desc: '準備中', url: '', icon: '🏢' },
      { name: 'Super Admin', desc: '準備中', url: '', icon: '🔐' },
      { name: 'Partner Portal', desc: '準備中', url: '', icon: '🤝' },
    ],
    docs: [
      { name: '設計書・資料', url: 'https://drive.google.com/drive/folders/1FTSgneUTPadts1SQRKeCBrZxPHEtHrB9', icon: '📁' },
    ],
  },
  {
    id: 'wellness',
    name: 'Tascal Wellness',
    icon: '🌿',
    status: 'coming',
    color: '#10b981',
    portals: [
      { name: 'Wellness Portal', desc: '準備中', url: '', icon: '🏢' },
      { name: 'Super Admin', desc: '準備中', url: '', icon: '🔐' },
      { name: 'Partner Portal', desc: '準備中', url: '', icon: '🤝' },
    ],
    docs: [],
  },
  {
    id: 'clinic',
    name: 'Tascal Clinic',
    icon: '🏥',
    status: 'coming',
    color: '#f59e0b',
    portals: [
      { name: 'Clinic Portal', desc: '準備中', url: '', icon: '🏢' },
      { name: 'Super Admin', desc: '準備中', url: '', icon: '🔐' },
      { name: 'Partner Portal', desc: '準備中', url: '', icon: '🤝' },
    ],
    docs: [],
  },
  {
    id: 'life',
    name: 'ライフ・ポータル',
    icon: '💼',
    status: 'active',
    color: '#185FA5',
    portals: [
      { name: 'ライフ・ポータル', desc: '生保くん — 生命保険営業向け', url: 'https://tascal-life-portal.vercel.app', icon: '💼' },
    ],
    docs: [
      { name: '設計書・ブランド資料', url: '', icon: '📁' },
    ],
  },
  {
    id: 'care',
    name: 'ケア・ポータル',
    icon: '❤️',
    status: 'coming',
    color: '#0F6E56',
    portals: [
      { name: 'ケア・ポータル', desc: 'ケア愛ちゃん — 介護向け', url: 'https://careflow-ai-chan.vercel.app', icon: '❤️' },
    ],
    docs: [],
  },
];

const C = {
  bg: '#F8F7F4',
  surface: '#FFFFFF',
  border: '#E8E6E0',
  text: '#1A1A18',
  muted: '#6B6A64',
  header: '#FFFFFF',
};

export default function Home() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pwError, setPwError] = useState(false);

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #E6F1FB, #F8F7F4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Noto Sans JP', sans-serif" }}>
      <div style={{ background: '#FFFFFF', border: '1px solid #E8E6E0', borderRadius: 20, padding: '3rem', width: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🌐</div>
          <div style={{ fontSize: 11, color: '#6B6A64', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Globish International</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1A1A18' }}>Portal Hub</div>
          <div style={{ fontSize: 12, color: '#6B6A64', marginTop: 4 }}>坂田さん専用</div>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="パスワードを入力"
            autoFocus
            style={{ width: '100%', padding: '13px 16px', background: '#F8F7F4', border: `1.5px solid ${pwError ? '#ef4444' : '#E8E6E0'}`, borderRadius: 10, color: '#1A1A18', fontSize: 15, outline: 'none', marginBottom: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
          {pwError && <p style={{ color: '#ef4444', fontSize: 12, marginBottom: '0.75rem' }}>パスワードが違います</p>}
          <button type="submit" style={{ width: '100%', padding: '13px', background: '#185FA5', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            ログイン →
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: 11, color: '#B4B2A9' }}>
          Tascalでたすかる — Powered by Globish International
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Noto Sans JP', sans-serif", color: C.text }}>

      <div style={{ background: C.header, borderBottom: `1px solid ${C.border}`, padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 26 }}>🌐</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A18' }}>Globish Portal Hub</div>
            <div style={{ fontSize: 10, color: '#185FA5', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Tascalでたすかる</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 12, color: C.muted }}>坂田昌鴻</div>
          <button onClick={() => setAuthed(false)} style={{ padding: '6px 14px', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 8, color: '#DC2626', fontSize: 12, cursor: 'pointer' }}>
            ログアウト
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2.5rem 2rem' }}>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem', color: '#1A1A18' }}>Portal 一覧</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>クリックするだけで各Portalに直接アクセスできます</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '総サービス数', value: '7', color: '#185FA5', bg: '#E6F1FB' },
            { label: '稼働中', value: '2', color: '#0F6E56', bg: '#EAF3DE' },
            { label: '開発中', value: '5', color: '#854F0B', bg: '#FAEEDA' },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: '1.25rem 1.5rem' }}>
              <div style={{ fontSize: 11, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 34, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {portals.map(service => (
            <div key={service.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>

              {/* ヘッダー */}
              <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12, background: `${service.color}10` }}>
                <span style={{ fontSize: 24 }}>{service.icon}</span>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A18' }}>{service.name}</div>
                <div style={{ marginLeft: 'auto', fontSize: 11, padding: '4px 12px', borderRadius: 99, fontWeight: 600, background: service.status === 'active' ? '#EAF3DE' : '#F8F7F4', color: service.status === 'active' ? '#0F6E56' : '#6B6A64', border: `1px solid ${service.status === 'active' ? '#C0DD97' : '#E8E6E0'}` }}>
                  {service.status === 'active' ? '✅ 稼働中' : '🔧 開発中'}
                </div>
              </div>

              {/* ポータルリンク */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${service.portals.length}, 1fr)` }}>
                {service.portals.map((portal, i) => (
                  <div key={i} style={{ borderRight: i < service.portals.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    {service.status === 'active' && portal.url ? (
                      <a href={portal.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '16px 20px', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${service.color}10`)}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ fontSize: 22 }}>{portal.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A18' }}>{portal.name}</span>
                        <span style={{ fontSize: 11, color: '#6B6A64' }}>{portal.desc}</span>
                        <span style={{ fontSize: 11, color: service.color, marginTop: 4, fontWeight: 600 }}>→ 開く</span>
                      </a>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '16px 20px', opacity: 0.5 }}>
                        <span style={{ fontSize: 22 }}>{portal.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A18' }}>{portal.name}</span>
                        <span style={{ fontSize: 11, color: '#6B6A64' }}>{portal.desc}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ドキュメントセクション */}
              {service.docs && service.docs.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}`, padding: '10px 20px', background: '#FAFAF8', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: '#6B6A64', fontWeight: 600, letterSpacing: '0.05em', marginRight: 4 }}>📄 ドキュメント</span>
                  {service.docs.map((doc, i) => (
                    doc.url ? (
                      <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 12px', background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 99, fontSize: 12, color: service.color, textDecoration: 'none', fontWeight: 500, transition: 'border-color 0.12s' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = service.color)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
                      >
                        <span>{doc.icon}</span>{doc.name}
                      </a>
                    ) : (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 12px', background: '#F1EFE8', border: `1px solid ${C.border}`, borderRadius: 99, fontSize: 12, color: '#B4B2A9', fontWeight: 500 }}>
                        <span>{doc.icon}</span>{doc.name}（準備中）
                      </span>
                    )
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem 0', borderTop: `1px solid ${C.border}`, color: C.muted, fontSize: 12 }}>
          © 2026 Globish International Co., Ltd. Malaysia — CEO: Masahiro Sakata — Kuala Lumpur, Malaysia<br />
          <a href="https://globish-international.vercel.app" style={{ color: '#185FA5', textDecoration: 'none', marginTop: 4, display: 'inline-block' }}>globish-international.vercel.app</a>
        </div>
      </div>
    </div>
  );
}