import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Qualification from './sections/Qualification';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import { Routes, Route } from 'react-router-dom';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  const [isDark, setIsDark] = React.useState(false);

  // Initialiser le thème depuis localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 dark:bg-dark-bg dark:text-dark-text transition-colors">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Skills />
                <Qualification />
                <Portfolio />
                <Contact />
              </>
            }
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route
            path="*"
            element={
              <>
                <Home />
                <About />
                <Skills />
                <Qualification />
                <Portfolio />
                <Contact />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
