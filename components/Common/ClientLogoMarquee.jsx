'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { imageUrl } from '@/lib/cms/strapi';

export default function ClientLogoMarquee({ logos = [] }) {
  const validLogos = logos.filter((item) => item?.logo?.url && item?.tag);
  if (!validLogos.length) return null;

  return (
    <div aria-label="Organizations that trust Gap Recruitment Services" className="mt-12 w-full">
        <Marquee autoFill pauseOnHover gradient={false} speed={35} className="overflow-hidden rounded-xl bg-white py-4">
          {validLogos.map((item) => (
            <div key={item.id || item.logo.id} className="mx-6 flex h-20 w-40 shrink-0 items-center justify-center">
              <Image
                src={imageUrl(item.logo.url)}
                alt={item.logo.alternativeText || item.tag}
                width={item.logo.width || 150}
                height={item.logo.height || 80}
                sizes="150px"
                className="max-h-16 w-auto max-w-[150px] object-contain"
              />
            </div>
          ))}
        </Marquee>
    </div>
  );
}
