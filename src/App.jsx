import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './sections/About';
import Skills from './sections/Skills';
import Qualification from './sections/Qualification';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen theme-dark">
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="home" className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Bonjour,</span>
              <span className="block text-primary-600">Je suis Développeur Web</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Passionné par la création de sites web modernes et réactifs, je développe des applications web qui allient performance et expérience utilisateur.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#contact" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors">
                Say Hello
              </a>
              <a href="#portfolio" className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Voir mes projets
              </a>
            </div>
          </div>
        </div>
        <About />
        <Skills />
        <Qualification />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
