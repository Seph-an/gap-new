import Hero from "../components/Home/Hero";
import Why from "../components/Home/Why";
import Services from "../components/Home/Services";
import FeaturedBlogs from "../components/Blog/Featured/FeaturedBlogs";

export const metadata = {
  title:
    "Recruitment & Payroll Services in Kenya | Top HR & Outsourcing Firm in Africa",
  description:
    "Trusted recruitment agency in Kenya offering expert staffing, payroll management, and staff outsourcing services across Africa. Find top talent, streamline HR, and grow your business with our end-to-end workforce solutions.",
  keywords: [
    "recruitment agency Kenya",
    "payroll services Kenya",
    "HR outsourcing Africa",
    "staff outsourcing Kenya",
    "staffing solutions Nairobi",
    "workforce management Africa",
    "talent acquisition Kenya",
    "employment agency Kenya",
    "HR services East Africa",
    "contract staffing Kenya",
  ],
  openGraph: {
    title:
      "Recruitment & Payroll Services in Kenya | Top HR & Outsourcing Firm in Africa",
    description:
      "Leading recruitment agency in Kenya for payroll processing, staffing, and workforce outsourcing solutions. Serving businesses across East and Sub-Saharan Africa.",
    url: "https://www.gaprecruitment.co.ke",
    siteName: "Gap Recruitment Services",
    images: [
      {
        url: "https://www.gaprecruitment.co.ke/assets/find-a-job-with-expert-cv-writing-linkedin-optimization-and-interview-preparation-services-in-kenya.svg",
        width: 1200,
        height: 630,
        alt: "HR & Payroll Outsourcing in Kenya",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Recruitment & Payroll Services in Kenya | Top HR & Outsourcing Firm in Africa",
    description:
      "Streamline your HR and payroll with Kenya's top recruitment and outsourcing agency. Serving East Africa and beyond.",
    images: [
      "https://gaprecruitment.co.ke/assets/find-a-job-with-expert-cv-writing-linkedin-optimization-and-interview-preparation-services-in-kenya.svg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export function generateHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gap Recruitment Services",
    url: "https://www.gaprecruitment.co.ke",
    logo: "https://www.gaprecruitment.co.ke/logo.png",
    description:
      "Leading recruitment and HR outsourcing agency in Kenya providing payroll management, contract staffing, and workforce solutions across Africa.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Suite A104 Madonna House Annex, Westlands Road",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "1004 - 00606, Sarit Centre",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-784-155-512",
      contactType: "Customer Service",
      areaServed: ["KE", "UG", "TZ", "NG", "ZA"],
      availableLanguage: ["English", "Swahili"],
    },
    sameAs: [
      "https://www.linkedin.com/company/gaprecruitmentserviceslimited/",
      "https://www.facebook.com/share/18jZ4dS8k2/",
      "https://www.instagram.com/gap_recruitment",
      "https://x.com/GapLimited",
    ],
  };
}

export default function Home() {
  return (
    <>
	  <script
        	type="application/ld+json"
	        strategy="afterInteractive"
        	dangerouslySetInnerHTML={{
	        __html: JSON.stringify(generateHomeSchema()),
	        }}
      	/>
      <div>
	<Hero />
	<Why />
	<Services />
	<FeaturedBlogs/>
      </div>
    </>
  );
}

