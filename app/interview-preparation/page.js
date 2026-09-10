import { notFound } from 'next/navigation';
import InterviewPreparationPage from '@/components/InterviewPreparation/InterviewPreparationPage';
import { fetchCollectionBySlug, seoToMetadata } from '@/lib/cms/strapi';

export const dynamic = 'force-dynamic';
const slug = 'interview-preparation';

export async function generateMetadata() {
  const page = await fetchCollectionBySlug('service-pages', slug);
  return page?.seo ? seoToMetadata(page.seo) : {};
}

export default async function Page() {
  const page = await fetchCollectionBySlug('service-pages', slug);
  if (!page) notFound();
  return <InterviewPreparationPage page={page} />;
}
