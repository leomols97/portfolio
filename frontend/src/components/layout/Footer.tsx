import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin, GitlabIcon, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/site';

const Footer: React.FC = () => {
  return (
    <footer
      data-testid="footer"
      className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950"
    >
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link
              to="/"
              className="font-heading font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {siteConfig.initials}
            </Link>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: '/projects', label: 'Projets' },
                { to: '/about', label: 'A propos' },
                { to: '/cv', label: 'CV' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                data-testid="footer-email"
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                <Mail size={14} />
                {siteConfig.email}
              </a>
              <span className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
                <MapPin size={14} />
                {siteConfig.location}
              </span>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-github"
                  className="p-2 rounded-lg text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={siteConfig.links.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-gitlab"
                  className="p-2 rounded-lg text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="GitLab"
                >
                  <GitlabIcon size={18} />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-linkedin"
                  className="p-2 rounded-lg text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits reserves.
          </p>
          <a
            href="/cv.pdf"
            target="_blank"
            data-testid="footer-cv-link"
            className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Telecharger CV
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
