"use client";
import React, { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

const CopyableText = ({ color, text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-base text-${color}`}>{text}</span>
      <button onClick={handleCopy} className="focus:outline-none">
        {copied ? <CopyCheck color="#16A34A" size={14} strokeWidth={2} /> : <Copy color={color === "#51D4D6" ? "#99a1af" : "#51D4D6"} size={14} strokeWidth={2} />}
      </button>
    </div>
  );
};

export default CopyableText;
