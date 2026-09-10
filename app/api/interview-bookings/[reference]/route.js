import { NextResponse } from 'next/server';

const ERP_URL = process.env.BUSINESS_ERP_URL || 'http://127.0.0.1:7000';
const ERP_TOKEN = process.env.BUSINESS_ERP_TOKEN;
const ERP_SECURE = process.env.NODE_ENV !== 'production' || ERP_URL.startsWith('https://');

export async function GET(request, { params }) {
  if (!ERP_TOKEN || !ERP_SECURE) return NextResponse.json({}, { status: 503 });
  const { reference } = await params;
  const token = request.headers.get('x-status-token');
  try {
    const response = await fetch(`${ERP_URL}/api/v1/interview-bookings/${encodeURIComponent(reference)}`, {
      cache: 'no-store', headers: { authorization: `Bearer ${ERP_TOKEN}`, accept: 'application/json', 'x-status-token': token || '' },
    });
    return new NextResponse(response.body, { status: response.status, headers: { 'content-type': response.headers.get('content-type') || 'application/json', 'cache-control': 'no-store, private' } });
  } catch {
    return NextResponse.json({}, { status: 503 });
  }
}
