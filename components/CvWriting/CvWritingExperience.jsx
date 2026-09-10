'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Clock } from 'lucide-react';
import CmsIcon from './CmsIcon';
import Breadcrumbs from '@/components/Common/Breadcrumbs';

const careerAccent = {
  green: 'border-emerald-400/30 bg-emerald-400/5',
  purple: 'border-fuchsia-400/30 bg-fuchsia-400/5',
  blue: 'border-sky-400/30 bg-sky-400/5',
  gold: 'border-amber-400/30 bg-amber-400/5',
  default: 'border-white/10 bg-white/[0.03]',
};

const careerIconAccent = {
  green: 'text-emerald-300',
  purple: 'text-fuchsia-300',
  blue: 'text-sky-300',
  gold: 'text-amber-300',
  default: 'text-[#51D4D6]',
};

const packageAccent = {
  green: { border: 'border-emerald-400/30', icon: 'bg-emerald-400/10 text-emerald-300' },
  purple: { border: 'border-fuchsia-400/30', icon: 'bg-fuchsia-400/10 text-fuchsia-300' },
  blue: { border: 'border-sky-400/30', icon: 'bg-sky-400/10 text-sky-300' },
  gold: { border: 'border-amber-400/30', icon: 'bg-amber-400/10 text-amber-300' },
  highlighted: { border: 'border-[#51D4D6]', icon: 'bg-[#51D4D6]/10 text-[#51D4D6]' },
  default: { border: 'border-white/10', icon: 'bg-white/5 text-[#51D4D6]' },
};

