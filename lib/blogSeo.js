import { imageUrl } from '@/lib/cms/strapi';

export const SITE_NAME = 'Gap Recruitment Services Limited';
export const BLOG_NAME = 'Gap Recruitment Insights';
export const BLOG_DESCRIPTION = 'Practical recruitment, payroll, staff outsourcing, workplace, and career insights for employers, HR teams, and job seekers in Kenya.';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gaprecruitment.co.ke').replace(/\/$/, '');
export const PUBLISHER_LOGO = imageUrl('/uploads/logo_3e9f2d31af.png');

export function seoImageUrl(image) {
  return image && !/\.svg(?:$|\?)/i.test(image) ? image : PUBLISHER_LOGO;
}

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL + '/').toString();
}

export function blogPath({ filter = 'all', page = 1 } = {}) {
  const base = filter === 'all' ? '/blog' : `/blog/category/${encodeURIComponent(filter)}`;
  return page > 1 ? `${base}/page/${page}` : base;
}

export function blogIndexMetadata({ filter = 'all', page = 1, image } = {}) {
  const category = filter === 'all' ? null : decodeURIComponent(filter);
  const baseTitle = category ? `${category} Articles` : 'Recruitment and Workforce Insights';
  const title = page > 1 ? `${baseTitle} – Page ${page}` : baseTitle;
  const description = category
    ? `Browse ${category.toLowerCase()} insights, practical guidance, and updates from ${SITE_NAME}.`
    : BLOG_DESCRIPTION;
  const canonical = absoluteUrl(blogPath({ filter, page }));
  const socialImage = seoImageUrl(image);

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, locale: 'en_KE', type: 'website', images: [{ url: socialImage, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [socialImage], site: '@GapLimited' },
  };
}

export function blogPostingSchema(post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = seoImageUrl(post.image?.url ? imageUrl(post.image.url) : undefined);
  const categories = post.categories?.map((category) => category.Title).filter(Boolean) || [];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting', '@id': url + '#article', url, mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: post.title, description: post.description || undefined, image: image ? [image] : undefined,
        datePublished: post.publishedAt, dateModified: post.updatedAt || post.publishedAt,
        author: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/'), logo: { '@type': 'ImageObject', url: PUBLISHER_LOGO } },
        articleSection: categories[0] || 'Workforce Insights', keywords: categories.length ? categories.join(', ') : undefined,
        wordCount: post.article ? post.article.trim().split(/\s+/).filter(Boolean).length : undefined,
        isPartOf: { '@type': 'Blog', '@id': absoluteUrl('/blog') + '#blog', name: BLOG_NAME, url: absoluteUrl('/blog') },
        inLanguage: 'en-KE',
      },
      {
        '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
