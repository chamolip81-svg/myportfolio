import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Technical Notes — TCP Handshake, Subnetting, DNS & Containers",
  description:
    "In-depth technical notes on the TCP 3-way handshake, CIDR subnetting math, DNS resolution process, and containers vs virtual machines with diagrams and examples.",
  path: "/notes",
  keywords: ["TCP handshake explained", "CIDR subnetting guide", "DNS resolution process", "containers vs VMs", "networking study notes"],
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
