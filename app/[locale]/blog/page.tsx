"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, Calendar, ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

interface BlogSection {
  id: string;
  imageUrl: string | null;
  content: string | null;
  contentEn: string | null;
  contentZh: string | null;
  contentJa: string | null;
}

interface Blog {
  id: string;
  title: string;
  titleEn: string | null;
  titleZh: string | null;
  titleJa: string | null;
  slug: string;
  excerpt: string | null;
  excerptEn: string | null;
  excerptZh: string | null;
  excerptJa: string | null;
  coverImage: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  sections: BlogSection[];
}

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/public/blog");
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const getLocalizedTitle = (blog: Blog) => {
    switch (locale) {
      case "en":
        return blog.titleEn || blog.title;
      case "zh":
        return blog.titleZh || blog.title;
      case "ja":
        return blog.titleJa || blog.title;
      default:
        return blog.title;
    }
  };

  const getLocalizedExcerpt = (blog: Blog) => {
    switch (locale) {
      case "en":
        return blog.excerptEn || blog.excerpt;
      case "zh":
        return blog.excerptZh || blog.excerpt;
      case "ja":
        return blog.excerptJa || blog.excerpt;
      default:
        return blog.excerpt;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "th" ? "th-TH" : locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-16" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div
          className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#c6af6c] to-[#a38444] rounded-2xl flex items-center justify-center shadow-xl">
              <FileText className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c6af6c]"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">{t("noBlogs")}</p>
              <Link href="/">
                <Button className="mt-6 bg-gradient-to-r from-[#c6af6c] to-[#a38444] hover:from-[#b39d5b] hover:to-[#8f7339] text-white">
                  <Home className="w-4 h-4 mr-2" />
                  {t("backHome")}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className={`group block transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                      {blog.coverImage ? (
                        <Image
                          src={blog.coverImage}
                          alt={getLocalizedTitle(blog)}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <FileText className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#c6af6c] transition-colors line-clamp-2">
                        {getLocalizedTitle(blog)}
                      </h3>

                      {blog.publishedAt && (
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                          <Calendar className="w-4 h-4 text-[#c6af6c]" />
                          {t("publishedOn")} {formatDate(blog.publishedAt)}
                        </div>
                      )}

                      {getLocalizedExcerpt(blog) && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {getLocalizedExcerpt(blog)}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center text-[#c6af6c] font-medium text-sm group-hover:text-[#a38444] transition-colors">
                          {t("readMore")}
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
