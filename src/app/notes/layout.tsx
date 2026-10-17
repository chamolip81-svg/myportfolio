import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Technical Notes & Architecture Guides",
  description:
    "In-depth technical writeups and study notes on networking fundamentals, TCP state machines, subnetting calculations, container isolation, and DNS architecture.",
  path: "/notes",
  keywords: ["study notes", "TCP handshake", "CIDR guide", "containers vs VMs", "DNS resolution"],
});

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Technical Notes", path: "/notes" },
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
