import Filter from "./Filter";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";

const BlogHome = ({ filter, page, blogPosts, pagination, categories }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://gaprecruitment.co.ke/blog/${post.slug}`,
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      description: post.description || "",
    })),
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="w-screen min-h-screen mt-8 px-4 sm:px-6 md:px-12 lg:px-20 pt-16 md:pt-24 xl:pt-28 pb-16">
        <div className="w-full my-8 lg:my-5">
          <Filter filter={filter} categories={categories} />
        </div>
        <div className="w-full max-w-[900px] mx-auto">
          <div className="blog-lists flex flex-col gap-5">
            {blogPosts?.map((post) => <div key={post.slug} className="bg-[#1e1e1e] p-4 rounded-lg shadow-md"><BlogPost post={post} filter={filter} page={page} /></div>)}
          </div>
          <Pagination pagination={pagination} filter={filter} />
        </div>
      </section>
    </>
  );
};

export default BlogHome;
