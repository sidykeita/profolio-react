import React from 'react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

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

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full theme-dark shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Portfolio</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href.replace('#', ''));
                }}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>



          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
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
                  scrollToSection(item.href.replace('#', ''));
                  setIsOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
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
