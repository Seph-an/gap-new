"use client";
import React, { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

const CopyableText = ({ color, text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // Revert the state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-base text-${color}`}>{text}</span>

      <div className="flex flex-col items-center">
        <button
          onClick={handleCopy}
          className="focus:outline-none"
          aria-label="Copy text"
        >
          {copied ? (
            <CopyCheck color="#16A34A" size={14} strokeWidth={2} />
          ) : (
            <Copy
              color={color === "#51D4D6" ? "#99a1af" : "#51D4D6"}
              size={14}
              strokeWidth={2}
            />
          )}
        </button>
        <div className="text-xs mt-[2px] flex items-center">
          {copied ? (
            <span className="text-[#16A34A]">Copied</span>
          ) : (
            <span className="text-[#51D4D6]">Copy</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyableText;
