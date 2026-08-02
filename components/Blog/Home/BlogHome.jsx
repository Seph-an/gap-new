import Filter from "./Filter";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import { imageUrl } from '@/lib/cms/strapi';
import { absoluteUrl, BLOG_DESCRIPTION, BLOG_NAME, blogPath, PUBLISHER_LOGO, seoImageUrl, SITE_NAME } from '@/lib/blogSeo';

const BlogHome = ({ filter, page, blogPosts, pagination, categories }) => {
  const canonical = absoluteUrl(blogPath({ filter, page }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": canonical + "#blog",
    name: filter === "all" ? BLOG_NAME : `${decodeURIComponent(filter)} Articles`,
    description: BLOG_DESCRIPTION,
    url: canonical,
    inLanguage: "en-KE",
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl('/'), logo: { "@type": "ImageObject", url: PUBLISHER_LOGO } },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}`) + "#article",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      description: post.description || undefined,
      image: [seoImageUrl(post.image?.url ? imageUrl(post.image.url) : undefined)],
      author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl('/') },
      publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl('/') },
      articleSection: post.categories?.[0]?.Title,
      inLanguage: "en-KE",
    })),
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <section className="min-h-screen w-screen px-4 pb-20 pt-32 sm:px-6 md:px-12 lg:px-20 lg:pt-40">
        <header className="mx-auto max-w-4xl text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#51D4D6]">Insights</p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Recruitment and workforce insights</h1>
          <p className="mt-5 text-lg leading-8 text-gray-300">Practical ideas for employers, HR teams, and job seekers.</p>
        </header>
        <div className="container my-10">
          <Filter filter={filter} categories={categories} />
        </div>
        <div className="container">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts?.map((post) => <BlogPost key={post.slug} post={post} />)}
          </div>
          {blogPosts?.length === 0 && <p className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-8 text-center text-gray-300">No blog posts are published yet.</p>}
          <Pagination pagination={pagination} filter={filter} />
        </div>
      </section>
    </>
  );
};

export default BlogHome;
