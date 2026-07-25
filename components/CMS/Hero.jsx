import Image from 'next/image';
import { imageUrl } from '@/lib/cms/strapi';
import LinkButton from './LinkButton';

export default function CMSHero({ hero, dark = true }) {
  if (!hero) return null;
  return (
    <section className={`relative ${dark ? 'section-dark' : 'section-light'}`}>
      {hero.backgroundImage?.src && (
        <>
          <Image src={imageUrl(hero.backgroundImage.src)} alt={hero.backgroundImage.alt} fill sizes="100vw" className="absolute inset-0 z-5 object-cover" />
          <div className="absolute inset-0 bg-black/90 z-10" />
        </>
      )}
      <div className="container hero-container relative z-30 mt-16 lg:mt-20">
        <div className="max-w-2xl text-center lg:text-left">
          {hero.eyebrow && <p className="text-[#51D4D6] font-semibold mb-4">{hero.eyebrow}</p>}
          <h1 className="page-header">{hero.title}</h1>
          {hero.subtitle && <p className="page-subheader mt-6">{hero.subtitle}</p>}
          {hero.ctas?.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {hero.ctas.map((cta) => <LinkButton key={`${cta.label}-${cta.url}`} link={cta} />)}
            </div>
          )}
        </div>
        {hero.image?.src && (
          <div className="w-full max-w-md lg:max-w-lg">
            <Image src={imageUrl(hero.image.src)} alt={hero.image.alt} width={hero.image.width || 400} height={hero.image.height || 300} sizes="(max-width: 600px) 100%, (max-width: 1200px) 500px, 33vw" className="mx-auto w-full h-auto" />
          </div>
        )}
      </div>
    </section>
  );
}
