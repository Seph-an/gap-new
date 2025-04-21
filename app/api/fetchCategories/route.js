// app/api/categories/route.js

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const URL = process.env.FETCH_CATEGORIES_URL;
  const TOKEN = process.env.FETCH_BLOGS_TOKEN;

  const headers = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  try {
    const { data } = await axios.get(URL, headers);
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.error?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
