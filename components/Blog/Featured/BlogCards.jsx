import BlogCard from "./BlogCard";
import getFeaturedPosts from "./GetFeaturedPosts";

import { fetchBlogs } from "@/utils/fetchBlogs";

const BlogCards = async () => {
  const featuredPostsData = await fetchBlogs({
    featured: true,
    pageSize: 3,
    filter: "all",
    page: 1,
  });

  const featuredPosts = featuredPostsData?.data?.data || [];

  return (
    <div className="mt-12 mb-8 lg:mt-16 pb-4 w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {featuredPosts?.length ? (
        featuredPosts?.map((featuredPost) => (
          <BlogCard key={featuredPost.id} post={featuredPost} />
        ))
      ) : (
        <div className="text-red-500 text-xl my-16 container grid place-content-center">
          <div className="flex gap-5 items-center">
            <p className="text-2xl">🤷‍♀️</p>
            <span>No featured posts available</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCards;
