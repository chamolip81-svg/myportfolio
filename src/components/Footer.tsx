import Link from "next/link";
import { siteConfig, navItems } from "@/lib/data";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{
        borderTop: "1px solid var(--border-primary)",
        background: "var(--bg-secondary)",
      }}
      id="site-footer"
    >
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-sm mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                style={{
                  background: "var(--gradient-primary)",
                  color: "white",
                }}
              >
                PC
              </div>
              {siteConfig.name}
            </Link>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              {siteConfig.positioning} from {siteConfig.location}. Exploring
              networking, cloud, Linux, and software development.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-mono uppercase tracking-wider mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              className="text-xs font-mono uppercase tracking-wider mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-secondary)",
                }}
                aria-label="GitHub profile"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-secondary)",
                }}
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-secondary)",
                }}
                aria-label="Send email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid var(--border-primary)" }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            © {currentYear} {siteConfig.name}. Built with Next.js.
          </p>
          <p
            className="text-xs font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
