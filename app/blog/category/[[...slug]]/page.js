// app/blog/[[...slug]]/page.js

import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  const dataCat = categories.data;
  const allFilters = ["all", ...dataCat.map((cat) => cat.Title)];
  const paths = [];
  for (const filter of allFilters) {
    const blogsData = await fetchBlogs({ filter, page: 1 });
    const meta = blogsData.data.meta;

    for (let p = 1; p <= meta.pagination.pageCount; p++) {
      const params = [];
      if (filter !== "all") params.push(filter);
      if (p > 1) params.push(p.toString());

      paths.push({ slug: params });
    }
  }
  return paths;
}

const Page = async ({ params }) => {
  const { slug = [] } = await params;
  const filter = slug[0] ?? "all";
  const page = slug[1] ? parseInt(slug[1], 10) : 1;

  const blogsRes = await fetchBlogs({ filter, page });
  const data = blogsRes.data.data;
  const meta = blogsRes.data.meta;
  const catsRes = await fetchCategories();

  return (
    <BlogHome
      filter={filter}
      page={page}
      blogPosts={data}
      pagination={meta.pagination}
      categories={catsRes.data}
    />
  );
};

export default Page;
