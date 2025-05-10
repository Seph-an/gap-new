// app/blog/[slug]/page.js

import { Suspense } from "react";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/Blog/Article/ArticlePage";
import { fetchBlog, fetchBlogs } from "@/utils/fetchBlogs";

export async function generateStaticParams() {
  const slugs = [];
  const firstPage = await fetchBlogs({ filter: "all", page: 1 });
  const meta = firstPage.meta;
  const pageCount = meta.pagination.pageCount;

  for (let p = 1; p <= pageCount; p++) {
    const pageData = await fetchBlogs({ filter: "all", page: p });
    pageData.data.forEach((post) => slugs.push({ slug: post.slug }));
  }

  return slugs;
}

export async function generateMetadata({ params }) {
  const post = await fetchBlog(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post is not available.",
    };
  }

  return {
    title: `${post.title} | Gap Recruitment`,
    description:
      post.description || "Recruitment insights and career advice in Kenya",
    openGraph: {
      title: `${post.title} | Gap Recruitment`,
      description:
        post.description || "Recruitment insights and career advice in Kenya",
      url: `https://gaprecruitment.co.ke/blog/${post.slug}`,
      images:
        "https://gaprecruitment.co.ke/assets/hire-best-talent-with-our-expert-recruitment-services-in-nairobi.svg",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Gap Recruitment`,
      description:
        post.description || "Recruitment insights and career advice in Kenya",
      image:
        "https://gaprecruitment.co.ke/assets/hire-best-talent-with-our-expert-recruitment-services-in-nairobi.svg",
    },
  };
}

const Page = async ({ params }) => {
  const post = await fetchBlog(params.slug);
  if (!post) {
    return notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gaprecruitment.co.ke/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.description || "",
    author: {
      "@type": "Organization",
      name: "Gap Recruitment",
    },
    publisher: {
      "@type": "Organization",
      name: "Gap Recruitment",
      logo: {
        "@type": "ImageObject",
        url: "https://gaprecruitment.co.ke/logo.png",
      },
    },
    url: `https://gaprecruitment.co.ke/blog/${post.slug}`,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
  };

  return (
    <>
      {/* Inject structured data as JSON-LD */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schema)}
      </script>

      <Suspense fallback={<div>Loading article…</div>}>
        <ArticlePage post={post} />
      </Suspense>
    </>
  );
};

export default Page;
