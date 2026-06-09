export type ProjectFilter =
  | "Tous"
  | "Salon"
  | "Cuisine"
  | "Bureau"
  | "Chambre"
  | "Commercial"
  | "Particulier"
  | "Entreprise";

export type Photo = { id: string; url: string; caption?: string };

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
  photosNote?: string;
};

/** Couverture : fichier 00X dans le dossier (doit exister dans la liste galerie). */
function localCover(slug: string, index: number) {
  return `/Realisation/${slug}/${String(index).padStart(3, "0")}.jpeg`;
}

/**
 * Galerie à partir des noms de fichiers réellement présents dans `public/Realisation/{slug}/`.
 * Mettre à jour la constante `*_FILES` du dossier après ajout/suppression d’images.
 */
function localGalleryFiles(slug: string, files: readonly string[]): Photo[] {
  return files.map((name) => ({
    id: `${slug}-g-${name.replace(/[^a-zA-Z0-9]/g, "")}`,
    url: `/Realisation/${slug}/${name}`,
  }));
}

const KANKAN_FILES = [
  "001.jpeg",
  "003.jpeg",
  "005.jpeg",
  "006.jpeg",
  "007.jpeg",
  "008.jpeg",
  "009.jpeg",
  "010.jpeg",
  "011.jpeg",
  "012.jpeg",
  "013.jpeg",
  "014.jpeg",
  "015.jpeg",
  "016.jpeg",
  "017.jpeg",
  "018.jpeg",
  "019.jpeg",
  "021.jpeg",
  "022.jpeg",
  "023.jpeg",
  "024.jpeg",
  "025.jpeg",
  "026.jpeg",
  "027.jpeg",
  "028.jpeg",
  "029.jpeg",
  "030.jpeg",
  "031.jpeg",
  "032.jpeg",
  "033.jpeg",
  "034.jpeg",
  "035.jpeg",
  "036.jpeg",
  "038.jpeg",
  "039.jpeg",
  "040.jpeg",
  "041.jpeg",
  "042.jpeg",
  "043.jpeg",
  "044.jpeg",
  "045.jpeg",
  "046.jpeg",
] as const;

const MAFEREA_FILES = [
  "020.jpeg",
  "021.jpeg",
  "023.jpeg",
  "024.jpeg",
  "025.jpeg",
  "027.jpeg",
  "030.jpeg",
  "031.jpeg",
  "032.jpeg",
  "033.jpeg",
  "034.jpeg",
  "035.jpeg",
  "036.jpeg",
  "037.jpeg",
  "038.jpeg",
  "039.jpeg",
  "040.jpeg",
  "041.jpeg",
  "042.jpeg",
  "043.jpeg",
  "044.jpeg",
  "045.jpeg",
  "046.jpeg",
] as const;

const BILLY_CONDE_FILES = [
  "002.jpeg",
  "004.jpeg",
  "005.jpeg",
  "006.jpeg",
  "007.jpeg",
  "008.jpeg",
  "009.jpeg",
  "010.jpeg",
  "011.jpeg",
  "013.jpeg",
  "014.jpeg",
  "015.jpeg",
  "017.jpeg",
  "018.jpeg",
  "019.jpeg",
  "020.jpeg",
  "021.jpeg",
  "027.jpeg",
  "028.jpeg",
  "029.jpeg",
  "030.jpeg",
] as const;

const RESIDENCE_2000_FILES = [
  "002.jpeg",
  "003.jpeg",
  "005.jpeg",
  "007.jpeg",
  "008.jpeg",
  "009.jpeg",
  "010.jpeg",
  "011.jpeg",
  "012.jpeg",
] as const;

const YIMBAYA_FILES = [
  "001.jpeg",
  "002.jpeg",
  "003.jpeg",
] as const;

const CAMAYENNE_FILES = [
  "001.jpeg",
  "002.jpeg",
] as const;

