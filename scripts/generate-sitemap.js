// scripts/generate-sitemap.js
import { generateSitemap } from "@/lib/sitemap";

generateSitemap()
  .then(() => {
    console.log("✅ Sitemap generated at build time.");
  })
  .catch((err) => {
    console.error("❌ Failed to generate sitemap:", err);
    process.exit(1);
  });
