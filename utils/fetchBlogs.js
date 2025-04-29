//utils/fetchBlogs.js
// utils/fetchCategories.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const url = `${BASE_URL}/api/blogs`;

// export async function fetchBlogs({ filter = "all", page = 1 }) {
//   const response = await axios.get(url, {
//     params: { filter, page },
//   });
//   return response.data;
// }

export async function fetchBlogs({
  filter = "all",
  page = 1,
  featured = false,
  pageSize = 7,
}) {
  console.log("baseURL in fetchblogs", BASE_URL);
  try {
    const response = await axios.get(url, {
      params: {
        filter,
        page,
        featured: featured ? "true" : undefined,
        pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Blogs fetch error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch blogs",
    };
  }
}

// Fetch all categories via Next.js API route
export async function fetchCategories() {
  const response = await axios.get(`${BASE_URL}/api/fetchCategories`);
  return response.data.data;
}

// Fetch a single blog by slug via Next.js API route
export async function fetchBlog(slug) {
  const response = await axios.get(url, {
    params: { slug },
  });
  return response.data;
}

// export async function fetchCategories() {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/fetchCategories`);
//     return {
//       success: true,
//       data: response.data.data
//     };
//   } catch (error) {
//     console.error("Categories fetch error:", error);
//     return {
//       success: false,
//       error: error.response?.data?.message || "Failed to fetch categories"
//     };
//   }
// }

// export async function fetchBlog(slug) {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/blog`, {
//       params: { slug }
//     });
//     return {
//       success: true,
//       data: response.data.data[0] // Assuming array response
//     };
//   } catch (error) {
//     console.error("Blog post fetch error:", error);
//     return {
//       success: false,
//       error: error.response?.data?.message || "Failed to fetch blog post"
//     };
//   }
// }
