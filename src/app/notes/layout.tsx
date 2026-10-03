import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Notes & Architecture Guides — Priyanshu Chamoli",
  description:
    "In-depth technical writeups and study notes on networking fundamentals, TCP state machines, subnetting calculations, container isolation, and DNS architecture.",
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
