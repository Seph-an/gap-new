// components/Blog/Home/BlogPost.jsx

import Link from "next/link";
import timeAgo from "@/utils/time_ago";
import { ArrowRight } from "lucide-react";

function truncate(text, max = 70) {
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

const BlogPost = ({ post }) => {
  const href = `/blog/${post.slug}`;

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="flex gap-2 items-center">
        {post.categories.map((cat) => (
          <span
            key={cat.Title}
            className="post_category py-0.5 px-2 bg-[#1e1e1e] rounded text-sm font-regular text-white"
          >
            {cat.Title}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="text-[#51D4D6] text-base sm:text-lg underline"
      >
        {post.title}
      </Link>

      <p className="post_summary text-base opacity-90 text-white">
        {truncate(post.description)}
      </p>

      <span className="post_time text-sm text-gray-300 font-regular">
        {timeAgo(post.createdAt)} &bull; {post.read_time} min read
      </span>

      <Link
        href={href}
        className="more flex gap-2 items-center absolute right-0 bottom-11"
      >
        <span className="text-[#51D4D6]">Read more</span>
        <ArrowRight color="#51D4D6" size={18} strokeWidth={2} />
      </Link>

      <hr className="border-t border-gray-300 w-full mt-3 mb-6" />
    </div>
  );
};

export default BlogPost;
