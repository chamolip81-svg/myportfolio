import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { technicalNotes } from "@/lib/data";
import {
  createPageMetadata,
  createBreadcrumbSchema,
  createTechArticleSchema,
} from "@/lib/seo";
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

  return createPageMetadata({
    title: note.title,
    description: note.description,
    path: `/notes/${note.slug}`,
    keywords: note.tags,
    ogType: "article",
    publishedTime: note.dateISO,
    modifiedTime: note.dateModifiedISO,
  });
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

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Technical Notes", path: "/notes" },
    { name: note.title, path: `/notes/${note.slug}` },
  ]);

  const articleSchema = createTechArticleSchema({
    title: note.title,
    description: note.description,
    path: `/notes/${note.slug}`,
    datePublished: note.dateISO,
    dateModified: note.dateModifiedISO,
    tags: note.tags,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema, articleSchema],
          }),
        }}
      />
      <NoteDetailClient note={note} />
    </>
  );
}
