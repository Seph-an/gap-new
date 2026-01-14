// app/blog/category/[[...slug]]/page.js

import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  const allFilters = ["all", ...categories.map((cat) => cat.Title)];
  const paths = [];
  for (const filter of allFilters) {
    const params = [];
    if (filter !== "all") params.push(filter);
    paths.push({ slug: params });
  }
  return paths;
}
export const metadata = {
  title: "Our Blog – Gap Recruitment Services",
  description:
    "Latest insights on getting the best talent, HR, payroll, and job tips from a top recruitment firm in Kenya.",
  openGraph: {
    title: "Our Blog – Gap Recruitment Services",
    description:
      "Latest insights on getting the best talent, HR, payroll, and job tips from a top recruitment firm in Kenya.",
    url: "https://gaprecruitment.co.ke/blog",
    type: "website",
    images: [
      {
        url: "https://gaprecruitment.co.ke/assets/about-gap-recrutiment-and-payroll-management-services-in-kenya-get-best-talent.svg",
        width: 1200,
        height: 630,
        alt: "Gap Recruitment Blog",
      },
    ],
  },
  alternates: {
    canonical: "https://gaprecruitment.co.ke/blog",
  },
};

const Page = async (props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const slug = params.slug ?? [];
  const filter = slug[0] ?? "all";
  const page = slug[1] === "page" ? parseInt(slug[2], 10) : 1;

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
