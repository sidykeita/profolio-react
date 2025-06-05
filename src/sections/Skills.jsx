import React from 'react';

const Skills = () => {
  const frontendSkills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
    { name: 'Git', level: 70 },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 70 },
    { name: 'PHP', level: 65 },
    { name: 'SQL', level: 60 },
    { name: 'Python', level: 55 },
    { name: 'Java', level: 50 },
  ];

  return (
    <section id="skills" className="py-20 theme-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Mes compétences</h2>
          <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Frontend Skills */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Frontend</h3>
              <div className="space-y-6">
                {frontendSkills.map((skill) => (
                  <div key={skill.name} className="relative">
                    <div className="flex items-center mb-2">
                      <span className="text-xl font-medium text-gray-900 w-32">{skill.name}</span>
                      <span className="ml-auto text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-primary-600 rounded-full transition-all duration-500 relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <span className="absolute -top-3 -right-3 bg-primary-600 text-white px-2 py-1 text-sm rounded-full">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Backend</h3>
              <div className="space-y-6">
                {backendSkills.map((skill) => (
                  <div key={skill.name} className="relative">
                    <div className="flex items-center mb-2">
                      <span className="text-xl font-medium text-gray-900 w-32">{skill.name}</span>
                      <span className="ml-auto text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-primary-600 rounded-full transition-all duration-500 relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <span className="absolute -top-3 -right-3 bg-primary-600 text-white px-2 py-1 text-sm rounded-full">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
