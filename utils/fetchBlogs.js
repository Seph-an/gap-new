import { config } from "dotenv";
import path from "path";

// load .env.production instead of .env:
config({ path: path.resolve(process.cwd(), ".env.production") });

// utils/fetchBlogs.js
import axios from "axios";

const STRAPI_URL = process.env.FETCH_BLOGS_URL;
const STRAPI_TOKEN = process.env.FETCH_BLOGS_TOKEN;
console.log("STrapi url towards the top:",STRAPI_URL)
const IS_BUILD_TIME =
  typeof window === "undefined" && process.env.NODE_ENV === "production";
console.log("build time",IS_BUILD_TIME)
console.log("strapi url",STRAPI_URL)
function getBaseURL() {
  if (IS_BUILD_TIME) {
    return STRAPI_URL; // Send to Strapi in production
  } else {
    return "";
  }
}

export async function fetchBlogs({
  filter = "all",
  page = 1,
  featured = false,
  pageSize = 7,
}) {
  const baseURL = getBaseURL();
  const url = new URL("/api/blogs", baseURL);
  url.searchParams.set("populate", "categories");
  if (featured) url.searchParams.set("filters[isFeatured][$eq]", "true");
  else if (filter !== "all")
    url.searchParams.set("filters[categories][Title][$eq]", filter);
  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(pageSize));
  const headers = IS_BUILD_TIME
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : undefined;
  const { data } = await axios.get(url.toString(), { headers });
  return IS_BUILD_TIME ? data : data.data;
}

export async function fetchCategories() {
  const baseURL = getBaseURL();
  const url = new URL("/api/categories", baseURL);
  const headers = IS_BUILD_TIME
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : undefined;
  const { data } = await axios.get(url.toString(), { headers });
  return IS_BUILD_TIME ? data.data : data.data;
}

export async function fetchBlog(slug) {
  const baseURL = getBaseURL();
  const url = new URL("/api/blogs", baseURL);
  url.searchParams.set("populate", "categories");
  url.searchParams.set("filters[slug][$eq]", slug);
  const headers = IS_BUILD_TIME
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : undefined;
  const { data } = await axios.get(url.toString(), { headers });
  const post = IS_BUILD_TIME ? data.data[0] : data.data[0];
  return post || null;
}
