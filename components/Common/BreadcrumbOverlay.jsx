import Breadcrumbs from './Breadcrumbs';

export default function BreadcrumbOverlay({ items = [] }) {
  return <div className="pointer-events-none absolute inset-x-0 top-28 z-40 px-4 sm:px-6 md:px-12 lg:top-32 lg:px-20"><div className="container pointer-events-auto"><Breadcrumbs items={items} /></div></div>;
}
