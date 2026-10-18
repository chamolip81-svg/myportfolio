import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Virtual Lab & Workstation Setup",
  description:
    "An overview of Priyanshu Chamoli's virtualized lab setup, Linux environments, packet analyzers, development tools, and dual-monitor hardware configuration.",
  path: "/setup",
  keywords: ["virtual lab", "VirtualBox", "WSL2", "Linux", "Wireshark", "workstation"],
});

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Virtual Lab & Setup", path: "/setup" },
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
