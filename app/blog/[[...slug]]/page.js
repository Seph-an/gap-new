export const dynamic = "force-dynamic";

import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";

export default async function Page({ params }) {
  const awaitedParams = await params;
  const page = awaitedParams.slug && awaitedParams.slug[0] === "page" ? parseInt(awaitedParams.slug[1], 10) : 1;
  const { data, meta } = await fetchBlogs({ filter: "all", page });
  const categories = await fetchCategories();
  return <BlogHome filter="all" page={page} blogPosts={data} pagination={meta.pagination} categories={categories} />;
}
