import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Interactive Labs",
  description:
    "Educational interactive visualizations exploring networking concepts, AWS multi-tier VPC blueprints, the OSI model, IP subnetting calculations, HTTP flows, and Linux commands.",
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
