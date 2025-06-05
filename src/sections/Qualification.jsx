import React, { useState } from 'react';

const qualificationData = {
  education: [
    {
      title: 'Master en Développement Web',
      institution: 'Université Paris',
      date: '2022 - 2024',
      icon: '🎓'
    },
    {
      title: 'Licence en Informatique',
      institution: 'Université Paris',
      date: '2019 - 2022',
      icon: '🎓'
    },
    {
      title: 'Baccalauréat Scientifique',
      institution: 'Lycée Jean Monnet',
      date: '2019',
      icon: '🎓'
    }
  ],
  experience: [
    {
      title: 'Développeur Web Junior',
      company: 'Tech Company',
      date: '2023 - Présent',
      icon: '💼'
    },
    {
      title: 'Stagiaire Développeur',
      company: 'Startup',
      date: '2022 - 2023',
      icon: '💼'
    }
  ]
};

const Qualification = () => {
  const [activeTab, setActiveTab] = useState('education');

  const renderTimeline = (items, isLeft) => {
    return items.map((item, index) => (
      <div key={index} className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-start`}>
        {/* Timeline dot */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
          <div className="absolute -top-12 -left-12">
            <span className="text-2xl text-primary-600">{item.icon}</span>
          </div>
        </div>
        {/* Content */}
        <div className="pl-8 pr-8">
          <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
          <p className="text-gray-600 mt-1">{item.institution || item.company}</p>
          <p className="text-gray-500 mt-1">{item.date}</p>
        </div>
      </div>
    ));
  };

  return (
    <section id="qualification" className="py-20 theme-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Qualification</h2>
          <p className="text-gray-600 mb-12">My personal journey</p>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === 'education'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">🎓</span> Education
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2 rounded-full text-sm font-medium ml-4 ${
                activeTab === 'experience'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">💼</span> Experience
            </button>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-200"></div>
            <div className="relative flex flex-col">
              {activeTab === 'education' ? (
                renderTimeline(qualificationData.education, false)
              ) : (
                renderTimeline(qualificationData.experience, false)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
