//utils/fetcher.js

import axios from "axios";

const STRAPI_URL = process.env.FETCH_BLOGS_URL;
const STRAPI_TOKEN = process.env.FETCH_BLOGS_TOKEN;
const IS_BUILD_TIME = typeof window === "undefined" && process.env.NODE_ENV === "production";

function getBaseURL() {
  if (IS_BUILD_TIME) {
    return STRAPI_URL;
  } else {
    return "";
  }
}

export async function fetchBlogs({ filter = "all", page = 1, featured = false, pageSize = 7 }) {
  const baseURL = getBaseURL();
  const url = new URL(IS_BUILD_TIME ? "/api/blogs" : "/api/blog", baseURL);

  url.searchParams.set("populate", "categories");
  if (featured) url.searchParams.set("filters[isFeatured][$eq]", "true");
  else if (filter !== "all") url.searchParams.set("filters[categories][Title][$eq]", filter);

  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(pageSize));

  const headers = IS_BUILD_TIME ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined;

  const { data } = await axios.get(url.toString(), { headers });

  return IS_BUILD_TIME ? data : data.data;
}

export async function fetchCategories() {
  const baseURL = getBaseURL();
  const url = new URL(IS_BUILD_TIME ? "/api/categories" : "/api/fetchCategories", baseURL);

  const headers = IS_BUILD_TIME ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined;

  const { data } = await axios.get(url.toString(), { headers });

  return IS_BUILD_TIME ? data.data : data.data;
}

export async function fetchBlog(slug) {
  const baseURL = getBaseURL();
  const url = new URL(IS_BUILD_TIME ? "/api/blogs" : "/api/fetchBlog", baseURL);

  url.searchParams.set("slug", slug);

  const headers = IS_BUILD_TIME ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined;

  const { data } = await axios.get(url.toString(), { headers });

  return IS_BUILD_TIME ? data : data.data;
}
