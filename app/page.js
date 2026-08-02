export const dynamic = "force-dynamic";

import HomePageContent from '@/components/Common/HomePageContent';
import { fetchSingle, seoToMetadata } from '@/lib/cms/strapi';
import { fetchBlogs } from '@/utils/fetchBlogs';

export async function generateMetadata() {
  const page = await fetchSingle('home-page');
  return seoToMetadata(page.seo);
}

export default async function Page() {
  const [page, blogs] = await Promise.all([fetchSingle('home-page'), fetchBlogs({ pageSize: 3 })]);
  return <HomePageContent page={page} featuredBlogs={blogs.data} />;
}
