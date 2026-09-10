'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaAction({ action, secondary = false }) {
  if (!action?.label || action.visible === false) return null;
  const classes = secondary
    ? 'inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:border-[#51D4D6] hover:text-[#51D4D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] motion-reduce:transition-none'
    : 'inline-flex min-h-11 items-center justify-center rounded-lg bg-[#51D4D6] px-6 py-3 font-bold text-[#0a0a0a] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] motion-reduce:transition-none';
  const content = <><span>{action.label}</span><ArrowRight aria-hidden="true" className="ml-2" size={19} /></>;
  const analytics = action.analyticsId ? { 'data-analytics-id': action.analyticsId } : {};

  if (action.actionType === 'scroll_to_section' && action.target) {
    return <button type="button" className={classes} {...analytics} onClick={() => document.getElementById(action.target)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })}>{content}</button>;
  }
  if (!action.destination) return null;
  if (action.external || action.actionType === 'external_link' || /^https?:\/\//.test(action.destination)) {
    return <a href={action.destination} className={classes} target="_blank" rel="noopener noreferrer" {...analytics}>{content}</a>;
  }
  return <Link href={action.destination} className={classes} {...analytics}>{content}</Link>;
}
