export const metadata = {
  title: "Cookie Policy | Gap Recruitment Services",
  description:
    "Learn how YourCompanyName uses cookies to enhance your experience on our recruitment, payroll, and outsourcing service platform.",
  alternates: {
    canonical: "https://gaprecruitment.co.ke/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Gap Recruitment Services",
    description:
      "Understand our use of cookies, data collection, and tracking practices related to our HR and outsourcing services.",
    url: "https://gaprecruitment.co.ke/cookie-policy",
    siteName: "Gap Recruitment Services",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy | Gap Recruitment Services",
    description:
      "We use cookies to personalize your experience and analyze traffic. Learn more about how we handle your data.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateCookiePolicySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cookie Policy",
    url: "https://gaprecruitment.co.ke/cookie-policy",
    mainEntity: {
      "@type": "CreativeWork",
      name: "Cookie Policy",
      description:
        "This Cookie Policy explains how YourCompanyName uses cookies and tracking technologies on our recruitment, payroll, and outsourcing services website.",
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

export default function CookiePolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCookiePolicySchema()),
        }}
      />
      <section className="mt-24 py-16 w-screen px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="bg-transparent text-gray-300 container">
          <h1 className="text-white/90 text-4xl font-bold mb-8">
            Cookie Policy
          </h1>

          <p className="mb-6">
            This Cookie Policy explains how{" "}
            <span className="text-[#51D4D6]">
              Gap Recruitment Services Limited
            </span>{" "}
            ("we", "our", or "us"), a recruitment and HR consultancy firm
            governed by the Laws of Kenya, uses cookies and similar tracking
            technologies on our digital platforms. By using our website, you
            consent to our use of cookies as described herein.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            1. What Are Cookies?
          </h2>
          <p className="mb-6">
            Cookies are small text files stored on your device by websites you
            visit. They help improve user experience by remembering preferences,
            enabling functionality, and supporting analytics.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            2. Types of Cookies We Use
          </h2>
          <p className="mb-6">
            We use the following types of cookies:
            <ul className="list-disc list-inside mt-2">
              <li>
                <span className="text-[#51d4d6] font-semibold">
                  Essential Cookies:
                </span>{" "}
                Necessary for the website to function properly (e.g., security,
                session management).
              </li>
              <li>
                <span className="text-[#51d4d6] font-semibold">
                  Performance Cookies:
                </span>{" "}
                Help us understand how users interact with our site by
                collecting usage data anonymously.
              </li>
              <li>
                <span className="text-[#51d4d6] font-semibold">
                  Functionality Cookies:
                </span>{" "}
                Remember user preferences to provide enhanced features and
                personalization.
              </li>
              <li>
                <span className="text-[#51d4d6] font-semibold">
                  Third-Party Cookies:
                </span>{" "}
                Set by external providers such as analytics or advertising
                services.
              </li>
            </ul>
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            3. How We Use Cookies
          </h2>
          <p className="mb-6">
            We use cookies to:
            <ul className="list-disc list-inside mt-2">
              <li>Facilitate secure login sessions</li>
              <li>Monitor site performance and troubleshoot issues</li>
              <li>
                Analyze website traffic and improve our digital experience
              </li>
              <li>Deliver content tailored to user preferences</li>
            </ul>
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            4. Managing Cookies
          </h2>
          <p className="mb-6">
            You can manage or disable cookies through your browser settings.
            Please note that disabling certain cookies may affect site
            functionality. Instructions for cookie management can be found in
            your browser’s help section.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            5. Third-Party Services
          </h2>
          <p className="mb-6">
            Some cookies may be placed by third-party tools we integrate, such
            as Google Analytics or social media plugins. These providers may
            collect data in accordance with their own privacy policies.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            6. Consent and Updates
          </h2>
          <p className="mb-6">
            Upon visiting our website, you will be presented with a cookie
            banner requesting your consent. You may update your preferences at
            any time. We reserve the right to amend this policy and will update
            the effective date accordingly.
          </p>

          <h2 className="text-white/90 text-2xl font-semibold mt-10 mb-4">
            7. Contact Information
          </h2>
          <p className="mb-6">
            If you have questions or concerns about our use of cookies, please
            contact us at:
          </p>
          <p className="text-[#51d4d6] font-medium">
            legal@gaprecruitment.co.ke
          </p>
        </div>
      </section>
    </>
  );
}
