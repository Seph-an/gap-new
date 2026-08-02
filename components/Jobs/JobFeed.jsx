'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BriefcaseBusiness, Building2, Clock3, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { jobUrl } from '@/lib/jobs';
import DeadlineCountdown from '@/components/Jobs/DeadlineCountdown';

const emptyFilters = { search: '', location: '', department: '', employmentType: '' };

function formatDate(value) {
  if (!value) return null;
  return new Intl.DateTimeFormat('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function JobCard({ job }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#1e1e1e] p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#51D4D6]/60 hover:shadow-[0_12px_40px_rgba(81,212,214,0.12)] sm:p-6">
      <div className="mb-5 flex items-start justify-end gap-3">
        {job.employment_type && <span className="rounded-full border border-[#51D4D6]/25 bg-[#51D4D6]/10 px-3 py-1 text-xs font-medium text-[#51D4D6]">{job.employment_type}</span>}
      </div>
      <h2 className="flex items-center gap-1.5 text-xl font-bold text-white transition group-hover:text-[#51D4D6]">
        <span>{job.name}</span>
        <span className="inline-flex shrink-0" aria-label="Verified job">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fill="#1d9bf0" d="M23 12l-2.44-2.79.34-3.69-3.61-.82L15.4 1.5 12 2.96 8.6 1.5 6.71 4.69 3.1 5.52l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2 3.4-1.46 3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12Z" />
            <path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m9 12 2 2 4-4" />
          </svg>
        </span>
      </h2>
      <div className="mt-4 space-y-2 text-sm text-gray-400">
        {job.company && <p className="flex items-center gap-2"><Building2 size={16} />{job.company}</p>}
        {job.address && <p className="flex items-center gap-2"><MapPin size={16} />{job.address}</p>}
        {job.department && <p className="flex items-center gap-2"><BriefcaseBusiness size={16} />{job.department}</p>}
        {job.erp_posted_at && <p className="flex items-center gap-2"><Clock3 size={16} />Posted {formatDate(job.erp_posted_at)}</p>}
      </div>
      <div className="mt-5"><DeadlineCountdown deadline={job.date_to} compact /></div>
      {job.description && <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">{job.description.replace(/[#*_>`\[\]]/g, '')}</p>}
      <Link href={jobUrl(job)} className="mt-auto pt-6 font-semibold text-[#51D4D6] transition hover:text-white" aria-label={`View details for ${job.name}`}>View job details <span aria-hidden="true">→</span></Link>
    </article>
  );
}

export default function JobFeed({ initialJobs, initialPagination }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [pagination, setPagination] = useState(initialPagination);
  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const sentinel = useRef(null);

  const loadJobs = useCallback(async (page, replace = false, activeFilters = appliedFilters) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page) });
      Object.entries(activeFilters).forEach(([key, value]) => value && params.set(key, value));
      const response = await fetch(`/api/job-positions?${params}`);
      if (!response.ok) throw new Error('Unable to load jobs right now.');
      const result = await response.json();
      setJobs((current) => replace ? result.data : [...current, ...result.data.filter((item) => !current.some((job) => job.documentId === item.documentId))]);
      setPagination(result.meta.pagination);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || loading || pagination.page >= pagination.pageCount) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadJobs(pagination.page + 1);
    }, { rootMargin: '300px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [loadJobs, loading, pagination.page, pagination.pageCount]);

  function submitFilters(event) {
    event.preventDefault();
    setAppliedFilters(filters);
    loadJobs(1, true, filters);
  }

  function clearFilters() {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    loadJobs(1, true, emptyFilters);
  }

  return (
    <section className="px-4 pb-20 sm:px-6 md:px-12 lg:px-20" aria-labelledby="jobs-heading">
      <div className="container">
        <form onSubmit={submitFilters} className="relative -mt-8 mb-12 grid gap-3 rounded-2xl border border-white/10 bg-[#1e1e1e] p-4 shadow-2xl sm:p-6 md:grid-cols-2 lg:grid-cols-5">
          <label className="relative lg:col-span-2"><span className="sr-only">Search jobs</span><Search className="absolute left-3 top-3.5 text-gray-500" size={19} /><input value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] py-3 pl-10 pr-3 text-white outline-none focus:border-[#51D4D6]" placeholder="Job title, skill or industry" /></label>
          <FilterInput label="Location" value={filters.location} onChange={(value) => setFilters({ ...filters, location: value })} />
          <FilterInput label="Department" value={filters.department} onChange={(value) => setFilters({ ...filters, department: value })} />
          <div className="flex gap-2"><button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#51D4D6] px-4 py-3 font-semibold text-[#0a0a0a] hover:bg-[#3FAFB1]" type="submit"><SlidersHorizontal size={18} /> Filter</button>{Object.values(appliedFilters).some(Boolean) && <button type="button" onClick={clearFilters} className="rounded-lg border border-white/15 px-3 text-sm text-gray-300 hover:text-white">Clear</button>}</div>
          <label className="md:col-span-2 lg:col-span-5"><span className="sr-only">Employment type</span><input value={filters.employmentType} onChange={(event) => setFilters({ ...filters, employmentType: event.target.value })} className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-3 text-white outline-none focus:border-[#51D4D6]" placeholder="Employment type (for example, Full Time)" /></label>
        </form>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#51D4D6]">Current opportunities</p><h2 id="jobs-heading" className="mt-2 text-3xl font-bold text-white">Find your next role</h2></div><p className="text-sm text-gray-400">{pagination.total || 0} open {(pagination.total || 0) === 1 ? 'position' : 'positions'}</p></div>
        {jobs.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{jobs.map((job) => <JobCard key={job.documentId || job.erp_job_id} job={job} />)}</div> : !loading && <div className="rounded-2xl border border-white/10 bg-[#1e1e1e] p-10 text-center"><h3 className="text-xl font-semibold text-white">No matching jobs found</h3><p className="mt-2 text-gray-400">Try broadening your search or clearing the filters.</p></div>}
        <div ref={sentinel} className="flex min-h-24 items-center justify-center" aria-live="polite">{loading && <div className="flex items-center gap-3 text-gray-300"><span className="h-6 w-6 animate-spin rounded-full border-2 border-[#51D4D6] border-t-transparent" />Loading more jobs…</div>}{error && <button onClick={() => loadJobs(pagination.page + 1)} className="text-[#51D4D6]">{error} Try again</button>}</div>
      </div>
    </section>
  );
}

function FilterInput({ label, value, onChange }) {
  return <label><span className="sr-only">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-3 text-white outline-none focus:border-[#51D4D6]" placeholder={label} /></label>;
}
