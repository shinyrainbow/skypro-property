import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Return static metadata for mock data site
  return {
    title: `รายละเอียดทรัพย์สิน - ${id}`,
    description: "ดูรายละเอียดอสังหาริมทรัพย์จาก Budget Wise Property - บริการอสังหาริมทรัพย์ครบวงจร",
    keywords: ["คอนโด", "บ้าน", "อสังหาริมทรัพย์", "เช่า", "ขาย", "Budget Wise Property"],
    openGraph: {
      title: `รายละเอียดทรัพย์สิน | Budget Wise Property`,
      description: "ดูรายละเอียดอสังหาริมทรัพย์จาก Budget Wise Property",
      url: `https://budgetwiseproperty.com/property/${id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `รายละเอียดทรัพย์สิน | Budget Wise Property`,
      description: "ดูรายละเอียดอสังหาริมทรัพย์จาก Budget Wise Property",
    },
  };
}

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
