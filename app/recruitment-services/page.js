import HeroSection from "../../components/Recruitment/HeroSection";
import Benefits from "../../components/Recruitment/Benefits";
import Process from "../../components/Recruitment/Process";
import Services from "../../components/Recruitment/Services";
import InternationalBanner from "../../components/Recruitment/InternationalBanner";

export const metadata = {
  title:
    "Leading Recruitment Agency in Nairobi, Kenya | Gap Recruitment Services Limited",
  description:
    "Looking to find best talent? As a premier recruitment company in Nairobi, we provide compliant, tailored workforce solutions across Kenya & Africa. Request a consult.",
icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  keywords: [
    "recruitment services Kenya",
    "staffing Nairobi",
    "executive search East Africa",
    "talent acquisition Kenya",
    "HR outsourcing Kenya",
    "Kenyan recruitment agency",
  ],
  openGraph: {
    title: "Leading Recruitment Agency in Nairobi, Kenya | Gap Recruitment Services Limited",
    description:
      "Looking to find best talent? As a premier recruitment company in Nairobi, we provide compliant, tailored workforce solutions across Kenya & Africa. Request a consult.",
    url: "https://gaprecruitment.co.ke/recruitment-services",
    siteName: "Gap Recruitment Services Limited",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://gaprecruitment.co.ke/assets/hire-best-talent-with-our-expert-recruitment-services-in-nairobi.svg",
    ],
    title: "Leading Recruitment Agency in Nairobi, Kenya | Gap Recruitment Services Limited",
    description:
      "Looking to find best talent? As a premier recruitment company in Nairobi, we provide compliant, tailored workforce solutions across Kenya & Africa. Request a consult.",
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
  name: "Gap Recruitment Services Limited",
  url: "https://gaprecruitment.co.ke",
  logo: "https://gaprecruitment.co.ke/logo.png",
  description:
    "Looking to find best talent? As a premier recruitment company in Nairobi, we provide compliant, tailored workforce solutions across Kenya & Africa. Request a consult.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite A104 Madonna House Annex, Westlands Road",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [
      "https://www.linkedin.com/company/gaprecruitmentserviceslimited/",
      "https://www.facebook.com/share/18jZ4dS8k2/",
      "https://www.instagram.com/gap_recruitment",
      "https://x.com/GapLimited",
    ],
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
      <InternationalBanner />
    </main>
  );
}
