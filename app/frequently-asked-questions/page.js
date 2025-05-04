import HeroSection from "../../components/FAQs/HeroSection";
import FAQSection from "../../components/FAQs/FAQSection";
import { faqs } from "@/components/FAQs/faqs";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | Gap Recruitment Services",
  keywords: [
    "FAQ recruitment company",
    "FAQ recruitment company in Nairobi",
    "FAQ recruitment company in Kenya",
    "FAQ recruitment company in Africa",
    "FAQ recruitment company in Uganda, Tanzania and Rwanda",
    "FAQ recruitment company in East Africa",
    "Payroll services FAQ",
    "Find best talent FAQ",
    "HR outsourcing FAQ",
    "Business staffing solutions FAQ",
  ],
  description:
    "Find answers to common questions about our recruitment, payroll, and outsourcing services. Learn how YourCompanyName supports businesses like yours.",
  alternates: {
    canonical: "https://gaprecruitment.co.ke/frequently-asked-questions",
  },
  openGraph: {
    title: "FAQ | Gap Recruitment Services",
    description:
      "Got questions? We’ve answered the most common ones about our recruitment, payroll, and outsourcing services.",
    url: "https://gaprecruitment.co.ke/frequently-asked-questions",
    siteName: "Gap Recruitment Services",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://gaprecruitment.co.ke/assets/frequently-asked-questions-about-recruitment-payroll-staff-outsourcing-solutions-in-nairobi-kenya.svg",
    ],
    title: "FAQ | Gap Recruitment Services",
    description:
      "Your top questions answered: Learn more about our HR and business support services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function FAQPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        id="faq-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />
      <HeroSection />
      <FAQSection />
    </main>
  );
}
