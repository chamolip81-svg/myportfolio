import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Labs",
  description:
    "Educational interactive visualizations exploring networking concepts, the OSI model, IP subnetting, HTTP requests, and Linux commands.",
};

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
