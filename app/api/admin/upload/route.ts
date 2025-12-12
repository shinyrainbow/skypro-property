import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with optimizations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS for CDN delivery
  // upload_prefix: "https://upload-api-ap.cloudinary.com", // Enterprise only: Asia-Pacific Fast API
});

// POST /api/admin/upload - Upload image to Cloudinary
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary (optimized for speed)
    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "skypro-blog",
          resource_type: "image",
          // Performance optimizations:
          invalidate: false, // Don't invalidate CDN cache (faster)
          overwrite: false, // Don't check for duplicates (faster)
          unique_filename: true, // Generate unique names
          use_filename: false, // Ignore original filename for speed
          // No inline transformations - apply on-demand via URL for faster upload
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          } else {
            reject(new Error("Upload failed"));
          }
        }
      ).end(buffer);
    });

    // Generate optimized URL with transformations applied on-demand
    const optimizedUrl = cloudinary.url(result.public_id, {
      transformation: [
        { width: 1200, height: 800, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
    });

    return NextResponse.json({
      success: true,
      data: {
        url: optimizedUrl, // Return optimized URL with transformations
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
