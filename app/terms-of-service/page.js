export const metadata = {
  title: "Terms of Service | Gap Recruitment Services",
  description:
    "Review our Terms of Service to understand the rules and conditions for using our recruitment, payroll, and outsourcing services.",
  alternates: {
    canonical: "https://gaprecruitment.co.ke/terms-of-service",
  },
icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Terms of Service | Gap Recruitment Services",
    description:
      "Understand the terms and conditions that govern your use of our HR services, including recruitment, payroll, and outsourcing.",
    url: "https://gaprecruitment.co.ke/terms-of-service",
    siteName: "Gap Recruitment Services",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Gap Recruitment Services",
    description:
      "By using our services, you agree to these terms. Review them to stay informed about your rights and responsibilities.",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Terms of Service",
    "Gap Recruitment Services",
    "Recruitment services",
    "Payroll services",
    "Outsourcing services",
    "HR consulting",
    "Kenya recruitment",
    "HR policies",
  ],
};

export function generateTermsOfServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    url: "https://gaprecruitment.co.ke/terms-of-service",
    mainEntity: {
      "@type": "CreativeWork",
      name: "Terms of Service",
      description:
        "These Terms of Service govern your use of recruitment, payroll, and outsourcing solutions provided by YourCompanyName.",
    },
    publisher: {
      "@type": "Organization",
      name: "Gap Recruitment Services Limited",
      url: "https://gaprecruitment.co.ke",
      logo: {
        "@type": "ImageObject",
        url: "https://gaprecruitment.co.ke/logo.png",
      },
    },
  };
}

export default function TermsOfService() {
  return (
    <>
      <script
        type="application/ld+json"
        id="tos-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateTermsOfServiceSchema()),
        }}
      />
      <section className="mt-24 py-16 w-screen px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="bg-transparent text-gray-300 container">
          <h1 className="text-white/90 text-4xl font-bold mb-8">
            Terms of Service
          </h1>

          <p className="mb-6">
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the website, platforms, and services provided by{" "}
            <span className="text-[#51D4D6] font-medium">
              Gap Recruitment Services Limited
            </span>{" "}
            (&quot;the Company&quot;, &quot;we&quot;, or &quot;us&quot;), a
            licensed recruitment and human resource consulting firm registered
            and operating under the Laws of the Republic of Kenya. By engaging
            with our services or visiting our platform, you agree to these Terms
            in full. If you do not accept these Terms, you must refrain from
            using our services.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            1. Introduction and Scope
          </h2>
          <p className="mb-6">
            These Terms apply to all users of our services, including corporate
            clients, candidates, third-party service providers, and visitors of
            our digital platforms. The services offered include, but are not
            limited to, recruitment services, executive search, staff
            outsourcing, payroll processing, job advertisement and listing,
            employee vetting, and HR advisory services.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            2. Eligibility
          </h2>
          <p className="mb-6">
            To use our services, you must be at least 18 years of age or the
            legal working age as defined under Kenyan law. If you are acting on
            behalf of an organization, you represent and warrant that you have
            the authority to bind that organization to these Terms.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            3. Our Responsibilities
          </h2>
          <p className="mb-6">
            We strive to maintain high standards of professionalism, ethics, and
            compliance. Our role includes vetting and presenting qualified
            candidates to clients, processing payroll accurately and
            confidentially, and ensuring outsourced employees are managed in
            compliance with Kenyan labor laws. We do not guarantee employment to
            candidates, nor do we guarantee results to clients.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            4. Client Obligations
          </h2>
          <p className="mb-6">
            Corporate clients agree to:
            <ul className="list-disc list-inside mt-2">
              <li>
                Provide complete and accurate job descriptions, qualifications,
                and company information.
              </li>
              <li>
                Comply with all applicable labor, tax, and employment laws of
                Kenya when engaging talent.
              </li>
              <li>
                Pay service fees as agreed in formal contracts or engagement
                letters.
              </li>
              <li>
                Maintain professional conduct and refrain from unlawful or
                discriminatory hiring practices.
              </li>
            </ul>
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            5. Candidate Expectations
          </h2>
          <p className="mb-6">
            Candidates are expected to:
            <ul className="list-disc list-inside mt-2">
              <li>
                Provide truthful, up-to-date, and verifiable information in CVs
                and interviews.
              </li>
              <li>
                Maintain professionalism in all communications with potential
                employers.
              </li>
              <li>
                Comply with any applicable employment obligations once placed.
              </li>
              <li>
                Refrain from engaging in fraudulent behavior or
                misrepresentation.
              </li>
            </ul>
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            6. Data Protection and Confidentiality
          </h2>
          <p className="mb-6">
            We adhere to the{" "}
            <span className="text-[#51d4d6] font-semibold">
              Data Protection Act, 2019
            </span>{" "}
            (Kenya). Any personal or company data collected is processed
            lawfully, transparently, and for a legitimate purpose. Data shared
            with us during recruitment or outsourcing engagements is
            confidential and shall only be used for the intended business
            transaction unless otherwise required by law.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            7. Intellectual Property
          </h2>
          <p className="mb-6">
            All intellectual property on our website—including our logo, service
            marks, business methods, original content, and documentation—is
            owned or licensed by the Company. Unauthorized reproduction, use, or
            distribution of any material without prior written consent is
            strictly prohibited and may result in legal action.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            8. Limitations of Liability
          </h2>
          <p className="mb-6">
            To the extent permitted by law, the Company shall not be liable for
            any indirect, special, incidental, or consequential damages arising
            from your use of our services, including but not limited to job
            mismatch, delayed payroll processing, reputational loss, or contract
            termination. We provide our services on an &quot;as-is&quot; basis
            without warranties of any kind.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            9. Payment and Fees
          </h2>
          <p className="mb-6">
            All payments for recruitment, outsourcing, or consultancy services
            are subject to the terms agreed in official proposals or contracts.
            Late payments may incur penalties. The Company reserves the right to
            withhold services or documentation until all fees are settled in
            full.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            10. Termination and Suspension
          </h2>
          <p className="mb-6">
            We may terminate or suspend your access to our services at any time
            without notice if you breach these Terms, fail to meet payment
            obligations, or engage in unlawful conduct. You may also terminate
            service engagements by giving written notice, subject to agreed
            terms and notice periods.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            11. Governing Law and Jurisdiction
          </h2>
          <p className="mb-6">
            These Terms shall be governed by the laws of the Republic of Kenya.
            Any disputes arising in connection with these Terms shall be subject
            to the exclusive jurisdiction of the courts of Kenya, and parties
            hereby irrevocably submit to that jurisdiction.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            12. Amendments
          </h2>
          <p className="mb-6">
            We may revise these Terms from time to time at our sole discretion.
            Updates will be published on our official website, and it is your
            responsibility to review them periodically. Continued use of our
            services constitutes acceptance of any modifications.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            13. Contact Information
          </h2>
          <p className="mb-6">
            For further clarification or legal inquiries, you may contact our
            Compliance and Legal Affairs department at:
          </p>
          <p className="text-[#51d4d6] font-medium">
            legal@gaprecruitment.co.ke
          </p>
        </div>
      </section>
    </>
  );
}
