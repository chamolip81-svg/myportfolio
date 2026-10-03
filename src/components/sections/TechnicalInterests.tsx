"use client";

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { technicalInterests } from "@/lib/data";

export default function TechnicalInterests() {
  return (
    <section className="relative py-24 md:py-32" id="interests">
      <div className="section-container">
        <SectionHeading
          label="Interests"
          title="Technical Interests"
          description="Areas of technology I'm actively exploring and building knowledge in."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {technicalInterests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group glass-card p-6 md:p-7 relative overflow-hidden"
                id={`interest-${interest.id}`}
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${interest.color}08, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${interest.color}15`,
                      color: interest.color,
                      border: `1px solid ${interest.color}20`,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-semibold mb-2 transition-colors duration-300"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {interest.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {interest.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${interest.color}10, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
