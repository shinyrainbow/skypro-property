"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermsOfServicePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t("terms.title")}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-600">
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-gray-600 leading-relaxed">
                  {t("terms.intro")}
                </p>
              </section>

              {/* Section 1 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section1.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("terms.section1.content")}
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section2.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t("terms.section2.content")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t("terms.section2.item1")}</li>
                  <li>{t("terms.section2.item2")}</li>
                  <li>{t("terms.section2.item3")}</li>
                  <li>{t("terms.section2.item4")}</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section3.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t("terms.section3.content")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t("terms.section3.item1")}</li>
                  <li>{t("terms.section3.item2")}</li>
                  <li>{t("terms.section3.item3")}</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section4.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("terms.section4.content")}
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section5.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("terms.section5.content")}
                </p>
              </section>

              {/* Section 6 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section6.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("terms.section6.content")}
                </p>
              </section>

              {/* Section 7 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section7.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("terms.section7.content")}
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.section8.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("terms.section8.content")}
                </p>
              </section>

              {/* Contact */}
              <section className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("terms.contact.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t("terms.contact.content")}
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>{t("terms.contact.company")}:</strong>SKY PRO PROPERTIES COMPANY LIMITED</p>
                  <p><strong>{t("terms.contact.email")}:</strong>skyproofficial88@gmail.com</p>
                  <p><strong>{t("terms.contact.phone")}:</strong>095-692-9788</p>
                </div>
              </section>

              {/* Last Updated */}
              <p className="text-sm text-gray-500 mt-8">
                {t("terms.lastUpdated")}: 19 ธันวาคม 2568
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
