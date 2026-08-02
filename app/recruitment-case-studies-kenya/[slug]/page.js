import { permanentRedirect } from 'next/navigation';

export default async function LegacyCaseStudyPage({ params }) {
  const { slug } = await params;
  permanentRedirect(`/recruitment-payroll-and-staff-outsourcing-case-studies-by-gap-recruitment-services/${slug}`);
}
