import React, { useState } from 'react';
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
          className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors cursor-pointer"
        >
          {t}
        </span>
      ))}

      {expanded && (extraTags || []).map((et, i) => (
        <span
          key={`et-${i}`}
          className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors cursor-pointer"
        >
          {et}
        </span>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-200 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors cursor-pointer"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-primary-300 dark:to-gray-200">Portfolio</h2>
          <p className="text-gray-500 mt-2">Quelques projets récents</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="group relative">
              {/* Gradient ring card */}
              <div className="bg-gradient-to-br from-primary-200/70 via-white to-fuchsia-200/70 p-[1px] rounded-2xl shadow-sm">
                <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-100/60 dark:border-dark-border transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  {/* Image with zoom */}
                  <div className="relative h-44">
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white font-semibold drop-shadow">{p.title}</h3>
                      <Link to={`/projects/${p.slug}`} className="text-xs px-3 py-1 rounded-full bg-white/90 text-gray-900 hover:bg-white">Voir</Link>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="px-5 py-4">
                    <TagList tags={p.tags} extraTags={p.extraTags} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
