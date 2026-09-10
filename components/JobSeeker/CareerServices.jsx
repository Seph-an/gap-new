'use client';

import { useId, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import LinkButton from '@/components/CMS/LinkButton';
import ServiceIllustration from './ServiceIllustration';

export default function CareerServices({ section }) {
  const [selected, setSelected] = useState(null);
  const uniqueId = useId();
  const cards = (section?.cards || []).filter((card) => card.title && card.description && card.link?.label && card.link?.url);
  if (!section?.title || !cards.length) return null;
  const sectionId = section.sectionId || uniqueId;
  const headingId = `${sectionId}-heading`;

  function selectService(index) {
    setSelected(index);
    if (window.matchMedia('(max-width: 767px)').matches) {
      document.getElementById(`${sectionId}-service-${index}`)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
    }
  }

  return <section id={sectionId} aria-labelledby={headingId} className="relative isolate scroll-mt-28 overflow-hidden bg-[#0a0a0a] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(81,212,214,0.08),transparent_60%)]" />
    <div className="container">
      <header className="mx-auto max-w-3xl text-center">
        {section.eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#51D4D6]">{section.eyebrow}</p>}
        <h2 id={headingId} className="mt-4 text-3xl font-bold leading-tight text-white/90 sm:text-4xl lg:text-5xl">{section.title}</h2>
        {section.subtitle && <p className="mt-5 text-base leading-8 text-gray-400 sm:text-lg">{section.subtitle}</p>}
      </header>
      {section.cardsTitle && <fieldset className="mx-auto mt-9 min-w-0 max-w-3xl text-center">
        <legend className="mx-auto mb-4 text-sm font-semibold text-gray-300">{section.cardsTitle}</legend>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">{cards.map((card, index) => card.label && <button key={card.id || index} type="button" aria-pressed={selected === index} aria-controls={`${sectionId}-service-${index}`} onClick={() => selectService(index)} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] motion-safe:transition-colors ${selected === index ? 'border-[#51D4D6] bg-[#51D4D6] text-[#0a0a0a]' : 'border-white/20 bg-[#1e1e1e] text-gray-200 hover:border-[#51D4D6]/70 hover:text-[#51D4D6]'}`}>
          {selected === index ? <Check aria-hidden="true" size={17} className="shrink-0" /> : <ArrowUpRight aria-hidden="true" size={17} className="shrink-0" />}{card.label}
        </button>)}</div>
      </fieldset>}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">{cards.map((card, index) => <article key={card.id || index} id={`${sectionId}-service-${index}`} aria-labelledby={`${sectionId}-title-${index}`} className={`group relative flex min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-2xl border bg-[#1e1e1e] focus-within:border-[#51D4D6] hover:border-[#51D4D6]/70 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-300 ${selected === index ? 'border-[#51D4D6] shadow-[0_0_32px_rgba(81,212,214,0.12)]' : 'border-white/10'}`}>
        <div className="relative border-b border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(81,212,214,0.07),transparent_70%)] px-4 pt-5 sm:px-8"><div className="mx-auto max-w-md"><ServiceIllustration icon={card.icon} /></div></div>
        <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-9">
          <h3 id={`${sectionId}-title-${index}`} className="text-2xl font-bold leading-tight text-white/90 lg:text-3xl">{card.title}</h3>
          <p className="mb-7 mt-4 text-base leading-7 text-gray-400">{card.description}</p>
          <LinkButton link={card.link} className="gap-button gap-button-primary mt-auto min-h-12 justify-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1e1e1e] sm:self-start" />
        </div>
      </article>)}</div>
      {(section.ctaText || section.cta) && <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#1e1e1e]/60 p-6 text-center sm:p-8 lg:flex-row lg:text-left">
        {section.ctaText && <p className="max-w-2xl text-base leading-7 text-gray-300">{section.ctaText}</p>}
        <LinkButton link={section.cta} className="gap-button gap-button-light min-h-12 shrink-0 justify-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]" />
      </div>}
    </div>
  </section>;
}
