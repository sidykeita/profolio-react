import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-dark-surface">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          © {year} Sidy Keita. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
