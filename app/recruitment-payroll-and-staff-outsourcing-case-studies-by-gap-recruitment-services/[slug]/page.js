export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import CaseStudyDetail from '@/components/CaseStudies/CaseStudyDetail';
import { fetchCollectionBySlug, seoToMetadata } from '@/lib/cms/strapi';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = await fetchCollectionBySlug('case-studies', slug);
  return study ? seoToMetadata(study.seo) : { title: 'Case study not found', robots: { index: false, follow: false } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const study = await fetchCollectionBySlug('case-studies', slug);
  if (!study) notFound();
  return <CaseStudyDetail study={study} />;
}
