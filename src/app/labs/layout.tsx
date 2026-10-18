import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Interactive Labs & Architecture Blueprints",
  description:
    "Interactive learning tools for networking concepts, AWS multi-tier VPC blueprints, OSI model layers, IP subnetting calculations, and Linux terminal commands.",
  path: "/labs",
  keywords: ["labs", "CIDR calculator", "VPC architect", "OSI model", "Linux terminal", "HTTP visualizer"],
});

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Interactive Labs", path: "/labs" },
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
