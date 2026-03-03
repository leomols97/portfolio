import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/features/ContactForm';
import { siteConfig } from '../config/site';

const Contact: React.FC = () => {
  return (
    <div data-testid="contact-page" className="pt-24 md:pt-28">
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-600 mb-3">
              Contact
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4">
              Travaillons ensemble
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12">
              Vous avez un projet technique ambitieux ? Discutons-en. Je suis
              disponible pour des missions de developpement, d'architecture ou de
              direction technique.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">
                  Coordonnees
                </h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    data-testid="contact-email-link"
                    className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  >
                    <Mail size={16} className="text-zinc-400 dark:text-zinc-600" />
                    {siteConfig.email}
                  </a>
                  <span className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
                    <MapPin size={16} className="text-zinc-400 dark:text-zinc-600" />
                    {siteConfig.location}
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">
                  Disponibilite
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Disponible pour des missions freelance ou des postes a responsabilite technique. Reponse sous 48h.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">
                  Types de mission
                </h3>
                <ul className="space-y-2">
                  {[
                    'Developpement fullstack',
                    'Architecture technique',
                    'Direction technique / CTO',
                    'Conseil DevOps',
                    'Audit de code',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
