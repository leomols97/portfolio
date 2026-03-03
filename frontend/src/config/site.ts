export const siteConfig = {
  name: 'Leopold Mols',
  initials: 'L.M',
  title: 'Project Manager | Technical Manager | CTO | Developer',
  description:
    'Je concois, developpe et dirige des projets techniques ambitieux. De l\'architecture au deploiement, du code au management.',
  email: 'contact@leopoldmols.com',
  location: 'Belgique',
  links: {
    github: 'https://github.com/leopoldmols',
    gitlab: 'https://gitlab.com/leopoldmols',
    linkedin: 'https://linkedin.com/in/leopoldmols',
  },
  highlights: [
    {
      icon: 'Layers',
      label: 'Architecture',
      description: 'Conception de systemes scalables et resilients',
    },
    {
      icon: 'GitBranch',
      label: 'CI/CD & DevOps',
      description: 'Automatisation, deploiement continu, monitoring',
    },
    {
      icon: 'Shield',
      label: 'Securite',
      description: 'Authentification, audit, bonnes pratiques',
    },
    {
      icon: 'Zap',
      label: 'Performance',
      description: 'Optimisation, caching, observabilite',
    },
    {
      icon: 'Users',
      label: 'Gestion de projet',
      description: 'Planification, priorisation, communication',
    },
    {
      icon: 'BookOpen',
      label: 'Mentoring',
      description: "Formation d'equipes, revue de code, documentation",
    },
  ],
  skills: {
    technical: [
      {
        category: 'Langages',
        items: ['Python', 'Go', 'TypeScript', 'JavaScript', 'C', 'SQL'],
      },
      {
        category: 'Backend',
        items: ['FastAPI', 'Express', 'Django', 'gRPC'],
      },
      {
        category: 'Frontend',
        items: ['React', 'Tailwind CSS', 'D3.js'],
      },
      {
        category: 'DevOps & Cloud',
        items: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'AWS', 'GCP', 'ArgoCD'],
      },
      {
        category: 'Bases de donnees',
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'InfluxDB', 'ClickHouse'],
      },
      {
        category: 'Outils',
        items: ['Git', 'GitLab CI/CD', 'GitHub Actions', 'Grafana', 'Prometheus'],
      },
    ],
    management: [
      'Planification et priorisation de roadmap',
      'Communication avec les stakeholders',
      'Mentoring et formation d\'equipes',
      'Revue de code et standards qualite',
      'Methodologies Agile (Scrum, Kanban)',
      'Gestion de backlog et sprint planning',
    ],
    process: [
      {
        step: '01',
        title: 'Discovery',
        description: 'Comprendre le besoin, les contraintes et le contexte metier',
      },
      {
        step: '02',
        title: 'Specification',
        description: 'Definir l\'architecture, les technologies et le plan de livraison',
      },
      {
        step: '03',
        title: 'Developpement',
        description: 'Implementer iterativement avec revues de code et CI/CD',
      },
      {
        step: '04',
        title: 'Tests & QA',
        description: 'Valider la qualite, la performance et la securite',
      },
      {
        step: '05',
        title: 'Deploiement',
        description: 'Livrer avec fiabilite, monitoring et documentation',
      },
    ],
  },
  about: {
    bio: "Ingenieur logiciel et chef de projet technique avec une experience solide en architecture de systemes distribues, en DevOps, et en gestion d'equipes de developpement. Je combine une expertise technique approfondie avec des competences en management pour mener des projets complexes de la conception au deploiement. Passionne par les systemes bien concus, l'automatisation, et la transmission de connaissances.",
  },
};
