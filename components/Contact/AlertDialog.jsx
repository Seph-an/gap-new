//modal
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import RenderContactForm from "./RenderContactForm";

const AlertDialog = ({ token, setToken, isOpen, onClose, role }) => {
  const [showModal, setShowModal] = useState(isOpen);

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);

      const timer = setTimeout(() => setAnimateIn(true), 20);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);

      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with transition */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          animateIn ? "opacity-80" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal content with transition */}
      <div
        className={`relative bg-[#0a0a0a] rounded-lg shadow-lg  z-10 transform transition-all duration-300 ${
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* start of form */}
        <RenderContactForm
          token={token}
          setToken={setToken}
          onClose={onClose}
          role={role}
        />
        {/* end of form */}
      </div>
    </div>,
    document.body
  );
};

export default AlertDialog;
