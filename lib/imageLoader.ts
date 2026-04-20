/**
 * Chargeur personnalisé : Unsplash sans optimiseur serveur.
 * Pour les assets locaux (/public), l’URL retournée doit inclure `width`
 * (exigence Next.js — les paramètres en query sont ignorés par le serveur de fichiers statiques).
 */
export default function arredaImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const q = quality ?? 75;

  if (src.startsWith("https://") || src.startsWith("http://")) {
    try {
      const u = new URL(src);
      if (u.hostname === "images.unsplash.com") {
        u.searchParams.set("w", String(width));
        u.searchParams.set("q", String(q));
        u.searchParams.set("auto", "format");
        return u.toString();
      }
      const sep = u.search ? "&" : "?";
      return `${src}${sep}w=${width}&q=${q}`;
    } catch {
      return src;
    }
  }

  /* Chemins locaux : /logo/... — forcer la présence de width dans l’URL */
  if (src.startsWith("/")) {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${width}&q=${q}`;
  }

  return src;
}
