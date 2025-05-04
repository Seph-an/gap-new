"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CookieAlert() {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    document.body.style.overflow = "visible"; // Enable scrolling
    // Set cookie or localStorage to remember the user's choice
    localStorage.setItem("cookieConsent", "accepted");
  };

  const handleReject = () => {
    setIsVisible(false);
    document.body.style.overflow = "visible"; // Enable scrolling
    // Set cookie or localStorage to remember the user's choice
    localStorage.setItem("cookieConsent", "rejected");
  };

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setIsVisible(false);
      document.body.style.overflow = "visible"; // Ensure scrolling is enabled if consent is already given
    } else {
      document.body.style.overflow = "hidden"; // Disable scrolling until user makes a choice
    }

    return () => {
      document.body.style.overflow = "visible"; // Ensure scrolling is enabled when component unmounts
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 shadow-lg p-4 rounded-t-lg z-30">
      <div className="flex flex-col items-center">
        <Image
          src="/cookie.svg"
          alt="gap-recruitment-services-payroll-management-and-staff-outsorucing-cookie-image"
          width={50}
          height={50}
          className="w-[50px] lg:w-[100px] h-full object-contain"
        />
        <p className="text-center text-gray-700 mb-4">
          We use cookies to enhance your browsing experience. By clicking
          "Accept", you consent to our use of cookies.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="shadow-md bg-[#51D4D6] hover:opacity-90 text-[#0A0A0A] font-semibold py-2 px-4 rounded"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="shadow-md bg-gray-300 hover:bg-gray-400 text-[#0A0A0A] font-semibold py-2 px-4 rounded"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
        <p className="text-sm md:text-base text-gray-700 mt-4">
          You can check out our{" "}
          <span className="font-medium">cookie policy</span>{" "}
          <a href="/cookie-policy" className="text-[#51D4D6] mt-4 underline">
            here
          </a>
        </p>
      </div>
    </div>
  );
}
