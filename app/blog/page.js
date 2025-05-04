//app/blog/page.js
import BlogHome from "@/components/Blog/Home/BlogHome";
import { fetchBlogs, fetchCategories } from "@/utils/fetchBlogs";

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
        url: "https://your-domain.com/assets/about-gap-recrutiment-and-payroll-management-services-in-kenya-get-best-talent.svg", // Optional
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

export default async function Page() {
  const { data, meta } = await fetchBlogs({ filter: "all", page: 1 });
  const categories = await fetchCategories();
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
