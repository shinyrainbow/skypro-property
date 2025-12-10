import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET /api/admin/blog - Get all blog posts (admin only)
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await prisma.blog.findMany({
      include: {
        sections: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog - Create a new blog post
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Missing required fields: title and slug" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug: body.slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        titleEn: body.titleEn || null,
        titleZh: body.titleZh || null,
        titleJa: body.titleJa || null,
        slug: body.slug,
        excerpt: body.excerpt || null,
        excerptEn: body.excerptEn || null,
        excerptZh: body.excerptZh || null,
        excerptJa: body.excerptJa || null,
        coverImage: body.coverImage || null,
        isPublished: body.isPublished || false,
        publishedAt: body.isPublished ? new Date() : null,
        sections: {
          create: (body.sections || []).map(
            (
              section: {
                imageUrl?: string;
                content?: string;
                contentEn?: string;
                contentZh?: string;
                contentJa?: string;
              },
              index: number
            ) => ({
              order: index,
              imageUrl: section.imageUrl || null,
              content: section.content || null,
              contentEn: section.contentEn || null,
              contentZh: section.contentZh || null,
              contentJa: section.contentJa || null,
            })
          ),
        },
      },
      include: {
        sections: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
