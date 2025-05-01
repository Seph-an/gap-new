import axios from "axios";
import { writeFile } from "fs/promises";
import path from "path";
import { fetchBlogs } from "@/utils/fetchBlogs";

export const staticRoutes = [
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

export async function POST() {
  const siteUrl = "https://gaprecruitment.co.ke";
  try {
    // 1. Build static entries
    const staticEntries = staticRoutes.map(({ page, priority, changefreq }) => {
      const loc = page === "/" ? siteUrl : `${siteUrl}/${page}`;
      return `
        <url>
          <loc>${loc}</loc>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority.toFixed(1)}</priority>
        </url>`;
    });

    // 2. Fetch all blog posts in one go (or paginate if necessary)
    //    Here we set pageSize to a large number to get everything.
    const allBlogs = await fetchBlogs({
      filter: "all",
      page: 1,
      featured: false,
      pageSize: 100,
    });

    // 3. Build <url> for each post
    const blogConfig = staticRoutes.find((r) => r.page === "blog");
    const blogEntries = allBlogs.map((post) => {
      const slug = post.attributes.slug;
      const lastmod = new Date(post.attributes.updatedAt).toISOString();
      return `
        <url>
          <loc>${siteUrl}/blog/${slug}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>${blogConfig.changefreq}</changefreq>
          <priority>${blogConfig.priority.toFixed(1)}</priority>
        </url>`;
    });
    // 4. Assemble XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticEntries, ...blogEntries].join("\n")}
    </urlset>`;

    // 5. Write to public/
    const filePath = path.join(process.cwd(), "public", "sitemap.xml");
    await writeFile(filePath, sitemapXml, "utf8");

    // 6. Ping Google
    await axios.get(
      `https://www.google.com/ping?sitemap=${siteUrl}/sitemap.xml`
    );

    return new Response(
      JSON.stringify({ message: "Sitemap regenerated and Google notified" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(
      JSON.stringify({ message: "Error generating sitemap" }),
      { status: 500 }
    );
  }
}
