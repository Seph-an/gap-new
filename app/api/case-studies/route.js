import { NextResponse } from 'next/server';
import { fetchCaseStudies, sanitizeCaseStudyFilter } from '@/lib/cms/caseStudies';

const ALLOWED_KEYS = new Set(['page', 'pageSize', 'search', 'service', 'industry', 'role']);

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  if ([...params.keys()].some((key) => !ALLOWED_KEYS.has(key))) return NextResponse.json({ error: 'Invalid query parameters.' }, { status: 400 });
  const rawPage = params.get('page') || '1';
  const rawPageSize = params.get('pageSize') || '9';
  if (!/^\d{1,5}$/.test(rawPage) || !/^\d{1,2}$/.test(rawPageSize)) return NextResponse.json({ error: 'Invalid pagination.' }, { status: 400 });
  try {
    return NextResponse.json(await fetchCaseStudies({
      page: Number(rawPage),
      pageSize: Number(rawPageSize),
      search: sanitizeCaseStudyFilter(params.get('search'), 120),
      service: sanitizeCaseStudyFilter(params.get('service'), 80),
      industry: sanitizeCaseStudyFilter(params.get('industry'), 80),
      role: sanitizeCaseStudyFilter(params.get('role'), 80),
    }));
  } catch {
    return NextResponse.json({ error: 'Unable to load case studies.' }, { status: 502 });
  }
}
