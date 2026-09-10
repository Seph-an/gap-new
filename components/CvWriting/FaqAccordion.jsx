'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import CaseStudyRichText from '@/components/CaseStudies/CaseStudyRichText';

export default function FaqAccordion({ items }) {
  const initiallyOpen = items.find((item) => item.defaultOpen)?.id ?? null;
  const [openId, setOpenId] = useState(initiallyOpen);

  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-xl">
      {items.map((item, index) => {
        const itemId = item.id ?? item.anchor ?? index;
        const open = openId === itemId;
        const triggerId = `cv-faq-trigger-${itemId}`;
        const panelId = `cv-faq-panel-${itemId}`;
        return (
          <div id={item.anchor || undefined} key={itemId} className="scroll-mt-28">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : itemId)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-semibold leading-6 text-white transition-colors hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#51D4D6] sm:px-6 sm:py-5 sm:text-lg motion-reduce:transition-none"
              >
                <span>{item.question}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#51D4D6]/30 bg-[#51D4D6]/10 text-[#51D4D6]" aria-hidden="true">
                  {open ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-5 pr-14 sm:px-6 sm:pb-6 sm:pr-20">
                  <CaseStudyRichText>{item.answer}</CaseStudyRichText>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
