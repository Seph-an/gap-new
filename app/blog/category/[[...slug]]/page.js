export const dynamic = "force-dynamic";

import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";
import { blogIndexMetadata } from "@/lib/blogSeo";
import { imageUrl } from "@/lib/cms/strapi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug ?? [];
  const filter = slug[0] ?? "all";
  const page = slug[1] === "page" ? Number.parseInt(slug[2], 10) || 1 : 1;
  const blogs = await fetchBlogs({ filter, page, pageSize: 1 });
  const image = blogs.data[0]?.image?.url ? imageUrl(blogs.data[0].image.url) : undefined;
  return blogIndexMetadata({ filter, page, image });
}

export async function generateStaticParams() {
  return [];
}

const Page = async (props) => {
  const params = await props.params;
  const slug = params.slug ?? [];
  const filter = slug[0] ?? "all";
  const page = slug[1] === "page" ? parseInt(slug[2], 10) : 1;
  const blogsRes = await fetchBlogs({ filter, page });
  const categories = await fetchCategories();
  if (page > 1 && (blogsRes.meta.pagination.total === 0 || page > blogsRes.meta.pagination.pageCount)) notFound();

  return <BlogHome filter={filter} page={page} blogPosts={blogsRes.data} pagination={blogsRes.meta.pagination} categories={categories} />;
};

export default Page;
