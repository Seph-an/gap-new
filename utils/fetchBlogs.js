import { fetchCMS } from '../lib/cms/strapi.js';

function normalizeImage(image) {
  if (!image) return null;
  if (typeof image === 'string') return { url: image, alternativeText: '' };
  const media = image.data?.attributes || image.data || image.attributes || image;
  if (!media?.url) return null;
  return { url: media.url, alternativeText: media.alternativeText || media.caption || '', width: media.width, height: media.height, formats: media.formats };
}

function normalizeBlog(post) {
  if (!post) return post;
  const attributes = post.attributes || post;
  return { ...attributes, id: post.id || attributes.id, image: normalizeImage(attributes.image) };
}

function normalizeList(result) {
  const posts = result?.data || result || [];
  return {
    data: posts.map(normalizeBlog),
    meta: result?.meta || { pagination: { page: 1, pageCount: 1, pageSize: 7, total: Array.isArray(result) ? result.length : 0 } },
  };
}

export async function fetchBlogs({ filter = 'all', page = 1, featured = false, pageSize = 6 }) {
  const params = {
    sort: 'publishedAt:desc',
    'populate[categories]': true,
    'populate[image]': true,
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
  };

  if (featured) params['filters[isFeatured][$eq]'] = true;
  if (!featured && filter !== 'all') params['filters[categories][Title][$eq]'] = filter;

  return normalizeList(await fetchCMS('blogs', params, { unwrap: false }));
}

export async function fetchCategories() {
  const result = await fetchCMS('categories', { populate: '*' });
  return result?.data || result || [];
}

export async function fetchBlog(slug) {
  const result = await fetchCMS('blogs', {
    'populate[categories]': true,
    'populate[image]': true,
    'filters[slug][$eq]': slug,
  });
  const list = result?.data || result || [];
  return normalizeBlog(list[0]) || null;
}
