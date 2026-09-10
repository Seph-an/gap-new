import Breadcrumbs from '@/components/Common/Breadcrumbs';
import { CheckCircle } from 'lucide-react';
import CMSIcon from '@/components/CMS/Icon';
import LinkButton from '@/components/CMS/LinkButton';
import { CvClosingCta, CvFaqSection } from '@/components/CvWriting/CvConversionSections';
import InterviewPricing from './InterviewPricing';

function cards(section) {
  return Array.isArray(section?.cards) ? section.cards.filter((item) => item?.title || item?.description || item?.label) : [];
}

function StructuredData({ page }) {
  const data = page.structuredData;
  if (!data) return null;
  const service = {
    '@context': 'https://schema.org', '@type': data.schemaType || 'Service', name: data.name || page.title,
    description: data.description || page.seo?.description, url: data.url || data.canonicalUrl || page.seo?.canonical,
    serviceType: data.serviceType, areaServed: data.areaServed,
    provider: { '@type': 'EmploymentAgency', name: 'Gap Recruitment Services Limited' },
  };
  const faqs = (page.faqSection?.faqs || []).filter((item) => item.active !== false && item.question && item.answer);
  const schema = faqs.length ? { '@context': 'https://schema.org', '@graph': [service, {
    '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  }] } : service;
  return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

function InterviewHero({ hero, breadcrumbs }) {
  const highlights = (hero?.highlights || []).filter((item) => item?.value);
  if (!hero) return null;
  return <header className="relative overflow-hidden bg-[#0a0a0a] px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36 md:px-12 lg:px-20 lg:pb-24 lg:pt-40">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(81,212,214,0.16),transparent_30%)]" aria-hidden="true" />
    <div className="container relative"><Breadcrumbs items={breadcrumbs} /><div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.65fr)] lg:gap-16">
      <div>{hero.eyebrow && <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#51D4D6]">{hero.eyebrow}</p>}{hero.title && <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,5.4vw,4.75rem)] font-bold leading-[1.03] tracking-[-0.045em] text-white/90">{hero.title}</h1>}{hero.subtitle && <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">{hero.subtitle}</p>}{hero.ctas?.length > 0 && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{hero.ctas.map((cta) => <LinkButton key={`${cta.label}-${cta.url}`} link={cta} className={`gap-button min-h-11 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] ${cta.variant === 'light' ? 'gap-button-light' : 'gap-button-primary'}`} />)}</div>}</div>
      {highlights.length > 0 && <aside className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1e1e1e] p-6 shadow-2xl sm:p-8" aria-label={hero.eyebrow || undefined}><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#51D4D6]/10 blur-3xl" aria-hidden="true" /><ul className="relative space-y-5">{highlights.map((item) => <li key={item.id || item.value} className="flex items-start gap-3"><CheckCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[#51D4D6]" size={21} /><span className="font-semibold leading-6 text-gray-100">{item.value}</span></li>)}</ul></aside>}
    </div></div>
  </header>;
}

function ContentSection({ section, tone = 'dark', ordered = false }) {
  const items = cards(section); if (!section || (!section.title && !section.subtitle && !items.length)) return null;
  const light = tone === 'light'; const headingId = `${section.sectionId || 'interview'}-heading`;
  return <section id={section.sectionId || undefined} aria-labelledby={section.title ? headingId : undefined} className={`${light ? 'bg-[#1e1e1e]' : 'bg-[#0a0a0a]'} px-4 py-16 text-white sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24`}><div className="container">
    <header className="mx-auto max-w-3xl text-center">{section.eyebrow && <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#51D4D6]">{section.eyebrow}</p>}{section.title && <h2 id={headingId} className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.035em] text-white/90">{section.title}</h2>}{section.subtitle && <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg">{section.subtitle}</p>}</header>
    {items.length > 0 && <div className={`mt-10 grid items-stretch gap-5 sm:mt-12 sm:grid-cols-2 ${items.length > 2 ? 'xl:grid-cols-4' : 'lg:grid-cols-2'}`}>{items.map((item, index) => <article key={item.id || `${item.title}-${index}`} className={`relative min-w-0 rounded-2xl border p-5 sm:p-6 ${light ? 'border-white/10 bg-[#0a0a0a]' : 'border-white/10 bg-[#1e1e1e]'}`}>
      {ordered && <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#51D4D6] text-sm font-bold text-[#0a0a0a]" aria-hidden="true">{index + 1}</span>}{!ordered && item.icon && <span aria-hidden="true" className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#51D4D6]/10 text-[#51D4D6]"><CMSIcon name={item.icon} size={22} className="text-[#51D4D6]" /></span>}{item.title && <h3 className="break-words text-xl font-bold leading-7 text-white/90">{item.title}</h3>}{item.label && <p className="mt-2 font-semibold text-[#51D4D6]">{item.label}</p>}{item.description && <p className="mt-3 break-words text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">{item.description}</p>}{item.link?.url && <div className="mt-5"><LinkButton link={item.link} className="inline-flex min-h-11 items-center font-semibold text-[#51D4D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6]" /></div>}
    </article>)}</div>}
    {(section.ctaText || section.cta) && <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 text-center">{section.ctaText && <p className="text-base leading-7 text-gray-300 sm:text-lg">{section.ctaText}</p>}<LinkButton link={section.cta} /></div>}
  </div></section>;
}

export default function InterviewPreparationPage({ page }) {
  if (!page) return null;
  return <><StructuredData page={page} /><InterviewHero hero={page.hero} breadcrumbs={page.breadcrumbs} /><ContentSection section={page.benefits} tone="light" /><ContentSection section={page.process} ordered /><ContentSection section={page.services} tone="light" /><InterviewPricing config={page.bookingConfig} /><CvFaqSection section={page.faqSection} sectionId="interview-faqs" /><CvClosingCta section={page.closingCta} /></>;
}
