export const metadata = {
  title: "Privacy Policy | Gap Recruitment Services",
  description:
    "Read our privacy policy to learn how we collect, use, and protect your data across our recruitment, payroll, and outsourcing services.",
  alternates: {
    canonical: "https://gaprecruitment.co.ke/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Gap Recruitment Services",
    description:
      "Your data privacy matters. Learn how we handle your information across all our HR services.",
    url: "https://gaprecruitment.co.ke/privacy-policy",
    siteName: "Gap Recruitment Services",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Gap Recruitment Services",
    description:
      "We take your data privacy seriously. Review our privacy practices here.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generatePrivacyPolicySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "Privacy Policy",
    url: "https://gaprecruitment.co.ke/privacy-policy",
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

export default function PrivacyPolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePrivacyPolicySchema()),
        }}
      />
      <section className="mt-24 py-16 w-screen px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="bg-transparent text-gray-300 container">
          <h1 className="text-white/90 text-4xl font-bold mb-8">
            Privacy Policy
          </h1>

          <p className="mb-6">
            This Privacy Policy outlines how{" "}
            <span className="text-[#51D4D6]">
              Gap Recruitment Services Limited
            </span>{" "}
            (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), a licensed
            recruitment and HR consulting firm operating under the Laws of the
            Republic of Kenya, collects, uses, discloses, and protects your
            personal data. By interacting with our services, you consent to the
            practices described herein.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            1. Legal Basis and Compliance
          </h2>
          <p className="mb-6">
            We adhere strictly to the{" "}
            <span className="text-[#51d4d6] font-semibold">
              Data Protection Act, 2019 (Kenya)
            </span>
            . All data processing activities are carried out lawfully, fairly,
            and transparently for legitimate business and operational purposes.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            2. Data We Collect
          </h2>
          <p className="mb-6">
            The personal data we collect may include:
            <ul className="list-disc list-inside mt-2">
              <li>Identification details (e.g., name, ID/passport number)</li>
              <li>Contact information (e.g., phone number, email address)</li>
              <li>Curriculum Vitae and employment history</li>
              <li>Payment and tax details (for payroll services)</li>
              <li>Company information (for clients)</li>
              <li>Digital identifiers (e.g., IP address, cookies)</li>
            </ul>
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            3. Purpose of Data Use
          </h2>
          <p className="mb-6">
            We process personal data for the following reasons:
            <ul className="list-disc list-inside mt-2">
              <li>Recruitment, vetting, and placement of candidates</li>
              <li>Payroll processing and compliance with tax laws</li>
              <li>Contractual engagements and communication with clients</li>
              <li>Improving our digital platforms and analytics</li>
              <li>Legal and regulatory compliance</li>
            </ul>
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            4. Consent
          </h2>
          <p className="mb-6">
            By submitting your data to us, you provide informed and explicit
            consent for the collection and use of your information for the
            purposes stated. You may withdraw your consent at any time in
            writing.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            5. Data Sharing and Disclosure
          </h2>
          <p className="mb-6">
            Your data may be shared with:
            <ul className="list-disc list-inside mt-2">
              <li>Prospective employers or clients (upon consent)</li>
              <li>Regulatory and government agencies when legally obligated</li>
              <li>
                Third-party service providers (e.g., payroll processors, IT
                support)
              </li>
            </ul>
            We ensure all third parties uphold stringent data privacy standards.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            6. Data Security
          </h2>
          <p className="mb-6">
            We employ robust technical and organizational measures to protect
            personal data against unauthorized access, alteration, loss, or
            disclosure. This includes firewalls, encryption, secure storage, and
            access control protocols.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            7. Data Retention
          </h2>
          <p className="mb-6">
            Personal data is retained only for as long as is necessary to
            fulfill the purpose it was collected for or as required by law. When
            no longer needed, data is securely destroyed or anonymized.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            8. Rights of Data Subjects
          </h2>
          <p className="mb-6">
            You have the right to:
            <ul className="list-disc list-inside mt-2">
              <li>Access your personal data</li>
              <li>Request correction or deletion of inaccurate information</li>
              <li>Object to data processing in certain circumstances</li>
              <li>Withdraw consent at any time</li>
              <li>
                Lodge complaints with the Office of the Data Protection
                Commissioner (Kenya)
              </li>
            </ul>
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            9. Cross-border Data Transfers
          </h2>
          <p className="mb-6">
            Where necessary, personal data may be transferred outside Kenya,
            provided appropriate safeguards are in place in compliance with
            applicable data protection laws.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            10. Changes to This Policy
          </h2>
          <p className="mb-6">
            We may revise this Privacy Policy from time to time. Updates will be
            published on our website, and material changes will be communicated
            directly where possible.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            11. Contact Information
          </h2>
          <p className="mb-6">
            For questions, data access requests, or complaints related to data
            protection, please contact us at:
          </p>
          <p className="text-[#51d4d6] font-medium">
            legal@gaprecruitment.co.ke
          </p>
        </div>
      </section>
    </>
  );
}
