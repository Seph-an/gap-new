import CMSHero from '@/components/CMS/Hero';
import CardSection from '@/components/CMS/CardSection';
import CareerServices from './CareerServices';

export default function JobSeekerPage({ page }) {
  return <>
    <CMSHero hero={page.hero} />
    <CardSection section={page.socialProof} />
    <CareerServices section={page.testimonialSection} />
  </>;
}
