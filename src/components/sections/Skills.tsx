"use client";

import { motion } from "motion/react";
import SectionHeading from "../SectionHeading";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section className="relative py-24 md:py-32" id="skills">
      {/* Subtle background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-primary), transparent)",
        }}
      />

      <div className="section-container">
        <SectionHeading
          label="Skills"
          title="Technical Skills"
          description="Technologies and tools I work with, organized by category."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
                className="glass-card p-6"
                id={`skill-group-${group.category.toLowerCase()}`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {group.category}
                  </h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: groupIndex * 0.1 + skillIndex * 0.05,
                      }}
                      className="tech-tag"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
