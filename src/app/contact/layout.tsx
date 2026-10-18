import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact & Collaboration",
  description:
    "Get in touch with Priyanshu Chamoli regarding technology discussions, undergraduate opportunities, networking/cloud questions, or collaborations.",
  path: "/contact",
  keywords: ["contact", "connect", "email", "LinkedIn", "GitHub", "hire"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
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
