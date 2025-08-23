import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';

// Local TagList for the detail page with expandable '+'/'-' behavior
const TagList = ({ tags = [], extraTags = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const keyTags = (tags || []).filter((t) => t !== '+');
  const hasMore = (tags || []).includes('+') && (extraTags || []).length > 0;

  return (
    <div className="flex flex-wrap gap-2">
      {keyTags.map((t, idx) => (
        <span key={`t-${idx}`} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors">{t}</span>
      ))}
      {expanded && (extraTags || []).map((et, i) => (
        <span key={`et-${i}`} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors">{et}</span>
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-dark-bg dark:text-gray-200 border border-gray-200 dark:border-dark-border hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
