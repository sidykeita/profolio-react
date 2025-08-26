// Central project catalog to be reused by Portfolio and ProjectDetail
// Base images (handled by Vite's asset pipeline)
const boatImg = new URL("../images/Capture d'écran 2025-08-21 141355.png", import.meta.url).href;
const portraitImg = new URL("../images/Capture d'écran 2025-04-28 034928.png", import.meta.url).href;

// SailingLoc gallery assets — static and always 6 previews. No auto-reordering.
const sailingGlobs = import.meta.glob('../images/sailingloc/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  as: 'url',
});

const sailingAll = Object.values(sailingGlobs);
// Helper to get basenames
const sailingNamed = sailingAll.map((u) => ({ u, name: (u.match(/[^\/\\]+$/) || [u])[0] }));
const byName = (name) => sailingNamed.find((x) => x.name.toLowerCase() === name.toLowerCase())?.u;

// Cover fixed
const sailingCover = byName('home-sailingLoc.png') || sailingAll[0] || boatImg;

// Fixed order of 6 previews. If a file is missing, fill with a neutral placeholder (data URL).
const desiredOrder = [
  'home2.png',
  'destination.png',
  'bateaux-disponible.png',
  'reservation-bateau.png',
  'owner-dashboard.png',
  'admin-dashboard.png',
];

// Minimal neutral placeholder (SVG data URL)
const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750">` +
      `<rect width="100%" height="100%" fill="%23f3f4f6"/>` +
      `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="system-ui,Segoe UI,Roboto,Helvetica,Arial" font-size="28">Aperçu manquant</text>` +
    `</svg>`
  );

const sailingPreviews = desiredOrder.map((n) => byName(n) || placeholder);

// Build gallery as [cover, ...6 previews] so that ProjectDetail uses gallery.slice(1) and always gets 6 items
const sailingGallery = [sailingCover, ...sailingPreviews];

// ClickYourFlat gallery assets
const cyfGlobs = import.meta.glob('../images/clickyourflat/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  as: 'url',
});
const cyfAll = Object.values(cyfGlobs);
const cyfCover =
  cyfAll.find((u) => /home/i.test(u)) ||
  cyfAll[0];
const cyfGallery = cyfAll.filter((u) => u !== cyfCover);

// Patinette gallery assets
const patGlobs = import.meta.glob('../images/patinette/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  as: 'url',
});
const patAll = Object.values(patGlobs);
// Keep original order; pick cover as 1-map* if exists, else common hero terms, else first
const patNamed = patAll.map((u) => ({ u, name: (u.match(/[^\/\\]+$/) || [u])[0] }));
const patCover = (
  patNamed.find((x) => /(copie|copy)/i.test(x.name)) ||
  patNamed.find((x) => /(cover|hero|home)/i.test(x.name)) ||
  patNamed.find((x) => /^1[-_]?map/i.test(x.name)) ||
  patNamed[0]
)?.u;
// Exclude the presentation image ("copie") from the gallery so ailleurs on voit 2.png (et suivantes)
const patGallery = patAll.filter((u) => u !== patCover);

// Blog gallery assets (HTML/CSS/JS)
const blogGlobs = import.meta.glob('../images/blog/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  as: 'url',
});
const blogAll = Object.values(blogGlobs);
const blogCover =
  blogAll.find((u) => /(cover|hero|home)/i.test(u)) ||
  blogAll[0];
const blogGallery = blogAll.filter((u) => u !== blogCover);

// Weather (Météo) gallery assets (HTML/CSS/JS)
const meteoGlobs = import.meta.glob('../images/application-meteo/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  as: 'url',
});
const meteoAll = Object.values(meteoGlobs);
const meteoCover =
  meteoAll.find((u) => /(cover|hero|home)/i.test(u)) ||
  meteoAll[0];
const meteoGallery = meteoAll.filter((u) => u !== meteoCover);

