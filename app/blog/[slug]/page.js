// app/blog/[slug]/page.js

import ArticlePage from "@/components/Blog/Article/ArticlePage";
import { fetchBlog, fetchBlogs } from "@/utils/fetchBlogs";

// Make Next.js pre‑render every post slug
export async function generateStaticParams() {
  const slugs = [];

  // First, fetch page 1 to learn how many pages exist
  const firstPage = await fetchBlogs({ filter: "all", page: 1 });
  console.log("first page data in first slug-page", firstPage);
  const meta = firstPage.data.meta;
  console.log("meta in first slug-page", meta);
  const pageCount = meta.pagination.pageCount;

  // Loop through all pages
  for (let p = 1; p <= pageCount; p++) {
    const loopData = await fetchBlogs({ filter: "all", page: p });
    const data = loopData.data.data;

    data.forEach((post) => {
      slugs.push({ slug: post.slug });
      // or post.attributes.slug depending on your API shape
    });
  }

  return slugs;
}

const Page = async ({ params }) => {
  // fetchBlog should return the post object directly
  const post = await fetchBlog(params.slug);

  if (!post) {
    // Let Next.js render its 404
    return notFound();
  }

  // If your API returns { data: { attributes: { … } } }, unwrap here:
  // const { data: { attributes } } = post;

  return <ArticlePage post={post} />;
};

export default Page;
