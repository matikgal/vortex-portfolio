export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum CursorType {
  DEFAULT = 'default',
  HOVER = 'hover',
  TEXT = 'text'
}