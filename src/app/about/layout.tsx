import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Me & Technical Background",
  description:
    "Learn about Priyanshu Chamoli's academic IT background at Dehradun, learning philosophy, and practical labs in networking, Linux, and cloud infrastructure.",
  path: "/about",
  keywords: ["about", "education", "Dehradun", "background", "philosophy", "CIMS"],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
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
