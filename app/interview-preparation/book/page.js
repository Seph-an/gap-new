import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Common/Breadcrumbs';
import InterviewBookingForm from '@/components/InterviewPreparation/InterviewBookingForm';
import { fetchCollectionBySlug, seoToMetadata } from '@/lib/cms/strapi';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const page = await fetchCollectionBySlug('service-pages', 'interview-preparation');
  const base = seoToMetadata(page?.seo || {});
  return { ...base, title: page?.bookingConfig?.heading || base.title, robots: { index: false, follow: true } };
}

export default async function Page({ searchParams }) {
  const page = await fetchCollectionBySlug('service-pages', 'interview-preparation');
  if (!page?.bookingConfig || page.bookingConfig.enabled === false) notFound();
  const params = await searchParams;
  const breadcrumbs = [...(page.breadcrumbs || []), { label: page.bookingConfig.heading, url: '/interview-preparation/book' }];

  return <section className="min-h-screen bg-[#0a0a0a] px-4 pb-20 pt-32 text-white sm:px-6 sm:pt-36 md:px-12 lg:px-20 lg:pt-40">
    <div className="container">
      <Breadcrumbs items={breadcrumbs} className="mb-8" />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,.7fr)_minmax(520px,1fr)] lg:gap-14">
        <header><p className="text-sm font-bold uppercase tracking-[.2em] text-[#51D4D6]">{page.bookingConfig.eyebrow}</p><h1 className="mt-4 text-[clamp(2.4rem,5vw,4rem)] font-bold leading-tight tracking-[-.04em]">{page.bookingConfig.heading}</h1><p className="mt-5 text-lg leading-8 text-gray-400">{page.bookingConfig.description}</p></header>
        <div className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-5 shadow-2xl sm:p-8"><InterviewBookingForm config={page.bookingConfig} initialMode={params?.mode} initialOffer={params?.offer} /></div>
      </div>
    </div>
  </section>;
}
