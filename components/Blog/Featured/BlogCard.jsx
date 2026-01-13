import Link from "next/link";
import timeAgo from "@/utils/time_ago";
import { ArrowRight } from "lucide-react";

function truncateToFirstSentence(text) {
  return text.length > 70 ? text.slice(0, 100) + "..." : text;
}

const BlogCard = ({ post }) => {
  const categories = post?.categories;
  const articleUrl = `/blog/${post?.slug}`;

  const truncatedContent = truncateToFirstSentence(post?.description);
  return (
    <div className="bg-[#1e1e1e] gap-shadow shadow-md lg:flex-1 flex-shrink-0 relative flex flex-col items-start gap-4  p-5 rounded-md">
      <div className="flex gap-2 items-center">
        {categories?.map((category, index) => (
          <span
            key={index}
            className="post_category py-1 px-2 bg-gray-900 rounded text-sm text-white/90 "
          >
            {category?.Title}
          </span>
        ))}
      </div>
      <Link href={articleUrl}>
        <h2 className="text-[#51D4D6] text-sm sm:text-base underline sm:max-w-[700px] leading-5 font-medium">
          {post?.title}
        </h2>
      </Link>
      <p className=" text-base text-white/90 font-regular">
        {truncatedContent}
      </p>
      <div className=" self-end w-full flex flex-col xl:flex-row justify-between gap-2">
        <span className=" text-sm text-gray-500 font-regular">
          {post?.read_time} mins read
        </span>
        <Link href={articleUrl} className="more flex gap-2 items-center ">
          <span className="text-[#51D4D6]">Read more</span>
          <ArrowRight color="#51D4D6" size={18} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
