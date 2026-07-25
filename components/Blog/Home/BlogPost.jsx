import Link from "next/link";

function truncate(text = "", max = 70) {
  return text.length > max ? text.slice(0, max) : text;
}

const BlogPost = ({ post }) => {
  const href = `/blog/${post.slug}`;

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="flex gap-2 items-center">
        {post.categories?.map((cat) => (
          <span key={cat.Title} className="post_category py-0.5 px-2 bg-gray-900 rounded text-sm font-regular text-white">
            {cat.Title}
          </span>
        ))}
      </div>
      <Link href={href} className="text-[#51D4D6] text-base sm:text-lg">
        {post.title}
      </Link>
      {post.description && <p className="post_summary text-base opacity-90 text-white">{truncate(post.description)}</p>}
      {post.read_time && <span className="post_time text-sm text-gray-300 font-regular">{post.read_time}</span>}
    </div>
  );
};

export default BlogPost;
