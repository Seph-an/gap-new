import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, BriefcaseBusiness, Building2, CalendarDays, MapPin, Users } from 'lucide-react';
import { fetchJobBySlug, jobSlug, jobUrl, JOBS_ROUTE } from '@/lib/jobs';
import DeadlineCountdown from '@/components/Jobs/DeadlineCountdown';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gaprecruitment.co.ke';

function plainText(value = '') { return value.replace(/[#*_>`\[\]()]/g, ' ').replace(/\s+/g, ' ').trim(); }
function formatDate(value) { return value ? new Intl.DateTimeFormat('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value)) : null; }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await fetchJobBySlug(slug);
  if (!job) return { title: 'Job not found | Gap Recruitment Services', robots: { index: false, follow: false } };
  const description = plainText(job.description || job.requirements || `${job.name} vacancy available through Gap Recruitment Services Kenya.`).slice(0, 158);
  const canonical = jobUrl(job);
  return {
    title: `${job.name} Job in Kenya | Gap Recruitment Services`, description,
    alternates: { canonical },
    openGraph: { title: job.name, description, url: canonical, type: 'website', locale: 'en_KE' },
    twitter: { card: 'summary', title: job.name, description }, robots: { index: true, follow: true },
  };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const job = await fetchJobBySlug(slug);
  if (!job) notFound();
  if (slug !== jobSlug(job)) redirect(jobUrl(job));
  const schema = {
    '@context': 'https://schema.org', '@type': 'JobPosting', title: job.name,
    description: plainText(job.description || job.requirements),
    identifier: { '@type': 'PropertyValue', name: 'Gap Recruitment Services', value: String(job.erp_job_id) },
    datePosted: job.erp_posted_at || job.erp_created_at || job.createdAt,
    validThrough: job.date_to || undefined,
    employmentType: job.employment_type || undefined,
    hiringOrganization: { '@type': 'Organization', name: job.company || 'Gap Recruitment Services Limited', sameAs: SITE_URL },
    jobLocation: job.address ? { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: job.address, addressCountry: 'KE' } } : undefined,
    industry: job.industry || undefined,
    occupationalCategory: job.department || undefined,
    skills: job.skills || undefined,
    url: `${SITE_URL}${jobUrl(job)}`,
  };
  const details = [[Building2, 'Company', job.company], [MapPin, 'Location', job.address], [BriefcaseBusiness, 'Employment type', job.employment_type], [Users, 'Openings', job.no_of_recruitment || job.expected_employees], [CalendarDays, 'Application deadline', formatDate(job.date_to)]];

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><article className="min-h-screen bg-[#0a0a0a] px-4 pb-20 pt-32 sm:px-6 md:px-12 lg:px-20 lg:pt-40"><div className="container"><Link href={JOBS_ROUTE} className="inline-flex items-center gap-2 text-sm font-semibold text-[#51D4D6] hover:text-white"><ArrowLeft size={18} /> Back to all jobs</Link><header className="mt-8 rounded-3xl border border-white/10 bg-[#1e1e1e] p-6 sm:p-9 lg:p-12"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="font-semibold uppercase tracking-[0.2em] text-[#51D4D6]">{job.department || job.industry || 'Job opportunity'}</p><h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-5xl">{job.name}</h1><p className="mt-4 text-gray-400">Posted {formatDate(job.erp_posted_at || job.erp_created_at || job.createdAt)}</p></div><Link href={`/contact-us?job=${encodeURIComponent(job.name)}&jobId=${job.erp_job_id}`} className="shrink-0 rounded-lg bg-[#51D4D6] px-7 py-3.5 text-center font-semibold text-[#0a0a0a] hover:bg-[#3FAFB1]">Apply for this job</Link></div></header><div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><main className="space-y-8"><JobCopy title="Job description" copy={job.description} /><JobCopy title="Requirements" copy={job.requirements} />{job.skills && <JobCopy title="Skills" copy={job.skills} />}</main><aside className="h-fit rounded-2xl border border-white/10 bg-[#1e1e1e] p-6 lg:sticky lg:top-28"><h2 className="text-xl font-bold text-white">Job overview</h2><div className="mt-5"><DeadlineCountdown deadline={job.date_to} /></div><dl className="mt-6 space-y-5">{details.filter(([, , value]) => value).map(([Icon, label, value]) => <div key={label} className="flex gap-3"><Icon className="mt-0.5 shrink-0 text-[#51D4D6]" size={20} /><div><dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt><dd className="mt-1 text-sm text-gray-200">{value}</dd></div></div>)}</dl></aside></div></div></article></>;
}

function JobCopy({ title, copy }) {
  if (!copy) return null;
  return <section className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-6 sm:p-8"><h2 className="text-2xl font-bold text-white">{title}</h2><div className="prose prose-invert mt-5 max-w-none leading-7 text-gray-300"><ReactMarkdown remarkPlugins={[remarkGfm]}>{copy}</ReactMarkdown></div></section>;
}
