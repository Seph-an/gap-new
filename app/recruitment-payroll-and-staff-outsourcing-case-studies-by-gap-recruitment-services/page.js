export const dynamic = 'force-dynamic';

import CaseStudiesPage from '@/components/CaseStudies/CaseStudiesPage';
import { fetchCMS, seoToMetadata } from '@/lib/cms/strapi';
import { fetchCaseStudies } from '@/lib/cms/caseStudies';

export async function generateMetadata() {
  const page = await fetchCMS('case-study-page', { status: 'published' });
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchCMS('case-study-page', { status: 'published' });
  const initialResult = await fetchCaseStudies({ page: 1, pageSize: page.filterSettings?.batchSize || 9 });
  return <CaseStudiesPage page={page} initialResult={initialResult} />;
}
