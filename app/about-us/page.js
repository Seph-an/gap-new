import HeroSection from "../../components/About/HeroSection";
import MissionVisionSection from "../../components/About/MissionVisionSection";
import CoreValuesSection from "../../components/About/CoreValuesSection";

export const metadata = {
  title: "About Us | Recruitment, Payroll & Outsourcing Experts",
  description:
    "Learn more about our mission, values, and team. We specialize in recruitment, payroll, and outsourcing solutions tailored for businesses in Africa and beyond.",
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
    title: "About Us | Recruitment, Payroll & Outsourcing Experts",
    description:
      "Discover our story and meet the team powering your business success through recruitment, payroll, and HR outsourcing.",
    url: "https://gaprecruitment.co.ke/about-us",
    siteName: "Gap Recruitment Services",
    type: "website",
    images: [
      {
        url: "https://gaprecruitment.co.ke/assets/outsourcing-staff-for-efficiency-and-speed.svg",
        width: 1200,
        height: 630,
        alt: "Our HR team at work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Recruitment, Payroll & Outsourcing Experts",
    description:
      "We're dedicated to helping companies thrive through expert HR solutions. Learn more about our journey.",
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
      "Our mission is to empower businesses with expert recruitment, payroll, and outsourcing services. Learn more about our team and story.",
    url: "https://gaprecruitment.co.ke/about-us",
    mainEntity: {
      "@type": "Organization",
      name: "YourCompanyName",
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
