import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "โปรโมชัน",
  description:
    "โปรโมชันพิเศษจาก Sky Pro Properties ส่วนลดค่านายหน้า ฟรีค่าโอนกรรมสิทธิ์ และข้อเสนอพิเศษสำหรับการเช่าและซื้ออสังหาริมทรัพย์",
  keywords: [
    "โปรโมชันอสังหา",
    "ส่วนลดคอนโด",
    "โปรโมชันเช่าคอนโด",
    "real estate promotions Bangkok",
  ],
  openGraph: {
    title: "โปรโมชัน - Sky Pro Properties",
    description:
      "โปรโมชันพิเศษจาก Sky Pro Properties ส่วนลดและข้อเสนอพิเศษสำหรับอสังหาริมทรัพย์",
    url: "https://primeestate.co.th/promotions",
    type: "website",
  },
};

export default function PromotionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
