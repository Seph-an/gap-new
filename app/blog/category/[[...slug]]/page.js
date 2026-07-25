export const dynamic = "force-dynamic";

import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";

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

  return <BlogHome filter={filter} page={page} blogPosts={blogsRes.data} pagination={blogsRes.meta.pagination} categories={categories} />;
};

export default Page;
