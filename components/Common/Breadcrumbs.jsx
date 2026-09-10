import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gaprecruitment.co.ke';

function absoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path || '/', SITE_URL).toString();
}

export default function Breadcrumbs({ items = [], className = '', structuredData = true }) {
  const validItems = (items || []).filter((item) => item?.label && item?.url);
  if (validItems.length < 2) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: validItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.url),
    })),
  };

  return <>
    {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />}
    <nav aria-label="Breadcrumb" className={['mb-8', className].filter(Boolean).join(' ')}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">
        {validItems.map((item, index) => {
          const current = index === validItems.length - 1;
          return <li key={`${item.url}-${item.label}`} className="flex min-w-0 items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="text-gray-600">/</span>}
            {current ? <span aria-current="page" className="break-words text-gray-200">{item.label}</span> : <Link href={item.url} className="break-words transition-colors hover:text-[#51D4D6] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51D4D6]">{item.label}</Link>}
          </li>;
        })}
      </ol>
    </nav>
  </>;
}
