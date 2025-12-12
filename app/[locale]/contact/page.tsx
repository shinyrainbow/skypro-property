"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import Header from "@/components/layout/header";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "โทรศัพท์",
      details: ["063-956-2446"],
      color: "bg-green-500",
      links: ["tel:0639562446"],
    },
    {
      icon: MapPin,
      title: "ที่อยู่",
      details: ["บริษัท สกายโปรพร้อมเพอร์ตี้ จำกัด", "111 หมู่ที่ 2 ตำบลไชยสถาน", "อำเภอสารภี จังหวัดเชียงใหม่ 50140"],
      color: "bg-red-500",
      links: [],
    },
    {
      icon: Clock,
      title: "เวลาทำการ",
      details: ["จันทร์ - อาทิตย์: 09:00 - 18:00"],
      color: "bg-purple-500",
      links: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shared Header */}
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#C9A227] to-[#A88B1F] py-16">
        <div
          className={`container mx-auto px-4 text-center text-white transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">ติดต่อเรา</h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            พร้อมให้บริการและตอบทุกคำถามของคุณ ติดต่อเราได้หลายช่องทาง
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={info.title}
                className={`p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 ${info.color} rounded-full flex items-center justify-center mb-4`}
                >
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, i) =>
                  info.links && info.links[i] ? (
                    <a
                      key={i}
                      href={info.links[i]}
                      className="block text-gray-600 text-sm hover:text-[#C9A227] transition-colors"
                    >
                      {detail}
                    </a>
                  ) : (
                    <p key={i} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  )
                )}
              </Card>
            ))}

            {/* Line QR Code Card */}
            <Card
              className={`p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="w-14 h-14 bg-[#00B900] rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("footerNav.lineOfficial")}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                สแกน QR Code เพื่อติดต่อผ่าน Line
              </p>
              <div className="flex justify-center">
                <Image
                  src="/skyproqrcode.png"
                  alt="Line QR Code"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Map & Social */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                แผนที่และช่องทางติดตาม
              </h2>

              {/* Map Placeholder */}
              <Card className="overflow-hidden border-0 shadow-lg mb-6">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-[#C9A227]" />
                    <p className="font-medium">Sky Pro Properties</p>
                    <p className="text-sm">เชียงใหม่, ประเทศไทย</p>
                  </div>
                </div>
              </Card>

              {/* Line QR Code Large */}
              <Card className="p-6 border-0 shadow-lg mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  เพิ่มเพื่อนทาง Line
                </h3>
                <div className="flex justify-center">
                  <Image
                    src="/skyproqrcode.png"
                    alt="Line QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <p className="text-center text-gray-500 text-sm mt-4">
                  สแกน QR Code เพื่อติดต่อเราผ่าน Line
                </p>
              </Card>

              {/* Social Media */}
              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ติดตามเราได้ที่
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/share/1BqpBqLF4x/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    title="Facebook"
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/skyproproperty?igsh=dmQ3NzkwMGMzNjI5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition-colors"
                    title="Instagram"
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@skyproproperty?_r=1&_t=ZS-9291zppaPLT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    title="TikTok"
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  <a
                    href="tel:0655559999"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                    title="Phone"
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  ติดตามข่าวสารและโปรโมชันล่าสุดได้ทุกช่องทาง
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            คำถามที่พบบ่อย
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "เวลาทำการของสำนักงานคือเมื่อไหร่?",
                a: "สำนักงานเปิดให้บริการวันจันทร์ - ศุกร์ เวลา 09:00 - 18:00 น. และวันเสาร์ - อาทิตย์ เวลา 10:00 - 16:00 น.",
              },
              {
                q: "ต้องเตรียมเอกสารอะไรบ้างสำหรับการเช่าหรือซื้อ?",
                a: "สำหรับการเช่า: สำเนาบัตรประชาชน, สลิปเงินเดือน 3 เดือน / สำหรับการซื้อ: สำเนาบัตรประชาชน, ทะเบียนบ้าน, statement บัญชี 6 เดือน",
              },
              {
                q: "สามารถนัดดูห้องได้อย่างไร?",
                a: "ติดต่อเราผ่านทางโทรศัพท์ หรือกรอกแบบฟอร์มด้านบน ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
              },
              {
                q: "มีค่าบริการนายหน้าหรือไม่?",
                a: "สำหรับผู้เช่าไม่มีค่านายหน้า ส่วนผู้ซื้อและผู้ขายมีค่านายหน้าตามมาตรฐานอุตสาหกรรม กรุณาติดต่อสอบถามรายละเอียด",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className={`p-6 border-0 shadow-lg transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#C9A227] to-[#A88B1F]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            พร้อมเริ่มต้นหาทรัพย์สินในฝัน?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            ดูทรัพย์สินทั้งหมดของเราและค้นหาบ้านที่ตรงใจคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button
                size="lg"
                className="bg-white text-[#C9A227] hover:bg-gray-100 px-8"
              >
                ค้นหาทรัพย์สิน
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#C9A227] px-8"
              >
                กลับหน้าหลัก
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Building2 className="w-8 h-8 text-[#C9A227]" />
            <span className="text-xl font-bold text-white">
              Sky Pro Properties
            </span>
          </div>
          <p className="mb-2 text-sm">
            Premium Real Estate Solutions | Chiangmai, Thailand
          </p>
          <p className="text-xs">
            © 2025 บริษัท สกายโปรพร้อมเพอร์ตี้ จำกัด. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
