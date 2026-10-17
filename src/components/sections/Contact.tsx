"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  CheckCircle,
  Loader2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import SectionHeading from "../SectionHeading";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

type SubmissionStatus = "idle" | "submitting" | "success" | "activation" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setStatus("submitting");
      setStatusMessage("");

      try {
        const response = await fetch(
          `https://formsubmit.co/ajax/${siteConfig.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              message: formData.message,
              _subject: `Portfolio Message from ${formData.name}`,
              _template: "table",
              _captcha: "false",
            }),
          }
        );

        const data = await response.json().catch(() => ({}));

        if (response.ok && (data.success === "true" || data.success === true)) {
          setStatus("success");
          setStatusMessage(
            `Thank you, ${formData.name}! Your message has been sent directly to ${siteConfig.email}. I will reply to you as soon as possible.`
          );
          setFormData({ name: "", email: "", message: "" });
        } else if (
          typeof data.message === "string" &&
          data.message.toLowerCase().includes("activation")
        ) {
          setStatus("activation");
          setStatusMessage(
            `Your message was received! If you are the site owner, FormSubmit sent a one-time activation link to ${siteConfig.email}. Click that link once to enable instant forwarding.`
          );
        } else {
          throw new Error(data.message || "Failed to deliver message");
        }
      } catch (err: unknown) {
        console.error("Direct send error:", err);
        setStatus("error");
        setStatusMessage(
          "Could not send directly from the browser. You can send it instantly with 1 click using the Gmail or Mail Client buttons below."
        );
      }
    },
    [formData, validate]
  );

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  // Compute pre-filled mail URLs for 1-click fallback
  const mailSubject = encodeURIComponent(
    formData.name
      ? `Portfolio Message from ${formData.name}`
      : "Message via Portfolio"
  );
  const mailBody = encodeURIComponent(
    formData.name || formData.message
      ? `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      : "Hi Priyanshu,\n\nI was viewing your portfolio and wanted to connect.\n"
  );
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}&su=${mailSubject}&body=${mailBody}`;
  const mailtoUrl = `mailto:${siteConfig.email}?subject=${mailSubject}&body=${mailBody}`;

  const contactLinks = [
    {
      label: "GitHub",
      href: siteConfig.github,
      icon: GithubIcon,
      color: "#f0f0f0",
      value: "github.com/chamolip81-svg",
    },
    {
      label: "LinkedIn",
      href: siteConfig.linkedin,
      icon: LinkedinIcon,
      color: "#0a66c2",
      value: "LinkedIn Profile",
    },
    {
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      color: "#3b82f6",
      value: siteConfig.email,
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
              and anyone working in technology. Feel free to send a message directly
              to my inbox or reach out through any of these channels.
            </p>

            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <div
                  key={link.label}
                  className="group glass-card p-4 flex items-center justify-between gap-4"
                  id={`contact-${link.label.toLowerCase()}`}
                >
                  <a
                    href={link.href}
                    target={link.label !== "Email" ? "_blank" : undefined}
                    rel={
                      link.label !== "Email"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
                      style={{
                        background: `${link.color}15`,
                        color: link.color,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {link.label}
                      </p>
                      <p
                        className="text-xs font-mono truncate"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {link.value}
                      </p>
                    </div>
                  </a>

                  {link.label === "Email" && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-2.5 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors border"
                      style={{
                        background: copied ? "rgba(16, 185, 129, 0.15)" : "var(--bg-tertiary)",
                        borderColor: copied ? "rgba(16, 185, 129, 0.4)" : "var(--border-primary)",
                        color: copied ? "#10b981" : "var(--text-secondary)",
                      }}
                      title="Copy email address"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  )}
                </div>
              );
            })}

            {/* Quick 1-click mail app launch pills */}
            <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)]/50 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Direct Email Launchers
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 transition-colors"
                >
                  <Mail size={13} />
                  Open in Gmail Web
                  <ExternalLink size={11} />
                </a>
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/25 transition-colors"
                >
                  <Send size={13} />
                  Default Mail App
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card p-6 md:p-8" id="contact-form-container">
              {status === "success" ? (
                <div
                  className="text-center py-8 px-4 space-y-4"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle size={28} />
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Message Sent Successfully!
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-md mx-auto"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {statusMessage}
                  </p>
                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setStatusMessage("");
                      }}
                      className="btn-secondary text-xs"
                    >
                      <RotateCcw size={14} />
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  id="contact-form"
                  noValidate
                >
                  {status === "activation" && (
                    <div
                      className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-2.5"
                      role="alert"
                    >
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">Notice for Priyanshu:</p>
                        <p>{statusMessage}</p>
                        <div className="pt-2">
                          <a
                            href={gmailComposeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono underline text-amber-200"
                          >
                            Send directly via Gmail Web instead <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div
                      className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed flex items-start gap-2.5"
                      role="alert"
                    >
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p>{statusMessage}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a
                            href={gmailComposeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/20 text-rose-200 font-mono text-[11px]"
                          >
                            <Mail size={12} /> Open in Gmail <ExternalLink size={10} />
                          </a>
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/20 text-rose-200 font-mono text-[11px]"
                          >
                            <Send size={12} /> Open Mail App
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{
                        background: "var(--bg-tertiary)",
                        border: `1px solid ${errors.name ? "#f43f5e80" : "var(--border-primary)"}`,
                        color: "var(--text-primary)",
                      }}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-xs font-mono mt-1 text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{
                        background: "var(--bg-tertiary)",
                        border: `1px solid ${errors.email ? "#f43f5e80" : "var(--border-primary)"}`,
                        color: "var(--text-primary)",
                      }}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-xs font-mono mt-1 text-rose-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }));
                        if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        background: "var(--bg-tertiary)",
                        border: `1px solid ${errors.message ? "#f43f5e80" : "var(--border-primary)"}`,
                        color: "var(--text-primary)",
                      }}
                      placeholder="Write your message here..."
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-xs font-mono mt-1 text-rose-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center py-3"
                    id="contact-submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending message to {siteConfig.email}...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message to {siteConfig.email}</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-[var(--border-primary)]" />
                      <span className="flex-shrink mx-3 text-[11px] font-mono text-[var(--text-muted)]">
                        or dispatch directly from your email
                      </span>
                      <div className="flex-grow border-t border-[var(--border-primary)]" />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                      <a
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 transition-colors"
                        title="Open pre-filled draft in Gmail Web"
                      >
                        <Mail size={12} />
                        Open in Gmail Web
                        <ExternalLink size={10} />
                      </a>
                      <a
                        href={mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/25 transition-colors"
                        title="Open in your default mail application"
                      >
                        <Send size={12} />
                        Default Mail App
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
