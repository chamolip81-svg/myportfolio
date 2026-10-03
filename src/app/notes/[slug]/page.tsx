import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { technicalNotes } from "@/lib/data";
import NoteDetailClient from "./NoteDetailClient";

export async function generateStaticParams() {
  return technicalNotes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = technicalNotes.find((n) => n.slug === slug);
  if (!note) return {};

  return {
    title: `${note.title} — Priyanshu Chamoli`,
    description: note.description,
  };
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = technicalNotes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  return <NoteDetailClient note={note} />;
}
