export const dynamic = "force-dynamic";

import { LegalPage } from '@/components/CMS/PageRenderers';
import { fetchCollectionBySlug, seoToMetadata } from '@/lib/cms/strapi';

const slug = 'attributions';

export async function generateMetadata() {
  const page = await fetchCollectionBySlug('legal-pages', slug);
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchCollectionBySlug('legal-pages', slug);
  return <LegalPage page={page} />;
}
