import { NextResponse } from 'next/server';
import { MAX_APPLICATION_BYTES, validateApplication } from '@/lib/job-application';

const ERP_URL = process.env.BUSINESS_ERP_URL || 'http://127.0.0.1:7000';
const ERP_TOKEN = process.env.BUSINESS_ERP_TOKEN;
const json = (body, status) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') return json({ message: 'Please submit from this website.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) return json({ message: 'Use the application form to upload your resume.' }, 415);
  if (Number(request.headers.get('content-length')) > MAX_APPLICATION_BYTES) return json({ message: 'The resume must not exceed 5 MB.' }, 413);
  if (!ERP_TOKEN) return json({ message: 'Applications are temporarily unavailable.' }, 503);

  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ message: 'The application is empty.' }, 400);
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_APPLICATION_BYTES) {
        await reader.cancel();
        return json({ message: 'The resume must not exceed 5 MB.' }, 413);
      }
      chunks.push(value);
    }
    let input;
    try {
      input = await new Response(new Blob(chunks), { headers: { 'content-type': request.headers.get('content-type') } }).formData();
    } catch { return json({ message: 'The application could not be read.' }, 400); }
    for (const key of input.keys()) {
      if (input.getAll(key).length > 1) return json({ message: 'Duplicate form fields are not allowed.' }, 400);
    }
    const { data, errors } = validateApplication(input);
    if (Object.keys(errors).length) return json({ message: 'Please check the highlighted fields.', errors }, 422);
    const response = await fetch(`${ERP_URL}/api/v1/job-applications`, {
      method: 'POST', body: data, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { authorization: `Bearer ${ERP_TOKEN}`, accept: 'application/json' },
    });
    const body = await response.json().catch(() => null);
    if (response.ok && typeof body?.data?.reference === 'string') return json({ data: { reference: body.data.reference, status: 'received' } }, response.status);
    if ([409, 422, 429].includes(response.status)) {
      const messages = { 409: 'An application has already been received for this email and job.', 422: 'Please check your details and resume. This job may no longer be accepting applications.', 429: 'Too many attempts. Please wait a minute and try again.' };
      const safeErrors = {};
      for (const key of ['full_name', 'email', 'phone', 'location', 'linkedin_url', 'cover_letter', 'cv']) {
        if (Array.isArray(body?.errors?.[key])) safeErrors[key] = body.errors[key].filter(value => typeof value === 'string').map(value => value.slice(0, 200));
      }
      const message = response.status === 422 && body?.errors?.job_id ? 'This job is no longer accepting applications. Please choose another job.' : messages[response.status];
      return json({ message, errors: safeErrors }, response.status);
    }
    return json({ message: 'Applications are temporarily unavailable. Please try again.' }, 503);
  } catch { return json({ message: 'Applications are temporarily unavailable. Please try again.' }, 503); }
}
