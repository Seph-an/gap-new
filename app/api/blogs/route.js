// app/api/blog/route.js

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Existing parameters
  const filter = searchParams.get("filter");
  const page = searchParams.get("page");

  // New parameters for featured posts
  const featured = searchParams.get("featured");
  const pageSize = searchParams.get("pageSize");

  const baseURL = process.env.FETCH_BLOGS_URL;
  const TOKEN = process.env.FETCH_BLOGS_TOKEN;

  const url = new URL(baseURL);
  console.log("base url in blogs-route.js", baseURL);
  console.log("url in blogs-route.js", url);

  // Always populate categories
  url.searchParams.append("populate", "categories");

  // Handle featured posts filter
  if (featured === "true") {
    url.searchParams.append("filters[isFeatured][$eq]", "true");
  }

  // Handle category filter (only if not fetching featured posts)
  if (!featured && filter && filter !== "all") {
    url.searchParams.append("filters[categories][Title][$eq]", filter);
  }

  // Pagination configuration
  const size = pageSize || "7"; // Default to 7 posts if not specified
  url.searchParams.append("pagination[pageSize]", size);

  if (page) {
    url.searchParams.append("pagination[page]", page);
  }

  try {
    const { data } = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      timeout: 5000,
    });
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching blog posts:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.error?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
