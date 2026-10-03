import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Connect — Priyanshu Chamoli",
  description:
    "Get in touch with Priyanshu Chamoli regarding technology discussions, undergraduate opportunities, networking/cloud questions, or collaborations.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
