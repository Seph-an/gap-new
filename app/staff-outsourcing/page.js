export const dynamic = "force-dynamic";

import { ServicePage } from '@/components/CMS/PageRenderers';
import { fetchCollectionBySlug, seoToMetadata } from '@/lib/cms/strapi';

const slug = 'staff-outsourcing';

export async function generateMetadata() {
  const page = await fetchCollectionBySlug('service-pages', slug);
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchCollectionBySlug('service-pages', slug);
  return <ServicePage page={page} />;
}
