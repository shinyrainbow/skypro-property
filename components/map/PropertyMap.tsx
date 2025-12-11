"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize } from "lucide-react";
import type { NainaHubProperty } from "@/lib/nainahub";

// Fix Leaflet default icon issue
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

// Custom marker icon
const customIcon = typeof window !== "undefined" ? new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
}) : null;

// Component to update map view with smooth animation
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    // Use flyTo for smooth animated transition
    map.flyTo(center, zoom, {
      duration: 1.5, // Animation duration in seconds
      easeLinearity: 0.25,
    });
  }, [center, zoom, map]);
  return null;
}

interface PropertyMapProps {
  properties: NainaHubProperty[];
  center: [number, number];
  zoom: number;
  formatPrice: (price: number | null) => string | null;
  getSize: (property: NainaHubProperty) => string;
  t: (key: string) => string;
}

export default function PropertyMap({
  properties,
  center,
  zoom,
  formatPrice,
  getSize,
  t,
}: PropertyMapProps) {
  if (!customIcon) return null;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      <MapUpdater center={center} zoom={zoom} />

      {properties
        .filter((p) => {
          // Filter logic: check if property has valid coordinates
          if (p.propertyType === "Condo" && p.project?.projectLatitude && p.project?.projectLongitude) {
            return true;
          }
          return p.latitude && p.longitude;
        })
        .map((property) => {
          // Determine which coordinates to use based on property type
          let lat: number;
          let lng: number;

          if (
            property.propertyType === "Condo" &&
            property.project?.projectLatitude &&
            property.project?.projectLongitude
          ) {
            // Use project coordinates for Condos with project location
            lat = property.project.projectLatitude;
            lng = property.project.projectLongitude;
          } else {
            // Use property coordinates for all other cases
            lat = property.latitude!;
            lng = property.longitude!;
          }

          return (
            <Marker
              key={property.id}
              position={[lat, lng]}
              icon={customIcon}
            >
            <Popup>
              <div className="w-48">
                {property.imageUrls && property.imageUrls[0] && (
                  <div className="relative h-32 mb-2">
                    <Image
                      src={property.imageUrls[0]}
                      alt={property.propertyTitleEn}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-sm mb-1">
                  {property.propertyTitleTh || property.propertyTitleEn}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  {property.project?.projectNameTh || property.project?.projectNameEn}
                </p>
                <p className="font-bold text-[#C9A227] text-sm mb-2">
                  {property.rentalRateNum
                    ? `฿${formatPrice(property.rentalRateNum)}/month`
                    : `฿${formatPrice(property.sellPriceNum)}`}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {property.bedRoomNum}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" />
                    {property.bathRoomNum}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-3 h-3" />
                    {getSize(property)} sqm
                  </span>
                </div>
                <Link href={`/property/${property.id}`} target="_blank">
                  <Button size="sm" className="w-full bg-[#C9A227] hover:bg-[#A8841F] text-white">
                    {t("common.viewDetails")}
                  </Button>
                </Link>
              </div>
            </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
