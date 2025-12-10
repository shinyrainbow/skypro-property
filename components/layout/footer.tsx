"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Image
            src="/web-logo.png"
            alt="Budget Wise Property"
            width={108}
            height={108}
            className="w-32 h-32 object-contain"
          />
        </div>
        <p className="mb-2 text-sm">{t("tagline")}</p>
        <p className="text-xs">{t("copyright")}</p>
      </div>
    </footer>
  );
}
