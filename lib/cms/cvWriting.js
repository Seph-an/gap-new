import { fetchCMS } from './strapi';

export async function fetchCvWritingData() {
  const [page, careerLevels, packages] = await Promise.all([
    fetchCMS('cv-writing-page', {
      'populate[seo]': '*',
      'populate[breadcrumbs]': '*',
      'populate[hero][populate][benefits]': '*',
      'populate[hero][populate][trustItems]': '*',
      'populate[hero][populate][processSteps]': '*',
      'populate[hero][populate][helpLink]': '*',
      'populate[pricingSection]': '*',
      'populate[pricingNotice][populate][link]': '*',
      'populate[faqSection][populate][faqs]': '*',
      'populate[faqSection][populate][footerCta]': '*',
      'populate[closingCta][populate][trustItems]': '*',
      'populate[closingCta][populate][primaryCta]': '*',
      'populate[closingCta][populate][secondaryCta]': '*',
      'populate[orderPage]': '*',
    }),
    fetchCMS('career-levels', {
      'filters[active][$eq]': 'true',
      'sort[0]': 'sortOrder:asc',
      'pagination[pageSize]': '100',
    }),
    fetchCMS('cv-packages', {
      'filters[active][$eq]': 'true',
      'sort[0]': 'sortOrder:asc',
      'populate[features]': '*',
      'populate[cta]': '*',
      'populate[careerLevels][fields][0]': 'name',
      'populate[careerLevels][fields][1]': 'slug',
      'pagination[pageSize]': '100',
    }),
  ]);

  return {
    page,
    careerLevels: Array.isArray(careerLevels) ? careerLevels : [],
    packages: Array.isArray(packages) ? packages : [],
  };
}
