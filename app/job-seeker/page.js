export const dynamic = "force-dynamic";

import JobSeekerPage from '@/components/JobSeeker/JobSeekerPage';
import { fetchSingle, seoToMetadata } from '@/lib/cms/strapi';
import BreadcrumbOverlay from '@/components/Common/BreadcrumbOverlay';
import { normalizeListedJobsLink } from '@/lib/jobs';

export async function generateMetadata() {
  const page = await fetchSingle('job-seeker-page');
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchSingle('job-seeker-page');
  const hero = { ...page.hero, ctas: page.hero?.ctas?.map((cta) => ({ ...cta, url: normalizeListedJobsLink(cta.url), external: normalizeListedJobsLink(cta.url) === cta.url ? cta.external : false })) };
  return <div className="relative"><BreadcrumbOverlay items={page.breadcrumbs} /><JobSeekerPage page={{ ...page, hero }} /></div>;
}
