import React from 'react';
import { Link } from 'react-router-dom';

// Photo de profil (Home) depuis src/images/profil/
const profileImg = new URL("../images/profil/IMG_0987 (1).jpeg", import.meta.url).href;

const Home = () => {
  return (
    <section id="home" className="w-full bg-white dark:bg-dark-bg">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Col gauche: Texte */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Sidy Keita</span>
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-600 to-amber-400 bg-clip-text text-transparent dark:from-white dark:via-primary-400 dark:to-yellow-300">Développeur Full Stack</h2>
                </h1>

              <p className="mt-4 text-base text-gray-500 dark:text-gray-300 sm:text-lg md:text-xl max-w-xl md:max-w-none mx-auto md:mx-0">
                Passionné par la création de sites web modernes et réactifs, je développe des applications web qui allient performance et expérience utilisateur.
              </p>

              <div className="mt-6 sm:flex sm:items-center sm:gap-4">
                <div className="rounded-md shadow">
                  <Link
                    to="#contact"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white btn-gradient-violet md:py-4 md:text-lg md:px-10"
                  >
                    Me contacter 👋
                  </Link>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex justify-center md:justify-start space-x-6">
                <a href="https://www.linkedin.com/in/sidy-keita-62378220b" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col droite: Espace Photo (style blob avec bordure) */}
            <div className="relative mx-auto w-full max-w-md">
              {/* Halo/ombre légère derrière */}
              <div className="absolute inset-0 translate-y-2 translate-x-2 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] bg-black/5 dark:bg-black/20 blur-sm" aria-hidden="true" />

              {/* Anneau conique animé autour de la forme blob */}
              <div
                className="pointer-events-none absolute -inset-2"
                style={{
                  borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%',
                  background: 'conic-gradient(from 0deg, #7c3aed, #6366f1, #7c3aed)',
                  WebkitMask:
                    'radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))',
                  mask:
                    'radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))',
                  animation: 'spin-slower 8s linear infinite',
                  filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.25))',
                }}
                aria-hidden="true"
              />

              {/* Anneau + image en forme blob */}
              <div className="relative aspect-square p-3 bg-gradient-to-br from-primary-200/60 to-primary-400/60 dark:from-primary-700/40 dark:to-primary-900/40 rounded-[40%_60%_60%_40%/60%_40%_60%_40%]">
                <div
                  className="w-full h-full overflow-hidden bg-white dark:bg-dark-card ring-4 ring-white dark:ring-dark-bg"
                  style={{ borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%' }}
                >
                  {/* Photo locale */}
                  <img
                    src={profileImg}
                    alt="Photo de profil"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
