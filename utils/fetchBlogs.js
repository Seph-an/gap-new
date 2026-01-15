// utils/fetchBlogs.js

const STRAPI_URL = process.env.FETCH_BLOGS_URL;
const STRAPI_TOKEN = process.env.FETCH_BLOGS_TOKEN;
const IS_SERVER_SIDE = typeof window === "undefined";

function getBaseURL() {
  if (IS_SERVER_SIDE) {
    // On the server (build time, ISR), use the direct Strapi URL from environment variables.
    return STRAPI_URL || "https://gaprecruitment.co.ke";
  }
  // On the client, use relative paths to hit the Next.js proxy API routes.
  return "";
}

/**
 * A wrapper for the native fetch API to enable caching and revalidation in Next.js.
 * @param {string} url - The URL to fetch.
 * @param {object} options - The options for the fetch request.
 * @returns {Promise<any>} The JSON response.
 */
async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Fetch error: ${response.status} ${response.statusText}`, {
      url: url.toString(),
      errorBody,
    });
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}

/**
 * Fetches a list of blog posts from Strapi.
 */
export async function fetchBlogs({
  filter = "all",
  page = 1,
  featured = false,
  pageSize = 7,
}) {
  const baseURL = getBaseURL();
  const url = new URL("/api/blogs", baseURL);

  // Sort by latest published post first.
  url.searchParams.set("sort", "publishedAt:desc");

  url.searchParams.set("populate", "categories");
  if (featured) {
    url.searchParams.set("filters[isFeatured][$eq]", "true");
  } else if (filter !== "all") {
    url.searchParams.set("filters[categories][Title][$eq]", filter);
  }

  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(pageSize));

  const headers = IS_SERVER_SIDE
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : {};

  const data = await fetchData(url.toString(), { headers });

  // This logic is preserved from the original file to handle potential
  // differences between the direct Strapi API response and the proxy response.
  return IS_SERVER_SIDE ? data : data.data;
}

/**
 * Fetches all blog categories from Strapi.
 */
export async function fetchCategories() {
  const baseURL = getBaseURL();
  const url = new URL(
    IS_SERVER_SIDE ? "/api/categories" : "/api/fetchCategories",
    baseURL
  );
  const headers = IS_SERVER_SIDE
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : {};
  const data = await fetchData(url.toString(), { headers });

  // The most likely correct shape for a Strapi collection response is data.data.
  return data.data;
}

/**
 * Fetches a single blog post by its slug.
 * @param {string} slug - The slug of the blog post.
 */
export async function fetchBlog(slug) {
  const baseURL = getBaseURL();
  const url = new URL("/api/blogs", baseURL);

  url.searchParams.set("populate", "categories");
  url.searchParams.set("filters[slug][$eq]", slug);

  const headers = IS_SERVER_SIDE
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : {};
  const data = await fetchData(url.toString(), { headers });

  // A query by slug should return an array, so we take the first element.
  const post = data?.data?.[0] || null;
  return post;
}
