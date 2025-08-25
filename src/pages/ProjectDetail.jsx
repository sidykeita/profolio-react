import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';
import Reveal from '../components/Reveal';

// Local TagList for the detail page with expandable '+'/'-' behavior
const TagList = ({ tags = [], extraTags = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const keyTags = (tags || []).filter((t) => t !== '+');
  const hasMore = (tags || []).includes('+') && (extraTags || []).length > 0;

  return (
    <div className="flex flex-wrap gap-2">
      {keyTags.map((t, idx) => (
        <span key={`t-${idx}`} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-600 dark:hover:text-white dark:hover:border-primary-600 transition-colors">{t}</span>
      ))}
      {expanded && (extraTags || []).map((et, i) => (
        <span key={`et-${i}`} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-600 dark:hover:text-white dark:hover:border-primary-600 transition-colors">{et}</span>
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-200 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-600 dark:hover:text-white dark:hover:border-primary-600 transition-colors"
          aria-expanded={expanded}
          aria-label={expanded ? 'Réduire les technologies' : 'Afficher plus de technologies'}
        >
          {expanded ? '-' : '+'}
        </button>
      )}
    </div>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-semibold mb-3">Projet introuvable</h1>
          <p className="text-gray-500 mb-6">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to="/" className="inline-flex items-center px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700">← Retour</Link>
        </div>
      </div>
    );
  }

  // Custom layout for Weather app
  if (project.slug === 'application-meteo') {
    const gallery = Array.isArray(project.gallery) ? project.gallery : [project.image].filter(Boolean);
    const hero = project.image || gallery[0];

    return (
      <section className="py-14 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-900/30 dark:text-primary-200 dark:border-primary-800">Étude de cas</div>
              <h1 className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-primary-300 dark:to-gray-200">{project.title}</h1>
            </div>
            <Link to="/" className="text-sm px-4 py-2 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-[#121b33]">← Retour</Link>
          </div>

          {/* Hero */}
          {hero && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-6 bg-gray-100 dark:bg-[#0b1226]">
              <img src={hero} alt={`${project.title} - visuel`} className="w-full h-auto object-contain max-h-[70vh]" />
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-6">
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0b1226]/60 backdrop-blur px-3 py-2">
              <TagList tags={project.tags} extraTags={project.extraTags} />
            </div>
          </div>

          {/* Intro */}
          <div className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-5">
            <Reveal className="reveal-x-left">
              <p>
                Petite application <strong>météo</strong> en <strong>HTML/CSS/JS</strong> consommant l’API OpenWeather :
                recherche par ville.
              </p>
            </Reveal>
            <Reveal className="reveal-x-right">
              <p>
                Côté technique: <strong>fetch</strong> avec gestion d’erreurs, <strong>loading states</strong>, et mise en page <strong>responsive</strong>.
                Les captures ci‑dessous montrent l’accueil, les résultats et les variations d’états.
              </p>
            </Reveal>
          </div>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

          {/* Alternating previews */}
          {gallery.length > 0 && (
            <div className="mt-6 space-y-12">
              {gallery.map((src, idx) => {
                const imageLeft = idx % 2 === 0;
                return (
                  <div key={`meteo-row-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {imageLeft ? (
                      <>
                        <Reveal className="reveal-x-left">
                          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm bg-white dark:bg-dark-card">
                            <img src={src} alt={`${project.title} - aperçu ${idx + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                          </div>
                        </Reveal>
                        <Reveal className="reveal-x-right">
                          <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Écran #{idx + 1}</h3>
                            {idx === 0 ? (
                              <p>
                                Accueil avec champ de recherche et rappel des dernières villes.
                              </p>
                            ) : idx === 1 ? (
                              <p>
                                Résultats: ville, température, icône météo, humidité et vent.
                              </p>
                            ) : (
                              <p>
                                Variations: différents états (pluie, ciel dégagé, nuageux) et messages d’erreur.
                              </p>
                            )}
                          </div>
                        </Reveal>
                      </>
                    ) : (
                      <>
                        <Reveal className="reveal-x-left order-1 md:order-none">
                          <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Écran #{idx + 1}</h3>
                            {idx === 1 ? (
                              <p>
                                Résultats: ville, température, icône météo, humidité et vent.
                              </p>
                            ) : (
                              <p>
                                Variations: différents états (pluie, ciel dégagé, nuageux) et messages d’erreur.
                              </p>
                            )}
                          </div>
                        </Reveal>
                        <Reveal className="reveal-x-right order-2 md:order-none">
                          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm bg-white dark:bg-dark-card">
                            <img src={src} alt={`${project.title} - aperçu ${idx + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                          </div>
                        </Reveal>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          {project.liveUrl && (
            <div className="mt-10">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Consulter le site
              </a>
            </div>
          )}

        </div>
      </section>
    );
  }

  // Custom long-form layout for Patinette
  if (project.slug === 'patinette') {
    const gallery = Array.isArray(project.gallery) ? project.gallery : [project.image].filter(Boolean);
    const hero = project.image || gallery[0];
    // Choose floating images by filename to control placements without reordering data
    const named = gallery.map((u) => ({ u, name: (u.match(/[^\/\\]+$/) || [u])[0] }));
    const findBy = (re) => named.find((x) => re.test(x.name))?.u;
    // Aperçu #2: prefer a map/carte or a file starting with 2-; fallback to gallery[1]
    const float1 = findBy(/^(2[-_].*|.*(map|carte).*)/i) || gallery[1] || null;
    // Aperçu #3: prefer home/accueil/cover/hero; robust fallback = first image not equal to float1
    const float2 = findBy(/(accueil|home|cover|hero)/i) || (gallery.find((u) => u !== float1) ?? null);

    return (
      <section className="py-14 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-900/30 dark:text-primary-200 dark:border-primary-800">Étude de cas</div>
              <h1 className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-primary-300 dark:to-gray-200">{project.title}</h1>
            </div>
            <Link to="/" className="text-sm px-4 py-2 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-[#121b33]">← Retour</Link>
          </div>

          {/* Hero */}
          {hero && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-6 bg-gray-100 dark:bg-[#0b1226]">
              <img src={hero} alt={`${project.title} - visuel`} className="w-full h-auto object-contain max-h-[70vh]" />
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-6">
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0b1226]/60 backdrop-blur px-3 py-2">
              <TagList tags={project.tags} extraTags={project.extraTags} />
            </div>
          </div>

          {/* Narrative with floating images (like SailingLoc) */}
          <div className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-5">
            {/* Float image for Aperçu #2 (left) */}
            {float1 && (
              <figure className="hidden sm:block sm:max-w-[55%] sm:float-left mr-8 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-4">
                <img src={float1} alt={`${project.title} - capture 2`} className="w-full h-auto max-h-[420px] object-contain" loading="lazy" />
              </figure>
            )}
            {/* Aperçu #2 card */}
            <Reveal className="reveal-x-left">
              <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm sm:flow-root">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aperçu #2</h3>
                <p>
                  Projet WordPress réalisé avec un <strong>thème 100% personnalisé</strong> (aucun thème enfant ni page builder autorisés). 
                  Sujet: opérateur de trottinettes partagées en libre‑service à Lyon.
                </p>
              </div>
            </Reveal>
            {/* Clear before second float to avoid overlap with left float */}
            <div className="clear-both" />
            {/* Float image for Aperçu #3 (right) */}
            {float2 && (
              <figure className="hidden sm:block sm:max-w-[55%] sm:float-right ml-8 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-4">
                <img src={float2} alt={`${project.title} - capture 3`} className="w-full h-auto max-h-[420px] object-contain" loading="lazy" />
              </figure>
            )}
            {/* Aperçu #3 card */}
            <Reveal className="reveal-x-right">
              <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm sm:flow-root">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aperçu #3</h3>
                <p>
                  Le service propose ~2000 trottinettes électriques en accord avec des valeurs écologiques. Les trottinettes sont 
                  <strong>géolocalisées</strong> pour trouver la plus proche et <strong>déverrouillées par QR code</strong> via l’application. 
                  Disponibilité 24/7, <strong>location à l’heure (1€ de l’heure)</strong>, sans abonnement pour le moment.
                </p>
              </div>
            </Reveal>
            <Reveal className="reveal-x-left">
              <p>
                Chaque trottinette est équipée d’une <strong>alarme intégrée</strong> et de capteurs pour détecter toute utilisation non prévue 
                (ex: détection d’une trottinette laissée en pleine rue). Un réseau de particuliers volontaires assure la <strong>recharge à domicile</strong>,
                avec récupération des trottinettes entre 21h et 6h du matin lorsque nécessaire.
              </p>
            </Reveal>
            <div className="clear-both" />
          </div>

          {/* Gallery removed per demande */}

          {/* CTA (if later a liveUrl exists) */}
          {project.liveUrl && (
            <div className="mt-10">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Consulter le site
              </a>
            </div>
          )}

        </div>
      </section>
    );
  }

  // Custom layout for Blog (écriture dans les jeux vidéo)
  if (project.slug === 'blog') {
    const gallery = Array.isArray(project.gallery) ? project.gallery : [project.image].filter(Boolean);
    const hero = project.image || gallery[0];

    return (
      <section className="py-14 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-900/30 dark:text-primary-200 dark:border-primary-800">Étude de cas</div>
              <h1 className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-primary-300 dark:to-gray-200">{project.title}</h1>
            </div>
            <Link to="/" className="text-sm px-4 py-2 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-[#121b33]">← Retour</Link>
          </div>

          {/* Hero */}
          {hero && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-6 bg-gray-100 dark:bg-[#0b1226]">
              <img src={hero} alt={`${project.title} - visuel`} className="w-full h-auto object-contain max-h-[70vh]" />
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-6">
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0b1226]/60 backdrop-blur px-3 py-2">
              <TagList tags={project.tags} extraTags={project.extraTags} />
            </div>
          </div>

          {/* Intro */}
          <div className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-5">
            <Reveal className="reveal-x-left">
              <p>
                Blog éditorial consacré à <strong>l’écriture dans les jeux vidéo</strong>: narration interactive, design narratif,
                bibles d’univers, arcs de personnages et <em>environmental storytelling</em>.
              </p>
            </Reveal>
            <Reveal className="reveal-x-right">
              <p>
                Réalisé en <strong>HTML/CSS/JS (vanilla)</strong> pour la simplicité et la performance. Le site inclut une page d’accueil
                mettant en avant les derniers articles, une liste d’articles filtrable, et des pages dédiées avec mise en forme
                typographique et extraits de scripts.
              </p>
            </Reveal>
          </div>

          {/* divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

          {/* Alternating previews using gallery */}
          {gallery.length > 0 && (
            <div className="mt-6 space-y-12">
              {gallery.map((src, idx) => {
                const imageLeft = idx % 2 === 0;
                return (
                  <div key={`blog-row-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {imageLeft ? (
                      <>
                        <Reveal className="reveal-x-left">
                          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm bg-white dark:bg-dark-card">
                            <img src={src} alt={`${project.title} - aperçu ${idx + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                          </div>
                        </Reveal>
                        <Reveal className="reveal-x-right">
                          <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aperçu #{idx + 1}</h3>
                            {idx === 0 ? (
                              <p>
                                Page d’accueil: hero éditorial, mise en avant des derniers billets et catégories (narration, gameplay & histoire,
                                dialogues, worldbuilding).
                              </p>
                            ) : idx === 1 ? (
                              <p>
                                Liste des articles: cartes avec extrait, tags thématiques et filtres (ex: narration systémique, quêtes, cinématiques).
                              </p>
                            ) : idx === 2 ? (
                              <p>
                                Article détaillé: structure en sections, encadrés de concepts, exemples de scripts de dialogues branchés.
                              </p>
                            ) : (
                              <p>
                                Aperçu de contenu: études de cas, références, et techniques d’écriture appliquées au jeu vidéo.
                              </p>
                            )}
                          </div>
                        </Reveal>
                      </>
                    ) : (
                      <>
                        <Reveal className="reveal-x-left order-1 md:order-none">
                          <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aperçu #{idx + 1}</h3>
                            {idx === 1 ? (
                              <p>
                                Liste des articles: cartes avec extrait, tags thématiques et filtres (ex: narration systémique, quêtes, cinématiques).
                              </p>
                            ) : idx === 2 ? (
                              <p>
                                Article détaillé: structure en sections, encadrés de concepts, exemples de scripts de dialogues branchés.
                              </p>
                            ) : (
                              <p>
                                Aperçu de contenu: études de cas, références, et techniques d’écriture appliquées au jeu vidéo.
                              </p>
                            )}
                          </div>
                        </Reveal>
                        <Reveal className="reveal-x-right order-2 md:order-none">
                          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm bg-white dark:bg-dark-card">
                            <img src={src} alt={`${project.title} - aperçu ${idx + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                          </div>
                        </Reveal>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          {project.liveUrl && (
            <div className="mt-10">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Consulter le site
              </a>
            </div>
          )}

          {/* End content */}
        </div>
      </section>
    );
  }

  // Custom long-form layout for SailingLoc with floating images
  if (project.slug === 'sailingloc') {
    const gallery = Array.isArray(project.gallery) ? project.gallery : [project.image].filter(Boolean);
    // Keep ONLY one hero image (the cover/boat). No slider.
    const heroImages = [project.image || gallery[0]].filter(Boolean);
    const [heroIndex, setHeroIndex] = useState(0);
    const prevHero = () => setHeroIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
    const nextHero = () => setHeroIndex((i) => (i + 1) % heroImages.length);

    // Keyboard navigation
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === 'ArrowLeft') prevHero();
        if (e.key === 'ArrowRight') nextHero();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [heroImages.length]);

    // Touch swipe
    let touchStartX = null;
    const onTouchStart = (e) => { touchStartX = e.changedTouches[0].clientX; };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - (touchStartX ?? 0);
      if (Math.abs(dx) > 40) {
        if (dx > 0) prevHero(); else nextHero();
      }
      touchStartX = null;
    };

    const FloatImage = ({ src, alt, side = 'left', caption }) => (
      <figure
        className={
          `sm:max-w-[55%] sm:${side === 'left' ? 'float-left mr-8' : 'float-right ml-8'} ` +
          'rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-6 sm:mb-4'
        }
      >
        {/* Ensure inner images never exceed visual blocks */}
        <img src={src} alt={alt} className="w-full h-auto max-h-[420px] object-contain" loading="lazy" />
        {caption && (
          <figcaption className="text-xs text-gray-500 dark:text-gray-400 p-2">{caption}</figcaption>
        )}
      </figure>
    );

    return (
      <section className="py-14 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-900/30 dark:text-primary-200 dark:border-primary-800">Étude de cas</div>
              <h1 className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-primary-300 dark:to-gray-200">{project.title}</h1>
            </div>
            <Link to="/" className="text-sm px-4 py-2 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-[#121b33]">← Retour</Link>
          </div>

          {/* Hero carousel */}
          {heroImages.length > 0 && (
            <div
              className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-4 select-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Fixed-height hero that clips overflow; image is contained to never exceed hero */}
              <div className="w-full h-[320px] sm:h-[420px] bg-gray-100 dark:bg-[#0b1226] overflow-hidden">
                <img
                  src={heroImages[heroIndex]}
                  alt={`${project.title} - visuel ${heroIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-500"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

              {heroImages.length > 1 && (
                <>
                  {/* Prev */}
                  <button
                    type="button"
                    onClick={prevHero}
                    aria-label="Image précédente"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
                  </button>
                  {/* Next */}
                  <button
                    type="button"
                    onClick={nextHero}
                    aria-label="Image suivante"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroIndex(i)}
                        aria-label={`Aller à l'image ${i + 1}`}
                        className={`h-2.5 w-2.5 rounded-full ${i === heroIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tech stack (moved below hero for better layout) */}
          <div className="mb-8">
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0b1226]/60 backdrop-blur px-3 py-2">
              <TagList tags={project.tags} extraTags={project.extraTags} />
            </div>
          </div>

          {/* Intro + goals */}
          <div className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-5">
            <Reveal className="reveal-x-left">
              <p>
                SailingLoc est une plateforme de location de bateaux entre particuliers. Elle permet aux propriétaires de publier des annonces détaillées
                et aux utilisateurs de rechercher, réserver et payer en ligne en toute sécurité. Le projet comporte des espaces dédiés aux propriétaires,
                locataires et administrateurs pour gérer les annonces, disponibilités, réservations et validations. L'aperçu 2 ("home2") correspond à la
                page d'accueil: on peut y créer un compte, choisir ses dates, sélectionner le lieu du bateau, et découvrir les coups de cœur de la communauté
                ainsi que les principales destinations.
              </p>
            </Reveal>
            <Reveal className="reveal-x-right">
              <p>
                L’objectif principal est de fournir une expérience fluide, moderne et fiable, avec une architecture claire: frontend en React (Vite),
                backend Node.js/Express, base de données MongoDB, conteneurisation Docker et déploiements sur Vercel/Render. Le stockage des images et
                fichiers est assuré via Firebase Storage. La documentation d’API est gérée avec Swagger; tests via Postman/Jest et tests de charge avec
                Locust.
              </p>
            </Reveal>
            <div className="clear-both" />
          </div>

          {/* divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

          {/* Alternating two-column blocks (text|image then image|text), no float wrapping */}
          <div className="mt-10 space-y-16">
            {gallery.slice(1).map((src, idx) => {
              const imageLeft = idx % 2 === 1; // Row 1: text left, image right
              return (
                <div key={`row-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {imageLeft ? (
                    <>
                      <Reveal className="reveal-x-left">
                        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm">
                          <img src={src} alt={`${project.title} - capture ${idx + 2}`} className="w-full h-auto max-h-[420px] object-contain" loading="lazy" />
                        </div>
                      </Reveal>
                      <Reveal className="reveal-x-right">
                        <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aperçu #{idx + 2}</h3>
                          {idx === 0 ? (
                            <>
                              <p>
                                Page d'accueil (home2): accès rapide aux fonctionnalités principales — création de compte, choix des dates et du lieu,
                                mise en avant des coups de cœur de la communauté et des destinations populaires.
                              </p>
                            </>
                          ) : idx === 1 ? (
                            <>
                              <p>
                                Page destinations: liste de toutes les destinations proposées avec visuels, filtres et accès aux détails/annonces.
                              </p>
                            </>
                          ) : idx === 2 ? (
                            <>
                              <p>
                                Liste des bateaux: cette page répertorie tous les bateaux du site avec leurs caractéristiques principales et la
                                possibilité de les ajouter en favoris. Un système de tri visible permet de trier par prix et par nombre de personnes,
                                et une barre de recherche permet de trouver un bateau par son nom.
                              </p>
                            </>
                          ) : idx === 3 ? (
                            <>
                              <p>
                                Réservation bateau: page où l'on peut réserver avec un descriptif complet du bateau (prix, présence d'un skipper,
                                équipements et caractéristiques). Le paiement est géré de manière sécurisée via Stripe.
                              </p>
                            </>
                          ) : idx === 4 ? (
                            <>
                              <p>
                                Owner dashboard: plusieurs fonctionnalités comme ajouter un bateau, le modifier ou le supprimer, gérer son calendrier,
                                visualiser les réservations et voir les revenus générés par celles‑ci.
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                Description de l’écran et de son rôle dans le parcours utilisateur (recherche, réservation, messagerie, etc.).
                              </p>
                              <p className="mt-2">Points notables: performance, accessibilité, feedback en temps réel et cas d’erreurs traités.</p>
                            </>
                          )}
                        </div>
                      </Reveal>
                    </>
                  ) : (
                    <>
                      <Reveal className="reveal-x-left order-1 md:order-none">
                        <div className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gray-50/60 dark:bg-[#0b1226]/40 border border-gray-200/70 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aperçu #{idx + 2}</h3>
                          {idx === 0 ? (
                            <>
                              <p>
                                Page d'accueil (home2): accès rapide aux fonctionnalités principales — création de compte, choix des dates et du lieu,
                                mise en avant des coups de cœur de la communauté et des destinations populaires.
                              </p>
                            </>
                          ) : idx === 2 ? (
                            <>
                              <p>
                                Liste des bateaux: cette page répertorie tous les bateaux du site avec leurs caractéristiques principales et la
                                possibilité de les ajouter en favoris. Un système de tri visible permet de trier par prix et par nombre de personnes,
                                et une barre de recherche permet de trouver un bateau par son nom.
                              </p>
                            </>
                          ) : idx === 3 ? (
                            <>
                              <p>
                                Réservation bateau: page où l'on peut réserver avec un descriptif complet du bateau (prix, présence d'un skipper,
                                équipements et caractéristiques). Le paiement est géré de manière sécurisée via Stripe.
                              </p>
                            </>
                          ) : idx === 4 ? (
                            <>
                              <p>
                                Owner dashboard: plusieurs fonctionnalités comme ajouter un bateau, le modifier ou le supprimer, gérer son calendrier,
                                visualiser les réservations et voir les revenus générés par celles‑ci.
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                Description de l’écran et de son rôle dans le parcours utilisateur (recherche, réservation, messagerie, etc.).
                              </p>
                              <p className="mt-2">Points notables: performance, accessibilité, feedback en temps réel et cas d’erreurs traités.</p>
                            </>
                          )}
                        </div>
                      </Reveal>
                      <Reveal className="reveal-x-right order-2 md:order-none">
                        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm">
                          <img src={src} alt={`${project.title} - capture ${idx + 2}`} className="w-full h-auto object-cover" loading="lazy" />
                        </div>
                      </Reveal>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* divider */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

          {/* Features section intentionally removed per demande */}

          {/* End content */}
        </div>
      </section>
    );
  }

  // Custom long-form layout for ClickYourFlat
  if (project.slug === 'clickyourflat') {
    const gallery = Array.isArray(project.gallery) ? project.gallery : [project.image].filter(Boolean);
    const hero = project.image || gallery[0];

    return (
      <section className="py-14 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-900/30 dark:text-primary-200 dark:border-primary-800">Étude de cas</div>
              <h1 className="mt-2 text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-primary-300 dark:to-gray-200">{project.title}</h1>
            </div>
            <Link to="/" className="text-sm px-4 py-2 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-[#121b33]">← Retour</Link>
          </div>

          {/* Hero */}
          {hero && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm mb-6 bg-gray-100 dark:bg-[#0b1226]">
              <img src={hero} alt={`${project.title} - visuel`} className="w-full h-auto object-contain max-h-[70vh]" />
            </div>
          )}

          {/* Tech stack */}
          <div className="mb-6">
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0b1226]/60 backdrop-blur px-3 py-2">
              <TagList tags={project.tags} extraTags={project.extraTags} />
            </div>
          </div>

          {/* Narrative */}
          <div className="text-gray-700 dark:text-gray-200 leading-relaxed space-y-5">
            <Reveal className="reveal-x-left">
              <p>
                ClickYourFlat est une plateforme vitrine et opérationnelle pour la gestion et la conciergerie d'appartements. 
                L'objectif est de présenter clairement l'offre (conciergerie type Airbnb), de capter des leads via des formulaires 
                et d'orienter rapidement l'utilisateur vers les services clés.
              </p>
            </Reveal>
            <Reveal className="reveal-x-right">
              <p>
                Le site repose sur WordPress (thème personnalisé et modules optimisés), avec des intégrations spécifiques en PHP, 
                des interactions front en jQuery, et une base MySQL. Un soin particulier a été apporté à la performance, au SEO 
                (balises méta, sitemap, optimisation des médias) et à l'accessibilité.
              </p>
            </Reveal>
          </div>

          {/* Features section intentionally removed per demande */}

          {/* Gallery (if more images are added later) */}
          {gallery.length > 1 && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gallery.slice(1).map((src, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm bg-white dark:bg-dark-card">
                  <img src={src} alt={`${project.title} - capture ${i + 2}`} className="w-full h-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {project.liveUrl && (
            <div className="mt-10">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Consulter le site
              </a>
            </div>
          )}

        </div>
      </section>
    );
  }

  // Default compact layout for other projects
  return (
    <section className="py-14 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
          <Link to="/" className="text-sm px-4 py-2 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-[#121b33]">← Retour</Link>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-border">
          <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{project.description}</p>
            <TagList tags={project.tags} extraTags={project.extraTags} />
            {project.liveUrl && (
              <div className="mt-5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Consulter
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
