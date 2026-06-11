/** Images dans `public/personel/` — noms de fichiers = poste occupé. */
export const PERSONNEL_FOLDER = "personel";

export type PersonnelMember = {
  id: string;
  /** Nom du fichier tel qu’enregistré dans `public/personel/`. */
  file: string;
};

export const personnelMembers: readonly PersonnelMember[] = [
  { id: "gerant-manager",              file: "gerant manager.webp" },
  { id: "gerant-associe",              file: "Gérant associé.webp" },
  { id: "responsable-admin-financier", file: "responsable administratif et financier.webp" },
  { id: "architecte",                  file: "aechitecte.webp" },
  { id: "superviseur-usine",           file: "Mohamed camara superviseur d'usine.webp" },
  { id: "assistante-administrative",   file: "Maimouna Sow Assistante administrative.webp" },
  { id: "chargee-commerciale",          file: "Bintou Camara chargée commerciale.webp" },
  { id: "charge-logistique",           file: "chargé logistique.webp" },
  { id: "menuisier-alya",              file: "Alya Soumah menusier.webp" },
  { id: "menuisier-antony",            file: "Antony Kita Camara menusier.webp" },
  { id: "menuisier-djanko",            file: "Djanko Mara menusier.webp" },
  { id: "menuisier-fode",              file: "Fodé Abou Soumah Menusier.webp" },
  { id: "menuisier-mohamed-sylla",     file: "Mohamed sylla menusier.webp" },
  { id: "menuisier-saa",               file: "Saa Julien Kamano menusier.webp" },
  { id: "menuisier-nouveau-01",        file: "menuisier-nouveau-01.webp" },
  { id: "menuisier-nouveau-02",        file: "menuisier-nouveau-02.webp" },
  { id: "menuisier-nouveau-03",        file: "menuisier-nouveau-03.webp" },
  { id: "menuisier-nouveau-04",        file: "menuisier-nouveau-04.webp" },
  { id: "menuisier-nouveau-05",        file: "menuisier-nouveau-05.webp" },
] as const;

export function personnelImageUrl(file: string): string {
  return `/${PERSONNEL_FOLDER}/${encodeURIComponent(file)}`;
}
