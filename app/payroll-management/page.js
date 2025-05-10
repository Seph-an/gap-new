import HeroSection from "../../components/Payroll/HeroSection";
import Benefits from "../../components/Payroll/Benefits";
import Services from "../../components/Payroll/Services";
import Process from "../../components/Payroll/Process";

export const metadata = {
  title: "Payroll Management Services in Kenya & East Africa | Gap Recruitment",
  description:
    "Streamline your payroll processes with expert payroll management services tailored for businesses in Kenya and East Africa. We ensure compliance, accuracy, and timely salary processing.",
icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  keywords: [
    "Payroll management Kenya",
    "Outsourced payroll East Africa",
    "Payroll services Nairobi",
    "Tax compliance Kenya",
    "Salary processing",
    "HR and payroll services",
    "Payroll outsourcing Kenya",
    "Kenya payroll companies",
    "Employee payslip generation",
    "Payroll experts in Nairobi",
    "African payroll solutions",
    "Payroll processing Rwanda",
    "Payroll compliance Tanzania",
    "Payroll support Uganda",
    "Multi-country payroll services",
    "Kenya payroll tax",
    "Benefits administration Kenya",
    "HR and payroll outsourcing East Africa",
    "Affordable payroll services",
    "SME payroll management Kenya",
    "Corporate payroll solutions",
    "Monthly payroll management",
    "Custom payroll software East Africa",
    "Payroll reporting services",
    "Efficient payroll for businesses Kenya",
  ],
  openGraph: {
    title: "Payroll Management Services in Kenya & East Africa",
    description:
      "Outsource your payroll with Gap Recruitment Services and enjoy compliance, accuracy, and stress-free salary processing across East Africa.",
    url: "https://gaprecruitment.co.ke/payroll-management",
    siteName: "Gap Recruitment Services",
    images: [
      {
        url: "https://gaprecruitment.co.ke/assets/payroll-management-solutions-for-successfull-businesses.svg",
        width: 1200,
        height: 630,
        alt: "Payroll Management Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payroll Management Services in Kenya & East Africa",
    description:
      "Professional payroll services for businesses in Kenya and East Africa. Ensure timely salary processing and compliance with local laws.",
    images: [
      "https://gaprecruitment.co.ke/assets/payroll-management-solutions-for-successfull-businesses.svg",
    ],
  },
  alternates: {
    canonical: "https://gaprecruitment.co.ke/payroll-management",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generatePayrollSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Gap Recruitment Services",
    url: "https://gaprecruitment.co.ke",
    logo: "https://gaprecruitment.co.ke/logo.png",
    description:
      "Professional payroll management services in Kenya and East Africa. We ensure accurate salary processing, statutory compliance, and secure payroll systems.",
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
      name: "Payroll Management Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Payroll Processing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tax Compliance & Reporting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Employee Benefits Management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Payslip Generation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Multi-Country Payroll Support",
          },
        },
      ],
    },
  };
}

export default function PayrollPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePayrollSchema()),
        }}
      />
      <HeroSection />
      <Benefits />
      <Process />
      <Services />
    </main>
  );
}
