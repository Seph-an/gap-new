import CMSHero from '@/components/CMS/Hero';
import LinkButton from '@/components/CMS/LinkButton';
import CaseStudyFeed from './CaseStudyFeed';

export default function CaseStudiesPage({ page, initialResult }) {
  return <><CMSHero hero={page.hero} /><section id="case-studies" className="section-light"><div className="container"><div className="mx-auto max-w-4xl text-center">{page.introEyebrow && <p className="font-semibold uppercase tracking-[0.2em] text-[#51D4D6]">{page.introEyebrow}</p>}<h2 className="gap-title mt-3">{page.introTitle}</h2>{page.introText && <p className="gap-subtitle mt-5">{page.introText}</p>}</div><CaseStudyFeed initialResult={initialResult} settings={page.filterSettings} /></div></section>{page.cta && <section className="section-dark"><div className="container text-center"><h2 className="gap-title">{page.cta.title}</h2>{page.cta.subtitle && <p className="gap-subtitle mx-auto mt-5 max-w-3xl">{page.cta.subtitle}</p>}<div className="mt-8"><LinkButton link={page.cta.cta} /></div></div></section>}</>;
}
