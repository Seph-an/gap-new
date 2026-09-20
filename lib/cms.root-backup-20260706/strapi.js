const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.FETCH_BLOGS_TOKEN;

function getBaseUrl() {
  if (!STRAPI_URL) {
    throw new Error('Missing STRAPI_URL or NEXT_PUBLIC_STRAPI_URL');
  }
  return STRAPI_URL.replace(/\/$/, '');
}

function unwrap(response) {
  if (!response || typeof response !== 'object') return response;
  return response.data ?? response;
}

export function imageUrl(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) return src;
  return `${getBaseUrl()}${src.startsWith('/') ? '' : '/'}${src}`;
}

export async function fetchCMS(path, params = {}) {
  const url = new URL(`/api/${path.replace(/^\/+/, '')}`, getBaseUrl());
  url.searchParams.set('populate', params.populate || 'deep,10');

  for (const [key, value] of Object.entries(params)) {
    if (key === 'populate' || value === undefined || value === null) continue;
    url.searchParams.set(key, String(value));
  }

  const headers = {};
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`CMS fetch failed for ${path}: ${res.status} ${body}`);
  }

  return unwrap(await res.json());
}

export async function fetchSingle(path) {
  return fetchCMS(path);
}

export async function fetchCollectionBySlug(path, slug) {
  const result = await fetchCMS(path, {
    'filters[slug][$eq]': slug,
  });
  return Array.isArray(result) ? result[0] : result;
}

export async function fetchGlobal() {
  return fetchSingle('site-global');
}

export function seoToMetadata(seo = {}) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
    robots: seo.robots,
  };
}
