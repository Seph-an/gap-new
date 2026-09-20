export const dynamic = "force-dynamic";

import { ContactPage } from '@/components/CMS/PageRenderers';
import { fetchSingle, seoToMetadata } from '@/lib/cms/strapi';
import BreadcrumbOverlay from '@/components/Common/BreadcrumbOverlay';

export async function generateMetadata() {
  const page = await fetchSingle('contact-page');
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchSingle('contact-page');
  return <div className="relative"><BreadcrumbOverlay items={page.breadcrumbs} /><ContactPage page={page} /></div>;
}
