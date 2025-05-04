import HeroSection from "../../components/Jobseekers/HeroSection";
import SocialProofSection from "../../components/Jobseekers/SocialProofSection";
import TestimonialsSection from "../../components/Jobseekers/TestimonialsSection";

export const metadata = {
  title:
    "CV Writing, LinkedIn Optimization & Interview Prep Services | Kenya & East Africa",
  description:
    "Empower your career with expert CV writing, LinkedIn profile optimization, and interview preparation services. Tailored for job seekers across Kenya and East Africa.",
  keywords: [
    "CV writing services Kenya",
    "LinkedIn optimization Kenya",
    "interview coaching Kenya",
    "job seeker support East Africa",
    "professional resume writing Nairobi",
    "career services Kenya",
    "employment agency Nairobi",
    "job hunting assistance Kenya",
    "CV review East Africa",
    "interview preparation services",
  ],
  alternates: {
    canonical: "https://gaprecruitment.co.ke/jobseekers",
  },
  openGraph: {
    title: "CV Writing, LinkedIn & Interview Coaching for Job Seekers | Kenya",
    description:
      "Stand out in the job market with our career services tailored to job seekers in Kenya and East Africa.",
    url: "https://gaprecruitment.co.ke/jobseekers",
    siteName: "Gap Recruitment Services",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://gaprecruitment.co.ke/assets/find-a-job-with-expert-cv-writing-linkedin-optimization-and-interview-preparation-services-in-kenya.svg",
    ],
    title: "Career Growth for Job Seekers | CV, LinkedIn & Interview Prep",
    description:
      "Boost your job search with CV writing, LinkedIn profile optimization, and interview coaching services across Kenya and East Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateJobSeekerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "Gap Recruitment Services",
    url: "https://gaprecruitment.co.ke/jobseekers",
    logo: "https://gaprecruitment.co.ke/logo.png",
    description:
      "Gap Recruitment Services empowers job seekers in Kenya and East Africa through professional CV writing, LinkedIn profile optimization, and expert interview preparation services.",
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
    address: {
      "@type": "PostalAddress",
      streetAddress: "Suite A104 Madonna House Annex, Westlands Road",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Job Seeker Support Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CV Writing Services",
            description:
              "Professionally crafted CVs tailored to showcase your strengths and land interviews.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "LinkedIn Profile Optimization",
            description:
              "Enhance your online presence and attract employers with a compelling LinkedIn profile.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interview Preparation",
            description:
              "Master interviews with coaching sessions, mock interviews, and expert tips.",
          },
        },
      ],
    },
  };
}

const Jobseekers = () => {
  return (
    <>
      <script
        id="ld-json-job-seeker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJobSeekerSchema()),
        }}
      />
      <div>
        <HeroSection />
        <SocialProofSection />
        <TestimonialsSection />
      </div>
    </>
  );
};

export default Jobseekers;
