import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';

// Fonction pour le défilement smooth
const scrollToSection = (id) => {
  // Si c'est le Home, on fait défiler vers le haut
  if (id === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const element = document.getElementById(id);
    if (element) {
      // On ajoute un offset pour tenir compte de la navbar fixe
      const offset = 80; // hauteur de la navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: window.pageYOffset + offsetPosition,
        behavior: 'smooth'
      });
    }
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialiser le thème depuis localStorage ou la préférence système
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    setIsDark(initialTheme === 'dark');
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const menuItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNav = (href) => {
    const id = href.replace('#', '');
    if (location.pathname !== '/') {
      // Navigate to home with hash, App will handle scrolling on route change
      navigate({ pathname: '/', hash: href });
    } else {
      scrollToSection(id);
    }
  };

  return (
    <nav className="fixed w-full bg-white/70 dark:bg-[#0b1220cc] backdrop-blur shadow-lg z-50 text-gray-900 dark:text-dark-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          {/* Desktop Menu (centered) */}
          <div className="hidden sm:flex sm:space-x-8 absolute left-1/2 -translate-x-1/2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 transition-all duration-200 hover:text-transparent dark:hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-900 hover:via-primary-600 hover:to-amber-400 dark:hover:from-white dark:hover:via-primary-400 dark:hover:to-yellow-300"
              >
                {item.name}
              </a>
            ))}
          </div>



          {/* Right Controls */}
          <div className="ml-auto flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`group p-2 rounded-lg transition-colors border ${
                isDark
                  ? 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'border-primary-400 bg-gray-50 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <SunIcon className="h-6 w-6 text-gray-300 group-hover:text-primary-300 transition-colors" />
              ) : (
                <MoonIcon className="h-6 w-6 text-primary-600 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                  setIsOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 hover:text-transparent dark:hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-900 hover:via-primary-600 hover:to-amber-400 dark:hover:from-white dark:hover:via-primary-400 dark:hover:to-yellow-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
