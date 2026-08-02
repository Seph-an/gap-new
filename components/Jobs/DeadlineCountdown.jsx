'use client';

import { useEffect, useState } from 'react';
import { Clock3 } from 'lucide-react';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getDeadlineState(deadline) {
  const remaining = new Date(deadline).getTime() - Date.now();
  if (!Number.isFinite(remaining) || remaining <= 0) return { label: 'Closed', tone: 'text-red-400 bg-red-500/10 border-red-500/30' };

  const days = Math.floor(remaining / DAY);
  const hours = Math.floor((remaining % DAY) / HOUR);
  const minutes = Math.max(0, Math.floor((remaining % HOUR) / MINUTE));
  const parts = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  if (days > 0 || hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);

  let tone = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (remaining <= DAY) tone = 'text-red-400 bg-red-500/10 border-red-500/30';
  else if (remaining <= 3 * DAY) tone = 'text-orange-400 bg-orange-500/10 border-orange-500/30';
  else if (remaining <= 7 * DAY) tone = 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30';
  return { label: `${parts.join(' ')} remaining`, tone };
}

export default function DeadlineCountdown({ deadline, compact = false }) {
  const [deadlineState, setDeadlineState] = useState(null);

  useEffect(() => {
    if (!deadline) return undefined;
    const update = () => setDeadlineState(getDeadlineState(deadline));
    update();
    const timer = window.setInterval(update, MINUTE);
    return () => window.clearInterval(timer);
  }, [deadline]);

  const sizeClasses = compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm';
  if (!deadline) {
    return <div className={`inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 font-semibold text-gray-400 ${sizeClasses}`}><Clock3 size={compact ? 15 : 18} aria-hidden="true" /><span>No deadline specified</span></div>;
  }

  const state = deadlineState || { label: 'Calculating time remaining…', tone: 'text-gray-400 bg-white/5 border-white/10' };
  const formattedDeadline = new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(deadline));
  return <div className={`inline-flex items-center gap-2 rounded-lg border font-semibold ${state.tone} ${sizeClasses}`} title={`Application deadline: ${formattedDeadline}`} aria-label={`Application deadline: ${formattedDeadline}. ${state.label}`}><Clock3 size={compact ? 15 : 18} aria-hidden="true" /><span>{state.label}</span></div>;
}
