/** Images dans `public/personel/` — noms de fichiers = poste occupé. */
export const PERSONNEL_FOLDER = "personel";

export type PersonnelMember = {
  id: string;
  /** Nom du fichier tel qu’enregistré dans `public/personel/`. */
  file: string;
};

export const personnelMembers: readonly PersonnelMember[] = [
  { id: "gerant-manager",              file: "gerant manager.jpeg" },
  { id: "gerant-associe",              file: "Gérant associé.jpeg" },
  { id: "responsable-admin-financier", file: "responsable administratif et financier.jpeg" },
  { id: "architecte",                  file: "aechitecte.jpeg" },
  { id: "superviseur-usine",           file: "Mohamed camara superviseur d'usine.jpeg" },
  { id: "assistante-administrative",   file: "Maimouna Sow Assistante administrative.jpeg" },
  { id: "charge-logistique",           file: "chargé logistique.jpeg" },
  { id: "menuisier-alya",              file: "Alya Soumah menusier.jpeg" },
  { id: "menuisier-antony",            file: "Antony Kita Camara menusier.jpeg" },
  { id: "menuisier-djanko",            file: "Djanko Mara menusier.jpeg" },
  { id: "menuisier-fode",              file: "Fodé Abou Soumah Menusier.jpeg" },
  { id: "menuisier-mohamed-sylla",     file: "Mohamed sylla menusier.jpeg" },
  { id: "menuisier-saa",               file: "Saa Julien Kamano menusier.jpeg" },
] as const;

export function personnelImageUrl(file: string): string {
  return `/${PERSONNEL_FOLDER}/${encodeURIComponent(file)}`;
}