const localRealisationProjects: Project[] = [
  {
    slug: "kankan",
    title: "Réalisation — Kankan",
    location: "Kankan, Guinée",
    category: "Salon",
    clientType: "Particulier",
    duration: "Sur mesure",
    year: "2026",
    coverBefore: localCover("kankan", 1),
    coverAfter: localCover("kankan", 1),
    description:
      "Mobilier et aménagement livrés sur site.",
    tags: ["Résidentiel", "Sur mesure"],
    rooms: [
      {
        id: "galerie",
        name: "Photos du chantier",
        icon: "📷",
        before: [],
        after: localGalleryFiles("kankan", KANKAN_FILES),
      },
    ],
  },
  {
    slug: "maferea",
    title: "Réalisation — Maféréa",
    location: "Maféréa, Guinée",
    category: "Cuisine",
    clientType: "Particulier",
    duration: "Sur mesure",
    year: "2026",
    coverBefore: localCover("maferea", 40),
    coverAfter: localCover("maferea", 40),
    description:
      "Cuisine et espaces de vie livrés clés en main. Galerie prise après la pose.",
    tags: ["Cuisine", "Résidentiel"],
    rooms: [
      {
        id: "galerie",
        name: "Photos du chantier",
        icon: "📷",
        before: [],
        after: localGalleryFiles("maferea", MAFEREA_FILES),
      },
    ],
  },
  {
    slug: "billy-conde",
    title: "Réalisation — Billy Conde",
    location: "Conakry, Guinée",
    category: "Chambre",
    clientType: "Particulier",
    duration: "Sur mesure",
    year: "2026",
    coverBefore: localCover("billy-conde", 11),
    coverAfter: localCover("billy-conde", 11),
    description:
      "Aménagement intérieur livré sur mesure. Photos après chantier.",
    tags: ["Résidentiel", "Dressing"],
    rooms: [
      {
        id: "galerie",
        name: "Photos du chantier",
        icon: "📷",
        before: [],
        after: localGalleryFiles("billy-conde", BILLY_CONDE_FILES),
      },
    ],
  },
  {
    slug: "residence-2000",
    title: "Résidence 2000",
    location: "Conakry, Guinée",
    category: "Salon",
    clientType: "Particulier",
    duration: "Sur mesure",
    year: "2026",
    coverBefore: localCover("residence-2000", 8),
    coverAfter: localCover("residence-2000", 8),
    description:
      "Projet résidentiel : finitions et mobilier ARREDA. Galerie après livraison.",
    photosNote: "Clichés pris pendant et après la livraison du chantier.",
    tags: ["Résidence", "Sur mesure"],
    rooms: [
      {
        id: "galerie",
        name: "Photos du chantier",
        icon: "📷",
        before: [],
        after: localGalleryFiles("residence-2000", RESIDENCE_2000_FILES),
      },
    ],
  },
  {
    slug: "yimbaya",
    title: "Réalisation — Yimbaya",
    location: "Yimbaya, Guinée",
    category: "Salon",
    clientType: "Particulier",
    duration: "Sur mesure",
    year: "2026",
    coverBefore: localCover("yimbaya", 2),
    coverAfter: localCover("yimbaya", 2),
    description:
      "Sélection de clichés après réalisation du chantier.",
    tags: ["Résidentiel"],
    rooms: [
      {
        id: "galerie",
        name: "Photos du chantier",
        icon: "📷",
        before: [],
        after: localGalleryFiles("yimbaya", YIMBAYA_FILES),
      },
    ],
  },
  {
    slug: "camayenne",
    title: "Réalisation — Camayenne",
    location: "Camayenne, Conakry",
    category: "Bureau",
    clientType: "Particulier",
    duration: "Sur mesure",
    year: "2026",
    coverBefore: localCover("camayenne", 1),
    coverAfter: localCover("camayenne", 1),
    description:
      "Aménagement livré : photos prises après la pose (inclut des clichés d’archives regroupés ici).",
    tags: ["Conakry", "Sur mesure"],
    rooms: [
      {
        id: "galerie",
        name: "Photos du chantier",
        icon: "📷",
        before: [],
        after: localGalleryFiles("camayenne", CAMAYENNE_FILES),
      },
    ],
  },
];

export const projects: Project[] = localRealisationProjects;

/** Projet sans photos « avant » : uniquement galerie après chantier. */
export function projectIsAfterPhotosOnly(project: Project): boolean {
  if (project.rooms.length === 0) return false;
  return project.rooms.every((r) => r.before.length === 0);
}

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
