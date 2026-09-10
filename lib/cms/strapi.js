const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.FETCH_BLOGS_TOKEN;
const PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || STRAPI_URL;

function getBaseUrl() {
  if (!STRAPI_URL) {
    throw new Error('Missing STRAPI_URL or NEXT_PUBLIC_STRAPI_URL');
  }
  return STRAPI_URL.replace(/\/$/, '');
}

function unwrap(response) {
  if (!response || typeof response !== 'object') return response;
  return Object.hasOwn(response, 'data') ? response.data : response;
}

export function imageUrl(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('/uploads/')) return PUBLIC_STRAPI_URL.replace(/\/$/, '') + src;
  if (src.startsWith('/')) return src;
  return getBaseUrl() + '/' + src;
}

function appendSectionPopulate(url, field) {
  url.searchParams.set('populate[' + field + '][populate][cards][populate][link]', '*');
  url.searchParams.set('populate[' + field + '][populate][cta]', '*');
}

function appendCtaSectionPopulate(url, field) {
  url.searchParams.set('populate[' + field + '][populate][cta]', '*');
}

function appendDefaultPopulate(url, path) {
  const normalized = path.replace(/^\/+/, '');
  const populate = (field) => url.searchParams.set('populate[' + field + ']', '*');
  const populateAll = (field) => url.searchParams.set('populate[' + field + '][populate]', '*');

  if (normalized === 'site-global') {
    url.searchParams.set('populate[navLinks]', '*');
    url.searchParams.set('populate[serviceLinks][populate]', '*');
    url.searchParams.set('populate[jobSeekerLinks][populate]', '*');
    url.searchParams.set('populate[footer][populate]', '*');
    url.searchParams.set('populate[chat][populate]', '*');
    url.searchParams.set('populate[cookieAlert][populate]', '*');
    url.searchParams.set('populate[assets][populate][credentials]', '*');
    return;
  }

  if (['home-page', 'about-page', 'job-seeker-page', 'faq-page', 'contact-page', 'service-pages', 'legal-pages', 'case-study-page'].includes(normalized)) {
    populate('seo');
    populate('breadcrumbs');
    populate('structuredData');
  }

  if (normalized === 'home-page') {
    populateAll('hero');
    url.searchParams.set('populate[clientLogos][populate]', 'logo');
    appendSectionPopulate(url, 'why');
    appendSectionPopulate(url, 'services');
    appendCtaSectionPopulate(url, 'featuredBlogSection');
  } else if (normalized === 'about-page') {
    populateAll('hero');
    appendSectionPopulate(url, 'missionVision');
    appendSectionPopulate(url, 'coreValues');
  } else if (normalized === 'job-seeker-page') {
    populateAll('hero');
    appendSectionPopulate(url, 'socialProof');
    appendSectionPopulate(url, 'testimonialSection');
  } else if (normalized === 'faq-page') {
    populateAll('hero');
    populate('faqs');
    appendCtaSectionPopulate(url, 'cta');
  } else if (normalized === 'contact-page') {
    url.searchParams.set('populate[contactCards][populate][meta]', '*');
  } else if (normalized === 'service-pages') {
    populateAll('hero');
    appendSectionPopulate(url, 'benefits');
    appendSectionPopulate(url, 'process');
    appendSectionPopulate(url, 'services');
    appendCtaSectionPopulate(url, 'banner');
    url.searchParams.set('populate[faqSection][populate][faqs]', '*');
    url.searchParams.set('populate[faqSection][populate][footerCta]', '*');
    url.searchParams.set('populate[closingCta][populate][trustItems]', '*');
    url.searchParams.set('populate[closingCta][populate][primaryCta]', '*');
    url.searchParams.set('populate[closingCta][populate][secondaryCta]', '*');
    url.searchParams.set('populate[bookingConfig][populate][offers]', '*');
  } else if (normalized === 'legal-pages') {
    populate('sections');
  } else if (normalized === 'case-study-page') {
    populateAll('hero');
    appendCtaSectionPopulate(url, 'cta');
    url.searchParams.set('populate[filterSettings][populate]', '*');
  } else if (normalized === 'case-studies') {
    ['heroImage', 'metrics', 'sections', 'testimonial', 'cta', 'seo', 'structuredData'].forEach((field) => {
      url.searchParams.set('populate[' + field + ']', '*');
    });
  }
}

export async function fetchCMS(path, params = {}, options = {}) {
  const url = new URL('/api/' + path.replace(/^\/+/, ''), getBaseUrl());
  if (params.populate) url.searchParams.set('populate', params.populate);
  else appendDefaultPopulate(url, path);

  for (const [key, value] of Object.entries(params)) {
    if (key === 'populate' || value === undefined || value === null) continue;
    url.searchParams.set(key, String(value));
  }

  const headers = {};
  if (STRAPI_TOKEN) headers.Authorization = 'Bearer ' + STRAPI_TOKEN;

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error('CMS fetch failed for ' + path + ': ' + res.status + ' ' + body);
  }

  const payload = await res.json();
  return options.unwrap === false ? payload : unwrap(payload);
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

function parseJsonField(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string') return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function seoToMetadata(seo = {}) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: parseJsonField(seo.keywords, []),
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: parseJsonField(seo.openGraph, {}),
    twitter: parseJsonField(seo.twitter, {}),
    robots: parseJsonField(seo.robots, { index: true, follow: true }),
  };
}
