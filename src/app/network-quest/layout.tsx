import { createPageMetadata, createBreadcrumbSchema, siteBaseUrl } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Network Quest — Interactive Networking Simulator & Engineering Challenge",
  description:
    "Play Network Quest, a free interactive networking puzzle and simulation game. Diagnose broken subnets, configure routers and default gateways, resolve DNS queries, and trace TCP/IP packet handshakes.",
  path: "/network-quest",
  keywords: [
    "network simulator online",
    "interactive networking game",
    "learn networking interactively",
    "packet tracer online alternative",
    "TCP 3-way handshake simulation",
    "CIDR subnet practice",
    "default gateway tutorial",
    "DNS resolution interactive",
  ],
});

export default function NetworkQuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Network Quest", path: "/network-quest" },
  ]);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteBaseUrl}/network-quest#app`,
    name: "Network Quest",
    applicationCategory: "EducationalGame",
    operatingSystem: "Web Browser",
    url: `${siteBaseUrl}/network-quest`,
    description:
      "A web-based interactive networking simulator and mission-based challenge teaching real IPv4 subnetting, gateway routing, and transport protocols.",
    author: {
      "@type": "Person",
      "@id": `${siteBaseUrl}/#person`,
      name: "Priyanshu Chamoli",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    educationalUse: "Interactive Network Engineering Simulation",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema, softwareSchema],
          }),
        }}
      />
      {children}
    </>
  );
}
