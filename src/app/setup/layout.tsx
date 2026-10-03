import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Lab & Workstation Setup — Priyanshu Chamoli",
  description:
    "An overview of Priyanshu Chamoli's virtualized laboratory setup, Linux virtualization environments, networking simulators, development tools, and hardware configuration.",
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
