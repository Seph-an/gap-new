export const dynamic = "force-dynamic";

import { JobSeekerPage } from '@/components/CMS/PageRenderers';
import { fetchSingle, seoToMetadata } from '@/lib/cms/strapi';

export async function generateMetadata() {
  const page = await fetchSingle('job-seeker-page');
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchSingle('job-seeker-page');
  return <JobSeekerPage page={page} />;
}
