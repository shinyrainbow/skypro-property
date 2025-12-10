"use client";

import { useEffect, useState, use } from "react";
import { FileText, Calendar, ArrowLeft, Share2, Home } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogSection {
  id: string;
  order: number;
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

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const t = useTranslations("blog");
  const locale = useLocale();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/public/blog/${resolvedParams.slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [resolvedParams.slug]);

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

  const getLocalizedContent = (section: BlogSection) => {
    switch (locale) {
      case "en":
        return section.contentEn || section.content;
      case "zh":
        return section.contentZh || section.content;
      case "ja":
        return section.contentJa || section.content;
      default:
        return section.content;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(
      locale === "th"
        ? "th-TH"
        : locale === "zh"
        ? "zh-CN"
        : locale === "ja"
        ? "ja-JP"
        : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog ? getLocalizedTitle(blog) : "",
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="h-16" />
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c6af6c]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="h-16" />
        <div className="container mx-auto px-4 py-20 text-center">
          <FileText className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Blog post not found
          </h1>
          <p className="text-gray-500 mb-8">
            The blog post you are looking for does not exist or has been
            removed.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c]/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#c6af6c] to-[#a38444] hover:from-[#b39d5b] hover:to-[#8f7339] text-white">
                <Home className="w-4 h-4 mr-2" />
                {t("backHome")}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-16" />

      {/* Hero Section with Cover Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {blog.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={blog.coverImage}
              alt={getLocalizedTitle(blog)}
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60" />
          </div>
        )}

        <div
          className={`container mx-auto px-4 py-20 relative z-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
            {getLocalizedTitle(blog)}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            {blog.publishedAt && (
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-[#c6af6c]" />
                <span>
                  {t("publishedOn")} {formatDate(blog.publishedAt)}
                </span>
              </div>
            )}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>{t("share")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Blog Content - Multiple Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {blog.sections.map((section, index) => (
              <div
                key={section.id}
                className={`mb-12 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Section Image */}
                {section.imageUrl && (
                  <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-xl">
                    <Image
                      src={section.imageUrl}
                      alt={`Section ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Section Content */}
                {getLocalizedContent(section) && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#c6af6c] prose-strong:text-gray-800"
                      dangerouslySetInnerHTML={{
                        __html: getLocalizedContent(section)?.replace(
                          /\n/g,
                          "<br />"
                        ) || "",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* No sections message */}
            {blog.sections.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>This blog post has no content yet.</p>
              </div>
            )}

            {/* Back to Blog Button */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-[#c6af6c] text-[#c6af6c] hover:bg-[#c6af6c]/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
