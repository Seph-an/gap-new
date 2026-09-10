'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MapPin, Video } from 'lucide-react';

export default function InterviewPricing({ config }) {
  const offers = useMemo(() => (config?.offers || []).filter((offer) => offer.visible !== false), [config?.offers]);
  const availableModes = [...new Set(offers.map((offer) => offer.mode))];
  const [mode, setMode] = useState(availableModes.includes('online') ? 'online' : availableModes[0]);
  const visibleOffers = offers.filter((offer) => offer.mode === mode).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  if (config?.enabled === false || !offers.length) return null;

  const tabs = [
    { value: 'online', label: config.onlineTabLabel, icon: Video },
    { value: 'physical', label: config.physicalTabLabel, icon: MapPin },
  ].filter((tab) => availableModes.includes(tab.value) && tab.label);

  return (
    <section id="interview-pricing" className="bg-[#0a0a0a] px-4 py-16 text-white sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <div className="container">
        <header className="mx-auto max-w-3xl text-center">
          {config.eyebrow && <p className="text-sm font-bold uppercase tracking-[.2em] text-[#51D4D6]">{config.eyebrow}</p>}
          {config.heading && <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-.035em] text-white/90">{config.heading}</h2>}
          {config.description && <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg">{config.description}</p>}
        </header>

        {tabs.length > 1 && (
          <div className="mx-auto mt-8 grid max-w-md grid-cols-2 rounded-xl border border-white/10 bg-[#171717] p-1.5" aria-label={config.modeLabel}>
            {tabs.map(({ value, label, icon: Icon }) => (
              <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] ${mode === value ? 'bg-[#51D4D6] text-[#0a0a0a]' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                <Icon aria-hidden="true" size={18} />{label}
              </button>
            ))}
          </div>
        )}

        <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visibleOffers.map((offer) => (
            <article key={offer.code} className={`relative flex flex-col rounded-2xl border p-6 ${offer.badge ? 'border-[#51D4D6]/60 bg-[#202626]' : 'border-white/10 bg-[#1e1e1e]'}`}>
              {offer.badge && <p className="mb-4 w-fit rounded-full bg-[#51D4D6] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">{offer.badge}</p>}
              <p className="text-sm font-bold uppercase tracking-wider text-[#51D4D6]">{offer.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{offer.currency} {Number(offer.price).toLocaleString()}</p>
              {offer.durationLabel && <p className="mt-2 text-sm font-semibold text-gray-300">{offer.durationLabel}</p>}
              {offer.description && <p className="mt-5 flex-1 leading-7 text-gray-300">{offer.description}</p>}
              {offer.locationNote && <p className="mt-4 flex gap-2 text-sm leading-6 text-gray-400"><CheckCircle aria-hidden="true" className="mt-1 shrink-0 text-[#51D4D6]" size={16} />{offer.locationNote}</p>}
              {config.pricingCtaLabel && <Link href={`/interview-preparation/book?mode=${offer.mode}&offer=${offer.code}`} className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#51D4D6] px-5 py-3 text-center font-bold text-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{config.pricingCtaLabel}<ArrowRight aria-hidden="true" className="ml-2" size={18} /></Link>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
