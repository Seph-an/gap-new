"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "./BackButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from 'next/image';
import { CalendarDays, Clock3 } from 'lucide-react';
import { imageUrl } from '@/lib/cms/strapi';

function MarkdownImage({ src, alt = '' }) {
  if (!src) return null;
  return <span className="my-8 block overflow-hidden rounded-2xl border border-white/10"><Image src={imageUrl(src)} alt={alt} width={1200} height={675} sizes="(max-width: 1024px) 100vw, 1024px" className="h-auto w-full object-cover" /></span>;
}

const markdownComponents = {
  img: MarkdownImage,
  pre: ({ children, ...props }) => <pre {...props} className="my-8 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-[#111827] p-5 text-sm leading-7 shadow-inner">{children}</pre>,
  code: ({ children, className, ...props }) => <code {...props} className={`${className || ''} rounded bg-white/10 px-1.5 py-0.5 font-mono text-[#9FE7E8] before:content-none after:content-none`}>{children}</code>,
};

export default function ArticlePage({ post }) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const page = searchParams.get("page");

  const queryParams = new URLSearchParams();
  if (filter) queryParams.append("filter", filter);
  if (page) queryParams.append("page", page);

  const backUrl = queryParams.toString() ? `/blog?${queryParams.toString()}` : "/blog";

  return (
    <article className="min-h-screen w-screen px-4 pb-20 pt-32 sm:px-6 md:px-12 lg:px-20 lg:pt-40">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <BackButton backUrl={backUrl} />
          <header className="mt-8">
            <div className="flex flex-wrap gap-2">{post.categories?.map((category) => <span key={category.Title} className="rounded-full bg-[#51D4D6]/10 px-3 py-1 text-sm font-semibold text-[#51D4D6]">{category.Title}</span>)}</div>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">{post.title}</h1>
            {post.description && <p className="mt-6 max-w-4xl text-xl leading-8 text-gray-300">{post.description}</p>}
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-400">
              {post.publishedAt && <span className="flex items-center gap-2"><CalendarDays size={17} />{new Intl.DateTimeFormat('en-KE', { dateStyle: 'long' }).format(new Date(post.publishedAt))}</span>}
              {post.read_time && <span className="flex items-center gap-2"><Clock3 size={17} />{post.read_time}</span>}
            </div>
          </header>
          {post.image?.url && <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl"><Image src={imageUrl(post.image.url)} alt={post.image.alternativeText || post.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" /></div>}
          <div className="prose prose-invert prose-lg mt-12 max-w-none prose-headings:mb-4 prose-headings:mt-10 prose-li:mb-2 prose-p:mb-6 prose-strong:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.article}</ReactMarkdown>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8"><BackButton backUrl={backUrl} /></div>
        </div>
      </div>
    </article>
  );
}
