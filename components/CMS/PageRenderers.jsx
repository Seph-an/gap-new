import CMSHero from './Hero';
import CardSection from './CardSection';
import LinkButton from './LinkButton';
import CopyableText from '@/components/Common/Copy';

export function HomePage({ page }) {
  return <><CMSHero hero={page.hero} /><CardSection section={page.why} /><CardSection section={page.services} dark /><FeaturedBlogShell section={page.featuredBlogSection} /></>;
}

export function AboutPage({ page }) {
  return <><CMSHero hero={page.hero} /><CardSection section={page.missionVision} /><CardSection section={page.coreValues} dark /></>;
}

export function ServicePage({ page }) {
  return <><CMSHero hero={page.hero} /><CardSection section={page.benefits} /><CardSection section={page.process} /><CardSection section={page.services} dark />{page.banner && <Banner banner={page.banner} />}</>;
}

export function JobSeekerPage({ page }) {
  return <><CMSHero hero={page.hero} /><CardSection section={page.socialProof} /><Testimonials page={page} /></>;
}

export function FAQPage({ page }) {
  return <><CMSHero hero={page.hero} /><section id="faqs" className="w-screen px-6 md:px-12 lg:px-20"><div className="max-w-7xl mx-auto"><h2 className="text-3xl font-bold mb-12 text-center text-white/90">{page.title}</h2><div className="space-y-4">{page.faqs?.map((faq, index) => <details key={index} className="bg-[#1e1e1e] p-4 rounded-lg gap-shadow"><summary className="cursor-pointer text-lg font-medium">{faq.question}</summary><p className="mt-3 text-gray-400">{faq.answer}</p></details>)}</div>{page.cta && <div className="w-full mx-auto flex flex-col items-center"><p className="text-lg text-gray-300 text-center max-w-5xl mx-auto mt-16">{page.cta.text}</p><LinkButton link={page.cta.cta} className="gap-button gap-button-primary my-8" /></div>}</div></section></>;
}

export function ContactPage({ page }) {
  return <section className="bg-[#0a0a0a] relative min-h-screen flex items-center justify-center py-16 px-6 md:px-16"><div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-6 lg:mt-20"><div className="md:w-1/3"><h2 className="text-3xl font-bold text-white/90">{page.title}</h2><p className="mt-2 text-gray-400">{page.description}</p></div><div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">{page.contactCards?.map((item) => <div key={item.title} className="bg-[#1e1e1e] p-8 rounded-lg shadow-md"><h3 className="text-lg font-semibold text-white/90 mb-3">{item.title}</h3>{item.meta?.email ? <><CopyableText text={item.meta.email} color="[#51D4D6]" /><CopyableText text={item.meta.phone1} color="gray-400" /><CopyableText text={item.meta.phone2} color="gray-400" /></> : <p className="text-gray-400">{item.description}</p>}</div>)}</div></div></section>;
}

export function LegalPage({ page }) {
  return <section className="mt-24 py-16 w-screen px-4 sm:px-6 md:px-12 lg:px-20"><div className="bg-transparent text-gray-300 container"><h1 className="text-white/90 text-4xl font-bold mb-8">{page.title}</h1>{page.intro && <p className="mb-6">{page.intro}</p>}{page.sections?.map((section) => <div key={section.heading}><h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">{section.heading}</h2>{section.body && <p className="mb-6 whitespace-pre-line">{section.body}</p>}</div>)}{page.contactEmail && <p className="text-[#51d4d6] font-medium">{page.contactEmail}</p>}</div></section>;
}

function FeaturedBlogShell({ section }) {
  if (!section) return null;
  return <section id="blog" className="w-screen bg-gray-900 flex flex-col items-center"><div className="container py-16 flex flex-col items-center"><h2 className="gap-title">{section.title}</h2>{section.subtitle && <p className="mt-8 gap-subtitle max-w-5xl">{section.subtitle}</p>}{section.footerText && <p className="mt-5 gap-subtitle max-w-5xl">{section.footerText}</p>}<div className="mt-5"><LinkButton link={section.cta} /></div></div></section>;
}

function Banner({ banner }) {
  return <section className="section-light border-t border-white/5"><div className="container flex flex-col items-center text-center gap-6"><h2 className="gap-title">{banner.title}</h2>{banner.subtitle && <p className="gap-subtitle max-w-4xl mx-auto">{banner.subtitle}</p>}<LinkButton link={banner.cta} /></div></section>;
}

function Testimonials({ page }) {
  const groups = page.testimonialGroups || [];
  return <section className="py-20 w-screen px-6 md:px-12 lg:px-20"><div className="max-w-7xl mx-auto text-center"><h2 className="text-3xl font-bold mb-2 text-white/90">{page.testimonialSection?.title}</h2><p className="text-lg text-gray-400 mb-12">{page.testimonialSection?.subtitle}</p><div className="grid gap-6 md:grid-cols-3">{groups.map((group) => <div key={group.key} className="bg-[#1e1e1e] p-6 rounded-lg shadow-md"><h3 className="text-[#51D4D6] font-semibold mb-4">{group.label}</h3>{group.testimonials?.map((item) => <blockquote key={item.id} className="mb-4 text-gray-300"><p className="italic">&quot;{item.content}&quot;</p><footer className="font-bold mt-1">- {item.name}</footer></blockquote>)}</div>)}</div>{page.testimonialSection?.ctaText && <p className="text-base lg:text-lg text-gray-400 text-center max-w-5xl mx-auto mt-16">{page.testimonialSection.ctaText}</p>}<LinkButton link={page.testimonialSection?.cta} className="mt-8 inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition" /></div></section>;
}
