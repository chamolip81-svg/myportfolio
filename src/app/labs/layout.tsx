import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Interactive Networking Labs — OSI Model, Subnet Calculator & Linux Terminal",
  description:
    "Free interactive tools for learning networking: OSI model explorer, IPv4 subnet/CIDR calculator, HTTP request visualizer, Linux terminal simulator, and AWS VPC architecture blueprint.",
  path: "/labs",
  keywords: ["interactive networking labs", "CIDR calculator", "subnet calculator", "OSI model explorer", "AWS VPC architect", "Linux terminal simulator", "HTTP request visualizer"],
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
