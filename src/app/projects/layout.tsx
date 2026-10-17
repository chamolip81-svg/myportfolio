import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projects & Blueprints",
  description:
    "Explore projects, technical prototypes, and architectural blueprints built by Priyanshu Chamoli across web development, networking, and cloud systems.",
  path: "/projects",
  keywords: ["projects", "Travel Dost", "Packet Pulse", "VPC architect", "Linux monitor"],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
