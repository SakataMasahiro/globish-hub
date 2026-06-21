export type ProjectId = 'dental' | 'beauty' | 'touch' | 'manabi' | 'pet' | 'hoken';
export type FileTag = 'security' | 'marketing' | 'legal' | 'general';
export type FileType = 'DOCX' | 'PDF' | 'XLSX' | 'PNG' | 'OTHER';

export interface SubPortal {
  name: string;
  desc: string;
  url: string;
  icon: string;
}

export interface Project {
  id: ProjectId;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  done: boolean;
  status: string;
  description: string;
  portals: SubPortal[];
  driveUrl: string;
}

export interface PortalFile {
  id: number;
  name: string;
  project: ProjectId | null;
  tag: FileTag;
  date: string;
  type: FileType;
  size: string;
  objectUrl?: string;
  driveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'dental',
    name: 'Tascal Dental',
    nameEn: 'Dental',
    icon: '🦷',
    color: '#0891b2',
    done: true,
    status: '完成済',
    description: '歯科医院向けDXプラットフォーム',
    driveUrl: 'https://drive.google.com/drive/folders/1y6Z_tEKRB2MdAv_ysBswHuxCO5AuFxXv?usp=share_link',
    portals: [
      { name: '歯科医院 Portal', desc: '医院向けダッシュボード', url: 'https://tascal-dental.vercel.app', icon: '🏥' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://tascal-dental.vercel.app/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://tascal-dental.vercel.app/partner', icon: '🤝' },
    ],
  },
  {
    id: 'beauty',
    name: 'Love Beauty',
    nameEn: 'Beauty',
    icon: '💄',
    color: '#e91e8c',
    done: true,
    status: '完成済',
    description: '美容サロン向けDXプラットフォーム',
    driveUrl: 'https://drive.google.com/drive/folders/1LDtF2q9tZByp77GYUZ6WJiZBx5ptokB7?usp=share_link',
    portals: [
      { name: 'Beauty Portal', desc: 'サロン向けダッシュボード', url: 'https://lovebeauty.salon', icon: '✨' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://lovebeauty.salon/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://lovebeauty.salon/partner', icon: '🤝' },
    ],
  },
  {
    id: 'touch',
    name: 'Tascal Touch',
    nameEn: 'Touch',
    icon: '✋',
    color: '#7c3aed',
    done: true,
    status: '完成済',
    description: '整骨院・整体・鍼灸院向けLINE自動化プラットフォーム',
    driveUrl: 'https://drive.google.com/drive/folders/1FTSgneUTPadts1SQRKeCBrZxPHEtHrB9?usp=share_link',
    portals: [
      { name: 'Touch Portal', desc: '治療院向けダッシュボード', url: 'https://tascal-touch.vercel.app', icon: '✋' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://tascal-touch.vercel.app/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://tascal-touch.vercel.app/partner', icon: '🤝' },
    ],
  },
  {
    id: 'manabi',
    name: 'Tascal Manabi（学び）',
    nameEn: 'Manabi',
    icon: '📚',
    color: '#f59e0b',
    done: true,
    status: '完成済',
    description: '学習塾・習い事教室向けDXプラットフォーム — 成長の証人',
    driveUrl: '',
    portals: [
      { name: 'Manabi Portal', desc: '教室向けダッシュボード', url: 'https://www.tascal-manabi.com', icon: '📚' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://www.tascal-manabi.com/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://www.tascal-manabi.com/partner', icon: '🤝' },
      { name: '営業パンフレット', desc: 'Tascal Manabi 紹介資料', url: 'https://www.tascal-manabi.com/tascal_manabi_pamphlet.pdf', icon: '📄' },
      { name: 'ユーザーマニュアル', desc: '使用マニュアル', url: 'https://www.tascal-manabi.com/tascal_manabi_manual.pdf', icon: '📖' },
    ],
  },
  {
    id: 'hoken',
    name: 'Tascal Hoken',
    nameEn: 'Hoken',
    icon: '🛡️',
    color: '#dc2626',
    done: true,
    status: '完成済',
    description: '次世代生命保険営業支援プラットフォーム — AIの盾と剣',
    driveUrl: '',
    portals: [
      { name: 'Hoken Portal', desc: '生保営業向けダッシュボード', url: 'https://tascal-hoken.vercel.app', icon: '🛡️' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://tascal-hoken.vercel.app/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://tascal-hoken.vercel.app/partner', icon: '🤝' },
      { name: '使い方マニュアル', desc: '現場・ソナエルジュ向け操作ガイド', url: 'https://tascal-hoken.vercel.app/Tascal_Hoken_%E4%BD%BF%E3%81%84%E6%96%B9%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB.pdf', icon: '📖' },
      { name: '営業用パンフレット', desc: '経営層・参画企業向け紹介資料', url: 'https://tascal-hoken.vercel.app/Tascal_Hoken_%E5%96%B6%E6%A5%AD%E7%94%A8%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88.pdf', icon: '📄' },
    ],
  },
  {
    id: 'pet',
    name: 'Tascal Pet',
    nameEn: 'Pet',
    icon: '🐾',
    color: '#1D9E75',
    done: true,
    status: '完成済',
    description: '動物病院向けDXプラットフォーム — ペットは家族。その命に寄り添う。',
    driveUrl: '',
    portals: [
      { name: 'Pet Portal', desc: '動物病院向けダッシュボード', url: 'https://tascal-pet.vercel.app', icon: '🐾' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://tascal-pet.vercel.app/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://tascal-pet.vercel.app/partner', icon: '🤝' },
    ],
  },
];

export const TAG_LABELS: Record<FileTag, string> = {
  security: 'セキュリティ',
  marketing: 'マーケティング',
  legal: '法務・規約',
  general: '一般',
};

export const TAG_COLORS: Record<FileTag, { bg: string; text: string }> = {
  security: { bg: '#FEE2E2', text: '#991B1B' },
  marketing: { bg: '#E0F2FE', text: '#0C4A6E' },
  legal: { bg: '#FEF3C7', text: '#92400E' },
  general: { bg: '#F3F4F6', text: '#374151' },
};

export const TYPE_COLORS: Record<FileType, { bg: string; text: string }> = {
  DOCX: { bg: '#DBEAFE', text: '#1E40AF' },
  PDF: { bg: '#FEE2E2', text: '#991B1B' },
  XLSX: { bg: '#D1FAE5', text: '#065F46' },
  PNG: { bg: '#F3E8FF', text: '#6B21A8' },
  OTHER: { bg: '#F3F4F6', text: '#374151' },
};

export const INITIAL_FILES: PortalFile[] = [
  { id: 1, name: 'Tascal Dental ファイル一覧', project: 'dental', tag: 'general', date: '2026-05-18', type: 'OTHER', size: 'Google Drive', driveUrl: 'https://drive.google.com/drive/folders/1y6Z_tEKRB2MdAv_ysBswHuxCO5AuFxXv?usp=share_link' },
  { id: 2, name: 'Love Beauty ファイル一覧', project: 'beauty', tag: 'general', date: '2026-05-18', type: 'OTHER', size: 'Google Drive', driveUrl: 'https://drive.google.com/drive/folders/1LDtF2q9tZByp77GYUZ6WJiZBx5ptokB7?usp=share_link' },
  { id: 3, name: 'Tascal Touch ファイル一覧', project: 'touch', tag: 'general', date: '2026-05-18', type: 'OTHER', size: 'Google Drive', driveUrl: 'https://drive.google.com/drive/folders/1FTSgneUTPadts1SQRKeCBrZxPHEtHrB9?usp=share_link' },
  { id: 4, name: 'Tascal_Hoken_使い方マニュアル.pdf', project: 'hoken', tag: 'general', date: '2026-06-20', type: 'PDF', size: '395KB', driveUrl: 'https://tascal-hoken.vercel.app/Tascal_Hoken_%E4%BD%BF%E3%81%84%E6%96%B9%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB.pdf' },
  { id: 5, name: 'Tascal_Hoken_営業用パンフレット.pdf', project: 'hoken', tag: 'marketing', date: '2026-06-20', type: 'PDF', size: '430KB', driveUrl: 'https://tascal-hoken.vercel.app/Tascal_Hoken_%E5%96%B6%E6%A5%AD%E7%94%A8%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88.pdf' },
];