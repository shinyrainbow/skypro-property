import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รีวิวจากลูกค้า",
  description:
    "รีวิวและความคิดเห็นจากลูกค้าที่ใช้บริการ Budget Wise Property ประสบการณ์การเช่าและซื้ออสังหาริมทรัพย์ในกรุงเทพฯ",
  keywords: [
    "รีวิว Budget Wise Property",
    "ความคิดเห็นลูกค้า",
    "รีวิวนายหน้าอสังหา",
    "real estate reviews Bangkok",
  ],
  openGraph: {
    title: "รีวิวจากลูกค้า - Budget Wise Property",
    description:
      "รีวิวและความคิดเห็นจากลูกค้าที่ใช้บริการ Budget Wise Property",
    url: "https://primeestate.co.th/reviews",
    type: "website",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
