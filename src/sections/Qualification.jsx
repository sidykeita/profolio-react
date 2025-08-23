import React, { useState } from 'react';

const qualificationData = {
  education: [
    {
      title: 'Mastère Architecte Web',
      institution: 'Institut F2I',
      date: '2025 - 2026',
      icon: '🎓',
    },
    {
      title: 'Consultant Développeur Web et Mobile ',
      institution: 'Institut F2I',
      date: '2023 - 2025',
      icon: '🎓',
    },
    {
      title: 'BTS SIO',
      institution: 'Lycée Louis Michel',
      date: '2019 - 2021',
      icon: '🎓',
    },
  ],
  experience: [
    {
      title: 'Développeur Web',
      company: 'ClickYourFlat',
      date: '2023 - Présent',
      icon: '💼',
    },
    {
      title: 'Stagiaire Développeur logiciel',
      company: 'Innogen',
      date: '2019 - 2020',
      icon: '💼',
    },
  ],
};

const ItemCard = ({ title, subtitle, date }) => (
  <div>
    <h4 className="text-gray-900 dark:text-white font-semibold">{title}</h4>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{date}</p>
  </div>
);

const Qualification = () => {
  const [activeTab, setActiveTab] = useState('education'); // 'education' | 'experience'
  const rows =
    activeTab === 'education'
      ? qualificationData.education.length
      : qualificationData.experience.length;

  return (
    <section id="qualification" className="py-20 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-600">Qualification</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">My personal journey</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('education')}
            className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeTab === 'education'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text border-gray-200 dark:border-dark-border hover:bg-primary-50 dark:hover:bg-[#121b33]'
            }`}
          >
            <span className="mr-2">🎓</span>
            Education
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeTab === 'experience'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text border-gray-200 dark:border-dark-border hover:bg-primary-50 dark:hover:bg-[#121b33]'
            }`}
          >
            <span className="mr-2">💼</span>
            Experience
          </button>
        </div>

        {/* Timeline grid */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-8 max-w-3xl mx-auto">
          {Array.from({ length: rows }).map((_, i) => {
            const edu = activeTab === 'education' ? qualificationData.education[i] : null;
            const exp = activeTab === 'experience' ? qualificationData.experience[i] : null;
            return (
              <React.Fragment key={i}>
                {/* Left: Education */}
                <div className="text-right">
                  {edu && activeTab === 'education' && (
                    <ItemCard
                      title={edu.title}
                      subtitle={`${edu.institution}`}
                      date={edu.date}
                    />
                  )}
                </div>

                {/* Center: icon (sans trait) */}
                <div className="flex flex-col items-center">
                  {activeTab === 'education' ? (
                    <span className="text-2xl leading-none text-primary-600">🎓</span>
                  ) : (
                    <span className="text-2xl leading-none text-primary-600">💼</span>
                  )}
                </div>

                {/* Right: Experience */}
                <div>
                  {exp && activeTab === 'experience' && (
                    <ItemCard
                      title={exp.title}
                      subtitle={`${exp.company}`}
                      date={exp.date}
                    />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Qualification;
