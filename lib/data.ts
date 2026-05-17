export type ProjectId = 'dental' | 'beauty' | 'touch' | 'wellness' | 'clinic';
export type FileTag = 'security' | 'marketing' | 'legal' | 'general';
export type FileType = 'DOCX' | 'PDF' | 'XLSX' | 'PNG' | 'OTHER';

export interface Project {
  id: ProjectId;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  bg: string;
  accent: string;
  status: '完成済' | '展開中';
  done: boolean;
  description: string;
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
  { id: 'dental', name: 'Tascal Dental', nameEn: 'Dental', icon: '🦷', color: '#0F6E56', bg: '#E1F5EE', accent: '#1D9E75', status: '完成済', done: true, description: '歯科予約・治療管理システム' },
  { id: 'beauty', name: 'Love Beauty', nameEn: 'Beauty', icon: '💄', color: '#993556', bg: '#FBEAF0', accent: '#D4537E', status: '完成済', done: true, description: '美容サービス予約・管理システム' },
  { id: 'touch', name: 'Tascal Touch', nameEn: 'Touch', icon: '✋', color: '#854F0B', bg: '#FAEEDA', accent: '#BA7517', status: '展開中', done: false, description: '整体・マッサージ予約システム' },
  { id: 'wellness', name: 'Tascal Wellness', nameEn: 'Wellness', icon: '🌿', color: '#3B6D11', bg: '#EAF3DE', accent: '#639922', status: '展開中', done: false, description: '健康管理・ウェルネスサービス' },
  { id: 'clinic', name: 'Tascal Clinic', nameEn: 'Clinic', icon: '🏥', color: '#185FA5', bg: '#E6F1FB', accent: '#378ADD', status: '展開中', done: false, description: '医療クリニック管理システム' },
];

export const INITIAL_FILES: PortalFile[] = [
  { id: 1, name: 'Tascal_Security_Guide.docx', project: 'dental', tag: 'security', date: '2026-05-17', type: 'DOCX', size: '245 KB' },
  { id: 2, name: 'Tascal_Security_Guide.docx', project: 'beauty', tag: 'security', date: '2026-05-17', type: 'DOCX', size: '245 KB' },
  { id: 3, name: 'セキュリティ設定ガイド（全5プロジェクト）.docx', project: null, tag: 'security', date: '2026-05-17', type: 'DOCX', size: '312 KB' },
  { id: 4, name: 'Tascal Dental マーケティング資料.pdf', project: 'dental', tag: 'marketing', date: '2026-05-10', type: 'PDF', size: '1.2 MB' },
  { id: 5, name: 'Love Beauty ブランドガイドライン.pdf', project: 'beauty', tag: 'marketing', date: '2026-05-12', type: 'PDF', size: '3.4 MB' },
  { id: 6, name: 'Anthropic記事（英語翻訳）.pdf', project: null, tag: 'general', date: '2026-05-17', type: 'PDF', size: '890 KB' },
  { id: 7, name: '利用規約テンプレート.docx', project: null, tag: 'legal', date: '2026-05-15', type: 'DOCX', size: '128 KB' },
  { id: 8, name: '個人情報保護方針.docx', project: null, tag: 'legal', date: '2026-05-15', type: 'DOCX', size: '156 KB' },
];

export const TAG_LABELS: Record<FileTag, string> = {
  security: 'セキュリティ',
  marketing: 'マーケティング',
  legal: '法務・規約',
  general: '一般',
};

export const TAG_COLORS: Record<FileTag, { bg: string; text: string }> = {
  security: { bg: '#EEEDFE', text: '#3C3489' },
  marketing: { bg: '#E1F5EE', text: '#085041' },
  legal: { bg: '#FAEEDA', text: '#633806' },
  general: { bg: '#F1EFE8', text: '#444441' },
};

export const TYPE_COLORS: Record<FileType, { bg: string; text: string }> = {
  DOCX: { bg: '#E6F1FB', text: '#185FA5' },
  PDF: { bg: '#FCEBEB', text: '#A32D2D' },
  XLSX: { bg: '#EAF3DE', text: '#3B6D11' },
  PNG: { bg: '#FBEAF0', text: '#993556' },
  OTHER: { bg: '#F1EFE8', text: '#5F5E5A' },
};
