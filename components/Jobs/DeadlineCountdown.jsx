'use client';

import { Clock3 } from 'lucide-react';
import { formatJobDeadline } from '@/lib/job-deadline';
import useJobDeadline from './useJobDeadline';

export default function DeadlineCountdown({ deadline, compact = false }) {
  const state = useJobDeadline(deadline);
  const formattedDeadline = formatJobDeadline(deadline);
  const sizeClasses = compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm';
  return <div>
    <div data-deadline-status={state.status} className={`inline-flex items-center gap-2 rounded-lg border font-semibold ${state.tone} ${sizeClasses}`} title={formattedDeadline ? `Application deadline: ${formattedDeadline}` : state.label}>
      <Clock3 size={compact ? 15 : 18} aria-hidden="true" /><span>{state.label}</span>
    </div>
    {!compact && formattedDeadline && <p className="mt-2 text-xs text-gray-400">Deadline: <time dateTime={deadline}>{formattedDeadline}</time></p>}
  </div>;
}
