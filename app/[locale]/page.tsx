"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bed, Bath, Maximize, MapPin, Search, Star, Phone, Mail, ChevronDown, ChevronLeft, ChevronRight, TrendingUp, Award, ArrowRight, Quote, Building2 } from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PartnersSection from "@/components/sections/partners";
import { toast } from "sonner";
import { getProperties, getPopularProperties, getClosedDeals, type Property as DataProperty } from "@/lib/data";

// Hero background images for slideshow
const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920",
];

// Mock reviews data
const mockReviews = [
  {
    id: "rev-001",
    name: "คุณสมชาย วงศ์สุวรรณ",
    rating: 5,
    comment: "บริการดีมากครับ ทีมงานมืออาชีพ ช่วยหาคอนโดได้ตรงใจมาก ขอบคุณครับ",
    transactionType: "rent",
    location: "สุขุมวิท",
    createdAt: "2025-11-15T10:00:00Z",
  },
  {
    id: "rev-002",
    name: "คุณนภา ศรีสุข",
    rating: 5,
    comment: "ประทับใจมากค่ะ ตอบคำถามรวดเร็ว พาชมห้องหลายที่จนได้ห้องที่ถูกใจ แนะนำเลยค่ะ",
    transactionType: "rent",
    location: "ทองหล่อ",
    createdAt: "2025-11-10T14:00:00Z",
  },
  {
    id: "rev-003",
    name: "คุณวิชัย ธนกิจ",
    rating: 4,
    comment: "ซื้อบ้านผ่าน Budget Wise Property ทุกอย่างราบรื่น เอกสารครบถ้วน แนะนำครับ",
    transactionType: "sale",
    location: "บางนา",
    createdAt: "2025-11-05T09:00:00Z",
  },
];

// Mock projects data
const mockProjects = [
  {
    projectCode: "PROJ-001",
    projectNameEn: "The Diplomat 39",
    projectNameTh: "เดอะ ดิโพลแมท 39",
    count: 5,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
  },
  {
    projectCode: "PROJ-002",
    projectNameEn: "Noble Around Ari",
    projectNameTh: "โนเบิล อะราวด์ อารีย์",
    count: 3,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  },
  {
    projectCode: "PROJ-003",
    projectNameEn: "The Met Sathorn",
    projectNameTh: "เดอะ เม็ท สาทร",
    count: 4,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  },
  {
    projectCode: "PROJ-004",
    projectNameEn: "Life Sukhumvit",
    projectNameTh: "ไลฟ์ สุขุมวิท",
    count: 6,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  },
  {
    projectCode: "PROJ-005",
    projectNameEn: "Setthasiri Bangna",
    projectNameTh: "เศรษฐสิริ บางนา",
    count: 4,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },
  {
    projectCode: "PROJ-006",
    projectNameEn: "Baan Klang Muang",
    projectNameTh: "บ้านกลางเมือง",
    count: 7,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  },
  {
    projectCode: "PROJ-007",
    projectNameEn: "Tela Thonglor",
    projectNameTh: "เทลา ทองหล่อ",
    count: 3,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  },
  {
    projectCode: "PROJ-008",
    projectNameEn: "Edge Sukhumvit 23",
    projectNameTh: "เอดจ์ สุขุมวิท 23",
    count: 5,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
  },
];

interface Promotion {
  id: string;
  label: string;
  type: string;
  isActive: boolean;
}

interface PropertyTag {
  id: string;
  name: string;
  color: string | null;
}

interface PropertyExtension {
  id: string;
  priority: number;
  isHidden: boolean;
  isFeaturedPopular: boolean;
  promotions: Promotion[];
  tags: PropertyTag[];
}

type PropertyStatus =
  | "pending"
  | "available"
  | "reserved"
  | "under_contract"
  | "sold"
  | "rented"
  | "under_maintenance"
  | "off_market";

interface Property {
  id: string;
  agentPropertyCode: string | null;
  propertyType: string;
  propertyTitleEn: string;
  propertyTitleTh: string;
  bedRoomNum: number;
  bathRoomNum: number;
  roomSizeNum: number | null;
  usableAreaSqm: number | null;
  landSizeSqw: number | null;
  floor: string | null;
  building: string | null;
  imageUrls: string[];
  rentalRateNum: number | null;
  sellPriceNum: number | null;
  latitude: number | null;
  longitude: number | null;
  status: PropertyStatus;
  views?: number;
  project: {
    projectNameEn: string;
    projectNameTh: string;
  } | null;
  extension?: PropertyExtension | null;
}

