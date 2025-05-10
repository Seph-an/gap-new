import HeroSection from "../../components/Outsourcing/HeroSection";
import Benefits from "../../components/Outsourcing/Benefits";
import Process from "../../components/Outsourcing/Process";
import Services from "../../components/Outsourcing/Services";

export const metadata = {
  title:
    "Staff Outsourcing Services in Kenya & East Africa | Gap Recruitment Services",
  description:
    "Reliable staff outsourcing services tailored for businesses in Kenya and East Africa. Scale your workforce with flexibility, compliance, and expert management.",
icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  keywords: [
    "Staff outsourcing Kenya",
    "Outsourced staffing East Africa",
    "Workforce solutions Nairobi",
    "Kenya outsourcing company",
    "Temporary staff Kenya",
    "Contract staffing services",
    "Third-party staffing Kenya",
    "Flexible staffing Nairobi",
    "HR outsourcing East Africa",
    "Hire outsourced staff Kenya",
    "Kenya manpower agency",
    "Payroll and staffing services",
    "HR outsourcing services Nairobi",
    "Outsourced HR Kenya",
    "East Africa staff solutions",
    "On-demand staffing Kenya",
    "Labor outsourcing firm Kenya",
    "Gig staffing Nairobi",
    "Cost-effective workforce Kenya",
    "Outsource employees East Africa",
    "Managed staffing services",
    "Recruitment and outsourcing Kenya",
    "Kenya BPO staffing",
    "Kenya contingent workforce",
    "HR compliance outsourcing",
  ],
  openGraph: {
    title: "Staff Outsourcing Services in Kenya & East Africa",
    description:
      "Scale your workforce efficiently with Gap Recruitment&rsquo;s expert staff outsourcing services in Kenya and East Africa.",
    url: "https://gaprecruitment.co.ke/staff-outsourcing",
    siteName: "Gap Recruitment Services",
    images: [
      {
        url: "https://gaprecruitment.co.ke/assets/outsourcing-staff-for-efficiency-and-speed-in-nairobi.svg",
        width: 1200,
        height: 630,
        alt: "Staff Outsourcing Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Staff Outsourcing Services in Kenya & East Africa",
    description:
      "Professional staff outsourcing solutions for East African businesses. Enjoy flexibility, compliance, and cost-efficiency with Gap Recruitment.",
    images: [
      "https://gaprecruitment.co.ke/assets/outsourcing-staff-for-efficiency-and-speed-in-nairobi.svg",
    ],
  },
  alternates: {
    canonical: "https://gaprecruitment.co.ke/staff-outsourcing",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateOutsourcingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Gap Recruitment Services",
    url: "https://gaprecruitment.co.ke",
    logo: "https://gaprecruitment.co.ke/logo.png",
    description:
      "Staff outsourcing services in Kenya and East Africa. Flexible, scalable, and compliant workforce solutions tailored to your business needs.",
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
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Country", name: "Rwanda" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Staff Outsourcing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Temporary & Contract Staffing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Managed Staffing Services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Process Outsourcing (BPO)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "On-Demand Workforce Solutions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Offshore Outsourcing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT and Tech Outsourcing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Onshore and Nearshore Outsourcing",
          },
        },
      ],
    },
  };
}

export default function OutsourcingPage() {
  return (
    <main>
      <script
        id="ld-json-org"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOutsourcingSchema()),
        }}
      />
      <HeroSection />
      <Benefits />
      <Process />
      <Services />
    </main>
  );
}
