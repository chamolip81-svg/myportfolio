"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span
        className="inline-block px-3 py-1 text-xs font-mono font-medium rounded-full mb-4 tracking-wider uppercase"
        style={{
          background: "var(--accent-glow)",
          color: "var(--accent-primary)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
        }}
      >
        {label}
      </span>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base md:text-lg leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
