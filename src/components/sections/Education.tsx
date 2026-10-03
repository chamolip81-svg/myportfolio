"use client";

import { motion } from "motion/react";
import { GraduationCap, BookOpen, MapPin } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section className="relative py-24 md:py-32" id="education">
      <div className="section-container">
        <SectionHeading
          label="Education"
          title="Academic Background"
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            {/* Accent line on top */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "var(--gradient-primary)" }}
            />

            {/* Degree */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  color: "#8b5cf6",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                }}
              >
                <GraduationCap size={22} />
              </div>
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {education.degree} {education.field}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {education.institution}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span
                className="inline-flex items-center gap-1.5 text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                <MapPin size={12} />
                {education.location}
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono rounded-full uppercase tracking-wider"
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  color: "var(--accent-primary)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              >
                {education.status}
              </span>
            </div>

            {/* Relevant Areas */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen
                  size={14}
                  style={{ color: "var(--text-muted)" }}
                />
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Relevant Areas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {education.areas.map((area) => (
                  <span key={area} className="tech-tag">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
