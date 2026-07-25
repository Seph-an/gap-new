export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/Blog/Article/ArticlePage";
import { fetchBlog } from "@/utils/fetchBlogs";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const post = await fetchBlog(awaitedParams.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      images: post.image ? [{ url: post.image }] : undefined,
      type: "article",
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

const Page = async ({ params }) => {
  const awaitedParams = await params;
  const post = await fetchBlog(awaitedParams.slug);
  if (!post) notFound();

  return (
    <Suspense fallback={null}>
      <ArticlePage post={post} />
    </Suspense>
  );
};

export default Page;
