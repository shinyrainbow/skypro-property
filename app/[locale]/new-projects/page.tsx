"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Sparkles,
  Home,
  BedDouble,
  Bath,
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useTranslations } from "next-intl";

interface Project {
  id: string;
  name: string;
  nameEn: string;
  developer: string;
  location: string;
  imageUrl: string;
  startingPrice: number;
  totalUnits: number;
  completionDate: string;
  propertyTypes: string[];
  bedrooms: string;
  bathrooms: string;
  isNew: boolean;
}

// Mock data for new projects
const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "The Skyline Residence",
    nameEn: "The Skyline Residence",
    developer: "Premium Development Co.",
    location: "Sukhumvit, Bangkok",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    startingPrice: 4500000,
    totalUnits: 350,
    completionDate: "Q4 2025",
    propertyTypes: ["Condo"],
    bedrooms: "1-3",
    bathrooms: "1-2",
    isNew: true,
  },
  {
    id: "project-2",
    name: "Garden Valley Villas",
    nameEn: "Garden Valley Villas",
    developer: "Green Living Group",
    location: "Pattaya, Chonburi",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    startingPrice: 8900000,
    totalUnits: 120,
    completionDate: "Q2 2026",
    propertyTypes: ["Single House", "Townhouse"],
    bedrooms: "3-5",
    bathrooms: "2-4",
    isNew: true,
  },
  {
    id: "project-3",
    name: "Metro Park Tower",
    nameEn: "Metro Park Tower",
    developer: "Urban Estate Ltd.",
    location: "Ratchadaphisek, Bangkok",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    startingPrice: 3200000,
    totalUnits: 500,
    completionDate: "Q1 2026",
    propertyTypes: ["Condo"],
    bedrooms: "Studio-2",
    bathrooms: "1",
    isNew: false,
  },
  {
    id: "project-4",
    name: "Riverside Serenity",
    nameEn: "Riverside Serenity",
    developer: "Waterfront Properties",
    location: "Chao Phraya, Bangkok",
    imageUrl: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80",
    startingPrice: 12500000,
    totalUnits: 80,
    completionDate: "Q3 2025",
    propertyTypes: ["Condo"],
    bedrooms: "2-4",
    bathrooms: "2-3",
    isNew: true,
  },
  {
    id: "project-5",
    name: "The Heritage Estate",
    nameEn: "The Heritage Estate",
    developer: "Classic Homes Co.",
    location: "Rama 9, Bangkok",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    startingPrice: 15000000,
    totalUnits: 45,
    completionDate: "Q4 2025",
    propertyTypes: ["Single House"],
    bedrooms: "4-6",
    bathrooms: "3-5",
    isNew: false,
  },
  {
    id: "project-6",
    name: "Urban Loft Collection",
    nameEn: "Urban Loft Collection",
    developer: "Modern Space Inc.",
    location: "Thonglor, Bangkok",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    startingPrice: 6800000,
    totalUnits: 200,
    completionDate: "Q2 2025",
    propertyTypes: ["Condo"],
    bedrooms: "1-2",
    bathrooms: "1-2",
    isNew: true,
  },
];

const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `฿${(price / 1000000).toFixed(1)}M`;
  }
  return `฿${price.toLocaleString()}`;
};

export default function NewProjectsPage() {
  const t = useTranslations("newProjects");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div
          className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#c6af6c] to-[#a38444] rounded-2xl flex items-center justify-center shadow-xl">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/property/${project.id}`}
                className={`group block transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 h-full">
                {/* Image */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* New Badge */}
                  {project.isNew && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#c6af6c] to-[#a38444] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      NEW
                    </div>
                  )}

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                    <p className="text-xs text-gray-500">{t("startingFrom")}</p>
                    <p className="text-lg font-bold text-[#a38444]">{formatPrice(project.startingPrice)}</p>
                  </div>

                  {/* Property Types */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {project.propertyTypes.map((type) => (
                      <span key={type} className="bg-white/90 backdrop-blur-sm text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#c6af6c] transition-colors">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-[#c6af6c]" />
                    {project.location}
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BedDouble className="w-4 h-4 text-gray-400" />
                      <span>{project.bedrooms} BR</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Bath className="w-4 h-4 text-gray-400" />
                      <span>{project.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{project.totalUnits} {t("units")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{project.completionDate}</span>
                    </div>
                  </div>

                  {/* Developer */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 pb-4 border-b border-gray-100">
                    <Building2 className="w-4 h-4" />
                    <span>{project.developer}</span>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-[#c6af6c] to-[#a38444] hover:from-[#b39d5b] hover:to-[#8f7339] text-white group/btn">
                    {t("viewDetails")}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#c6af6c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c6af6c]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-[#c6af6c] to-[#a38444] hover:from-[#b39d5b] hover:to-[#8f7339] text-white px-8 py-6 text-lg shadow-xl">
                  {t("contactUs")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="px-8 py-6 text-lg border-white/30 text-white hover:bg-white/10">
                  {t("backHome")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
