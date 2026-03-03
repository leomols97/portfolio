import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/projects', label: 'Projets' },
  { to: '/about', label: 'A propos' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/80'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            data-testid="nav-logo"
            className="font-heading font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition-opacity"
          >
            L.M
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive(link.to)
                    ? 'text-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              data-testid="theme-toggle"
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Changer le theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              data-testid="theme-toggle-mobile"
              className="p-2 text-zinc-600 dark:text-zinc-400"
              aria-label="Changer le theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
              className="p-2 text-zinc-600 dark:text-zinc-400"
              aria-label="Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          data-testid="mobile-menu"
          className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
