import React from 'react';

// Image locale pour remplacer le placeholder externe
const aboutImg = new URL("../images/Capture d'écran 2025-04-28 034928.png", import.meta.url).href;
// Logos fournis par l'utilisateur
const logoF2i = new URL("../images/logo/f2i_logo.jpeg", import.meta.url).href;
const logoCompany = new URL("../images/logo/images.png", import.meta.url).href;
const logoSailingLoc = new URL("../images/logo/logo-SailingLOC-couleur.png", import.meta.url).href;
// CV de l'utilisateur
const cvUrl = new URL("../images/cv/CV_2025-08-21_SIDY_KEITA.pdf", import.meta.url).href;

const About = () => {
  return (
    <section id="about" className="w-full bg-gray-50 dark:bg-dark-bg">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-600">About Me</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">My introduction</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Photo stylisée rectangulaire (différente du Home) */}
              <div className="relative mx-auto w-full max-w-md">
                {/* Cadre dégradé subtil */}
                <div className="p-[6px] rounded-2xl bg-gradient-to-br from-primary-300/60 via-fuchsia-300/40 to-primary-500/60 dark:from-primary-700/40 dark:via-fuchsia-700/30 dark:to-primary-800/50 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.35)]">
                  <div className="relative rounded-xl overflow-hidden bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border">
                    {/* ruban décoratif en haut à droite */}
                    <div className="absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-fuchsia-400/20 blur-2xl" aria-hidden="true" />
                    <img
                      src={aboutImg}
                      alt="Photo de profil"
                      className="w-full h-[300px] sm:h-[360px] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-8">
                {/* Info cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { iconImg: logoCompany, title: 'Expérience', sub: '4 ans ' },
                    { iconImg: logoF2i, title: 'Diplôme', sub: 'Master 1'  },
                    { iconImg: logoSailingLoc, title: 'Projets', sub: '+ 10' },
                  ].map((c) => (
                    <div key={c.title} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-4 text-center shadow-sm hover:border-primary-200 transition-colors">
                      <div className="mb-2 flex justify-center">
                        {c.iconImg ? (
                          <img
                            src={c.iconImg}
                            alt={c.title}
                            className="w-10 h-10 object-contain rounded-md bg-white ring-1 ring-gray-200"
                          />
                        ) : (
                          <div className="text-2xl">{c.icon}</div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-primary-600">{c.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{c.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-5">
                  {/* Intro mise en avant */}
                  <p className="text-lg md:text-xl font-medium">
                    ✨ Je suis un <span className="text-primary-600 font-semibold">développeur web full‑stack</span> passionné, avec plusieurs années d’expérience entre mes études, mes projets professionnels et personnels.
                  </p>

                  {/* Liste structurée */}
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="shrink-0 text-xl">🎓</span>
                      <p>
                        Après un <span className="font-semibold">BTS SIO (SLAM)</span>, je poursuis un <span className="font-semibold">Master 2 Architecte Web</span> à l’<span className="font-semibold">Institut F2i</span>, en alternance chez <span className="font-semibold">ClickYourFlat</span> depuis 2 ans. J’interviens sur la <span className="text-primary-600 font-semibold">maintenance</span>, l’<span className="text-primary-600 font-semibold">optimisation</span> et l’<span className="text-primary-600 font-semibold">évolution</span> de sites web au sein d’une équipe technique.
                      </p>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="shrink-0 text-xl">💻</span>
                      <p>
                        Stack <span className="font-semibold">Front‑end</span> : HTML, CSS, JavaScript, <span className="font-semibold">React</span>, <span className="font-semibold">Angular</span>, WordPress. <br className="hidden sm:block" />
                        Stack <span className="font-semibold">Back‑end</span> : <span className="font-semibold">Node.js</span>, PHP, <span className="font-semibold">Symfony</span>, MongoDB, MySQL. <br />
                        Je conçois des interfaces <span className="text-primary-600 font-semibold">modernes</span>, <span className="text-primary-600 font-semibold">responsives</span> et <span className="text-primary-600 font-semibold">performantes</span>.
                      </p>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="shrink-0 text-xl">📚</span>
                      <p>
                        Apprentissage continu via <span className="font-semibold">Udemy</span> pour explorer de nouveaux langages et renforcer mes bases. Je crois à un <span className="font-semibold">développement</span> en amélioration constante.
                      </p>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="shrink-0 text-xl">🚀</span>
                      <p>
                        Mon objectif : mettre mes compétences au service de <span className="font-semibold">projets innovants</span>, relever des <span className="font-semibold">défis techniques</span> et progresser dans un <span className="font-semibold">environnement stimulant</span>.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-2 flex justify-center">
                  <a
                    href={cvUrl}
                    download
                    className="inline-flex items-center px-6 py-3 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
                  >
                    <span className="mr-2">📄</span>
                    Télécharger CV
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
