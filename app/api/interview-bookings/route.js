import { NextResponse } from 'next/server';

const ERP_URL = process.env.BUSINESS_ERP_URL || 'http://127.0.0.1:7000';
const ERP_TOKEN = process.env.BUSINESS_ERP_TOKEN;
const ERP_SECURE = process.env.NODE_ENV !== 'production' || ERP_URL.startsWith('https://');

export async function POST(request) {
  if (!ERP_TOKEN || !ERP_SECURE) return NextResponse.json({}, { status: 503 });

  try {
    const response = await fetch(`${ERP_URL}/api/v1/interview-bookings`, {
      method: 'POST',
      body: request.body,
      duplex: 'half',
      headers: {
        authorization: `Bearer ${ERP_TOKEN}`,
        'content-type': request.headers.get('content-type') || 'application/octet-stream',
        accept: 'application/json',
      },
      cache: 'no-store',
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: { 'content-type': response.headers.get('content-type') || 'application/json', 'cache-control': 'no-store, private' },
    });
  } catch {
    return NextResponse.json({}, { status: 503 });
  }
}
