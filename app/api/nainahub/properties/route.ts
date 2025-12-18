import { NextResponse } from "next/server";
import { fetchNainaHubProperties, type FetchPropertiesParams } from "@/lib/nainahub";
import { getAllExtensions } from "@/lib/property-extensions";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params: FetchPropertiesParams = {};

    // Parse all filter parameters
    const q = searchParams.get("q");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const propertyType = searchParams.get("propertyType");
    const listingType = searchParams.get("listingType");
    const bedrooms = searchParams.get("bedrooms");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (q) params.q = q;
    if (limit) params.limit = parseInt(limit);
    if (page) params.page = parseInt(page);
    // Convert "all" to "All" for NainaHub API
    if (propertyType && propertyType !== "all") {
      params.propertyType = propertyType as any;
    } else if (propertyType === "all") {
      params.propertyType = "All" as any;
    }
    if (listingType && listingType !== "all") params.listingType = listingType as any;
    if (bedrooms && bedrooms !== "all") params.bedrooms = parseInt(bedrooms);
    if (minPrice) params.minPrice = parseInt(minPrice);
    if (maxPrice) params.maxPrice = parseInt(maxPrice);

    // Fetch properties from NainaHub and extensions from local DB in parallel
    const [response, extensions] = await Promise.all([
      fetchNainaHubProperties(params),
      getAllExtensions(),
    ]);

    // Create a map of extensions by property ID for quick lookup
    const extensionMap = new Map(
      extensions.map((ext) => [ext.externalPropertyId, ext])
    );

    // Merge extension data with properties
    const propertiesWithExtensions = response.data.map((property) => ({
      ...property,
      extension: extensionMap.get(property.id) || null,
    }));

    return NextResponse.json({
      ...response,
      data: propertiesWithExtensions,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
