"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Search,
  X,
  SlidersHorizontal,
  Grid3X3,
  List,
  Building2,
  Sparkles,
  Tag,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getProperties, type Property as DataProperty } from "@/lib/data";

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
  agentPropertyCode: string;
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
  district?: string;
  projectCode?: string;
  status: PropertyStatus;
  project: {
    projectNameEn: string;
    projectNameTh: string;
  } | null;
  extension: PropertyExtension | null;
}

interface Project {
  projectCode: string;
  projectNameEn: string;
  projectNameTh: string;
  count: number;
  image: string;
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const locale = useLocale();

  // Read all filter params from URL
  const projectParam = searchParams.get("project") || "";
  const propertyTypeParam = searchParams.get("propertyType") || "";
  const listingTypeParam = searchParams.get("listingType") || "";
  const bedroomsParam = searchParams.get("bedrooms") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(projectParam);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Filters - initialized from URL params
  const [searchText, setSearchText] = useState<string>(searchParams.get("q") || "");
  const [propertyType, setPropertyType] = useState<string>(propertyTypeParam);
  const [listingType, setListingType] = useState<string>(listingTypeParam);
  const [bedrooms, setBedrooms] = useState<string>(bedroomsParam);
  const [minPrice, setMinPrice] = useState<string>(minPriceParam);
  const [maxPrice, setMaxPrice] = useState<string>(maxPriceParam);

