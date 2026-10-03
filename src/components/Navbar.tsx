"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data";
import CommandPalette from "./CommandPalette";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith("#") && pathname === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? "rgba(9, 9, 11, 0.8)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: isScrolled
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
        }}
        id="main-navbar"
      >
        <nav
          className="section-container flex items-center justify-between"
          style={{ height: "var(--header-height)" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-sm tracking-tight transition-colors duration-200"
            style={{ color: "var(--text-primary)" }}
            id="nav-logo"
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
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href.startsWith("/") && pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={
                    item.href.startsWith("#") && pathname !== "/"
                      ? `/${item.href}`
                      : item.href
                  }
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-3 py-1.5 text-sm rounded-md transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  }}
                  id={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-md -z-10"
                      style={{
                        background: "var(--bg-tertiary)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-secondary)",
              }}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              id="mobile-menu-toggle"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(9, 9, 11, 0.95)",
              backdropFilter: "blur(24px)",
              paddingTop: "var(--header-height)",
            }}
            id="mobile-navigation"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-2 -mt-16"
              aria-label="Mobile navigation"
            >
              {navItems.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : item.href.startsWith("/") && pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={
                        item.href.startsWith("#") && pathname !== "/"
                          ? `/${item.href}`
                          : item.href
                      }
                      onClick={() => handleNavClick(item.href)}
                      className="block text-xl font-medium py-2 px-6 rounded-lg transition-colors duration-200 text-center"
                      style={{
                        color: isActive
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                        background: isActive
                          ? "rgba(59, 130, 246, 0.1)"
                          : "transparent",
                      }}
                      id={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center gap-3"
              >
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  LinkedIn
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
