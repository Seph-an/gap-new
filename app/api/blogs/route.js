// app/api/blog/route.js

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");
  const page = searchParams.get("page");

  const baseURL = process.env.FETCH_BLOGS_URL;
  const TOKEN = process.env.FETCH_BLOGS_TOKEN;

  const url = new URL(baseURL);

  // Append query parameters, this ensures that nested categories is returned
  url.searchParams.append("populate", "categories");

  if (filter) {
    url.searchParams.append("filters[categories][Title][$eq]", filter);
  }
  if (page) {
    url.searchParams.append("pagination[page]", page);
    url.searchParams.append("pagination[pageSize]", "7");
  } else {
    url.searchParams.append("pagination[pageSize]", "7");
  }

  // console.log("Final url:", url.toString());

  try {
    const { data } = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      timeout: 5000,
    });
    console.log("The data in the backend:", data);
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
