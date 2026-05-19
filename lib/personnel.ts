/** Images dans `public/personel/` — noms de fichiers = poste occupé. */
export const PERSONNEL_FOLDER = "personel";

export type PersonnelMember = {
  id: string;
  /** Nom du fichier tel qu’enregistré dans `public/personel/`. */
  file: string;
};

export const personnelMembers: readonly PersonnelMember[] = [
  { id: "gerant-manager", file: "gerant manager.jpeg" },
  { id: "gerant-associe", file: "Gérant associé.jpeg" },
  { id: "responsable-admin-financier", file: "responsable administratif et financier.jpeg" },
  { id: "architecte", file: "aechitecte.jpeg" },
  { id: "charge-logistique", file: "chargé logistique.jpeg" },
] as const;

export function personnelImageUrl(file: string): string {
  return `/${PERSONNEL_FOLDER}/${encodeURIComponent(file)}`;
}
