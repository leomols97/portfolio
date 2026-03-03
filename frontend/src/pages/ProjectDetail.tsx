import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Target,
  Box,
  Briefcase,
  Lightbulb,
  Github,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';
import Tag from '../components/ui/Tag';
import { Project, TYPE_LABELS } from '../types/project';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-600 dark:border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <p className="text-zinc-500 dark:text-zinc-400 mb-4">Projet introuvable.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour aux projets
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(project.date + '-01').toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  const Section: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    testId?: string;
  }> = ({ icon, title, children, testId }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      data-testid={testId}
      className="py-8 border-b border-zinc-100 dark:border-zinc-800/50 last:border-b-0"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-zinc-400 dark:text-zinc-600">{icon}</span>
        <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div data-testid="project-detail-page" className="pt-24 md:pt-28">
      <div className="section-container section-padding">
        <Link
          to="/projects"
          data-testid="back-to-projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Retour aux projets
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <StatusBadge status={project.status} isAcademic={project.isAcademic} />
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
              {TYPE_LABELS[project.type] || project.type}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-zinc-500 dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
            {project.management && (
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                Equipe de {project.management.teamSize}
              </span>
            )}
          </div>

          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl mb-6">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>

          {(project.links.github || project.links.demo) && (
            <div className="flex items-center gap-3 mb-8">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="project-github-link"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <Github size={16} />
                  Code source
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="project-demo-link"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              )}
            </div>
          )}
        </motion.div>

        <div className="max-w-3xl">
          {project.context && (
            <Section icon={<Briefcase size={18} />} title="Contexte" testId="section-context">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.context}
              </p>
            </Section>
          )}

          {project.objectives && project.objectives.length > 0 && (
            <Section icon={<Target size={18} />} title="Objectifs" testId="section-objectives">
              <ul className="space-y-2">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {project.architecture && (
            <Section icon={<Box size={18} />} title="Architecture" testId="section-architecture">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
                {project.architecture}
              </p>
            </Section>
          )}

          {project.responsibilities && project.responsibilities.length > 0 && (
            <Section icon={<Briefcase size={18} />} title="Responsabilites" testId="section-responsibilities">
              <ul className="space-y-2">
                {project.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 mt-1.5 flex-shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {project.learnings && (
            <Section icon={<Lightbulb size={18} />} title="Ce que j'ai appris" testId="section-learnings">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.learnings}
              </p>
            </Section>
          )}

          {project.management && (
            <Section icon={<Users size={18} />} title="Management" testId="section-management">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50">
                  <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1">
                    Equipe
                  </p>
                  <p className="text-lg font-heading font-semibold text-zinc-900 dark:text-zinc-100">
                    {project.management.teamSize} pers.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50">
                  <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1">
                    Methodo
                  </p>
                  <p className="text-lg font-heading font-semibold text-zinc-900 dark:text-zinc-100">
                    {project.management.methodology}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50">
                  <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1">
                    Duree
                  </p>
                  <p className="text-lg font-heading font-semibold text-zinc-900 dark:text-zinc-100">
                    {project.management.duration}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {project.management.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {project.isAcademic && (
            <div
              data-testid="academic-notice"
              className="mt-8 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 flex items-start gap-3"
            >
              <GraduationCap size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Projet academique
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  Ce projet a ete realise dans un cadre universitaire.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
