export const realisationImages = Array.from({ length: 14 }, (_, i) =>
  `/Realisation/realisation-${String(i + 1).padStart(2, "0")}.webp`
);

export const ouvrierImages = Array.from({ length: 4 }, (_, i) =>
  `/Ouvrier/ouvrier-${String(i + 1).padStart(2, "0")}.webp`
);
