//app/blog/page.js
import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";

export default async function Page() {
  const { data, meta } = (await fetchBlogs({ filter: "all", page: 1 })).data;
  const categories = (await fetchCategories()).data;

  return (
    <BlogHome
      filter="all"
      page={1}
      blogPosts={data}
      pagination={meta.pagination}
      categories={categories}
    />
  );
}
