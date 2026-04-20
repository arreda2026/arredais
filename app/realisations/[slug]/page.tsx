import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/realisations/ProjectDetailClient";
import { getProjectBySlug, projects } from "@/lib/data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ARREDA`,
      description: project.description,
    },
  };
}

export default function RealisationDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
