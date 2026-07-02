import HeroSection from "../../components/About/HeroSection";
import MissionVisionSection from "../../components/About/MissionVisionSection";
import CoreValuesSection from "../../components/About/CoreValuesSection";

export const metadata = {
  title: "Gap Recruitment Services Kenya | About Our Recruitment Agency in Kenya",
  description:
    "Gap Recruitment Services Kenya connects employers with qualified talent and supports job seekers with verified vacancies, recruitment services, and career opportunities.",
icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  keywords: [
    "About recruitment company",
    "HR outsourcing firm",
    "Payroll service provider",
    "Recruitment experts Africa",
    "Our story HR solutions",
  ],
  alternates: {
    canonical: "https://gaprecruitment.co.ke/about-us",
  },
  openGraph: {
    title: "Gap Recruitment Services Kenya | About Our Recruitment Agency in Kenya",
    description:
      "Learn how Gap Recruitment Services Kenya supports employers, job seekers, and growing teams through recruitment, payroll management, and staff outsourcing.",
    url: "https://gaprecruitment.co.ke/about-us",
    siteName: "Gap Recruitment Services",
    type: "website",
    images: [
      {
        url: "https://gaprecruitment.co.ke/assets/outsourcing-staff-for-efficiency-and-speed.svg",
        width: 1200,
        height: 630,
        alt: "Gap Recruitment Services Kenya recruitment agency support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gap Recruitment Services Kenya | About Our Recruitment Agency in Kenya",
    description:
      "Learn how Gap Recruitment Services Kenya supports employers, job seekers, and growing teams through recruitment services in Kenya.",
    images: [
      "https://gaprecruitment.co.ke/assets/outsourcing-staff-for-efficiency-and-speed.svg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us",
    description:
      "Gap Recruitment Services Kenya connects employers with qualified talent and supports job seekers with verified vacancies, recruitment services, and career opportunities.",
    url: "https://gaprecruitment.co.ke/about-us",
    mainEntity: {
      "@type": "Organization",
      name: "Gap Recruitment Services Kenya",
      url: "https://gaprecruitment.co.ke",
      logo: "https://gaprecruitment.co.ke/logo.png",
      foundingDate: "2020-04-01",
      founders: [
        {
          "@type": "Person",
          name: "Carolyne Wangari Kariuki",
        },
      ],
      sameAs: [
      "https://www.linkedin.com/company/gaprecruitmentserviceslimited/",
      "https://www.facebook.com/share/18jZ4dS8k2/",
      "https://www.instagram.com/gap_recruitment",
      "https://x.com/GapLimited",
    ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite A104, Madonna House Annex",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        postalCode: "1004-00606, Sarit Centre",
        addressCountry: "KE",
      },
    },
  };
}

const AboutUsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAboutPageSchema()),
        }}
      />
      <HeroSection />
      <MissionVisionSection />
      <CoreValuesSection />
    </>
  );
};

export default AboutUsPage;
