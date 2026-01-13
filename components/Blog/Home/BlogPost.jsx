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
            className="post_category py-0.5 px-2 bg-gray-900 rounded text-sm font-regular text-white"
          >
            {cat.Title}
          </span>
        ))}
      </div>

      <Link href={href} className="text-[#51D4D6] text-base sm:text-lg">
        {post.title}
      </Link>

      <p className="post_summary text-base opacity-90 text-white">
        {truncate(post.description)}
      </p>

      <div className="flex w-full items-center">
        <span className="post_time text-sm text-gray-300 font-regular">
          &bull; {post.read_time} min read
        </span>

        <Link href={href} className="more flex gap-2 items-center ml-auto">
          <span className="text-[#51D4D6]">Read more</span>
          <ArrowRight color="#51D4D6" size={18} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
