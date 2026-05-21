export const unsplash = {
  hero: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
  atelier: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80",
  salon: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
  bois: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  cuisine: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
  bureau: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
} as const;

export const stats = [
  { value: 200, suffix: "+", label: "Projets réalisés" },
  { value: 2, suffix: " ans", label: "D'expérience" },
  { value: 3000, suffix: "m²", label: "Atelier de production" },
  { value: 100, suffix: "%", label: "Fabrication locale" },
] as const;

export const services = [
  {
    title: "Mobilier résidentiel",
    description: "Salons, chambres et cuisines pensés pour votre quotidien.",
    icon: "sofa",
    tags: ["Sur mesure", "Résidentiel", "Bois massif"],
  },
  {
    title: "Mobilier de bureau",
    description: "Bureaux, rangements et open space pour équipes productives.",
    icon: "briefcase",
    tags: ["Open space", "Ergonomie", "Entreprises"],
  },
  {
    title: "Aménagement commercial",
    description: "Hôtels, restaurants et boutiques : image de marque + durabilité.",
    icon: "store",
    tags: ["Retail", "Hôtellerie", "Image de marque"],
  },
  {
    title: "Rénovation & transformation",
    description: "Donnez une seconde vie à vos meubles existants avec nos artisans.",
    icon: "refresh",
    tags: ["Seconde vie", "Artisanal", "Économie circulaire"],
  },
  {
    title: "Conseil décoration",
    description: "Harmonie des matériaux, couleurs et volumes pour un intérieur cohérent.",
    icon: "palette",
    tags: ["Couleurs", "Volumes", "Accompagnement"],
  },
  {
    title: "Livraison & installation",
    description: "Prise de mesures, pose et réglages sur site en Guinée.",
    icon: "truck",
    tags: ["Pose", "Conakry", "Clé en main"],
  },
] as const;

export const pillars = [
  {
    n: "01",
    title: "Fabrication locale",
    text: "Nous fabriquons dans notre atelier : pas un catalogue importé.",
  },
  {
    n: "02",
    title: "Sur mesure total",
    text: "Dimensions, finitions et ergonomie adaptées à votre pièce.",
  },
  {
    n: "03",
    title: "Livraison & installation",
    text: "Équipe terrain pour une pose soignée et un rendu impeccable.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Salon sur mesure livré en trois semaines, finitions impeccables. ARREDA a transformé notre séjour.",
    name: "Mamadou",
    role: "Villa — Ratoma",
  },
  {
    quote:
      "Cuisine équipée pour notre appartement : écoute, conseils et respect du budget.",
    name: "Fatoumata",
    role: "Résidence — Kaloum",
  },
  {
    quote:
      "Open space bureau : acoustique, rangements et design moderne. Très professionnel.",
    name: "Ibrahim",
    role: "PME — Hamdallaye",
  },
] as const;

export type {
  ProjectFilter,
  Photo,
  Room,
  Project,
} from "@/lib/realisations";

export {
  projects,
  getProjectBySlug,
  countProjectRooms,
  countProjectPhotos,
  getSimilarProjects,
  projectIsAfterPhotosOnly,
} from "@/lib/realisations";

export const processSteps = [
  {
    emoji: "🌲",
    title: "Sélection du bois",
    text: "Essences locales et importées selon usage, humidité et budget.",
  },
  {
    emoji: "📐",
    title: "Conception & plans",
    text: "Plans 2D/3D et validation des volumes avant fabrication.",
  },
  {
    emoji: "✂️",
    title: "Découpe de précision",
    text: "CNC et scies réglées pour des assemblages nets.",
  },
  {
    emoji: "🔨",
    title: "Assemblage artisanal",
    text: "Collage, vissage et structure par nos menuisiers.",
  },
  {
    emoji: "🎨",
    title: "Finitions & vernis",
    text: "Teintes, laques et protections adaptées au climat.",
  },
  {
    emoji: "✅",
    title: "Contrôle qualité",
    text: "Ajustements, alignements et tests de stabilité.",
  },
  {
    emoji: "🚚",
    title: "Livraison & installation",
    text: "Transport sécurisé et pose sur site à Conakry.",
  },
] as const;

export const equipment = [
  { title: "CNC", text: "Découpe complexe et répétabilité sur séries." },
  { title: "Scie à table", text: "Coupe droite précise pour panneaux et massifs." },
  { title: "Ponceuse", text: "Surfaces prêtes pour vernis sans défauts." },
  { title: "Fraiseuse", text: "Rainures, feuillures et assemblages techniques." },
] as const;
