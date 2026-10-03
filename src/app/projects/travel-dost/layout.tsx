import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Dost — Project",
  description:
    "Travel Dost is a web interface for exploring and presenting hotel information, built as a practical web development project by Priyanshu Chamoli.",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
