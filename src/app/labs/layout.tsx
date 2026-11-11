import {
  createPageMetadata,
  createBreadcrumbSchema,
  siteBaseUrl,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Interactive Networking Labs — OSI Model, Subnet Calculator & Linux Terminal",
  description:
    "Free interactive tools for learning networking: OSI model explorer, IPv4 subnet/CIDR calculator, HTTP request visualizer, Linux terminal simulator, and AWS VPC architecture blueprint.",
  path: "/labs",
  keywords: [
    "interactive networking labs",
    "CIDR calculator",
    "subnet calculator",
    "OSI model explorer",
    "AWS VPC architect",
    "Linux terminal simulator",
    "HTTP request visualizer",
  ],
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

  const labsSuiteSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteBaseUrl}/labs#collection`,
    name: "Interactive Systems & Networking Virtual Labs",
    description:
      "Interactive browser tools for learning computer networking, OSI layers, IPv4 subnetting calculations, HTTP flow tracing, Linux commands, and AWS cloud VPC topologies.",
    itemListElement: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "Packet Pulse Visualizer",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        url: `${siteBaseUrl}/labs#networking`,
        description:
          "Interactive packet hopping simulation showing how DNS, ARP, and TCP packets flow between nodes.",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "OSI Model Explorer",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        url: `${siteBaseUrl}/labs#osi`,
        description:
          "Layer-by-layer reference breakdown of the 7-layer OSI model, protocol data units, and protocols.",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "IPv4 Subnet & CIDR Calculator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        url: `${siteBaseUrl}/labs#subnet`,
        description:
          "Real-time subnet calculator computing network IDs, broadcast addresses, usable host counts, and binary bit masks.",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "HTTP Request Visualizer",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        url: `${siteBaseUrl}/labs#http`,
        description:
          "Step-by-step animation detailing HTTP client requests, status codes, and server responses.",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "Linux Virtual Web Terminal",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        url: `${siteBaseUrl}/labs#terminal`,
        description:
          "Simulated browser shell for learning Linux networking commands including ping, ip addr, traceroute, and netstat.",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "AWS Multi-Tier VPC Architect",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        url: `${siteBaseUrl}/labs#cloud`,
        description:
          "Architectural reference model for public, private, and database subnet routing in AWS multi-AZ configurations.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema, labsSuiteSchema],
          }),
        }}
      />
      {children}
    </>
  );
}
