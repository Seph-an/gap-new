'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, LockKeyhole } from 'lucide-react';

const fieldClass = 'mt-2 min-h-12 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#51D4D6] focus:ring-2 focus:ring-[#51D4D6]/20 motion-reduce:transition-none';

export default function CvOrderForm({ content, selectedPackage, formattedPrice }) {
  const router = useRouter();
  const key = useRef(globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`);
  const [state, setState] = useState({ submitting: false, result: null, error: '', fields: {} });

  useEffect(() => {
    if (!state.result?.reference || !state.result?.status_token || state.result?.brief_token) return undefined;
    const poll = async () => {
      const response = await fetch(`/api/cv-orders/${state.result.reference}`, { cache: 'no-store', headers: { 'x-status-token': state.result.status_token } });
      if (!response.ok) return;
      const payload = await response.json();
      const order = payload.data || payload;
      if (order.brief_token) router.replace(`/cv-writing/order/${order.reference}/brief#token=${encodeURIComponent(order.brief_token)}`);
      else if (order.payment_status === 'failed') setState((current) => ({ ...current, result: order }));
    };
    poll();
    const timer = window.setInterval(poll, 3000);
    return () => window.clearInterval(timer);
  }, [router, state.result]);

  async function submit(event) {
    event.preventDefault();
    setState({ submitting: true, result: null, error: '', fields: {} });
    const body = new FormData(event.currentTarget);
    body.set('package_slug', selectedPackage.slug);
    body.set('idempotency_key', key.current);
    try {
      const response = await fetch('/api/cv-orders', { method: 'POST', body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setState({ submitting: false, result: null, error: payload.message || content.errorMessage, fields: payload.errors || {} });
        return;
      }
      setState({ submitting: false, result: payload.data || payload, error: '', fields: {} });
    } catch { setState({ submitting: false, result: null, error: content.errorMessage, fields: {} }); }
  }

  if (state.result) return (
    <section className="rounded-2xl border border-[#51D4D6]/30 bg-[#151515] p-6 text-center sm:p-10" aria-live="polite">
      <CheckCircle2 className="mx-auto text-[#51D4D6]" size={48} aria-hidden="true" />
      <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">{state.result.payment_status === 'failed' ? content.paymentFailedHeading : content.paymentPendingHeading}</h2>
      {state.result.payment_status !== 'failed' && content.paymentPendingDescription && <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-400">{content.paymentPendingDescription}</p>}
      {content.referenceLabel && state.result.reference && <p className="mt-6 text-sm font-semibold text-gray-300">{content.referenceLabel}: <span className="break-all text-[#51D4D6]">{state.result.reference}</span></p>}
    </section>
  );

  const FieldError = ({ name }) => state.fields?.[name]?.[0] ? <p className="mt-1 text-sm text-red-300">{state.fields[name][0]}</p> : null;
  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-5 shadow-xl sm:p-7 lg:p-9">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        {content.formHeading && <h2 className="text-2xl font-bold text-white">{content.formHeading}</h2>}
        <div className="min-w-0 sm:max-w-[50%] sm:text-right">
          {content.packageHeading && <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#51D4D6]">{content.packageHeading}</p>}
          <p className="mt-1 flex min-w-0 flex-wrap items-baseline gap-x-2 sm:justify-end">
            <span className="break-words font-bold text-white">{selectedPackage.name}</span>
            <span className="shrink-0 text-lg font-extrabold text-[#51D4D6]">{formattedPrice}</span>
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-gray-200">{content.fullNameLabel}<input className={fieldClass} name="full_name" autoComplete="name" required /><FieldError name="full_name" /></label>
        <label className="text-sm font-semibold text-gray-200">{content.emailLabel}<input className={fieldClass} name="email" type="email" autoComplete="email" required /><FieldError name="email" /></label>
        <label className="text-sm font-semibold text-gray-200">{content.phoneLabel}<input className={fieldClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" required /><FieldError name="phone" /></label>
      </div>
      {content.privacyMessage && <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-gray-400"><LockKeyhole className="mt-0.5 shrink-0 text-[#51D4D6]" size={17} aria-hidden="true" />{content.privacyMessage}</p>}
      {state.error && <p className="mt-5 rounded-lg border border-red-400/25 bg-red-400/10 p-3 text-sm text-red-200" role="alert">{state.error}</p>}
      <button disabled={state.submitting} className="mt-6 min-h-12 w-full rounded-lg bg-[#51D4D6] px-5 py-3 font-bold text-[#0a0a0a] transition hover:bg-[#3FAFB1] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e1e] motion-reduce:transition-none">{state.submitting ? content.submittingLabel : content.payButtonLabel}</button>
    </form>
  );
}
