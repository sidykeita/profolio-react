// Central project catalog to be reused by Portfolio and ProjectDetail
// Base images (handled by Vite's asset pipeline)
const boatImg = new URL("../images/Capture d'écran 2025-08-21 141355.png", import.meta.url).href;
const portraitImg = new URL("../images/Capture d'écran 2025-04-28 034928.png", import.meta.url).href;

// SailingLoc gallery assets — auto‑import everything in the folder so renames are picked up automatically
// This adapts to your changes without editing code each time
const sailingGlobs = import.meta.glob('../images/sailingloc/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  as: 'url',
});

const sailingAll = Object.values(sailingGlobs);
// Pick a cover image that matches "home" but not "home2" when possible; else fallback to "home2"; else first
const sailingCover =
  sailingAll.find((u) => /home/i.test(u) && !/home2/i.test(u)) ||
  sailingAll.find((u) => /home2/i.test(u)) ||
  sailingAll[0];
let sailingGallery = sailingAll.filter((u) => u !== sailingCover);
// Ensure the 1st image (index 0) is the map screen if available
{
  const mapRe = /(carte|map|destinations?)/i;
  const mapIdx = sailingGallery.findIndex((u) => mapRe.test(u));
  if (mapIdx > -1 && mapIdx !== 0) {
    const [mapImg] = sailingGallery.splice(mapIdx, 1);
    sailingGallery = [mapImg, ...sailingGallery];
  }
}

// Ensure the 2nd image (index 1) is the homepage "home2" for the hover preview
const home2Index = sailingGallery.findIndex((u) => /home2/i.test(u));
if (home2Index > -1) {
  const [home2Img] = sailingGallery.splice(home2Index, 1);
  // Insert at position 1 (second image) if there is at least one other image; else just push
  if (sailingGallery.length >= 1) {
    sailingGallery = [sailingGallery[0], home2Img, ...sailingGallery.slice(1)];
  } else {
    sailingGallery = [home2Img];
  }
}

// (moved below, after owner block)

// Ensure the 3rd image (index 2 overall => index 1 in slice(1) mapping) is the destinations screen
const destIdx = sailingGallery.findIndex((u) => /destinations?/i.test(u));
if (destIdx > -1) {
  const [destImg] = sailingGallery.splice(destIdx, 1);
  // We want it to be at gallery index 2 overall. If gallery has >=2 items, place after index 1
  if (sailingGallery.length >= 2) {
    sailingGallery = [sailingGallery[0], sailingGallery[1], destImg, ...sailingGallery.slice(2)];
  } else {
    sailingGallery.push(destImg);
  }
}

// Ensure the 5th image (index 4 overall => Aperçu #5 after slice(1)) is the boat reservation page
// Prefer filenames that include both reservation and boat terms; else fallback to generic reservation/payment terms
{
  const boatReservationRe = /(r[ée]servation|reserv|reserve|booking).*(bateau|boat|batea)|\b(bateau|boat|batea).*(r[ée]servation|reserv|reserve|booking)/i;
  const reservationRe = /(r[ée]servation|reserv|reserve|booking|paiement|payment|checkout|stripe)/i;
  let rIdx = sailingGallery.findIndex((u) => boatReservationRe.test(u));
  if (rIdx === -1) rIdx = sailingGallery.findIndex((u) => reservationRe.test(u));
  if (rIdx > -1) {
    const [rImg] = sailingGallery.splice(rIdx, 1);
    if (sailingGallery.length >= 4) {
      sailingGallery = [
        sailingGallery[0],
        sailingGallery[1],
        sailingGallery[2],
        sailingGallery[3],
        rImg,
        ...sailingGallery.slice(4)
      ];
    } else {
      sailingGallery.push(rImg);
    }
  }
}

// Ensure the 6th image (index 5 overall => Aperçu #6 after slice(1)) is the owner dashboard
{
  const ownerRe = /(owner|propri[ée]taire).*(dashboard)|\b(dashboard).*(owner|propri[ée]taire)|\b(owner[-_ ]?dashboard|tableau[-_ ]de[-_ ]bord)/i;
  const dashIdx = sailingGallery.findIndex((u) => ownerRe.test(u));
  if (dashIdx > -1) {
    const [dashImg] = sailingGallery.splice(dashIdx, 1);
    if (sailingGallery.length >= 5) {
      sailingGallery = [
        sailingGallery[0],
        sailingGallery[1],
        sailingGallery[2],
        sailingGallery[3],
        sailingGallery[4],
        dashImg,
        ...sailingGallery.slice(5)
      ];
    } else {
      sailingGallery.push(dashImg);
    }
  }
}

// Ensure the 7th image (index 6 overall => Aperçu #7 after slice(1)) is the admin dashboard.
// Runs AFTER owner placement and does not create placeholders. It only positions if there are enough images.
{
  const adminRe = /admin.*dashboard/i;
  const targetIndex = 6; // Aperçu #7
  const adminIdx = sailingGallery.findIndex((u) => adminRe.test(u));
  if (adminIdx > -1 && sailingGallery.length >= targetIndex + 1 && adminIdx !== targetIndex) {
    const [adminImg] = sailingGallery.splice(adminIdx, 1);
    sailingGallery.splice(targetIndex, 0, adminImg);
  }
}

// Debug (dev only): verify gallery length and positions
if (import.meta && import.meta.env && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log('[SailingLoc] gallery length =', sailingGallery.length, 'index6(Aperçu#7)=', sailingGallery[6]);
}

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
