"use client";

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { exploringItems } from "@/lib/data";

export default function CurrentlyExploring() {
  return (
    <section className="relative py-24 md:py-32" id="exploring">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-primary), transparent)",
        }}
      />

      <div className="section-container">
        <SectionHeading
          label="Learning"
          title="Currently Exploring"
          description="Areas I'm actively learning and building hands-on experience in."
        />

        <div className="max-w-3xl mx-auto">
          {exploringItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === exploringItems.length - 1;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex items-start gap-5 group"
                id={`exploring-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Timeline Line */}
                {!isLast && (
                  <div
                    className="absolute left-5 top-12 w-px"
                    style={{
                      height: "calc(100% - 12px)",
                      background: `linear-gradient(to bottom, ${item.color}30, var(--border-primary))`,
                    }}
                  />
                )}

                {/* Node */}
                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${item.color}15`,
                    border: `1.5px solid ${item.color}40`,
                    color: item.color,
                  }}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs font-mono"
                      style={{ color: item.color, opacity: 0.7 }}
                    >
                      {item.number}
                    </span>
                    <h3
                      className="text-base font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
