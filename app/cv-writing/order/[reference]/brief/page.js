import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Common/Breadcrumbs';
import CvBriefForm from '@/components/CvWriting/CvBriefForm';
import { fetchCvWritingData } from '@/lib/cms/cvWriting';

export const dynamic = 'force-dynamic';

export default async function CvBriefPage({ params }) {
  const data = await fetchCvWritingData();
  const content = data.page?.orderPage;
  if (!content || content.enabled === false) notFound();
  const { reference } = await params;
  const crumbs = [...(data.page.breadcrumbs || []), { label: content.briefHeading, url: `/cv-writing/order/${reference}/brief` }];
  return <main className="min-h-screen bg-[#0a0a0a] px-4 pb-20 pt-36 text-white sm:px-6 sm:pt-40 md:px-12 lg:px-20 lg:pb-28"><div className="container mx-auto"><Breadcrumbs items={crumbs} className="mb-8" /><header className="max-w-3xl">{content.briefHeading && <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold tracking-[-0.04em] text-white/90">{content.briefHeading}</h1>}{content.briefDescription && <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">{content.briefDescription}</p>}</header><div className="mt-10 max-w-4xl"><CvBriefForm content={content} reference={reference}  /></div></div></main>;
}
