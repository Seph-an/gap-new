export const dynamic = "force-dynamic";

import { LegalPage } from '@/components/CMS/PageRenderers';
import { fetchCollectionBySlug, seoToMetadata } from '@/lib/cms/strapi';
import Breadcrumbs from '@/components/Common/Breadcrumbs';

const slug = 'cookie-policy';

export async function generateMetadata() {
  const page = await fetchCollectionBySlug('legal-pages', slug);
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchCollectionBySlug('legal-pages', slug);
  return <><div className="px-4 pt-32 sm:px-6 md:px-12 lg:px-20"><div className="container"><Breadcrumbs items={page.breadcrumbs} /></div></div><LegalPage page={page} /></>;
}
