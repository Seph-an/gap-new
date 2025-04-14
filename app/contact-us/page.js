import InquiryButton from "@/components/Contact/InquiryButton";
import CopyableText from "@/components/Common/Copy";

// Metadata API (Next.js 13+)
export const metadata = {
  title: "Contact Us | Gap Recruitment & Payroll Services",
  description:
    "Reach out to Gap Recruitment for inquiries, support, and partnership opportunities.",
  openGraph: {
    title: "Contact Us | Gap Recruitment & Payroll Services",
    description:
      "Reach out to Gap Recruitment for inquiries, support, and partnership opportunities.",
    url: "https://www.gaprecruitment.co.ke/contact", // Replace with your actual URL
    siteName: "Gap Recruitment",
  },
};

export default async function ContactPage() {
  // Fetch contact data from Strapi API
  // const res = await fetch(`${process.env.STRAPI_API_URL}/contact-page`);
  // const contactData = await res.json();

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
      <section className="relative min-h-screen flex items-center justify-center py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-6 lg:mt-20">
          {/* Left Column */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-white/90">{title}</h2>
            <p className="mt-2 text-gray-400">{description}</p>
            <InquiryButton />
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

// new with metadata app/contact-us/page.js

// import InquiryButton from "@/components/Contact/InquiryButton";
// import CopyableText from "@/components/Common/Copy";

// Fetch data once and use it for both metadata and page content
// async function getContactPageData() {
//   try {
// const res = await fetch(`${process.env.STRAPI_API_URL}/contact-page`, {
//   next: { revalidate: false },
// });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch contact data: ${res.status}`);
//     }

//     const contactData = await res.json();
//     return contactData;
//   } catch (error) {
//     console.error("Error fetching contact data:", error);
//     return null; // Or a default data object if appropriate
//   }
// }

// Generate metadata using the fetched data
// export async function generateMetadata() {
//   const contactData = await getContactPageData();

//   if (!contactData) {
//     return {
//       title: "Contact Us | Gap Recruitment",
//       description:
//         "Reach out to Gap Recruitment for inquiries, support, and partnership opportunities.",
//       openGraph: {
//         title: "Contact Us | Gap Recruitment",
//         description:
//           "Reach out to Gap Recruitment for inquiries, support, and partnership opportunities.",
//         url: "https://www.gaprecruitment.co.ke/contact",
//         siteName: "Gap Recruitment",
//       },
//     };
//   }

//   return {
//     title: contactData.seoTitle || "Contact Us | Gap Recruitment",
//     description:
//       contactData.seoDescription ||
//       "Reach out to Gap Recruitment for inquiries, support, and partnership opportunities.",
//     openGraph: {
//       title: contactData.seoTitle || "Contact Us | Gap Recruitment",
//       description:
//         contactData.seoDescription ||
//         "Reach out to Gap Recruitment for inquiries, support, and partnership opportunities.",
//       url: "https://www.gaprecruitment.co.ke/contact",
//       siteName: "Gap Recruitment",
//     },
//   };
// }

// export default async function ContactPage() {
//   const contactData = await getContactPageData();

//   if (!contactData) {
//     return (
//       <div>
//         <p>Error loading contact information. Please try again later.</p>
//       </div>
//     );
//   }

//   const { title, description, email, phone1, phone2, location, address, hours } =
//     contactData;

//   return (
//     <>
//       <section className="relative min-h-screen flex items-center justify-center py-16 px-6 md:px-16">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-6 lg:mt-20">
//           {/* Left Column */}
//           <div className="md:w-1/3">
//             <h2 className="text-3xl font-bold text-white/90">{title}</h2>
//             <p className="mt-2 text-gray-400">{description}</p>
//             <InquiryButton />
//           </div>

//           {/* Right Column */}
//           <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold text-white/90 mb-3">
//                 Contacts
//               </h3>
//               <CopyableText text={email} color="[#51D4D6]" />
//               <CopyableText text={phone1} color="gray-400" />
//               <CopyableText text={phone2} color="gray-400" />
//             </div>
//             <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold text-white/90 mb-3">
//                 Location
//               </h3>
//               <p className="text-gray-400">{location}</p>
//             </div>
//             <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold text-white/90 mb-3">
//                 Address
//               </h3>
//               <p className="text-gray-400">{address}</p>
//             </div>
//             <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold text-white/90 mb-3">
//                 Hours
//               </h3>
//               <p className="text-gray-400">{hours}</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
