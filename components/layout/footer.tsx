"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const quickLinks = [
    { href: "/search?listingType=rent", label: tNav("rent") },
    { href: "/search?listingType=sale", label: tNav("sale") },
    { href: "/blog", label: tNav("blog") },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <footer className="bg-[#111928]">
      {/* Gold accent line at top */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/header-logo.png"
                alt="Sky Pro Properties"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <Image
                src="/name-logo.png"
                alt="Sky Pro Properties"
                height={28}
                width={84}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-xs hover:text-[#C9A227] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <Phone className="w-3 h-3 text-[#C9A227] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs">065-555-9999</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3 h-3 text-[#C9A227] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs">contact@skyproproperties.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-[#C9A227] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs">Bangkok, Thailand</span>
              </li>
            </ul>
          </div>

          {/* Social / LINE */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Connect</h4>
            <p className="text-gray-400 text-xs mb-3">
              Add us on LINE for instant support
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#06C755] rounded-lg text-white text-xs font-medium">
              <span>@skyproproperties</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-[10px]">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-gray-500 text-[10px] hover:text-gray-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 text-[10px] hover:text-gray-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
