import HeroSection from "../../components/Recruitment/HeroSection";
import Benefits from "../../components/Recruitment/Benefits";
import Process from "../../components/Recruitment/Process";
import Services from "../../components/Recruitment/Services";

export const metadata = {
  title:
    "Recruitment Services in Kenya & East Africa | Gap Recruitment Services",
  description:
    "Find top talent faster with our recruitment services in Kenya and East Africa. From executive search to volume hiring, we deliver results.",
  keywords: [
    "recruitment services Kenya",
    "staffing Nairobi",
    "executive search East Africa",
    "talent acquisition Kenya",
    "HR outsourcing Kenya",
    "Kenyan recruitment agency",
  ],
  openGraph: {
    title: "Recruitment Services in Kenya & East Africa",
    description:
      "Your trusted recruitment partner in Kenya. We offer customized hiring solutions for businesses across East Africa.",
    url: "https://gaprecruitment.co.ke/recruitment-services",
    siteName: "Gap Recruitment Services",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://gaprecruitment.co.ke/assets/hire-best-talent-with-our-expert-recruitment-services-in-nairobi.svg",
    ],
    title: "Recruitment Services in Kenya & East Africa | YourCompanyName",
    description:
      "Find reliable recruitment solutions for your business in Kenya and East Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://gaprecruitment.co.ke/recruitment-services",
  },
};

const recruitmentSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gap Recruitment Services",
  url: "https://gaprecruitment.co.ke",
  logo: "https://gaprecruitment.co.ke/logo.png",
  description:
    "Expert recruitment services in Kenya and East Africa, specializing in executive search, volume hiring, and tailored staffing solutions.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite A104 Madonna House Annex, Westlands Road",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Kenya",
    },
    {
      "@type": "Country",
      name: "Uganda",
    },
    {
      "@type": "Country",
      name: "Tanzania",
    },
    {
      "@type": "Country",
      name: "Rwanda",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Recruitment Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recruitment Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Talent Acquisition",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Executive Search",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gig Staffing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Outsourced Hiring",
        },
      },
    ],
  },
};

export default function RecruitmentPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recruitmentSchema),
        }}
      />
      <HeroSection />
      <Benefits />
      <Process />
      <Services />
    </main>
  );
}
