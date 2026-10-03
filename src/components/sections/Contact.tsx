"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Send, Github, Linkedin, Mail, CheckCircle } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Open mail client with pre-filled data
      const subject = encodeURIComponent(
        `Message from ${formData.name} via Portfolio`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.open(
        `mailto:${siteConfig.email}?subject=${subject}&body=${body}`,
        "_self"
      );
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    },
    [formData]
  );

  const contactLinks = [
    {
      label: "GitHub",
      href: siteConfig.github,
      icon: Github,
      color: "#f0f0f0",
    },
    {
      label: "LinkedIn",
      href: siteConfig.linkedin,
      icon: Linkedin,
      color: "#0a66c2",
    },
    {
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      color: "#3b82f6",
    },
  ];

  return (
    <section className="relative py-24 md:py-32" id="contact">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-primary), transparent)",
        }}
      />

      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's Connect"
          description="Interested in discussing technology, collaboration, or have a question? Reach out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--text-tertiary)" }}
            >
              I&apos;m always interested in connecting with fellow students, developers,
              and anyone working in technology. Feel free to reach out through
              any of these channels.
            </p>

            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={
                    link.label !== "Email"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group glass-card p-4 flex items-center gap-4"
                  id={`contact-${link.label.toLowerCase()}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: `${link.color}15`,
                      color: link.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {link.label}
                    </p>
                    <p
                      className="text-xs font-mono"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label === "Email"
                        ? siteConfig.email
                        : link.label === "GitHub"
                          ? "github.com/chamolip81-svg"
                          : "LinkedIn Profile"}
                    </p>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 md:p-8"
              id="contact-form"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  id="contact-submit"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={16} />
                      Opening mail client...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
