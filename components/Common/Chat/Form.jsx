"use client";
import { ArrowRight, Loader, Check } from "lucide-react";

export default function Form({
  formData,
  buttonColor,
  handleChange,
  handleSubmit,
  formErrors,
  isFormValid,
  isSubmitting,
  isSuccess,
  isError,
  error,
}) {
  return (
    <div className="w-full mx-auto">
      <div className="rounded-lg p-3">
        {!isFormValid && (
          <p className="text-red-600 text-sm font-light text-center ">
            * compulsory fields.
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex text-secondary flex-col gap-1"
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-secondary opacity-70"
            >
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 text-secondary bg-transparent block w-full px-3 py-1 border ${
                formErrors.name ? "border-red-500" : "border-slate-400"
              } rounded-sm  shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                Name must be at least 2 letters.
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary opacity-70"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 text-secondary bg-transparent block w-full px-3 py-1 border ${
                formErrors.email ? "border-red-500" : "border-slate-400"
              } rounded-sm  shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid email address.
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-secondary opacity-70"
            >
              How can we help you? <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className={`mt-1 text-secondar bg-transparent block w-full px-3 py-1 border ${
                formErrors.message ? "border-red-500" : "border-slate-400"
              } rounded-sm  shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
            />
            {formErrors.message && (
              <p className="text-red-500 text-sm mt-1">
                Message must be at least 3 words.
              </p>
            )}
          </div>

          {/* Error Message (if any) */}
          {isError && error && (
            <p className="text-red-500 text-sm font-light text-center my-1">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            // className={`mt-2 flex justify-center items-center gap-3 px-4 py-2 text-white rounded ${
            //   isSuccess ? "bg-green-800" : "bg-primary"
            // }`}
            className={`mt-2 cursor-pointer flex justify-center items-center gap-3 px-4 py-2 text-white rounded transition-colors duration-300 ease-in-out hover:bg-green-800 ${buttonColor}`}
          >
            {isSubmitting ? (
              <>
                <span>Submitting...</span>
                <Loader color="#fff" size={20} className="animate-spin" />
              </>
            ) : isSuccess ? (
              <>
                <span>Submitted</span>
                <Check color="#fff" size={20} />
              </>
            ) : (
              <>
                <span>Submit</span>
                <ArrowRight color="#fff" size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
