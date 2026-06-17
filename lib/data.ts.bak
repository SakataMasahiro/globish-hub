export type ProjectId = 'dental' | 'beauty' | 'touch' | 'manabi' | 'pet';
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
    done: false,
    status: '開発中',
    description: '学習塾・習い事教室向けDXプラットフォーム — 成長の証人',
    driveUrl: '',
    portals: [],
  },
  {
    id: 'pet',
    name: 'Tascal Pet',
    nameEn: 'Pet',
    icon: '🐾',
    color: '#10b981',
    done: false,
    status: '構築準備中',
    description: 'ペット関連サービス向けDXプラットフォーム',
    driveUrl: '',
    portals: [],
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
];
