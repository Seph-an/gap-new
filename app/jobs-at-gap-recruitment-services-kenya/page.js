import JobFeed from '@/components/Jobs/JobFeed';
import { fetchJobs, jobUrl, JOBS_ROUTE } from '@/lib/jobs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gaprecruitment.co.ke';
const title = 'Jobs in Kenya | Gap Recruitment Services';
const description = 'Explore current job opportunities in Kenya from Gap Recruitment Services. Filter vacancies by role, location, department and employment type.';

export const revalidate = 3600;

export const metadata = {
  title,
  description,
  keywords: ['jobs in Kenya', 'job vacancies Kenya', 'recruitment jobs Nairobi', 'Gap Recruitment Services jobs'],
  alternates: { canonical: JOBS_ROUTE },
  openGraph: { title, description, url: JOBS_ROUTE, type: 'website', locale: 'en_KE' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};

export default async function JobsPage() {
  let result = { data: [], meta: { pagination: { page: 1, pageSize: 12, pageCount: 1, total: 0 } } };
  try { result = await fetchJobs({ page: 1, pageSize: 12 }); } catch {}
  const pageUrl = `${SITE_URL}${JOBS_ROUTE}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: result.meta.pagination.total,
      itemListElement: result.data.map((job, index) => ({ '@type': 'ListItem', position: index + 1, name: job.name, url: `${SITE_URL}${jobUrl(job)}` })),
    },
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /><header className="relative overflow-hidden bg-[#0a0a0a] px-4 pb-20 pt-36 sm:px-6 md:px-12 lg:px-20 lg:pb-24 lg:pt-44"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(81,212,214,0.18),transparent_38%)]" /><div className="container relative"><p className="font-semibold uppercase tracking-[0.24em] text-[#51D4D6]">Careers at leading organisations</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Find jobs with Gap Recruitment Services Kenya</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">Discover verified opportunities from employers across Kenya. Search and filter current openings, then review every role before applying.</p></div></header><JobFeed initialJobs={result.data} initialPagination={result.meta.pagination} /></>;
}
