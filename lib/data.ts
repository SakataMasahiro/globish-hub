export type ProjectId = 'dental' | 'beauty' | 'touch' | 'wellness' | 'clinic';
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
}

export interface PortalFile {
  id: number;
  name: string;
  project: ProjectId | null;
  tag: FileTag;
  date: string;
  type: FileType;
  size: string;
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
    portals: [
      { name: 'Beauty Portal', desc: 'サロン向けダッシュボード', url: 'https://lovebeauty-salon.vercel.app', icon: '✨' },
      { name: 'Super Admin', desc: '管理者専用画面', url: 'https://lovebeauty-salon.vercel.app/super-admin', icon: '🔐' },
      { name: 'Partner Portal', desc: 'パートナー向け', url: 'https://lovebeauty-salon.vercel.app/partner', icon: '🤝' },
    ],
  },
  {
    id: 'touch',
    name: 'Tascal Touch',
    nameEn: 'Touch',
    icon: '✋',
    color: '#7c3aed',
    done: false,
    status: '展開中',
    description: '準備中',
    portals: [],
  },
  {
    id: 'wellness',
    name: 'Tascal Wellness',
    nameEn: 'Wellness',
    icon: '🌿',
    color: '#059669',
    done: false,
    status: '展開中',
    description: '準備中',
    portals: [],
  },
  {
    id: 'clinic',
    name: 'Tascal Clinic',
    nameEn: 'Clinic',
    icon: '🏥',
    color: '#dc2626',
    done: false,
    status: '展開中',
    description: '準備中',
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
  { id: 1, name: 'Tascal_Security_Guide.docx', project: 'dental', tag: 'security', date: '2026-05-17', type: 'DOCX', size: '245 KB' },
  { id: 2, name: 'Tascal_Security_Guide.docx', project: 'beauty', tag: 'security', date: '2026-05-17', type: 'DOCX', size: '245 KB' },
  { id: 3, name: 'セキュリティ設定ガイド（全5プロジェクト）.docx', project: null, tag: 'security', date: '2026-05-17', type: 'DOCX', size: '312 KB' },
  { id: 4, name: 'Anthropic記事（英語翻訳）.pdf', project: null, tag: 'general', date: '2026-05-17', type: 'PDF', size: '890 KB' },
  { id: 5, name: '利用規約テンプレート.docx', project: null, tag: 'legal', date: '2026-05-15', type: 'DOCX', size: '128 KB' },
  { id: 6, name: '個人情報保護方針.docx', project: null, tag: 'legal', date: '2026-05-15', type: 'DOCX', size: '156 KB' },
  { id: 7, name: 'Love Beauty ブランドガイドライン.pdf', project: 'beauty', tag: 'marketing', date: '2026-05-12', type: 'PDF', size: '3.4 MB' },
  { id: 8, name: 'Tascal Dental マーケティング資料.pdf', project: 'dental', tag: 'marketing', date: '2026-05-10', type: 'PDF', size: '1.2 MB' },
];