function activeSorted(items = []) {
  return (items || [])
    .filter((item) => item.visible !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

function resolveDefaultCareer(levels, requestedSlug) {
  return levels.find((level) => level.slug === requestedSlug)
    || levels.find((level) => level.defaultSelected)
    || levels[0]
    || null;
}

export default function CvWritingExperience({ page, careerLevels = [], packages = [], initialCareerLevel }) {
  const levels = useMemo(
    () => careerLevels.filter((level) => level.active !== false).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    [careerLevels],
  );
  const [selectedSlug, setSelectedSlug] = useState(() => resolveDefaultCareer(levels, initialCareerLevel)?.slug || '');
  const selectedLevel = levels.find((level) => level.slug === selectedSlug) || levels[0];
  const visiblePackages = useMemo(
    () => packages
      .filter((item) => item.active !== false && item.careerLevels?.some((level) => level.slug === selectedLevel?.slug))
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    [packages, selectedLevel],
  );

  function selectCareer(slug) {
    setSelectedSlug(slug);
    const url = new URL(window.location.href);
    url.searchParams.set('careerLevel', slug);
    window.history.replaceState({}, '', url);
  }

  return (
    <>
      {page.hero && page.hero.enabled !== false && (
        <CvHero hero={page.hero} breadcrumbs={page.breadcrumbs} />
      )}
      {page.pricingSection && page.pricingSection.enabled !== false && (
        <CvPricingSection
          section={page.pricingSection}
          notice={page.pricingNotice}
          packages={visiblePackages}
          selectedLevel={selectedLevel}
          levels={levels}
          selectorInstruction={page.hero?.careerInstruction}
          helpText={page.hero?.helpText}
          helpLink={page.hero?.helpLink}
          onSelect={selectCareer}
        />
      )}
    </>
  );
}

function CvHero({ hero, breadcrumbs }) {
  const benefits = activeSorted(hero.benefits);
  const trustItems = activeSorted(hero.trustItems);
  const processSteps = activeSorted(hero.processSteps);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pb-14 pt-36 text-white sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_28%,rgba(81,212,214,0.12),transparent_28%)]" aria-hidden="true" />
      <div className="container relative mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(520px,0.9fr)] xl:gap-14">
          <div className="pt-1 lg:pt-4">
            {hero.eyebrow && <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#51D4D6]">{hero.eyebrow}</p>}
            {hero.heading && <h1 className="max-w-3xl text-[clamp(2.5rem,5.3vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.045em] text-white/90">{hero.heading}</h1>}
            {hero.description && <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">{hero.description}</p>}
            {benefits.length > 0 && (
              <ul className="mt-7 grid max-w-2xl grid-cols-1 gap-3 min-[360px]:grid-cols-2" aria-label={hero.eyebrow || undefined}>
                {benefits.map((benefit) => (
                  <li key={benefit.id || benefit.label} className="flex min-w-0 items-center gap-2.5 text-sm font-semibold text-gray-200 sm:text-base">
                    <CmsIcon name={benefit.icon} className="shrink-0 text-[#51D4D6]" />
                    <span className="min-w-0 break-words">{benefit.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ProcessPanel title={hero.processTitle} steps={processSteps} />
        </div>
        {trustItems.length > 0 && <TrustStrip items={trustItems} />}
      </div>
    </section>
  );
}

function ProcessPanel({ title, steps }) {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] p-5 text-white shadow-2xl sm:p-7 lg:p-8">
      <ProcessPanelBackground />
      {title && <h2 className="relative z-10 text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>}
      {steps.length > 0 && (
        <ol className="relative z-10 mt-6 grid gap-4 sm:grid-cols-3 sm:gap-3">
          {steps.map((step, index) => (
            <li key={step.id || step.stepNumber} className="relative flex gap-3 sm:block">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#51D4D6]/10 text-[#51D4D6] ring-1 ring-[#51D4D6]/20">
                <CmsIcon name={step.icon} />
              </div>
              <div className="min-w-0 sm:mt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#51D4D6]">{step.stepNumber}</span>
                <p className="mt-1 text-sm font-semibold leading-5 text-white">{step.title}</p>
                {step.description && <p className="mt-1 text-xs leading-5 text-slate-300">{step.description}</p>}
              </div>
              {index < steps.length - 1 && <ArrowRight aria-hidden="true" className="absolute -right-1 top-3 hidden text-white/25 sm:block" size={17} />}
              {index < steps.length - 1 && <ArrowDown aria-hidden="true" className="absolute -bottom-3 left-3.5 text-white/25 sm:hidden" size={15} />}
            </li>
          ))}
        </ol>
      )}
      <ProcessIllustration />
    </aside>
  );
}

function ProcessPanelBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#51D4D6]/[0.07] blur-3xl" />
      <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-[#51D4D6]/[0.045] blur-3xl" />
      <svg viewBox="0 0 720 520" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d="M-72 112C86 19 191 188 347 99C504 10 602 128 782 28"
          stroke="#51D4D6"
          strokeOpacity=".11"
          strokeWidth="2"
        />
        <path
          d="M-91 152C74 60 196 222 361 139C522 58 625 162 793 76"
          stroke="#51D4D6"
          strokeOpacity=".055"
          strokeWidth="1.5"
        />
        <path
          d="M-56 438C86 327 223 489 372 385C510 289 625 416 775 309"
          stroke="#51D4D6"
          strokeOpacity=".09"
          strokeWidth="2"
          strokeDasharray="8 11"
        />
        <path
          d="M486 -30C429 86 563 139 500 247C443 345 546 401 478 550"
          stroke="white"
          strokeOpacity=".035"
          strokeWidth="26"
        />
        <circle cx="126" cy="84" r="3" fill="#51D4D6" fillOpacity=".3" />
        <circle cx="347" cy="99" r="3" fill="#51D4D6" fillOpacity=".24" />
        <circle cx="604" cy="102" r="3" fill="#51D4D6" fillOpacity=".2" />
      </svg>
    </div>
  );
}

function ProcessIllustration() {
  return (
    <div className="relative z-10 mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(81,212,214,0.12),transparent_45%)]" aria-hidden="true" />
      <svg
        aria-hidden="true"
        viewBox="0 0 620 190"
        className="relative h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M68 144C151 83 219 176 309 112C392 53 452 143 554 67" stroke="#51D4D6" strokeOpacity=".22" strokeWidth="2" strokeDasharray="7 9" />
        <circle cx="68" cy="144" r="6" fill="#51D4D6" />
        <circle cx="309" cy="112" r="6" fill="#51D4D6" />
        <circle cx="554" cy="67" r="6" fill="#51D4D6" />

        <g transform="translate(88 42)">
          <rect width="106" height="126" rx="13" fill="#151515" stroke="#51D4D6" strokeOpacity=".42" />
          <circle cx="28" cy="31" r="13" fill="#51D4D6" fillOpacity=".18" />
          <path d="M20 31C20 26.6 23.6 23 28 23C32.4 23 36 26.6 36 31C36 35.4 32.4 39 28 39C23.6 39 20 35.4 20 31Z" stroke="#51D4D6" strokeWidth="2" />
          <path d="M51 25H84M51 35H76M20 59H85M20 72H75M20 85H84M20 104H59" stroke="#D1D5DB" strokeOpacity=".58" strokeWidth="5" strokeLinecap="round" />
        </g>

        <g transform="translate(252 26)">
          <rect width="116" height="140" rx="16" fill="#1E1E1E" stroke="#51D4D6" strokeOpacity=".72" />
          <path d="M25 28H75" stroke="#51D4D6" strokeWidth="7" strokeLinecap="round" />
          <path d="M25 49H91M25 64H82M25 79H91M25 100H67M25 115H83" stroke="#E5E7EB" strokeOpacity=".65" strokeWidth="6" strokeLinecap="round" />
          <circle cx="94" cy="119" r="25" fill="#51D4D6" />
          <path d="M82 119L91 128L107 109" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g transform="translate(432 43)">
          <rect x="13" y="20" width="108" height="86" rx="14" fill="#151515" stroke="white" strokeOpacity=".15" />
          <path d="M21 29L67 68L113 29" stroke="#51D4D6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 96L54 65M114 96L81 65" stroke="white" strokeOpacity=".2" strokeWidth="3" />
          <path d="M86 15L98 3M105 24L122 19M80 0L82 17" stroke="#51D4D6" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function TrustStrip({ items }) {
  return (
    <ul className="mt-10 grid overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-md sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <li key={item.id || item.label} className="flex min-w-0 gap-3 border-b border-white/10 p-4 last:border-b-0 sm:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#51D4D6]/10 text-[#51D4D6]"><CmsIcon name={item.icon} /></span>
          <span className="min-w-0">
            <span className="block break-words text-sm font-bold text-white/90">{item.label}</span>
            {item.supportingText && <span className="mt-1 block text-xs leading-5 text-gray-400">{item.supportingText}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CvPricingSection({ section, notice, packages, selectedLevel, levels, selectorInstruction, helpText, helpLink, onSelect }) {
  const announcement = [section.resultsAnnouncement, selectedLevel?.name].filter(Boolean).join(': ');
  return (
    <section id="cv-packages" className="scroll-mt-24 bg-[#1e1e1e] px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <div className="container mx-auto">
        <header className="mx-auto max-w-3xl text-center">
          {section.eyebrow && <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#51D4D6]">{section.eyebrow}</p>}
          {section.heading && <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.035em] text-white/90">{section.heading}</h2>}
          {section.description && <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg">{section.description}</p>}
        </header>
        <CareerLevelSelector
          levels={levels}
          selectedSlug={selectedLevel?.slug}
          instruction={selectorInstruction}
          helpText={helpText}
          helpLink={helpLink}
          onSelect={onSelect}
        />
        <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
        {packages.length > 0 ? (
          <div id="cv-package-results" className="mt-8 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((item) => <PackageCard key={item.documentId || item.slug} item={item} careerAccentName={selectedLevel?.accent} />)}
          </div>
        ) : (
          section.emptyStateText && <p className="mx-auto mt-10 max-w-xl rounded-xl border border-white/10 bg-[#0a0a0a] p-8 text-center text-gray-400">{section.emptyStateText}</p>
        )}
        {notice?.enabled !== false && (notice?.leadingText || notice?.highlightedText || notice?.link?.label) && <CvOnlyPricingNotice notice={notice} />}
      </div>
    </section>
  );
}

function CareerLevelSelector({ levels, selectedSlug, instruction, helpText, helpLink, onSelect }) {
  if (!levels.length) return null;
  return (
    <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 shadow-md sm:p-6">
      {instruction && <p className="text-center text-base font-semibold text-white/90 sm:text-lg">{instruction}</p>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label={instruction || undefined}>
        {levels.map((level) => {
          const selected = level.slug === selectedSlug;
          const accent = careerAccent[level.accent] || careerAccent.default;
          const iconAccent = careerIconAccent[level.accent] || careerIconAccent.default;
          return (
            <button
              key={level.documentId || level.slug}
              type="button"
              aria-pressed={selected}
              aria-controls="cv-package-results"
              onClick={() => onSelect(level.slug)}
              className={`group relative min-h-28 cursor-pointer rounded-xl border p-4 text-left transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${accent} ${selected ? 'bg-white/[0.07] shadow-lg' : 'hover:-translate-y-0.5 hover:bg-white/5 motion-reduce:hover:translate-y-0'}`}
            >
              <span className="flex items-center gap-2 pr-7 font-bold text-white">
                <CmsIcon name={level.icon} className={`${iconAccent} transition group-hover:brightness-125`} />
                {level.name}
              </span>
              {selected && <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#51D4D6] text-[#0a0a0a]"><Check aria-hidden="true" size={15} strokeWidth={3} /></span>}
              {level.description && <span className="mt-2 block text-xs leading-5 text-gray-400">{level.description}</span>}
            </button>
          );
        })}
      </div>
      {(helpText || helpLink?.label) && (
        <p className="mt-5 text-center text-sm leading-6 text-gray-400">
          {helpText}{helpText && helpLink?.label ? ' ' : ''}
          {helpLink?.url && helpLink?.label && <CmsLink link={helpLink} className="font-bold text-[#51D4D6] underline decoration-[#51D4D6]/40 underline-offset-4 hover:text-white">{helpLink.label}</CmsLink>}
        </p>
      )}
    </div>
  );
}

function PackageCard({ item, careerAccentName }) {
  const visual = packageAccent[careerAccentName] || packageAccent.default;
  const features = activeSorted(item.features);
  const emphasized = item.recommended || item.featured;
  return (
    <article className={`relative flex min-w-0 flex-col rounded-xl border bg-[#0a0a0a] p-6 shadow-md transition motion-reduce:transition-none sm:p-7 ${visual.border} ${emphasized ? 'shadow-[0_0_22px_rgba(81,212,214,0.12)] md:-translate-y-2 motion-reduce:translate-y-0' : 'hover:-translate-y-1 hover:shadow-[0_0_14px_rgba(81,212,214,0.15)] motion-reduce:hover:translate-y-0'}`}>
      {item.badgeVisible && item.badgeText && <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-[#51D4D6] px-3 py-1 text-xs font-bold text-[#0a0a0a]">{item.badgeText}</span>}
      {item.icon && <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${visual.icon}`}><CmsIcon name={item.icon} size={23} /></span>}
      {item.name && <h3 className="mt-5 break-words text-xl font-bold tracking-tight text-white/90">{item.name}</h3>}
      {item.description && <p className="mt-3 text-sm leading-6 text-gray-400">{item.description}</p>}
      {features.length > 0 && (
        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li key={feature.id || feature.label} className={`flex gap-2.5 text-sm leading-5 ${feature.included === false ? 'text-gray-600' : 'text-gray-300'}`}>
              <Check aria-hidden="true" size={17} className={`mt-0.5 shrink-0 ${feature.included === false ? 'text-gray-700' : 'text-[#51D4D6]'}`} />
              <span>{feature.label}{feature.note && <span className="block text-xs text-gray-500">{feature.note}</span>}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-8">
        <Price item={item} />
        {item.deliveryTimeline && <p className="mt-3 flex items-start gap-2 text-sm text-gray-400"><Clock aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-[#51D4D6]" />{item.deliveryTimeline}</p>}
        {item.limitedAvailabilityMessage && <p className="mt-2 text-xs font-semibold text-amber-700">{item.limitedAvailabilityMessage}</p>}
        {item.cta?.label && <PackageAction item={item} visual={visual} />}
      </div>
    </article>
  );
}

function Price({ item }) {
  const numericPrice = Number(item.price);
  const formatted = Number.isFinite(numericPrice)
    ? new Intl.NumberFormat('en-KE', { style: 'currency', currency: item.currency || 'KES', maximumFractionDigits: 0 }).format(numericPrice)
    : null;
  const value = item.customQuote ? item.customPriceLabel : formatted;
  if (!value) return null;
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 text-white/90">
      {item.pricePrefix && <span className="text-sm font-semibold text-gray-500">{item.pricePrefix}</span>}
      <span className="text-3xl font-extrabold tracking-tight">{value}</span>
      {item.priceSuffix && <span className="text-sm font-semibold text-gray-500">{item.priceSuffix}</span>}
    </p>
  );
}

function PackageAction({ item, visual }) {
  const destination = item.cta.destination;
  const className = 'mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#51D4D6] px-4 py-3 text-center text-sm font-bold text-[#0a0a0a] transition hover:bg-[#3FAFB1] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]';
  if (!destination) return <button type="button" data-action={item.cta.actionType} data-package-id={item.documentId} className={className}>{item.cta.label}</button>;
  return <CmsLink link={{ url: destination, external: item.cta.external }} className={className} dataAction={item.cta.actionType} packageId={item.documentId}>{item.cta.label}</CmsLink>;
}

function CvOnlyPricingNotice({ notice }) {
  return (
    <aside className="mt-10 flex flex-col gap-5 rounded-xl border border-[#51D4D6]/20 bg-[#0a0a0a] p-6 text-white shadow-md sm:p-7 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-base leading-7 sm:text-lg">
        {notice.leadingText && <span>{notice.leadingText} </span>}
        {notice.highlightedText && <strong className="text-[#51D4D6]">{notice.highlightedText}</strong>}
      </p>
      {notice.link?.url && notice.link?.label && <CmsLink link={notice.link} className="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-lg bg-[#51D4D6] px-5 py-3 text-sm font-bold text-[#0a0a0a] transition hover:bg-[#3FAFB1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:w-auto">{notice.link.label}</CmsLink>}
    </aside>
  );
}

function CmsLink({ link, children, className, dataAction, packageId }) {
  if (!link?.url) return null;
  const props = {
    className,
    ...(dataAction ? { 'data-action': dataAction } : {}),
    ...(packageId ? { 'data-package-id': packageId } : {}),
  };
  if (link.external || link.url.startsWith('http')) return <a href={link.url} {...props}>{children}</a>;
  return <Link href={link.url} {...props}>{children}</Link>;
}
