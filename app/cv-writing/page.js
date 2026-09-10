import { notFound } from 'next/navigation';
import CvWritingExperience from '@/components/CvWriting/CvWritingExperience';
import { CvClosingCta, CvFaqSection } from '@/components/CvWriting/CvConversionSections';
import { fetchCvWritingData } from '@/lib/cms/cvWriting';
import { seoToMetadata } from '@/lib/cms/strapi';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { page } = await fetchCvWritingData();
  return page?.seo ? seoToMetadata(page.seo) : {};
}

export default async function CvWritingPage({ searchParams }) {
  const data = await fetchCvWritingData();
  if (!data.page) notFound();
  const params = await searchParams;
  return (<>
    <CvWritingExperience {...data} initialCareerLevel={params?.careerLevel} />
    <CvFaqSection section={data.page.faqSection} />
    <CvClosingCta section={data.page.closingCta} />
  </>);
}
