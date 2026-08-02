import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { imageUrl } from '@/lib/cms/strapi';

export const CASE_STUDIES_ROUTE = '/recruitment-payroll-and-staff-outsourcing-case-studies-by-gap-recruitment-services';

export default function CaseStudyCard({ study }) {
  return <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] transition duration-300 hover:-translate-y-1 hover:border-[#51D4D6]/60">{study.heroImage?.src && <div className="relative aspect-[16/9] overflow-hidden"><Image src={imageUrl(study.heroImage.src)} alt={study.heroImage.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>}<div className="flex flex-1 flex-col p-6"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[#51D4D6]"><span>{study.service}</span>{study.industry && <><span aria-hidden="true">•</span><span>{study.industry}</span></>}</div><h2 className="mt-4 text-2xl font-bold text-white">{study.title}</h2><p className="mt-3 line-clamp-3 leading-7 text-gray-300">{study.excerpt}</p>{study.metrics?.length > 0 && <div className="mt-6 grid grid-cols-2 gap-3">{study.metrics.slice(0, 2).map((metric) => <div key={`${metric.value}-${metric.label}`}><strong className="block text-xl text-white">{metric.value}</strong><span className="text-xs text-gray-400">{metric.label}</span></div>)}</div>}<Link href={`${CASE_STUDIES_ROUTE}/${study.slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-[#51D4D6] hover:text-white">{study.cardLinkLabel} <ArrowUpRight size={18} /></Link></div></article>;
}
