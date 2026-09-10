'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, CheckCircle, Clock, FileText, MapPin, Video } from 'lucide-react';

const field = 'mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-[#0a0a0a] px-3 py-2.5 text-white outline-none focus:border-[#51D4D6] focus:ring-2 focus:ring-[#51D4D6]/30';

export default function InterviewBookingForm({ config, initialMode, initialOffer }) {
  const offers = useMemo(() => (config.offers || []).filter((offer) => offer.visible !== false), [config.offers]);
  const requestedOffer = offers.find((offer) => offer.code === initialOffer);
  const firstOffer = requestedOffer || offers.find((offer) => offer.mode === initialMode) || offers[0];
  const [mode, setMode] = useState(firstOffer?.mode || 'online');
  const [tier, setTier] = useState(firstOffer?.tierSlug || 'starter');
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const key = useRef(crypto.randomUUID());
  const pendingCv = useRef(null);
  const uploadStarted = useRef(false);

  useEffect(() => {
    fetch('/api/interview-bookings/availability?days=30')
      .then(async (response) => { if (!response.ok) throw Error(); return response.json(); })
      .then((json) => setSlots(json.data || []))
      .catch(() => setError(config.availabilityError))
      .finally(() => setLoading(false));
  }, [config.availabilityError]);

  useEffect(() => {
    if (!confirmation?.reference || !confirmation?.status_token || confirmation.status === 'confirmed') return undefined;
    const poll = async () => {
      const response = await fetch(`/api/interview-bookings/${confirmation.reference}`, { cache: 'no-store', headers: { 'x-status-token': confirmation.status_token } });
      if (!response.ok) return;
      const payload = await response.json();
      const booking = payload.data || payload;
      if (booking.payment_status === 'failed') { setError('Payment was not completed. Your CV was not uploaded.'); setConfirmation(null); return; }
      if (booking.upload_token && pendingCv.current && !uploadStarted.current) {
        uploadStarted.current = true;
        const cv = new FormData(); cv.set('token', booking.upload_token); cv.set('cv', pendingCv.current);
        const upload = await fetch(`/api/interview-bookings/${booking.reference}/cv`, { method: 'POST', body: cv });
        const uploaded = await upload.json().catch(() => ({}));
        if (upload.ok) setConfirmation(uploaded.data || uploaded);
        else { uploadStarted.current = false; setError('Payment succeeded, but the CV upload failed. Please try again.'); }
      } else setConfirmation(booking);
    };
    poll();
    const timer = window.setInterval(poll, 3000);
    return () => window.clearInterval(timer);
  }, [confirmation]);


  const modes = [...new Set(offers.map((offer) => offer.mode))];
  const modeOffers = offers.filter((offer) => offer.mode === mode).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const offer = modeOffers.find((item) => item.tierSlug === tier) || modeOffers[0];
  const dates = useMemo(() => [...new Set(slots.map((slot) => slot.starts_at.slice(0, 10)))], [slots]);
  const times = slots.filter((slot) => slot.starts_at.slice(0, 10) === date);

  function chooseMode(nextMode) {
    setMode(nextMode);
    if (!offers.some((item) => item.mode === nextMode && item.tierSlug === tier)) {
      setTier(offers.find((item) => item.mode === nextMode)?.tierSlug || 'starter');
    }
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const data = new FormData(event.currentTarget);
    pendingCv.current = data.get('cv');
    data.delete('cv');
    data.set('mode', offer.mode);
    data.set('offer_code', offer.code);
    data.set('tier', offer.tierSlug);
    data.set('starts_at', startsAt);
    data.set('idempotency_key', key.current);
    const response = await fetch('/api/interview-bookings', { method: 'POST', body: data });
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      setConfirmation(body.data || body);
    } else {
      setError(response.status === 409 ? config.capacityMessage : config.bookingError);
      if (response.status === 409) {
        setSlots((current) => current.filter((slot) => slot.starts_at !== startsAt));
        setStartsAt('');
      }
    }
    setSubmitting(false);
  }

  if (confirmation) return <div className="rounded-2xl border border-[#51D4D6]/30 bg-[#51D4D6]/5 p-7 text-center"><CheckCircle aria-hidden="true" className="mx-auto text-[#51D4D6]" size={48} /><h2 className="mt-5 text-2xl font-bold text-white">{confirmation.status === 'confirmed' ? config.successHeading : 'Complete payment on your phone'}</h2><p className="mt-3 text-gray-300">{confirmation.status === 'confirmed' ? config.successDescription : 'Your CV remains in this browser and will only be uploaded after BusinessERP verifies payment.'}</p><p className="mt-4 font-semibold text-[#51D4D6]">{confirmation.reference}</p></div>;

  return <form onSubmit={submit} className="space-y-8">
    <fieldset>
      <legend className="text-lg font-bold text-white">{config.modeLabel}</legend>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {modes.map((value) => { const selected = mode === value; const Icon = value === 'online' ? Video : MapPin; const label = value === 'online' ? config.onlineTabLabel : config.physicalTabLabel; return <label key={value} className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-center font-bold transition ${selected ? 'border-[#51D4D6] bg-[#51D4D6] text-[#0a0a0a]' : 'border-white/10 bg-[#0a0a0a] text-white'}`}><input type="radio" name="mode_choice" value={value} checked={selected} onChange={() => chooseMode(value)} className="sr-only" /><Icon aria-hidden="true" size={18} />{label}</label>; })}
      </div>
    </fieldset>

    <fieldset>
      <legend className="text-lg font-bold text-white">{config.tierLabel}</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {modeOffers.map((item) => { const selected = offer?.code === item.code; return <label key={item.code} className={`cursor-pointer rounded-xl border p-4 transition ${selected ? 'border-[#51D4D6] bg-[#51D4D6]/10' : 'border-white/10 bg-[#0a0a0a]'}`}><input type="radio" name="offer_choice" value={item.code} checked={selected} onChange={() => setTier(item.tierSlug)} className="sr-only" /><span className="flex items-center justify-between gap-3"><span className="font-bold text-white">{item.label}</span><span className="font-bold text-[#51D4D6]">{item.currency} {Number(item.price).toLocaleString()}</span></span>{item.durationLabel && <span className="mt-2 block text-sm text-gray-400">{item.durationLabel}</span>}</label>; })}
      </div>
      {offer?.locationNote && <p className="mt-3 text-sm leading-6 text-gray-400">{offer.locationNote}</p>}
    </fieldset>

    <fieldset><legend className="text-lg font-bold text-white">{config.dateLabel} &amp; {config.timeLabel}</legend><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-gray-200"><span className="flex items-center gap-2"><CalendarDays aria-hidden="true" size={18} />{config.dateLabel}</span><select required value={date} onChange={(event) => { setDate(event.target.value); setStartsAt(''); }} className={field}><option value=""></option>{dates.map((item) => <option key={item} value={item}>{new Intl.DateTimeFormat('en-KE', { weekday: 'short', day: 'numeric', month: 'long' }).format(new Date(`${item}T12:00:00+03:00`))}</option>)}</select></label><label className="text-sm font-semibold text-gray-200"><span className="flex items-center gap-2"><Clock aria-hidden="true" size={18} />{config.timeLabel}</span><select required disabled={!date || loading} value={startsAt} onChange={(event) => setStartsAt(event.target.value)} className={field}><option value=""></option>{times.map((item) => <option key={item.starts_at} value={item.starts_at}>{new Intl.DateTimeFormat('en-KE', { hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Nairobi' }).format(new Date(item.starts_at))}</option>)}</select></label></div></fieldset>

    <fieldset><legend className="text-lg font-bold text-white">{config.detailsLabel}</legend><div className="mt-4 grid gap-4 sm:grid-cols-2"><Label text={config.nameLabel}><input name="full_name" required maxLength={150} className={field} /></Label><Label text={config.emailLabel}><input name="email" type="email" required className={field} /></Label><Label text={config.phoneLabel}><input name="phone" type="tel" required className={field} /></Label><Label text={config.roleLabel}><input name="role_title" required maxLength={180} className={field} /></Label><Label text={config.companyLabel}><input name="company" maxLength={180} className={field} /></Label><Label text={config.cvLabel}><span className="relative block"><FileText aria-hidden="true" className="pointer-events-none absolute left-3 top-5 text-[#51D4D6]" size={18} /><input name="cv" type="file" required accept=".pdf,.docx" className={`${field} pl-10 file:mr-3 file:rounded file:border-0 file:bg-[#51D4D6] file:px-2 file:py-1 file:font-semibold`} /></span></Label><Label text={config.detailsLabel} wide><textarea name="role_details" required maxLength={5000} rows={5} className={field} /></Label><Label text={config.notesLabel} wide><textarea name="important_notes" maxLength={3000} rows={4} className={field} /></Label></div></fieldset>

    {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-red-200">{error}</p>}
    <button disabled={submitting || !offer} className="min-h-12 w-full rounded-lg bg-[#51D4D6] px-6 py-3 font-bold text-[#0a0a0a] disabled:opacity-50">{config.submitLabel}</button>
  </form>;
}

function Label({ text, wide = false, children }) { return <label className={`text-sm font-semibold text-gray-200 ${wide ? 'sm:col-span-2' : ''}`}>{text}{children}</label>; }
