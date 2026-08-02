export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/Blog/Article/ArticlePage";
import { fetchBlog } from "@/utils/fetchBlogs";
import { imageUrl } from '@/lib/cms/strapi';
import { absoluteUrl, blogPostingSchema, PUBLISHER_LOGO, seoImageUrl, SITE_NAME } from '@/lib/blogSeo';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const post = await fetchBlog(awaitedParams.slug);
  if (!post) return {};
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const image = seoImageUrl(post.image?.url ? imageUrl(post.image.url) : PUBLISHER_LOGO);
  const categories = post.categories?.map((category) => category.Title).filter(Boolean) || [];
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    authors: [{ name: SITE_NAME, url: absoluteUrl('/') }],
    category: categories[0],
    keywords: categories,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: {
      title: post.title, description: post.description, url: canonical, siteName: SITE_NAME,
      images: [{ url: image, alt: post.image?.alternativeText || post.title }], type: 'article', locale: 'en_KE',
      publishedTime: post.publishedAt, modifiedTime: post.updatedAt || post.publishedAt,
      authors: [absoluteUrl('/')], section: categories[0], tags: categories,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [image], site: '@GapLimited' },
  };
}

const Page = async ({ params }) => {
  const awaitedParams = await params;
  const post = await fetchBlog(awaitedParams.slug);
  if (!post) notFound();

  const schema = blogPostingSchema(post);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <Suspense fallback={null}><ArticlePage post={post} /></Suspense>
    </>
  );
};

export default Page;
