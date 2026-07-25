import { fetchCMS } from '../lib/cms/strapi.js';

function normalizeList(result) {
  return {
    data: result?.data || result || [],
    meta: result?.meta || { pagination: { page: 1, pageCount: 1, pageSize: 7, total: Array.isArray(result) ? result.length : 0 } },
  };
}

export async function fetchBlogs({ filter = 'all', page = 1, featured = false, pageSize = 7 }) {
  const params = {
    sort: 'publishedAt:desc',
    populate: 'categories',
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
  };

  if (featured) params['filters[isFeatured][$eq]'] = true;
  if (!featured && filter !== 'all') params['filters[categories][Title][$eq]'] = filter;

  return normalizeList(await fetchCMS('blogs', params));
}

export async function fetchCategories() {
  const result = await fetchCMS('categories', { populate: '*' });
  return result?.data || result || [];
}

export async function fetchBlog(slug) {
  const result = await fetchCMS('blogs', {
    populate: 'categories',
    'filters[slug][$eq]': slug,
  });
  const list = result?.data || result || [];
  return list[0] || null;
}
