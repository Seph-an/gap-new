// lib/Helper.js
import axios from "axios";
import { NextResponse } from "next/server";

export async function forwardPost(formData, headers, externalUrl) {
  try {
    const token = process.env.CREATE_RECORDS_TOKEN;

    const response = await axios.post(externalUrl, formData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    });

    return NextResponse.json(
      { success: true, data: response.data },
      { status: response.status }
    );
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
