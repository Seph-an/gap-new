// This component is responsible for rendering the inquiry button and handling the selection of user roles (Jobseeker or Employer).
// It uses React hooks to manage the state of the selected option and error messages.
// It also includes a button that triggers an email action based on the selected role.
"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import OpenForm from "./OpenForm";

const InquiryButton = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showError, setShowError] = useState(false);

  const triggerError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 1000);
  };
  const employerMail = process.env.NEXT_PUBLIC_EMPLOYER_MAIL;
  const inquiryMail = process.env.NEXT_PUBLIC_INQUIRY_MAIL;

  const handleMailto = () => {
    if (!selectedOption) {
      triggerError();
      return;
    }

    const email = selectedOption === "Jobseeker" ? inquiryMail : employerMail;

    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="flex flex-col rounded-lg bg-[#1e1e1e] mt-12 py-6 px-4">
      <p
        className={`mb-4 font-semibold ${
          showError ? "text-red-500" : "text-white/90"
        }`}
      >
        Select Your Role to Proceed
      </p>
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer text-gray-300">
          <input
            type="radio"
            name="userType"
            value="Jobseeker"
            checked={selectedOption === "Jobseeker"}
            onChange={() => setSelectedOption("Jobseeker")}
            className="accent-[#51D4D6]"
          />
          Jobseeker
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-gray-300">
          <input
            type="radio"
            name="userType"
            value="Employer"
            checked={selectedOption === "Employer"}
            onChange={() => setSelectedOption("Employer")}
            className="accent-[#51D4D6]"
          />
          Employer
        </label>
      </div>

      <button
        onClick={handleMailto}
        className="w-fit gap-button gap-button-primary"
      >
        <span className="text-[#1e1e1e]">Inquire via direct mail now</span>
        <ArrowRight size={20} className="ml-2" />
      </button>

      <div className="flex gap-2 items-center mt-6">
        <p className="text-gray-400">Prefer form submission? Click</p>
        <OpenForm
          isEnabled={!!selectedOption}
          triggerError={triggerError}
          role={selectedOption}
        />
      </div>
    </div>
  );
};

export default InquiryButton;
