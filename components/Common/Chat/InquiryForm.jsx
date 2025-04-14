"use client";
import { useState } from "react";
import useStore from "@lib/store";

const InquiryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleVisibilityChatForm = useStore(
    (state) => state.toggleVisibilityChatForm
  );
  const toggleVisibilityResponse = useStore(
    (state) => state.toggleVisibilityResponse
  );
  const setResponseOk = useStore((state) => state.setResponseOk);
  const setResponseBad = useStore((state) => state.setResponseBad);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the submit button
    console.log("Form submitted:", formData);

    const maxRetries = 5;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BE_TOKEN}`,
          },
          body: JSON.stringify({ data: formData }),
        };
        const url = "http://localhost:1337/api/inquiries";

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          setResponseOk();
          const responseData = await response.json();
          console.log("Response from server:", responseData);
          break;
        }
      } catch (error) {
        attempt += 1;
        console.error(`Attempt ${attempt} failed:`, error);

        if (attempt >= maxRetries) {
          console.error("Max retries reached. Request failed.");
          setResponseBad();
        } else {
          // Wait before retrying | Wait for 1s, 2s, 3s, etc.
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      } finally {
        toggleVisibilityChatForm();
        setIsSubmitting(false); // Re-enable the button
        toggleVisibilityResponse();
      }
    }
  };
  return (
    <form
      className="container w-[90%] m-auto mt-5 text-cool-blue flex gap-2 flex-col items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between gap-1 w-full">
        <label htmlFor="email">Email:</label>
        <input
          className=" text-sm w-[75%] px-3 focus:outline-none focus:border-primary-blue rounded-[0.325rem] border-[1px] border-cool-blue bg-transparent"
          id="email"
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-between gap-1 w-full">
        <label htmlFor="phone">Phone:</label>
        <input
          className="text-sm w-[75%] px-3 focus:outline-none focus:border-primary-blue rounded-[0.325rem] border-[1px] border-cool-blue bg-transparent"
          id="phone"
          type="tel"
          name="phone"
          placeholder="0712345678"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-between gap-1 w-full">
        <label htmlFor="message">Message:</label>
        <textarea
          className="p-3 w-[85%] focus:outline-none focus:border-primary-blue rounded-[0.325rem] border-[1px] border-cool-blue bg-transparent"
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <div className="block w-full mt-3">
        <button
          className="text-white text-lg w-full p-2 bg-primary-blue shadow-lg rounded-[0.325rem] text-center"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;
