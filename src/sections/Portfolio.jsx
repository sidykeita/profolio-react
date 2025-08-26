import React, { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

// Inline component to manage expandable tag chips per project card
const TagList = ({ tags = [], extraTags = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const keyTags = (tags || []).filter((t) => t !== '+');
  const hasMore = (tags || []).includes('+') && (extraTags || []).length > 0;

  return (
    <div className="flex flex-wrap gap-2">
      {keyTags.map((t, idx) => (
        <span
          key={`t-${idx}`}
          className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-600 dark:hover:text-white dark:hover:border-primary-600 transition-colors cursor-pointer"
        >
          {t}
        </span>
      ))}

      {expanded && (extraTags || []).map((et, i) => (
        <span
          key={`et-${i}`}
          className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-600 dark:hover:text-white dark:hover:border-primary-600 transition-colors cursor-pointer"
        >
          {et}
        </span>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-200 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-600 dark:hover:text-white dark:hover:border-primary-600 transition-colors cursor-pointer"
          aria-expanded={expanded}
          aria-label={expanded ? 'Réduire les technologies' : 'Afficher plus de technologies'}
        >
          {expanded ? '-' : '+'}
        </button>
      )}
    </div>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-16 bg-gray-50 dark:bg-dark-bg">
      <Reveal as="div" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-600 to-amber-400 bg-clip-text text-transparent dark:from-white dark:via-primary-400 dark:to-yellow-300">Projets</h2>
          {/* <p className="text-gray-500 mt-2">Quelques projets récents</p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter((p) => !p.hidden).map((p, i) => (
            <div key={i} className="group relative h-full">
              {/* Card inspired by model */}
              <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Header: old design with fixed height and cover */}
                {p.slug === 'sailingloc' && p.image ? (
                  <div className="relative h-32 overflow-hidden bg-gray-100 dark:bg-[#0b1226]">
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ) : p.slug === 'patinette' && p.image ? (
                  <div className="relative h-32 overflow-hidden bg-gray-100 dark:bg-[#0b1226]">
                    {/* Static single image, no hover crossfade */}
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ) : Array.isArray(p.gallery) && p.gallery.length > 0 ? (
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={p.gallery[0]}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                      loading="lazy"
                    />
                    <img
                      src={p.gallery[1] || p.gallery[0]}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                ) : p.image ? (
                  <div className="relative h-32 overflow-hidden">
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-tr from-primary-800 via-primary-600 to-amber-400 opacity-90 dark:opacity-100" />
                )}

                {/* Body */}
                <div className="flex-1 px-5 py-4">
                  <h3 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-1">{p.title}</h3>
                  {p.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{p.description}</p>
                  )}

                  <div className="mb-4">
                    <TagList tags={p.tags} extraTags={p.extraTags} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {p.slug === 'sailingloc' ? (
                      <Link
                        to={`/projects/${p.slug}`}
                        className="px-3 py-1.5 text-xs rounded-full bg-slate-500 text-white shadow-sm hover:bg-slate-600 transition-colors dark:bg-slate-500/80 dark:hover:bg-slate-400/80"
                      >
                        Détails
                      </Link>
                    ) : (p.slug === 'clickyourflat' || p.slug === 'blog') ? (
                      <>
                        <Link
                          to={`/projects/${p.slug}`}
                          className="px-3 py-1.5 text-xs rounded-full bg-slate-500 text-white shadow-sm hover:bg-slate-600 transition-colors dark:bg-slate-500/80 dark:hover:bg-slate-400/80"
                        >
                          Détails
                        </Link>
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 text-xs rounded-full btn-gradient-violet text-white shadow-sm"
                          >
                            Consulter
                          </a>
                        )}
                      </>
                    ) : p.slug === 'patinette' ? (
                      <Link
                        to={`/projects/${p.slug}`}
                        className="px-3 py-1.5 text-xs rounded-full bg-slate-500 text-white shadow-sm hover:bg-slate-600 transition-colors dark:bg-slate-500/80 dark:hover:bg-slate-400/80"
                      >
                        Détails
                      </Link>
                    ) : p.slug === 'application-meteo' ? (
                      <Link
                        to={`/projects/${p.slug}`}
                        className="px-3 py-1.5 text-xs rounded-full bg-slate-500 text-white shadow-sm hover:bg-slate-600 transition-colors dark:bg-slate-500/80 dark:hover:bg-slate-400/80"
                      >
                        Détails
                      </Link>
                    ) : p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs rounded-full btn-gradient-violet text-white shadow-sm"
                      >
                        Consulter
                      </a>
                    ) : (
                      <>
                        {p.live ? (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 text-xs rounded-full btn-gradient-violet text-white shadow-sm"
                          >
                            Live
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="px-3 py-1.5 text-xs rounded-full bg-primary-600/50 text-white/80 cursor-not-allowed"
                          >
                            Live
                          </button>
                        )}

                        {p.code ? (
                          <a
                            href={p.code}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 text-xs rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            Code
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="px-3 py-1.5 text-xs rounded-full bg-gray-400/40 text-gray-700/70 dark:text-gray-300/70 cursor-not-allowed"
                          >
                            Code
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default Portfolio;
