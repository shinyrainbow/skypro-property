"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const t = useTranslations("nav");
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    if (!transparent) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const isScrolled = transparent ? scrollY > 50 : true;

  const leftNavLinks = [
    { href: "/search?listingType=rent", label: t("rent") },
    { href: "/search?listingType=sale", label: t("sale") },
  ];

  const rightNavLinks = [
    { href: "/blog", label: t("blog") },
    { href: "/#contact", label: t("contact") },
  ];

  const allNavLinks = [...leftNavLinks, ...rightNavLinks];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-[#111928]/80 border-b border-white/10"
            : "bg-transparent"
        } ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className={`container mx-auto px-4 transition-all duration-300 ${isScrolled ? "py-2" : "py-3"}`}>
          {/* Desktop: Logo left, nav right */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left - Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`relative transition-all duration-300 ${isScrolled ? "h-10" : "h-12"} aspect-square`}>
                <Image
                  src="/header-logo.png"
                  alt="Sky Pro Properties"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className={`relative transition-all duration-300 ${isScrolled ? "h-8" : "h-10"} w-auto`}>
                <Image
                  src="/name-logo.png"
                  alt="Sky Pro Properties"
                  height={40}
                  width={120}
                  className="object-contain h-full w-auto"
                  unoptimized
                />
              </div>
            </Link>

            {/* Right - Navigation */}
            <div className="flex items-center gap-8">
              {allNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium tracking-wider uppercase text-white/70 hover:text-[#C9A227] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pl-6 border-l border-white/20">
                <LanguageSwitcher variant="light" compact />
              </div>
            </div>
          </div>

          {/* Mobile: Logo left, menu right */}
          <div className="flex md:hidden items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-10 h-10">
                <Image
                  src="/header-logo.png"
                  alt="Sky Pro Properties"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="relative h-8 w-auto">
                <Image
                  src="/name-logo.png"
                  alt="Sky Pro Properties"
                  height={32}
                  width={96}
                  className="object-contain h-full w-auto"
                  unoptimized
                />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <LanguageSwitcher variant="light" compact />
              <button
                className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute left-0 block h-0.5 w-5 bg-white transform transition-all duration-200 ${mobileMenuOpen ? "top-2.5 rotate-45" : "top-1"}`} />
                  <span className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-white transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`absolute left-0 block h-0.5 w-5 bg-white transform transition-all duration-200 ${mobileMenuOpen ? "top-2.5 -rotate-45" : "top-4"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-60 md:hidden transition-all duration-300 ${
        mobileMenuOpen ? "visible" : "invisible"
      }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel - Dark Mode */}
        <div className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-[#111928] border-l border-white/10 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Logo */}
          <div className="pt-16 px-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Image
                src="/header-logo.png"
                alt="Sky Pro Properties"
                width={44}
                height={44}
                className="object-contain"
                unoptimized
              />
              <Image
                src="/name-logo.png"
                alt="Sky Pro Properties"
                height={36}
                width={108}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Nav Links */}
          <div className="px-4 py-6 space-y-1">
            {allNavLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 text-white/80 hover:bg-white/5 hover:text-[#C9A227] rounded-lg transition-all duration-200 font-medium text-sm ${
                  mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 40 + 80}ms` : "0ms" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Gold accent line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
        </div>
      </div>
    </>
  );
}
