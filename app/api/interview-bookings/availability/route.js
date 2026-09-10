import { NextResponse } from 'next/server';

const ERP_URL = process.env.BUSINESS_ERP_URL || 'http://127.0.0.1:7000';
const ERP_TOKEN = process.env.BUSINESS_ERP_TOKEN;
const ERP_SECURE = process.env.NODE_ENV !== 'production' || ERP_URL.startsWith('https://');

export async function GET(request) {
  if (!ERP_TOKEN || !ERP_SECURE) return NextResponse.json({}, { status: 503 });

  const query = new URL(request.url).search;
  try {
    const response = await fetch(`${ERP_URL}/api/v1/interview-bookings/availability${query}`, {
      headers: {
        authorization: `Bearer ${ERP_TOKEN}`,
        accept: 'application/json',
      },
      cache: 'no-store',
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: { 'content-type': response.headers.get('content-type') || 'application/json' },
    });
  } catch {
    return NextResponse.json({}, { status: 503 });
  }
}
