// lib/sitemap.js
import { writeFile } from "fs/promises";
import path from "path";
import { fetchBlogs } from "../utils/fetchBlogs.js";
import axios from "axios";

const SITE_URL = "https://gaprecruitment.co.ke";

export async function generateSitemap({ pingGoogle = false } = {}) {
  const staticRoutes = [
    { page: "/", priority: 1.0, changefreq: "daily" },
    { page: "about-us", priority: 0.8, changefreq: "weekly" },
    { page: "contact-us", priority: 0.5, changefreq: "monthly" },
    { page: "job-seeker", priority: 0.9, changefreq: "weekly" },
    { page: "frequently-asked-questions", priority: 0.9, changefreq: "weekly" },
    { page: "payroll-management", priority: 0.9, changefreq: "weekly" },
    { page: "recruitment-services", priority: 0.9, changefreq: "weekly" },
    { page: "staff-outsourcing", priority: 0.9, changefreq: "weekly" },
    { page: "terms-of-service", priority: 0.4, changefreq: "monthly" },
    { page: "privacy-policy", priority: 0.4, changefreq: "monthly" },
    { page: "cookie-policy", priority: 0.4, changefreq: "monthly" },
    { page: "blog", priority: 0.9, changefreq: "weekly" },
  ];

  const staticEntries = staticRoutes.map(({ page, priority, changefreq }) => {
    const loc = page === "/" ? SITE_URL : `${SITE_URL}/${page}`;
    return `
      <url>
        <loc>${loc}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority.toFixed(1)}</priority>
      </url>`;
  });

//  const blogData = await fetchBlogs({
  //  filter: "all",
    //page: 1,
   // pageSize: 100,
 // });
const { data: blogDataRaw } = await fetchBlogs({
  filter: "all",
  page: 1,
  pageSize: 100,
});

// fallback to empty array if undefined or wrong format
const blogData = Array.isArray(blogDataRaw) ? blogDataRaw : [];
  const blogConfig = staticRoutes.find((r) => r.page === "blog");
  const blogEntries = blogData.map((post) => {
    const slug = post.slug;
    const lastmod = new Date(post.updatedAt).toISOString();
    return `
      <url>
        <loc>${SITE_URL}/blog/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${blogConfig.changefreq}</changefreq>
        <priority>${blogConfig.priority.toFixed(1)}</priority>
      </url>`;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticEntries, ...blogEntries].join("\n")}
  </urlset>`;

  const filePath = path.join(process.cwd(), "public", "sitemap.xml");
  await writeFile(filePath, sitemapXml, "utf8");

  if (pingGoogle) {
    try {
      await axios.get(
        `https://www.google.com/ping?sitemap=${SITE_URL}/sitemap.xml`
      );
      console.log("✅ Pinged Google about updated sitemap.");
    } catch (err) {
      console.warn("⚠️ Failed to ping Google:", err.message);
    }
  }
}
