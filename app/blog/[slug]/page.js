// app/blog/[slug]/page.js

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ArticlePage from '@/components/Blog/Article/ArticlePage';
import { fetchBlog, fetchBlogs } from '@/utils/fetchBlogs';

export async function generateStaticParams() {
  const slugs = [];
  const firstPage = await fetchBlogs({ filter: 'all', page: 1 });
  const meta = firstPage.meta;
  const pageCount = meta.pagination.pageCount;

  for (let p = 1; p <= pageCount; p++) {
    const pageData = await fetchBlogs({ filter: 'all', page: p });
    pageData.data.forEach((post) => slugs.push({ slug: post.slug }));
  }

  return slugs;
}

const Page = async ({ params }) => {
  const post = await fetchBlog(params.slug);
  if (!post) {
    return notFound();
  }

  return (
    <Suspense fallback={<div>Loading article…</div>}>
      <ArticlePage post={post} />
    </Suspense>
  );
};

export default Page;
