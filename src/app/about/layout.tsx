import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Priyanshu Chamoli",
  description:
    "Learn about Priyanshu Chamoli's background, education in IT at Dehradun, learning philosophy, and technical exploration in networking, Linux, and cloud computing.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
