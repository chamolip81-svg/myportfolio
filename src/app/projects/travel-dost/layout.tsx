import {
  createPageMetadata,
  createBreadcrumbSchema,
  createProjectSchema,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Travel Dost — Web Application Case Study",
  description:
    "Travel Dost is a responsive web application for exploring and presenting hotel catalogs, built by Priyanshu Chamoli using HTML, CSS, JavaScript, and MySQL.",
  path: "/projects/travel-dost",
  keywords: ["Travel Dost", "case study", "web application", "hotel catalog", "JavaScript", "MySQL"],
});

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Travel Dost", path: "/projects/travel-dost" },
  ]);

  const projectSchema = createProjectSchema({
    name: "Travel Dost",
    description:
      "A responsive hotel catalog and browsing web interface demonstrating clean information architecture and responsive design.",
    path: "/projects/travel-dost",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "MySQL"],
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
