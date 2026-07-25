export const dynamic = "force-dynamic";

import { AboutPage } from '@/components/CMS/PageRenderers';
import { fetchSingle, seoToMetadata } from '@/lib/cms/strapi';

export async function generateMetadata() {
  const page = await fetchSingle('about-page');
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchSingle('about-page');
  return <AboutPage page={page} />;
}
