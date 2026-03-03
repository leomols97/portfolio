import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { siteConfig } from '../../config/site';

const roles = ['Project Manager', 'Technical Manager', 'CTO', 'Developer'];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-600 mb-6">
            // Portfolio
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.9]">
            {siteConfig.name}
          </h1>

          <div className="mt-6 h-10 overflow-hidden">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="font-heading text-xl md:text-2xl font-medium text-zinc-500 dark:text-zinc-400 tracking-tight"
            >
              {roles[roleIndex]}
            </motion.p>
          </div>

          <p className="mt-8 text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              data-testid="hero-cta-projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium text-sm rounded-full hover:opacity-90 transition-opacity"
            >
              Voir les projets
              <ArrowRight size={16} />
            </Link>
            <a
              href="/cv.pdf"
              download
              data-testid="hero-cta-cv"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-sm rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Download size={16} />
              Telecharger CV
            </a>
            <Link
              to="/contact"
              data-testid="hero-cta-contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-sm rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <Mail size={16} />
              Me contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
