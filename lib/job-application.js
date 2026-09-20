export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const MAX_APPLICATION_BYTES = MAX_RESUME_BYTES + 64 * 1024;

const fields = { full_name: 150, email: 255, phone: 50, location: 180, linkedin_url: 255, cover_letter: 5000 };

export function validateApplication(input) {
  const data = new FormData();
  const errors = {};
  for (const [key, limit] of Object.entries(fields)) {
    const raw = input.get(key);
    if (raw !== null && typeof raw !== 'string') {
      errors[key] = ['Enter a valid text value.'];
      continue;
    }
    const value = (raw || '').normalize('NFC').replace(/<[^>]*>/g, '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').trim();
    const normalized = key === 'email' ? value.toLowerCase() : value;
    data.set(key, normalized);
    if (normalized.length > limit) errors[key] = [`Use at most ${limit} characters.`];
    if (['full_name', 'email', 'phone'].includes(key) && !normalized) errors[key] = ['This field is required.'];
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email') || '')) errors.email = ['Enter a valid email address.'];
  const phone = data.get('phone') || '';
  if (!/^\+?[\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15) errors.phone = ['Enter a phone number with 7–15 digits.'];
  const linkedin = data.get('linkedin_url');
  if (linkedin) {
    try {
      const url = new URL(linkedin);
      if (url.protocol !== 'https:' || !['linkedin.com', 'www.linkedin.com'].includes(url.hostname) || url.username || url.password) throw new Error();
    } catch { errors.linkedin_url = ['Enter an https://www.linkedin.com profile URL.']; }
  }
  const job = input.get('job_id');
  if (!/^[1-9]\d*$/.test(job || '') || !Number.isSafeInteger(Number(job))) errors.job_id = ['Select a valid job.'];
  else data.set('job_id', job);
  const key = input.get('idempotency_key');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key || '')) errors.idempotency_key = ['Please reopen the application form.'];
  else data.set('idempotency_key', key);
  const cv = input.get('cv');
  if (!cv || typeof cv === 'string' || !cv.size) errors.cv = ['Choose a non-empty resume.'];
  else if (cv.size > MAX_RESUME_BYTES) errors.cv = ['The resume must not exceed 5 MB.'];
  else if (!/\.(pdf|docx)$/i.test(cv.name)) errors.cv = ['Upload a PDF or DOCX document.'];
  else data.set('cv', cv, `resume.${cv.name.split('.').pop().toLowerCase()}`);
  return { data, errors };
}
