"use client";

import { useEffect, useState, useRef } from "react";
import { Building2, Award, Shield, Handshake } from "lucide-react";

const partners = [
  { name: "Sansiri", type: "Developer" },
  { name: "AP Thailand", type: "Developer" },
  { name: "Land & Houses", type: "Developer" },
  { name: "SC Asset", type: "Developer" },
  { name: "Origin", type: "Developer" },
  { name: "Pruksa", type: "Developer" },
];

const features = [
  {
    icon: Building2,
    title: "50+ โครงการ",
    description: "พันธมิตรโครงการคุณภาพ",
  },
  {
    icon: Award,
    title: "ได้รับการรับรอง",
    description: "มาตรฐานระดับสากล",
  },
  {
    icon: Shield,
    title: "ปลอดภัย 100%",
    description: "การทำธุรกรรมที่มั่นใจ",
  },
  {
    icon: Handshake,
    title: "บริการครบวงจร",
    description: "ดูแลตั้งแต่ต้นจนจบ",
  },
];

export default function PartnersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
            พันธมิตรของเรา
          </h2>
          <div className="w-16 h-1 bg-[#c6af6c] mx-auto mb-3"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ร่วมมือกับผู้พัฒนาอสังหาริมทรัพย์ชั้นนำของประเทศไทย
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
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="bg-gray-50 hover:bg-[#c6af6c]/5 border border-gray-100 hover:border-[#c6af6c]/30 rounded-xl px-8 py-4 transition-all duration-300 min-w-[160px]">
                    <div className="text-lg font-bold text-gray-700">{partner.name}</div>
                    <div className="text-xs text-gray-400">{partner.type}</div>
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
                key={feature.title}
                className={`text-center p-4 md:p-6 rounded-2xl bg-gray-50 hover:bg-[#c6af6c]/5 border border-transparent hover:border-[#c6af6c]/20 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#c6af6c]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#c6af6c]" />
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
