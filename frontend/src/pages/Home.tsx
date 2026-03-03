import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  GitBranch,
  Shield,
  Zap,
  Users,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import Hero from '../components/features/Hero';
import ProjectCard from '../components/features/ProjectCard';
import { siteConfig } from '../config/site';
import { Project } from '../types/project';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={22} />,
  GitBranch: <GitBranch size={22} />,
  Shield: <Shield size={22} />,
  Zap: <Zap size={22} />,
  Users: <Users size={22} />,
  BookOpen: <BookOpen size={22} />,
};

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {});
  }, []);

  const featured = projects.filter((p) => !p.isAcademic).slice(0, 3);

  return (
    <div data-testid="home-page">
      <Hero />

      {/* Highlights */}
      <section className="section-padding bg-white dark:bg-zinc-950">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-600 mb-3">
              Expertise
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-12">
              Points forts
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 mb-4">
                  {iconMap[item.icon] || <Layers size={22} />}
                </div>
                <h3 className="font-heading text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {item.label}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="section-padding bg-zinc-50 dark:bg-zinc-950">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-600 mb-3">
                  Travaux recents
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
                  Projets selectionnes
                </h2>
              </div>
              <Link
                to="/projects"
                data-testid="home-view-all-projects"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                Voir tout
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            <Link
              to="/projects"
              className="sm:hidden mt-8 inline-flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              Voir tous les projets
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4">
              Un projet ambitieux ?
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Discutons de votre prochain projet. Je suis disponible pour des
              missions de developpement, d'architecture ou de direction technique.
            </p>
            <Link
              to="/contact"
              data-testid="home-cta-contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium text-sm rounded-full hover:opacity-90 transition-opacity"
            >
              Prendre contact
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
