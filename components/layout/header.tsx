"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { X, ChevronDown, Home, LandPlot, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";

interface HeaderProps {
  transparent?: boolean;
}

interface PropertyCategory {
  label: string;
  icon: typeof Home;
  items: { value: string; label: string }[];
}

export default function Header({ transparent = false }: HeaderProps) {
  const t = useTranslations("nav");
  const tPropertyTypes = useTranslations("propertyTypes");
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Property type categories for dropdown
  const propertyCategories: Record<string, PropertyCategory> = {
    living: {
      label: tPropertyTypes("main.living"),
      icon: Home,
      items: [
        { value: "Condo", label: tPropertyTypes("sub.condo") },
        { value: "Townhouse", label: tPropertyTypes("sub.townhouse") },
        { value: "SingleHouse", label: tPropertyTypes("sub.singleHouse") },
        { value: "Villa", label: tPropertyTypes("sub.villa") },
      ],
    },
    land: {
      label: tPropertyTypes("main.land"),
      icon: LandPlot,
      items: [
        { value: "Land", label: tPropertyTypes("sub.land") },
      ],
    },
    commercial: {
      label: tPropertyTypes("main.commercial"),
      icon: Store,
      items: [
        { value: "Office", label: tPropertyTypes("sub.office") },
        { value: "Store", label: tPropertyTypes("sub.store") },
        { value: "Factory", label: tPropertyTypes("sub.factory") },
        { value: "Hotel", label: tPropertyTypes("sub.hotel") },
        { value: "Building", label: tPropertyTypes("sub.building") },
        { value: "Apartment", label: tPropertyTypes("sub.apartment") },
      ],
    },
  };

  useEffect(() => {
    // Check if animation was already played (e.g., before language switch)
    const alreadyVisible = sessionStorage.getItem("header-visible") === "true";
    if (alreadyVisible) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem("header-visible", "true");
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isScrolled = scrollY > 50;

  const handleMouseEnter = (dropdownKey: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(dropdownKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const rightNavLinks = [
    { href: "/map-search", label: t("mapSearch") },
    { href: "/list-property", label: t("listProperty") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  // Dropdown menu items for Rent and Buy
  const dropdownMenus = [
    { key: "rent", label: t("rent"), listingType: "rent" },
    { key: "sale", label: t("sale"), listingType: "sale" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0E1A] shadow-lg shadow-black/30"
            : transparent ? "bg-transparent" : "bg-[#0A0E1A]/80 backdrop-blur-sm"
        } ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {/* Slide-in accent from left - diagonal edge (desktop only) */}
        <div
          className="hidden md:block absolute top-0 bottom-0 left-0 overflow-hidden"
          style={{
            width: isScrolled ? "300px" : "0px",
            transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(245, 235, 200, 0.1)",
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)"
            }}
          />
        </div>
        <div className="container mx-auto px-4">
          {/* Desktop: Logo left, nav center, language right */}
          <div className="hidden md:grid md:grid-cols-3 items-center">
            {/* Left - Logo */}
            <Link href="/" className="flex items-center group">
              <div className={`relative transition-all duration-500 ease-out ${isScrolled ? "h-12" : "h-16"} w-auto`}>
                <Image
                  src="/name-logo.png"
                  alt="Sky Pro Property"
                  height={64}
                  width={192}
                  className="object-contain h-full w-auto"
                  unoptimized
                />
              </div>
            </Link>

            {/* Center - Navigation */}
            <div className="flex items-center justify-center gap-6">
              {/* Rent and Buy dropdowns */}
              {dropdownMenus.map((menu) => (
                <div
                  key={menu.key}
                  className="relative nav-dropdown"
                  onMouseEnter={() => handleMouseEnter(menu.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={`/search?listingType=${menu.listingType}`}
                    className="flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-white/70 hover:text-[#C9A227] transition-colors duration-200 whitespace-nowrap py-4"
                  >
                    {menu.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === menu.key ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                      openDropdown === menu.key
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="bg-[#0A0E1A] border border-white/10 rounded-lg shadow-xl shadow-black/30 min-w-[280px] overflow-hidden">
                      {/* View All Link */}
                      <Link
                        href={`/search?listingType=${menu.listingType}`}
                        className="block px-4 py-3 text-sm text-[#C9A227] hover:bg-white/5 border-b border-white/10 font-medium"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {menu.listingType === "rent" ? t("viewAllRentals") : t("viewAllForSale")}
                      </Link>

                      {/* Property Categories */}
                      {Object.entries(propertyCategories).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="border-b border-white/5 last:border-b-0">
                          {/* Category Header */}
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/5">
                            <category.icon className="w-4 h-4 text-[#C9A227]" />
                            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                              {category.label}
                            </span>
                          </div>
                          {/* Category Items */}
                          <div className="py-1">
                            {category.items.map((item) => (
                              <Link
                                key={item.value}
                                href={`/search?listingType=${menu.listingType}&propertyType=${item.value}`}
                                className="block px-4 py-2 text-sm text-white/70 hover:text-[#C9A227] hover:bg-white/5 transition-colors"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Other nav links */}
              {rightNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium tracking-wider uppercase text-white/70 hover:text-[#C9A227] transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right - Language Switcher */}
            <div className="flex justify-end pointer-events-none">
              <div className="pointer-events-auto">
                <LanguageSwitcher variant="light" compact />
              </div>
            </div>
          </div>

          {/* Mobile: Logo left, menu right */}
          <div className="flex md:hidden items-center justify-between py-2">
            <Link href="/" className="flex items-center">
              <div className={`relative transition-all duration-500 ease-out ${isScrolled ? "h-9" : "h-10"} w-auto`}>
                <Image
                  src="/name-logo.png"
                  alt="Sky Pro Property"
                  height={40}
                  width={120}
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
        mobileMenuOpen ? "block" : "hidden"
      }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel - Dark Mode */}
        <div className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-[#111928] border-l border-white/10 transition-transform duration-300 overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Logo */}
          <div className="pt-16 px-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Image
                src="/header-logo.png"
                alt="Sky Pro Property"
                width={52}
                height={52}
                className="object-contain"
                unoptimized
              />
              <Image
                src="/name-logo.png"
                alt="Sky Pro Property"
                height={44}
                width={132}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Nav Links */}
          <div className="px-4 py-6 space-y-1">
            {/* Rent and Buy with expandable submenus */}
            {dropdownMenus.map((menu, index) => (
              <div key={menu.key}>
                <div className="flex items-center">
                  <Link
                    href={`/search?listingType=${menu.listingType}`}
                    className={`flex-1 py-3 px-4 text-white/80 hover:text-[#C9A227] font-medium text-sm ${
                      mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: mobileMenuOpen ? `${index * 40 + 80}ms` : "0ms" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menu.label}
                  </Link>
                  <button
                    className="p-3 text-white/60 hover:text-[#C9A227] transition-colors"
                    onClick={() => setMobileExpandedMenu(mobileExpandedMenu === menu.key ? null : menu.key)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedMenu === menu.key ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Expandable submenu */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  mobileExpandedMenu === menu.key ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 pb-2 space-y-1">
                    {Object.entries(propertyCategories).map(([categoryKey, category]) => (
                      <div key={categoryKey}>
                        {/* Category Header */}
                        <div className="flex items-center gap-2 px-4 py-2 text-white/40">
                          <category.icon className="w-3 h-3" />
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            {category.label}
                          </span>
                        </div>
                        {/* Category Items */}
                        {category.items.map((item) => (
                          <Link
                            key={item.value}
                            href={`/search?listingType=${menu.listingType}&propertyType=${item.value}`}
                            className="block py-2 px-8 text-sm text-white/60 hover:text-[#C9A227] transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Other nav links */}
            {rightNavLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 text-white/80 hover:bg-white/5 hover:text-[#C9A227] rounded-lg transition-all duration-200 font-medium text-sm ${
                  mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${(index + dropdownMenus.length) * 40 + 80}ms` : "0ms" }}
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
