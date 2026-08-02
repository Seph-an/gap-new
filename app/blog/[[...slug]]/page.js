export const dynamic = "force-dynamic";

import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";
import { blogIndexMetadata } from "@/lib/blogSeo";
import { imageUrl } from "@/lib/cms/strapi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const page = awaitedParams.slug?.[0] === "page" ? Number.parseInt(awaitedParams.slug[1], 10) || 1 : 1;
  const blogs = await fetchBlogs({ page, pageSize: 1 });
  const image = blogs.data[0]?.image?.url ? imageUrl(blogs.data[0].image.url) : undefined;
  return blogIndexMetadata({ page, image });
}

export default async function Page({ params }) {
  const awaitedParams = await params;
  const page = awaitedParams.slug && awaitedParams.slug[0] === "page" ? parseInt(awaitedParams.slug[1], 10) : 1;
  const { data, meta } = await fetchBlogs({ filter: "all", page });
  const categories = await fetchCategories();
  if (page > 1 && (meta.pagination.total === 0 || page > meta.pagination.pageCount)) notFound();
  return <BlogHome filter="all" page={page} blogPosts={data} pagination={meta.pagination} categories={categories} />;
}
