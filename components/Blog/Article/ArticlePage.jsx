// components/Blog/Article/ArticlePage.jsx

"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "./BackButton";
import timeAgo from "@/utils/time_ago";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticlePage({ post }) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const page = searchParams.get("page");

  const queryParams = new URLSearchParams();
  if (filter) queryParams.append("filter", filter);
  if (page) queryParams.append("page", page);

  const backUrl = queryParams.toString()
    ? `/blog?${queryParams.toString()}`
    : "/blog";

  return (
    <section className="w-screen min-h-screen flex justify-center items-center pt-16 my-8 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="container">
        <div className="max-w-5xl mx-auto my-8">
          <BackButton backUrl={backUrl} />
          <div className="prose prose-invert prose-lg max-w-none prose-p:mb-6 prose-headings:mt-10 prose-headings:mb-4 prose-li:mb-2 prose-strong:text-primary">
            <span className="text-white/90 bg-primary rounded-sm py-2 px-3 text-sm">
              {timeAgo(post.createdAt)} - {post.read_time} mins read
            </span>
            <h1 className="text-white/90 mt-5 mb-8 font-bold text-lg md:text-2xl lg:text-4xl xl:text-5xl">
              {post.title}
            </h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.article}</ReactMarkdown>
          </div>
          <BackButton backUrl={backUrl} />
        </div>
      </div>
    </section>
  );
}
