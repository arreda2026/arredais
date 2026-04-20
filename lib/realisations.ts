export type ProjectFilter =
  | "Tous"
  | "Salon"
  | "Cuisine"
  | "Bureau"
  | "Chambre"
  | "Commercial"
  | "Particulier"
  | "Entreprise";

const img = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?w=800&q=80`;

export type Photo = { id: string; url: string; caption?: string };

const p = (
  id: string,
  photoId: string,
  caption?: string
): Photo => ({ id, url: img(photoId), caption });

export type Room = {
  id: string;
  name: string;
  icon: string;
  before: Photo[];
  after: Photo[];
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectFilter;
  clientType: string;
  duration: string;
  year: string;
  coverBefore: string;
  coverAfter: string;
  rooms: Room[];
  description: string;
  tags: string[];
};

const I = {
  salon1: "1555041469-a586c61ea9bc",
  salon2: "1586023492125-27b2c045efd7",
  salon3: "1595520425490-af703f0b2fc6",
  cuisine1: "1556909114-f6e7ad7d3136",
  cuisine2: "1600607687939-ce8a6c25118c",
  cuisine3: "1600585154340-be6161a56a0c",
  bureau1: "1497366216548-37526070297c",
  bureau2: "1524758631624-e2822e304c36",
  bureau3: "1600576331142-8c7fedc728d9",
  chambre1: "1600210492486-724fe5c67fb0",
  chambre2: "1618220179428-86a3698b2498",
  chambre3: "1560185007-cde436f6a4d0",
  loft1: "1502672260266-1c1ef2d93688",
  loft2: "1600566753190-17f0faa2a6e3",
  hotel1: "1631889991528-916487d3d4d5",
  hotel2: "1600607687939-ce8a6c25118c",
  retail1: "1441986300917-64674bd600d8",
  retail2: "1555041469-a586c61ea9bc",
  atelier1: "1504148455328-c376907d081c",
  wood1: "1558618666-fcd25c85cd64",
} as const;

export const projects: Project[] = [
  {
    slug: "villa-kaloum-residentielle",
    title: "Villa Kaloum — rénovation résidentielle",
    location: "Kaloum, Conakry",
    category: "Salon",
    clientType: "Particulier",
    duration: "10 semaines",
    year: "2025",
    coverBefore: img(I.salon1),
    coverAfter: img(I.salon2),
    description:
      "Rénovation complète d’une villa : circulation des volumes, mobilier sur mesure et finitions adaptées au climat maritime.",
    tags: ["Villa", "Résidentiel", "Sur mesure"],
    rooms: [
      {
        id: "salon",
        name: "Salon",
        icon: "🛋️",
        before: [
          p("vk-s-b1", I.salon1, "Ancien séjour saturé"),
          p("vk-s-b2", I.salon3, "Rangements peu fonctionnels"),
        ],
        after: [
          p("vk-s-a1", I.salon2, "Banquette intégrée"),
          p("vk-s-a2", I.loft1, "Bibliothèque sur mesure"),
        ],
      },
      {
        id: "cuisine",
        name: "Cuisine",
        icon: "🍳",
        before: [
          p("vk-c-b1", I.cuisine1, "Cuisine fermée"),
          p("vk-c-b2", I.wood1, "Plan de travail obsolète"),
        ],
        after: [
          p("vk-c-a1", I.cuisine2, "Îlot central"),
          p("vk-c-a2", I.cuisine3, "Façades sans poignées"),
          p("vk-c-a3", I.salon2, "Ouverture sur le séjour"),
        ],
      },
      {
        id: "chambre",
        name: "Chambre principale",
        icon: "🛏️",
        before: [p("vk-ch-b1", I.chambre3, "Dressing standard"), p("vk-ch-b2", I.chambre1)],
        after: [p("vk-ch-a1", I.chambre1, "Suite avec tête de lit"), p("vk-ch-a2", I.chambre2)],
      },
      {
        id: "bureau",
        name: "Bureau",
        icon: "💼",
        before: [p("vk-bu-b1", I.bureau1), p("vk-bu-b2", I.bureau3)],
        after: [p("vk-bu-a1", I.bureau2), p("vk-bu-a2", I.loft2)],
      },
    ],
  },
  {
    slug: "penthouse-matoto",
    title: "Penthouse Matoto — volumes contemporains",
    location: "Matoto, Conakry",
    category: "Chambre",
    clientType: "Particulier",
    duration: "8 semaines",
    year: "2025",
    coverBefore: img(I.loft1),
    coverAfter: img(I.loft2),
    description:
      "Un penthouse pensé comme un loft : chambres suites, salons ouverts et matériaux sobres pour maximiser la lumière.",
    tags: ["Penthouse", "Contemporain"],
    rooms: [
      {
        id: "sejour",
        name: "Grand séjour",
        icon: "🛋️",
        before: [p("pm-s-b1", I.loft1), p("pm-s-b2", I.salon1)],
        after: [p("pm-s-a1", I.salon2), p("pm-s-a2", I.loft2)],
      },
      {
        id: "suite",
        name: "Suite parentale",
        icon: "🛏️",
        before: [p("pm-su-b1", I.chambre1), p("pm-su-b2", I.chambre3)],
        after: [p("pm-su-a1", I.chambre2), p("pm-su-a2", I.chambre1)],
      },
      {
        id: "cuisine2",
        name: "Cuisine ouverte",
        icon: "🍳",
        before: [p("pm-c-b1", I.cuisine1), p("pm-c-b2", I.cuisine1)],
        after: [p("pm-c-a1", I.cuisine2), p("pm-c-a2", I.cuisine3)],
      },
      {
        id: "terrasse",
        name: "Loggia",
        icon: "🌿",
        before: [p("pm-t-b1", I.salon3), p("pm-t-b2", I.loft1)],
        after: [p("pm-t-a1", I.salon2), p("pm-t-a2", I.loft2)],
      },
      {
        id: "bureau-ph",
        name: "Coin bureau",
        icon: "💼",
        before: [p("pm-b-b1", I.bureau3)],
        after: [p("pm-b-a1", I.bureau2), p("pm-b-a2", I.bureau1)],
      },
    ],
  },
  {
    slug: "restaurant-yattaya",
    title: "Restaurant Yattaya — espace convivial",
    location: "Yattaya, Conakry",
    category: "Commercial",
    clientType: "Entreprise",
    duration: "6 semaines",
    year: "2025",
    coverBefore: img(I.hotel1),
    coverAfter: img(I.salon2),
    description:
      "Salle principale, bar et terrasse couverte : bois thermotraité, banquettes et identité visuelle intégrée.",
    tags: ["Restaurant", "HORECA"],
    rooms: [
      {
        id: "salle",
        name: "Salle principale",
        icon: "🍽️",
        before: [p("ry-s-b1", I.hotel1), p("ry-s-b2", I.retail1)],
        after: [p("ry-s-a1", I.salon2), p("ry-s-a2", I.hotel2)],
      },
      {
        id: "bar",
        name: "Bar",
        icon: "🍸",
        before: [p("ry-ba-b1", I.cuisine1), p("ry-ba-b2", I.wood1)],
        after: [p("ry-ba-a1", I.cuisine3), p("ry-ba-a2", I.cuisine2)],
      },
      {
        id: "terrasse-r",
        name: "Terrasse",
        icon: "☀️",
        before: [p("ry-t-b1", I.salon3)],
        after: [p("ry-t-a1", I.loft2), p("ry-t-a2", I.salon2)],
      },
    ],
  },
  {
    slug: "coworking-almamya",
    title: "Coworking Almamya — productivité & acoustique",
    location: "Kaloum, Conakry",
    category: "Bureau",
    clientType: "Entreprise",
    duration: "7 semaines",
    year: "2024",
    coverBefore: img(I.bureau1),
    coverAfter: img(I.bureau2),
    description:
      "Cabines téléphoniques, hot-desks et salles de réunion : parcours fluides et matériaux ABSORBants pour open space.",
    tags: ["Bureau", "Tertiaire", "Acoustique"],
    rooms: [
      {
        id: "openspace",
        name: "Open space",
        icon: "🪑",
        before: [p("ca-o-b1", I.bureau1), p("ca-o-b2", I.bureau3)],
        after: [p("ca-o-a1", I.bureau2), p("ca-o-a2", I.bureau1)],
      },
      {
        id: "reunion",
        name: "Salle de réunion",
        icon: "📊",
        before: [p("ca-r-b1", I.bureau3), p("ca-r-b2", I.loft1)],
        after: [p("ca-r-a1", I.bureau2), p("ca-r-a2", I.salon2)],
      },
      {
        id: "accueil",
        name: "Accueil",
        icon: "✨",
        before: [p("ca-ac-b1", I.retail1)],
        after: [p("ca-ac-a1", I.hotel2), p("ca-ac-a2", I.salon2)],
      },
      {
        id: "phone",
        name: "Cabines focus",
        icon: "🔇",
        before: [p("ca-p-b1", I.atelier1), p("ca-p-b2", I.bureau1)],
        after: [p("ca-p-a1", I.bureau3), p("ca-p-a2", I.loft2)],
      },
    ],
  },
  {
    slug: "residence-kippe-familiale",
    title: "Résidence Kipé — cœur de maison",
    location: "Kipé, Conakry",
    category: "Cuisine",
    clientType: "Particulier",
    duration: "9 semaines",
    year: "2025",
    coverBefore: img(I.cuisine1),
    coverAfter: img(I.cuisine2),
    description:
      "Circulation jour/nuit repensée : cuisine centrale, cellier et salon reliés pour une famille nombreuse.",
    tags: ["Résidence", "Famille"],
    rooms: [
      {
        id: "cuisine-rk",
        name: "Cuisine centrale",
        icon: "🍳",
        before: [p("rk-c-b1", I.cuisine1), p("rk-c-b2", I.wood1)],
        after: [p("rk-c-a1", I.cuisine2), p("rk-c-a2", I.cuisine3)],
      },
      {
        id: "salon-rk",
        name: "Salon",
        icon: "🛋️",
        before: [p("rk-s-b1", I.salon1), p("rk-s-b2", I.salon3)],
        after: [p("rk-s-a1", I.salon2), p("rk-s-a2", I.loft1)],
      },
      {
        id: "ch1",
        name: "Chambre enfants",
        icon: "🧸",
        before: [p("rk-e-b1", I.chambre3), p("rk-e-b2", I.chambre1)],
        after: [p("rk-e-a1", I.chambre2), p("rk-e-a2", I.chambre1)],
      },
      {
        id: "ch2",
        name: "Chambre invités",
        icon: "🛏️",
        before: [p("rk-i-b1", I.chambre1)],
        after: [p("rk-i-a1", I.chambre2), p("rk-i-a2", I.chambre3)],
      },
    ],
  },
  {
    slug: "boutique-miniere",
    title: "Boutique Minière — vitrine & stock",
    location: "Minière, Conakry",
    category: "Commercial",
    clientType: "Entreprise",
    duration: "5 semaines",
    year: "2025",
    coverBefore: img(I.retail1),
    coverAfter: img(I.retail2),
    description:
      "Parcours client, vitrines basses et réserve invisible : modularité pour les collections saisonnières.",
    tags: ["Retail", "Modulaire"],
    rooms: [
      {
        id: "vitrine",
        name: "Vitrine",
        icon: "🪟",
        before: [p("bm-v-b1", I.retail1), p("bm-v-b2", I.hotel1)],
        after: [p("bm-v-a1", I.retail2), p("bm-v-a2", I.salon2)],
      },
      {
        id: "parcours",
        name: "Parcours vente",
        icon: "🛍️",
        before: [p("bm-p-b1", I.salon1), p("bm-p-b2", I.loft1)],
        after: [p("bm-p-a1", I.hotel2), p("bm-p-a2", I.loft2)],
      },
      {
        id: "reserve",
        name: "Réserve",
        icon: "📦",
        before: [p("bm-r-b1", I.atelier1)],
        after: [p("bm-r-a1", I.bureau1), p("bm-r-a2", I.wood1)],
      },
      {
        id: "caisse",
        name: "Accueil caisse",
        icon: "💳",
        before: [p("bm-c-b1", I.bureau3)],
        after: [p("bm-c-a1", I.bureau2)],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function countProjectRooms(project: Project): number {
  return project.rooms.length;
}

export function countProjectPhotos(project: Project): number {
  return project.rooms.reduce(
    (acc, r) => acc + r.before.length + r.after.length,
    0
  );
}

export function getSimilarProjects(
  project: Project,
  limit = 3
): Project[] {
  const same = projects.filter(
    (p) => p.slug !== project.slug && p.category === project.category
  );
  if (same.length >= limit) return same.slice(0, limit);
  const others = projects.filter(
    (p) => p.slug !== project.slug && !same.includes(p)
  );
  return [...same, ...others].slice(0, limit);
}
