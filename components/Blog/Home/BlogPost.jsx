import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { imageUrl } from '@/lib/cms/strapi';

function truncate(text = "", max = 150) {
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

const BlogPost = ({ post }) => {
  const href = `/blog/${post.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#51D4D6]/60">
      {post.image?.url && <Link href={href} className="relative block aspect-[16/9] overflow-hidden"><Image src={imageUrl(post.image.url)} alt={post.image.alternativeText || post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></Link>}
      <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        {post.categories?.map((cat) => (
          <span key={cat.Title} className="rounded bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
            {cat.Title}
          </span>
        ))}
      </div>
      <Link href={href} className="mt-4 text-xl font-bold leading-snug text-white transition-colors hover:text-[#51D4D6]">
        {post.title}
      </Link>
      {post.description && <p className="mt-3 text-base leading-7 text-gray-300">{truncate(post.description)}</p>}
      <div className="mt-auto flex w-full items-center justify-between gap-4 pt-6">
        {post.read_time ? <span className="flex items-center gap-1.5 text-sm text-gray-400"><Clock3 size={15} />{post.read_time}</span> : <span />}
        <Link href={href} aria-label={`Read ${post.title}`} className="inline-flex items-center gap-1.5 font-semibold text-[#51D4D6]">Read article <ArrowUpRight size={17} /></Link>
      </div>
      </div>
    </article>
  );
};

export default BlogPost;
