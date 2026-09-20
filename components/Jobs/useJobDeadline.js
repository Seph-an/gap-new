'use client';

import { useEffect, useState } from 'react';
import { getJobDeadlineState } from '@/lib/job-deadline';

export default function useJobDeadline(deadline) {
  const [state, setState] = useState(null);
  useEffect(() => {
    const update = () => setState({ deadline, ...getJobDeadlineState(deadline) });
    update();
    const timer = window.setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('focus', update);
    };
  }, [deadline]);
  return state?.deadline === deadline ? state : { closed: true, status: 'loading', label: 'Checking deadline…', tone: 'text-gray-400 bg-white/5 border-white/10' };
}
