'use client';

import { useState, useMemo, useRef } from 'react';
import { PROJECTS, INITIAL_FILES, TAG_LABELS, TAG_COLORS, TYPE_COLORS, type ProjectId, type FileTag, type FileType, type PortalFile } from '@/lib/data';

export default function PortalPage() {
  const [files, setFiles] = useState<PortalFile[]>(INITIAL_FILES);
  const [selectedProject, setSelectedProject] = useState<ProjectId | null>(null);
  const [portalModal, setPortalModal] = useState<ProjectId | null>(null);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<FileTag | ''>('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

  const filteredFiles = useMemo(() => {
    return files.filter((f) => {
      const matchProject = !selectedProject || f.project === selectedProject;
      const matchTag = !tagFilter || f.tag === tagFilter;
      const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase());
      return matchProject && matchTag && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'date') return b.date.localeCompare(a.date);
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'ja');
      return a.type.localeCompare(b.type);
    });
  }, [files, selectedProject, tagFilter, search, sortBy]);

  const projectFileCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    files.forEach((f) => { if (f.project) counts[f.project] = (counts[f.project] || 0) + 1; });
    return counts;
  }, [files]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded) return;
    const newFiles: PortalFile[] = Array.from(uploaded).map((file, i) => {
      const ext = file.name.split('.').pop()?.toUpperCase() as FileType || 'OTHER';
      const validTypes: FileType[] = ['DOCX', 'PDF', 'XLSX', 'PNG'];
      const objectUrl = URL.createObjectURL(file);
      return {
        id: Date.now() + i,
        name: file.name,
        project: selectedProject,
        tag: 'general',
        date: new Date().toISOString().slice(0, 10),
        type: validTypes.includes(ext) ? ext : 'OTHER',
        size: file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`,
        objectUrl,
      };
    });
    setFiles((prev) => [...newFiles, ...prev]);
    e.target.value = '';
  };

  const deleteFile = (id: number) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const selectedProj = PROJECTS.find((p) => p.id === selectedProject);
  const modalProj = PROJECTS.find((p) => p.id === portalModal);

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F2', fontFamily: "'DM Sans','Noto Sans JP',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&family=Noto+Sans+JP:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#F7F6F2}.file-row{transition:background 0.12s;cursor:pointer}.file-row:hover{background:#F0EEF8}.file-row:hover .file-actions{opacity:1!important}.proj-card{transition:all 0.15s}.proj-card:hover{transform:translateY(-2px);box-shadow:0 4px 20px rgba(0,0,0,0.07)}.portal-link{transition:background 0.12s;text-decoration:none;display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:10px;border:1px solid #E8E6E0}.portal-link:hover{background:#F7F6F2}input:focus,select:focus,button:focus{outline:none}`}</style>

      {/* Portal Modal */}
      {portalModal && modalProj && (
        <div onClick={() => setPortalModal(null)} style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background:'#fff',borderRadius:18,padding:'28px',width:460,boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20,paddingBottom:16,borderBottom:'1px solid #E8E6E0' }}>
              <span style={{ fontSize:32 }}>{modalProj.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:18,fontWeight:600,color:'#1B1B18' }}>{modalProj.name}</div>
                <div style={{ fontSize:12,color:'#888780',marginTop:2 }}>{modalProj.description}</div>
              </div>
              <button onClick={() => setPortalModal(null)} style={{ background:'none',border:'none',cursor:'pointer',fontSize:24,color:'#888780',lineHeight:1,padding:'4px' }}>×</button>
            </div>
            <div style={{ fontSize:11,letterSpacing:2,color:'#888780',textTransform:'uppercase',marginBottom:12 }}>Portal を選択</div>
            <div style={{ display:'flex',flexDirection:'column',gap:8,marginBottom:16 }}>
              {modalProj.portals.map((portal, i) => (
                <a key={i} href={portal.url} target="_blank" rel="noopener noreferrer" className="portal-link">
                  <span style={{ fontSize:26,minWidth:38,textAlign:'center' }}>{portal.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14,fontWeight:600,color:'#1B1B18' }}>{portal.name}</div>
                    <div style={{ fontSize:11,color:'#888780',marginTop:2 }}>{portal.desc}</div>
                    <div style={{ fontSize:10,color:modalProj.color,marginTop:3,fontFamily:'monospace' }}>{portal.url}</div>
                  </div>
                  <span style={{ fontSize:16,color:modalProj.color,fontWeight:700,flexShrink:0 }}>→</span>
                </a>
              ))}
            </div>
            <button onClick={() => { setSelectedProject(modalProj.id); setPortalModal(null); }} style={{ width:'100%',padding:'11px',background:'#1B1B18',border:'none',borderRadius:10,cursor:'pointer',fontSize:13,color:'#F7F6F2',fontFamily:'inherit',fontWeight:500 }}>
              📁 {modalProj.name} のファイルを見る
            </button>
          </div>
        </div>
      )}

      <aside style={{ position:'fixed',left:0,top:0,bottom:0,width:220,background:'#1B1B18',padding:'28px 0',display:'flex',flexDirection:'column',zIndex:100 }}>
        <div style={{ padding:'0 24px 28px',borderBottom:'0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize:11,letterSpacing:3,color:'#888780',marginBottom:6,textTransform:'uppercase' }}>Tascal Nippon</div>
          <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:20,color:'#F7F6F2',lineHeight:1.2 }}>Project<br/>Portal</div>
        </div>
        <nav style={{ padding:'20px 12px',flex:1,overflowY:'auto' }}>
          <div style={{ fontSize:10,letterSpacing:2,color:'#5F5E5A',padding:'0 12px',marginBottom:10,textTransform:'uppercase' }}>Projects</div>
          <button onClick={() => setSelectedProject(null)} style={{ width:'100%',display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:8,border:'none',cursor:'pointer',background:!selectedProject?'rgba(255,255,255,0.08)':'transparent',color:!selectedProject?'#F7F6F2':'#888780',fontSize:13,fontFamily:'inherit',marginBottom:2,textAlign:'left' }}>
            <span style={{ fontSize:16 }}>🗂️</span><span style={{ flex:1 }}>全プロジェクト</span>
            <span style={{ fontSize:11,background:'rgba(255,255,255,0.1)',borderRadius:4,padding:'1px 6px' }}>{files.length}</span>
          </button>
          {PROJECTS.map((p) => (
            <button key={p.id} onClick={() => setSelectedProject(selectedProject===p.id?null:p.id)} style={{ width:'100%',display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:8,border:'none',cursor:'pointer',background:selectedProject===p.id?'rgba(255,255,255,0.08)':'transparent',color:selectedProject===p.id?'#F7F6F2':'#888780',fontSize:13,fontFamily:'inherit',marginBottom:2,textAlign:'left' }}>
              <span style={{ fontSize:16 }}>{p.icon}</span><span style={{ flex:1 }}>{p.nameEn}</span>
              <span style={{ fontSize:10,borderRadius:10,padding:'1px 6px',background:p.done?'#0F6E5620':'#BA751720',color:p.done?'#1D9E75':'#BA7517' }}>{p.status}</span>
            </button>
          ))}
          <div style={{ fontSize:10,letterSpacing:2,color:'#5F5E5A',padding:'16px 12px 10px',textTransform:'uppercase' }}>Filter</div>
          {(['','security','marketing','legal','general'] as const).map((tag) => (
            <button key={tag} onClick={() => setTagFilter(tag as FileTag|'')} style={{ width:'100%',display:'flex',alignItems:'center',gap:10,padding:'8px 12px',borderRadius:8,border:'none',cursor:'pointer',background:tagFilter===tag?'rgba(255,255,255,0.08)':'transparent',color:tagFilter===tag?'#F7F6F2':'#888780',fontSize:12,fontFamily:'inherit',marginBottom:2,textAlign:'left' }}>
              <span style={{ fontSize:14 }}>{tag===''?'📋':tag==='security'?'🔒':tag==='marketing'?'📢':tag==='legal'?'⚖️':'📁'}</span>
              {tag===''?'全カテゴリ':TAG_LABELS[tag as FileTag]}
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px 24px',borderTop:'0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize:11,color:'#5F5E5A' }}>{today}</div>
          <div style={{ fontSize:10,color:'#444441',marginTop:4 }}>坂田さん専用ポータル</div>
        </div>
      </aside>

      <main style={{ marginLeft:220,padding:'36px 40px',minHeight:'100vh' }}>
        <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:32 }}>
          <div>
            <h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:32,color:'#1B1B18',fontWeight:400,lineHeight:1.2 }}>{selectedProj?selectedProj.name:'Tascal Nippon'}</h1>
            <p style={{ fontSize:14,color:'#888780',marginTop:4 }}>{selectedProj?selectedProj.description:'5プロジェクト一元管理ポータル'}</p>
          </div>
          <div style={{ display:'flex',gap:10,alignItems:'center' }}>
            {selectedProject && (
              <button onClick={() => setPortalModal(selectedProject)} style={{ display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:selectedProj?.color||'#1B1B18',color:'#fff',border:'none',borderRadius:10,cursor:'pointer',fontSize:13,fontFamily:'inherit',fontWeight:500 }}>
                🔗 Portal を開く
              </button>
            )}
            <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg" onChange={handleUpload} style={{ display:'none' }}/>
            <button onClick={() => fileInputRef.current?.click()} style={{ display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:'#1B1B18',color:'#F7F6F2',border:'none',borderRadius:10,cursor:'pointer',fontSize:13,fontFamily:'inherit',fontWeight:500 }}>↑ アップロード</button>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:32 }}>
          {[{label:'プロジェクト',value:5,sub:'総数'},{label:'ファイル',value:files.length,sub:'全件'},{label:'完成済み',value:2,sub:'Dental & Beauty',color:'#0F6E56'},{label:'展開中',value:3,sub:'Touch / Wellness / Clinic',color:'#BA7517'}].map((s) => (
            <div key={s.label} style={{ background:'#fff',borderRadius:12,padding:'16px 20px',border:'0.5px solid #E8E6E0' }}>
              <div style={{ fontSize:28,fontWeight:600,color:s.color||'#1B1B18',fontFamily:"'DM Serif Display',serif" }}>{s.value}</div>
              <div style={{ fontSize:13,color:'#1B1B18',fontWeight:500,marginTop:2 }}>{s.label}</div>
              <div style={{ fontSize:11,color:'#888780',marginTop:2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {!selectedProject && (
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:12,letterSpacing:2,color:'#888780',textTransform:'uppercase',marginBottom:14 }}>Projects — クリックでPortalへ</div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10 }}>
              {PROJECTS.map((p) => (
                <div key={p.id} className="proj-card" onClick={() => p.done ? setPortalModal(p.id) : setSelectedProject(p.id)} style={{ background:'#fff',borderRadius:12,padding:'16px',border:`0.5px solid ${p.done?p.color+'50':'#E8E6E0'}`,cursor:'pointer' }}>
                  <div style={{ fontSize:28,marginBottom:10 }}>{p.icon}</div>
                  <div style={{ fontSize:13,fontWeight:500,color:'#1B1B18',marginBottom:4 }}>{p.name}</div>
                  <div style={{ display:'inline-block',fontSize:10,padding:'2px 8px',borderRadius:20,background:p.done?'#E1F5EE':'#FAEEDA',color:p.done?'#0F6E56':'#854F0B',marginBottom:10 }}>{p.status}</div>
                  <div style={{ fontSize:12,color:'#888780',marginBottom:p.done?8:0 }}>{projectFileCounts[p.id]||0} ファイル</div>
                  {p.done && <div style={{ fontSize:11,color:p.color,fontWeight:600 }}>🔗 Portal を開く →</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display:'flex',gap:10,marginBottom:16,alignItems:'center' }}>
          <div style={{ flex:1,display:'flex',alignItems:'center',gap:10,background:'#fff',border:'0.5px solid #E8E6E0',borderRadius:10,padding:'10px 16px' }}>
            <span style={{ fontSize:16,color:'#888780' }}>🔍</span>
            <input type="text" placeholder="ファイルを検索..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ border:'none',background:'transparent',fontSize:14,color:'#1B1B18',width:'100%',fontFamily:'inherit' }}/>
            {search && <button onClick={() => setSearch('')} style={{ border:'none',background:'none',cursor:'pointer',color:'#888780',fontSize:18 }}>×</button>}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} style={{ padding:'10px 14px',borderRadius:10,border:'0.5px solid #E8E6E0',background:'#fff',fontSize:13,color:'#1B1B18',fontFamily:'inherit',cursor:'pointer' }}>
            <option value="date">日付順</option><option value="name">名前順</option><option value="type">種類順</option>
          </select>
        </div>

        <div style={{ background:'#fff',borderRadius:14,border:'0.5px solid #E8E6E0',overflow:'hidden' }}>
          <div style={{ display:'grid',gridTemplateColumns:'40px 1fr 120px 90px 80px 110px',padding:'10px 20px',borderBottom:'0.5px solid #E8E6E0',background:'#F7F6F2' }}>
            {['','ファイル名','プロジェクト','カテゴリ','形式','日付'].map((h) => (
              <div key={h} style={{ fontSize:11,color:'#888780',letterSpacing:1,textTransform:'uppercase',fontWeight:500 }}>{h}</div>
            ))}
          </div>
          {filteredFiles.length===0 ? (
            <div style={{ textAlign:'center',padding:'3rem',color:'#888780' }}><div style={{ fontSize:40,marginBottom:12 }}>📭</div><div style={{ fontSize:14 }}>ファイルが見つかりません</div></div>
          ) : filteredFiles.map((file,i) => {
            const proj = PROJECTS.find((p) => p.id===file.project);
            const tagStyle = TAG_COLORS[file.tag];
            const typeStyle = TYPE_COLORS[file.type];
            return (
              <div key={file.id} className="file-row" onClick={() => file.objectUrl && window.open(file.objectUrl,'_blank')} style={{ display:'grid',gridTemplateColumns:'40px 1fr 120px 90px 80px 110px',padding:'11px 20px',borderBottom:i<filteredFiles.length-1?'0.5px solid #E8E6E0':'none',alignItems:'center' }}>
                <div style={{ width:28,height:28,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,background:typeStyle.bg }}>{file.type==='DOCX'?'📄':file.type==='PDF'?'📕':file.type==='XLSX'?'📊':file.type==='PNG'?'🖼️':'📎'}</div>
                <div style={{ paddingRight:12,minWidth:0 }}>
                  <div style={{ fontSize:13,color:'#1B1B18',fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{file.name}</div>
                  <div style={{ fontSize:11,color:file.objectUrl?'#0891b2':'#888780',marginTop:1 }}>{file.objectUrl?'クリックして開く':file.size}</div>
                </div>
                <div>{proj?<span style={{ fontSize:12,display:'flex',alignItems:'center',gap:4 }}><span>{proj.icon}</span><span style={{ color:proj.color,fontWeight:500 }}>{proj.nameEn}</span></span>:<span style={{ fontSize:11,color:'#B4B2A9' }}>共通</span>}</div>
                <div><span style={{ fontSize:11,padding:'3px 8px',borderRadius:20,background:tagStyle.bg,color:tagStyle.text,fontWeight:500 }}>{TAG_LABELS[file.tag]}</span></div>
                <div><span style={{ fontSize:11,padding:'3px 8px',borderRadius:6,background:typeStyle.bg,color:typeStyle.text,fontWeight:600 }}>{file.type}</span></div>
                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                  <span style={{ fontSize:11,color:'#888780' }}>{file.date.slice(5).replace('-','/')}</span>
                  <div className="file-actions" style={{ display:'flex',gap:4,opacity:0,transition:'opacity 0.12s' }}>
                    <button onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }} style={{ background:'none',border:'0.5px solid #E8E6E0',borderRadius:5,padding:'3px 7px',cursor:'pointer',fontSize:12,color:'#A32D2D' }}>🗑</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div onClick={() => fileInputRef.current?.click()} style={{ marginTop:16,border:'1.5px dashed #D3D1C7',borderRadius:12,padding:'20px',textAlign:'center',cursor:'pointer',color:'#888780' }} onMouseEnter={(e) => (e.currentTarget.style.background='#F1EFE8')} onMouseLeave={(e) => (e.currentTarget.style.background='transparent')}>
          <div style={{ fontSize:24,marginBottom:6 }}>☁️</div>
          <div style={{ fontSize:13 }}>ファイルをドラッグ＆ドロップ、またはクリックして選択</div>
          <div style={{ fontSize:11,marginTop:4,color:'#B4B2A9' }}>PDF, DOCX, XLSX, PNG 対応</div>
        </div>

        <div style={{ marginTop:32,paddingTop:16,borderTop:'0.5px solid #E8E6E0',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <div style={{ fontSize:11,color:'#B4B2A9' }}>Tascal Nippon Portal — 坂田さん専用</div>
          <div style={{ fontSize:11,color:'#B4B2A9' }}>{filteredFiles.length} / {files.length} ファイル表示中</div>
        </div>
      </main>
    </div>
  );
}
