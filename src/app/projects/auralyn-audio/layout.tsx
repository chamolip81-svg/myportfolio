import {
  createPageMetadata,
  createBreadcrumbSchema,
  createProjectSchema,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Auralyn: Full-Stack Audio Streaming Platform & API Case Study",
  description:
    "Technical case study of Auralyn, a full-stack audio streaming progressive web application and Express microservice built by Priyanshu Chamoli using React, Node.js, Express, Python Flask, and Tailwind CSS.",
  path: "/projects/auralyn-audio",
  keywords: [
    "Auralyn",
    "audio streaming platform",
    "React music player",
    "Node.js Express API",
    "PWA",
    "full-stack case study",
    "CORS audio proxy",
    "Priyanshu Chamoli",
  ],
});

export default function AuralynLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Auralyn Audio Engine", path: "/projects/auralyn-audio" },
  ]);

  const projectSchema = createProjectSchema({
    name: "Auralyn Audio Streaming Platform",
    description:
      "A full-stack progressive web application and Node.js REST backend delivering persistent in-browser audio playback, CORS-compliant stream resolution, and responsive UI.",
    path: "/projects/auralyn-audio",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Python Flask",
      "PWA",
      "Tailwind CSS",
      "REST APIs",
      "Railway",
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema, projectSchema],
          }),
        }}
      />
      {children}
    </>
  );
}

