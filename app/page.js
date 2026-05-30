import Hero from "../components/Home/Hero";
import Why from "../components/Home/Why";
import Services from "../components/Home/Services";
import FeaturedBlogs from "../components/Blog/Featured/FeaturedBlogs";

export const metadata = {
  title:
    "Top Recruitment Company in Kenya | Gap Recruitment Services",
  description:
    "Build an elite workforce. Gap Recruitment engineers executive search, permanent placement, and cross-border teams for organizations venturing into or already in Kenya.",
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
      "Top Recruitment Company in Kenya | Gap Recruitment Services",
    description:
      "Build an elite workforce. Gap Recruitment engineers executive search, permanent placement, and cross-border teams for organizations venturing into or already in Kenya.",
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
      "Top Recruitment Company in Kenya | Gap Recruitment Services",
    description:
      "Build an elite workforce. Gap Recruitment engineers executive search, permanent placement, and cross-border teams for organizations venturing into or already in Kenya.",
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

