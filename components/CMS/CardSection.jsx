import CMSIcon from './Icon';
import LinkButton from './LinkButton';

export default function CardSection({ section, dark = false }) {
  if (!section) return null;
  return (
    <section id={section.sectionId || undefined} className={dark ? 'section-dark' : 'section-light'}>
      <div className="container">
        {section.eyebrow && <h3 className="text-lg md:text-xl text-[#51d4d6] text-center font-semibold mb-4">{section.eyebrow}</h3>}
        <h2 className="gap-title">{section.title}</h2>
        {section.subtitle && <p className="gap-subtitle max-w-5xl mx-auto text-center">{section.subtitle}</p>}
        {section.cards?.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {section.cards.map((item, index) => (
              <div key={`${item.title || item.label || index}-${index}`} className={`gap-card ${dark ? 'bg-[#1e1e1e]' : 'bg-[#0a0a0a]'}`}>
                {item.icon && <div className="gap-icon"><CMSIcon name={item.icon} /></div>}
                {typeof item.value === 'number' && <span className="text-2xl md:text-3xl font-bold text-white/80">{item.value}+</span>}
                {item.title && <h3 className="card-title">{item.title}</h3>}
                {item.label && <p className="mt-2 text-base text-[#51d4d6]">{item.label}</p>}
                {item.description && <p className="card-content">{item.description}</p>}
                {item.link && <LinkButton link={item.link} className="self-start mt-4 inline-flex items-center text-[#51d4d6]" />}
              </div>
            ))}
          </div>
        )}
        {(section.ctaText || section.cta) && (
          <div className="w-full flex flex-col items-center gap-8 mt-12">
            {section.ctaText && <p className="gap-subtitle max-w-3xl text-center">{section.ctaText}</p>}
            <LinkButton link={section.cta} />
          </div>
        )}
      </div>
    </section>
  );
}