export const projects = [
  {
    slug: 'sailingloc',
    title: '🚤 SailingLoc',
    image: sailingCover || boatImg,
    gallery: sailingGallery,
    // Tags principaux affichés, puis un '+' qui regroupe le reste
    tags: ['React', 'Node.js', 'MongoDB', 'Docker', '+'],
    extraTags: ['Vite', 'Express', 'Vercel', 'Render', 'Firebase Storage', 'Auth', 'Swagger', 'API', 'Postman', 'Jest', 'Locust', 'Git', 'GitHub'],
    description: `Plateforme web de location de bateaux entre particuliers.

SailingLoc permet aux propriétaires de proposer leurs bateaux (voiliers, moteurs) et aux utilisateurs de réserver en ligne. La 2ème image (aperçu \"home2\") représente la page d'accueil où l'on accède aux fonctionnalités clés: créer un compte, choisir ses dates, sélectionner le lieu du bateau, découvrir les coups de cœur de la communauté et les destinations.

Technologies: Front (React + Vite), Back (Node.js/Express), Base de données (MongoDB), Conteneurisation (Docker), Déploiement (Vercel pour le front, Render pour l’API et la DB), Services (Firebase Storage pour le stockage d’images et de fichiers), Documentation (Swagger). Tests via Postman, Jest et tests de charge avec Locust. Collaboration assurée via Git/GitHub (branches, PR).`,
  },
  {
    slug: 'patinette',
    title: '🛴 Patinette',
    image: patCover || portraitImg,
    gallery: patGallery,
    tags: ['WordPress', 'PHP', 'MySQL', 'jQuery', '+'],
    extraTags: ['Thème custom', 'Gutenberg', 'SEO'],
    description:
      "Projet WordPress avec thème entièrement personnalisé (aucun thème enfant ni builder autorisés). Sujet: opérateur de trottinettes en libre‑service à Lyon (géolocalisation, QR code, parc ~2000 trottinettes, disponibilité 24/7, location à l’heure, alarme/capteurs, réseau de recharge par particuliers).",
  },
  {
    slug: 'clickyourflat',
    title: '🏢 ClickYourFlat',
    image: cyfCover || boatImg,
    gallery: cyfGallery,
    tags: ['WordPress', 'PHP', 'MySQL', 'jQuery', '+'],
    extraTags: ['SEO', 'Responsive'],
    liveUrl: 'https://clickyourflat.com/fr',
    description:
      "Plateforme de gestion/location d'appartements. Aperçus: page d'accueil et écrans principaux (ajoutez d'autres images dans src/images/clickyourflat/ pour enrichir la galerie).",
  },
  {
    slug: 'blog',
    title: '📒 Blog',
    image: blogCover || portraitImg,
    gallery: blogGallery,
    tags: ['HTML', 'CSS', 'JavaScript', '+'],
    extraTags: ['Vanilla JS', 'Responsive'],
    liveUrl: 'https://blog-institutf2i.netlify.app',
    description:
      "Mini‑site de blog statique réalisé en HTML/CSS/JS (vanilla). Pages: accueil, articles, détails d’article. Styles responsives et mise en avant typographique. Ajoutez des captures dans src/images/blog/ (la première ou 'cover' sera utilisée comme image de présentation).",
  },
  {
    slug: 'app-mobile',
    title: 'App mobile',
    image: portraitImg,
    hidden: true,
    tags: ['React Native', 'Prototype'],
    description:
      "Prototype d\u2019application mobile illustrant la navigation, l\u2019\u00e9tat global et la gestion des formulaires.",
  },
  {
    slug: 'dashboard-ui',
    title: 'Dashboard UI',
    image: boatImg,
    hidden: true,
    tags: ['Analytics', 'Components'],
    description:
      "Tableau de bord analytique avec composants r\u00e9utilisables, graphiques et filtres.",
  },
  {
    slug: 'application-meteo',
    title: '🌤️ Application météo',
    image: meteoCover || portraitImg,
    gallery: meteoGallery,
    tags: ['HTML', 'CSS', 'JavaScript', 'API', '+'],
    extraTags: ['Fetch', 'OpenWeather', 'Responsive'],
    description:
      "Application météo en HTML/CSS/JS consommant une API (ex: OpenWeather): recherche par ville, températures, état du ciel, humidité et vent, avec design responsive.",
  },
  {
    slug: 'landing-page',
    title: 'Landing page',
    image: portraitImg,
    hidden: true,
    tags: ['Marketing', 'SEO'],
    description:
      "Landing orient\u00e9e SEO avec sections h\u00e9ro, preuves sociales et appel \u00e0 l\u2019action.",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
