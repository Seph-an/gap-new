// components/Blog/Home/BlogHome.jsx
import BlogCTA from "./BlogCTA";
import Ad from "./Ad";
import Filter from "./Filter";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";

const BlogHome = ({ filter, page, blogPosts, pagination, categories }) => {
  return (
    <section className=" w-screen min-h-screen mt-8">
      <header className=" px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent via-gray-900 to-[#0a0a0a] pt-16 md:pt-24 xl:pt-28 pb-16  ">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 md:gap-8">
          <h2 className="font-bold text-lg text-[#51D4D6]">Our Blog</h2>
          <h1 className="max-w-4xl text-center text-gray-300 text-lg font-semibold md:text-xl xl:text-3xl">
            Stay <span className="text-[#51D4D6]">in the loop</span> with
            <br />
            the latest insights about recruitment, payroll management, job
            opportunities and many more.
          </h1>
        </div>
      </header>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 ">
        <div className="w-full my-8 lg:my-5">
          <h2 className="font-bold text-xl text-white/90">Articles</h2>
          <Filter filter={filter} categories={categories} />
        </div>

        <div className="flex flex-col md:flex-row gap-10 overflow-hidden">
          {/* Posts List */}
          <div className="w-full max-w-[700px]">
            <div className="blog-lists flex flex-col gap-5">
              {!blogPosts || blogPosts.length === 0 ? (
                <div className="text-red-500 text-center my-16">
                  Oops! No matching posts available
                </div>
              ) : (
                blogPosts.map((post) => (
                  <BlogPost
                    key={post.slug}
                    post={post}
                    filter={filter}
                    page={page}
                  />
                ))
              )}
            </div>
            <Pagination pagination={pagination} filter={filter} />
          </div>

          {/* Sidebar Ad */}
          <Ad pagination={pagination} />
        </div>
      </div>

      <BlogCTA pagination={pagination} />
    </section>
  );
};

export default BlogHome;
