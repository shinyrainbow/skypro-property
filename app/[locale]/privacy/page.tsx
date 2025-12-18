"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t("privacy.title")}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-600">
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-gray-600 leading-relaxed">
                  {t("privacy.intro")}
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("privacy.section1.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t("privacy.section1.content")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t("privacy.section1.item1")}</li>
                  <li>{t("privacy.section1.item2")}</li>
                  <li>{t("privacy.section1.item3")}</li>
                  <li>{t("privacy.section1.item4")}</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("privacy.section2.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t("privacy.section2.content")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t("privacy.section2.item1")}</li>
                  <li>{t("privacy.section2.item2")}</li>
                  <li>{t("privacy.section2.item3")}</li>
                  <li>{t("privacy.section2.item4")}</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("privacy.section3.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("privacy.section3.content")}
                </p>
              </section>

              {/* Section 4 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("privacy.section4.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("privacy.section4.content")}
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("privacy.section5.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("privacy.section5.content")}
                </p>
              </section>

              {/* Section 6 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("privacy.section6.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("privacy.section6.content")}
                </p>
              </section>

              {/* Contact */}
              <section className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("privacy.contact.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t("privacy.contact.content")}
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>{t("privacy.contact.company")}:</strong> Sky Pro Property Co., Ltd.</p>
                  <p><strong>{t("privacy.contact.email")}:</strong> contact@skyproperty.co.th</p>
                  <p><strong>{t("privacy.contact.phone")}:</strong> 091-8599695</p>
                </div>
              </section>

              {/* Last Updated */}
              <p className="text-sm text-gray-500 mt-8">
                {t("privacy.lastUpdated")}: 1 มกราคม 2568
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
