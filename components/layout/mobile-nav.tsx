"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Home, Search, Heart, Phone, X } from "lucide-react";
import Image from "next/image";

export default function MobileNav() {
  const pathname = usePathname();
  const t = useTranslations();
  const [showLineQR, setShowLineQR] = useState(false);

  const navItems = [
    { href: "/", icon: Home, label: t("nav.home") || "Home" },
    { href: "/search", icon: Search, label: t("common.search") },
    { href: "/properties", icon: Heart, label: t("common.properties") },
    { href: "#contact", icon: Phone, label: t("nav.contact"), isContact: true },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/th" || pathname === "/en";
    return pathname.includes(href);
  };

  const handleContactClick = () => {
    setShowLineQR(true);
  };

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            if (item.isContact) {
              return (
                <button
                  key={item.label}
                  onClick={handleContactClick}
                  className="flex flex-col items-center justify-center flex-1 h-full transition-colors text-gray-500 hover:text-[#C9A227]"
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active
                    ? "text-[#C9A227]"
                    : "text-gray-500 hover:text-[#C9A227]"
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${active ? "fill-current" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Line QR Modal */}
      {showLineQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm md:hidden">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {t("propertyDetail.addLineFriend")}
              </h3>
              <button
                onClick={() => setShowLineQR(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex justify-center">
              <Image
                src="/qrcode.png"
                alt="Line QR Code"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              {t("propertyDetail.scanQR")}
            </p>
            <div className="mt-4 text-center">
              <a
                href="tel:0655558989"
                className="inline-flex items-center gap-2 text-[#C9A227] font-medium"
              >
                <Phone className="w-4 h-4" />
           065-555-9999
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for bottom nav */}
      <div className="h-16 md:hidden" />

      <style jsx global>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </>
  );
}
