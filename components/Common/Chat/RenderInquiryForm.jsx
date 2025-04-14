"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InquiryForm from "./Form";
import useStore from "@lib/store";

const RenderInquiryForm = () => {
  const toggleVisibilityChatForm = useStore(
    (state) => state.toggleVisibilityChatForm
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [buttonColor, setButtonColor] = useState("bg-primary");
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (name === "name") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: !validateName(value),
      }));
    }

    if (name === "message") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        message: wordCount < 3,
      }));
    }
  };

  const isFormValid =
    !formErrors.name &&
    !formErrors.email &&
    !formErrors.message &&
    formData.name &&
    formData.email &&
    formData.message;

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post("/api/inquiries", formData);
      return data;
    },
    onSuccess: (data) => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setData(data);
      // After 3 seconds, revert the success state back to default
      setTimeout(() => {
        setIsSuccess(false);
        setButtonColor("bg-primary");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        // toggleVisibilityChatForm();
      }, 3000);
    },
    onError: (error) => {
      setIsSubmitting(false);
      setButtonColor("bg-primary");
      setIsError(true);
      setError(error?.message || "An error occurred");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setError("");
    setButtonColor("bg-green-800");
    mutation.mutate(formData);
  };

  return (
    <div>
      <InquiryForm
        formData={formData}
        buttonColor={buttonColor}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        isFormValid={isFormValid}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
      />
    </div>
  );
};

export default RenderInquiryForm;
