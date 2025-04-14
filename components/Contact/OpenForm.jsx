//open form
"use client";

import React, { useState } from "react";
import AlertDialog from "./AlertDialog";

const OpenForm = ({ isEnabled, triggerError, role }) => {
  const [token, setToken] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    if (!isEnabled) {
      triggerError();
      return;
    }
    setDialogOpen(true);
    console.log("Token:", token);
  };

  const closeDialog = () => {
    if (window.turnstile && typeof window.turnstile.reset === "function") {
      window.turnstile.reset();
      console.log("turnstile rest called");
      console.log("Token:", token);
    }
    if (token) {
      setToken("");
    }
    setDialogOpen(false);
  };

  return (
    <div>
      <span
        onClick={openDialog}
        className="text-[#51D4D6] underline cursor-pointer"
      >
        here
      </span>
      <AlertDialog
        token={token}
        setToken={setToken}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        role={role}
      />
    </div>
  );
};

export default OpenForm;
