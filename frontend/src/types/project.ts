export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  context?: string;
  objectives?: string[];
  architecture?: string;
  responsibilities?: string[];
  stack: string[];
  status: 'completed' | 'in_progress';
  type: string;
  isAcademic: boolean;
  date: string;
  learnings?: string;
  management?: {
    teamSize: number;
    methodology: string;
    duration: string;
    highlights: string[];
  };
  links: {
    github?: string;
    demo?: string;
  };
  image?: string;
}

export const STATUS_LABELS: Record<string, string> = {
  completed: 'Termine',
  in_progress: 'En cours',
};

export const TYPE_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
  devops: 'DevOps',
  infra: 'Infrastructure',
};
