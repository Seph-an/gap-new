import BlogCard from "./BlogCard";
import getFeaturedPosts from "./GetFeaturedPosts";

import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/utils/fetchBlogs";
import { Loader } from "lucide-react";

const BlogCards = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", {}],
    queryFn: () => fetchBlogs({}),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className="text-[#51D4D6] text-xl my-16 container grid place-content-center">
        <div className="flex gap-5 items-center">
          <Loader color="#51D4D6" size={40} className="animate-spin" />
          <span>Fetching blogs...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 my-16 container grid place-content-center">
        Error fetching blogs: {error}
      </div>
    );

  const blogPosts = data?.data?.data;
  const featuredPosts = getFeaturedPosts(blogPosts);

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
