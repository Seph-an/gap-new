import { NextResponse } from 'next/server';
import { fetchJobs, sanitizeJobFilter } from '@/lib/jobs';

const ALLOWED_QUERY_KEYS = new Set(['page', 'search', 'location', 'department', 'employmentType']);

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const hasUnknownQueryKey = [...params.keys()].some((key) => !ALLOWED_QUERY_KEYS.has(key));
  if (hasUnknownQueryKey) {
    return NextResponse.json({ error: 'Invalid query parameters.' }, { status: 400 });
  }

  const rawPage = params.get('page') || '1';
  if (!/^\d{1,5}$/.test(rawPage)) {
    return NextResponse.json({ error: 'Invalid page.' }, { status: 400 });
  }

  try {
    return NextResponse.json(await fetchJobs({
      page: Number(rawPage),
      pageSize: 12,
      search: sanitizeJobFilter(params.get('search'), 120),
      location: sanitizeJobFilter(params.get('location'), 80),
      department: sanitizeJobFilter(params.get('department'), 80),
      employmentType: sanitizeJobFilter(params.get('employmentType'), 80),
    }), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Unable to load jobs.' }, { status: 502 });
  }
}
