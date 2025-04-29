// app/blog/[[...slug]]/page.js

import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  const allFilters = ["all", ...categories.map((cat) => cat.Title)];
  const paths = [];
  for (const filter of allFilters) {
    const blogsData = await fetchBlogs({ filter, page: 1 });
    const { pagination } = blogsData.meta;

    for (let p = 1; p <= pagination.pageCount; p++) {
      const params = [];
      if (filter !== "all") params.push(filter);
      if (p > 1)           params.push(p.toString());

      paths.push({ slug: params });
    }
  }
  return paths;
}

const Page = async ({ params }) => {
  const slug = params.slug ?? [];
  const filter = slug[0] ?? "all";
  const page = slug[1] ? parseInt(slug[1], 10) : 1;

  const blogsRes = await fetchBlogs({ filter, page });
  const posts = blogsRes.data;

  const pagination = blogsRes.meta.pagination;
  const categories = await fetchCategories();

  return (
    <BlogHome
      filter={filter}
      page={page}
      blogPosts={posts}
      pagination={pagination}
      categories={categories}
    />
  );
};

export default Page;
