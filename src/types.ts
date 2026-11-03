export type ViewMode = '3d' | 'traditional';
export type ThemeMode = 'dark' | 'light';

export type StructureId = 'about' | 'skills' | 'projects' | 'github' | 'contact';

export interface StructureMeta {
  id: StructureId;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  position3D: [number, number, number];
  color: string;
  accentColor: string;
  iconName: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
  note?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  badge: string;
  technologies: string[];
  isHighlight?: boolean;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  githubUrl: string;
  githubUsername: string;
}

export interface TerminalEntry {
  id: string;
  type: 'command' | 'output' | 'system' | 'error';
  content: string;
  timestamp?: string;
}

