"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { siteConfig } from "@/lib/data";

export default function About() {
  return (
    <section className="relative py-24 md:py-32" id="about">
      <div className="section-container">
        <SectionHeading
          label="About"
          title="Who I Am"
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="glass-card p-6 md:p-8"
            >
              <p
                className="text-base md:text-lg leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                I&apos;m Priyanshu, an IT student and developer interested in
                understanding how software and infrastructure work together. My
                interests span web development, computer networks, Linux, cloud
                computing and virtual labs.
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                I&apos;m currently building my fundamentals through hands-on
                experimentation and continuously expanding my technical skills.
                I believe in learning by doing — setting up virtual environments,
                exploring network configurations, and building practical projects.
              </p>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    color: "#3b82f6",
                  }}
                >
                  <MapPin size={16} />
                </div>
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Location
                </span>
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {siteConfig.location}
              </p>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(139, 92, 246, 0.1)",
                    color: "#8b5cf6",
                  }}
                >
                  <GraduationCap size={16} />
                </div>
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Education
                </span>
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                B.Sc. Information Technology
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                Currently pursuing
              </p>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Interests
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Networking", "Cloud", "Linux", "Security", "Web Dev"].map(
                  (tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
