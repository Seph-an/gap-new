import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Common/Breadcrumbs';
import CvOrderForm from '@/components/CvWriting/CvOrderForm';
import { fetchCvWritingData } from '@/lib/cms/cvWriting';
import { seoToMetadata } from '@/lib/cms/strapi';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { page } = await fetchCvWritingData();
  return page?.seo ? seoToMetadata(page.seo) : {};
}

export default async function CvOrderPage({ searchParams }) {
  const data = await fetchCvWritingData();
  if (!data.page?.orderPage || data.page.orderPage.enabled === false) notFound();
  const params = await searchParams;
  const selectedPackage = data.packages.find((item) => item.slug === params?.package && item.active !== false && item.paymentAvailable !== false && item.customQuote !== true && Number.isFinite(Number(item.price)));
  const content = data.page.orderPage;
  const crumbs = [...(data.page.breadcrumbs || []).slice(0, -1), ...(data.page.breadcrumbs || []).slice(-1), { label: content.heading, url: `/cv-writing/order${selectedPackage ? `?package=${selectedPackage.slug}` : ''}` }];

  if (!selectedPackage) return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 pb-20 pt-36 text-white sm:px-6 sm:pt-40 md:px-12 lg:px-20">
      <div className="container mx-auto"><Breadcrumbs items={crumbs} className="mb-8" />
        <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#1e1e1e] p-6 text-center sm:p-10">
          {content.invalidPackageHeading && <h1 className="text-3xl font-bold sm:text-4xl">{content.invalidPackageHeading}</h1>}
          {content.invalidPackageDescription && <p className="mt-4 leading-7 text-gray-400">{content.invalidPackageDescription}</p>}
          {content.choosePackageLabel && content.choosePackageDestination && <Link href={content.choosePackageDestination} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#51D4D6] px-6 py-3 font-bold text-[#0a0a0a] hover:bg-[#3FAFB1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{content.choosePackageLabel}</Link>}
        </section>
      </div>
    </main>
  );

  const price = new Intl.NumberFormat('en-KE', { style: 'currency', currency: selectedPackage.currency || 'KES', maximumFractionDigits: 0 }).format(Number(selectedPackage.price));
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0a0a0a] px-4 pb-20 pt-36 text-white sm:px-6 sm:pt-40 md:px-12 lg:px-20 lg:pb-28">
      <div className="container mx-auto">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <header className="max-w-3xl">
          {content.eyebrow && <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#51D4D6]">{content.eyebrow}</p>}
          {content.heading && <h1 className="mt-3 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-tight tracking-[-0.04em] text-white/90">{content.heading}</h1>}
          {content.description && <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">{content.description}</p>}
        </header>
        <div className="mt-10 max-w-5xl">
          <CvOrderForm content={content} selectedPackage={selectedPackage} formattedPrice={price} />
        </div>
      </div>
    </main>
  );
}