  // Sync state with URL params when they change (e.g., navigating from homepage)
  useEffect(() => {
    setSearchText(searchParams.get("q") || "");
    setSelectedProject(searchParams.get("project") || "");
    setPropertyType(searchParams.get("propertyType") || "");
    setListingType(searchParams.get("listingType") || "");
    setBedrooms(searchParams.get("bedrooms") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
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
    district: p.district,
    status: p.status as PropertyStatus,
    project: p.project,
    extension: null,
  });

  // Load data from mock
  useEffect(() => {
    setLoading(true);
    // Load properties from mock data
    const mockProperties = getProperties().map(convertProperty);
    setAllProperties(mockProperties);
    // Load projects from mock data
    setProjects(mockProjects);
    setLoading(false);
  }, []);

  // Filter properties based on selected filters
  useEffect(() => {
    let filtered = [...allProperties];

    // Filter by text search
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.propertyTitleTh?.toLowerCase().includes(searchLower) ||
          p.propertyTitleEn?.toLowerCase().includes(searchLower) ||
          p.agentPropertyCode?.toLowerCase().includes(searchLower) ||
          p.project?.projectNameTh?.toLowerCase().includes(searchLower) ||
          p.project?.projectNameEn?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by project
    if (selectedProject) {
      filtered = filtered.filter(
        (p) => p.projectCode === selectedProject
      );
    }

    // Filter by property type
    if (propertyType && propertyType !== "all") {
      filtered = filtered.filter((p) => p.propertyType === propertyType);
    }

    // Filter by listing type
    if (listingType && listingType !== "all") {
      if (listingType === "rent") {
        filtered = filtered.filter(
          (p) => p.rentalRateNum && p.rentalRateNum > 0
        );
      } else if (listingType === "sale") {
        filtered = filtered.filter(
          (p) => p.sellPriceNum && p.sellPriceNum > 0 && !p.rentalRateNum
        );
      }
    }

    // Filter by bedrooms
    if (bedrooms && bedrooms !== "all") {
      const bedroomNum = parseInt(bedrooms);
      if (bedroomNum === 4) {
        filtered = filtered.filter((p) => p.bedRoomNum >= 4);
      } else {
        filtered = filtered.filter((p) => p.bedRoomNum === bedroomNum);
      }
    }

    // Filter by price
    if (minPrice) {
      const min = parseInt(minPrice);
      filtered = filtered.filter((p) => {
        const price = p.rentalRateNum || p.sellPriceNum || 0;
        return price >= min;
      });
    }
    if (maxPrice) {
      const max = parseInt(maxPrice);
      filtered = filtered.filter((p) => {
        const price = p.rentalRateNum || p.sellPriceNum || 0;
        return price <= max;
      });
    }

    setProperties(filtered);
  }, [
    allProperties,
    searchText,
    selectedProject,
    propertyType,
    listingType,
    bedrooms,
    minPrice,
    maxPrice,
  ]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchText) params.set("q", searchText);
    if (selectedProject) params.set("project", selectedProject);
    if (propertyType && propertyType !== "all") params.set("propertyType", propertyType);
    if (listingType && listingType !== "all") params.set("listingType", listingType);
    if (bedrooms && bedrooms !== "all") params.set("bedrooms", bedrooms);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const queryString = params.toString();
    router.push(`/search${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }, [searchText, selectedProject, propertyType, listingType, bedrooms, minPrice, maxPrice, router]);

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
    setSearchText("");
    setSelectedProject("");
    setPropertyType("");
    setListingType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleProjectSelect = (projectCode: string) => {
    setSelectedProject(projectCode === selectedProject ? "" : projectCode);
  };

  // Get selected project name for display
  const selectedProjectName = projects.find(p => p.projectCode === selectedProject)?.projectNameTh ||
                              projects.find(p => p.projectCode === selectedProject)?.projectNameEn ||
                              selectedProject;

  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      {/* Shared Header */}
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#C9A227] to-[#A88B1F] py-12">
        <div
          className={`container mx-auto px-4 text-center text-white transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {selectedProject
              ? `${t("searchPage.title")} - ${selectedProjectName}`
              : t("searchPage.title")}
          </h1>
          <p className="text-lg text-white/90 mb-6">
            {selectedProject
              ? `${properties.length} ${t("common.properties")} - ${selectedProjectName}`
              : t("searchPage.subtitle")}
          </p>

          {selectedProject && (
            <Button
              variant="outline"
              className="bg-white/20 border-white text-white hover:bg-white hover:text-[#C9A227]"
              onClick={() => setSelectedProject("")}
            >
              <X className="w-4 h-4 mr-2" />
              {t("search.resetFilters")}
            </Button>
          )}
        </div>
      </section>

      {/* Projects Quick Select */}
      <section className="bg-[#152238] py-6 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {projects.map((project) => (
              <Button
                key={project.projectCode}
                variant={
                  selectedProject === project.projectCode ? "default" : "outline"
                }
                className={`transition-all duration-300 ${
                  selectedProject === project.projectCode
                    ? "bg-[#C9A227] hover:bg-[#A88B1F] text-white border-[#C9A227]"
                    : "bg-[#1B2D44] border-2 border-white/20 text-white hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:text-[#C9A227]"
                }`}
                onClick={() => handleProjectSelect(project.projectCode)}
              >
                <Building2 className="w-4 h-4 mr-1" />
                {project.projectNameTh || project.projectNameEn}
                <span className="ml-1 text-xs opacity-75">
                  ({project.count})
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            className="w-full border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showFilters ? t("searchPage.hideFilters") : t("searchPage.showFilters")}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`lg:w-72 ${
              showFilters ? "block" : "hidden"
            } lg:block transition-all duration-300`}
          >
            <Card className="p-6 sticky top-24 shadow-lg bg-[#1B2D44] border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">{t("searchPage.filters")}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-0 text-[#C9A227] hover:text-[#A88B1F] hover:bg-transparent"
                  onClick={handleResetFilters}
                >
                  {t("search.resetFilters")}
                </Button>
              </div>

              <div className="space-y-5">
                {/* Text Search */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    {t("common.search")}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder={t("searchPage.searchPlaceholder")}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="pl-10 border-white/20 bg-[#152238] text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    {t("search.propertyType")}
                  </label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="border-white/20 bg-[#152238] text-white">
                      <SelectValue placeholder={t("search.all")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2D44] border-white/20">
                      <SelectItem value="all">{t("search.all")}</SelectItem>
                      <SelectItem value="Condo">{t("search.condo")}</SelectItem>
                      <SelectItem value="Townhouse">{t("search.townhouse")}</SelectItem>
                      <SelectItem value="SingleHouse">{t("search.singleHouse")}</SelectItem>
                      <SelectItem value="Land">{t("search.land")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Listing Type */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    {t("search.listingType")}
                  </label>
                  <Select value={listingType} onValueChange={setListingType}>
                    <SelectTrigger className="border-white/20 bg-[#152238] text-white">
                      <SelectValue placeholder={t("search.all")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2D44] border-white/20">
                      <SelectItem value="all">{t("search.all")}</SelectItem>
                      <SelectItem value="rent">{t("search.rent")}</SelectItem>
                      <SelectItem value="sale">{t("search.sale")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    {t("search.bedrooms")}
                  </label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="border-white/20 bg-[#152238] text-white">
                      <SelectValue placeholder={t("common.notSpecified")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2D44] border-white/20">
                      <SelectItem value="all">{t("common.notSpecified")}</SelectItem>
                      <SelectItem value="1">1 {t("common.room")}</SelectItem>
                      <SelectItem value="2">2 {t("common.rooms")}</SelectItem>
                      <SelectItem value="3">3 {t("common.rooms")}</SelectItem>
                      <SelectItem value="4">4+ {t("common.rooms")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    {t("search.minPrice")} - {t("search.maxPrice")}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder={t("search.minPrice")}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="border-white/20 bg-[#152238] text-white placeholder:text-gray-500"
                    />
                    <Input
                      type="number"
                      placeholder={t("search.maxPrice")}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="border-white/20 bg-[#152238] text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {t("searchPage.title")}
                </h2>
                <p className="text-sm text-gray-400">
                  {properties.length} {t("common.properties")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  className={
                    viewMode === "grid"
                      ? "bg-[#C9A227] hover:bg-[#A88B1F]"
                      : "border-white/20 text-white hover:bg-white/10"
                  }
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  className={
                    viewMode === "list"
                      ? "bg-[#C9A227] hover:bg-[#A88B1F]"
                      : "border-white/20 text-white hover:bg-white/10"
                  }
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div
                className={`grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {[...Array(6)].map((_, i) => (
                  <Card
                    key={i}
                    className={`animate-pulse bg-[#152238] ${
                      viewMode === "grid" ? "h-80" : "h-40"
                    }`}
                  />
                ))}
              </div>
            ) : properties.length === 0 ? (
              /* Empty State */
              <Card className="p-12 text-center shadow-lg bg-[#1B2D44] border border-white/10">
                <div className="text-gray-500 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t("search.noPropertiesFound")}
                </h3>
                <p className="text-gray-400 mb-6">
                  {t("search.tryAdjustFilters")}
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="bg-[#C9A227] hover:bg-[#A88B1F] text-white"
                >
                  {t("search.resetFilters")}
                </Button>
              </Card>
            ) : (
              /* Properties Grid/List */
              <div
                className={`grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {properties.map((property, index) => (
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    className={`transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Card
                      className={`group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer bg-[#1B2D44] border border-white/10 hover:border-[#C9A227]/50 ${
                        viewMode === "list" ? "flex flex-row h-40" : ""
                      }`}
                    >
                      {/* Property Image */}
                      <div
                        className={`relative overflow-hidden bg-[#152238] flex-shrink-0 ${
                          viewMode === "list" ? "w-48 h-40" : "h-48"
                        }`}
                      >
                        {property.imageUrls && property.imageUrls.length > 0 ? (
                          <Image
                            src={property.imageUrls[0]}
                            alt={
                              property.propertyTitleTh ||
                              property.propertyTitleEn
                            }
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <MapPin className="w-12 h-12 text-gray-500" />
                          </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <div className="bg-[#C9A227] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                            {property.propertyType === "Condo"
                              ? t("search.condo")
                              : property.propertyType === "Townhouse"
                              ? t("search.townhouse")
                              : property.propertyType === "Land"
                              ? t("search.land")
                              : t("search.singleHouse")}
                          </div>
                          {/* Popular Badge */}
                          {property.extension?.isFeaturedPopular && (
                            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {t("property.popular")}
                            </div>
                          )}
                          {/* Promotion Badge */}
                          {property.extension?.promotions && property.extension.promotions.length > 0 && (
                            <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              {property.extension.promotions[0].label}
                            </div>
                          )}
                        </div>

                        {/* Listing Type & Closed Deal Badge */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          {property.status === "sold" || property.status === "rented" ? (
                            <div className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {property.status === "sold" ? t("property.sold") : t("property.rented")}
                            </div>
                          ) : (
                            <>
                              {property.rentalRateNum != null && property.rentalRateNum > 0 && (
                                <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                                  {t("property.forRent")}
                                </div>
                              )}
                              {property.sellPriceNum != null && property.sellPriceNum > 0 && (
                                <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                                  {t("property.forSale")}
                                </div>
                              )}
                            </>
                          )}
                        </div>

                      </div>

                      {/* Property Details */}
                      <div className="p-4 flex-1">
                        {property.project && (
                          <div className="flex items-center text-xs text-gray-500 mb-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.project.projectNameTh ||
                              property.project.projectNameEn}
                          </div>
                        )}

                        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-[#C9A227] transition-colors">
                          {property.propertyTitleTh || property.propertyTitleEn}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 pb-3 border-b border-white/10">
                          <div className="flex items-center gap-1">
                            <Bed className="w-3 h-3 text-[#C9A227]" />
                            <span className="font-semibold">
                              {property.bedRoomNum}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-3 h-3 text-[#C9A227]" />
                            <span className="font-semibold">
                              {property.bathRoomNum}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Maximize className="w-3 h-3 text-[#C9A227]" />
                            <span className="font-semibold">
                              {getSize(property)} {t("common.sqm")}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div>
                          {property.rentalRateNum != null &&
                            property.rentalRateNum > 0 && (
                              <div className="text-lg font-bold text-[#C9A227]">
                                <span className="text-xs font-normal text-gray-500 mr-1">{t("property.forRent")}:</span>
                                ฿{formatPrice(property.rentalRateNum)}
                                <span className="text-xs font-normal text-gray-400">
                                  {t("property.perMonth")}
                                </span>
                              </div>
                            )}
                          {property.sellPriceNum != null &&
                            property.sellPriceNum > 0 && (
                              <div className={`font-bold text-[#C9A227] ${property.rentalRateNum != null && property.rentalRateNum > 0 ? "text-sm mt-1" : "text-lg"}`}>
                                <span className="text-xs font-normal text-gray-500 mr-1">{t("property.forSale")}:</span>
                                ฿{formatPrice(property.sellPriceNum)}
                              </div>
                            )}
                        </div>

                        {/* Tags */}
                        {property.extension?.tags && property.extension.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {property.extension.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag.id}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: `${tag.color || "#3B82F6"}20`,
                                  color: tag.color || "#3B82F6",
                                }}
                              >
                                <Tag className="w-2.5 h-2.5" />
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="text-xs text-gray-400 mt-2">
                          {t("common.code")}: {property.agentPropertyCode}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      <header className="bg-[#152238] shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1B2D44] rounded animate-pulse" />
            <div className="w-32 h-6 bg-[#1B2D44] rounded animate-pulse" />
          </div>
        </div>
      </header>
      <section className="bg-gradient-to-r from-[#C9A227] to-[#A88B1F] py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="w-64 h-10 bg-white/30 rounded mx-auto mb-4 animate-pulse" />
          <div className="w-48 h-6 bg-white/30 rounded mx-auto animate-pulse" />
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-[#152238] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}
