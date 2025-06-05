import React from 'react';

const projects = [
  {
    title: 'Projet 1',
    description: 'Description du projet 1',
    image: 'https://via.placeholder.com/400x300',
    technologies: ['React', 'Node.js', 'MongoDB'],
    url: '#'
  },
  {
    title: 'Projet 2',
    description: 'Description du projet 2',
    image: 'https://via.placeholder.com/400x300',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    url: '#'
  },
  {
    title: 'Projet 3',
    description: 'Description du projet 3',
    image: 'https://via.placeholder.com/400x300',
    technologies: ['Angular', 'NestJS', 'TypeScript'],
    url: '#'
  },
  {
    title: 'Projet 4',
    description: 'Description du projet 4',
    image: 'https://via.placeholder.com/400x300',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
    url: '#'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 theme-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Mes projets</h2>
          <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.url}
                        className="mt-4 inline-flex items-center px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="mr-2">🔗</span>
                        Voir le projet
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
