import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/features/ProjectCard';
import FilterBar from '../components/features/FilterBar';
import { Project } from '../types/project';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    academic: '',
  });

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allTypes = useMemo(() => {
    const types = new Set(projects.map((p) => p.type));
    return Array.from(types);
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filters.status && p.status !== filters.status) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.academic === 'academic' && !p.isAcademic) return false;
      if (filters.academic === 'professional' && p.isAcademic) return false;
      return true;
    });
  }, [projects, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div data-testid="projects-page" className="pt-24 md:pt-28">
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-600 mb-3">
              Portfolio
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4">
              Projets
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12">
              Decouvrez mes projets professionnels et academiques. Chaque projet
              represente un defi technique ou managerial unique.
            </p>
          </motion.div>

          <div className="mb-10">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              allTypes={allTypes}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-600 dark:border-t-zinc-400 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div
              data-testid="projects-empty"
              className="text-center py-20 text-zinc-400 dark:text-zinc-600"
            >
              <p className="font-mono text-sm">Aucun projet ne correspond aux filtres selectionnes.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
              {filtered.length} projet{filtered.length !== 1 ? 's' : ''} affiche{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
