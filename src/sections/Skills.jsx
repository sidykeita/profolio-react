import React from 'react';
import Reveal from '../components/Reveal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faAngular,
  faBootstrap,
  faNodeJs,
  faPhp,
  faDocker,
  faGithub,
  faGitAlt,
  faEnvira,
} from '@fortawesome/free-brands-svg-icons';

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-primary-600"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 7.22a.75.75 0 10-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const IconBadge = ({ label }) => {
  const initials = label
    .replace(/\([^)]*\)/g, '')
    .split(/\s|\//)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  return (
    <div className="w-5 h-5 rounded-md bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 flex items-center justify-center text-[10px] font-bold">
      {initials || '?'}
    </div>
  );
};

const TechIcon = ({ name }) => {
  const key = name.toLowerCase();
  const map = {
    html: faHtml5,
    'html5': faHtml5,
    css: faCss3,
    'css3': faCss3,
    javascript: faJs,
    js: faJs,
    typescript: faJs, // fallback icon
    react: faReact,
    angular: faAngular,
    bootstrap: faBootstrap,
    node: faNodeJs,
    'node.js': faNodeJs,
    'nodejs': faNodeJs,
    php: faPhp,
    mongodb: faEnvira, // leaf icon as a close proxy
    docker: faDocker,
    git: faGitAlt,
    github: faGithub,
  };
  const icon = map[key];
  if (!icon) return <IconBadge label={name} />;
  return <FontAwesomeIcon icon={icon} className="w-5 h-5 text-primary-600" />;
};

const Skills = () => {
  const frontendGroups = [
    {
      title: 'Langages',
      items: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS'],
    },
    {
      title: 'Frameworks & outils',
      items: ['React','Bootstrap', 'Vite'],
    },
    {
      title: 'Compétences associées',
      items: ['Responsive design', 'SEO de base'],
    },
  ];

  const backendGroups = [
    {
      title: 'Langages',
      items: [  'PHP', 'SQL'],
    },
    {
      title: 'Frameworks & environnements',
      items: ['Node.js', 'Express', 'Symfony (bases)'],
    },
    {
      title: 'Bases de données',
      items: ['MongoDB', 'MySQL', 'Firebase'],
    },
    {
      title: 'Sécurité & méthodes',
      items: ['Authentification JWT', 'Hashage avec bcrypt', 'MVC', 'API REST'],
    },
    {
      title: 'Outils',
      items: ['Git / GitHub', 'Docker', 'Postman (tests API)', 'Locust (tests de monté en charge)']
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-dark-bg">
      <Reveal as="div" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-600 to-primary-600 bg-clip-text text-transparent dark:from-white dark:via-primary-400 dark:to-primary-400">Compétences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Card */}
          <div
            className="group relative card-float bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-primary-300/50 dark:hover:ring-primary-700/40"
            style={{ animationDelay: '0s' }}
          >
            <h3 className="text-xl font-semibold text-primary-600 text-center mb-8">Frontend</h3>
            <div className="space-y-6">
              {frontendGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{group.title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <TechIcon name={item} />
                        </div>
                        <p className="text-gray-900 dark:text-white leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Card */}
          <div
            className="group relative card-float bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-primary-300/50 dark:hover:ring-primary-700/40"
            style={{ animationDelay: '0.6s' }}
          >
            <h3 className="text-xl font-semibold text-primary-600 text-center mb-8">Backend</h3>
            <div className="space-y-6">
              {backendGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{group.title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <TechIcon name={item} />
                        </div>
                        <p className="text-gray-900 dark:text-white leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Skills;
