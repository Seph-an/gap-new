const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.FETCH_BLOGS_TOKEN;

export function sanitizeCaseStudyFilter(value, maxLength = 100) {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').replace(/[\u0000-\u001f\u007f-\u009f]/g, '').replace(/[^\p{L}\p{N}\s.,'’&()/#_+\-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function boundedInteger(value, fallback, minimum, maximum) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isSafeInteger(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
}

export async function fetchCaseStudies({ page = 1, pageSize = 9, search = '', service = '', industry = '', role = '' } = {}) {
  if (!STRAPI_URL) throw new Error('Missing Strapi URL');
  const safePage = boundedInteger(page, 1, 1, 10000);
  const safePageSize = boundedInteger(pageSize, 9, 3, 24);
  const filters = {
    search: sanitizeCaseStudyFilter(search, 120),
    service: sanitizeCaseStudyFilter(service, 80),
    industry: sanitizeCaseStudyFilter(industry, 80),
    role: sanitizeCaseStudyFilter(role, 80),
  };
  const url = new URL('/api/case-studies', STRAPI_URL.replace(/\/$/, ''));
  url.searchParams.set('pagination[page]', String(safePage));
  url.searchParams.set('pagination[pageSize]', String(safePageSize));
  url.searchParams.set('sort[0]', 'displayOrder:asc');
  url.searchParams.set('sort[1]', 'createdAt:desc');
  ['heroImage', 'metrics', 'roles'].forEach((field) => url.searchParams.set(`populate[${field}]`, '*'));
  if (filters.search) {
    ['title', 'excerpt', 'industry'].forEach((field, index) => url.searchParams.set(`filters[$or][${index}][${field}][$containsi]`, filters.search));
    url.searchParams.set('filters[$or][3][roles][value][$containsi]', filters.search);
  }
  if (filters.service) url.searchParams.set('filters[service][$eq]', filters.service);
  if (filters.industry) url.searchParams.set('filters[industry][$eq]', filters.industry);
  if (filters.role) url.searchParams.set('filters[roles][value][$eq]', filters.role);
  const headers = STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {};
  const response = await fetch(url, { headers, next: { revalidate: 60 } });
  if (!response.ok) throw new Error(`Case-study fetch failed with status ${response.status}`);
  const payload = await response.json();
  return { data: Array.isArray(payload.data) ? payload.data : [], meta: payload.meta || { pagination: { page: safePage, pageSize: safePageSize, pageCount: 1, total: 0 } } };
}
