import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Blueprints — Priyanshu Chamoli",
  description:
    "Explore projects, technical prototypes, and architectural blueprints built by Priyanshu Chamoli across web development, networking, and cloud systems.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
