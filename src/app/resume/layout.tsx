import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Priyanshu Chamoli — Software Engineering Resume & CV",
  description:
    "Official resume and curriculum vitae of Priyanshu Chamoli, Full-Stack & Frontend Developer and IT undergraduate student from Dehradun, India. Verified projects, technical competencies, and education.",
  path: "/resume",
  keywords: [
    "Priyanshu Chamoli resume",
    "Priyanshu Chamoli CV",
    "Full-Stack developer resume",
    "Frontend developer resume",
    "Next.js developer resume",
    "React developer resume",
    "Dehradun developer resume",
  ],
});

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resume", path: "/resume" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema],
          }),
        }}
      />
      {children}
    </>
  );
}

