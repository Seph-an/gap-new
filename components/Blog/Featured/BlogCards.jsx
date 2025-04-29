// components/Blog/BlogCards.jsx

import BlogCard from "./BlogCard";
import getFeaturedPosts from "./GetFeaturedPosts";
import { fetchBlogs } from "@/utils/fetchBlogs";

const BlogCards = async () => {
  const allPostsData = await fetchBlogs({
    filter: "all",
    pageSize: 20, // Fetch enough posts to have enough to filter from
    page: 1,
  });

  // Normalize the posts array depending on build/runtime
  const allPosts = Array.isArray(allPostsData)
    ? allPostsData
    : allPostsData?.data || [];

  // Apply your getFeaturedPosts logic
  const featuredPosts = getFeaturedPosts(allPosts);

  return (
    <div className="mt-12 mb-8 lg:mt-16 pb-4 w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {featuredPosts?.length ? (
        featuredPosts.map((featuredPost) => (
          <BlogCard key={featuredPost.id} post={featuredPost} />
        ))
      ) : (
        <div className="text-red-500 text-xl my-16 container grid place-content-center">
          <div className="flex gap-5 items-center justify-center">
            <p className="text-2xl">🤷‍♀️</p>
            <span>No featured posts available</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCards;
