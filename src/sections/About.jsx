import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 theme-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">À propos de moi</h2>
          <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Photo */}
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg shadow-lg opacity-20"></div>
              <img
                src="https://via.placeholder.com/400"
                alt="Photo de profil"
                className="relative rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>

            {/* Description */}
            <div className="space-y-8">
              <p className="text-xl text-gray-600 leading-relaxed">
                Je suis un développeur web passionné avec plusieurs années d'expérience dans la création de sites web modernes et responsives. Je suis spécialisé dans les technologies frontend et backend, et je suis toujours à la recherche de nouvelles opportunités pour apprendre et grandir.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <span className="text-primary-600 text-2xl mr-4">📍</span>
                  <span className="text-gray-700">Paris, France</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary-600 text-2xl mr-4">📧</span>
                  <span className="text-gray-700">contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary-600 text-2xl mr-4">💼</span>
                  <span className="text-gray-700">Développeur Web</span>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="/cv.pdf"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">📄</span>
                  Télécharger mon CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
