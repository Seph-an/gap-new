import Image from 'next/image';
import Link from 'next/link';
import { imageUrl } from '@/lib/cms/strapi';
import { JOBS_ROUTE, normalizeListedJobsLink } from '@/lib/jobs';

const linkClass = 'inline-flex min-h-11 items-center rounded-sm py-2 text-sm leading-6 text-gray-300 hover:text-[#51D4D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1e1e1e] motion-safe:transition-colors';

function uniqueLinks(links = []) {
  const seen = new Set();
  return (links || []).filter((item) => {
    const url = normalizeListedJobsLink(item?.url);
    if (!item?.label || !url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

function FooterLink({ item, className = linkClass }) {
  const href = normalizeListedJobsLink(item.url);
  return href.startsWith('/') && !href.startsWith('//')
    ? <Link href={href} className={className}>{item.label}</Link>
    : <a href={href} className={className}>{item.label}</a>;
}

function LinkGroup({ title, links, id }) {
  if (!title || !links.length) return null;
  return <nav aria-labelledby={id} className="min-w-0">
    <h2 id={id} className="mb-3 text-base font-semibold text-white/90">{title}</h2>
    <ul className="space-y-1">{links.map((item) => <li key={item.url}><FooterLink item={item} /></li>)}</ul>
  </nav>;
}

export default function Footer({ global }) {
  const footer = global?.footer;
  if (!footer) return null;
  const nav = (global.navLinks || []).filter((item) => item.enabled !== false);
  const servicesNav = nav.find((item) => item.href === '/services');
  const seekersNav = nav.find((item) => item.href === '/job-seeker');
  const jobsNav = nav.find((item) => normalizeListedJobsLink(item.href) === JOBS_ROUTE);
  const asLink = (item) => item && ({ label: item.name, url: item.href, external: item.external });
  const services = uniqueLinks((global.serviceLinks || []).map((item) => item.link));
  const seekers = uniqueLinks([asLink(seekersNav), asLink(jobsNav), ...(global.jobSeekerLinks || []).map((item) => item.link)]);
  const groupedUrls = new Set([
    ...(servicesNav?.name ? services : []),
    ...(seekersNav?.name ? seekers : []),
  ].map((item) => normalizeListedJobsLink(item.url)));
  const company = uniqueLinks(footer.companyLinks).filter((item) => !groupedUrls.has(normalizeListedJobsLink(item.url)));
  const legal = uniqueLinks(footer.legalLinks);
  const credentials = (global.assets?.credentials || []).map((item) => typeof item === 'string' ? item : item.value).filter(Boolean);

  return <footer className="m-4 text-white md:m-6 lg:m-8">
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#1e1e1e]">
      <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-12 lg:p-10">
        <div className="min-w-0 rounded-xl bg-[#0a0a0a] p-6 text-center lg:text-left">
          {footer.logo && <Image src={imageUrl(footer.logo)} alt={footer.brand} width={112} height={112} className="mx-auto mb-5 h-auto lg:mx-0" />}
          <p className="text-lg font-semibold leading-7 text-white/90">{footer.brand}</p>
          {footer.tagline && <p className="mt-2 text-sm leading-6 text-gray-400">{footer.tagline}</p>}
        </div>
        <div className="grid min-w-0 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          <LinkGroup title={footer.sections?.company} links={company} id="footer-company" />
          <LinkGroup title={servicesNav?.name} links={services} id="footer-services" />
          <LinkGroup title={seekersNav?.name} links={seekers} id="footer-job-seekers" />
        </div>
      </div>
      <div className="flex flex-col gap-8 border-t border-white/10 px-6 py-7 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:px-8 lg:px-10">
        {footer.socials?.length > 0 && <div className="min-w-0">
          {footer.sections?.socials && <h2 className="mb-4 text-sm font-semibold text-white/90">{footer.sections.socials}</h2>}
          <ul className="flex flex-wrap gap-3">{footer.socials.filter((item) => item.url && item.label).map((social) => <li key={social.url}>
            <a href={social.url} aria-label={social.label} className="flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1e1e1e]">
              {social.src ? <Image src={imageUrl(social.src)} alt="" width={40} height={40} className="rounded-full bg-white motion-safe:transition-transform motion-safe:hover:scale-110" /> : <span className="text-sm text-gray-300">{social.label}</span>}
            </a>
          </li>)}</ul>
        </div>}
        {credentials.length > 0 && <div className="min-w-0">
          {footer.sections?.credentials && <h2 className="mb-4 text-sm font-semibold text-white/90">{footer.sections.credentials}</h2>}
          <ul className="flex flex-wrap gap-3">{credentials.map((src) => <li key={src}><Image src={imageUrl(src)} alt="" width={64} height={64} className="rounded-full grayscale hover:grayscale-0 motion-safe:transition-[filter]" /></li>)}</ul>
        </div>}
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center sm:px-8 lg:px-10">
        {legal.length > 0 && <ul className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-1">{legal.map((item) => <li key={item.url}><FooterLink item={item} /></li>)}</ul>}
        {footer.copyright && <p className="text-sm leading-6 text-gray-400">{footer.copyright.replace('{year}', new Date().getFullYear())}</p>}
        {footer.developer?.url && footer.developer.label && <p className="mt-1 text-sm leading-6 text-gray-400">{footer.developerPrefix} <FooterLink item={footer.developer} className="inline-flex min-h-11 items-center rounded-sm font-medium text-[#51D4D6] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6]" /></p>}
      </div>
    </div>
  </footer>;
}
