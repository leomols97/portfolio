import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project, TYPE_LABELS } from '../../types/project';
import StatusBadge from '../ui/StatusBadge';
import Tag from '../ui/Tag';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const formattedDate = new Date(project.date + '-01').toLocaleDateString('fr-FR', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/projects/${project.id}`}
        data-testid={`project-card-${project.id}`}
        className="group block h-full"
      >
        <div className="h-full p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <StatusBadge status={project.status} isAcademic={project.isAcademic} />
            <ArrowUpRight
              size={18}
              className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors mt-0.5"
            />
          </div>

          <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-50 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 5).map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
            {project.stack.length > 5 && (
              <Tag label={`+${project.stack.length - 5}`} variant="outline" />
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
              {TYPE_LABELS[project.type] || project.type}
            </span>
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
              {formattedDate}
            </span>
          </div>

          {(project.links.github || project.links.demo) && (
            <div className="flex items-center gap-3 mt-3">
              {project.links.github && (
                <span className="text-zinc-400 dark:text-zinc-600">
                  <Github size={14} />
                </span>
              )}
              {project.links.demo && (
                <span className="text-zinc-400 dark:text-zinc-600">
                  <ExternalLink size={14} />
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
