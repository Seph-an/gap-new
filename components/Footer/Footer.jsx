// <a href="https://www.flaticon.com/free-icons/whatsapp" title="whatsapp icons">Whatsapp icons created by Indygo - Flaticon</a>

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  const footerTitle = "text-center md:text-left text-lg font-semibold mb-4";
  const imgWidth = 80;
  const imgHeight = 80;
  const socialImg = 40;
  const socialImgStyle =
    "rounded-full z-5 transition-transform duration-500 ease-in-out hover:scale-110";
  const imgStyle =
    "rounded-full grayscale hover:grayscale-0 transition-all duration-300 ease-in-out";
  const socialIconWrapperStyle = "relative flex items-center justify-center";
  const socialIconBackgroundStyle =
    "absolute rounded-full bg-white  h-[85%] w-[85%] z-1";
  const footerLink =
    "hover:text-[#51D4D6] transition-colors duration-300 ease-in-out";
  return (
    <footer className="m-4 md:m-6 lg:m-8 ">
      <div className="rounded-lg bg-[#1e1e1e]">
        <div className="w-full p-6 md:p-8 flex justify-between flex-wrap gap-8 lg:gap-10">
          {/* Subscribe Section */}
          <div className="bg-[#0a0a0a] w-full sm:w-fit mx-auto sm:mx-0 p-6 rounded-lg">
            <div className="flex flex-col items-center gap-6 mb-4">
              <Image
                src="/logo.png"
                alt="recruitment-services-and-human-resource-management-services"
                width={150}
                height={150}
                className=""
              />
              <div className="text-center flex flex-col gap-2">
                <h2 className="font-medium text-lg">
                  Gap Recruitment Services Limited
                </h2>
                <h4 className="font-light text-base text-gray-400">
                  Your Talent Solutions Partner!
                </h4>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="mx-auto sm:mx-0">
            <h3 className={footerTitle}>Company</h3>
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 text-gray-300">
              <a className={footerLink} href="/">
                Home
              </a>
              <a className={footerLink} href="/payroll-management">
                Payroll
              </a>
              <a className={footerLink} href="/about-us">
                About
              </a>
              <a className={footerLink} href="/recruitment-services">
                Recruitment
              </a>
              <a className={footerLink} href="/contact-us">
                Contact
              </a>
              <a className={footerLink} href="/staff-outsourcing">
                Outsourcing
              </a>
              <a className={footerLink} href="/frequently-asked-questions">
                FAQs
              </a>
              <a className={footerLink} href="/jobseekers">
                Jobseekers
              </a>
              <a className={footerLink} href="/blog">
                Blog
              </a>
 <a className={footerLink} href="https://www.careers-page.com/gaprecruitment">
                Jobs
              </a>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="mx-auto sm:mx-0 flex flex-col gap-8">
            <div>
              <h3 className={footerTitle}>Connect with us</h3>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://x.com/GapLimited?t=rPZ0eZMWLEkxW6hqOTZIHg&s=09" className={socialIconWrapperStyle}>
                  <div className={socialIconBackgroundStyle}></div>
                  <Image
                    src="/socials/twitter.png"
                    alt="Twitter"
                    width={socialImg}
                    height={socialImg}
                    className={socialImgStyle}
                  />
                </a>

                <a href="https://www.facebook.com/share/18jZ4dS8k2/" className={socialIconWrapperStyle}>
                  <div className={socialIconBackgroundStyle}></div>
                  <Image
                    src="/socials/facebook.png"
                    alt="Facebook"
                    width={socialImg}
                    height={socialImg}
                    className={socialImgStyle}
                  />
                </a>
		 <a href="https://www.instagram.com/gap_recruitment?igsh=eWpxNHNpbjlOOWk4" className={socialIconWrapperStyle}>
                  <div className={socialIconBackgroundStyle}></div>
                  <Image
                    src="/socials/instagram.png"
                    alt="Instagram"
                    width={socialImg}
                    height={socialImg}
                    className={socialImgStyle}
                  />
                </a>
                <a href="https://www.linkedin.com/company/gaprecruitmentserviceslimited/" className={socialIconWrapperStyle}>
                  <div className={socialIconBackgroundStyle}></div>
                  <Image
                    src="/socials/linkedin.png"
                    alt="LinkedIn"
                    width={socialImg}
                    height={socialImg}
                    className={socialImgStyle}
                  />
                </a>
              </div>
            </div>

            <div>
              <h3 className={footerTitle}>Credentials</h3>
              <div className="flex gap-2">
                <Image
                  src="/proficient/recruitment-services-certified-by-institute-of-human-resource-management-services.png"
                  alt="recruitment-services-certified-by-institute-of-human-resource-management-services"
                  width={imgWidth}
                  height={imgHeight}
                  className={imgStyle}
                />
                <Image
                  src="/proficient/recruitment-company-dealing-in-payroll-human-resources-staff-outsourcing-and-workforce-solutions.png"
                  alt="recruitment-company-dealing-in-payroll-human-resources-staff-outsourcing-and-workforce-solutions"
                  width={imgWidth}
                  height={imgHeight}
                  className={imgStyle}
                />
                <Image
                  src="/proficient/recruitment-company-certified-by-nita-to-offer-human-resources-training-in-kenya.png"
                  alt="recruitment-company-certified-by-nita-to-offer-human-resources-training-in-kenya"
                  width={imgWidth}
                  height={imgHeight}
                  className={imgStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Additional Links */}
        <div className="container mt-10 text-center pb-10">
          <p className="text-base text-white/90">
            © {year} G.R.S.L. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-400">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="#">Attributions</a>
            <a href="/terms-of-service">Terms of Use</a>

            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          <p className="text-sm text-white/90 mt-2">
            Developed by{" "}
            <a
              href="https://sephanly.com"
              className="underline font-medium text-[#51D4D6]"
            >
              Sephanly
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
