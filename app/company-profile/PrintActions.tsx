"use client";

import Link from "next/link";

export function PrintActions() {
  return (
    <div className="mt-10 flex flex-wrap gap-3 print:hidden">
      <button
        type="button"
        className="rounded-lg bg-brand-red px-4 py-2 font-heading text-sm font-semibold uppercase text-white"
        onClick={() => window.print()}
      >
        Imprimer / PDF
      </button>
      <Link
        href="/partenaires"
        className="rounded-lg border-2 border-brand-red px-4 py-2 font-heading text-sm font-semibold uppercase text-brand-red"
      >
        Retour partenaires
      </Link>
    </div>
  );
}
