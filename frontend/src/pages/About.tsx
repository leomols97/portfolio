import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/site';

const About: React.FC = () => {
  return (
    <div data-testid="about-page" className="pt-24 md:pt-28">
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-600 mb-3">
              A propos
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8">
              Qui suis-je
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mb-20"
          >
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {siteConfig.about.bio}
            </p>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8">
              Competences techniques
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteConfig.skills.technical.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  data-testid={`skill-category-${cat.category.toLowerCase().replace(/\s/g, '-')}`}
                  className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20"
                >
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-3">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 text-xs font-mono rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Management Skills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8">
              Competences management
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {siteConfig.skills.management.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8">
              Mon processus
            </h2>
            <div className="space-y-0">
              {siteConfig.skills.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  data-testid={`process-step-${step.step}`}
                  className="flex gap-6 py-6 border-b border-zinc-100 dark:border-zinc-800/50 last:border-b-0"
                >
                  <span className="font-mono text-3xl font-bold text-zinc-200 dark:text-zinc-800 tracking-tighter leading-none">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
