'use client';

import { useRef, useState } from 'react';
import { CheckCircle, FileText, X } from 'lucide-react';
import { validateApplication } from '@/lib/job-application';
import { getJobDeadlineState } from '@/lib/job-deadline';
import useJobDeadline from './useJobDeadline';

const field = 'mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-[#0a0a0a] px-3 py-2.5 text-white outline-none focus:border-[#51D4D6] focus:ring-2 focus:ring-[#51D4D6]/30';

export default function JobApplicationDialog({ jobId, jobName, deadline }) {
  const deadlineState = useJobDeadline(deadline);
  const dialog = useRef(null);
  const submissionKey = useRef(null);
  const inFlight = useRef(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);

  function open() {
    if (getJobDeadlineState(deadline).closed) return;
    submissionKey.current ||= crypto.randomUUID();
    dialog.current?.showModal();
  }

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    if (getJobDeadlineState(deadline).closed) {
      setError('Applications are closed for this job.');
      return;
    }
    setError('');
    setFieldErrors({});
    const input = new FormData(event.currentTarget);
    input.set('job_id', String(jobId));
    input.set('idempotency_key', submissionKey.current);
    const { data, errors } = validateApplication(input);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setError('Please correct the fields listed below.');
      return;
    }
    inFlight.current = true;
    setSubmitting(true);
    try {
      const response = await fetch('/api/job-applications', { method: 'POST', body: data, signal: AbortSignal.timeout(45000) });
      const body = await response.json().catch(() => ({}));
      if (response.ok && body.data?.reference) setReceipt(body.data);
      else {
        setFieldErrors(body.errors || {});
        setError(body.message || 'We could not submit your application. Please try again.');
      }
    } catch {
      setError('We could not confirm your application. Please try again; retrying will not create a second application.');
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return <>
    <button type="button" disabled={deadlineState.closed} onClick={open} className="shrink-0 rounded-lg bg-[#51D4D6] px-7 py-3.5 text-center font-semibold text-[#0a0a0a] hover:bg-[#3FAFB1] disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-300">{deadlineState.status === 'closed' ? 'Applications closed' : deadlineState.status === 'unavailable' ? 'Applications unavailable' : 'Apply for this job'}</button>
    <dialog aria-labelledby="job-application-title" ref={dialog} onClose={() => { setError(''); }} className="m-auto w-[min(94vw,720px)] rounded-2xl border border-white/10 bg-[#1e1e1e] p-0 text-white shadow-2xl backdrop:bg-black/80">
      <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <button type="button" onClick={() => dialog.current?.close()} aria-label="Close application form" className="float-right rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"><X size={22} /></button>
        {receipt ? <div className="py-10 text-center"><CheckCircle className="mx-auto text-[#51D4D6]" size={52} /><h2 id="job-application-title" className="mt-5 text-2xl font-bold">Application received</h2><p className="mt-3 text-gray-300">Your application for {jobName} has been sent to our recruitment team.</p><p className="mt-4 text-sm text-gray-400">Reference: <span className="font-semibold text-[#51D4D6]">{receipt.reference}</span></p></div> : <>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#51D4D6]">Job application</p>
          <h2 id="job-application-title" className="mt-2 pr-10 text-2xl font-bold">Apply for {jobName}</h2>
          <p className="mt-2 text-sm text-gray-400">Your details and CV are shared only with the recruitment team handling this role.</p>
          {deadlineState.closed && <p role="status" className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-red-200">Applications are closed for this job.</p>}
          <form aria-busy={submitting} onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
            <fieldset disabled={submitting || deadlineState.closed} className="contents">
            <Label text="Full name"><input name="full_name" required maxLength={150} autoComplete="name" className={field} /></Label>
            <Label text="Email address"><input name="email" type="email" maxLength={255} required autoComplete="email" className={field} /></Label>
            <Label text="Phone number"><input name="phone" type="tel" maxLength={50} required autoComplete="tel" className={field} /></Label>
            <Label text="Current location (optional)"><input name="location" maxLength={180} autoComplete="address-level2" className={field} /></Label>
            <Label text="LinkedIn profile (optional)" wide><input name="linkedin_url" type="url" maxLength={255} placeholder="https://www.linkedin.com/in/..." className={field} /></Label>
            <Label text="Resume (PDF or DOCX, maximum 5 MB)" wide><span className="relative block"><FileText className="pointer-events-none absolute left-3 top-5 text-[#51D4D6]" size={18} /><input name="cv" type="file" required accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className={`${field} pl-10 file:mr-3 file:rounded file:border-0 file:bg-[#51D4D6] file:px-2 file:py-1 file:font-semibold`} /></span></Label>
            <Label text="Cover note (optional)" wide><textarea name="cover_letter" maxLength={5000} rows={5} className={field} /></Label>
            {error && <div role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200 sm:col-span-2">{error}{Object.keys(fieldErrors).length > 0 && <ul className="mt-2 list-disc pl-5">{Object.entries(fieldErrors).map(([name, messages]) => <li key={name}>{name.replaceAll('_', ' ')}: {messages.join(' ')}</li>)}</ul>}</div>}
            <button disabled={submitting || deadlineState.closed} className="min-h-12 rounded-lg bg-[#51D4D6] px-6 py-3 font-bold text-[#0a0a0a] disabled:opacity-50 sm:col-span-2">{submitting ? 'Submitting…' : 'Submit application'}</button>
            </fieldset>
          </form>
        </>}
      </div>
    </dialog>
  </>;
}

function Label({ text, wide = false, children }) {
  return <label className={`text-sm font-semibold text-gray-200 ${wide ? 'sm:col-span-2' : ''}`}>{text}{children}</label>;
}
