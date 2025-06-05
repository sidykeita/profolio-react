import React from 'react';

const Footer = () => {
  const socialLinks = [
    { icon: 'f', href: '#', className: 'text-blue-600' }, // Facebook
    { icon: 'x', href: '#', className: 'text-blue-400' }, // Twitter
    { icon: 'i', href: '#', className: 'text-pink-600' }, // Instagram
    { icon: 'i', href: '#', className: 'text-blue-700' }, // LinkedIn
    { icon: 'g', href: '#', className: 'text-gray-600' }, // GitHub
  ];

  return (
    <footer className="theme-dark">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#home" className="text-gray-600 hover:text-white">Home</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-white">About</a></li>
              <li><a href="#skills" className="text-gray-600 hover:text-white">Skills</a></li>
              <li><a href="#portfolio" className="text-gray-600 hover:text-white">Portfolio</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-200">Follow Me</h3>
            <div className="flex justify-center gap-8 mt-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`text-2xl ${link.className} text-gray-300 hover:text-primary-400`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-base">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
