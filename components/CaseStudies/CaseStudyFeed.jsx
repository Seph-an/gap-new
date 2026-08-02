'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import CaseStudyCard from './CaseStudyCard';

const emptyFilters = { search: '', service: '', industry: '', role: '' };

export default function CaseStudyFeed({ initialResult, settings }) {
  const [studies, setStudies] = useState(initialResult.data);
  const [pagination, setPagination] = useState(initialResult.meta.pagination);
  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const sentinel = useRef(null);
  const batchSize = settings.batchSize || 9;

  const loadStudies = useCallback(async (page, replace = false, activeFilters = appliedFilters) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(batchSize) });
      Object.entries(activeFilters).forEach(([key, value]) => value && params.set(key, value));
      const response = await fetch(`/api/case-studies?${params}`);
      if (!response.ok) throw new Error(settings.errorText);
      const result = await response.json();
      setStudies((current) => replace ? result.data : [...current, ...result.data.filter((item) => !current.some((study) => study.documentId === item.documentId))]);
      setPagination(result.meta.pagination);
    } catch (requestError) {
      setError(requestError.message || settings.errorText);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, batchSize, settings.errorText]);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || loading || pagination.page >= pagination.pageCount) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && loadStudies(pagination.page + 1), { rootMargin: '350px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [loadStudies, loading, pagination.page, pagination.pageCount]);

  function apply(nextFilters) {
    setFilters(nextFilters);
    setAppliedFilters(nextFilters);
    loadStudies(1, true, nextFilters);
  }

  function submitSearch(event) {
    event.preventDefault();
    apply({ ...appliedFilters, search: filters.search });
  }

  function clearFilters() {
    apply(emptyFilters);
  }

  const hasFilters = Object.values(appliedFilters).some(Boolean);
  return <div className="mt-12"><form onSubmit={submitSearch} className="grid gap-3 rounded-2xl border border-white/10 bg-[#1e1e1e] p-4 shadow-xl md:grid-cols-2 xl:grid-cols-[minmax(260px,1.5fr)_repeat(3,minmax(150px,1fr))_auto]"><label className="relative"><span className="sr-only">{settings.searchLabel}</span><Search className="absolute left-3 top-3.5 text-gray-500" size={19} /><input value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] py-3 pl-10 pr-3 text-white outline-none focus:border-[#51D4D6]" placeholder={settings.searchPlaceholder} /></label><FilterSelect label={settings.serviceLabel} allLabel={settings.allServicesLabel} options={settings.services} value={appliedFilters.service} onChange={(service) => apply({ ...appliedFilters, service, search: filters.search })} /><FilterSelect label={settings.industryLabel} allLabel={settings.allIndustriesLabel} options={settings.industries} value={appliedFilters.industry} onChange={(industry) => apply({ ...appliedFilters, industry, search: filters.search })} /><FilterSelect label={settings.roleLabel} allLabel={settings.allRolesLabel} options={settings.roles} value={appliedFilters.role} onChange={(role) => apply({ ...appliedFilters, role, search: filters.search })} /><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#51D4D6] px-5 py-3 font-semibold text-[#0a0a0a] hover:bg-[#3FAFB1]"><SlidersHorizontal size={18} />{settings.applyLabel}</button></form><div className="mt-6 flex items-center justify-between gap-4"><p className="text-sm text-gray-400">{pagination.total || 0} {settings.resultLabel}</p>{hasFilters && <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#51D4D6] hover:text-white"><X size={16} />{settings.clearLabel}</button>}</div>{studies.length > 0 ? <div className="mt-7 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{studies.map((study) => <CaseStudyCard key={study.documentId || study.slug} study={study} />)}</div> : !loading && <div className="mt-7 rounded-2xl border border-white/10 bg-[#1e1e1e] p-10 text-center"><h3 className="text-xl font-semibold text-white">{settings.emptyTitle}</h3>{settings.emptyText && <p className="mt-2 text-gray-400">{settings.emptyText}</p>}</div>}<div ref={sentinel} className="flex min-h-24 items-center justify-center" aria-live="polite">{loading && <div className="flex items-center gap-3 text-gray-300"><span className="h-6 w-6 animate-spin rounded-full border-2 border-[#51D4D6] border-t-transparent" />{settings.loadingLabel}</div>}{error && <button onClick={() => loadStudies(pagination.page + 1)} className="text-[#51D4D6]">{error} {settings.retryLabel}</button>}</div></div>;
}

function FilterSelect({ label, allLabel, options = [], value, onChange }) {
  return <label className="relative"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none rounded-lg border border-white/10 bg-[#0a0a0a] py-3 pl-3 pr-12 text-white outline-none focus:border-[#51D4D6]"><option value="">{allLabel}</option>{options.map((option) => <option key={option.value} value={option.value}>{option.value}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" /></label>;
}
