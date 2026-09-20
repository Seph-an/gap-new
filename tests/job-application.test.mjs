import test from 'node:test';
import assert from 'node:assert/strict';
import { validateApplication, MAX_RESUME_BYTES } from '../lib/job-application.js';

function application(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ full_name: ' Test Applicant ', email: ' TEST@EXAMPLE.COM ', phone: '+254 712 345 678', job_id: '9', idempotency_key: 'eb1186b4-d6ae-4e1b-a731-46a3b78330ae', ...overrides })) data.set(key, value);
  if (!data.has('cv')) data.set('cv', new File(['%PDF-1.4\n%%EOF'], 'resume.pdf', { type: 'application/pdf' }));
  return data;
}

test('normalizes allowed fields, strips markup/control characters, and ignores unapproved fields', () => {
  const { data, errors } = validateApplication(application({ full_name: '<b>Test</b>\u0000 Applicant', recruiter_id: '1' }));
  assert.deepEqual(errors, {});
  assert.equal(data.get('email'), 'test@example.com');
  assert.equal(data.get('full_name'), 'Test Applicant');
  assert.equal(data.has('recruiter_id'), false);
});
test('rejects absent and whitespace-only required values', () => {
  for (const field of ['full_name', 'email', 'phone']) assert.ok(validateApplication(application({ [field]: ' ' })).errors[field]);
});
test('enforces extension, empty-file and size limits', () => {
  for (const file of [new File(['x'], 'resume.exe'), new File(['x'], 'resume.doc'), new File([], 'resume.pdf'), new File([new Uint8Array(MAX_RESUME_BYTES + 1)], 'resume.pdf')]) assert.ok(validateApplication(application({ cv: file })).errors.cv);
  assert.equal(validateApplication(application({ cv: new File([new Uint8Array(MAX_RESUME_BYTES)], 'resume.pdf') })).errors.cv, undefined);
});
test('rejects invalid identifiers, links, phone numbers and long fields', () => {
  for (const [field, value] of Object.entries({ job_id: '9oops', idempotency_key: 'invalid', linkedin_url: 'javascript:alert(1)', phone: 'abc123', full_name: 'a'.repeat(151) })) assert.ok(validateApplication(application({ [field]: value })).errors[field]);
});
test('rejects uploaded files in text fields', () => {
  assert.ok(validateApplication(application({ full_name: new File(['x'], 'x.txt') })).errors.full_name);
});