interface Project {
  projectCode: string;
  projectNameEn: string;
  projectNameTh: string;
  count: number;
  image: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  transactionType: string;
  location: string;
  createdAt: string;
}

export default function PublicPropertiesPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [properties, setProperties] = useState<Property[]>([]);
  const [popularProperties, setPopularProperties] = useState<Property[]>([]);
  const [closedDeals, setClosedDeals] = useState<Property[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const popularSliderRef = useRef<HTMLDivElement>(null);
  const closedDealsSliderRef = useRef<HTMLDivElement>(null);

  // Slider scroll position states
  const [popularCanScrollLeft, setPopularCanScrollLeft] = useState(false);
  const [popularCanScrollRight, setPopularCanScrollRight] = useState(true);
  const [closedCanScrollLeft, setClosedCanScrollLeft] = useState(false);
  const [closedCanScrollRight, setClosedCanScrollRight] = useState(true);

  // Hero background slideshow
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filters
  const [propertyType, setPropertyType] = useState<string>("");
  const [listingType, setListingType] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // Handle search - navigate to /search with filters
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (propertyType && propertyType !== "all") params.set("propertyType", propertyType);
    if (listingType && listingType !== "all") params.set("listingType", listingType);
    if (bedrooms && bedrooms !== "all") params.set("bedrooms", bedrooms);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const queryString = params.toString();
    router.push(`/search${queryString ? `?${queryString}` : ""}`);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero background image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(observerRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Convert DataProperty to Property format
  const convertProperty = (p: DataProperty): Property => ({
    id: p.id,
    agentPropertyCode: p.agentPropertyCode,
    propertyType: p.propertyType,
    propertyTitleEn: p.propertyTitleEn,
    propertyTitleTh: p.propertyTitleTh,
    bedRoomNum: p.bedRoomNum,
    bathRoomNum: p.bathRoomNum,
    roomSizeNum: p.roomSizeNum,
    usableAreaSqm: p.usableAreaSqm,
    landSizeSqw: p.landSizeSqw,
    floor: p.floor,
    building: p.building,
    imageUrls: p.imageUrls,
    rentalRateNum: p.rentalRateNum,
    sellPriceNum: p.sellPriceNum,
    latitude: p.latitude,
    longitude: p.longitude,
    status: p.status as PropertyStatus,
    views: p.views,
    project: p.project,
  });

  // Load properties from mock data with filters
  const loadProperties = () => {
    setLoading(true);
    let allProperties = getProperties().filter(p => p.status === "active");

    // Apply filters
    if (propertyType && propertyType !== "all") {
      allProperties = allProperties.filter(p => p.propertyType === propertyType);
    }
    if (listingType && listingType !== "all") {
      if (listingType === "rent") {
        allProperties = allProperties.filter(p => p.rentalRateNum && p.rentalRateNum > 0);
      } else if (listingType === "sale") {
        allProperties = allProperties.filter(p => p.sellPriceNum && p.sellPriceNum > 0);
      }
    }
    if (bedrooms && bedrooms !== "all") {
      const bedroomNum = parseInt(bedrooms);
      allProperties = allProperties.filter(p => p.bedRoomNum >= bedroomNum);
    }
    if (minPrice) {
      const min = parseInt(minPrice);
      allProperties = allProperties.filter(p => {
        const price = p.rentalRateNum || p.sellPriceNum || 0;
        return price >= min;
      });
    }
    if (maxPrice) {
      const max = parseInt(maxPrice);
      allProperties = allProperties.filter(p => {
        const price = p.rentalRateNum || p.sellPriceNum || 0;
        return price <= max;
      });
    }

    // Pagination
    const limit = 12;
    const startIndex = (page - 1) * limit;
    const paginatedProperties = allProperties.slice(startIndex, startIndex + limit);

    setProperties(paginatedProperties.map(convertProperty));
    setTotal(allProperties.length);
    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, [page, propertyType, listingType, bedrooms, minPrice, maxPrice]);

  // Load popular properties, closed deals, projects, and reviews from mock data
  useEffect(() => {
    // Popular properties
    const popular = getPopularProperties(10).map(convertProperty);
    setPopularProperties(popular);

    // Closed deals
    const closed = getClosedDeals(8).map(convertProperty);
    setClosedDeals(closed);

    // Projects from mock data
    setProjects(mockProjects);

    // Reviews from mock data
    setReviews(mockReviews);
  }, []);

  // Check slider scroll position
  const checkSliderScroll = (ref: React.RefObject<HTMLDivElement | null>, type: "popular" | "closed") => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const canLeft = scrollLeft > 0;
      const canRight = scrollLeft < scrollWidth - clientWidth - 10;

      if (type === "popular") {
        setPopularCanScrollLeft(canLeft);
        setPopularCanScrollRight(canRight);
      } else {
        setClosedCanScrollLeft(canLeft);
        setClosedCanScrollRight(canRight);
      }
    }
  };

  // Initialize slider scroll states
  useEffect(() => {
    checkSliderScroll(popularSliderRef, "popular");
    checkSliderScroll(closedDealsSliderRef, "closed");
  }, [popularProperties, closedDeals]);

  // Slider scroll functions
  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right", type: "popular" | "closed") => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      // Check scroll position after animation
      setTimeout(() => checkSliderScroll(ref, type), 350);
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return new Intl.NumberFormat("th-TH").format(price);
  };

  const getSize = (property: Property) => {
    if (property.propertyType === "Condo") {
      return property.roomSizeNum ? `${property.roomSizeNum}` : "-";
    }
    return property.usableAreaSqm ? `${property.usableAreaSqm}` : "-";
  };

  const handleResetFilters = () => {
    setPropertyType("");
    setListingType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Shared Header */}
      <Header transparent />

      {/* Hero Section with Parallax */}
      <div className="relative h-[75vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Rotating Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
              index === currentImageIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Animated Overlay Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4LTguMDYtMTgtMTgtMTh6bS00LjUgMjcuNUMxOC42IDQzLjIgOCAzMi43IDggMjBjMC03LjcgNi4zLTE0IDE0LTE0czE0IDYuMyAxNCAxNC02LjMgMTQtMTQgMTR6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <div
            className="animate-fade-in-up"
            style={{ animation: "fadeInUp 1s ease-out" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {t("hero.title")}
              <br />
              <span className="text-[#c6af6c]">{t("hero.titleHighlight")}</span>
            </h1>
          </div>
          <p
            className="text-sm md:text-lg mb-8 md:mb-16 text-gray-200 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animation: "fadeInUp 1s ease-out 0.2s both" }}
          >
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Scroll Indicator - hidden on smaller hero */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden">
          <ChevronDown className="w-10 h-10 text-white drop-shadow-lg" />
        </div>

        {/* Floating Stats */}
        <div
          className="absolute bottom-4 md:bottom-32 left-0 right-0 animate-fade-in-up"
          style={{ animation: "fadeInUp 1s ease-out 0.6s both" }}
        >
          <div className="container mx-auto px-4 md:px-6">
            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="flex md:grid md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {[
                { number: "500+", label: t("hero.stats.properties") },
                { number: "1000+", label: t("hero.stats.happyClients") },
                { number: "50+", label: t("hero.stats.expertAgents") },
                { number: "15+", label: t("hero.stats.years") },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[22%] md:w-auto bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-3 text-center text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-base md:text-2xl font-bold text-[#c6af6c] mb-0.5 md:mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-200 whitespace-nowrap">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section
        id="search"
        ref={(el) => {
          observerRefs.current["search"] = el;
        }}
        className="relative -mt-28 z-20"
      >
        <div className="container mx-auto px-4 pb-10">
          <Card
            className={`max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border-0 transition-all duration-1000 ${
              isVisible["search"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Row 1: Main filters */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {t("search.listingType")}
                </label>
                <Select value={listingType} onValueChange={setListingType}>
                  <SelectTrigger className="h-11 text-sm border-gray-200">
                    <SelectValue placeholder={t("search.all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("search.all")}</SelectItem>
                    <SelectItem value="rent">{t("search.rent")}</SelectItem>
                    <SelectItem value="sale">{t("search.sale")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {t("search.propertyType")}
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-11 text-sm border-gray-200">
                    <SelectValue placeholder={t("search.all")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("search.all")}</SelectItem>
                    <SelectItem value="Condo">{t("search.condo")}</SelectItem>
                    <SelectItem value="Townhouse">{t("search.townhouse")}</SelectItem>
                    <SelectItem value="SingleHouse">{t("search.singleHouse")}</SelectItem>
                    <SelectItem value="Land">{t("search.land")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {t("search.bedrooms")}
                </label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="h-11 text-sm border-gray-200">
                    <SelectValue placeholder={t("common.notSpecified")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("common.notSpecified")}</SelectItem>
                    <SelectItem value="1">1 {t("common.room")}</SelectItem>
                    <SelectItem value="2">2 {t("common.rooms")}</SelectItem>
                    <SelectItem value="3">3 {t("common.rooms")}</SelectItem>
                    <SelectItem value="4">4+ {t("common.rooms")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2: Price range + Search button */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {t("search.minPrice")}
                </label>
                <Input
                  type="number"
                  placeholder={t("common.notSpecified")}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-11 text-sm border-gray-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {t("search.maxPrice")}
                </label>
                <Input
                  type="number"
                  placeholder={t("common.notSpecified")}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="h-11 text-sm border-gray-200"
                />
              </div>

              <div className="flex items-end">
                <Button
                  className="h-11 w-full bg-[#c6af6c] hover:bg-[#b39d5b] text-white text-sm font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {t("search.searchButton")}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Popular Properties Section */}
      <section
        id="popular"
        ref={(el) => {
          observerRefs.current["popular"] = el;
        }}
        className="py-1 bg-white"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div
            className={`flex items-center justify-between mb-8 transition-all duration-1000 ${
              isVisible["popular"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-[#c6af6c]" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t("sections.popularProperties")}
                </h2>
              </div>
              <p className="text-gray-600">{t("sections.popularSubtitle")}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`w-11 h-11 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  popularCanScrollLeft
                    ? "border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white"
                    : "border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
                onClick={() => scrollSlider(popularSliderRef, "left", "popular")}
                disabled={!popularCanScrollLeft}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className={`w-11 h-11 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  popularCanScrollRight
                    ? "border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white"
                    : "border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
                onClick={() => scrollSlider(popularSliderRef, "right", "popular")}
                disabled={!popularCanScrollRight}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div
            ref={popularSliderRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={() => checkSliderScroll(popularSliderRef, "popular")}
          >
            {popularProperties.map((property, index) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className={`flex-shrink-0 w-72 transition-all duration-500 ${
                  isVisible["popular"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 rounded-xl bg-white h-full">
                  <div className="relative h-44 overflow-hidden">
                    {property.imageUrls && property.imageUrls.length > 0 ? (
                      <Image
                        src={property.imageUrls[0]}
                        alt={property.propertyTitleTh || property.propertyTitleEn}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <MapPin className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Promotion or Popular Badge */}
                    {property.extension?.promotions && property.extension.promotions.length > 0 ? (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        {property.extension.promotions[0].label}
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-[#c6af6c] text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                    {/* Listing Type Badges */}
                    <div className="absolute top-3 right-3 flex gap-1">
                      {property.rentalRateNum && property.rentalRateNum > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold text-white bg-emerald-500">
                          {t("property.forRent")}
                        </span>
                      )}
                      {property.sellPriceNum && property.sellPriceNum > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold text-white bg-amber-500">
                          {t("property.forSale")}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-lg line-clamp-1 drop-shadow-lg">
                        {property.rentalRateNum
                          ? `฿${formatPrice(property.rentalRateNum)}${t("property.perMonth")}`
                          : `฿${formatPrice(property.sellPriceNum)}`}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-[#c6af6c] transition-colors">
                      {property.propertyTitleTh || property.propertyTitleEn}
                    </h3>
                    {property.project && (
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" />
                        {property.project.projectNameTh || property.project.projectNameEn}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-[#c6af6c]" />
                        {property.bedRoomNum}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-[#c6af6c]" />
                        {property.bathRoomNum}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3 h-3 text-[#c6af6c]" />
                        {getSize(property)} {t("common.sqm")}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Just Closed Deals Section */}
      <section
        id="closed-deals"
        ref={(el) => {
          observerRefs.current["closed-deals"] = el;
        }}
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div
            className={`flex items-center justify-between mb-8 transition-all duration-1000 ${
              isVisible["closed-deals"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-6 h-6 text-[#c6af6c]" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t("sections.closedDeals")}
                </h2>
              </div>
              <p className="text-gray-600">{t("sections.closedDealsSubtitle")}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`w-11 h-11 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  closedCanScrollLeft
                    ? "border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white"
                    : "border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
                onClick={() => scrollSlider(closedDealsSliderRef, "left", "closed")}
                disabled={!closedCanScrollLeft}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className={`w-11 h-11 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  closedCanScrollRight
                    ? "border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white"
                    : "border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
                onClick={() => scrollSlider(closedDealsSliderRef, "right", "closed")}
                disabled={!closedCanScrollRight}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div
            ref={closedDealsSliderRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={() => checkSliderScroll(closedDealsSliderRef, "closed")}
          >
            {closedDeals.map((property, index) => (
              <div
                key={property.id}
                className={`flex-shrink-0 w-72 transition-all duration-500 ${
                  isVisible["closed-deals"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="group overflow-hidden transition-all duration-500 border-0 rounded-xl bg-white h-full relative">
                  {/* Sold/Rented Overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                      <div
                        className={`absolute top-4 -right-8 w-40 text-center py-1 text-xs font-bold text-white transform rotate-45 shadow-lg ${
                          property.status === "sold" ? "bg-red-500" : "bg-blue-500"
                        }`}
                      >
                        {property.status === "sold" ? t("property.sold") : t("property.rented")}
                      </div>
                    </div>
                  </div>
                  <div className="relative h-44 overflow-hidden">
                    {property.imageUrls && property.imageUrls.length > 0 ? (
                      <Image
                        src={property.imageUrls[0]}
                        alt={property.propertyTitleTh || property.propertyTitleEn}
                        fill
                        className="object-cover grayscale-[30%]"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <MapPin className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-lg line-clamp-1 drop-shadow-lg">
                        {property.status === "sold"
                          ? `฿${formatPrice(property.sellPriceNum)}`
                          : `฿${formatPrice(property.rentalRateNum)}${t("property.perMonth")}`}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                      {property.propertyTitleTh || property.propertyTitleEn}
                    </h3>
                    {property.project && (
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" />
                        {property.project.projectNameTh || property.project.projectNameEn}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-[#c6af6c]" />
                        {property.bedRoomNum}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-[#c6af6c]" />
                        {property.bathRoomNum}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3 h-3 text-[#c6af6c]" />
                        {getSize(property)} {t("common.sqm")}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => {
          observerRefs.current["projects"] = el;
        }}
        className="py-4 bg-white"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              isVisible["projects"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t("sections.popularProjects")}
            </h2>
            <div className="w-16 h-1 bg-[#c6af6c] mx-auto mb-3"></div>
            <p className="text-gray-600">{t("sections.popularProjectsSubtitle")}</p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.map((project, index) => (
              <Link
                key={project.projectCode}
                href={`/search?project=${encodeURIComponent(project.projectCode)}`}
                className={`group transition-all duration-500 ${
                  isVisible["projects"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card className="relative overflow-hidden rounded-xl h-40 cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.projectNameTh || project.projectNameEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <Building2 className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-lg text-center line-clamp-2">{project.projectNameTh || project.projectNameEn}</h3>
                    <p className="text-sm text-gray-200">{project.count} {t("common.properties")}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c6af6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Card>
              </Link>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-8">
            <Link href="/search">
              <Button
                variant="outline"
                className="border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white px-8 transform hover:scale-105 transition-all duration-300"
              >
                {t("sections.viewAllProjects")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Projects Section */}
      {/* <section
        id="new-projects"
        ref={(el) => {
          observerRefs.current["new-projects"] = el;
        }}
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">

          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              isVisible["new-projects"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t("nav.newProjects")}
            </h2>
            <div className="w-16 h-1 bg-[#c6af6c] mx-auto mb-3"></div>
            <p className="text-gray-600">{t("sections.popularProjectsSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "project-1", name: "The Skyline Residence", location: "Sukhumvit, Bangkok", imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", startingPrice: 4500000, propertyTypes: ["Condo"], isNew: true },
              { id: "project-2", name: "Garden Valley Villas", location: "Pattaya, Chonburi", imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", startingPrice: 8900000, propertyTypes: ["Single House"], isNew: true },
              { id: "project-4", name: "Riverside Serenity", location: "Chao Phraya, Bangkok", imageUrl: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80", startingPrice: 12500000, propertyTypes: ["Condo"], isNew: true },
            ].map((project, index) => (
              <Link key={project.id} href={`/property/${project.id}`}>
                <Card
                  className={`overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                    isVisible["new-projects"]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    {project.isNew && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#c6af6c] to-[#a38444] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
                        NEW
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-2xl font-bold">
                        ฿{(project.startingPrice / 1000000).toFixed(1)}M+
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </p>
                    <div className="flex items-center gap-2">
                      {project.propertyTypes.map((type) => (
                        <span key={type} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          View All Button
          <div className="text-center mt-8">
            <Link href="/new-projects">
              <Button
                variant="outline"
                className="border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white px-8 transform hover:scale-105 transition-all duration-300"
              >
                {t("sections.viewAllProjects")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Properties Section */}
      <section
        id="properties"
        ref={(el) => {
          observerRefs.current["properties"] = el;
        }}
        className="py-12 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ${
              isVisible["properties"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t("sections.allProperties")}
            </h2>
            <div className="w-16 h-1 bg-[#c6af6c] mx-auto mb-3"></div>
            <p className="text-base text-gray-600">
              {t("search.resultsFound", { count: total })}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <Card
                  key={i}
                  className="h-80 animate-pulse bg-gray-100 rounded-xl"
                />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("search.noPropertiesFound")}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t("search.tryAdjustFilters")}
              </p>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                {t("search.resetFilters")}
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {properties.map((property, index) => (
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    className={`block transition-all duration-500 ${
                      isVisible["properties"]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                  <Card
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 rounded-xl bg-white h-full"
                  >
                    {/* Property Image */}
                    <div className="relative h-40 bg-gray-100 overflow-hidden">
                      {property.imageUrls && property.imageUrls.length > 0 ? (
                        <Image
                          src={property.imageUrls[0]}
                          alt={property.propertyTitleEn || "Property"}
                          fill
                          className="object-cover group-hover:scale-125 transition-transform duration-700"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <MapPin className="w-12 h-12" />
                        </div>
                      )}

                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Promotion Badge */}
                      {property.extension?.promotions && property.extension.promotions.length > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                          {property.extension.promotions[0].label}
                        </div>
                      )}
                      {/* Listing Type Badge - only show if no promotion */}
                      {(!property.extension?.promotions || property.extension.promotions.length === 0) && (
                        <>
                          {property.rentalRateNum && property.rentalRateNum > 0 && (
                            <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                              {t("property.forRent")}
                            </div>
                          )}
                          {property.sellPriceNum &&
                            property.sellPriceNum > 0 &&
                            !property.rentalRateNum && (
                              <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                                {t("property.forSale")}
                              </div>
                            )}
                        </>
                      )}

                      {/* Property Type Badge */}
                      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md text-gray-800 px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {property.propertyType === "Condo"
                          ? t("search.condo")
                          : property.propertyType === "Townhouse"
                          ? t("search.townhouse")
                          : property.propertyType === "Land"
                          ? t("search.land")
                          : t("search.singleHouse")}
                      </div>


                    </div>

                    {/* Property Details */}
                    <div className="p-3">
                      {/* Project Name */}
                      {property.project && (
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.project.projectNameTh ||
                            property.project.projectNameEn}
                        </div>
                      )}

                      {/* Property Title - only show if not Condo */}
                      {property.propertyType !== "Condo" && (
                        <h3 className="font-bold text-sm mb-2 line-clamp-2 h-10 text-gray-900 group-hover:text-[#c6af6c] transition-colors duration-300">
                          {property.propertyTitleTh ||
                            property.propertyTitleEn ||
                            t("property.noName")}
                        </h3>
                      )}

                      {/* Property Features */}
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2 pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-1">
                          <Bed className="w-3 h-3 text-[#c6af6c]" />
                          <span className="font-semibold">
                            {property.bedRoomNum}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-3 h-3 text-[#c6af6c]" />
                          <span className="font-semibold">
                            {property.bathRoomNum}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize className="w-3 h-3 text-[#c6af6c]" />
                          <span className="font-semibold">
                            {getSize(property)} {t("common.sqm")}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        {property.rentalRateNum != null && property.rentalRateNum > 0 && (
                          <div className="text-lg font-bold text-[#c6af6c]">
                            <span className="text-sm font-medium text-gray-600">{t("search.rent")}: </span>
                            ฿ {formatPrice(property.rentalRateNum)}
                            <span className="text-xs font-normal text-gray-600">
                              {t("property.perMonth")}
                            </span>
                          </div>
                        )}
                        {property.sellPriceNum != null && property.sellPriceNum > 0 &&
                          (property.rentalRateNum == null || property.rentalRateNum === 0) && (
                            <div className="text-lg font-bold text-[#c6af6c]">
                              <span className="text-sm font-medium text-gray-600">{t("search.sale")}: </span>
                              ฿ {formatPrice(property.sellPriceNum)}
                            </div>
                          )}
                      </div>

                      {/* Tags */}
                      {property.extension?.tags && property.extension.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {property.extension.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: tag.color || "#3B82F6" }}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Property Code */}
                      <div className="text-xs text-gray-400 mt-2">
                        {t("common.code")}: {property.agentPropertyCode || "-"}
                      </div>
                    </div>
                  </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {total > 12 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="text-xs border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {t("common.previous")}
                  </Button>
                  <div className="flex gap-2">
                    {Array.from(
                      { length: Math.min(5, Math.ceil(total / 12)) },
                      (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            size="sm"
                            variant={page === pageNum ? "default" : "outline"}
                            onClick={() => setPage(pageNum)}
                            className={
                              page === pageNum
                                ? "bg-[#c6af6c] hover:bg-[#b39d5b] text-white text-xs"
                                : "border-gray-300 hover:bg-gray-50 text-xs"
                            }
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                    )}
                    {Math.ceil(total / 12) > 5 && (
                      <span className="flex items-center px-2 text-gray-500">
                        ...
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page >= Math.ceil(total / 12)}
                    onClick={() => setPage(page + 1)}
                    className="text-xs border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {t("common.next")}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section
        id="contact"
        ref={(el) => {
          observerRefs.current["contact"] = el;
        }}
        className="relative py-16 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#c6af6c] via-[#b39d5b] to-[#c6af6c] bg-[length:200%_200%] animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4LTguMDYtMTgtMTgtMTh6bS00LjUgMjcuNUMxOC42IDQzLjIgOCAzMi43IDggMjBjMC03LjcgNi4zLTE0IDE0LTE0czE0IDYuMyAxNCAxNC02LjMgMTQtMTQgMTR6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

        <div
          className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
            isVisible["contact"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-base mb-6 text-white/90">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="default"
                className="bg-white text-[#c6af6c] hover:bg-gray-100 font-bold px-6 py-4 rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl"
                onClick={() => {
                  navigator.clipboard.writeText("0655614169");
                  toast.success(t("common.copiedPhone"));
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                065-555-9999
              </Button>
              <Button
                size="default"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-[#c6af6c] font-bold px-6 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  navigator.clipboard.writeText("bkgroup.ch.official@gmail.com");
                  toast.success(t("common.copiedEmail"));
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                bkgroup.ch.official@gmail.com
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section
        id="reviews"
        ref={(el) => {
          observerRefs.current["reviews"] = el;
        }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              isVisible["reviews"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t("sections.reviews")}
            </h2>
            <div className="w-16 h-1 bg-[#c6af6c] mx-auto mb-3"></div>
            <p className="text-gray-600">{t("sections.reviewsSubtitle")}</p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => {
                const avatarColors = ["bg-[#c6af6c]", "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500"];
                const avatarColor = avatarColors[index % avatarColors.length];
                const firstChar = review.name.charAt(0).toUpperCase();

                return (
                  <Card
                    key={review.id}
                    className={`p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
                      isVisible["reviews"]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#c6af6c] mb-3" />
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      &quot;{review.comment}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                        {firstChar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-500">
                          {review.transactionType === "rent" ? t("review.rentedAt") : t("review.boughtAt")} {review.location}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                {t("sections.noReviews")}
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link href="/reviews">
              <Button
                variant="outline"
                className="border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c] hover:text-white px-8 transform hover:scale-105 transition-all duration-300"
              >
                {t("sections.viewAllReviews")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Footer */}
      <Footer />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
