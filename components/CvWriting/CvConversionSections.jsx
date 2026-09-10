import FaqAccordion from './FaqAccordion';
import CtaAction from './CtaAction';
import CmsIcon from './CmsIcon';

function activeSorted(items = []) {
  return items.filter((item) => item?.active !== false && item?.visible !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export function CvFaqSection({ section, sectionId = 'cv-faqs' }) {
  const faqs = activeSorted(section?.faqs).filter((item) => item.question?.trim() && item.answer?.trim());
  if (section?.enabled === false || !faqs.length) return null;
  const footerAction = section.footerCta?.label && section.footerCta.visible !== false
    && (section.footerCta.destination || (section.footerCta.actionType === 'scroll_to_section' && section.footerCta.target))
    ? section.footerCta : null;

  return (
    <section id={sectionId} aria-labelledby={section.heading ? 'cv-faq-heading' : undefined} className="bg-[#0a0a0a] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-[minmax(240px,0.55fr)_minmax(0,1fr)] lg:gap-16">
        <header className="lg:sticky lg:top-28 lg:self-start">

          {section.heading && <h2 id="cv-faq-heading" className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.035em] text-white/90">{section.heading}</h2>}
          {section.description && <p className="mt-4 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">{section.description}</p>}
        </header>
        <div className="min-w-0">
          <FaqAccordion items={faqs} />
          {footerAction && <div className="mt-6"><CtaAction action={footerAction} secondary /></div>}
        </div>
      </div>
    </section>
  );
}

export function CvClosingCta({ section }) {
  if (section?.enabled === false || (!section?.heading && !section?.description && !section?.primaryCta?.label)) return null;
  const trustItems = activeSorted(section.trustItems);
  const showPayment = section.paymentMessage || section.paymentProviderLabel;
  return (
    <section aria-labelledby={section.heading ? 'cv-closing-cta-heading' : undefined} className="bg-[#0a0a0a] px-4 pb-16 text-white sm:px-6 sm:pb-20 md:px-12 lg:px-20 lg:pb-24">
      <div className="container relative overflow-hidden rounded-3xl border border-[#51D4D6]/25 bg-[#1e1e1e] px-5 py-10 shadow-2xl sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(81,212,214,0.16),transparent_32%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl text-center">
          {section.heading && <h2 id="cv-closing-cta-heading" className="mt-3 text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-tight tracking-[-0.04em] text-white/90">{section.heading}</h2>}
          {section.description && <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">{section.description}</p>}
          {showPayment && <p className="mt-5 text-sm font-semibold text-gray-300">{section.paymentProviderLabel && <span className="text-[#51D4D6]">{section.paymentProviderLabel}</span>}{section.paymentProviderLabel && section.paymentMessage ? ' · ' : ''}{section.paymentMessage}</p>}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaAction action={section.primaryCta} />
            <CtaAction action={section.secondaryCta} secondary />
          </div>
        </div>
        {trustItems.length > 0 && <ul className="relative mt-10 grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3">{trustItems.map((item) => <li key={item.id || item.label} className="flex min-w-0 gap-3 rounded-xl bg-black/15 p-4 text-left"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#51D4D6]/10 text-[#51D4D6]"><CmsIcon name={item.icon} /></span><span className="min-w-0"><span className="block font-bold text-white/90">{item.label}</span>{item.supportingText && <span className="mt-1 block text-sm leading-6 text-gray-400">{item.supportingText}</span>}</span></li>)}</ul>}
      </div>
    </section>
  );
}
