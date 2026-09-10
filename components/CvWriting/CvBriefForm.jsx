'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, FileText } from 'lucide-react';

const fieldClass = 'mt-2 min-h-12 w-full rounded-lg border border-white/15 bg-[#151515] px-4 py-3 text-white outline-none transition focus:border-[#51D4D6] focus:ring-2 focus:ring-[#51D4D6]/20 motion-reduce:transition-none';

export default function CvBriefForm({ content, reference }) {
  const [token, setToken] = useState('');
  useEffect(() => { const value = new URLSearchParams(window.location.hash.slice(1)).get('token') || ''; setToken(value); if (value) window.history.replaceState(null, '', window.location.pathname); }, []);
  const [state, setState] = useState({ submitting: false, complete: false, error: '', fields: {} });
  async function submit(event) {
    event.preventDefault();
    setState({ submitting: true, complete: false, error: '', fields: {} });
    const body = new FormData(event.currentTarget); body.set('token', token || '');
    try {
      const response = await fetch(`/api/cv-orders/${reference}/brief`, { method: 'POST', body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) return setState({ submitting: false, complete: false, error: payload.message || content.errorMessage, fields: payload.errors || {} });
      setState({ submitting: false, complete: true, error: '', fields: {} });
    } catch { setState({ submitting: false, complete: false, error: content.errorMessage, fields: {} }); }
  }
  if (state.complete) return <section className="rounded-2xl border border-[#51D4D6]/30 bg-[#1e1e1e] p-7 text-center sm:p-10" aria-live="polite"><CheckCircle2 className="mx-auto text-[#51D4D6]" size={48} aria-hidden="true" />{content.briefSuccessHeading && <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">{content.briefSuccessHeading}</h2>}{content.briefSuccessDescription && <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-400">{content.briefSuccessDescription}</p>}</section>;
  const Error = ({ name }) => state.fields?.[name]?.[0] ? <p className="mt-1 text-sm text-red-300">{state.fields[name][0]}</p> : null;
  return <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-5 shadow-xl sm:p-7 lg:p-9">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold text-gray-200 sm:col-span-2">{content.targetRoleLabel}<input className={fieldClass} name="target_role" required /><Error name="target_role" /></label>
      <label className="text-sm font-semibold text-gray-200">{content.experienceLabel}<input className={fieldClass} name="experience_level" /><Error name="experience_level" /></label>
      <label className="text-sm font-semibold text-gray-200 sm:col-span-2">{content.jobDetailsLabel}<textarea className={`${fieldClass} min-h-32 resize-y`} name="job_details" /><Error name="job_details" /></label>
      <label className="text-sm font-semibold text-gray-200 sm:col-span-2">{content.cvLabel}<span className="mt-2 flex min-h-28 flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#151515] px-4 py-5 text-center"><FileText className="text-[#51D4D6]" aria-hidden="true" /><input className="mt-3 max-w-full text-sm text-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-[#51D4D6] file:px-3 file:py-2 file:font-bold file:text-[#0a0a0a]" name="cv" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /><span className="mt-2 text-xs font-normal text-gray-500">{content.fileHelpText}</span></span><Error name="cv" /></label>
      <label className="text-sm font-semibold text-gray-200 sm:col-span-2">{content.notesLabel}<textarea className={`${fieldClass} min-h-28 resize-y`} name="important_notes" /><Error name="important_notes" /></label>
    </div>
    {state.error && <p className="mt-5 rounded-lg border border-red-400/25 bg-red-400/10 p-3 text-sm text-red-200" role="alert">{state.error}</p>}
    <button disabled={state.submitting} className="mt-6 min-h-12 w-full rounded-lg bg-[#51D4D6] px-5 py-3 font-bold text-[#0a0a0a] hover:bg-[#3FAFB1] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{state.submitting ? content.briefSubmittingLabel : content.briefSubmitLabel}</button>
  </form>;
}
