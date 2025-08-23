// Central project catalog to be reused by Portfolio and ProjectDetail
// Images (handled by Vite's asset pipeline)
const boatImg = new URL("../images/Capture d'écran 2025-08-21 141355.png", import.meta.url).href;
const portraitImg = new URL("../images/Capture d'écran 2025-04-28 034928.png", import.meta.url).href;

export const projects = [
  {
    slug: 'sailingloc',
    title: '🚤 SailingLoc',
    image: boatImg,
    // Tags principaux affichés, puis un '+' qui regroupe le reste
    tags: ['React', 'Node.js', 'MongoDB', 'Docker', '+'],
    extraTags: ['Vite', 'Express', 'Vercel', 'Render', 'Firebase', 'Auth', 'Notifications', 'Swagger', 'API', 'Postman', 'Jest', 'Locust', 'Git', 'GitHub'],
    description: `Plateforme web de location de bateaux entre particuliers.

SailingLoc permet aux propriétaires de proposer leurs bateaux (voiliers, moteurs) et aux utilisateurs de réserver en ligne. L’application gère les annonces, disponibilités, réservations et paiements sécurisés, avec des espaces dédiés pour propriétaires, locataires et administrateurs.

Technologies: Front (React + Vite), Back (Node.js/Express), Base de données (MongoDB), Conteneurisation (Docker), Déploiement (Vercel pour le front, Render pour l’API et la DB), Services (Firebase pour l’authentification et les notifications), Documentation (Swagger). Tests via Postman, Jest et tests de charge avec Locust. Collaboration assurée via Git/GitHub (branches, PR).`,
  },
  {
    slug: 'app-mobile',
    title: 'App mobile',
    image: portraitImg,
    tags: ['React Native', 'Prototype'],
    description:
      "Prototype d\u2019application mobile illustrant la navigation, l\u2019\u00e9tat global et la gestion des formulaires.",
  },
  {
    slug: 'dashboard-ui',
    title: 'Dashboard UI',
    image: boatImg,
    tags: ['Analytics', 'Components'],
    description:
      "Tableau de bord analytique avec composants r\u00e9utilisables, graphiques et filtres.",
  },
  {
    slug: 'landing-page',
    title: 'Landing page',
    image: portraitImg,
    tags: ['Marketing', 'SEO'],
    description:
      "Landing orient\u00e9e SEO avec sections h\u00e9ro, preuves sociales et appel \u00e0 l\u2019action.",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
