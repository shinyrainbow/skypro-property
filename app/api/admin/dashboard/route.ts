import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchNainaHubProperties } from "@/lib/nainahub";
import { prisma } from "@/lib/prisma";

// GET /api/admin/dashboard - Get dashboard statistics from real data
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch real properties from NainaHub API
    const apiResponse = await fetchNainaHubProperties({});

    if (!apiResponse.success) {
      return NextResponse.json(
        { error: "Failed to fetch properties from API" },
        { status: 500 }
      );
    }

    const properties = apiResponse.data;
    const totalFromApi = apiResponse.pagination.total;

    // Count closed deals from API status
    const closedDealsCount = properties.filter(
      (p) => p.status === "sold" || p.status === "rented"
    ).length;

    // Get local extension stats
    const [
      popularCount,
      reviewStats,
      inquiryStats,
    ] = await Promise.all([
      // Popular properties count (exclude sold/rented properties)
      prisma.propertyExtension.count({
        where: {
          isFeaturedPopular: true,
          isHidden: false,
        },
      }),
      // Review stats
      prisma.review.groupBy({
        by: ["status"],
        _count: true,
      }),
      // Inquiry stats
      prisma.inquiry.groupBy({
        by: ["status"],
        _count: true,
      }),
    ]);

    // Promotions feature not yet implemented
    const activePromotionsCount = 0;
    const extensionsWithPromotions: any[] = [];

    // Calculate stats from API data
    const stats = {
      totalProperties: totalFromApi,
      forRent: properties.filter(
        (p) => p.rentalRateNum && p.rentalRateNum > 0
      ).length,
      forSale: properties.filter(
        (p) => p.sellPriceNum && p.sellPriceNum > 0
      ).length,
      popular: popularCount,
      closedDeals: closedDealsCount,
      activePromotions: activePromotionsCount,
      withPromotions: extensionsWithPromotions.length,
      pendingReviews:
        reviewStats.find((r) => r.status === "pending")?._count || 0,
      publishedReviews:
        reviewStats.find((r) => r.status === "published")?._count || 0,
      newInquiries:
        inquiryStats.find((i) => i.status === "new")?._count || 0,
      totalInquiries: inquiryStats.reduce((sum, i) => sum + i._count, 0),
    };

    // Property type labels in Thai
    const propertyTypeLabels: Record<string, string> = {
      Condo: "คอนโด",
      Townhouse: "ทาวน์เฮ้าส์",
      SingleHouse: "บ้านเดี่ยว",
      Villa: "วิลล่า",
      Land: "ที่ดิน",
      Apartment: "อพาร์ทเม้นท์",
      Office: "สำนักงาน",
      Store: "ร้านค้า",
      Factory: "โรงงาน",
      Hotel: "โรงแรม",
      Building: "อาคาร",
    };

    // Property type distribution from real data - count dynamically
    const propertyTypeDistribution: Record<string, { count: number; label: string }> = {};

    // Initialize with all known types
    Object.entries(propertyTypeLabels).forEach(([key, label]) => {
      propertyTypeDistribution[key] = { count: 0, label };
    });

    // Count properties by type
    properties.forEach((p) => {
      if (p.propertyType) {
        if (propertyTypeDistribution[p.propertyType]) {
          propertyTypeDistribution[p.propertyType].count++;
        } else {
          // Handle unknown property types
          propertyTypeDistribution[p.propertyType] = {
            count: 1,
            label: propertyTypeLabels[p.propertyType] || p.propertyType
          };
        }
      }
    });

    // Log property types for debugging
    console.log("Property types from API:", properties.map(p => p.propertyType));

    // Listing type distribution
    const listingDistribution = {
      rent: properties.filter((p) => p.rentalRateNum && p.rentalRateNum > 0)
        .length,
      sale: properties.filter((p) => p.sellPriceNum && p.sellPriceNum > 0)
        .length,
      both: properties.filter(
        (p) =>
          p.rentalRateNum &&
          p.rentalRateNum > 0 &&
          p.sellPriceNum &&
          p.sellPriceNum > 0
      ).length,
    };

    // Recent properties from API
    const recentProperties = properties.map((p) => ({
      id: p.id,
      propertyTitleTh: p.propertyTitleTh,
      propertyTitleEn: p.propertyTitleEn,
      propertyType: p.propertyType,
      agentPropertyCode: p.agentPropertyCode || p.projectPropertyCode || "-",
      rentalRateNum: p.rentalRateNum,
      sellPriceNum: p.sellPriceNum,
      imageUrl: p.imageUrls?.[0] || null,
      project: p.project,
    }));

    // Properties with promotions (get details from API)
    const promoPropertyIds = new Set(
      extensionsWithPromotions.map((e) => e.externalPropertyId)
    );
    const propertiesWithPromotions = properties
      .filter((p) => promoPropertyIds.has(p.id))
      .map((p) => ({
        id: p.id,
        propertyTitleTh: p.propertyTitleTh,
        propertyType: p.propertyType,
        imageUrl: p.imageUrls?.[0] || null,
        project: p.project,
      }));

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentProperties,
        propertyTypeDistribution,
        listingDistribution,
        propertiesWithPromotions,
      },
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
