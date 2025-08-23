import React from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#services', label: 'Services' },
];

const socials = [
  { href: '#', label: 'Facebook', icon: 'f' },
  { href: '#', label: 'Instagram', icon: 'ig' },
  { href: '#', label: 'Twitter', icon: 'tw' },
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Name */}
        <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Smith</h3>

        {/* Nav */}
        <nav className="mt-4 flex items-center justify-center gap-8 text-gray-700 dark:text-gray-300">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-black">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center text-sm hover:bg-primary-700"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
          © Crypticalcoder. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
