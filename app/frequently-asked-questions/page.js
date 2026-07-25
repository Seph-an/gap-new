export const dynamic = "force-dynamic";

import { FAQPage } from '@/components/CMS/PageRenderers';
import { fetchSingle, seoToMetadata } from '@/lib/cms/strapi';

export async function generateMetadata() {
  const page = await fetchSingle('faq-page');
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchSingle('faq-page');
  return <FAQPage page={page} />;
}
