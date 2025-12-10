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
    // Initial animation
    setTimeout(() => setIsVisible(true), 100);

    if (!transparent) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const isScrolled = transparent ? scrollY > 100 : true;

  const navLinks = [
    { href: "/search?listingType=rent", label: t("rent") },
    { href: "/search?listingType=sale", label: t("sale") },
    // { href: "/new-projects", label: t("newProjects") },
    { href: "/list-property", label: t("listProperty") },
    { href: "/blog", label: t("blog") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-gray-100"
            : "bg-transparent"
        } ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {/* Gold accent line at top */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c6af6c] to-transparent transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`} />

        <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-500 ${isScrolled ? "py-3" : "py-5"}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative transition-all duration-500 ${isScrolled ? "w-12 h-12" : "w-14 h-14"}`}>
              <Image
                src="/web-logo.png"
                alt="Budget Wise Property"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold tracking-wide whitespace-nowrap transition-all duration-500 ${
                  isScrolled
                    ? "text-base md:text-lg text-[#a38444]"
                    : "text-base md:text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                }`}
              >
                Budget Wise Property
              </span>
              <span className={`text-[8px] tracking-[0.2em] uppercase transition-all duration-500 ${
                isScrolled ? "text-gray-500" : "text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              }`}>
                {t("premiumRealEstate")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 group ${
                  isScrolled
                    ? "text-gray-700 hover:text-[#c6af6c]"
                    : "text-white hover:text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
                {/* Hover underline effect */}
                <span className={`absolute bottom-0 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%] ${
                  isScrolled ? "bg-[#c6af6c]" : "bg-white"
                }`} />
              </Link>
            ))}
            {/* Language Switcher */}
            <div className="ml-2">
              <LanguageSwitcher variant={isScrolled ? "dark" : "light"} compact />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher variant={isScrolled ? "dark" : "light"} compact />
            <button
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/10 text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${
                  isScrolled ? "bg-gray-700" : "bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                } ${mobileMenuOpen ? "top-3 rotate-45" : "top-1"}`} />
                <span className={`absolute left-0 top-3 block h-0.5 w-6 transition-all duration-300 ${
                  isScrolled ? "bg-gray-700" : "bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                } ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 block h-0.5 w-6 transform transition-all duration-300 ${
                  isScrolled ? "bg-gray-700" : "bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                } ${mobileMenuOpen ? "top-3 -rotate-45" : "top-5"}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-60 md:hidden transition-all duration-500 ${
        mobileMenuOpen ? "visible" : "invisible"
      }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-500 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo */}
          <div className="pt-16 px-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Image
                src="/web-logo.png"
                alt="Budget Wise Property"
                width={48}
                height={48}
                className="object-contain"
                unoptimized
              />
              <div>
                <div className="font-bold text-[#a38444]">Budget Wise Property</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-gray-500">{t("premiumRealEstate")}</div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 text-gray-700 hover:bg-[#c6af6c]/10 hover:text-[#c6af6c] rounded-xl transition-all duration-300 font-medium ${
                  mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 50 + 100}ms` : "0ms" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c6af6c] via-[#d4c18a] to-[#c6af6c]" />
        </div>
      </div>
    </>
  );
}
