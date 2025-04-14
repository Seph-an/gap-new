//render contact form
"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ContactForm from "./ContactForm";

const RenderContactForm = ({ token, setToken, onClose, role }) => {
  const [buttonColor, setButtonColor] = useState("bg-[#51D4D6]");
  const [formData, setFormData] = useState({
    role: role,
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    return phone.length === 10 && /^[0-9]+$/.test(phone);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validate fields on change
    if (name === "email") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: !validateEmail(value),
      }));
    }
    if (name === "phone") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: !validatePhone(value),
      }));
    }
    if (name === "name") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: !validateName(value),
      }));
    }
    if (name === "message") {
      // Split the message by whitespace and check if there are at least 3 words
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        message: wordCount < 3,
      }));
    }
  };

  // Updated isFormValid: now also checks that the Turnstile token is present.
  const isFormValid =
    !formErrors.name &&
    !formErrors.phone &&
    !formErrors.email &&
    !formErrors.message &&
    formData.name &&
    formData.phone &&
    formData.email &&
    formData.message;

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post("/api/contact-form", formData);
      return data;
    },
    onSuccess: (data) => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setData(data);
      // After 3 seconds, revert the success state back to default
      setTimeout(() => {
        setIsSuccess(false);
        setButtonColor("bg-[#51D4D6]");
        setFormData({
          role: role,
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        onClose();
      }, 3000);
    },
    onError: (error) => {
      setIsSubmitting(false);
      setButtonColor("bg-[#51D4D6]");
      setIsError(true);
      setError(error?.message || "An error occurred");
    },
  });

  // Load the Cloudflare Turnstile script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for Turnstile token before submission
    if (!token) {
      alert("Please complete the Turnstile verification.");
      return;
    }
    // Ensure token is included in formData before submission
    const submissionData = { ...formData, token };

    setIsSubmitting(true);
    setIsError(false);
    setError("");
    setButtonColor("bg-green-800");
    mutation.mutate(submissionData);
  };

  return (
    <div>
      <ContactForm
        formData={formData}
        buttonColor={buttonColor}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        isFormValid={isFormValid}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        onClose={onClose}
        setToken={setToken}
      />
    </div>
  );
};

export default RenderContactForm;
