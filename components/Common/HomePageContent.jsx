import { CheckCircle } from 'lucide-react';
import CMSHero from '@/components/CMS/Hero';
import LinkButton from '@/components/CMS/LinkButton';
import ClientLogoMarquee from './ClientLogoMarquee';
import BlogPost from '@/components/Blog/Home/BlogPost';

export default function HomePageContent({ page, featuredBlogs = [] }) {
  const heroTitle = page.hero?.title?.split(/(Recruitment|Kenya)/gi).map((part, index) =>
    /^(Recruitment|Kenya)/i.test(part)
      ? <span key={part + "-" + index} className="text-[#51D4D6]">{part}</span>
      : part
  );
  const hero = { ...page.hero, title: heroTitle };

  return (
    <>
      <CMSHero hero={hero} />
      <WhySection section={page.why} clientLogos={page.clientLogos} />
      <ServicesSection section={page.services} />
      <FeaturedBlogShell section={page.featuredBlogSection} blogs={featuredBlogs} />
    </>
  );
}

function ServicesSection({ section }) {
  if (!section) return null;

  return (
    <section id={section.sectionId || undefined} className="section-dark">
      <div className="container">
        {section.eyebrow && <h3 className="mb-4 text-center text-lg font-semibold text-[#51d4d6] md:text-xl">{section.eyebrow}</h3>}
        <h2 className="gap-title">{section.title}</h2>
        {section.subtitle && <p className="gap-subtitle mx-auto max-w-5xl text-center">{section.subtitle}</p>}

        {section.cards?.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {section.cards.map((item) => (
              <article key={item.title} className="gap-card items-center bg-[#1e1e1e] text-center">
                {item.title && <h3 className="card-title">{item.title}</h3>}
                {item.description && <p className="card-content">{item.description}</p>}
                {item.link && (
                  <LinkButton
                    link={item.link}
                    className="mt-auto inline-flex items-center justify-center self-center pt-6 font-semibold text-[#51D4D6] transition-opacity hover:opacity-80 [&_svg]:shrink-0 [&_svg]:text-[#51D4D6]"
                  />
                )}
              </article>
            ))}
          </div>
        )}

        {(section.ctaText || section.cta) && (
          <div className="mt-12 flex w-full flex-col items-center gap-8">
            {section.ctaText && <p className="gap-subtitle max-w-3xl text-center">{section.ctaText}</p>}
            <LinkButton link={section.cta} />
          </div>
        )}
      </div>
    </section>
  );
}

function WhySection({ section, clientLogos }) {
  if (!section) return null;

  const statistics = section.cards?.filter((item) => typeof item.value === 'number') || [];
  const accolades = section.cards?.filter((item) => typeof item.value !== 'number') || [];

  return (
    <section id={section.sectionId || undefined} className="section-light">
      <div className="container">
        {section.eyebrow && <h3 className="mb-4 text-center text-lg font-semibold text-[#51d4d6] md:text-xl">{section.eyebrow}</h3>}
        <h2 className="gap-title">{section.title}</h2>
        {section.subtitle && <p className="gap-subtitle mx-auto max-w-5xl text-center">{section.subtitle}</p>}

        <ClientLogoMarquee logos={clientLogos} />

        {statistics.length > 0 && (
          <div className="my-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {statistics.map((item) => (
              <div key={item.label} className="rounded-lg bg-[#0a0a0a] p-6 text-center shadow-md">
                <span className="text-2xl font-bold text-white/80 md:text-3xl">{item.value}+</span>
                <p className="mt-2 text-base text-[#51d4d6]">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {section.cardsTitle && <h3 className="gap-title">{section.cardsTitle}</h3>}

        {accolades.length > 0 && (
          <div className="mb-8 mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {accolades.map((item) => (
              <div key={item.title} className="gap-card bg-[#0a0a0a]">
                <CheckCircle aria-hidden="true" className="text-[#51d4d6]" />
                <p className="card-content">{item.title}</p>
              </div>
            ))}
          </div>
        )}

        {(section.ctaText || section.cta) && (
          <div className="flex w-full flex-col items-center gap-4">
            {section.ctaText && <p className="gap-subtitle max-w-3xl text-center">{section.ctaText}</p>}
            <LinkButton link={section.cta} />
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedBlogShell({ section, blogs }) {
  if (!section) return null;
  return (
    <section id="blog" className="flex w-screen flex-col items-center bg-gray-900">
      <div className="container flex flex-col items-center py-16">
        <h2 className="gap-title">{section.title}</h2>
        {section.subtitle && <p className="gap-subtitle mt-8 max-w-5xl">{section.subtitle}</p>}
        {blogs.length > 0 && <div className="mt-12 grid w-full gap-7 md:grid-cols-2 lg:grid-cols-3">{blogs.map((post) => <BlogPost key={post.slug} post={post} />)}</div>}
        {section.footerText && <p className="gap-subtitle mt-5 max-w-5xl">{section.footerText}</p>}
        <div className="mt-5"><LinkButton link={section.cta} /></div>
      </div>
    </section>
  );
}
