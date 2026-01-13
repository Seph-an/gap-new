import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Filter parameters
  const categoryFilter = searchParams.get("filters[categories][Title][$eq]");
  console.log("API Route: categoryFilter from searchParams:", categoryFilter);
  const slugFilter = searchParams.get("filters[slug][$eq]");
  const featuredFilter = searchParams.get("filters[isFeatured][$eq]");

  // Pagination parameters
  const page = searchParams.get("pagination[page]");
  const pageSize = searchParams.get("pagination[pageSize]");

  const baseURL = process.env.FETCH_BLOGS_URL;
  const TOKEN = process.env.FETCH_BLOGS_TOKEN;

  const url = new URL(baseURL);

  // Always populate categories
  url.searchParams.append("populate", "categories");

  // Handle slug filter (highest priority)
  if (slugFilter) {
    url.searchParams.append("filters[slug][$eq]", slugFilter);
  } else {
    // Handle featured posts filter
    if (featuredFilter === "true") {
      url.searchParams.append("filters[isFeatured][$eq]", "true");
    }

    // Handle category filter
    if (categoryFilter) {
      url.searchParams.append(
        "filters[categories][Title][$eq]",
        categoryFilter
      );
    }

    // Pagination configuration
    const size = pageSize || "7"; // Default to 7 if not specified
    url.searchParams.append("pagination[pageSize]", size);

    if (page) {
      url.searchParams.append("pagination[page]", page);
    }
  }

  console.log("API Route: URL sent to Strapi:", url.toString());

  try {
    const { data } = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      timeout: 5000,
    });
    console.log(
      "API Route: Data received from Strapi:",
      JSON.stringify(data, null, 2)
    );
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.error("API Route: Error fetching blog posts:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.error?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
