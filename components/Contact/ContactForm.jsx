"use client";
import { useEffect, useState } from "react";
import { Send, Loader, Check } from "lucide-react";

export default function ContactForm({
  formData,
  handleChange,
  handleSubmit,
  formErrors,
  isFormValid,
  isSubmitting,
  isSuccess,
  isError,
  error,
  onClose,
  setToken,
}) {
  const [timestamp, setTimestamp] = useState(Date.now());

  const labelText = `block text-sm font-medium mb-1 text-[#1e1e1e]`;

  useEffect(() => {
    window.handleTurnstileCallback = (token) => {
      setToken(token);
    };
  }, [setToken]);
  // Set the initial timestamp when the component mounts
  // This ensures that the Turnstile widget is re-rendered when the component mounts
  // and when the form is submitted
  // This is important for the Turnstile widget to work correctly
  // as it needs to be re-initialized with a new site key each time
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const handleClick = () => {
    if (isSubmitting) {
      return;
    } else {
      setTimestamp(Date.now());
      onClose();
    }
  };

  return (
    <div className="w-[350px] mx-auto ">
      <div className="p-4 rounded-lg shadow-lg bg-[#fff]">
        <h2 className="text-base text-center text-[#0a0a0a] font-semibold mb-2">
          Fill out the form below
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-1 ">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className={labelText}>
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 mb-2 text-[#1e1e1e] bg-transparent block w-full px-3 py-1 border ${
                formErrors.name ? "border-red-500" : "border-slate-400"
              } rounded-sm focus:outline-none focus:ring-[#51D4D6] focus:border-[#51D4D6] hover:border-[#51D4D6]`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                Name must be at least 2 letters.
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className={labelText}>
              Mail <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 mb-2 text-[#1e1e1e] bg-transparent block w-full px-3 py-1 border ${
                formErrors.email ? "border-red-500" : "border-slate-400"
              } rounded-sm focus:outline-none focus:ring-[#51D4D6] focus:border-[#51D4D6] hover:border-[#51D4D6]`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid email address.
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className={labelText}>
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 mb-2 text-[#1e1e1e] bg-transparent block w-full px-3 py-1 border ${
                formErrors.phone ? "border-red-500" : "border-slate-400"
              } rounded-sm focus:outline-none focus:ring-[#51D4D6] focus:border-[#51D4D6] hover:border-[#51D4D6]`}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">
                Phone must be exactly 10 digits.
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className={labelText}>
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className={`mt-1 text-[#1e1e1e] bg-transparent block w-full px-3 py-1 border ${
                formErrors.message ? "border-red-500" : "border-slate-400"
              } rounded-sm focus:outline-none focus:ring-[#51D4D6] focus:border-[#51D4D6] hover:border-[#51D4D6]`}
            />
            {formErrors.message && (
              <p className="text-red-500 text-sm mt-1">
                Message must be at least 3 words.
              </p>
            )}
          </div>

          {/* Turnstile Screening */}
          <div
            key={timestamp}
            className="cf-turnstile mx-auto mt-4"
            data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
            data-theme="light"
            data-callback="handleTurnstileCallback"
          ></div>

          {/* Error Message (if any) */}
          {isError && error && (
            <p className="text-red-500 text-center my-1">{error}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-between mt-2">
            <button
              onClick={isSubmitting ? undefined : handleClick}
              className="cursor-pointer px-9 py-2 bg-red-400 inline-flex items-center text-[#fff] font-semibold rounded-md hover:opacity-90 transition-opacity duration-500 ease-in-out"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`form-button ${
                isSuccess ? "bg-green-800" : "bg-[#51D4D6]"
              } `}
            >
              {isSubmitting ? (
                <>
                  <span className="text-[#0a0a0a]">Submitting...</span>
                  <Loader
                    color="#0a0a0a"
                    size={20}
                    className="animate-spin ml-2"
                  />
                </>
              ) : isSuccess ? (
                <>
                  <span className="text-white">Submitted</span>
                  <Check color="#fff" size={20} className="ml-2" />
                </>
              ) : (
                <>
                  <span className="text-[#0a0a0a]">Submit</span>
                  <Send
                    color="#0a0a0a"
                    size={20}
                    strokeWidth={2}
                    className="ml-2"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
