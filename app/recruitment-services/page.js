export const dynamic = "force-dynamic";

import { ServicePage } from '@/components/CMS/PageRenderers';
import { fetchCollectionBySlug, seoToMetadata } from '@/lib/cms/strapi';
import BreadcrumbOverlay from '@/components/Common/BreadcrumbOverlay';

const slug = 'recruitment-services';

export async function generateMetadata() {
  const page = await fetchCollectionBySlug('service-pages', slug);
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchCollectionBySlug('service-pages', slug);
  return <div className="relative"><BreadcrumbOverlay items={page.breadcrumbs} /><ServicePage page={page} /></div>;
}
