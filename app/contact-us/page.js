
import CopyableText from "@/components/Common/Copy";

export const metadata = {
  title: "Contact Us | Recruitment, Payroll & Outsourcing Experts",
  description:
    "Get in touch with our team of recruitment, payroll, and outsourcing specialists. We're here to support your business growth with tailored HR solutions.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  keywords: [
    "Contact recruitment company",
    "Contact recruitment company in Nairobi",
    "Contact recruitment company in Kenya",
    "Contact recruitment company in Africa",
    "Contact recruitment company in Uganda, Tanzania and Rwanda",
    "Contact recruitment company in East Africa",
    "Payroll services support",
    "HR outsourcing contact",
    "Get in touch HR experts",
    "Business staffing solutions",
    "Business staffing solutions in Kenya",
    "Business staffing solutions in Africa",
    "Business staffing solutions in Uganda, Tanzania and Rwanda",
    "Business staffing solutions in East Africa",
    "Recruitment and payroll contact",
  ],
  alternates: {
    canonical: "https://gaprecruitment.co.ke/contact-us",
  },
  openGraph: {
    title: "Contact Us | Recruitment, Payroll & Outsourcing Experts",
    description:
      "Connect with our experienced team to discuss your HR needs. Recruitment, payroll, and outsourcing solutions tailored to your business.",
    url: "https://gaprecruitment.co.ke/contact-us",
    siteName: "Gap Recruitment Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Recruitment, Payroll & Outsourcing Experts",
    description:
      "Need HR support? Talk to our recruitment, payroll, and outsourcing experts today.",
    images: [
      "https://gaprecruitment.co.ke/assets/hire-best-talent-with-our-expert-recruitment-services-in-nairobi.svg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description:
      "Contact our team of HR experts for recruitment, payroll, and outsourcing services.",
    url: "https://gaprecruitment.co.ke/contact-us",
    mainEntity: {
      "@type": "Organization",
      name: "Gap Recruitment Services",
      url: "https://gaprecruitment.co.ke",
      logo: "https://gaprecruitment.co.ke/logo.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+254-784-155-512",
          contactType: "Customer Service",
          areaServed: ["KE", "UG", "TZ"],
          availableLanguage: ["English"],
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/yourcompany",
        "https://twitter.com/yourcompany",
      ],
    },
  };
}

export default async function ContactPage() {
  const contactData = {
    title: "Get in Touch",
    description:
      "Reach out to Gap Recruitment for inquiries, support, and partnership opportunities.",
    email: "inquiry@gaprecruitment.co.ke",
    phone1: "+254 - 784 - 155 - 512",
    phone2: "020 - 786 - 2222",
    location:
      "Suite A104, Madonna Hse Annex, Off Westlands Rd., Nairobi, Kenya",
    address: "P.o. box 1004 - 00606 Sarit Centre, Nairobi, Kenya",
    hours: "Monday - Friday : 8 am - 5 pm",
  };

  const {
    title,
    description,
    email,
    phone1,
    phone2,
    location,
    address,
    hours,
  } = contactData;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateContactPageSchema()),
        }}
      />
      <section className="bg-[#0a0a0a] relative min-h-screen flex items-center justify-center py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-6 lg:mt-20">
          {/* Left Column */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-white/90">{title}</h2>
            <p className="mt-2 text-gray-400">{description}</p>
            {/* <InquiryButton /> */}
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-white/90 mb-3">
                Contacts
              </h3>
              <CopyableText text={email} color="[#51D4D6]" />
              <CopyableText text={phone1} color="gray-400" />
              <CopyableText text={phone2} color="gray-400" />
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-white/90 mb-3">
                Location
              </h3>
              <p className="text-gray-400">{location}</p>
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-white/90 mb-3">
                Address
              </h3>
              <p className="text-gray-400">{address}</p>
            </div>
            <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-white/90 mb-3">
                Hours
              </h3>
              <p className="text-gray-400">{hours}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
