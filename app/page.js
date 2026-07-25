export const dynamic = "force-dynamic";

import HomePageContent from '@/components/Common/HomePageContent';
import { fetchSingle, seoToMetadata } from '@/lib/cms/strapi';

export async function generateMetadata() {
  const page = await fetchSingle('home-page');
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const page = await fetchSingle('home-page');
  return <HomePageContent page={page} />;
}
