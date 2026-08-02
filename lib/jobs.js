const JOBS_ROUTE = '/jobs-at-gap-recruitment-services-kenya';
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 100;
const MAX_PAGE = 10000;
const JOBS_CACHE_TAG = 'jobs';
const JOBS_REVALIDATE_SECONDS = 3600;

function getStrapiUrl() {
  const value = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!value) throw new Error('Missing STRAPI_URL or NEXT_PUBLIC_STRAPI_URL');
  return value.replace(/\/$/, '');
}

export function sanitizeJobFilter(value, maxLength = 100) {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFKC')
    .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '')
    .replace(/[^\p{L}\p{N}\s.,'’&()/#_+\-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function safeInteger(value, fallback, minimum, maximum) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isSafeInteger(parsed)) return fallback;
  return Math.min(maximum, Math.max(minimum, parsed));
}

function addContainsFilter(url, index, field, value) {
  if (!value) return index;
  url.searchParams.set(`filters[$and][${index}][${field}][$containsi]`, value);
  return index + 1;
}

export function jobSlug(job) {
  const title = (job.name || 'job-opening').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `job-${job.erp_job_id}-${title}`;
}

export function jobUrl(job) {
  return `${JOBS_ROUTE}/${jobSlug(job)}`;
}

export function jobIdFromSlug(slug) {
  return slug?.match(/^job-(\d+)(?:-|$)/)?.[1] || null;
}

export async function fetchJobs({ page = 1, pageSize = DEFAULT_PAGE_SIZE, search = '', location = '', department = '', employmentType = '' } = {}) {
  const safePage = safeInteger(page, 1, 1, MAX_PAGE);
  const safePageSize = safeInteger(pageSize, DEFAULT_PAGE_SIZE, 1, MAX_PAGE_SIZE);
  const safeFilters = {
    search: sanitizeJobFilter(search, 120),
    location: sanitizeJobFilter(location, 80),
    department: sanitizeJobFilter(department, 80),
    employmentType: sanitizeJobFilter(employmentType, 80),
  };
  const url = new URL('/api/job-positions', getStrapiUrl());
  url.searchParams.set('pagination[page]', String(safePage));
  url.searchParams.set('pagination[pageSize]', String(safePageSize));
  url.searchParams.set('sort[0]', 'erp_posted_at:desc');
  url.searchParams.set('sort[1]', 'erp_created_at:desc');
  url.searchParams.set('sort[2]', 'createdAt:desc');
  url.searchParams.set('sort[3]', 'erp_job_id:desc');
  url.searchParams.set('filters[is_active][$eq]', 'true');
  url.searchParams.set('filters[erp_deleted_at][$null]', 'true');

  let index = 0;
  if (safeFilters.search) {
    ['name', 'description', 'skills', 'industry'].forEach((field, orIndex) => {
      url.searchParams.set(`filters[$and][${index}][$or][${orIndex}][${field}][$containsi]`, safeFilters.search);
    });
    index += 1;
  }
  index = addContainsFilter(url, index, 'address', safeFilters.location);
  index = addContainsFilter(url, index, 'department', safeFilters.department);
  addContainsFilter(url, index, 'employment_type', safeFilters.employmentType);

  const response = await fetch(url, {
    next: { revalidate: JOBS_REVALIDATE_SECONDS, tags: [JOBS_CACHE_TAG] },
  });
  if (!response.ok) throw new Error(`Job fetch failed with status ${response.status}`);
  const payload = await response.json();
  return {
    data: Array.isArray(payload.data) ? payload.data : [],
    meta: payload.meta || { pagination: { page: safePage, pageSize: safePageSize, pageCount: 1, total: 0 } },
  };
}

export async function fetchJobBySlug(slug) {
  const id = jobIdFromSlug(slug);
  if (!id) return null;
  const url = new URL('/api/job-positions', getStrapiUrl());
  url.searchParams.set('filters[erp_job_id][$eq]', id);
  url.searchParams.set('filters[is_active][$eq]', 'true');
  url.searchParams.set('filters[erp_deleted_at][$null]', 'true');
  url.searchParams.set('pagination[pageSize]', '1');
  const response = await fetch(url, {
    next: { revalidate: JOBS_REVALIDATE_SECONDS, tags: [JOBS_CACHE_TAG, `job:${id}`] },
  });
  if (!response.ok) return null;
  return (await response.json()).data?.[0] || null;
}

export function normalizeListedJobsLink(url) {
  return url === 'https://gaprecruitment.careers-page.com' ? JOBS_ROUTE : url;
}

export { JOBS_CACHE_TAG, JOBS_ROUTE };
