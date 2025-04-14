"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/utils/fetchBlogs";
import timeAgo from "@/utils/time_ago";
import BackButton from "./BackButton";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogPage = ({ slug }) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const page = searchParams.get("page");

  const queryParams = new URLSearchParams();
  if (filter) queryParams.append("filter", filter);
  if (page) queryParams.append("page", page);

  const queryString = queryParams.toString();
  let backUrl = "/blog";

  if (queryString) {
    backUrl += `?${queryString}`;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", { filter, page }],
    queryFn: () => fetchBlogs({ filter, page }),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className="text-xl min-h-screen max-w-7xl grid place-content-center">
        <div className="flex items-col gap-5 items-center">
          <Loader color="#51D4D6" size={40} className="animate-spin" />
          <span className="#51D4D6">Loading blog post...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 min-h-screen max-w-7xl grid place-content-center">
        Error loading blog post: {error}
      </div>
    );

  const blogPosts = data?.data?.data;
  console.log("The posts in articles is:", blogPosts);

  const blogPost = blogPosts?.find((blog) => blog.slug === slug);
  console.log("slug from blog:", slug);
  console.log("specific post :", blogPost);

  return (
    <section className="w-screen min-h-screen flex justify-center items-center pt-16 my-8 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="container  ">
        <div className="max-w-5xl mx-auto my-8">
          <BackButton backUrl={backUrl} />

          <div className="prose prose-lg text-justify text-gray-300">
            <span className=" text-white/90 bg-primary rounded-sm py-2 px-3 text-sm ">
              {timeAgo(blogPost?.createdAt)} - {blogPost?.read_time} mins read
            </span>
            <h1 className="text-white/90 mt-5 mb-8 font-bold text-lg md:text-2xl lg:text-4xl xl:text-5xl ">
              {blogPost?.title}
            </h1>

            <ReactMarkdown>{blogPost?.article}</ReactMarkdown>
          </div>

          <BackButton backUrl={backUrl} />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
