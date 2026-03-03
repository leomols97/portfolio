import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const CV: React.FC = () => {
  return (
    <div data-testid="cv-page" className="pt-24 md:pt-28">
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-600 mb-3">
              Curriculum Vitae
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4">
              Mon CV
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/cv.pdf"
                download
                data-testid="cv-download-button"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                <Download size={16} />
                Telecharger le CV
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cv-open-new-tab"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-sm rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <FileText size={16} />
                Ouvrir dans un nouvel onglet
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 overflow-hidden bg-white dark:bg-zinc-900/30"
          >
            <iframe
              src="/cv.pdf"
              title="CV Leopold Mols"
              data-testid="cv-viewer"
              className="w-full min-h-[70vh] md:min-h-[80vh]"
              style={{ border: 'none' }}
            />
            <noscript>
              <p className="p-8 text-center text-zinc-500">
                Votre navigateur ne supporte pas l'affichage PDF.{' '}
                <a href="/cv.pdf" className="underline">
                  Telecharger le CV
                </a>
              </p>
            </noscript>
          </motion.div>

          <p className="mt-6 text-xs text-zinc-400 dark:text-zinc-600 text-center">
            Pour remplacer ce CV, placez votre fichier PDF dans{' '}
            <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
              /public/cv.pdf
            </code>
          </p>
        </div>
      </section>
    </div>
  );
};

export default CV;
