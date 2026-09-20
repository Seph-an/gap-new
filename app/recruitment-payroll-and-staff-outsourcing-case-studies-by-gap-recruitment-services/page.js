export const dynamic = 'force-dynamic';

import BreadcrumbOverlay from '@/components/Common/BreadcrumbOverlay';
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
  return <div className="relative"><BreadcrumbOverlay items={page.breadcrumbs} /><CaseStudiesPage page={page} initialResult={initialResult} /></div>;
}
