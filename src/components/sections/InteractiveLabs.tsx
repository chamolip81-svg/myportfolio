"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { labs } from "@/lib/data";

export default function InteractiveLabs() {
  return (
    <section className="relative py-24 md:py-32" id="labs">
      <div className="section-container">
        <SectionHeading
          label="Labs"
          title="Interactive Labs"
          description="Educational visualizations and tools that demonstrate networking, protocols, and system concepts."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {labs.map((lab, index) => {
            const Icon = lab.icon;
            return (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  href={lab.href}
                  className="group glass-card p-6 block h-full relative overflow-hidden"
                  id={`lab-card-${lab.id}`}
                >
                  {/* Tag */}
                  <span
                    className="inline-block px-2 py-0.5 text-[10px] font-mono rounded mb-4 uppercase tracking-wider"
                    style={{
                      background: `${lab.color}15`,
                      color: lab.color,
                      border: `1px solid ${lab.color}20`,
                    }}
                  >
                    {lab.tag}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${lab.color}10`,
                      color: lab.color,
                      border: `1px solid ${lab.color}20`,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {lab.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {lab.description}
                  </p>

                  {/* Launch Link */}
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: lab.color }}
                  >
                    Launch Lab
                    <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Labs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link href="/labs" className="btn-secondary" id="view-all-labs">
            View All Labs
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
