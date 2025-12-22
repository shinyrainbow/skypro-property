"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Building2, Award, Shield, Handshake } from "lucide-react";
import Image from "next/image";

function PartnerLogo({ partner }: { partner: { name: string; logo: string; width: number; height: number } }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center justify-center h-[60px]">
        <span className="text-gray-700 font-semibold text-sm text-center">{partner.name}</span>
      </div>
    );
  }

  return (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={partner.width}
      height={partner.height}
      className="object-contain max-h-[60px] transition-all duration-300"
      unoptimized
      onError={() => setImageError(true)}
    />
  );
}

const partners = [
  {
    name: "Partner 1",
    logo: "/partners/598171437_1176571214583077_5321248906695541238_n.png",
    width: 120,
    height: 60
  },
  {
    name: "Partner 2",
    logo: "/partners/598259224_1593078181865218_3370460755140398818_n.jpg",
    width: 120,
    height: 60
  },
  {
    name: "Partner 3",
    logo: "/partners/598439890_1202751184523719_3799152996255401486_n.jpg",
    width: 120,
    height: 60
  },
  {
    name: "Partner 4",
    logo: "/partners/598729591_2632539903798795_1293775410670672503_n.jpg",
    width: 120,
    height: 60
  },
  {
    name: "Partner 5",
    logo: "/partners/599219620_826717423699741_4765128214962327717_n.jpg",
    width: 120,
    height: 60
  },
  {
    name: "Partner 6",
    logo: "/partners/599606573_881346791056484_7328986234582212699_n.jpg",
    width: 120,
    height: 60
  },
];

export default function PartnersSection() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: Building2,
      title: t("sections.partnerFeature1Title"),
      description: t("sections.partnerFeature1Desc"),
    },
    {
      icon: Award,
      title: t("sections.partnerFeature2Title"),
      description: t("sections.partnerFeature2Desc"),
    },
    {
      icon: Shield,
      title: t("sections.partnerFeature3Title"),
      description: t("sections.partnerFeature3Desc"),
    },
    {
      icon: Handshake,
      title: t("sections.partnerFeature4Title"),
      description: t("sections.partnerFeature4Desc"),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t("sections.partners")}
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mb-3"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("sections.partnersSubtitle")}
          </p>
        </div>

        {/* Partner Logos - Marquee Style */}
        <div
          className={`relative mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="bg-gray-50 hover:bg-[#C9A227]/5 border border-gray-100 hover:border-[#C9A227]/30 rounded-xl px-8 py-6 transition-all duration-300 min-w-[180px] h-[100px] flex items-center justify-center">
                    <PartnerLogo partner={partner} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`text-center p-4 md:p-6 rounded-2xl bg-gray-50 hover:bg-[#C9A227]/5 border border-transparent hover:border-[#C9A227]/20 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
